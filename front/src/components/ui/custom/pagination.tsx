import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import React from 'react';

interface PaginationProps {
    totalPages: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ totalPages, page, setPage }: PaginationProps) => {
    const getPages = () => {
        const pages: (number | string)[] = [];
        const delta = 2;

        const rangeStart = Math.max(2, page - delta);
        const rangeEnd = Math.min(totalPages - 1, page + delta);

        pages.push(1);

        if (rangeStart > 2) {
            pages.push('start-ellipsis');
        }

        for (let i = rangeStart; i <= rangeEnd; i++) {
            pages.push(i);
        }

        if (rangeEnd < totalPages - 1) {
            pages.push('end-ellipsis');
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };


    return (
        <div className="mt-6 flex items-center justify-end gap-1">
            {/* Prev */}
            <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 h-9 rounded-md text-sm font-medium border bg-white disabled:opacity-50 flex items-center cursor-pointer"
            >
                <ChevronsLeft />Prev
            </button>

            {getPages().map((item) =>
                typeof item === 'string' ? (
                    <span key={item} className="px-3 text-gray-400">
                        …
                    </span>
                ) : (
                    <button
                        key={item}
                        onClick={() => setPage(item)}
                        className={`
                            min-w-[36px] h-9 px-3 rounded-md text-sm font-medium cursor-pointer
                            ${page === item ? 'bg-gray-700 text-white' : 'bg-white border'}
                        `}
                    >
                        {item}
                    </button>
                )
            )}

            {/* Next */}
            <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 h-9 rounded-md text-sm font-medium border bg-white disabled:opacity-50 flex items-center cursor-pointer"
            >
                Next <ChevronsRight />
            </button>
        </div>
    );
};

export default Pagination;
