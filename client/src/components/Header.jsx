import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
// import { set } from "mongoose";
import { setSearchQuery } from "../features/questions/questionSlice";

const Header = ({ leftOpen, setLeftOpen }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const [search, setSearch] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const showMenuIcon =
    location.pathname.startsWith("/") &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup";

  // Close mobile search on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowMobileSearch(false);
      }
    }

    if (showMobileSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMobileSearch]);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  // Get first letter for avatar
  const firstLetter = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase();

  return (
    <div className="w-full mx-auto px-4 xl:px-32 py-3 border-b border-gray-300 flex items-center justify-between gap-4 relative">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        {showMenuIcon && (
          <button
            className="block md:hidden"
            onClick={() => setLeftOpen((prev) => !prev)}
          >
            {leftOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        )}

        {/* LOGO */}
        <div className="cursor-pointer">
          <Link to="/">
            <img
              src="/short-ogo-stackoverflow.png"
              alt="logo"
              className="h-10 block md:hidden"
            />
            <img
              src="/logo-stackoverflow.png"
              alt="logo"
              className="h-8 hidden md:block"
            />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <button className="hidden lg:block px-4 py-1 rounded-3xl hover:bg-gray-200">
            About
          </button>
          <button className="px-4 py-1 rounded-3xl hover:bg-gray-200">
            Products
          </button>
          <button className="hidden lg:block px-4 py-1 rounded-3xl hover:bg-gray-200">
            For Teams
          </button>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full flex items-center gap-3 flex-1 justify-end">
        {/* Desktop Search */}
        <div className="hidden md:flex items-center gap-2 border border-gray-300 rounded-md px-2 py-[6px] flex-grow max-w-[600px]">
          <SearchIcon sx={{ color: "gray" }} />
          <input
            type="text"
            placeholder="Search…"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              dispatch(setSearchQuery(value));
            }}
            className="outline-none w-full placeholder:text-sm placeholder-gray-500"
          />
        </div>

        {/* Mobile Search */}
        <button className="md:hidden" onClick={() => setShowMobileSearch(true)}>
          <SearchIcon sx={{ color: "gray", fontSize: 24 }} />
        </button>

        {/* IF USER NOT LOGGED IN -> Show Login/Signup */}
        {!user && (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="text-sm border border-blue-500 text-blue-500 rounded-md px-3 py-1 hover:bg-blue-50"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-sm border border-blue-500 bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-700"
            >
              Sign up
            </Link>
          </div>
        )}

        {/* IF USER LOGGED IN -> Show Avatar */}
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="h-9 w-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold border"
            >
              {firstLetter}
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-40 text-sm z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Search Expanded */}
      {showMobileSearch && (
        <div
          ref={searchRef}
          className="md:hidden flex items-center gap-2 border border-gray-300 rounded-md px-2 py-[6px] w-[90%] absolute left-1/2 -translate-x-1/2 top-16 bg-white shadow-md"
        >
          <SearchIcon sx={{ color: "gray" }} />
          <input
            type="text"
            placeholder="Search…"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              dispatch(setSearchQuery(value));
            }}
            className="outline-none w-full placeholder:text-sm placeholder-gray-500"
          />
        </div>
      )}
    </div>
  );
};

export default Header;
