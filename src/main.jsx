// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'

// import Navbar from './Components/NavBar.jsx'
// import Footer from './Components/Footer.jsx'
// import App from './App.jsx'
// import OurServices from './Components/OurServices.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
    
//     <Navbar/>
//     <App/>
//     <OurServices/>
//     <Footer/>
//   </StrictMode>,
// )

// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { BrowserRouter } from 'react-router-dom'; // ✅ Wrap here

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      
    </BrowserRouter>
  </React.StrictMode>
);

