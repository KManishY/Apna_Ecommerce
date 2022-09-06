import { Route, Routes } from "react-router-dom";
import Checkout from "../Pages/Checkout/Checkout";
import Homepage from "../Pages/Homepage/Homepage";
import LoginSignup from "../Pages/Login_Signup/LoginSignup";
import Products from "../Pages/Product/Products";
import Error from "../Pages/Error";

import React from "react";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<LoginSignup />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/product" element={<Products />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
