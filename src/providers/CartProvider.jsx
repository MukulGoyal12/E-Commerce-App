import React, { createContext, useEffect, useState } from "react";
import { getCart, saveCart } from "../api";
import { withUser } from "./withHOC";
import { CartContext } from "./Contexts";
import Loading from "../tools/Loading";

const CartProvider = ({ user, removeUser, children }) => {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      try {
        const cart = await getCart();
        setCart(cart);
      } catch (error) {
        console.error(error.message);
        removeUser();
      }
      setLoading(false);
    }

    if (user) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  function addToCart(id, qty) {
    if (!qty) return;
    const newCart = {
      ...cart,
      [parseInt(id)]: (cart[parseInt(id)] || 0) + parseInt(qty),
    };
    storeToCart(newCart);
  }

  async function storeToCart(newCart) {
    try {
      await saveCart(newCart);
      setCart(newCart);
    } catch (error) {
      console.error(error.message);
      removeUser();
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, storeToCart }}>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        children
      )}
    </CartContext.Provider>
  );
};

export default withUser(CartProvider);
