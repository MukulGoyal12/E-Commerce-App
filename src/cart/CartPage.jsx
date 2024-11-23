import React, { useState, useEffect } from "react";
import { getCartProducts } from "../api";
import Loading from "../tools/Loading";
import CartEmpty from "../tools/CartEmpty";
import CartRow from "./CartRow";
import { withCart } from "../providers/withHOC";
import { Link, useSearchParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import clsx from "clsx";

const CartPage = ({ cart, storeToCart }) => {
  const [loading, setLoading] = useState(true);
  const [localCart, setLocalCart] = useState({});

  const lastPage = Math.ceil(Object.keys(localCart).length / 5);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get("page") || 1;

  useEffect(() => {
    async function getCart() {
      try {
        setLoading(true);
        const data = await getCartProducts(cart);
        setLocalCart(data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    }
    getCart();
  }, [cart]);

  function storeToLocalCart(id, qty) {
    const newCart = {
      ...localCart,
      [id]: { product: localCart[id].product, qty: qty },
    };
    setLocalCart(newCart);
  }

  function updateCart() {
    const newCart = Object.keys(localCart).reduce((acc, id) => {
      acc[id] = localCart[id].qty;
      return acc;
    }, {});
    storeToCart(newCart);
  }

  function resetLocalCart() {
    const newCart = Object.keys(localCart).reduce((acc, id) => {
      acc[id] = { product: localCart[id].product, qty: cart[id] };
      return acc;
    }, {});
    setLocalCart(newCart);
  }

  function removeFromCart(id) {
    const newCart = { ...cart };
    delete newCart[parseInt(id)];
    storeToCart(newCart);
  }

  if (lastPage !== 0 && page > lastPage) {
    setSearchParams((prev) => {
      prev.set("page", lastPage);
      return prev;
    });
  }
  return loading ? (
    <div className="grow flex justify-center items-center">
      <Loading />
    </div>
  ) : Object.keys(localCart).length === 0 ? (
    <CartEmpty />
  ) : (
    <div className="max-w-6xl mx-auto w-full p-24 relative">
      <Link
        to="/"
        className="absolute top-3 left-10 gap-2 flex items-center text-3xl font-semibold"
      >
        <IoMdArrowRoundBack />
        <h1>Back</h1>
      </Link>
      <div className="border border-gray-300">
        <div className="hidden lg:flex h-12 font-bold bg-white items-center">
          <div className="w-20"></div>
          <h1 className="w-28"></h1>
          <h2 className="grow">Product</h2>
          <h3 className="w-32">Price</h3>
          <h4 className="w-32">Quantity</h4>
          <h5 className="w-32">Total</h5>
        </div>
        {Object.keys(localCart)
          .slice(page * 5 - 5, page * 5)
          .map((id) => (
            <CartRow
              key={id}
              product={localCart[id].product}
              qty={localCart[id].qty}
              storeToLocalCart={storeToLocalCart}
              removeFromCart={removeFromCart}
            />
          ))}
        <div className="h-16 p-4 flex justify-between items-center text-white">
          <div className="flex gap-2">
            <button
              className="p-2 rounded-md px-4 bg-orange-400 hover:bg-orange-500"
              onClick={updateCart}
            >
              Update Cart
            </button>
            <button
              className="p-2 rounded-md px-4 bg-orange-400 hover:bg-orange-500"
              onClick={resetLocalCart}
            >
              Reset Cart
            </button>
          </div>
          <div className="flex gap-2 items-center text-orange-500 font-bold">
            <button
              className="hover:bg-orange-500 border-2 border-orange-500 hover:text-white px-3 py-1 transition duration-300 ease-in-out rounded-full"
              disabled={page === 1 || lastPage === 0}
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("page", page - 1);
                  return prev;
                });
              }}
            >
              {"<"}
            </button>
            <h1 className="text-lg text-black">
              {page} of {lastPage}{" "}
            </h1>
            <button
              className="hover:bg-orange-500 border-2 border-orange-500 hover:text-white px-3 py-1 transition duration-300 ease-in-out rounded-full"
              disabled={page === lastPage || lastPage === 0}
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("page", page + 1);
                  return prev;
                });
              }}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 ml-auto my-10 border border-gray-300">
        <h1 className="w-full font-bold bg-white p-4 text-xl border-b border-gray-300">
          Cart Totals
        </h1>
        <div className="px-8 p-2">
          <div className="flex justify-center gap-4 border-b-2 h-10 m-4">
            <h2 className="w-full">Subtotal</h2>
            <h3 className="w-full">
              $
              {Object.keys(localCart).reduce((acc, id) => {
                const temp = (
                  acc +
                  cart[id] * localCart[id].product.price
                ).toFixed(2);

                return parseFloat(temp);
              }, 0)}
            </h3>
          </div>
          <div className="flex justify-center gap-4 border-b-2 h-10 m-4">
            <h2 className="w-full">Shipping</h2>
            <h3 className="w-full">Free Shipping</h3>
          </div>
          <div className="flex justify-center gap-4 border-b-2 h-10 m-4">
            <h2 className="w-full">Total</h2>
            <h3 className="w-full">
              $
              {Object.keys(localCart).reduce((acc, id) => {
                const temp = (
                  acc +
                  cart[id] * localCart[id].product.price
                ).toFixed(2);

                return parseFloat(temp);
              }, 0)}
            </h3>
          </div>
        </div>
        <button className="w-11/12 p-4 mx-auto mb-4 block bg-orange-500 text-white rounded-md">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default withCart(CartPage);
