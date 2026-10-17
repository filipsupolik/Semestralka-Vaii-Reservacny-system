import { useState } from "react";
import { Outlet, useLocation, useMatches } from "react-router-dom";
import { Alert } from "@mui/material";
import {
  LoginDialog,
  Footer,
  TopBar,
  CreateRestaurantDialog,
  OwnerDashboardActions,
} from "../components/index";
import { useAuth, useDashboard } from "../context";
import { restaurantService } from "../services";

function LayoutPage() {
  const matches = useMatches();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [isRestaurantDialogOpen, setIsRestaurantDialogOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [actionError, setActionError] = useState(null);
  const { setUser, isAuthenticated, userRole, logout } = useAuth();
  const { selectedProject, refreshRestaurants, clearSelection } =
    useDashboard();
  const currentRoute = matches.at(-1);
  const meta = currentRoute?.handle ?? {};
  const isOwnerDashboard = useLocation().pathname === "/owner-dashboard";

  const openDialog = (type) => {
    setDialogType(type);
    setIsOpen(true);
  };
  const closeDialog = () => setIsOpen(false);

  const handleLogin = async (loggedUser) => {
    // authService.login() already stored token/role/email and started session
    if (loggedUser?.token) {
      setUser({
        role: loggedUser.user.role,
        email: loggedUser.user.email,
      });
    }
    closeDialog();
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
    setActionError(null);
    try {
      const restaurant =
        await restaurantService.getRestaurantById(selectedProject);
      setEditingRestaurant(restaurant);
      setIsRestaurantDialogOpen(true);
    } catch (error) {
      setActionError(error.message);
    }
  };

  const handleDeleteRestaurantClick = async () => {
    if (!selectedProject) return;
    if (!window.confirm("Delete this restaurant?")) return;
    setActionError(null);
    try {
      await restaurantService.deleteRestaurant(selectedProject);
      clearSelection();
      refreshRestaurants();
    } catch (error) {
      setActionError(error.message);
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
            <OwnerDashboardActions
              selectedProject={selectedProject}
              onNew={() => setIsRestaurantDialogOpen(true)}
              onUpdate={handleUpdateRestaurantClick}
              onDelete={handleDeleteRestaurantClick}
            />
          ) : null
        }
        onLogout={logout}
      />
      <div className="flex-grow">
        <Outlet />
        {actionError && (
          <Alert
            severity="error"
            onClose={() => setActionError(null)}
            className="fixed bottom-4 left-1/2 z-[1400] min-w-[280px] -translate-x-1/2"
          >
            {actionError}
          </Alert>
        )}
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
