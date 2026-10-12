import type { Photo } from "../types";

const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD as string | undefined;

/**
 * Returns the URL to use for a photo.
 * - Without Cloudinary configured: the local, bundled asset.
 * - With VITE_CLOUDINARY_CLOUD set and a `cloudinaryId` on the photo: an auto-format, auto-quality,
 *   width-limited Cloudinary URL (so phones download small WebP/AVIF files).
 */
export function photoUrl(photo: Photo, width = 800): string {
  if (CLOUD && photo.cloudinaryId) {
    return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,c_limit,w_${width}/${photo.cloudinaryId}`;
  }
  return photo.src;
}
