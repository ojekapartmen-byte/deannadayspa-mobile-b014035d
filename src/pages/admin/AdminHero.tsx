import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

const HERO_KEYS = ["hero_title", "hero_subtitle", "hero_description", "hero_image", "hero_button_text", "hero_button_visible"] as const;

const AdminHero = () => {
  const queryClient = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});

  const { data: contents, isLoading } = useQuery({
    queryKey: ["admin-hero-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .in("key", [...HERO_KEYS]);
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

  const saveMutation = useMutation({
    mutationFn: async () => {
      for (const key of HERO_KEYS) {
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
      queryClient.invalidateQueries({ queryKey: ["admin-hero-content"] });
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
      toast.success("Hero banner berhasil disimpan!");
    },
    onError: (e) => toast.error(e.message),
  });

  const set = (key: string, val: string) => setValues((prev) => ({ ...prev, [key]: val }));

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Edit Hero Banner</h1>

      {/* Preview */}
      <Card className="overflow-hidden">
        <div className="relative h-48 md:h-64">
          {values.hero_image ? (
            <img src={values.hero_image} alt="Hero preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
            <p className="text-white/70 text-xs tracking-widest uppercase mb-2">Preview</p>
            <h2 className="text-white text-xl font-bold">{values.hero_title || "Title"}</h2>
            <p className="text-white/80 italic">{values.hero_subtitle || "Subtitle"}</p>
            <p className="text-white/60 text-sm mt-1">{values.hero_description || "Description"}</p>
            {values.hero_button_visible !== "false" && (
              <span className="mt-3 bg-accent text-accent-foreground text-xs px-4 py-2 rounded-full">
                {values.hero_button_text || "Contact Us"}
              </span>
            )}
          </div>
        </div>
      </Card>

      {/* Form */}
      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Background Image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload
              value={values.hero_image || ""}
              onChange={(url) => set("hero_image", url)}
              folder="hero"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Teks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Judul</Label>
              <Input value={values.hero_title || ""} onChange={(e) => set("hero_title", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Subtitle</Label>
              <Input value={values.hero_subtitle || ""} onChange={(e) => set("hero_subtitle", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Deskripsi</Label>
              <Input value={values.hero_description || ""} onChange={(e) => set("hero_description", e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Tombol (Button)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Teks Tombol</Label>
              <Input value={values.hero_button_text || ""} onChange={(e) => set("hero_button_text", e.target.value)} />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={values.hero_button_visible !== "false"}
                onCheckedChange={(checked) => set("hero_button_visible", checked ? "true" : "false")}
              />
              <Label className="text-sm">Tampilkan tombol</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} className="w-full">
        {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
        Simpan Semua Perubahan
      </Button>
    </div>
  );
};

export default AdminHero;
