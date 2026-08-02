import React from "react";
import { PhoneMockup } from "@/components/infographic/PhoneMockup";

function HeroPhone() {
  return (
    <div className="h-full w-full bg-[#faf8f5]">
      {/* Mobile Header */}
      <div className="flex h-14 items-center justify-between border-b border-gray-100 bg-white/95 px-3 backdrop-blur-2xl">
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-gray-900 font-['Playfair_Display'] text-[7px] font-bold text-white">P</div>
          <span className="text-[9px] font-bold text-gray-900">Portal</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[7px] text-gray-400">Home</span>
          <span className="text-[7px] text-red-500">Logout</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 p-2 pb-16">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gray-900 p-3">
          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/[0.03]" />
          <div className="text-[6px] uppercase tracking-widest text-white/50">Student Portal</div>
          <div className="mt-0.5 font-['Playfair_Display'] text-[11px] font-bold text-white">Welcome back</div>
          <div className="mt-0.5 text-[6px] text-white/50">Here&apos;s what&apos;s happening today</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-1">
          {[
            { color: "bg-blue-500", num: "12", label: "Posts" },
            { color: "bg-emerald-500", num: "5", label: "Events" },
            { color: "bg-purple-500", num: "48", label: "Photos" },
            { color: "bg-rose-500", num: "3", label: "Issues" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-gray-100 bg-white p-1.5">
              <div className={`mb-1 h-3 w-3 rounded-md ${s.color}`} />
              <div className="text-[10px] font-bold text-gray-900">{s.num}</div>
              <div className="text-[5px] text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Latest Posts */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="font-['Playfair_Display'] text-[9px] font-bold text-gray-900">Latest Posts</span>
            <span className="text-[5px] text-gray-400">View all</span>
          </div>
          <div className="space-y-1.5">
            {[
              { title: "Science Exhibition 2026", body: "Annual science exhibition with 50+ projects from classes 6-12." },
              { title: "Sports Day Results", body: "Congratulations to all participants and winners!" },
            ].map((p) => (
              <div key={p.title} className="rounded-xl border border-gray-200 bg-white p-2">
                <div className="flex items-start gap-1.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-900">
                    <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[7px] font-semibold text-gray-900">{p.title}</div>
                    <div className="text-[5px] text-gray-400 line-clamp-1">{p.body}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="font-['Playfair_Display'] text-[9px] font-bold text-gray-900">Upcoming Events</span>
            <span className="text-[5px] text-gray-400">View all</span>
          </div>
          <div className="space-y-1.5">
            {[
              { title: "Parent-Teacher Meeting", date: "Aug 5", month: "Aug" },
              { title: "Independence Day Assembly", date: "Aug 15", month: "Aug" },
            ].map((e) => (
              <div key={e.title} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-2">
                <div className="flex h-8 w-8 shrink-0 flex-col items-center justify-center rounded-lg bg-emerald-50">
                  <text className="text-[5px] font-bold text-emerald-600">{e.month}</text>
                  <text className="text-[7px] font-bold text-emerald-700">{e.date.split(" ")[1]}</text>
                </div>
                <div className="text-[7px] font-semibold text-gray-900">{e.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center border-t border-gray-100 bg-white/95 pb-4 pt-1.5 backdrop-blur-2xl">
        {[
          { name: "Home", active: true },
          { name: "Posts", active: false },
          { name: "Events", active: false },
          { name: "Gallery", active: false },
          { name: "Lost", active: false },
          { name: "Issues", active: false },
        ].map((tab) => (
          <div key={tab.name} className="flex flex-1 flex-col items-center gap-0.5">
            {tab.active ? (
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gray-900 shadow-lg shadow-gray-900/20">
                <div className="h-3 w-3 rounded bg-white" />
              </div>
            ) : (
              <div className="h-3 w-3 rounded bg-gray-300" />
            )}
            <span className={`text-[5px] ${tab.active ? "font-medium text-gray-900" : "text-gray-400"}`}>{tab.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryPhone() {
  return (
    <div className="h-full w-full bg-[#faf8f5]">
      {/* Mobile Header */}
      <div className="flex h-14 items-center justify-between border-b border-gray-100 bg-white/95 px-3 backdrop-blur-2xl">
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-gray-900 font-['Playfair_Display'] text-[7px] font-bold text-white">P</div>
          <span className="text-[9px] font-bold text-gray-900">Portal</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[7px] text-gray-400">Home</span>
          <span className="text-[7px] text-red-500">Logout</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 pb-16">
        <div className="mb-2">
          <div className="font-['Playfair_Display'] text-[11px] font-bold text-gray-900">Gallery</div>
          <div className="text-[6px] text-gray-500">Captured moments at PIET Sanskriti</div>
        </div>
        <div className="columns-2 gap-1">
          {["glimpse-01.jpg", "glimpse-02.jpg", "glimpse-03.jpg", "glimpse-04.jpg", "glimpse-05.jpg", "glimpse-06.jpg"].map((img, i) => (
            <div key={img} className="mb-1 break-inside-avoid overflow-hidden rounded-xl bg-gray-100">
              <img
                src={`/images/${img}`}
                alt=""
                className="w-full object-cover"
                style={{ height: i % 3 === 0 ? "70px" : i % 3 === 1 ? "55px" : "65px" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center border-t border-gray-100 bg-white/95 pb-4 pt-1.5 backdrop-blur-2xl">
        {[
          { name: "Home", active: false },
          { name: "Posts", active: false },
          { name: "Events", active: false },
          { name: "Gallery", active: true },
          { name: "Lost", active: false },
          { name: "Issues", active: false },
        ].map((tab) => (
          <div key={tab.name} className="flex flex-1 flex-col items-center gap-0.5">
            {tab.active ? (
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gray-900 shadow-lg shadow-gray-900/20">
                <div className="h-3 w-3 rounded bg-white" />
              </div>
            ) : (
              <div className="h-3 w-3 rounded bg-gray-300" />
            )}
            <span className={`text-[5px] ${tab.active ? "font-medium text-gray-900" : "text-gray-400"}`}>{tab.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminPhone() {
  return (
    <div className="h-full w-full bg-[#faf8f5]">
      {/* Dark Mobile Header */}
      <div className="flex h-14 items-center justify-between bg-gray-900 px-3">
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-white font-['Playfair_Display'] text-[7px] font-bold text-gray-900">P</div>
          <span className="text-[9px] font-bold text-white">Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[7px] text-white/50">Home</span>
          <span className="text-[7px] text-red-400">Logout</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 p-2 pb-16">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a2e] via-[#1a1a2e] to-gray-800 p-3">
          <div className="absolute -right-8 -bottom-8 h-20 w-20 rounded-full bg-white/5" />
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/10">
            <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div className="mt-1 font-['Playfair_Display'] text-[11px] font-bold text-white">Admin Dashboard</div>
          <div className="text-[6px] text-white/70">Manage all content and settings</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-1">
          {[
            { gradient: "from-blue-500 to-blue-600", num: "8", label: "Posts" },
            { gradient: "from-emerald-500 to-emerald-600", num: "5", label: "Events" },
            { gradient: "from-purple-500 to-purple-600", num: "48", label: "Gallery" },
            { gradient: "from-amber-500 to-orange-500", num: "12", label: "Items" },
            { gradient: "from-rose-500 to-red-500", num: "3", label: "Issues" },
            { gradient: "from-gray-500 to-gray-600", num: "24", label: "Users" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-gray-100 bg-white p-1.5">
              <div className={`mb-1 h-4 w-4 rounded-lg bg-gradient-to-br ${s.gradient} shadow-md`} />
              <div className="text-[10px] font-bold text-gray-900">{s.num}</div>
              <div className="text-[5px] text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl bg-gray-50 p-2">
          <div className="mb-1.5 flex items-center gap-1">
            <svg className="h-2.5 w-2.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            <span className="text-[7px] font-semibold text-gray-700">Quick Actions</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {["Announcements", "Events", "Gallery"].map((a) => (
              <div key={a} className="rounded-lg bg-white p-1.5 text-center border border-gray-100">
                <div className="mx-auto mb-0.5 h-3 w-3 rounded bg-gray-200" />
                <div className="text-[5px] text-gray-600">{a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Content */}
        <div>
          <div className="mb-1 font-['Playfair_Display'] text-[8px] font-bold text-gray-900">Recent Announcements</div>
          <div className="space-y-1">
            {["Science Exhibition 2026", "Sports Day Results"].map((t) => (
              <div key={t} className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white p-1.5">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-900">
                  <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div className="text-[7px] font-medium text-gray-900">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dark Bottom Tab Bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center border-t border-white/10 bg-gray-900 pb-4 pt-1.5">
        {[
          { name: "Home", active: true },
          { name: "Posts", active: false },
          { name: "Events", active: false },
          { name: "Gallery", active: false },
        ].map((tab) => (
          <div key={tab.name} className="flex flex-1 flex-col items-center gap-0.5">
            {tab.active ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-white shadow-lg shadow-white/10">
                <div className="h-3 w-3 rounded bg-gray-900" />
              </div>
            ) : (
              <div className="h-3 w-3 rounded bg-white/20" />
            )}
            <span className={`text-[5px] ${tab.active ? "font-medium text-white" : "text-white/40"}`}>{tab.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatBlock({ num, label, fill }: { num: string; label: string; fill: number }) {
  return (
    <div className="border border-[#D8CFC0] bg-white p-5">
      <div className="font-['Playfair_Display'] text-[36px] font-bold leading-none text-[#C97B4A]">{num}</div>
      <div className="mt-1 text-[13px] text-[#8C8172]">{label}</div>
      <div className="mt-3 h-1 overflow-hidden rounded bg-[#E8DFD0]">
        <div className="h-full rounded bg-[#C97B4A]" style={{ width: `${fill}%` }} />
      </div>
    </div>
  );
}

function RoleCard({ icon, name, desc, features, color }: { icon: React.ReactNode; name: string; desc: string; features: string[]; color: string }) {
  return (
    <div className="relative border border-[#D8CFC0] bg-white p-6">
      <div className="absolute left-0 right-0 top-0 h-[3px]" style={{ background: color }} />
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px]"
        style={{ background: `${color}15`, color }}
      >
        {icon}
      </div>
      <div className="text-lg font-semibold text-[#1A1612]">{name}</div>
      <div className="mb-4 text-[13px] leading-snug text-[#8C8172]">{desc}</div>
      <ul className="space-y-0">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 border-b border-black/[0.04] py-1.5 text-[13px] text-[#5C5248] last:border-b-0">
            <div className="h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: color }} />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureCard({ num, name, detail }: { num: string; name: string; detail: string }) {
  return (
    <div className="border border-[#D8CFC0] bg-white p-6">
      <div className="font-['Playfair_Display'] text-[40px] font-bold leading-none text-[#C97B4A]/10">{num}</div>
      <div className="mt-2 text-[15px] font-semibold text-[#1A1612]">{name}</div>
      <div className="mt-1 text-[12px] leading-relaxed text-[#8C8172]">{detail}</div>
    </div>
  );
}

function TechPill({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 border border-[#D8CFC0] bg-white px-5 py-3 text-[13px] font-medium text-[#1A1612]">
      <div className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
      {children}
    </div>
  );
}

function FlowStep({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex-1 px-4 text-center">
      <div className="font-['Playfair_Display'] text-[28px] font-bold text-[#C97B4A]">{num}</div>
      <div className="mt-1 text-[14px] font-semibold text-[#1A1612]">{title}</div>
      <div className="mt-1 text-[11px] leading-snug text-[#8C8172]">{desc}</div>
    </div>
  );
}

export default function InfographicPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] bg-[#FAF6EE] font-['Inter',sans-serif] text-[#1A1612]">
      {/* ═══ HERO ═══ */}
      <div className="relative overflow-hidden bg-[#0F2630] px-20 py-16">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(201,123,74,0.12)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B08D57] to-transparent" />

        <div className="relative z-10 mb-10 flex items-center justify-between">
          <div className="border border-[#B08D57]/25 bg-[#B08D57]/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#B08D57]">
            Hackathon Project 2026
          </div>
          <div className="text-[11px] tracking-wide text-white/35">
            Built by <span className="font-medium text-[#D4B96A]">Garvit Gupta</span> &{" "}
            <span className="font-medium text-[#D4B96A]">Namish Saroha</span> — Class 8-D
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="font-['Playfair_Display'] text-[52px] font-bold leading-[1.1] tracking-[-0.02em] text-[#FEFCF8]">
            PIET Sanskriti
            <br />
            <em className="italic text-[#D4B96A]">School Portal</em>
          </h1>
          <p className="mt-3 max-w-[500px] text-[18px] font-light leading-relaxed text-white/50">
            A <strong className="font-medium text-[#C97B4A]">full-stack web application</strong> that replaces
            scattered WhatsApp groups, paper notices, and manual tracking with one unified digital platform.
          </p>
        </div>

        <div className="relative z-10 mt-10 flex gap-12 border-t border-white/[0.08] pt-8">
          {[
            { num: "3", label: "User Roles" },
            { num: "6", label: "Core Modules" },
            { num: "22", label: "Pages Built" },
            { num: "9", label: "Tech Stack" },
            { num: "0", label: "Lines of Dead Code" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-['Playfair_Display'] text-[36px] font-bold leading-none text-[#D4B96A]">{s.num}</div>
              <div className="mt-1.5 text-[11px] uppercase tracking-[0.12em] text-white/40">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ PROBLEM ═══ */}
      <div className="border-b border-[#D8CFC0] px-20 py-14">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#C97B4A]">01 — The Problem</div>
        <h2 className="mt-2 font-['Playfair_Display'] text-[32px] font-semibold leading-[1.15] tracking-[-0.01em] text-[#1A1612]">
          Schools Still Run on Paper & WhatsApp
        </h2>
        <p className="mt-2 max-w-[480px] text-[15px] leading-relaxed text-[#8C8172]">
          Announcements buried in group chats. Lost items never found. No central source of truth.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-10">
          <div>
            <p className="text-[14px] leading-[1.7] text-[#5C5248]">
              Every school day, critical information flows through chaotic WhatsApp groups, paper notices that get
              lost, and word-of-mouth that distorts. The PIET Sanskriti School Portal solves this by providing a{" "}
              <strong className="font-semibold text-[#1A1612]">single, role-based platform</strong> where every
              stakeholder gets exactly the tools they need.
            </p>
          </div>
          <div className="space-y-4">
            <StatBlock num="73%" label="of school communications lost in WhatsApp noise" fill={73} />
            <StatBlock num="89%" label="of lost & found items are never recovered" fill={89} />
            <StatBlock num="0" label="existing digital platforms for PIET Sanskriti" fill={5} />
          </div>
        </div>
      </div>

      {/* ═══ THREE ROLES ═══ */}
      <div className="border-b border-[#D8CFC0] px-20 py-14">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#C97B4A]">02 — Three Roles. One Platform.</div>
        <h2 className="mt-2 font-['Playfair_Display'] text-[32px] font-semibold leading-[1.15] text-[#1A1612]">
          Every User Gets Their Own Dashboard
        </h2>
        <p className="mt-2 max-w-[480px] text-[15px] leading-relaxed text-[#8C8172]">
          Role-based access ensures students, teachers, and admin each see exactly what they need.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-6">
          <RoleCard
            color="#C97B4A"
            name="Student"
            desc="Access everything from one mobile-first dashboard"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
            features={["View announcements & events", "Browse photo gallery", "Report lost & found items", "Raise classroom issues", "Like & share posts"]}
          />
          <RoleCard
            color="#B08D57"
            name="Teacher"
            desc="Create content and manage classroom communication"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            }
            features={["Create announcements", "Post events with images", "Upload gallery photos", "Report lost & found items", "Submit classroom issues"]}
          />
          <RoleCard
            color="#1A3A4A"
            name="Admin"
            desc="Full content management with dark theme dashboard"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            }
            features={["Create / edit / delete announcements", "Manage events & gallery", "Review lost & found items", "Resolve classroom problems", "Manage user roles"]}
          />
        </div>
      </div>

      {/* ═══ FEATURES ═══ */}
      <div className="border-b border-[#D8CFC0] px-20 py-14">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#C97B4A]">03 — Core Features</div>
        <h2 className="mt-2 font-['Playfair_Display'] text-[32px] font-semibold leading-[1.15] text-[#1A1612]">
          Built for Real School Life
        </h2>
        <p className="mt-2 max-w-[480px] text-[15px] leading-relaxed text-[#8C8172]">
          Every feature solves an actual problem students and teachers face daily.
        </p>

        <div className="mt-10 grid grid-cols-4 gap-5">
          <FeatureCard num="01" name="Announcements" detail="Real-time feed with like & share. Never miss a school update." />
          <FeatureCard num="02" name="Events" detail="Browse events with date badges and image carousels." />
          <FeatureCard num="03" name="Photo Gallery" detail="Masonry grid with lightbox viewing. School moments preserved." />
          <FeatureCard num="04" name="Lost & Found" detail="Report found or missing items. One tap to recover." />
          <FeatureCard num="05" name="Classroom Issues" detail="Students raise problems. Admin resolves them." />
          <FeatureCard num="06" name="Like & Share" detail="Instagram-style engagement on posts and events." />
          <FeatureCard num="07" name="Image Upload" detail="Cloudinary-powered uploads with auto-compression." />
          <FeatureCard num="08" name="Mobile-First" detail="Bottom tab bar, fixed header. Feels like a native app." />
        </div>
      </div>

      {/* ═══ MOBILE SHOWCASE ═══ */}
      <div className="border-b border-[#D8CFC0] bg-[#F0EAE0] px-20 py-14">
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#C97B4A]">04 — Mobile Experience</div>
          <h2 className="mt-2 font-['Playfair_Display'] text-[32px] font-semibold leading-[1.15] text-[#1A1612]">
            Feels Like a Native App
          </h2>
          <p className="mx-auto mt-2 max-w-[480px] text-[15px] leading-relaxed text-[#8C8172]">
            Bottom tab navigation, fixed headers, touch-optimized. Works from 320px to 4K.
          </p>
        </div>

        <div className="mt-10 flex items-end justify-center gap-6">
          <PhoneMockup label="Feed">
            <HeroPhone />
          </PhoneMockup>
          <div className="scale-105">
            <PhoneMockup label="Gallery">
              <GalleryPhone />
            </PhoneMockup>
          </div>
          <PhoneMockup label="Admin">
            <AdminPhone />
          </PhoneMockup>
        </div>
      </div>

      {/* ═══ TECH STACK ═══ */}
      <div className="border-b border-[#D8CFC0] px-20 py-14">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#C97B4A]">05 — Technology</div>
        <h2 className="mt-2 font-['Playfair_Display'] text-[32px] font-semibold leading-[1.15] text-[#1A1612]">
          Modern Stack, Production-Ready
        </h2>
        <p className="mt-2 max-w-[480px] text-[15px] leading-relaxed text-[#8C8172]">
          9 technologies working together. No unnecessary dependencies.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <TechPill color="#38BDF8">Next.js 16</TechPill>
          <TechPill color="#06B6D4">Tailwind CSS v4</TechPill>
          <TechPill color="#8B5CF6">shadcn/ui</TechPill>
          <TechPill color="#10B981">Supabase</TechPill>
          <TechPill color="#F59E0B">Cloudinary</TechPill>
          <TechPill color="#6366F1">Vercel</TechPill>
          <TechPill color="#EC4899">Framer Motion</TechPill>
          <TechPill color="#3B82F6">TypeScript</TechPill>
          <TechPill color="#14B8A6">Lucide Icons</TechPill>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {["Auth: Supabase Auth + RLS", "DB: PostgreSQL via Supabase", "CDN: Cloudinary Optimization", "Deploy: Vercel Edge"].map((b) => (
            <div
              key={b}
              className="border border-[#D8CFC0] bg-white px-3 py-1.5 font-mono text-[10px] tracking-wide text-[#5C5248]"
            >
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ USER FLOW ═══ */}
      <div className="border-b border-[#D8CFC0] bg-[#F0EAE0] px-20 py-14">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#C97B4A]">06 — User Flow</div>
        <h2 className="mt-2 font-['Playfair_Display'] text-[32px] font-semibold leading-[1.15] text-[#1A1612]">
          From Login to Action in 3 Steps
        </h2>

        <div className="mt-10 flex items-center">
          <FlowStep num="01" title="Sign Up / Login" desc="Email + password. Supabase auth. Admin auto-promoted." />
          <div className="text-2xl text-[#D8CFC0]">→</div>
          <FlowStep num="02" title="Choose Role" desc="Student, Teacher, or Admin. Tailored dashboard." />
          <div className="text-2xl text-[#D8CFC0]">→</div>
          <FlowStep num="03" title="Take Action" desc="Post, browse, report, upload. One tap on mobile." />
          <div className="text-2xl text-[#D8CFC0]">→</div>
          <FlowStep num="04" title="Engage" desc="Like, share, comment. Real-time updates." />
        </div>
      </div>

      {/* ═══ HIGHLIGHT ═══ */}
      <div className="flex items-center justify-between bg-[#0F2630] px-20 py-12">
        <div>
          <h2 className="font-['Playfair_Display'] text-[28px] font-semibold text-[#FEFCF8]">
            Built by Two Class 8-D Students
          </h2>
          <p className="mt-1 text-[14px] text-white/45">
            Full-stack development, UI/UX design, deployment — all done by hand.
          </p>
        </div>
        <div className="flex gap-10">
          {[
            { num: "22", label: "Pages" },
            { num: "14", label: "Components" },
            { num: "33", label: "Images" },
            { num: "3", label: "Git Commits" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-['Playfair_Display'] text-[32px] font-bold text-[#D4B96A]">{s.num}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.1em] text-white/40">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <div className="flex items-center justify-between border-t border-[#D8CFC0] bg-[#F0EAE0] px-20 py-8">
        <div className="flex items-center gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1A3A4A] font-['Playfair_Display'] text-[16px] font-bold text-[#FEFCF8]">
            P
          </div>
          <div className="text-[13px] text-[#5C5248]">
            <strong className="font-semibold text-[#1A1612]">PIET Sanskriti School Portal</strong>
            <br />
            Your Digital School Companion
          </div>
        </div>
        <div className="text-right text-[11px] leading-relaxed text-[#8C8172]">
          <span className="font-medium text-[#C97B4A]">Garvit Gupta</span> — Lead Developer & Designer
          <br />
          <span className="font-medium text-[#C97B4A]">Namish Saroha</span> — Product Ideation & QA Lead
          <br />
          Class 8-D, PIET Sanskriti School
        </div>
      </div>
    </div>
  );
}
