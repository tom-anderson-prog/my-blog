import { loadPagination } from "@/hooks/use-query";
import { getArticlesByPage } from "@/lib/data";
import type { SearchParams } from "nuqs/server";
import Link from "next/link";
import BlogButton from "@/components/blog-buttons";
import { ArticleList } from "./article-list";

export default async function ArticleTableContent({
  params,
}: {
  params: Promise<SearchParams>;
}) {
  const { page } = await loadPagination(params);
  const currentPage = Number(page) || 1;

  const { articles, totalPages } = await getArticlesByPage(currentPage);

  return (
    <>
      <Link href={`/admin-articles/new`}>
        <BlogButton
          action="add"
          name="Add Article"
          icon={
            <span className="mr-2 transition-transform duration-300 group-hover:rotate-90">
              +
            </span>
          }
        />
      </Link>
      <ArticleList articles={articles} totalPages={totalPages} page={page} />
    </>
  );
}
