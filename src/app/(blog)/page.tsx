import LatestArticlesSkeleton from "@/components/skeleton/latest-articles-skeleton";
import PageTitle from "@/components/page-title";
import { Suspense } from "react";
import ArticleList from "./article-list";

export default async function Home() {
  return (
    <div className="w-full">
      <PageTitle title="Latest Articles" />
      <Suspense fallback={<LatestArticlesSkeleton />}>
        <ArticleList />
      </Suspense>
    </div>
  );
}
