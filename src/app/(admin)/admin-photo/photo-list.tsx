"use client";

import CommonPagination from "@/components/common-pagination";
import CommonTable, { type Columns } from "@/components/common-table";
import { BasicPhoto } from "@/lib/types";
import { format } from "date-fns";
import Link from "next/link";
import BlogButton from "@/components/blog-buttons";
import { removePhoto } from "@/actions/photo";
import { useOptimistic } from "react";

export const PhotoList = ({
  photos,
  totalPages,
  page,
}: {
  photos: BasicPhoto[];
  totalPages: number;
  page: number;
}) => {
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
          <Link href={`/admin-photo/edit/${item.id}`}>
            <BlogButton action="edit" name="Edit" />
          </Link>
          <form action={removePhotoById.bind(null, item.id)}>
            <BlogButton type="submit" action="del" name="Del" />
          </form>
        </div>
      ),
      width: "250px",
    },
  ];

  const [optimisticPhotos, addOptimistic] = useOptimistic(
    photos,
    (currentPhotos, photoId) => {
      return currentPhotos.filter((p) => p.id !== photoId);
    },
  );

  const removePhotoById = async (id: number) => {
    addOptimistic(id);
    await removePhoto(id);
  };
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
