// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY = "https://connector-gateway.lovable.dev/google_drive/drive/v3";

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[&/\\,.()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function similarity(a: string, b: string): number {
  const na = normalize(a);
  const nb = normalize(b);
  if (na === nb) return 1;
  if (na.includes(nb) || nb.includes(na)) return 0.9;
  const wordsA = new Set(na.split(" "));
  const wordsB = new Set(nb.split(" "));
  let common = 0;
  for (const w of wordsA) if (wordsB.has(w)) common++;
  return common / Math.max(wordsA.size, wordsB.size);
}

async function driveFetch(path: string, params: Record<string, string>) {
  const url = new URL(`${GATEWAY}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const r = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
      "X-Connection-Api-Key": Deno.env.get("GOOGLE_DRIVE_API_KEY")!,
    },
  });
  if (!r.ok) throw new Error(`Drive ${path} ${r.status}: ${await r.text()}`);
  return r.json();
}

async function downloadDriveFile(fileId: string): Promise<Uint8Array> {
  const r = await fetch(`${GATEWAY}/files/${fileId}?alt=media`, {
    headers: {
      Authorization: `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
      "X-Connection-Api-Key": Deno.env.get("GOOGLE_DRIVE_API_KEY")!,
    },
  });
  if (!r.ok) throw new Error(`Download ${fileId} ${r.status}`);
  return new Uint8Array(await r.arrayBuffer());
}

// Note: keep original Drive image as-is (JPG/PNG/WebP). Frontend uses object-cover
// + responsive sizing, and Supabase storage can serve transformed variants if needed.
function extFromMime(mime: string): string {
  if (mime.includes("png")) return "png";
  if (mime.includes("webp")) return "webp";
  if (mime.includes("gif")) return "gif";
  return "jpg";
}


Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const admin = createClient(supabaseUrl, serviceKey);
    const { data: roleData } = await admin
      .from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
    if (!roleData) {
      return new Response(JSON.stringify({ error: "Admin only" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Get all folders (recursive, via single list)
    const folders = await driveFetch("/files", {
      q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
      fields: "files(id,name)",
      pageSize: "500",
    });

    // 2. Get services
    const { data: services, error: svcErr } = await admin
      .from("services").select("id,title,image_url").eq("is_active", true);
    if (svcErr) throw svcErr;

    const results: any[] = [];

    for (const svc of services!) {
      // find best matching folder
      let best: { folder: any; score: number } | null = null;
      for (const f of folders.files) {
        const score = similarity(svc.title, f.name);
        if (!best || score > best.score) best = { folder: f, score };
      }
      if (!best || best.score < 0.4) {
        results.push({ service: svc.title, status: "no_match" });
        continue;
      }

      // list images in folder
      const imgs = await driveFetch("/files", {
        q: `'${best.folder.id}' in parents and mimeType contains 'image/' and trashed=false`,
        fields: "files(id,name,mimeType)",
        pageSize: "5",
      });
      if (!imgs.files?.length) {
        results.push({ service: svc.title, folder: best.folder.name, status: "no_image" });
        continue;
      }

      try {
        const file = imgs.files[0];
        const raw = await downloadDriveFile(file.id);
        const ext = extFromMime(file.mimeType || "image/jpeg");
        const path = `services/drive-${svc.id}-${Date.now()}.${ext}`;
        const { error: upErr } = await admin.storage
          .from("service-images")
          .upload(path, raw, { contentType: file.mimeType || "image/jpeg", upsert: true });
        if (upErr) throw upErr;
        const { data: pub } = admin.storage.from("service-images").getPublicUrl(path);
        await admin.from("services").update({ image_url: pub.publicUrl }).eq("id", svc.id);
        results.push({
          service: svc.title, folder: best.folder.name,
          score: best.score.toFixed(2), status: "updated", url: pub.publicUrl,
        });
      } catch (e) {
        results.push({ service: svc.title, folder: best.folder.name, status: "error", error: String(e) });
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
