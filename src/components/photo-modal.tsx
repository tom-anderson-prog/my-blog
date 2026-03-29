"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function PhotoModal({
  image,
}: {
  image: {
    id: number;
    url: string;
    caption: string;
    description: string | null;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
  };
}) {
  const router = useRouter();

  // when modal shows, there should be no scrollbar. reserve space for the scrollbar to prevent page jutter.
  useEffect(() => {
    const originalOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = originalOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-99999 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 md:p-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-3xl w-full flex flex-col justify-center items-center cursor-default">
        <div className="relative w-full max-h-[70vh] rounded-sm overflow-hidden shadow-sm mb-8">
          <Image
            src={image.url}
            alt={image.caption}
            width={1000}
            height={1600}
            priority
            className="w-full h-auto max-w-full max-h-[70vh] object-contain"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            {image.caption}
          </h2>
          {image.description && (
            <p className="text-slate-400 text-lg leading-relaxed font-light">
              {image.description}
            </p>
          )}
        </motion.div>
      </motion.div>
      <motion.button
        whileHover={{ rotate: 90, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.back()}
        className="absolute top-6 right-6 z-1010 p-2 bg-white/10 hover:bg-white/20 text-white/50 hover:text-white backdrop-blur-md rounded-full transition-colors">
        <X className="w-8 h-8" />
      </motion.button>
    </motion.div>
  );
}
