"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Plus, X, Trash2, Megaphone, Clock, Send, ImagePlus, Heart } from "lucide-react";

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [form, setForm] = useState({ title: "", body: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const fetchItems = async () => {
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

    setItems(itemsWithLikes);
    setLoaded(true);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      let image_url = null;
      if (imageFile) {
        setUploadingImage(true);
        image_url = await uploadToCloudinary(imageFile);
        setUploadingImage(false);
      }

      const { error: insertError } = await supabase.from("announcements").insert({
        ...form,
        image_url,
        created_by: user?.id,
      });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      setSuccessMsg("Announcement posted");
      setForm({ title: "", body: "" });
      setImageFile(null);
      setImagePreview(null);
      setShowForm(false);
      setLoading(false);
      fetchItems();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to post");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    fetchItems();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-gray-900">
            Announcements
          </h1>
          <p className="text-sm text-gray-500 mt-1">Share updates with the school</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-300 active:scale-95"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "New Post"}
        </button>
      </div>

      {successMsg && (
        <div className="mb-6 bg-gray-900 text-white px-5 py-3 rounded-2xl text-sm font-medium flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
          <Send className="w-4 h-4" />
          {successMsg}
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-5 py-3 rounded-2xl text-sm flex items-center justify-between animate-in slide-in-from-top-2 duration-300">
          {error}
          <button onClick={() => setError("")} className="text-red-400 hover:text-red-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {showForm && (
        <div className="mb-8 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm animate-in slide-in-from-top-4 duration-500">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">New Announcement</p>
                <p className="text-xs text-gray-400">This will be visible to all students and teachers</p>
              </div>
            </div>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Announcement title"
              className="w-full text-lg font-semibold text-gray-900 placeholder-gray-300 bg-transparent border-0 outline-none mb-4"
              required
            />
            <textarea
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="Write your announcement..."
              className="w-full text-gray-600 placeholder-gray-300 bg-transparent border-0 outline-none resize-none leading-relaxed"
              rows={4}
              required
            />

            {/* Image Upload */}
            <div className="mt-4">
              <input
                ref={fileRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleImageSelect}
              />
              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full max-h-60 object-cover" />
                  <button
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                      if (fileRef.current) fileRef.current.value = "";
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-200 rounded-xl p-4 text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors flex items-center justify-center gap-2"
                >
                  <ImagePlus className="w-5 h-5" />
                  <span className="text-sm">Add photo or video</span>
                </button>
              )}
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !form.title || !form.body}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            >
              {loading ? "Posting..." : "Post Announcement"}
            </button>
          </div>
        </div>
      )}

      {loaded && items.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-gray-200">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
            <Megaphone className="w-9 h-9 text-gray-300" />
          </div>
          <p className="text-gray-900 font-semibold text-lg">No announcements yet</p>
          <p className="text-sm text-gray-400 mt-2">Create your first announcement to get started</p>
        </div>
      ) : (
        <div className="space-y-6">
          {items.map((a, i) => (
            <article
              key={a.id}
              className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-500 group"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.05 + i * 0.08}s`,
              }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
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
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="opacity-0 group-hover:opacity-100 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-5">
                  <h2 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-playfair)]">
                    {a.title}
                  </h2>
                  <p className="text-gray-600 mt-3 leading-relaxed whitespace-pre-wrap">{a.body}</p>
                </div>

                {a.like_count > 0 && (
                  <div className="flex items-center gap-1.5 mt-4 text-xs text-gray-400">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    {a.like_count} {a.like_count === 1 ? "like" : "likes"}
                  </div>
                )}
              </div>

              {a.image_url && (
                <div className="relative">
                  <img src={a.image_url} alt={a.title} className="w-full object-cover max-h-96" />
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
