import { useState } from "react";
import { getBookingUrl } from "@/hooks/useSpaData";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, ExternalLink } from "lucide-react";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";
import ImageUpload from "@/components/admin/ImageUpload";

type Service = Tables<"services">;
type ServiceOption = Tables<"service_options">;

const emptyService: Partial<TablesInsert<"services">> = {
  title: "", description: "", category: "pamper_package", image_url: "", sort_order: 0, is_active: true,
};

const AdminPamper = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyService);
  const [optionsDialog, setOptionsDialog] = useState<string | null>(null);
  const [optionForm, setOptionForm] = useState({ name: "", price: "", booking_text: "", sort_order: 0 });

  const { data: services, isLoading } = useQuery({
    queryKey: ["admin-pamper-services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("category", "pamper_package")
        .order("sort_order");
      if (error) throw error;
      return data as Service[];
    },
  });

  const { data: options } = useQuery({
    queryKey: ["admin-pamper-options", optionsDialog],
    enabled: !!optionsDialog,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_options")
        .select("*")
        .eq("service_id", optionsDialog!)
        .order("sort_order");
      if (error) throw error;
      return data as ServiceOption[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = { ...form, category: "pamper_package" };
      if (editing) {
        const { error } = await supabase.from("services").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("services").insert(payload as TablesInsert<"services">);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pamper-services"] });
      queryClient.invalidateQueries({ queryKey: ["services", "pamper_package"] });
      toast.success(editing ? "Pamper package diupdate!" : "Pamper package ditambahkan!");
      setDialogOpen(false);
      setEditing(null);
      setForm(emptyService);
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pamper-services"] });
      queryClient.invalidateQueries({ queryKey: ["services", "pamper_package"] });
      toast.success("Pamper package dihapus!");
    },
  });

  const addOptionMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("service_options").insert({
        ...optionForm,
        service_id: optionsDialog!,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pamper-options"] });
      queryClient.invalidateQueries({ queryKey: ["services", "pamper_package"] });
      toast.success("Option ditambahkan!");
      setOptionForm({ name: "", price: "", booking_text: "", sort_order: 0 });
    },
  });

  const deleteOptionMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("service_options").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pamper-options"] });
      queryClient.invalidateQueries({ queryKey: ["services", "pamper_package"] });
      toast.success("Option dihapus!");
    },
  });

  const openEdit = (service: Service) => {
    setEditing(service);
    setForm({
      title: service.title,
      description: service.description ?? "",
      category: "pamper_package",
      image_url: service.image_url ?? "",
      sort_order: service.sort_order,
      is_active: service.is_active,
    });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Kelola Pamper Package</h1>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setEditing(null); setForm(emptyService); } }}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="w-4 h-4 mr-1" />Tambah</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Pamper Package" : "Tambah Pamper Package"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
              <div className="space-y-2">
                <Label>Judul</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Deskripsi</Label>
                <Input value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <ImageUpload
                value={form.image_url ?? ""}
                onChange={(url) => setForm({ ...form, image_url: url })}
                folder="services"
              />
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
          {services?.map((s) => (
            <Card key={s.id}>
              <CardContent className="flex items-center gap-4 py-3">
                {s.image_url && <img src={s.image_url} alt={s.title} className="w-14 h-14 rounded-lg object-cover" />}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.is_active ? "Aktif" : "Nonaktif"} • Urutan: {s.sort_order}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => setOptionsDialog(s.id)} title="Kelola opsi harga">
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openEdit(s)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(s.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {services?.length === 0 && <p className="text-center text-muted-foreground py-10">Belum ada pamper package.</p>}
        </div>
      )}

      {/* Options dialog */}
      <Dialog open={!!optionsDialog} onOpenChange={(o) => { if (!o) setOptionsDialog(null); }}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Opsi Harga</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {options?.map((opt) => (
              <div key={opt.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-medium">{opt.name}</p>
                  <p className="text-xs text-muted-foreground">{opt.price}</p>
                </div>
                <div className="flex gap-1">
                  <a href={getBookingUrl(opt.booking_text)} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" title="Buka link booking">
                      <ExternalLink className="w-4 h-4 text-primary" />
                    </Button>
                  </a>
                  <Button variant="ghost" size="icon" onClick={() => deleteOptionMutation.mutate(opt.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); addOptionMutation.mutate(); }} className="space-y-3 pt-4 border-t">
            <Input placeholder="Nama (cth: Kids Spa 1 Hour)" value={optionForm.name} onChange={(e) => setOptionForm({ ...optionForm, name: e.target.value })} required />
            <Input placeholder="Harga (cth: IDR 200.000)" value={optionForm.price} onChange={(e) => setOptionForm({ ...optionForm, price: e.target.value })} required />
            <Input placeholder="Booking text" value={optionForm.booking_text} onChange={(e) => setOptionForm({ ...optionForm, booking_text: e.target.value })} required />
            <Input placeholder="Urutan" type="number" value={optionForm.sort_order} onChange={(e) => setOptionForm({ ...optionForm, sort_order: Number(e.target.value) })} />
            <Button type="submit" size="sm" className="w-full" disabled={addOptionMutation.isPending}>
              Tambah Option
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPamper;
