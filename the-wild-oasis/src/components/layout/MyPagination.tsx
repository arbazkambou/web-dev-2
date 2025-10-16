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

export type Pagination = {
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  limit: number;
};

function MyPagination({ pagination }: { pagination: Pagination }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { hasNextPage, hasPreviousPage, limit, page, total, totalPages } =
    pagination;

  function handlePageChange(page: number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  return (
    <div className="flex items-center justify-between w-full">
      <p className="shrink-0">
        Showing {start} to {end} of {total} results
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => hasPreviousPage && handlePageChange(page - 1)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => hasNextPage && handlePageChange(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default MyPagination;
