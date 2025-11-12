import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Careers from "./Components/Careers";
import Navbar from "./Components/NavBar";
import OurServices from "./Components/OurServices";
import Footer from "./Components/Footer";
import ServiceDetail from "./Components/ServiceDetail";
import Home from "./Components/Home";
import ContactUs from "./Components/ContactUs";
import DashBoard from "./Components/DashBoard";
// import Home from './components/Home';

function App() {
  return (
    <HelmetProvider>
      
      <Navbar />
      
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourservices" element={<OurServices />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/dashboard" element={<DashBoard/>}/>
      </Routes>
     
      <Footer />
    </HelmetProvider>
  );
}

export default App;
