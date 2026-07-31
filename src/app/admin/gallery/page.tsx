"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Trash2, Upload, ImagePlus, X, Heart, Send } from "lucide-react";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const supabase = createClient();

  const fetchImages = async () => {
    const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    setImages(data || []);
    setLoaded(true);
  };

  useEffect(() => { fetchImages(); }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setShowUpload(true);
  };

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setLoading(true);
    setError("");

    try {
      const url = await uploadToCloudinary(file);
      const { data: { user } } = await supabase.auth.getUser();
      const { error: insertError } = await supabase.from("gallery").insert({
        image_url: url,
        caption: caption || null,
        uploaded_by: user?.id,
      });
      if (insertError) { setError(insertError.message); setLoading(false); return; }
      setSuccessMsg("Photo uploaded");
      setCaption("");
      setShowUpload(false);
      setPreview(null);
      fetchImages();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    }
    setLoading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) { setError(error.message); return; }
    fetchImages();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-gray-900">
            Gallery
          </h1>
          <p className="text-sm text-gray-500 mt-1">Share captured moments</p>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-300 active:scale-95"
        >
          <Upload className="w-4 h-4" />
          Upload
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
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

      {showUpload && preview && (
        <div className="mb-8 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm animate-in slide-in-from-top-4 duration-500">
          <div className="relative">
            <img src={preview} alt="Preview" className="w-full max-h-80 object-cover" />
            <button
              onClick={() => { setShowUpload(false); setPreview(null); }}
              className="absolute top-3 right-3 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-5">
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption..."
              className="w-full text-gray-900 placeholder-gray-300 bg-transparent border-0 outline-none text-sm"
            />
          </div>
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button
              onClick={handleUpload}
              disabled={loading}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-300 disabled:opacity-40 active:scale-95"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Uploading...
                </span>
              ) : (
                "Share"
              )}
            </button>
          </div>
        </div>
      )}

      {loaded && images.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-gray-200">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
            <ImagePlus className="w-9 h-9 text-gray-300" />
          </div>
          <p className="text-gray-900 font-semibold text-lg">No photos yet</p>
          <p className="text-sm text-gray-400 mt-2">Upload your first photo to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="relative aspect-square cursor-pointer group overflow-hidden bg-gray-100"
              onClick={() => setLightbox(i)}
              style={{
                opacity: loaded ? 1 : 0,
                transition: `opacity 0.5s ease ${0.02 + i * 0.03}s`,
              }}
            >
              <img
                src={img.image_url}
                alt={img.caption || ""}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-4 text-white">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-5 h-5 fill-white" />
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(img.id); }}
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {lightbox !== null && images[lightbox] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightbox].image_url}
              alt={images[lightbox].caption || "Gallery photo"}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            {images[lightbox].caption && (
              <div className="mt-4 text-center">
                <p className="text-white/80 text-sm">{images[lightbox].caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
