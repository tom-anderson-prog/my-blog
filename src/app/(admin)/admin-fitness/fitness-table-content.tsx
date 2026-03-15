import CommonPagination from "@/components/common-pagination";
import CommonTable, { type Columns } from "@/components/common-table";
import { loadPagination } from "@/hooks/use-query";
import { getRoutinesByPage } from "@/lib/data";
import type { SearchParams } from "nuqs/server";
import { RoutineWithWorkout } from "@/lib/types";
import { format } from "date-fns";
import Link from "next/link";
import BlogButton from "@/components/blog-buttons";

export default async function FitnessTableContent({
  params,
}: {
  params: Promise<SearchParams>;
}) {
  const { page } = await loadPagination(params);
  const currentPage = Number(page) || 1;

  const columns: Columns<RoutineWithWorkout>[] = [
    {
      header: "Name",
      render: (item: RoutineWithWorkout) => item.name,
      width: "260px",
    },
    {
      header: "Repeat Count",
      render: (item: RoutineWithWorkout) => item.repeatCount,
      width: "160px",
    },
    {
      header: "Total Duration",
      render: (item: RoutineWithWorkout) => item.totalDuration,
      width: "220px",
    },
    {
      header: "Work Session Times",
      render: (item: RoutineWithWorkout) => {
        if (Array.isArray(item.workoutSession)) {
          return item.workoutSession.length;
        } else {
          return 0;
        }
      },
      width: "220px",
    },
    {
      header: "Create Time",
      render: (item: RoutineWithWorkout) => format(item.createdAt, "PPpp"),
      width: "220px",
    },
    {
      header: "Actions",
      render: (item: RoutineWithWorkout) => (
        <div className="flex justify-start items-center gap-3">
          <Link href={`/admin-fitness/edit/${item.id}`}>
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
      <CommonTable columns={columns} data={routines} />
      <CommonPagination
        page={page}
        totalPages={totalPages}
        location="/admin-fitness"
      />
    </>
  );
}
