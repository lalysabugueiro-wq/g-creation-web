"use client";

// Comprime una foto en el navegador antes de subirla (modulos/09-cms.md): una
// foto de móvil de 8 MB y 4000 px queda en unos cientos de KB, así la subida
// es rápida con datos y la web sigue ligera.
export async function compressImage(file: File, maxWidth: number): Promise<Blob> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, maxWidth / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Sin canvas");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const toBlob = (type: string, quality: number) =>
    new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));

  // WebP donde el navegador lo soporte; si no, JPEG.
  const webp = await toBlob("image/webp", 0.82);
  const out = webp && webp.type === "image/webp" ? webp : await toBlob("image/jpeg", 0.84);
  if (!out) throw new Error("No se pudo comprimir");

  // Si la foto ya venía chica y optimizada, comprimir puede agrandarla: en ese
  // caso se sube la original tal cual.
  const alreadySmall = scale === 1 && ["image/jpeg", "image/webp", "image/png"].includes(file.type);
  return alreadySmall && file.size <= out.size ? file : out;
}

export const formatKB = (bytes: number) =>
  bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
