import { useState } from "react";
import { Outlet, useLocation, useMatches } from "react-router-dom";
import {
  LoginDialog,
  Footer,
  TopBar,
  CreateRestaurantDialog,
} from "../components/index";
import { useAuth, useDashboard } from "../context";
import { restaurantService } from "../services";

function LayoutPage() {
  const matches = useMatches();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [isCreateRestaurantOpen, setIsCreateRestaurantOpen] = useState(false);
  const { setUser, isAuthenticated, userRole, logout } = useAuth();
  const { selectedProject, refreshRestaurants } = useDashboard();
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

  const handleCreateRestaurant = async (restaurantData) => {
    await restaurantService.createRestaurant(restaurantData);
    refreshRestaurants();
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
                onClick={() => setIsCreateRestaurantOpen(true)}
              >
                New
              </button>
              <button
                className={actionButtonClass}
                disabled={selectedProject === null}
              >
                Update
              </button>
              <button
                className={actionButtonClass}
                disabled={selectedProject === null}
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
          open={isCreateRestaurantOpen}
          onClose={() => setIsCreateRestaurantOpen(false)}
          onCreateRestaurant={handleCreateRestaurant}
        />
      </div>
      <Footer />
    </div>
  );
}

export default LayoutPage;
