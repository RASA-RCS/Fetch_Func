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
import Admin from "./Components/Admin";

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

          {/* 🟢 Correct Protected Route Wrapper */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
        </Routes>
        {!hidelayout && <Footer />}
      </HelmetProvider>

      {/* Toastify container */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
