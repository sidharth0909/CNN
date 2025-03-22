import React, { useState } from "react";
import Hero from "./Hero";
import Weather from "./Weather";
import Marquee from "react-fast-marquee";
import Services from "./Services";
import { motion } from "framer-motion";
import DisasterFund from "./DisasterFund";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const monitoringOptions = {
    "Heavy Rain": "https://mosdac.gov.in/heavy-rain/",
    "Recent Earthquake":
      "https://riseq.seismo.gov.in/riseq/earthquake/recent_earthquake",
    Heat: "https://mosdac.gov.in/temperature/",
  };
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState("Heavy Rain");

  // Emotional quotes array
  const donationQuotes = [
    "Every drop of help creates an ocean of hope 🌊",
    "Your contribution could be someone's lifeline 🧡",
    "Together, we rise stronger from the ashes 🔥",
    "Hope survives when people help each other 🤝",
  ];

  const [currentQuote] = useState(() => 
    donationQuotes[Math.floor(Math.random() * donationQuotes.length)]
  );

  return (
    <div className="overflow-hidden bg-gradient-to-b from-gray-50 to-blue-50">
      <Marquee
        className="mt-24 bg-gradient-to-r from-red-600 to-red-700 py-3 shadow-lg"
        speed={100}
        gradient={false}
      >
        <div className="flex flex-wrap items-center justify-center space-x-8 px-4 text-sm font-bold tracking-wide text-white">
          {/* Emergency Helpline */}
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-400 animate-pulse"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 112 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-cyan-400">
              🚨 24/7 Disaster Emergency Helpline:
            </span>
            <span className="text-white">011-26701700</span>
            <span className="text-gray-300">
              (For immediate disaster response, rescue operations, and urgent
              assistance.)
            </span>
          </div>

          {/* Separator */}
          <div className="w-1 h-1 bg-white/50 rounded-full" />

          {/* Email Support */}
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-cyan-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="text-cyan-400">📩 NDRF Official Email:</span>
            <span className="text-white">hq.ndrf@nic.in</span>
            <span className="text-gray-300">
              (For non-urgent queries, disaster management collaborations, and
              official communications.)
            </span>
          </div>

          {/* Separator */}
          <div className="w-1 h-1 bg-white/50 rounded-full" />

          {/* Twitter Updates */}
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
            <span className="text-blue-400">Follow NDRF on Twitter:</span>
            <span className="text-white">@NDRFHQ</span>
            <span className="text-gray-300">
              (For real-time disaster updates, safety tips, and response
              coordination.)
            </span>
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
          {/* Disaster Monitoring Section */}
          <div className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Disaster Monitoring
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-3">
                Select Monitoring Index:
              </label>
              <select
                className="block w-full p-3 border border-gray-200 rounded-xl bg-gradient-to-b from-gray-50 to-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={selectedIndex}
                onChange={(e) => setSelectedIndex(e.target.value)}
              >
                {Object.keys(monitoringOptions).map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-200 hover:border-blue-200 transition-all">
              <iframe
                className="w-full"
                height="500"
                src={monitoringOptions[selectedIndex]}
                title="Disaster Monitoring Index"
              />
            </div>
          </div>

          {/* Weather Component */}
          <div className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
            <Weather />
          </div>
        </div>

        <Services />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative isolate mt-24 overflow-hidden rounded-3xl shadow-2xl"
        >
          <img
            src="https://cnn-arabic-images.cnn.io/cloudinary/image/upload/x_0,y_265,w_5087,h_2861,c_crop/w_1920,h_1008,c_fill,q_auto,g_center/t_cnnarabic_watermark_logo_v5/cnnarabic/2023/10/24/images/252937.jpg"
            alt="Helping hands"
            className="absolute inset-0 -z-10 h-full w-full object-cover brightness-75"
          />
          
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center backdrop-blur-sm bg-white/10 p-8 rounded-2xl">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-8"
              >
                Be the Hope in Someone's Darkness
              </motion.h2>
              
              <motion.p
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-2xl leading-8 text-amber-200 mb-12 italic"
              >
                "{currentQuote}"
              </motion.p>

              <div className="flex flex-col items-center gap-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-4 text-xl font-semibold text-white shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all"
                  onClick={() => navigate("/disaster_fund")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  Make an Impact Now
                </motion.button>

                <div className="grid grid-cols-3 gap-8 text-center text-white">
                  <div className="bg-white/10 p-4 rounded-xl">
                    <p className="text-3xl font-bold">1M+</p>
                    <p className="text-sm">Lives Impacted</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl">
                    <p className="text-3xl font-bold">92%</p>
                    <p className="text-sm">Funds Directly Used</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl">
                    <p className="text-3xl font-bold">4.9★</p>
                    <p className="text-sm">Donor Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating ETH Symbol */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 right-20 text-6xl opacity-50"
          >
            Ξ
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;