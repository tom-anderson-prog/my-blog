"use client";

import { usePaginationQuery } from "@/hooks/use-pagination-query";
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
}: {
  totalPages: number;
}) {
  const [page, setPage] = usePaginationQuery();

  console.log({ totalPages });

  if (totalPages <= 1) return null;

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
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) {
                setPage(page - 1);
              }
            }}
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
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(pageNum);
                }}
                isActive={page === pageNum}>
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) {
                setPage(page + 1);
              }
            }}
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
