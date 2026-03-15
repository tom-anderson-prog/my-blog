import { getPaginatedLink } from "@/hooks/use-query";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
  PaginationPrevious,
} from "./ui/pagination";

export default function CommonPagination({
  totalPages,
  page,
  location,
}: {
  totalPages: number;
  page: number;
  location: string;
}) {
  if (totalPages <= 1) return null;

  function pageURL(page: number) {
    const safePage = Math.max(1, Math.min(page, totalPages));
    return getPaginatedLink(location, {
      page: safePage,
    });
  }

  const getVisiblePages = () => {
    const maxVisible = 5;
    if (totalPages <= maxVisible + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    pages.push(1);

    if (start > 2) pages.push("ellipsis-start");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("ellipsis-end");

    pages.push(totalPages);
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination className="mt-6">
      <PaginationContent className="w-full flex items-center justify-end">
        <PaginationItem>
          <PaginationPrevious
            href={pageURL(page - 1)}
            className={
              page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>

        {visiblePages.map((p, i) => {
          if (p === "ellipsis-start" || p === "ellipsis-end") {
            return (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const pageNum = p as number;
          return (
            <PaginationItem key={i}>
              <PaginationLink
                href={pageURL(pageNum)}
                isActive={page === pageNum}>
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={pageURL(page + 1)}
            className={
              page >= totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
