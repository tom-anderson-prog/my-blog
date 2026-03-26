"use client";

import CommonPagination from "@/components/common-pagination";
import CommonTable, { type Columns } from "@/components/common-table";
import { BasicPhoto } from "@/lib/types";
import { format } from "date-fns";
import Link from "next/link";
import BlogButton from "@/components/blog-buttons";
import { removePhoto } from "@/actions/photo";
import { useOptimistic, useTransition } from "react";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";

export const PhotoList = ({
  photos,
  totalPages,
  page,
}: {
  photos: BasicPhoto[];
  totalPages: number;
  page: number;
}) => {
  const confirm = useConfirm((state) => state.confirm);
  const [isPending, startTransition] = useTransition();

  const columns: Columns<BasicPhoto>[] = [
    {
      header: "Caption",
      render: (item: BasicPhoto) => item.caption,
      width: "200px",
    },
    {
      header: "Url",
      render: (item: BasicPhoto) => item.url,
      width: "260px",
    },
    {
      header: "Description",
      render: (item: BasicPhoto) => item.description,
      width: "300px",
    },
    {
      header: "Create Time",
      render: (item: BasicPhoto) => format(item.createdAt, "PPpp"),
      width: "220px",
    },
    {
      header: "Actions",
      render: (item: BasicPhoto) => (
        <div className="flex justify-start items-center gap-3">
          <Link href={`/admin-photo/${item.id}/edit`}>
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
    confirm("Delete Photo?", "Really delete this?", () => {
      startTransition(async () => {
        addOptimistic(id);
        try {
          const res = await removePhoto(id);
          if (res) {
            toast.error(res);
          }
        } catch (e) {
          console.error("Failed to delete photo: ", e);
          toast.error("Failed to delete photo.");
        }
      });
    });
  };

  const [optimisticPhotos, addOptimistic] = useOptimistic(
    photos,
    (currentPhotos, photoId) => {
      return currentPhotos.filter((p) => p.id !== photoId);
    },
  );

  return (
    <>
      <CommonTable columns={columns} data={optimisticPhotos} />
      <CommonPagination
        page={page}
        totalPages={totalPages}
        location="/admin-photo"
      />
    </>
  );
};
