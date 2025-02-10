// import React from "react";
// import Hero from "./Hero";
// import Weather from "./Weather";
// import Marquee from "react-fast-marquee";
// import Services from "./Services";
// import Layout from "./layout.jsx";

// const Home = () => {
//   return (
//     <div className="overflow-hidden">
//       <div>
//         <div className="flex ">
//           <div className="mr-auto p-3 text-white bg-red-500 w-[8rem] ">
//             Contact Us
//           </div>
//           <Marquee className="ml-auto font-semibold bg-gray-200">
//             <div>TELE/FAX NO. - 011-23438091, 011-23438136</div>
//             <div className="ml-4"> EMAIL ID -hq.ndrf@nic.in</div>
//           </Marquee>
//         </div>

//         <Hero />
//       </div>

//       <div className="flex items-center gap-8 justify-between bg-gray-100 mt-16">
//         <div className="w-1/2">
//           <div className="p-4">
//             <div className="relative">
//               <div className="bg-gray-100 w-full h-[5.2rem] absolute z-10 flex items-center justify-center text-2xl font-bold">
//               Recent Earthquake
//               </div>
//               <iframe
//                 className="w-full"
//                 height={500}
//                 src="https://riseq.seismo.gov.in/riseq/earthquake/recent_earthquake"
//                 title="Recent Earthquake"
//               ></iframe>
//             </div>
//           </div>
//         </div>
//         <div className="w-1/2">
//           <div className="p-4">
//             <Weather />
//           </div>
//         </div>
//       </div>

//       <Services />
      
//     </div>
    
//   );
// };


// export default Home;


import React, { useState } from "react";
import Hero from "./Hero";
import Weather from "./Weather";
import Marquee from "react-fast-marquee";
import Services from "./Services";
import { motion } from "framer-motion";

const Home = () => {
  // Define available options and their corresponding URLs
  const monitoringOptions = {
    "Heavy Rain": "https://mosdac.gov.in/heavy-rain/",
    "Recent Earthquake": "https://riseq.seismo.gov.in/riseq/earthquake/",
    "Heat": "https://mosdac.gov.in/temperature/",
  };

  const [selectedIndex, setSelectedIndex] = useState("Heavy Rain");

  return (
    <div className="overflow-hidden bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Enhanced Emergency Banner */}
      <Marquee
        className="mt-24 bg-gradient-to-r from-red-600 to-red-700 py-3 shadow-lg"
        speed={40}
        gradient={false}
      >
        <div className="flex items-center space-x-8 px-4 text-sm font-bold tracking-wide">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white animate-pulse" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 112 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-white">24/7 Emergency Helpline: 011-23438091</span>
          </div>
          
          <div className="w-1 h-1 bg-white/50 rounded-full" />
          
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="text-white">hq.ndrf@nic.in</span>
          </div>
          
          <div className="w-1 h-1 bg-white/50 rounded-full" />
          
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
            <span className="text-white">@NDRFHQ</span>
          </div>
        </div>
      </Marquee>

      <Hero />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Seismic Activity & Disaster Monitoring */}
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Disaster Monitoring
            </h2>

            {/* Selection Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white-700 mb-2">
                Select Monitoring Index:
              </label>
              <select
                className="block w-full p-2 border border-white-300 rounded-md bg-black text-white focus:outline-none focus:border-blue-500"
                value={selectedIndex}
                onChange={(e) => setSelectedIndex(e.target.value)}
              >
                {Object.keys(monitoringOptions).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Embedded Iframe */}
            <div className="rounded-lg overflow-hidden border border-white-200">
              <iframe
                className="w-full"
                height="500"
                src={monitoringOptions[selectedIndex]}
                title="Disaster Monitoring Index"
              />
            </div>
          </div>

          {/* Weather Component */}
          <div className="bg-white rounded-xl shadow-xl p-6">
            <Weather />
          </div>
        </div>

        <Services />
      </motion.div>
    </div>
  );
};

export default Home;
