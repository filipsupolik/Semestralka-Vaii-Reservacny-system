import { useState } from "react";
import { Outlet, useLocation, useMatches } from "react-router-dom";
import { LoginDialog, Footer, TopBar } from "../components/index";

function LayoutPage() {
  const matches = useMatches();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const currentRoute = matches.at(-1);
  const meta = currentRoute?.handle ?? {};
  const isOwnerDashboard = useLocation().pathname === "/owner-dashboard";

  const actionButtonClass =
    "cursor-pointer rounded-[25px] border-0 bg-[#00b7ff] px-[15px] py-[5px] text-base font-extrabold text-white disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-60";

  const [cartsByRestaurant, setCartsByRestaurant] = useState({});

  const openDialog = (type) => {
    setDialogType(type);
    setIsOpen(true);
  };
  const closeDialog = () => setIsOpen(false);
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <TopBar
        {...meta}
        onOpenDialog={openDialog}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        actionButtons={
          isOwnerDashboard ? (
            <div className="flex items-center gap-[15px]">
              <button
                className={actionButtonClass}
                disabled={selectedProject !== null}
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
        onLogout={() => {
          setIsLoggedIn(false);
          setUserRole(null);
        }}
      />
      <div className="flex-grow">
        <Outlet
          context={{
            cartsByRestaurant,
            setCartsByRestaurant,
            selectedProject,
            setSelectedProject,
          }}
        />
        {dialogType === "login" && (
          <LoginDialog
            isOpen={isOpen}
            handleClose={closeDialog}
            onLogin={(user) => {
              setIsLoggedIn(true);
              setUserRole(user.role);
              closeDialog();
            }}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default LayoutPage;
