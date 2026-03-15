import CommonPagination from "@/components/common-pagination";
import CommonTable, { type Columns } from "@/components/common-table";
import { loadPagination } from "@/hooks/use-query";
import { getCategoryByPage } from "@/lib/data";
import type { SearchParams } from "nuqs/server";
import { BasicCategory } from "@/lib/types";
import { format } from "date-fns";
import Link from "next/link";
import BlogButton from "@/components/blog-buttons";

export default async function CategoryTableContent({
  params,
}: {
  params: Promise<SearchParams>;
}) {
  const { page } = await loadPagination(params);
  const currentPage = Number(page) || 1;

  const columns: Columns<BasicCategory>[] = [
    {
      header: "Name",
      render: (item: BasicCategory) => item.name,
    },
    {
      header: "Create Time",
      render: (item: BasicCategory) => format(item.createdAt, "PPpp"),
    },
    {
      header: "Update Time",
      render: (item: BasicCategory) => {
        return (
          <span>{item.updatedAt ? format(item.updatedAt, "PPpp") : ""}</span>
        );
      },
    },
    {
      header: "Actions",
      render: (item: BasicCategory) => (
        <div className="flex justify-start items-center gap-3">
          <Link href={`/admin-category/edit/${item.id}`}>
            <BlogButton action="edit" name="Edit" />
          </Link>
          <form action="">
            <BlogButton action="del" name="Del" />
          </form>
        </div>
      ),
    },
  ];
  const { categories, totalPages } = await getCategoryByPage(currentPage);
  return (
    <>
      <Link href={`/admin-category/new`}>
        <BlogButton
          action="add"
          name="Add Category"
          icon={
            <span className="mr-2 transition-transform duration-300 group-hover:rotate-90">
              +
            </span>
          }
        />
      </Link>
      <CommonTable columns={columns} data={categories} />
      <CommonPagination
        page={page}
        totalPages={totalPages}
        location="/admin-category"
      />
    </>
  );
}
