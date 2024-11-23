import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { withUser } from "./providers/withHOC";
import AmazonBig from "./amazon_big.png";
import AmazonSmall from "./amazon_small.png";
import { withCart } from "./providers/withHOC";
import CartSVG from "./SVG/CartSVG";

const Header = ({ cart, user, removeUser }) => {
  const [showMenu, setShowMenu] = useState(false);

  const totalItems = Object.values(cart).reduce((acc, item) => acc + item, 0);
  return (
    <div className="bg-white">
      <div className="h-20 flex justify-between items-center mx-auto w-full max-w-screen-2xl px-2 pr-8 sm:px-8 ">
        <Link to="/" className="w-40 h-full min-w-14">
          <img
            src={AmazonBig}
            alt="Amazon Logo"
            className="h-full hidden sm:block"
          />

          <img
            src={AmazonSmall}
            alt="Amazon Logo Small"
            className="h-full sm:hidden p-2 object-contain"
          />
        </Link>
        <div className="h-full flex sm:gap-12 gap-4 items-center">
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <div className="border-2 p-2 px-4 border-gray-200 rounded-full my-auto whitespace-nowrap flex items-center gap-2">
              <FaUser />
              <h1 className="hidden sm:block hover:text-orange-500">
                {user ? user.full_name : "Account Options"}
              </h1>
              <h2>&#9660;</h2>
            </div>
            <div
              className={clsx(
                "absolute top-16 -right-20 sm:right-0 w-max min-w-48 bg-white border border-gray-300 rounded-md z-10 transition-all duration-300 ",
                showMenu
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 pointer-events-none translate-y-2",
              )}
            >
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="block p-2 hover:bg-gray-100 hover:text-orange-500"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block p-2 hover:bg-gray-100 hover:text-orange-500"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <h2 className="font-semibold p-2">
                    Welcome, {user.full_name}
                  </h2>
                  <button
                    onClick={() => {
                      removeUser();
                    }}
                    className="block p-2 hover:bg-gray-100 hover:text-orange-500 w-full text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
          <Link to="/cart" className="h-5/6 self-end relative">
            <div className="absolute -top-2 -right-4 bg-orange-500 border-4 border-white border-double text-white rounded-full p-1 truncate h-8 min-w-8 flex justify-center items-center aspect-auto">
              {totalItems}
            </div>
            <CartSVG />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withCart(withUser(Header));
