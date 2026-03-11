import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUtensils, FaPhone, FaUser } from "react-icons/fa";

function TopBar({ title, showBack, showNavigation, onOpenDialog }) {
  const navigate = useNavigate();

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
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 flex items-center"
            onClick={() => {
              onOpenDialog("login");
            }}
          >
            <FaUser className="mr-2" />
            Login
          </button>
        </div>
      </header>
    </div>
  );
}

export default TopBar;
