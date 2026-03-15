import PageTitle from "@/components/page-title";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import PhotoTableContent from "./photo-table-content";

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <div className="space-y-6">
      <PageTitle title="Photos Management" />

      <Suspense fallback={<TableSkeleton rows={10} cols={5} />}>
        <PhotoTableContent params={searchParams} />
      </Suspense>
    </div>
  );
}
