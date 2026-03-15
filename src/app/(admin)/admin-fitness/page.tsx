import PageTitle from "@/components/page-title";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import FitnessTableContent from "./fitness-table-content";

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <div className="space-y-6">
      <PageTitle title="Fitness Management" />

      <Suspense fallback={<TableSkeleton rows={10} cols={5} />}>
        <FitnessTableContent params={searchParams} />
      </Suspense>
    </div>
  );
}
