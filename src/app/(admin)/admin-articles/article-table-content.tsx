import CommonPagination from "@/components/common-pagination";
import CommonTable, { type Columns } from "@/components/common-table";
import { loadPagination } from "@/hooks/use-query";
import { getArticlesByPage } from "@/lib/data";
import type { SearchParams } from "nuqs/server";
import { ArticleWithCategory } from "@/lib/types";
import { format } from "date-fns";
import Link from "next/link";
import BlogButton from "@/components/blog-buttons";

export default async function ArticleTableContent({
  params,
}: {
  params: Promise<SearchParams>;
}) {
  const { page } = await loadPagination(params);
  const currentPage = Number(page) || 1;

  const columns: Columns<ArticleWithCategory>[] = [
    {
      header: "Title",
      render: (item: ArticleWithCategory) => item.title,
      width: "260px",
    },
    {
      header: "Status",
      render: (item: ArticleWithCategory) => item.status,
      width: "160px",
    },
    {
      header: "Publish Time",
      render: (item: ArticleWithCategory) => {
        return (
          <span>
            {item.publishedAt ? format(item.publishedAt, "PPpp") : ""}
          </span>
        );
      },
      width: "220px",
    },
    {
      header: "Create Time",
      render: (item: ArticleWithCategory) => format(item.createdAt, "PPpp"),
      width: "220px",
    },
    {
      header: "Category",
      render: (item: ArticleWithCategory) => item.category.name,
      width: "160px",
    },
    {
      header: "Actions",
      render: (item: ArticleWithCategory) => (
        <div className="flex justify-start items-center gap-3">
          {item.status === "DRAFT" && (
            <form action="">
              <BlogButton action="publish" name="Publish" type="submit" />
            </form>
          )}
          <Link href={`/admin-articles/edit/${item.id}`}>
            <BlogButton action="edit" name="Edit" />
          </Link>
          <form action="">
            <BlogButton action="del" name="Del" />
          </form>
        </div>
      ),
      width: "250px",
    },
  ];
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
      <CommonTable columns={columns} data={articles} />
      <CommonPagination
        page={page}
        totalPages={totalPages}
        location="/admin-articles"
      />
    </>
  );
}
