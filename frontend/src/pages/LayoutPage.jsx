import { useState } from "react";
import { Outlet, useLocation, useMatches } from "react-router-dom";
import {
  LoginDialog,
  Footer,
  TopBar,
  CreateRestaurantDialog,
} from "../components/index";
import { useAuth, useDashboard } from "../context";
import { authService, restaurantService } from "../services";

function LayoutPage() {
  const matches = useMatches();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [isRestaurantDialogOpen, setIsRestaurantDialogOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const { setUser, isAuthenticated, userRole, logout } = useAuth();
  const { selectedProject, refreshRestaurants, clearSelection } =
    useDashboard();
  const currentRoute = matches.at(-1);
  const meta = currentRoute?.handle ?? {};
  const isOwnerDashboard = useLocation().pathname === "/owner-dashboard";

  const actionButtonClass =
    "cursor-pointer rounded-[25px] border-0 bg-[#00b7ff] px-[15px] py-[5px] text-base font-extrabold text-white disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-60";

  const openDialog = (type) => {
    setDialogType(type);
    setIsOpen(true);
  };
  const closeDialog = () => setIsOpen(false);

  const handleLogin = async (loginData) => {
    try {
      // loginData contains { loggedUser: { token, user: { email, role } }, message }
      const { loggedUser } = loginData;
      if (loggedUser && loggedUser.token) {
        // Store auth data in localStorage
        localStorage.setItem("authToken", loggedUser.token);
        localStorage.setItem("userRole", loggedUser.user.role);
        localStorage.setItem("userEmail", loggedUser.user.email);
        authService.startSession();

        // Update auth state
        setUser({
          role: loggedUser.user.role,
          email: loggedUser.user.email,
        });
      }
      closeDialog();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSaveRestaurant = async (restaurantData) => {
    if (editingRestaurant) {
      await restaurantService.updateRestaurant(
        editingRestaurant.restaurantId,
        restaurantData,
      );
    } else {
      await restaurantService.createRestaurant(restaurantData);
    }
    refreshRestaurants();
  };

  const handleUpdateRestaurantClick = async () => {
    if (!selectedProject) return;
    try {
      const restaurant =
        await restaurantService.getRestaurantById(selectedProject);
      setEditingRestaurant(restaurant);
      setIsRestaurantDialogOpen(true);
    } catch (error) {
      console.error("Failed to load restaurant:", error);
    }
  };

  const handleDeleteRestaurantClick = async () => {
    if (!selectedProject) return;
    if (!window.confirm("Delete this restaurant?")) return;
    try {
      await restaurantService.deleteRestaurant(selectedProject);
      clearSelection();
      refreshRestaurants();
    } catch (error) {
      console.error("Failed to delete restaurant:", error);
    }
  };

  const closeRestaurantDialog = () => {
    setIsRestaurantDialogOpen(false);
    setEditingRestaurant(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <TopBar
        {...meta}
        onOpenDialog={openDialog}
        isLoggedIn={isAuthenticated}
        userRole={userRole}
        actionButtons={
          isOwnerDashboard ? (
            <div className="flex items-center gap-[15px]">
              <button
                className={actionButtonClass}
                disabled={selectedProject !== null}
                onClick={() => setIsRestaurantDialogOpen(true)}
              >
                New
              </button>
              <button
                className={actionButtonClass}
                disabled={!selectedProject}
                onClick={handleUpdateRestaurantClick}
              >
                Update
              </button>
              <button
                className={actionButtonClass}
                disabled={!selectedProject}
                onClick={handleDeleteRestaurantClick}
              >
                Delete
              </button>
            </div>
          ) : null
        }
        onLogout={logout}
      />
      <div className="flex-grow">
        <Outlet />
        {dialogType === "login" && (
          <LoginDialog
            isOpen={isOpen}
            handleClose={closeDialog}
            onLogin={handleLogin}
          />
        )}
        <CreateRestaurantDialog
          open={isRestaurantDialogOpen}
          onClose={closeRestaurantDialog}
          onSubmit={handleSaveRestaurant}
          restaurant={editingRestaurant}
        />
      </div>
      <Footer />
    </div>
  );
}

export default LayoutPage;
