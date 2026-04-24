import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save, Upload, FileText, Trash2, Download, Image as ImageIcon, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";

const KEYS = ["brochure_url", "brochure_button_text", "brochure_button_visible"] as const;
const BUCKET = "brochures";

const AdminBrochure = () => {
  const queryClient = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});
  const [pendingImages, setPendingImages] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);

  const { data: contents, isLoading } = useQuery({
    queryKey: ["admin-brochure-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .in("key", [...KEYS]);
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (contents) {
      const map: Record<string, string> = {};
      contents.forEach((c) => { map[c.key] = c.value; });
      setValues(map);
    }
  }, [contents]);

  const set = (key: string, val: string) => setValues((prev) => ({ ...prev, [key]: val }));

  const saveSettings = useMutation({
    mutationFn: async () => {
      for (const key of KEYS) {
        if (values[key] !== undefined) {
          const { error } = await supabase
            .from("site_content")
            .update({ value: values[key] })
            .eq("key", key);
          if (error) throw error;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-brochure-content"] });
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
      toast.success("Pengaturan brochure disimpan!");
    },
    onError: (e: any) => toast.error(e.message),
  });

  // Extract storage path from a public URL
  const pathFromUrl = (url: string): string | null => {
    const marker = `/storage/v1/object/public/${BUCKET}/`;
    const idx = url.indexOf(marker);
    if (idx === -1) return null;
    return url.substring(idx + marker.length);
  };

  const deleteCurrent = async () => {
    const url = values.brochure_url;
    if (!url) return;
    const path = pathFromUrl(url);
    if (path) {
      await supabase.storage.from(BUCKET).remove([path]);
    }
    set("brochure_url", "");
    await supabase.from("site_content").update({ value: "" }).eq("key", "brochure_url");
    queryClient.invalidateQueries({ queryKey: ["site-content"] });
    queryClient.invalidateQueries({ queryKey: ["admin-brochure-content"] });
    toast.success("Brochure dihapus");
  };

  const uploadPdf = async (blob: Blob, name: string) => {
    // Remove old file first
    if (values.brochure_url) {
      const old = pathFromUrl(values.brochure_url);
      if (old) await supabase.storage.from(BUCKET).remove([old]);
    }
    const fileName = `brochure-${Date.now()}-${name.replace(/[^a-z0-9.-]/gi, "_")}`;
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, blob, { contentType: "application/pdf", upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
    const url = data.publicUrl;
    set("brochure_url", url);
    const { error: e2 } = await supabase
      .from("site_content")
      .update({ value: url })
      .eq("key", "brochure_url");
    if (e2) throw e2;
    queryClient.invalidateQueries({ queryKey: ["site-content"] });
    queryClient.invalidateQueries({ queryKey: ["admin-brochure-content"] });
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("File harus PDF");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      toast.error("Maksimal 50MB");
      return;
    }
    setBusy(true);
    try {
      await uploadPdf(file, file.name);
      toast.success("Brochure PDF diupload!");
    } catch (err: any) {
      toast.error(err.message || "Gagal upload");
    } finally {
      setBusy(false);
      if (pdfInputRef.current) pdfInputRef.current.value = "";
    }
  };

  const handleImagesPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) return;
    setPendingImages((prev) => [...prev, ...files]);
    if (imgInputRef.current) imgInputRef.current.value = "";
  };

  const removePending = (idx: number) => {
    setPendingImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const movePending = (idx: number, dir: -1 | 1) => {
    setPendingImages((prev) => {
      const next = [...prev];
      const j = idx + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[idx], next[j]] = [next[j], next[idx]];
      return next;
    });
  };

  const loadImage = (file: File): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
      img.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };
      img.src = url;
    });

  const buildPdfFromImages = async () => {
    if (pendingImages.length === 0) {
      toast.error("Belum ada gambar yang dipilih");
      return;
    }
    setBusy(true);
    try {
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < pendingImages.length; i++) {
        const file = pendingImages[i];
        const img = await loadImage(file);
        const ratio = Math.min(pageW / img.width, pageH / img.height);
        const w = img.width * ratio;
        const h = img.height * ratio;
        const x = (pageW - w) / 2;
        const y = (pageH - h) / 2;

        // Draw via canvas to get JPEG (smaller)
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);

        if (i > 0) pdf.addPage();
        pdf.addImage(dataUrl, "JPEG", x, y, w, h);
      }

      const blob = pdf.output("blob");
      await uploadPdf(blob, "brochure.pdf");
      setPendingImages([]);
      toast.success(`Brochure dibuat dari ${pendingImages.length} gambar!`);
    } catch (err: any) {
      toast.error(err.message || "Gagal membuat PDF");
    } finally {
      setBusy(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground">Kelola Brochure</h1>

      {/* Current */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Brochure Saat Ini</CardTitle>
        </CardHeader>
        <CardContent>
          {values.brochure_url ? (
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
              <FileText className="w-8 h-8 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Brochure aktif</p>
                <a
                  href={values.brochure_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary underline truncate block"
                >
                  Buka file
                </a>
              </div>
              <Button size="sm" variant="outline" asChild>
                <a href={values.brochure_url} download target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4" />
                </a>
              </Button>
              <Button size="sm" variant="destructive" onClick={deleteCurrent} disabled={busy}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Belum ada brochure yang diupload.</p>
          )}
        </CardContent>
      </Card>

      {/* Upload PDF */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Upload File PDF</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground">Upload akan otomatis mengganti brochure lama. Maks 50MB.</p>
          <input
            ref={pdfInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handlePdfUpload}
            disabled={busy}
          />
          <Button onClick={() => pdfInputRef.current?.click()} disabled={busy} className="w-full">
            {busy ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
            Pilih File PDF
          </Button>
        </CardContent>
      </Card>

      {/* Build from images */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Atau Buat PDF dari Gambar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Upload beberapa gambar — sistem akan otomatis menggabungkannya menjadi 1 file PDF.
          </p>
          <input
            ref={imgInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImagesPick}
            disabled={busy}
          />
          <Button variant="outline" onClick={() => imgInputRef.current?.click()} disabled={busy} className="w-full">
            <ImageIcon className="w-4 h-4 mr-2" />
            Tambah Gambar ({pendingImages.length})
          </Button>

          {pendingImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {pendingImages.map((f, i) => (
                <div key={i} className="relative group rounded-lg overflow-hidden border border-border">
                  <img src={URL.createObjectURL(f)} alt={`Page ${i + 1}`} className="w-full h-24 object-cover" />
                  <div className="absolute top-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                    #{i + 1}
                  </div>
                  <button
                    onClick={() => removePending(i)}
                    className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-1 right-1 flex gap-1">
                    <button
                      onClick={() => movePending(i, -1)}
                      className="bg-background/90 text-foreground rounded text-xs px-1.5"
                    >↑</button>
                    <button
                      onClick={() => movePending(i, 1)}
                      className="bg-background/90 text-foreground rounded text-xs px-1.5"
                    >↓</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button onClick={buildPdfFromImages} disabled={busy || pendingImages.length === 0} className="w-full">
            {busy ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <FileText className="w-4 h-4 mr-2" />}
            Gabungkan & Upload sebagai PDF
          </Button>
        </CardContent>
      </Card>

      {/* Button settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Pengaturan Tombol</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Teks Tombol</Label>
            <Input
              value={values.brochure_button_text || ""}
              onChange={(e) => set("brochure_button_text", e.target.value)}
              placeholder="Download Brochure"
            />
          </div>
          <div className="flex items-center gap-3">
            <Switch
              checked={values.brochure_button_visible !== "false"}
              onCheckedChange={(checked) => set("brochure_button_visible", checked ? "true" : "false")}
            />
            <Label className="text-sm">Tampilkan tombol di website</Label>
          </div>
        </CardContent>
      </Card>

      <Button onClick={() => saveSettings.mutate()} disabled={saveSettings.isPending} className="w-full">
        {saveSettings.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
        Simpan Pengaturan
      </Button>
    </div>
  );
};

export default AdminBrochure;
