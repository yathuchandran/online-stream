import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function Protect() {
  const auth = localStorage.getItem("sLoginName");
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default Protect;