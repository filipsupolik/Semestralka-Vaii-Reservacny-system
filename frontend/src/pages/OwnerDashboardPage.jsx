import { useState } from "react";
import { useDashboard, useMenu } from "../context";
import { useMyRestaurants } from "../hooks/useRestaurants";
import { useOrders } from "../hooks/useOrders";
import AddMenuItemDialog from "../components/AddMenuItemDialog";
import ActionButton from "../components/ActionButton";
import DashboardPanel from "../components/DashboardPanel";
import OwnerRestaurantCard from "../components/OwnerRestaurantCard";
import OrderCard from "../components/OrderCard";
import MenuItemListItem from "../components/MenuItemListItem";

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
  const {
    orders,
    isLoading: ordersLoading,
    error: ordersError,
    updateOrderStatus,
  } = useOrders(selectedProject);

  const selectedRestaurant = restaurants.find(
    (restaurant) => restaurant.restaurantId === selectedProject,
  );
  const canAddMenuItem = Boolean(selectedRestaurant);

  const handleAddClick = () => {
    if (!canAddMenuItem) return;
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

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  return (
    <main className="min-h-screen w-full min-[1040px]:h-screen min-[1040px]:overflow-hidden">
      <section className="h-full w-full">
        <div className="flex flex-col h-full w-full min-w-0">
          <div className="col-start-2 row-start-2 grid min-[1040px]:min-h-0 min-w-0 grid-cols-1 min-[1040px]:grid-cols-[minmax(0,70%)_minmax(0,1fr)] min-[1040px]:grid-rows-3 gap-[25px] min-[1040px]:overflow-hidden bg-[#e6e6e6] p-[25px]">
            <div className="min-[1040px]:row-span-3 min-w-0">
              <h3>Your restaurants</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-[15px]">
                {restaurants.map((restaurant) => (
                  <OwnerRestaurantCard
                    key={restaurant.restaurantId}
                    restaurant={restaurant}
                    selected={selectedProject === restaurant.restaurantId}
                    onSelect={toggleProject}
                  />
                ))}
              </div>
            </div>
            <DashboardPanel title="Orders">
              {!selectedProject ? (
                <p className="text-[#615f5f]">
                  Select a restaurant to view its orders
                </p>
              ) : ordersLoading ? (
                <p className="text-[#615f5f]">Loading orders...</p>
              ) : ordersError ? (
                <p className="text-red-500">{ordersError}</p>
              ) : orders.length === 0 ? (
                <p className="text-[#615f5f]">This restaurant has no orders</p>
              ) : (
                orders.map((order) => (
                  <OrderCard
                    key={order.orderId}
                    order={order}
                    onStatusChange={handleStatusChange}
                  />
                ))
              )}
            </DashboardPanel>
            <DashboardPanel title="Menu">
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
                  <MenuItemListItem
                    key={item.menuItemId}
                    item={item}
                    selected={selectedMenuItem?.menuItemId === item.menuItemId}
                    onSelect={setSelectedMenuItem}
                  />
                ))
              )}
            </DashboardPanel>
            <div className="flex min-[1040px]:min-h-0 flex-col justify-center gap-[15px]">
              <ActionButton onClick={handleAddClick} disabled={!canAddMenuItem}>
                Add Menu Item
              </ActionButton>
              <ActionButton
                onClick={handleUpdateClick}
                disabled={selectedMenuItem === null}
              >
                Update Menu Item
              </ActionButton>
              <ActionButton
                onClick={handleDeleteClick}
                disabled={selectedMenuItem === null}
              >
                Delete Menu Item
              </ActionButton>
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
