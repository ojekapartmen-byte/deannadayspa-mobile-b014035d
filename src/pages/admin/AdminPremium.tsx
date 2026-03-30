import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";
import ImageUpload from "@/components/admin/ImageUpload";

type Premium = Tables<"premium_services">;

const emptyForm: Partial<TablesInsert<"premium_services">> = {
  title: "", subtitle: "", image_url: "", items: [], sort_order: 0, is_active: true,
};

const AdminPremium = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Premium | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [itemsText, setItemsText] = useState("");

  const { data: premiums, isLoading } = useQuery({
    queryKey: ["admin-premium"],
    queryFn: async () => {
      const { data, error } = await supabase.from("premium_services").select("*").order("sort_order");
      if (error) throw error;
      return data as Premium[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { ...form, items: itemsText.split("\n").map((s) => s.trim()).filter(Boolean) };
      if (editing) {
        const { error } = await supabase.from("premium_services").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("premium_services").insert(payload as TablesInsert<"premium_services">);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-premium"] });
      toast.success(editing ? "Premium diupdate!" : "Premium ditambahkan!");
      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm);
      setItemsText("");
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("premium_services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-premium"] });
      toast.success("Premium dihapus!");
    },
  });

  const openEdit = (p: Premium) => {
    setEditing(p);
    setForm({ title: p.title, subtitle: p.subtitle ?? "", image_url: p.image_url ?? "", sort_order: p.sort_order, is_active: p.is_active });
    setItemsText((p.items ?? []).join("\n"));
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Premium Services</h1>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setEditing(null); setForm(emptyForm); setItemsText(""); } }}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="w-4 h-4 mr-1" />Tambah</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Premium" : "Tambah Premium"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
              <div className="space-y-2">
                <Label>Judul</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input value={form.subtitle ?? ""} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
              </div>
              <ImageUpload
                value={form.image_url ?? ""}
                onChange={(url) => setForm({ ...form, image_url: url })}
                folder="premium"
              />
              <div className="space-y-2">
                <Label>Items (satu per baris)</Label>
                <Textarea value={itemsText} onChange={(e) => setItemsText(e.target.value)} rows={5} />
              </div>
              <div className="space-y-2">
                <Label>Urutan</Label>
                <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_active ?? true} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
                <Label>Aktif</Label>
              </div>
              <Button type="submit" className="w-full" disabled={saveMutation.isPending}>
                {saveMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Simpan
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="grid gap-3">
          {premiums?.map((p) => (
            <Card key={p.id}>
              <CardContent className="flex items-center gap-4 py-3">
                {p.image_url && <img src={p.image_url} alt={p.title} className="w-14 h-14 rounded-lg object-cover" />}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{(p.items ?? []).length} items • {p.is_active ? "Aktif" : "Nonaktif"}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(p.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {premiums?.length === 0 && <p className="text-center text-muted-foreground py-10">Belum ada premium service.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminPremium;
