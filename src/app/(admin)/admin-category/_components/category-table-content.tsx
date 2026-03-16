import { loadPagination } from "@/hooks/use-query";
import { getCategoryByPage } from "@/lib/data";
import type { SearchParams } from "nuqs/server";
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
      <CategoryList
        categories={categories}
        totalPages={totalPages}
        page={page}
      />
    </>
  );
}
