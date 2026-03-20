import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return (
    min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0")
  );
};

/**
 * ali oss
 * @param url original image url
 * @param width target width
 * @param quality image quality (1-100)
 */
export function getOptimizedImage(url: string, width = 800, quality = 80) {
  if (!url) return "";
  
  // if it's not ali oss image url(eg. local iamge),return it's original url
  if (!url.includes("aliyuncs.com")) return url;

  // x-oss-process 
  // image/resize: resize image，w_xxx set image width
  // /format,webp
  return `${url}?x-oss-process=image/resize,w_${width},m_lfit/format,webp/quality,q_${quality}`;
}