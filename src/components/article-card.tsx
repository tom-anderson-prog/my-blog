"use client";

import { getOptimizedImage } from "@/lib/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  article: {
    id: number;
    title: string;
    content: string;
    abstract: string;
    image: string | null;
    status: string;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    categoryId: number;
  };
  index: number;
  type?: "LATEST" | "ALL";
}

export default function ArticleCard({
  article,
  index,
  type = "LATEST",
}: ArticleCardProps) {
  return (
    <>
      {type === "LATEST" ? (
        <motion.div
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: index * 0.1,
              },
            },
          }}
          initial="initial"
          animate="animate"
          whileHover={{ y: -4 }}
          key={article.id}
          className="flex-1">
          <Link
            href={`/articles/${article.id}?title=${JSON.stringify(article.title)}`}
            className="group block">
            <div className="relative aspect-video w-full mb-4 md:mb-6 rounded-xl saturate-[0.3] group-hover:saturate-100 cursor-pointer overflow-hidden shadow-sm group-hover:shadow-xl transition-shadow duration-300">
              <Image
                src={getOptimizedImage(article.image!, 300, 50) || ""}
                alt={article.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhPPQAJJAPXdxCaAAAAAElFTkSuQmCC"
                className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2 line-clamp-2 h-14 leading-7 cursor-pointer text-slate-800 group-hover:text-black group-hover:-translate-y-0.5 transition-colors duration-300">
              {article.title}
            </h2>
            <div className="text-sm text-slate-500 line-clamp-9 cursor-pointer group-hover:text-slate-700 transition-colors duration-300">
              {article.abstract}
            </div>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.05,
            ease: "easeOut",
          }}>
          <Link
            href={`/articles/${article.id}?title=${JSON.stringify(article.title)}`}
            key={article.id}
            className="group block">
            <div className="flex justify-start items-center py-2">
              <div className="relative mr-2 w-20 h-20 shrink-0 shadow-sm saturate-[0.3] group-hover:saturate-100 rounded-xl overflow-hidden group-hover:shadow-md transition-shadow duration-300">
                <Image
                  src={getOptimizedImage(article.image!, 200, 50) || ""}
                  alt={article.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover rounded-xl group-hover:scale-105 transition-all duration-300"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="text-xl font-semibold text-slate-600 group-hover:text-slate-900 transition-all duration-300 truncate">
                  {article.title}
                </div>
                <div className="text-xs tracking-wider text-slate-400 font-medium">
                  {article.publishedAt
                    ? format(article.publishedAt, "PP")
                    : format(article.createdAt, "PP")}
                </div>
                <div className="text-sm line-clamp-1 text-slate-500 font-light">
                  {article.abstract}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </>
  );
}
