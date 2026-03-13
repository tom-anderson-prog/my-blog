"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PhotoModal({
  image,
}: {
  image: {
    id: number;
    caption: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
  };
}) {
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={image.url}
          alt={image.caption}
          width={600}
          height={600}
          className="h-auto"
        />
        <h2 className="text-3xl text-white my-4">{image.caption}</h2>
        <p>{image.caption}</p>
      </div>
      <div onClick={() => router.back()} className="absolute right-3 top-1">
        <X className="w-6 h-6 text-white" />
      </div>
    </div>
  );
}
