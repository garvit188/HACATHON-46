"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Shield, ArrowLeft, CheckCircle, AlertCircle, Loader2, Wrench } from "lucide-react";

export default function AdminSetupPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const supabase = createClient();

  const handlePromote = async () => {
    setStatus("loading");
    setMessage("");
    setDebugInfo(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setStatus("error");
      setMessage("Not logged in. Go to /login first.");
      return;
    }

    // Check current profile
    const { data: profile, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setDebugInfo({ email: user.email, currentRole: profile?.role, fetchError: fetchError?.message });

    if (user.email !== "admin@piet.com") {
      setStatus("error");
      setMessage("Only admin@piet.com can be promoted. Your email: " + user.email);
      return;
    }

    // Force update role to admin
    const { error, data } = await supabase
      .from("profiles")
      .update({ role: "admin" })
      .eq("id", user.id)
      .select();

    if (error) {
      setStatus("error");
      setMessage("Update failed: " + error.message);
      setDebugInfo((prev: any) => ({ ...prev, updateError: error.message, errorCode: error.code }));
      return;
    }

    // Verify the update
    const { data: verify } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    setDebugInfo((prev: any) => ({ ...prev, newRole: verify?.role, updated: data }));

    if (verify?.role === "admin") {
      setStatus("success");
      setMessage("Role is now admin! Redirecting...");
      setTimeout(() => router.push("/admin"), 1500);
    } else {
      setStatus("error");
      setMessage("Role update did not persist. Current role: " + verify?.role);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Wrench className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Setup</h1>
          <p className="text-sm text-gray-500 mt-2">
            Fix admin role for your account
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2 justify-center">
            <CheckCircle className="w-4 h-4" />
            {message}
          </div>
        ) : status === "error" ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {message}
            </div>
            {debugInfo && (
              <pre className="mt-3 text-xs bg-red-100 p-2 rounded-lg overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            )}
          </div>
        ) : null}

        {debugInfo && status === "idle" && (
          <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-xs">
            <p className="font-medium text-gray-700 mb-1">Current Status:</p>
            <pre className="overflow-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
          </div>
        )}

        <button
          onClick={handlePromote}
          disabled={status === "loading" || status === "success"}
          className="w-full bg-gray-900 text-white py-3.5 px-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Fixing...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4" />
              Fix Admin Role
            </>
          )}
        </button>

        <p className="text-xs text-gray-400 text-center">
          Login as <strong>admin@piet.com</strong> then click the button.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors w-full justify-center"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
