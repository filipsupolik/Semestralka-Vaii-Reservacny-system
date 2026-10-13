import SortableHeader from "./SortableHeader";
import ActionButton from "./ActionButton";
import { getImageUrl } from "../services/api";

const COLUMNS = [
  { label: "ID", sortKey: "categoryId" },
  { label: "Name", sortKey: "name" },
  { label: "Used by", sortKey: "restaurants" },
];

function AdminCategoriesTable({
  categories,
  sortConfig,
  onSort,
  onEdit,
  onDelete,
}) {
  return (
    <table className="w-full min-w-[480px]">
      <thead>
        <tr className="border-b-2 border-gray-200">
          <th className="px-4 py-3 text-left font-semibold text-gray-700">
            Image
          </th>
          {COLUMNS.map((column) => (
            <SortableHeader
              key={column.sortKey}
              label={column.label}
              sortKey={column.sortKey}
              sortConfig={sortConfig}
              onSort={onSort}
            />
          ))}
          <th className="px-4 py-3 text-right font-semibold text-gray-700">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr
            key={category.categoryId}
            className="border-b border-gray-100 hover:bg-gray-50"
          >
            <td className="px-4 py-3">
              {category.imageUrl ? (
                <img
                  src={getImageUrl(category.imageUrl)}
                  alt={category.name}
                  className="h-10 w-10 rounded object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded bg-gray-200" />
              )}
            </td>
            <td className="px-4 py-3">{category.categoryId}</td>
            <td className="px-4 py-3">{category.name}</td>
            <td className="px-4 py-3">
              {category._count?.restaurants ?? 0} restaurant
              {(category._count?.restaurants ?? 0) === 1 ? "" : "s"}
            </td>
            <td className="px-4 py-3 text-right">
              <ActionButton
                size="sm"
                className="mr-2"
                onClick={() => onEdit(category)}
              >
                Edit
              </ActionButton>
              <ActionButton
                size="sm"
                variant="danger"
                onClick={() => onDelete(category)}
              >
                Delete
              </ActionButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdminCategoriesTable;
