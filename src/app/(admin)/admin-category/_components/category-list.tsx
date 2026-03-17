"use client";

import CommonPagination from "@/components/common-pagination";
import CommonTable, { type Columns } from "@/components/common-table";
import { BasicCategory } from "@/lib/types";
import { format } from "date-fns";
import BlogButton from "@/components/blog-buttons";
import { useOptimistic, useState } from "react";
import { removeCategory } from "@/actions/category";
import { CategoryFormModal } from "./category-form-modal";
import { useConfirm } from "@/hooks/use-confirm";

export const CategoryList = ({
  categories,
  totalPages,
  page,
}: {
  categories: BasicCategory[];
  totalPages: number;
  page: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BasicCategory | null>(
    null,
  );
  const confirm = useConfirm((state) => state.confirm);

  const handleAdd = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: BasicCategory) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

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
          <BlogButton
            action="edit"
            name="Edit"
            type="button"
            onClick={() => handleEdit(item)}
          />
          <BlogButton
            type="submit"
            action="del"
            name="Del"
            onClick={() => handleDelete(item.id)}
          />
        </div>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    confirm("Delete Category?", "Really delete this?", async () => {
      addOptimistic(id);
      await removeCategory(id);
    });
  };

  const [optimisticCategories, addOptimistic] = useOptimistic(
    categories,
    (currentCategories, categoryId) => {
      return currentCategories.filter((c) => c.id !== categoryId);
    },
  );

  return (
    <>
      <BlogButton
        action="add"
        name="Add Category"
        type="button"
        onClick={handleAdd}
        icon={
          <span className="mr-2 transition-transform duration-300 group-hover:rotate-90">
            +
          </span>
        }
      />
      <CommonTable columns={columns} data={optimisticCategories} />
      <CommonPagination
        page={page}
        totalPages={totalPages}
        location="/admin-category"
      />
      <CategoryFormModal
        key={editingCategory?.id || "new"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={editingCategory}
      />
    </>
  );
};
