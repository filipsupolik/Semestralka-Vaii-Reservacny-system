function SortableHeader({ label, sortKey, sortConfig, onSort }) {
  const isActive = sortConfig.key === sortKey;
  return (
    <th
      className="cursor-pointer select-none px-4 py-3 text-left font-semibold text-gray-700 hover:text-red-500"
      onClick={() => onSort(sortKey)}
    >
      {label} {isActive ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
    </th>
  );
}

export default SortableHeader;
