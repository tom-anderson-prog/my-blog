import ArticleCard from "@/components/article-card";
import { getLatestArticles } from "@/lib/data";

export default async function ArticleList() {
  const data = await getLatestArticles();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {data.map((item, index) => (
        <ArticleCard key={item.id} article={item} index={index} />
      ))}
    </div>
  );
}
