"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Package, Plus, X, Search, MapPin, Phone } from "lucide-react";

export default function LostFoundPage() {
  const [items, setItems] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState<"all" | "lost" | "found">("all");
  const [form, setForm] = useState({
    item_name: "",
    description: "",
    location: "",
    contact_info: "",
    type: "lost" as "lost" | "found",
  });
  const supabase = createClient();

  const fetchItems = async () => {
    const { data } = await supabase
      .from("lost_found")
      .select("*")
      .order("created_at", { ascending: false });
    setItems(data || []);
    setLoaded(true);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("lost_found").insert({ ...form, user_id: user.id });
    setForm({ item_name: "", description: "", location: "", contact_info: "", type: "lost" });
    setShowForm(false);
    setLoading(false);
    fetchItems();
  };

  const filtered = filter === "all" ? items : items.filter((i) => i.type === filter);
  const lostCount = items.filter((i) => i.type === "lost").length;
  const foundCount = items.filter((i) => i.type === "found").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-8 text-white"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Package className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">
                Lost & Found
              </h1>
              <p className="text-white/70 text-sm mt-1">
                {lostCount} lost · {foundCount} found
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-orange-600 hover:bg-white/90 font-semibold shadow-lg"
          >
            {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            {showForm ? "Cancel" : "Report Item"}
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        className="flex gap-2"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
        }}
      >
        {(["all", "lost", "found"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              filter === tab
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === "lost" && ` (${lostCount})`}
            {tab === "found" && ` (${foundCount})`}
          </button>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-xl"
          style={{
            animation: "slideDown 0.3s ease-out",
          }}
        >
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setForm({ ...form, type: "lost" })}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-300 ${
                form.type === "lost"
                  ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/20"
                  : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
              }`}
            >
              Lost Item
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, type: "found" })}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-300 ${
                form.type === "found"
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20"
                  : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300"
              }`}
            >
              Found Item
            </button>
          </div>
          <div>
            <Label>Item Name</Label>
            <Input
              value={form.item_name}
              onChange={(e) => setForm({ ...form, item_name: e.target.value })}
              required
              className="mt-1 rounded-xl"
              placeholder="What was lost/found?"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="mt-1 rounded-xl"
              placeholder="Describe the item..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Location</Label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Room 101"
                className="mt-1 rounded-xl"
              />
            </div>
            <div>
              <Label>Contact Info</Label>
              <Input
                value={form.contact_info}
                onChange={(e) => setForm({ ...form, contact_info: e.target.value })}
                placeholder="Phone or email"
                className="mt-1 rounded-xl"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/20"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      )}

      {/* Items */}
      {filtered.length === 0 ? (
        <div
          className="text-center py-20 bg-white rounded-2xl border border-gray-100"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
            <Search className="w-9 h-9 text-amber-300" />
          </div>
          <p className="text-gray-500 font-medium">No items found</p>
          <p className="text-sm text-gray-400 mt-1">
            {filter === "all" ? "Report an item to get started" : `No ${filter} items yet`}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-500 hover:-translate-y-0.5"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.05}s`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-gray-900">{item.item_name}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                    item.type === "lost"
                      ? "bg-red-50 text-red-600"
                      : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  {item.type}
                </span>
              </div>
              {item.description && (
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{item.description}</p>
              )}
              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                {item.location && (
                  <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-lg">
                    <MapPin className="w-3 h-3" /> {item.location}
                  </span>
                )}
                {item.contact_info && (
                  <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-lg">
                    <Phone className="w-3 h-3" /> {item.contact_info}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
