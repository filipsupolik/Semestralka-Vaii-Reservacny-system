import { useState } from "react";
import { useDashboard, useMenu } from "../context";
import { useMyRestaurants } from "../hooks/useRestaurants";
import AddMenuItemDialog from "../components/AddMenuItemDialog";

function OwnerDashboardPage() {
  const { selectedProject, toggleProject } = useDashboard();
  const { restaurants } = useMyRestaurants();
  const {
    menuItems,
    isLoading,
    error,
    selectedMenuItem,
    setSelectedMenuItem,
    deleteMenuItem,
  } = useMenu();
  const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState(null);

  const handleAddClick = () => {
    setEditingMenuItem(null);
    setIsMenuDialogOpen(true);
  };

  const handleUpdateClick = () => {
    setEditingMenuItem(selectedMenuItem);
    setIsMenuDialogOpen(true);
  };

  const handleDeleteClick = async () => {
    if (!selectedMenuItem) return;
    if (!window.confirm(`Delete "${selectedMenuItem.name}"?`)) return;
    try {
      await deleteMenuItem(selectedMenuItem.menuItemId);
    } catch (error) {
      console.error("Failed to delete menu item:", error);
    }
  };

  const handleSaved = () => {
    setSelectedMenuItem(null);
  };

  const actionButtonClass =
    "cursor-pointer rounded-[25px] border-0 bg-[#00b7ff] px-[15px] py-[10px] text-base font-extrabold text-white disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-60";

  return (
    <main className="h-screen w-full overflow-hidden">
      <section className="h-full w-full">
        <div className="flex flex-col h-full w-full min-w-0">
          <div className="col-start-2 row-start-2 grid min-h-0 min-w-0 grid-cols-[minmax(0,70%)_minmax(0,1fr)] grid-rows-2 gap-[25px] overflow-hidden bg-[#e6e6e6] p-[25px]">
            <div className="row-span-2 min-w-0">
              <h3>Your restaurants</h3>
              <div className="grid grid-cols-2 auto-rows-fr gap-[15px]">
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant.restaurantId}
                    className={`flex min-w-0 cursor-pointer flex-col rounded-[15px] border-l-[5px] border-[#ffa600] bg-white p-5 transition-transform ${selectedProject === restaurant.restaurantId ? "-translate-y-1 border-2 border-[#00b7ff] shadow-lg" : "hover:-translate-y-1 hover:shadow-md"}`}
                    onClick={() => toggleProject(restaurant.restaurantId)}
                    role="button"
                    tabIndex={0}
                  >
                    <h3>{restaurant.name}</h3>
                    <p className="mb-[25px] text-[#615f5f]">
                      {restaurant.description}
                    </p>

                    <p className="mb-[25px] text-[#615f5f]">
                      {restaurant.address}
                    </p>
                    <img
                      src={
                        restaurant.imageUrl
                          ? `http://localhost:3000${restaurant.imageUrl}`
                          : ""
                      }
                      alt={restaurant.name}
                      className="w-full h-40 object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex min-h-0 flex-col">
              <h3 className="shrink-0">Menu</h3>
              <div className="min-h-0 flex-1 overflow-y-auto rounded-[10px] bg-white p-[25px]">
                {!selectedProject ? (
                  <p className="text-[#615f5f]">
                    Select a restaurant to view its menu
                  </p>
                ) : isLoading ? (
                  <p className="text-[#615f5f]">Loading menu...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : menuItems.length === 0 ? (
                  <p className="text-[#615f5f]">No menu items yet</p>
                ) : (
                  menuItems.map((item) => (
                    <div
                      key={item.menuItemId}
                      className={`cursor-pointer rounded-[8px] border-b-2 border-[#b8b8b8] px-[10px] py-[15px] transition-colors last:border-b-0 ${selectedMenuItem?.menuItemId === item.menuItemId ? "border-2 border-[#00b7ff] bg-[#e8f7ff]" : "hover:bg-gray-50"}`}
                      onClick={() =>
                        setSelectedMenuItem(
                          selectedMenuItem?.menuItemId === item.menuItemId
                            ? null
                            : item,
                        )
                      }
                      role="button"
                      tabIndex={0}
                    >
                      <div className="flex justify-between items-center">
                        <h4>{item.name}</h4>
                        <span className="font-bold text-red-500">
                          €{item.price}
                        </span>
                      </div>
                      <p className="text-[#615f5f]">{item.description}</p>
                      {item.category && (
                        <span className="text-sm text-gray-500">
                          {item.category.name}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="flex min-h-0 flex-col justify-center gap-[15px]">
              <button
                className={actionButtonClass}
                onClick={handleAddClick}
                disabled={selectedProject === null}
              >
                Add Menu Item
              </button>
              <button
                className={actionButtonClass}
                onClick={handleUpdateClick}
                disabled={selectedMenuItem === null}
              >
                Update Menu Item
              </button>
              <button
                className={actionButtonClass}
                onClick={handleDeleteClick}
                disabled={selectedMenuItem === null}
              >
                Delete Menu Item
              </button>
            </div>
          </div>
        </div>
      </section>
      <AddMenuItemDialog
        open={isMenuDialogOpen}
        onClose={() => setIsMenuDialogOpen(false)}
        menuItem={editingMenuItem}
        onSaved={handleSaved}
      />
    </main>
  );
}

export default OwnerDashboardPage;
