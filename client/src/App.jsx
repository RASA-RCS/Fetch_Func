// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is the confidential and proprietary information of [Rasa Consultancy Services]. 
//  You shall not disclose such confidential information and shall use it only in accordance 
//with the terms of the license agreement you entered into with [Rasa Consultancy Services].
//  For more information, please contact: [Your Company Email/Legal Department Contact]

import { Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Careers from "./Components/Careers";
import Navbar from "./Components/NavBar";
import OurServices from "./Components/OurServices";
import Footer from "./Components/Footer";
import ServiceDetail from "./Components/ServiceDetail";
import Home from "./Components/Home";
import ContactUs from "./Components/ContactUs";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ChangePassword from "./Pages/ChangePassword";
import DashBoard from "./Components/DashBoard";
import SessionExpired from "./Pages/SessionExpired";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ForgetPassword from "./pages/ForgetPassword";
import ForgetPassword from "./Pages/ForgotPassword";
import ProtectedRoutes from "./Services/ProtectedRoutes";

import UserFrom from "./Components/UserFrom";
import LiveChatBot from "./Components/LiveChatBot";

// import Home from './components/Home';




function App() {

  const location = useLocation();
  const hidelayoutRoutes = ["/login", "/register"];

  const hidelayout = hidelayoutRoutes.includes(location.pathname);
  return (
    <>

      <HelmetProvider>
        {/* <Navbar /> */}
        {!hidelayout && <Navbar />}
       

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ourservices" element={<OurServices />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/reset-password" element={<ForgetPassword />} />
          <Route path="/user/reset/:id/:token" element={<ChangePassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/session-expired" element={<SessionExpired />} />
          <Route path="/userFrom" element={<UserFrom/>} />
        

          {/* 🟢 Correct Protected Route Wrapper */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
        </Routes>
        {/* <LiveChatBot/> */}
        {!hidelayout && <Footer />}
      </HelmetProvider>

     
    
    </>
  );
}

export default App;
