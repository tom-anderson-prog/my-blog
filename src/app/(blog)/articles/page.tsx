import ArticleCard from "@/components/article-card";
import PageTitle from "@/components/page-title";
import { getPublishedArticles } from "@/lib/data";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
};

export default async function ArticlesPage() {
  const data = await getPublishedArticles();
  return (
    <div className="w-full mb-6">
      <Suspense fallback={<></>}>
        {data.map((item) => (
          <div key={item.id} className="cursor-pointer">
            <PageTitle title={item.name} />
            <div className="flex flex-col space-y-4">
              {item.articles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={index}
                  type="ALL"
                />
              ))}
            </div>
          </div>
        ))}
      </Suspense>
    </div>
  );
}
