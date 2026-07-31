"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Megaphone, Clock, Heart, Share2 } from "lucide-react";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);

      const { data } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      const itemsWithLikes = await Promise.all(
        (data || []).map(async (item) => {
          const { count } = await supabase
            .from("likes")
            .select("*", { count: "exact", head: true })
            .eq("item_id", item.id)
            .eq("item_type", "announcement");
          return { ...item, like_count: count || 0 };
        })
      );

      setAnnouncements(itemsWithLikes);

      if (currentUser) {
        const { data: userLikes } = await supabase
          .from("likes")
          .select("item_id")
          .eq("user_id", currentUser.id)
          .eq("item_type", "announcement");

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
        .eq("item_type", "announcement");

      setLikedItems((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });

      setAnnouncements((prev) =>
        prev.map((a) =>
          a.id === itemId ? { ...a, like_count: Math.max(0, (a.like_count || 1) - 1) } : a
        )
      );
    } else {
      await supabase.from("likes").insert({
        item_id: itemId,
        item_type: "announcement",
        user_id: user.id,
      });

      setLikedItems((prev) => new Set([...prev, itemId]));
      setAnnouncements((prev) =>
        prev.map((a) =>
          a.id === itemId ? { ...a, like_count: (a.like_count || 0) + 1 } : a
        )
      );
    }
  };

  const handleShare = async (item: any) => {
    if (navigator.share) {
      await navigator.share({
        title: item.title,
        text: item.body,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(`${item.title}\n${item.body}\n${window.location.href}`);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-gray-900">
          Announcements
        </h1>
        <p className="text-sm text-gray-500 mt-1">Latest updates from the school</p>
      </div>

      {announcements.length === 0 ? (
        <div
          className="text-center py-24 bg-white rounded-3xl border border-gray-200"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.5s ease 0.2s",
          }}
        >
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
            <Megaphone className="w-9 h-9 text-gray-300" />
          </div>
          <p className="text-gray-900 font-semibold text-lg">No announcements yet</p>
          <p className="text-sm text-gray-400 mt-2">Check back later for updates</p>
        </div>
      ) : (
        <div className="space-y-6">
          {announcements.map((a, i) => (
            <article
              key={a.id}
              className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-500"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.05 + i * 0.08}s`,
              }}
            >
              <div className="p-5 pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center">
                    <Megaphone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">PIET Sanskriti Admin</p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {new Date(a.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {a.image_url && (
                <div className="mt-4 relative">
                  <img src={a.image_url} alt={a.title} className="w-full object-cover max-h-96" />
                </div>
              )}

              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-playfair)]">
                  {a.title}
                </h2>
                <p className="text-gray-600 mt-2 leading-relaxed whitespace-pre-wrap">{a.body}</p>
              </div>

              <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => handleLike(a.id)}
                    className="flex items-center gap-1.5 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${
                        likedItems.has(a.id)
                          ? "fill-rose-500 text-rose-500 scale-110"
                          : "text-gray-400 hover:text-rose-500"
                      }`}
                    />
                    <span className={`text-xs font-medium ${likedItems.has(a.id) ? "text-rose-500" : "text-gray-400"}`}>
                      {a.like_count || 0}
                    </span>
                  </button>
                  <button
                    onClick={() => handleShare(a)}
                    className="flex items-center gap-1.5 text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    <span className="text-xs font-medium">Share</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
