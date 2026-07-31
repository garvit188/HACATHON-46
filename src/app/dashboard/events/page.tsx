"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CalendarDays, MapPin, Heart, Share2 } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);

      const { data } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: false });

      const itemsWithLikes = await Promise.all(
        (data || []).map(async (item) => {
          const { count } = await supabase
            .from("likes")
            .select("*", { count: "exact", head: true })
            .eq("item_id", item.id)
            .eq("item_type", "event");
          return { ...item, like_count: count || 0 };
        })
      );

      setEvents(itemsWithLikes);

      if (currentUser) {
        const { data: userLikes } = await supabase
          .from("likes")
          .select("item_id")
          .eq("user_id", currentUser.id)
          .eq("item_type", "event");

        setLikedItems(new Set(userLikes?.map((l) => l.item_id) || []));
      }

      setLoaded(true);
    };

    fetchData();
  }, [supabase]);

  const handleLike = async (itemId: string) => {
    if (!user) return;

    const isLiked = likedItems.has(itemId);

    if (isLiked) {
      await supabase
        .from("likes")
        .delete()
        .eq("item_id", itemId)
        .eq("user_id", user.id)
        .eq("item_type", "event");

      setLikedItems((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });

      setEvents((prev) =>
        prev.map((e) =>
          e.id === itemId ? { ...e, like_count: Math.max(0, (e.like_count || 1) - 1) } : e
        )
      );
    } else {
      await supabase.from("likes").insert({
        item_id: itemId,
        item_type: "event",
        user_id: user.id,
      });

      setLikedItems((prev) => new Set([...prev, itemId]));
      setEvents((prev) =>
        prev.map((e) =>
          e.id === itemId ? { ...e, like_count: (e.like_count || 0) + 1 } : e
        )
      );
    }
  };

  const handleShare = async (item: any) => {
    if (navigator.share) {
      await navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(`${item.title}\n${item.description}\n${window.location.href}`);
      alert("Link copied to clipboard!");
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return {
      day: d.getDate(),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
      weekday: d.toLocaleDateString("en-IN", { weekday: "long" }),
      full: d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
    };
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-gray-900">
          Events
        </h1>
        <p className="text-sm text-gray-500 mt-1">What&apos;s happening at PIET Sanskriti</p>
      </div>

      {events.length === 0 ? (
        <div
          className="text-center py-24 bg-white rounded-3xl border border-gray-200"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.5s ease 0.2s",
          }}
        >
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
            <CalendarDays className="w-9 h-9 text-gray-300" />
          </div>
          <p className="text-gray-900 font-semibold text-lg">No events yet</p>
          <p className="text-sm text-gray-400 mt-2">Check back later for upcoming events</p>
        </div>
      ) : (
        <div className="space-y-5">
          {events.map((e, i) => {
            const date = formatDate(e.event_date);
            return (
              <article
                key={e.id}
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-500 group"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.05 + i * 0.08}s`,
                }}
              >
                {e.image_url && (
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={e.image_url}
                      alt={e.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 bg-white rounded-2xl px-4 py-2.5 text-center shadow-lg">
                      <p className="text-2xl font-bold text-gray-900 leading-none">{date.day}</p>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                        {date.month}
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {!e.image_url && (
                    <div className="flex items-center gap-4 mb-5">
                      <div className="bg-emerald-50 rounded-2xl px-5 py-3 text-center">
                        <p className="text-3xl font-bold text-emerald-700 leading-none">{date.day}</p>
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-500 mt-1">
                          {date.month}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">{date.weekday}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{date.full}</p>
                      </div>
                    </div>
                  )}

                  <h2 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-playfair)]">
                    {e.title}
                  </h2>
                  <p className="text-gray-500 mt-2 leading-relaxed">{e.description}</p>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {date.full}
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(e.id)}
                        className="flex items-center gap-1.5 transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 transition-all duration-300 ${
                            likedItems.has(e.id)
                              ? "fill-rose-500 text-rose-500 scale-110"
                              : "text-gray-400 hover:text-rose-500"
                          }`}
                        />
                        <span className={`text-xs font-medium ${likedItems.has(e.id) ? "text-rose-500" : "text-gray-400"}`}>
                          {e.like_count || 0}
                        </span>
                      </button>
                      <button
                        onClick={() => handleShare(e)}
                        className="text-gray-400 hover:text-emerald-500 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
