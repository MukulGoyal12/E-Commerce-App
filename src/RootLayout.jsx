import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const RootLayout = () => {
  return (
    <div className="h-screen overflow-scroll flex flex-col bg-fuchsia-50">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default RootLayout;
