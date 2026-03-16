import { loadPagination } from "@/hooks/use-query";
import { getPhotosByPage } from "@/lib/data";
import type { SearchParams } from "nuqs/server";
import Link from "next/link";
import BlogButton from "@/components/blog-buttons";
import { PhotoList } from "./photo-list";

export default async function PhotoTableContent({
  params,
}: {
  params: Promise<SearchParams>;
}) {
  const { page } = await loadPagination(params);
  const currentPage = Number(page) || 1;

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
      <PhotoList photos={photos} totalPages={totalPages} page={page} />
    </>
  );
}
