import PageTitle from "@/components/page-title";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import CategoryTableContent from "./_components/category-table-content";

export default async function AdminCategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <div className="space-y-6">
      <PageTitle title="Category Management" />

      <Suspense fallback={<TableSkeleton rows={10} cols={5} />}>
        <CategoryTableContent params={searchParams} />
      </Suspense>
    </div>
  );
}
