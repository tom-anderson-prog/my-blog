import { loadPagination } from "@/hooks/use-query";
import { getRoutinesByPage } from "@/lib/data";
import type { SearchParams } from "nuqs/server";
import Link from "next/link";
import BlogButton from "@/components/blog-buttons";
import { FitnessList } from "./fitness-list";

export default async function FitnessTableContent({
  params,
}: {
  params: Promise<SearchParams>;
}) {
  const { page } = await loadPagination(params);
  const currentPage = Number(page) || 1;
  const { routines, totalPages } = await getRoutinesByPage(currentPage);

  return (
    <>
      <Link href={`/admin-fitness/new`}>
        <BlogButton
          action="add"
          name="Add Routine"
          icon={
            <span className="mr-2 transition-transform duration-300 group-hover:rotate-90">
              +
            </span>
          }
        />
      </Link>
      <FitnessList routines={routines} totalPages={totalPages} page={page} />
    </>
  );
}
