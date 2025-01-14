import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cardQueryInterface } from "@/types-d";

interface BrowsePaginationProps {
  cardQueries: cardQueryInterface;
  setCardQueries: (queries: cardQueryInterface) => void;
  pageCount: number;
}

function BrowsePagination({
  cardQueries,
  setCardQueries,
  pageCount,
}: BrowsePaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        {cardQueries.currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() =>
                setCardQueries({
                  ...cardQueries,
                  currentPage: cardQueries.currentPage - 1,
                })
              }
            />
          </PaginationItem>
        )}
        <div className="hidden sm:flex">
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              onClick={() =>
                setCardQueries({
                  ...cardQueries,
                  currentPage: cardQueries.currentPage,
                })
              }
            >
              {cardQueries.currentPage}
            </PaginationLink>

            {cardQueries.currentPage + 1 < pageCount && (
              <PaginationLink
                className="cursor-pointer"
                onClick={() =>
                  setCardQueries({
                    ...cardQueries,
                    currentPage: cardQueries.currentPage + 1,
                  })
                }
              >
                {cardQueries.currentPage + 1}
              </PaginationLink>
            )}

            {cardQueries.currentPage + 2 < pageCount && (
              <PaginationLink
                className="cursor-pointer"
                onClick={() =>
                  setCardQueries({
                    ...cardQueries,
                    currentPage: cardQueries.currentPage + 2,
                  })
                }
              >
                {cardQueries.currentPage + 2}
              </PaginationLink>
            )}
          </PaginationItem>
        </div>

        <PaginationItem className="flex">
          <PaginationEllipsis />
          <PaginationLink
            className="cursor-pointer"
            onClick={() =>
              setCardQueries({
                ...cardQueries,
                currentPage: pageCount,
              })
            }
          >
            {pageCount}
          </PaginationLink>
        </PaginationItem>
        {cardQueries.currentPage + 1 < pageCount && (
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() =>
                setCardQueries({
                  ...cardQueries,
                  currentPage: cardQueries.currentPage + 1,
                })
              }
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default BrowsePagination;
