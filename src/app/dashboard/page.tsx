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
  ArrowRight,
  Sparkles,
  Clock,
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

export default function DashboardPage() {
  const [stats, setStats] = useState({
    announcements: 0,
    events: 0,
    gallery: 0,
    lostFound: 0,
    problems: 0,
  });
  const [recentAnnouncements, setRecentAnnouncements] = useState<any[]>([]);
  const [recentEvents, setRecentEvents] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const [ann, events, gallery, lost, problems] = await Promise.all([
        supabase.from("announcements").select("*"),
        supabase.from("events").select("*"),
        supabase.from("gallery").select("*"),
        supabase.from("lost_found").select("*"),
        supabase.from("classroom_problems").select("*"),
      ]);

      setStats({
        announcements: ann.data?.length || 0,
        events: events.data?.length || 0,
        gallery: gallery.data?.length || 0,
        lostFound: lost.data?.length || 0,
        problems: problems.data?.length || 0,
      });

      setRecentAnnouncements(ann.data?.slice(0, 3) || []);
      setRecentEvents(events.data?.slice(0, 3) || []);
      setLoaded(true);
    };
    fetchData();
  }, [supabase]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <div
        className="relative overflow-hidden rounded-[2rem] bg-gray-900 p-8 sm:p-10 text-white mb-10"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/[0.02] rounded-full translate-y-1/2 -translate-x-1/3" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-white/50" />
            <span className="text-xs font-medium text-white/50 uppercase tracking-widest">Student Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-playfair)]">
            Welcome back
          </h1>
          <p className="text-white/50 mt-3 text-sm sm:text-base max-w-md leading-relaxed">
            Stay connected with everything happening at PIET Sanskriti School.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { label: "Posts", value: stats.announcements, icon: Bell, color: "text-blue-500" },
          { label: "Events", value: stats.events, icon: Calendar, color: "text-emerald-500" },
          { label: "Photos", value: stats.gallery, icon: Camera, color: "text-purple-500" },
          { label: "Issues", value: stats.problems, icon: AlertTriangle, color: "text-rose-500" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-gray-200 transition-all duration-300"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(15px)",
              transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.05}s`,
            }}
          >
            <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
            <p className="text-3xl font-bold text-gray-900">
              <AnimatedCounter value={stat.value} delay={200 + i * 80} />
            </p>
            <p className="text-xs text-gray-400 mt-1 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div
        className="mb-10"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(15px)",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
        }}
      >
        <h2 className="text-lg font-bold text-gray-900 mb-4 font-[family-name:var(--font-playfair)]">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Report Item", icon: Package, color: "bg-amber-50 text-amber-600", href: "/dashboard/lost-found" },
            { label: "Report Issue", icon: AlertTriangle, color: "bg-rose-50 text-rose-600", href: "/dashboard/problems" },
            { label: "View Gallery", icon: Camera, color: "bg-purple-50 text-purple-600", href: "/dashboard/gallery" },
            { label: "Announcements", icon: Bell, color: "bg-blue-50 text-blue-600", href: "/dashboard/announcements" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-gray-700">{action.label}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Announcements */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-playfair)]">Latest Posts</h2>
            <Link href="/dashboard/announcements" className="text-xs text-gray-400 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentAnnouncements.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                <Bell className="w-8 h-8 text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-gray-400">No posts yet</p>
              </div>
            ) : (
              recentAnnouncements.map((a) => (
                <Link
                  key={a.id}
                  href="/dashboard/announcements"
                  className="block bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                      <Bell className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{a.title}</p>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{a.body}</p>
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-300">
                        <Clock className="w-3 h-3" />
                        {new Date(a.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Events */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-playfair)]">Upcoming Events</h2>
            <Link href="/dashboard/events" className="text-xs text-gray-400 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentEvents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                <Calendar className="w-8 h-8 text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-gray-400">No events yet</p>
              </div>
            ) : (
              recentEvents.map((e) => (
                <Link
                  key={e.id}
                  href="/dashboard/events"
                  className="block bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-50 rounded-xl px-3 py-2 text-center flex-shrink-0">
                      <p className="text-xl font-bold text-emerald-700 leading-none">
                        {new Date(e.event_date).getDate()}
                      </p>
                      <p className="text-[9px] font-bold uppercase text-emerald-500 mt-0.5">
                        {new Date(e.event_date).toLocaleDateString("en-IN", { month: "short" })}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{e.title}</p>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{e.description}</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
