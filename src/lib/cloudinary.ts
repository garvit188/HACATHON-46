export async function uploadToCloudinary(
  file: File,
  folder: string = "piet-portal",
  type: "image" | "video" = "image"
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
  formData.append("folder", folder);

  if (type === "image") {
    formData.append("quality", "50");
    formData.append("fetch_format", "auto");
  }

  const endpoint = type === "video" ? "video" : "image";

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${endpoint}/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.secure_url;
}

export function getCompressedUrl(url: string, quality: number = 50): string {
  if (!url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", `/upload/q_${quality},f_auto/`);
}
