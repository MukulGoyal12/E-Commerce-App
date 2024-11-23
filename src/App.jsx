import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import ProductPage from "./product/ProductPage";
import RootLayout from "./RootLayout";
import Error404 from "./tools/Error404";
import Login from "./account/Login";
import Signup from "./account//Signup";
import CartPage from "./cart/CartPage";
import UserProvider from "./providers/UserProvider";
import AlertProvider from "./providers/AlertProvider";
import LoggedInRoute from "./account/LoggedInRoute";
import Alert from "./tools/Alert";
import AlertList from "./tools/AlertList";
import CartProvider from "./providers/CartProvider";
import AuthRoute from "./account/AuthRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <AlertProvider>
            <CartProvider>
              <AlertList />
              <Routes>
                <Route
                  path="/"
                  element={
                    <AuthRoute>
                      <RootLayout />
                    </AuthRoute>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path="product/:id" element={<ProductPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="404" element={<Error404 />} />
                  <Route path="*" element={<Error404 />} />
                </Route>
                <Route
                  path="/login"
                  element={
                    <LoggedInRoute>
                      <Login />
                    </LoggedInRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <LoggedInRoute>
                      <Signup />
                    </LoggedInRoute>
                  }
                />
              </Routes>
            </CartProvider>
          </AlertProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
