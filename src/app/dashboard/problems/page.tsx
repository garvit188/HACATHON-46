"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Plus, X, Building2, Clock } from "lucide-react";

export default function ProblemsPage() {
  const [problems, setProblems] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState({ classroom: "", description: "" });
  const supabase = createClient();

  const fetchProblems = async () => {
    const { data } = await supabase
      .from("classroom_problems")
      .select("*")
      .order("created_at", { ascending: false });
    setProblems(data || []);
    setLoaded(true);
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("classroom_problems").insert({ ...form, user_id: user.id });
    setForm({ classroom: "", description: "" });
    setShowForm(false);
    setLoading(false);
    fetchProblems();
  };

  const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
    open: { bg: "bg-red-50", text: "text-red-600", label: "Open" },
    in_progress: { bg: "bg-amber-50", text: "text-amber-600", label: "In Progress" },
    resolved: { bg: "bg-emerald-50", text: "text-emerald-600", label: "Resolved" },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 via-red-500 to-orange-500 p-8 text-white"
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
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">
                Classroom Problems
              </h1>
              <p className="text-white/70 text-sm mt-1">
                Report and track facility issues
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-red-600 hover:bg-white/90 font-semibold shadow-lg"
          >
            {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            {showForm ? "Cancel" : "Report Problem"}
          </Button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 shadow-xl"
          style={{ animation: "slideDown 0.3s ease-out" }}
        >
          <div>
            <Label>Classroom</Label>
            <Input
              value={form.classroom}
              onChange={(e) => setForm({ ...form, classroom: e.target.value })}
              placeholder="e.g. Room 101, Lab 2"
              required
              className="mt-1 rounded-xl"
            />
          </div>
          <div>
            <Label>Problem Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the issue in detail..."
              required
              className="mt-1 rounded-xl"
            />
          </div>
          <Button
            type="submit"
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 shadow-lg shadow-red-500/20"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      )}

      {/* Problems */}
      {problems.length === 0 ? (
        <div
          className="text-center py-20 bg-white rounded-2xl border border-gray-100"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-9 h-9 text-rose-300" />
          </div>
          <p className="text-gray-500 font-medium">No problems reported</p>
          <p className="text-sm text-gray-400 mt-1">
            Report a classroom issue to get started
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {problems.map((p, i) => {
            const status = statusConfig[p.status] || statusConfig.open;
            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-500 hover:-translate-y-0.5"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.05}s`,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-rose-500" />
                      </div>
                      <h3 className="font-bold text-gray-900">{p.classroom}</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed ml-13">{p.description}</p>
                  </div>
                  <span className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold ${status.bg} ${status.text}`}>
                    {status.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 ml-13">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <p className="text-xs text-gray-400">
                    Reported {new Date(p.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
