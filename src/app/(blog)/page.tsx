import LatestArticlesSkeleton from "@/components/skeleton/latest-articles-skeleton";
import PageTitle from "@/components/page-title";
import { getLatestArticles } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const data = await getLatestArticles();

  return (
    <div className="w-full">
      <PageTitle title="Latest Articles" />
      <Suspense fallback={<LatestArticlesSkeleton />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {data.map((item) => (
            <div key={item.id} className="flex-1">
              <Link href={`/articles/${item.id}`} className="group block">
                <div className="relative aspect-video w-full mb-4 md:mb-6 rounded-xl cursor-pointer overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={item.image || ""}
                    alt={item.title}
                    fill
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhPPQAJJAPXdxCaAAAAAElFTkSuQmCC"
                    className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h2 className="text-lg font-semibold mb-2 line-clamp-2 h-14 leading-7 cursor-pointer group-hover:text-foreground/80 group-hover:-translate-y-0.5 transition-colors duration-300">
                  {item.title}
                </h2>
                <div className="text-sm text-muted-foreground line-clamp-9 cursor-pointer group-hover:text-foreground transition-colors duration-300">
                  {item.content}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Suspense>
    </div>
  );
}
