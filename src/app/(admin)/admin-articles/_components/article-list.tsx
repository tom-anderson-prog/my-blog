"use client";

import CommonPagination from "@/components/common-pagination";
import CommonTable, { type Columns } from "@/components/common-table";
import { ArticleWithCategory } from "@/lib/types";
import { format } from "date-fns";
import BlogButton from "@/components/blog-buttons";
import Link from "next/link";
import { useOptimistic } from "react";
import { removeArticle } from "@/actions/article";
import { useConfirm } from "@/hooks/use-confirm";

export const ArticleList = ({
  articles,
  totalPages,
  page,
}: {
  articles: ArticleWithCategory[];
  totalPages: number;
  page: number;
}) => {
  const confirm = useConfirm((state) => state.confirm);
  
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
          <Link href={`/admin-articles/${item.id}/edit`}>
            <BlogButton action="edit" name="Edit" type="button" />
          </Link>
          <BlogButton
            type="submit"
            action="del"
            name="Del"
            onClick={() => handleDelete(item.id)}
          />
        </div>
      ),
      width: "250px",
    },
  ];

  const handleDelete = (id: number) => {
    confirm("Delete Article?", "Really delete this?", async () => {
      addOptimistic(id);
      await removeArticle(id);
    });
  };

  const [optimisticArticles, addOptimistic] = useOptimistic(
    articles,
    (currentArticles, articleId) => {
      return currentArticles.filter((a) => a.id !== articleId);
    },
  );

  return (
    <>
      <CommonTable columns={columns} data={optimisticArticles} />
      <CommonPagination
        page={page}
        totalPages={totalPages}
        location="/admin-articles"
      />
    </>
  );
};
