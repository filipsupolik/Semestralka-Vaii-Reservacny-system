function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const navButtonClass =
    "cursor-pointer rounded-lg border border-stone-800 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
      <button
        className={navButtonClass}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            className={`cursor-pointer rounded-lg border px-3 py-1 ${
              pageNumber === page
                ? "border-[#00b7ff] bg-[#00b7ff] text-white"
                : "border-stone-800"
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ),
      )}
      <button
        className={navButtonClass}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
