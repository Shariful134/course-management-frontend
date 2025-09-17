import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Active link class
  const activeClass = "text-blue-600 font-bold";

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-800 shadow z-50">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              EduPlatform
            </span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${activeClass}`
                  : "text-gray-800 dark:text-white hover:text-blue-600 transition"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                isActive
                  ? `${activeClass}`
                  : "text-gray-800 dark:text-white hover:text-blue-600 transition"
              }
            >
              Courses
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? `${activeClass}`
                  : "text-gray-800 dark:text-white hover:text-blue-600 transition"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? `${activeClass}`
                  : "text-gray-800 dark:text-white hover:text-blue-600 transition"
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <NavLink
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Register
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-white focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-6 py-4 space-y-2">
          {["/", "/courses", "/about", "/contact"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? `${activeClass} block`
                  : "block text-gray-800 dark:text-white hover:text-blue-600 transition"
              }
              onClick={() => setIsOpen(false)}
            >
              {path === "/"
                ? "Home"
                : path.replace("/", "").charAt(0).toUpperCase() +
                  path.replace("/", "").slice(1)}
            </NavLink>
          ))}
          <div className="flex flex-col space-y-2 mt-4">
            <NavLink
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Register
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
