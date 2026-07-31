"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Camera, ImagePlus, X, Heart, Download, Share2 } from "lucide-react";

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setImages(data || []);
        setLoaded(true);
      });
  }, [supabase]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-gray-900">
          Gallery
        </h1>
        <p className="text-sm text-gray-500 mt-1">Captured moments at PIET Sanskriti</p>
      </div>

      {/* Content */}
      {images.length === 0 ? (
        <div
          className="text-center py-24 bg-white rounded-3xl border border-gray-200"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.5s ease 0.2s",
          }}
        >
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
            <ImagePlus className="w-9 h-9 text-gray-300" />
          </div>
          <p className="text-gray-900 font-semibold text-lg">No photos yet</p>
          <p className="text-sm text-gray-400 mt-2">Photos will appear here once uploaded</p>
        </div>
      ) : (
        <div className="columns-2 md:columns-3 gap-2 sm:gap-3">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="break-inside-avoid mb-2 sm:mb-3 cursor-pointer group"
              onClick={() => setLightbox(i)}
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0) scale(1)" : "translateY(15px) scale(0.98)",
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.03 + i * 0.04}s`,
              }}
            >
              <div className="relative rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={img.image_url}
                  alt={img.caption || "Gallery photo"}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-3 text-white">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                    </div>
                    {img.caption && (
                      <p className="text-xs font-medium truncate">{img.caption}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && images[lightbox] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col animate-in fade-in duration-300"
          onClick={() => setLightbox(null)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">PIET Sanskriti</p>
                <p className="text-xs text-white/50">Gallery</p>
              </div>
            </div>
            <button
              className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image */}
          <div className="flex-1 flex items-center justify-center px-4 pb-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightbox].image_url}
              alt={images[lightbox].caption || "Gallery photo"}
              className="max-w-full max-h-[75vh] object-contain rounded-xl"
            />
          </div>

          {/* Bottom Bar */}
          <div className="p-4 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <div className="flex items-center gap-6">
                <button className="text-white/60 hover:text-white transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="text-white/60 hover:text-white transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
                <button className="text-white/60 hover:text-white transition-colors">
                  <Download className="w-6 h-6" />
                </button>
              </div>
              <p className="text-xs text-white/40">
                {images[lightbox].caption || ""}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
