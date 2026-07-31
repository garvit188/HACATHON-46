"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package } from "lucide-react";

export default function AdminLostFoundPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const supabase = createClient();

  const fetchItems = async () => {
    const { data } = await supabase.from("lost_found").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoaded(true);
  };

  useEffect(() => { fetchItems(); }, []);

  const markResolved = async (id: string) => {
    const { error } = await supabase.from("lost_found").update({ status: "resolved" }).eq("id", id);
    if (error) { setError(error.message); return; }
    setSuccessMsg("Item marked as resolved");
    fetchItems();
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Lost & Found</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center justify-between">
          {error}
          <button onClick={() => setError("")} className="text-red-400 hover:text-red-600">✕</button>
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm">
          {successMsg}
        </div>
      )}

      {loaded && items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500">No items reported yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${item.type === "lost" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>
                  {item.type === "lost" ? "L" : "F"}
                </span>
                <div>
                  <h3 className="font-bold text-gray-900">{item.item_name}</h3>
                  <p className="text-sm text-gray-600">{item.description || "No description"}</p>
                  <div className="flex gap-3 mt-1 text-xs text-gray-500">
                    {item.location && <span>📍 {item.location}</span>}
                    {item.contact_info && <span>📞 {item.contact_info}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === "resolved" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {item.status}
                </span>
                {item.status === "active" && (
                  <Button size="sm" variant="outline" onClick={() => markResolved(item.id)} className="text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                    <CheckCircle className="w-4 h-4 mr-1" /> Resolve
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}