import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaUser, FaHome } from "react-icons/fa";
import ProfileMenu from "./ProfileMenu";

function TopBar({
  title,
  showBack,
  showHome,
  onOpenDialog,
  isLoggedIn,
  userRole,
  actionButtons,
  onLogout,
}) {
  const navigate = useNavigate();

  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-y-2">
          {showBack && (
            <div className="flex items-center">
              <button
                className="text-red-500 text-2xl font-bold mr-4"
                onClick={() => navigate(-1)}
              >
                ←
              </button>
            </div>
          )}
          {showHome && (
            <div className="flex items-center">
              <button
                className="text-red-500 text-2xl font-bold mr-4"
                onClick={() => navigate("/")}
                aria-label="Home"
              >
                <FaHome />
              </button>
            </div>
          )}
          <h1 className="text-xl sm:text-2xl font-bold text-red-500">
            {title}
          </h1>
          <div className="flex items-center gap-4">
            {actionButtons}
            {!isLoggedIn ? (
              <button
                className="flex items-center rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={() => onOpenDialog("login")}
              >
                <FaUser className="mr-2" />
                Login
              </button>
            ) : (
              <ProfileMenu userRole={userRole} onLogout={onLogout} />
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  showBack: PropTypes.bool.isRequired,
  showHome: PropTypes.bool,
  onOpenDialog: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userRole: PropTypes.string,
  actionButtons: PropTypes.node,
  onLogout: PropTypes.func.isRequired,
};

export default TopBar;
