import LatestArticlesSkeleton from "@/components/skeleton/latest-articles-skeleton";
import PageTitle from "@/components/page-title";
import { getLatestArticles } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import ArticleCard from "@/components/article-card";


export default async function Home() {
  const data = await getLatestArticles();

  return (
    <div className="w-full">
      <PageTitle title="Latest Articles" />
      <Suspense fallback={<LatestArticlesSkeleton />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {data.map((item, index) => (
            <ArticleCard key={item.id} article={item} index={index} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
