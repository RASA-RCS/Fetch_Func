//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved. 
//  This software is the confidential and proprietary information of [Rasa Consultancy Services]. 
//  You shall not disclose such confidential information and shall use it only in accordance 
//  with the terms of the license agreement you entered into with [Rasa Consultancy Services].
//  For more information, please contact: [Your Company Email/Legal Department Contact]

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = () => {
  
  // ⛔ localStorage.getItem("token") — WRONG
  // ✔ Cookies.get("token") — CORRECT
  const token = Cookies.get("token");

  const sessionExpiry = Number(localStorage.getItem("sessionExpiry"));

  // If no token → redirect to login
  if (!token) return <Navigate to="/login" replace />;

  // If session expired → redirect to session-expired page
  if (sessionExpiry && Date.now() > sessionExpiry) {
    return <Navigate to="/session-expired" replace />;
  }

  // Otherwise allow route
  return <Outlet />;
};

export default ProtectedRoutes;
