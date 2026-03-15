import CommonPagination from "@/components/common-pagination";
import CommonTable, { type Columns } from "@/components/common-table";
import { loadPagination } from "@/hooks/use-query";
import { getPhotosByPage } from "@/lib/data";
import type { SearchParams } from "nuqs/server";
import { BasicPhoto } from "@/lib/types";
import { format } from "date-fns";
import Link from "next/link";
import BlogButton from "@/components/blog-buttons";

export default async function PhotoTableContent({
  params,
}: {
  params: Promise<SearchParams>;
}) {
  const { page } = await loadPagination(params);
  const currentPage = Number(page) || 1;

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
          <form action="">
            <BlogButton action="del" name="Del" />
          </form>
        </div>
      ),
      width: "250px",
    },
  ];
  const { photos, totalPages } = await getPhotosByPage(currentPage);
  return (
    <>
      <Link href={`/admin-photo/new`}>
        <BlogButton
          action="add"
          name="Add Photo"
          icon={
            <span className="mr-2 transition-transform duration-300 group-hover:rotate-90">
              +
            </span>
          }
        />
      </Link>
      <CommonTable columns={columns} data={photos} />
      <CommonPagination
        page={page}
        totalPages={totalPages}
        location="/admin-photo"
      />
    </>
  );
}
