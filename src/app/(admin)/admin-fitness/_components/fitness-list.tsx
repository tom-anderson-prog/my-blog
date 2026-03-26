"use client";

import CommonPagination from "@/components/common-pagination";
import CommonTable, { type Columns } from "@/components/common-table";
import { RoutineWithWorkout } from "@/lib/types";
import { format } from "date-fns";
import Link from "next/link";
import BlogButton from "@/components/blog-buttons";
import { removeRoutine } from "@/actions/fitness";
import { useOptimistic, useTransition } from "react";
import { useConfirm } from "@/hooks/use-confirm";
import { formatTime } from "@/lib/utils";
import { toast } from "sonner";

export const FitnessList = ({
  routines,
  totalPages,
  page,
}: {
  routines: RoutineWithWorkout[];
  totalPages: number;
  page: number;
}) => {
  const confirm = useConfirm((state) => state.confirm);
  const [isPending, startTransition] = useTransition();

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
      render: (item: RoutineWithWorkout) =>
        item.totalDuration ? formatTime(item.totalDuration) : "",
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
          <Link href={`/admin-fitness/${item.id}/edit`}>
            <BlogButton action="edit" name="Edit" type="button" />
          </Link>
          <BlogButton
            type="submit"
            action="del"
            name="Del"
            disabled={isPending}
            onClick={() => handleDelete(item.id)}
          />
        </div>
      ),
      width: "200px",
    },
  ];

  const handleDelete = (id: number) => {
    confirm("Delete Routine?", "Really delete this?", () => {
      startTransition(async () => {
        addOptimistic(id);
        try {
          const res = await removeRoutine(id);
          if (res) {
            toast.error(res);
          }
        } catch (e) {
          console.error("Failed to delete routine: ", e);
          toast.error("Failed to delete routine.");
        }
      });
    });
  };

  const [optimisticRoutines, addOptimistic] = useOptimistic(
    routines,
    (currentRoutines, routineId) => {
      return currentRoutines.filter((r) => r.id !== routineId);
    },
  );

  return (
    <>
      <CommonTable columns={columns} data={optimisticRoutines} />
      <CommonPagination
        page={page}
        totalPages={totalPages}
        location="/admin-fitness"
      />
    </>
  );
};
