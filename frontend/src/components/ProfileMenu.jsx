import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function ProfileMenu({ userRole, onLogout }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItemClass =
    "block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100";

  const handleNavigate = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    onLogout();
    navigate("/");
  };

  return (
    <div className="relative">
      <button
        className="flex items-center rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600"
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
            className={menuItemClass}
            onClick={() => handleNavigate("/profile")}
            role="menuitem"
          >
            My profile
          </button>
          {userRole === "ADMIN" && (
            <button
              className={menuItemClass}
              onClick={() => handleNavigate("/admin")}
              role="menuitem"
            >
              Admin
            </button>
          )}
          {userRole === "RESTAURANT_OWNER" && (
            <button
              className={menuItemClass}
              onClick={() => handleNavigate("/owner-dashboard")}
              role="menuitem"
            >
              Owner dashboard
            </button>
          )}
          <button
            className={menuItemClass}
            onClick={handleLogout}
            role="menuitem"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
