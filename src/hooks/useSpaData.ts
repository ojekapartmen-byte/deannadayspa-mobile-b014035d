import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type DbService = Tables<"services"> & {
  service_options: Tables<"service_options">[];
};

export type DbPremium = Tables<"premium_services">;
export type DbContent = Tables<"site_content">;

export function useServices(category: string) {
  return useQuery({
    queryKey: ["services", category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*, service_options(*)")
        .eq("category", category)
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      // Sort options within each service
      return (data as DbService[]).map((s) => ({
        ...s,
        service_options: [...s.service_options].sort((a, b) => a.sort_order - b.sort_order),
      }));
    },
  });
}

export function usePremiumServices() {
  return useQuery({
    queryKey: ["premium-services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("premium_services")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data as DbPremium[];
    },
  });
}

export function useSiteContent() {
  return useQuery({
    queryKey: ["site-content"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content").select("*");
      if (error) throw error;
      const map: Record<string, string> = {};
      (data as DbContent[]).forEach((c) => { map[c.key] = c.value; });
      return map;
    },
  });
}

export function getBookingUrl(text: string, waNumber: string = "6281999231518"): string {
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi, I'd like to book ${text}`)}`;
}
