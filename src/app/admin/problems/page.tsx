"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function AdminProblemsPage() {
  const [problems, setProblems] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const supabase = createClient();

  const fetchProblems = async () => {
    const { data } = await supabase.from("classroom_problems").select("*").order("created_at", { ascending: false });
    setProblems(data || []);
    setLoaded(true);
  };

  useEffect(() => { fetchProblems(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("classroom_problems").update({ status }).eq("id", id);
    if (error) { setError(error.message); return; }
    setSuccessMsg(`Problem marked as ${status.replace("_", " ")}`);
    fetchProblems();
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
    open: { bg: "bg-red-100", text: "text-red-700", label: "Open" },
    in_progress: { bg: "bg-amber-100", text: "text-amber-700", label: "In Progress" },
    resolved: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Resolved" },
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Problems</h1>

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

      {loaded && problems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500">No problems reported yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {problems.map((p) => {
            const status = statusConfig[p.status] || statusConfig.open;
            return (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900">{p.classroom}</h3>
                    <p className="text-sm text-gray-600 mt-1">{p.description}</p>
                    <p className="text-xs text-gray-400 mt-2">{new Date(p.created_at).toLocaleDateString("en-IN")}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${status.bg} ${status.text}`}>
                    {status.label}
                  </span>
                </div>
                {p.status !== "resolved" && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                    {p.status === "open" && (
                      <Button size="sm" variant="outline" onClick={() => updateStatus(p.id, "in_progress")} className="text-amber-600 border-amber-200 hover:bg-amber-50">
                        <Clock className="w-4 h-4 mr-1" /> Mark In Progress
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => updateStatus(p.id, "resolved")} className="text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                      <CheckCircle className="w-4 h-4 mr-1" /> Mark Resolved
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}