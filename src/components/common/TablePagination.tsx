import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
const TablePagination = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Pagination>
      <PaginationContent>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink isActive={currentPage === page}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
