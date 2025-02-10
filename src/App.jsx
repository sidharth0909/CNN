import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "./components/Blog";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Portfolio from "./components/Portfolio";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Service from "./components/Service";
import Predict from "./components/Predict";
import DisasterResourceApp from "./components/ResourceRequest";
import Plans from "./components/Plans";
import DisasterPage from "./components/DisasterPage";
import Layout from "./components/layout";
import FloodsReady from "./components/FloodsReady";
import LandslidesReady from "./components/LandslidesReady";
import DroughtReady from "./components/DroughtReady";
import CycloneReady from "./components/CycloneReady";
import EarthquakeReady from "./components/EarthquakeReady";
import WildfiresReady from "./components/WildfiresReady";
import HeatwavesReady from "./components/HeatwavesReady";
import ChatBot from "./components/chatbot"; // Import ChatBot
import EmergencyPage from "./components/Emergency";
import Creators from "./components/Creator";

const App = () => {
  return (
    <Router>
      <div className="vh-100 vw-100 overflow-auto scrollbar-hide">
        <Navbar />
        
        <div className="mt-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/social_media" element={<Service />} />
            <Route path="/services" element={<DisasterResourceApp />} />
            <Route
              path="/resources_requests"
              element={<DisasterResourceApp />}
            />
            <Route path="/plan/:name" element={<DisasterResourceApp />} />
            <Route path="/disaster" element={<DisasterPage />} />
            <Route path="/services/:serviceName" element={<Service />} />
            <Route path="/about" element={<About />} />
            <Route path="/plan" element={<Plans />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/safety-tips" element={<Layout />} />
            <Route path="/floods-ready" element={<FloodsReady />} />
            <Route path="/landslides-ready" element={<LandslidesReady />} />
            <Route path="/drought-ready" element={<DroughtReady />} />
            <Route path="/cyclone-ready" element={<CycloneReady />} />
            <Route path="/earthquake-ready" element={<EarthquakeReady />} />
            <Route path="/wildfires-ready" element={<WildfiresReady />} />
            <Route path="/heatwaves-ready" element={<HeatwavesReady />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/creators" element={<Creators />} />
          </Routes>
        </div>
        <Footer />
        <ChatBot /> {/* Add ChatBot here to keep it globally accessible */}
      </div>
    </Router>
  );
};

export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";
// import Blog from "./components/Blog";
// import Services from "./components/Services";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import Home from "./components/Home";
// import Portfolio from "./components/Portfolio";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Service from "./components/Service";
// import Predict from "./components/Predict";
// import DisasterResourceApp from "./components/ResourceRequest";
// import Plans from "./components/Plans";
// import DisasterPage from "./components/DisasterPage";
// import Layout from "./components/layout";
// import FloodsReady from "./components/FloodsReady";
// import ChatBot from "./components/chatbot";
// import "./global.css";

// const App = () => {
//   return (
//     <Router>
//       <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
//         <Navbar />
//         <main className="flex-1">
//           <AnimatePresence mode="wait">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/social_media" element={<Service />} />
//               <Route path="/services" element={<DisasterResourceApp />} />
//               <Route
//                 path="/resources_requests"
//                 element={<DisasterResourceApp />}
//               />
//               <Route path="/plan/:name" element={<DisasterResourceApp />} />
//               <Route path="/disaster" element={<DisasterPage />} />
//               <Route path="/services/:serviceName" element={<Service />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/plan" element={<Plans />} />
//               <Route path="/predict" element={<Predict />} />
//               <Route path="/safety-tips" element={<Layout />} />
//               <Route path="/floods-ready" element={<FloodsReady />} />
//             </Routes>
//           </AnimatePresence>
//         </main>
//         <Footer />
//         <ChatBot />
//       </div>
//     </Router>
//   );
// };

// export default App;
