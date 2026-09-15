import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { FaUtensils, FaPhone, FaUser } from "react-icons/fa";

function TopBar({
  title,
  showBack,
  showNavigation,
  onOpenDialog,
  isLoggedIn,
  userRole,
  onLogout,
}) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsMenuOpen(false);
    onLogout();
  };

  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
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
          <h1 className="text-2xl font-bold text-red-500">{title}</h1>
          {showNavigation && (
            <nav>
              <ul className="flex space-x-4">
                <li className="flex items-center">
                  <FaUtensils className="mr-2" />
                  <Link
                    to="/restaurant"
                    className="text-gray-700 hover:text-red-500"
                  >
                    Order
                  </Link>
                </li>
                <li className="flex items-center">
                  <FaPhone className="mr-2" />
                  <Link
                    to="/contact"
                    className="text-gray-700 hover:text-red-500"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          )}
          {!isLoggedIn ? (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 flex items-center"
              onClick={() => onOpenDialog("login")}
            >
              <FaUser className="mr-2" />
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 flex items-center"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-expanded={isMenuOpen}
                aria-haspopup="menu"
              >
                <FaUser className="mr-2" />
                Profile
              </button>
              {isMenuOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg"
                  role="menu"
                >
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/profile");
                    }}
                    role="menuitem"
                  >
                    My profile
                  </button>
                  {userRole === "RESTAURANT_OWNER" && (
                    <button
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/owner-dashboard");
                      }}
                      role="menuitem"
                    >
                      Owner dashboard
                    </button>
                  )}
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  showBack: PropTypes.bool.isRequired,
  showNavigation: PropTypes.bool.isRequired,
  onOpenDialog: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userRole: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

export default TopBar;
