"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface PhotoItemProps {
  photo: {
    id: number;
    url: string;
    caption: string;
    createdAt: Date;
    updatedAt: Date;
  };
  index: number;
}

export default function PhotoItem({ photo, index }: PhotoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      key={photo.id}
      className="relative aspect-3/4 rounded-2xl overflow-hidden bg-slate-100 saturate-[0.3] group-hover:saturate-100 shadow-md hover:shadow-xl group cursor-pointer transition-all duration-300">
      <Link href={`/photo-wall/${photo.id}`}>
        <Image
          src={photo.url}
          alt={photo.caption}
          fill
          priority={index <= 12}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
    </motion.div>
  );
}
