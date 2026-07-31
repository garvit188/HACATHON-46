"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { IMAGES, SCHOOL_INFO } from "@/lib/constants";
import {
  Bell,
  Calendar,
  Camera,
  Package,
  AlertTriangle,
  LogOut,
  LayoutDashboard,
  Shield,
  Home,
} from "lucide-react";

const adminLinks = [
  { label: "Home", href: "/admin", icon: LayoutDashboard },
  { label: "Posts", href: "/admin/announcements", icon: Bell },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Gallery", href: "/admin/gallery", icon: Camera },
  { label: "Items", href: "/admin/lost-found", icon: Package },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [checking, setChecking] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUser(user);

      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();

      // Auto-promote admin@piet.com
      if (data && data.role !== "admin" && user.email === "admin@piet.com") {
        await supabase.from("profiles").update({ role: "admin" }).eq("id", user.id);
        data.role = "admin";
      }

      if (data?.role !== "admin") { router.push("/dashboard"); return; }
      setProfile(data);
      setChecking(false);
    };
    getUser();
  }, [supabase, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-gray-900 text-white flex-col fixed h-full">
        <div className="p-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <img src={IMAGES.logo} alt="PIET" className="h-10 w-auto brightness-0 invert" />
            <div>
              <p className="text-xs font-bold leading-tight">{SCHOOL_INFO.name}</p>
              <p className="text-[10px] text-white/40 flex items-center gap-1">
                <Shield className="w-3 h-3" /> Admin Panel
              </p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-gray-900"
                    : "text-white/50 hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-3">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:bg-white/10 transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {profile?.full_name?.[0] || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{profile?.full_name}</p>
              <p className="text-xs text-white/40">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-white/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 text-white">
        <div className="px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src={IMAGES.logo} alt="PIET" className="h-8 w-auto brightness-0 invert" />
            <span className="text-sm font-bold">Admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-white/10 rounded-lg transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-white/10">
        <div className="flex items-center justify-around h-[68px] px-1 pb-safe">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center justify-center gap-1 w-16 h-full relative"
              >
                <div
                  className={`w-11 h-11 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-white text-gray-900 scale-105 shadow-lg shadow-white/10"
                      : "text-white/40"
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? "text-white" : "text-white/40"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 pt-14 lg:pt-0 pb-20 lg:pb-0 min-h-screen">
        <div className="p-5 lg:p-8 max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
