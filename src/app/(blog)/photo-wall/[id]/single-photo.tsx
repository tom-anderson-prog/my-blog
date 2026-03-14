"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

export default function SinglePhotoPage({
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
  const fadeVariants: Variants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="w-full my-12 max-w-4xl mx-auto px-4">
      <motion.div
        variants={{
          initial: { opacity: 0, scale: 0.98 },
          animate: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-h-[80vh] rounded-sm overflow-hidden shadow-sm mb-4">
        <Image
          src={image.url}
          alt=""
          width={1000}
          height={1600}
          className="w-full h-auto max-w-full max-h-[80vh] object-contain"
        />
      </motion.div>
      <motion.h1
        variants={fadeVariants}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-4xl font-bold tracking-tight text-slate-900 mb-4 text-left">
        {image.caption}
      </motion.h1>
      {image.description && (
        <motion.p
          variants={fadeVariants}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm text-slate-500 text-left font-light leading-relaxed">
          {image.description}
        </motion.p>
      )}
    </motion.div>
  );
}
