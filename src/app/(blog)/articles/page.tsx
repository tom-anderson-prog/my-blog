import PageTitle from "@/components/page-title";
import { getAllArticles } from "@/lib/data";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function ArticlesPage() {
  const data = await getAllArticles();
  return (
    <div className="w-full mb-6">
      <Suspense fallback={<></>}>
        {data.map((item) => (
          <div key={item.id} className="cursor-pointer">
            <PageTitle title={item.name} />
            <div className="flex flex-col space-y-4">
              {item.articles.map((article) => (
                <Link href={`/articles/${article.id}`} key={article.id}>
                  <div className="flex flex-row justify-start items-center group">
                    <div className="relative mr-2 w-20 h-20 shrink-0 shadow-xl rounded-xl overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
                      <Image
                        src={article.image || ""}
                        alt={article.title}
                        fill
                        className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="text-xl font-semibold group-hover:text-foreground/70 transition-all duration-300">
                        {article.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {article.publishedAt
                          ? format(article.publishedAt, "PP")
                          : format(article.createdAt, "PP")}
                      </div>
                      <div className="text-sm line-clamp-1 text-muted-foreground">
                        {article.content}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </Suspense>
    </div>
  );
}
