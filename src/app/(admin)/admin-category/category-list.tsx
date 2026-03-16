"use client";

import CommonPagination from "@/components/common-pagination";
import CommonTable, { type Columns } from "@/components/common-table";
import { BasicCategory } from "@/lib/types";
import { format } from "date-fns";
import Link from "next/link";
import BlogButton from "@/components/blog-buttons";
import { useOptimistic } from "react";
import { removeCategory } from "@/actions/category";

export const CategoryList = ({
  categories,
  totalPages,
  page,
}: {
  categories: BasicCategory[];
  totalPages: number;
  page: number;
}) => {
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
          <form action={delCategoryById.bind(null, item.id)}>
            <BlogButton type="submit" action="del" name="Del" />
          </form>
        </div>
      ),
    },
  ];

  const [optimisticCategories, addOptimistic] = useOptimistic(
    categories,
    (currentCategories, categoryId) => {
      return currentCategories.filter((c) => c.id !== categoryId);
    },
  );

  const delCategoryById = async (id: number) => {
    addOptimistic(id);
    await removeCategory(id);
  };

  return (
    <>
      <CommonTable columns={columns} data={optimisticCategories} />
      <CommonPagination
        page={page}
        totalPages={totalPages}
        location="/admin-category"
      />
    </>
  );
};
