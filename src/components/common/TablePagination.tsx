import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";

const getPageRange = (current: number, total: number): (number | "...")[] => {
  // 총 페이지가 7 이하면 전부 표시
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const delta = 2; // 현재 페이지 기준 앞뒤로 몇 개 보여줄지
  const range: (number | "...")[] = [];

  // 현재 페이지 주변 범위
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  // 항상 첫 페이지
  range.push(1);

  // 왼쪽 ellipsis
  if (left > 2) range.push("...");

  // 현재 페이지 주변 번호들
  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  // 오른쪽 ellipsis
  if (right < total - 1) range.push("...");

  // 항상 마지막 페이지
  range.push(total);

  return range;
};

const TablePagination = ({ totalPages }: { totalPages: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(page));
      return next;
    });
  };

  const pageRange = getPageRange(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationPrevious
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
      />

      <PaginationContent>
        {pageRange.map((page, index) =>
          page === "..." ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
      </PaginationContent>

      <PaginationNext
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
      />
    </Pagination>
  );
};

export default TablePagination;
