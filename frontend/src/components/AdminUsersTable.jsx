import SortableHeader from "./SortableHeader";
import { ROLE_LABELS } from "../constants/roles";
import { PHONE_PLACEHOLDER } from "../constants/validation";

const COLUMNS = [
  { label: "Name", sortKey: "name" },
  { label: "Email", sortKey: "email" },
  { label: "Phone", sortKey: "phoneNumber" },
  { label: "Role", sortKey: "role" },
  { label: "Status", sortKey: "isActive" },
];

function AdminUsersTable({ users, sortConfig, onSort, onRowClick }) {
  return (
    <table className="w-full min-w-[640px]">
      <thead>
        <tr className="border-b-2 border-gray-200">
          {COLUMNS.map((column) => (
            <SortableHeader
              key={column.sortKey}
              label={column.label}
              sortKey={column.sortKey}
              sortConfig={sortConfig}
              onSort={onSort}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr
            key={u.userId}
            className="cursor-pointer border-b border-gray-100 hover:bg-gray-50"
            onClick={() => onRowClick(u)}
          >
            <td className="px-4 py-3">
              {u.firstName} {u.lastName}
            </td>
            <td className="px-4 py-3">{u.email}</td>
            <td className="px-4 py-3">
              {u.phoneNumber === PHONE_PLACEHOLDER ? "—" : u.phoneNumber}
            </td>
            <td className="px-4 py-3">{ROLE_LABELS[u.role] ?? u.role}</td>
            <td className="px-4 py-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  u.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {u.isActive ? "Active" : "Inactive"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdminUsersTable;
