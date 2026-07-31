"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import {
  Bell,
  Calendar,
  Camera,
  Package,
  AlertTriangle,
  Shield,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

function AnimatedCounter({ value, delay = 0 }: { value: number; delay?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const step = Math.max(1, Math.floor(value / 30));
      const interval = setInterval(() => {
        start += step;
        if (start >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(start);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return <span>{count}</span>;
}

export default function AdminPage() {
  const [stats, setStats] = useState({
    announcements: 0,
    events: 0,
    gallery: 0,
    lostFound: 0,
    problems: 0,
  });
  const [loaded, setLoaded] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const [a, e, g, l, p] = await Promise.all([
        supabase.from("announcements").select("*", { count: "exact", head: true }),
        supabase.from("events").select("*", { count: "exact", head: true }),
        supabase.from("gallery").select("*", { count: "exact", head: true }),
        supabase.from("lost_found").select("*", { count: "exact", head: true }),
        supabase.from("classroom_problems").select("*", { count: "exact", head: true }),
      ]);
      setStats({
        announcements: a.count || 0,
        events: e.count || 0,
        gallery: g.count || 0,
        lostFound: l.count || 0,
        problems: p.count || 0,
      });
      setLoaded(true);
    };
    fetchData();
  }, [supabase]);

  const cards = [
    {
      label: "Announcements",
      value: stats.announcements,
      icon: Bell,
      gradient: "from-blue-500 to-blue-600",
      shadow: "shadow-blue-500/20",
      href: "/admin/announcements",
    },
    {
      label: "Events",
      value: stats.events,
      icon: Calendar,
      gradient: "from-emerald-500 to-emerald-600",
      shadow: "shadow-emerald-500/20",
      href: "/admin/events",
    },
    {
      label: "Gallery",
      value: stats.gallery,
      icon: Camera,
      gradient: "from-purple-500 to-purple-600",
      shadow: "shadow-purple-500/20",
      href: "/admin/gallery",
    },
    {
      label: "Lost & Found",
      value: stats.lostFound,
      icon: Package,
      gradient: "from-amber-500 to-orange-500",
      shadow: "shadow-amber-500/20",
      href: "/admin/lost-found",
    },
    {
      label: "Problems",
      value: stats.problems,
      icon: AlertTriangle,
      gradient: "from-rose-500 to-red-500",
      shadow: "shadow-rose-500/20",
      href: "/admin/problems",
    },
  ];

  return (
    <div className="space-y-8">
      <div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-foreground via-foreground to-gray-800 p-8 text-white"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)]">
              Admin Dashboard
            </h1>
            <p className="text-white/70 text-sm mt-1">
              Manage all content and settings
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group relative bg-white rounded-2xl p-5 border border-gray-100 hover:border-transparent transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s`,
              }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 shadow-lg ${card.shadow} group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                <AnimatedCounter value={card.value} delay={200 + i * 100} />
              </p>
              <p className="text-sm text-gray-500 mt-1">{card.label}</p>
              <ArrowRight className="w-4 h-4 text-gray-300 absolute top-5 right-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          );
        })}
      </div>

      <div
        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.7s",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Link
            href="/admin/announcements"
            className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-gray-100"
          >
            <Bell className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Announcements</p>
          </Link>
          <Link
            href="/admin/events"
            className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-gray-100"
          >
            <Calendar className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Events</p>
          </Link>
          <Link
            href="/admin/gallery"
            className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-gray-100"
          >
            <Camera className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Gallery</p>
          </Link>
          <Link
            href="/admin/lost-found"
            className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-gray-100"
          >
            <Package className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Lost & Found</p>
          </Link>
          <Link
            href="/admin/problems"
            className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-gray-100"
          >
            <AlertTriangle className="w-6 h-6 text-rose-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Problems</p>
          </Link>
        </div>
      </div>
    </div>
  );
}