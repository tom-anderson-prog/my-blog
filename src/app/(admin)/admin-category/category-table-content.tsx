import { loadPagination } from "@/hooks/use-query";
import { getCategoryByPage } from "@/lib/data";
import type { SearchParams } from "nuqs/server";
import Link from "next/link";
import BlogButton from "@/components/blog-buttons";
import { CategoryList } from "./category-list";

export default async function CategoryTableContent({
  params,
}: {
  params: Promise<SearchParams>;
}) {
  const { page } = await loadPagination(params);
  const currentPage = Number(page) || 1;
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
      <CategoryList
        categories={categories}
        totalPages={totalPages}
        page={page}
      />
    </>
  );
}
