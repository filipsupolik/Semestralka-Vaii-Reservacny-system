import { useEffect, useMemo, useState } from "react";
import { Alert } from "@mui/material";
import { useAuth } from "../context";
import { userService, categoryService } from "../services";
import EditUserDialog from "../components/EditUserDialog";
import CategoryDialog from "../components/CategoryDialog";
import AdminUsersTable from "../components/AdminUsersTable";
import AdminCategoriesTable from "../components/AdminCategoriesTable";
import ActionButton from "../components/ActionButton";

function sortRows(rows, key, direction, getValue) {
  return [...rows].sort((a, b) => {
    const va = getValue(a, key);
    const vb = getValue(b, key);
    const cmp =
      typeof va === "number" && typeof vb === "number"
        ? va - vb
        : String(va ?? "").localeCompare(String(vb ?? ""));
    return direction === "asc" ? cmp : -cmp;
  });
}

function AdminDashboardPage() {
  const { isAuthenticated, userRole, user } = useAuth();
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [editingUser, setEditingUser] = useState(null);
  const [categoryDialog, setCategoryDialog] = useState({
    open: false,
    category: null,
  });
  const [actionError, setActionError] = useState(null);
  const [version, setVersion] = useState(0);

  const isAdmin = isAuthenticated && userRole === "ADMIN";

  useEffect(() => {
    if (!isAdmin) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [usersData, categoriesData] = await Promise.all([
          userService.getUsers(),
          categoryService.getAllCategories(),
        ]);
        setUsers(usersData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAdmin, version]);

  const refresh = () => setVersion((v) => v + 1);

  const handleSort = (key) => {
    setSortConfig((current) =>
      current.key === key && current.direction === "asc"
        ? { key, direction: "desc" }
        : { key, direction: "asc" },
    );
  };

  const userSortValue = (u, key) =>
    ({
      name: `${u.lastName} ${u.firstName}`,
      email: u.email,
      phoneNumber: u.phoneNumber,
      role: u.role,
      isActive: u.isActive ? 1 : 0,
    })[key];

  const categorySortValue = (c, key) =>
    ({
      categoryId: c.categoryId,
      name: c.name,
      restaurants: c._count?.restaurants ?? 0,
    })[key];

  const sortedUsers = useMemo(
    () =>
      sortConfig.key
        ? sortRows(users, sortConfig.key, sortConfig.direction, userSortValue)
        : users,
    [users, sortConfig],
  );

  const sortedCategories = useMemo(
    () =>
      sortConfig.key
        ? sortRows(
            categories,
            sortConfig.key,
            sortConfig.direction,
            categorySortValue,
          )
        : categories,
    [categories, sortConfig],
  );

  const handleDeleteCategory = async (category) => {
    if (
      !window.confirm(
        `Delete category "${category.name}"? Restaurants will lose this category tag.`,
      )
    ) {
      return;
    }
    setActionError(null);
    try {
      await categoryService.deleteCategory(category.categoryId);
      refresh();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setSortConfig({ key: null, direction: "asc" });
  };

  if (!isAdmin) {
    return (
      <main className="bg-gray-100 min-h-screen py-12">
        <section className="container mx-auto max-w-2xl px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600 text-center">
              {isAuthenticated
                ? "Access denied. Admin privileges required."
                : "Please log in to view this page."}
            </p>
          </div>
        </section>
      </main>
    );
  }

  const tabButtonClass = (tab) =>
    `cursor-pointer rounded-full border-0 px-6 py-2 text-base font-extrabold ${
      activeTab === tab
        ? "bg-[#00b7ff] text-white"
        : "bg-white text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <main className="bg-gray-100 min-h-screen py-8 sm:py-12">
      <section className="container mx-auto px-4">
        <div className="mb-6 flex gap-3">
          <button
            className={tabButtonClass("users")}
            onClick={() => handleTabSwitch("users")}
          >
            Users
          </button>
          <button
            className={tabButtonClass("categories")}
            onClick={() => handleTabSwitch("categories")}
          >
            Categories
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 overflow-x-auto">
          {isLoading ? (
            <p className="text-gray-600 text-center py-8">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center py-8">{error}</p>
          ) : activeTab === "users" ? (
            <AdminUsersTable
              users={sortedUsers}
              sortConfig={sortConfig}
              onSort={handleSort}
              onRowClick={setEditingUser}
            />
          ) : (
            <>
              <div className="mb-4 flex justify-end">
                <ActionButton
                  onClick={() =>
                    setCategoryDialog({ open: true, category: null })
                  }
                >
                  + New Category
                </ActionButton>
              </div>
              <AdminCategoriesTable
                categories={sortedCategories}
                sortConfig={sortConfig}
                onSort={handleSort}
                onEdit={(category) =>
                  setCategoryDialog({ open: true, category })
                }
                onDelete={handleDeleteCategory}
              />
            </>
          )}
        </div>
      </section>

      {actionError && (
        <Alert
          severity="error"
          onClose={() => setActionError(null)}
          className="fixed bottom-4 left-1/2 z-[1400] min-w-[280px] -translate-x-1/2"
        >
          {actionError}
        </Alert>
      )}

      <EditUserDialog
        open={editingUser !== null}
        onClose={() => setEditingUser(null)}
        user={editingUser}
        currentUserEmail={user?.email}
        onSaved={refresh}
      />
      <CategoryDialog
        open={categoryDialog.open}
        onClose={() => setCategoryDialog({ open: false, category: null })}
        category={categoryDialog.category}
        onSaved={refresh}
      />
    </main>
  );
}

export default AdminDashboardPage;
