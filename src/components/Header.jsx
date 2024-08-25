import React, { useState } from "react";
import { RiExchangeFundsFill } from "react-icons/ri";
import { FaBars, FaPowerOff, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import authService from "../utils/appwriteConfig";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);
  const dispatch = useDispatch();
  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);
  const handleLogout = (device) => {
    const confirm = window.confirm("Are you sure you want to log out?");
    if (!confirm) return;
    authService.logout();
    dispatch(logout());
    if (device === "small") closeDrawer();
  };
  return (
    <nav className="flex justify-between items-center px-4 py-3 bg-zinc-900 md:bg-zinc-950">
      {/* Left Side Icon */}
      <Link to={"/"}>
        <RiExchangeFundsFill size={30} className="text-amber-200" />
      </Link>

      {/* Right Side Links (Medium and Large Screens) */}
      <div className="hidden md:flex items-center space-x-6 li-item-lg">
        <div
          className="relative"
          onMouseEnter={handleDropdownToggle}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button className="text-gray-500">Tool</button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="tool-dropdown absolute right-0 mt-2 top-14 z-50"
              >
                <Link
                  to="/jpg-to-png"
                  className="block px-4 py-2 text-gray-500 mt-2"
                >
                  JPG to PNG
                </Link>

                <Link
                  to="/png-to-jpg"
                  className="block px-4 py-2 text-gray-500 mt-2"
                >
                  PNG to JPG
                </Link>
                <Link
                  to="/url-to-image"
                  className="block px-4 py-2 text-gray-500 mt-2"
                >
                  URL to Image
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {!authStatus && (
          <>
            <Link to="/sign-in" className="text-gray-500">
              Login
            </Link>
            <Link to="/sign-up" className="text-gray-500">
              Sign Up
            </Link>
          </>
        )}
        <Link to="/pricing" className="text-gray-500">
          Pricing
        </Link>
        {authStatus && (
          <div
            onClick={() => handleLogout("big")}
            className="w-[50px] h-[50px] flex  items-center justify-center bg-zinc-950 text-red-500   rounded-full"
          >
            <FaPowerOff size={25} />
          </div>
        )}
      </div>

      {/* Hamburger Icon for Small Screens */}
      <div className="md:hidden">
        <FaBars size={30} className="text-amber-200" onClick={toggleDrawer} />
      </div>

      {/* Drawer (Small Screens) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-[280px] max-w-xs h-full bg-[#101010] shadow-lg z-50 p-4 rounded"
          >
            <div className="flex flex-row-reverse">
              <FaTimes
                size={30}
                className="text-amber-200"
                onClick={closeDrawer}
              />
            </div>
            <h2 className="text-xl  font-semibold text-gray-400 mt-5">Menu</h2>
            <div className="mt-4 space-y-4 li-item">
              {!authStatus && (
                <>
                  <Link
                    to="/sign-in"
                    onClick={closeDrawer}
                    className="block text-gray-500"
                  >
                    Login
                  </Link>
                  <Link
                    to="/sign-up"
                    onClick={closeDrawer}
                    className="block text-gray-500"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              <div
                className="relative"
                onMouseEnter={handleDropdownToggle}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="w-full text-left text-gray-500">Tool</button>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="tool-dropdown mt-2   rounded "
                  >
                    <Link
                      to="/jpg-to-png"
                      onClick={closeDrawer}
                      className="block px-4 py-2 mb-2 text-gray-500"
                    >
                      JPG to PNG
                    </Link>
                    <Link
                      to="/png-to-jpg"
                      onClick={closeDrawer}
                      className="block px-4 py-2 mb-2 text-gray-500"
                    >
                      PNG to JPG
                    </Link> 
                    <Link
                      to="/url-to-image"
                      onClick={closeDrawer}
                      className="block px-4 py-2  mb-2 text-gray-500"
                    >
                      URL to Image
                    </Link>
                  </motion.div>
                )}
              </div>
              <Link
                to="/pricing"
                onClick={closeDrawer}
                className="block text-gray-500"
              >
                Pricing
              </Link>
              {authStatus && (
                <div
                  onClick={() => handleLogout("small")}
                  className="w-[50px] h-[50px] flex  items-center justify-center bg-zinc-950 text-red-500   rounded-full"
                >
                  <FaPowerOff size={25} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for closing the drawer when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeDrawer}
        />
      )}
    </nav>
  );
};

export default Header;
