import { loadPagination } from "@/hooks/use-query";
import { getCategoryByPage } from "@/lib/data";
import type { SearchParams } from "nuqs/server";
import { CategoryList } from "./category-list";
import { dalVerifySuccess } from "@/dal/helpers";

export default async function CategoryTableContent({
  params,
}: {
  params: Promise<SearchParams>;
}) {
  const { page } = await loadPagination(params);
  const currentPage = Number(page) || 1;
  const { categories, totalPages } = dalVerifySuccess(
    await getCategoryByPage(currentPage),
  );

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
