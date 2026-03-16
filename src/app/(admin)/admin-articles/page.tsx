import PageTitle from "@/components/page-title";
import { Suspense } from "react";
import ArticleTableContent from "./_components/article-table-content";
import TableSkeleton from "@/components/skeleton/table-skeleton";

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <div className="space-y-6">
      <PageTitle title="Articles Management" />

      <Suspense fallback={<TableSkeleton rows={10} cols={5} />}>
        <ArticleTableContent params={searchParams} />
      </Suspense>
    </div>
  );
}
