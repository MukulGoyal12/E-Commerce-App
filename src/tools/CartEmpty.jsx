import React from "react";
import { Link } from "react-router-dom";
import BasketSVG from "../SVG/BasketSVG";

const CartEmpty = () => {
  return (
    <section className="grow dark:bg-gray-900 flex justify-center items-center bg-fuchsia-50">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 h-60 flex justify-center text-orange-600 dark:text-orange-500">
            <BasketSVG />
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            No items in your cart.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorr26y, your cart is empty. You'll find lots to explore on the
            homepage.{" "}
          </p>
          <Link
            to="/"
            className="inline-flex text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-orange-900 my-4"
          >
            Discover Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CartEmpty;
