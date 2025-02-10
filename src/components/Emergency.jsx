import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaAmbulance, FaFire, FaFirstAid, FaMapMarkerAlt, FaPhoneAlt, FaBell } from "react-icons/fa";
import { MdEmergency, MdWarning, MdMyLocation } from "react-icons/md";

const EmergencyPage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isFirstAidExpanded, setFirstAidExpanded] = useState(false);

  useEffect(() => {
    // Simulate real-time alerts fetch
    const mockAlerts = [
      { type: "fire", message: "Wildfire alert within 5km radius", time: "2 min ago" },
      { type: "medical", message: "Emergency services en route", time: "5 min ago" }
    ];
    setAlerts(mockAlerts);

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  }, []);

  const triggerEmergencyProtocol = () => {
    // Simulate emergency alert
    alert("Emergency services notified! Sharing your location...");
    // Here you would integrate with actual emergency services API
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500 rounded-full mix-blend-screen blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-500 rounded-full mix-blend-screen blur-3xl animate-pulse-delayed"></div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block mb-6"
          >
            <MdEmergency className="text-red-500 w-16 h-16 mx-auto animate-pulse" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
            Emergency Response System
          </h1>
          <p className="text-gray-300">Your location: {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "Fetching..."}</p>
        </div>

        {/* Emergency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* SOS Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="col-span-full bg-gradient-to-br from-red-600 to-amber-600 p-8 rounded-2xl flex flex-col items-center shadow-xl hover:shadow-red-500/30 transition-all"
            onClick={triggerEmergencyProtocol}
          >
            <FaBell className="w-16 h-16 mb-4 animate-bounce" />
            <span className="text-2xl font-bold">EMERGENCY SOS</span>
            <span className="text-sm opacity-75">Tap to alert authorities & contacts</span>
          </motion.button>

          {/* Emergency Services */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaAmbulance className="text-red-400" />
              Emergency Services
            </h2>
            <div className="space-y-3">
              <button className="w-full flex justify-between items-center p-3 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition">
                <span>Police</span>
                <FaPhoneAlt />
              </button>
              <button className="w-full flex justify-between items-center p-3 bg-blue-500/20 rounded-lg hover:blue-red-500/30 transition">
                <span>Fire Department</span>
                <FaFire />
              </button>
              <button className="w-full flex justify-between items-center p-3 bg-green-500/20 rounded-lg hover:green-red-500/30 transition">
                <span>Medical Emergency</span>
                <FaFirstAid />
              </button>
            </div>
          </motion.div>

          {/* Location Sharing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-cyan-400" />
              Share Location
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-400">Your current coordinates:</p>
              <code className="block p-3 bg-black/20 rounded-lg break-all">
                {location ? `${location.lat}, ${location.lng}` : "Loading..."}
              </code>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-2 bg-cyan-500/20 rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-500/30">
                  <MdMyLocation  />
                  Copy
                </button>
                <button 
                  className="p-2 bg-cyan-500/20 rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-500/30"
                  onClick={() => window.open(`https://www.google.com/maps?q=${location?.lat},${location?.lng}`)}
                >
                  <FaMapMarkerAlt />
                  Open Map
                </button>
              </div>
            </div>
          </motion.div>

          {/* First Aid Guide */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaFirstAid className="text-green-400" />
              First Aid Guide
            </h2>
            <div className="space-y-3">
              <div className="accordion">
                <button 
                  className="w-full flex justify-between items-center"
                  onClick={() => setFirstAidExpanded(!isFirstAidExpanded)}
                >
                  <span>Emergency Procedures</span>
                  <motion.span
                    animate={{ rotate: isFirstAidExpanded ? 180 : 0 }}
                  >
                    ▼
                  </motion.span>
                </button>
                {isFirstAidExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-sm text-gray-300 space-y-2"
                  >
                    <p>1. Check for danger</p>
                    <p>2. Call for help</p>
                    <p>3. Perform CPR if needed</p>
                    <p>4. Stop bleeding</p>
                    <p>5. Stay with injured person</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Real-time Alerts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/20 backdrop-blur-lg rounded-xl p-6 border border-red-400/30"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MdWarning className="text-amber-400" />
            Active Alerts
          </h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${alert.type === 'fire' ? 'bg-red-400' : 'bg-blue-400'}`}></div>
                <div>
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm text-gray-400">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400">
          <p>Stay calm - Help is on the way</p>
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 text-cyan-400 hover:text-cyan-300 flex items-center justify-center gap-2 mx-auto"
          >
            ← Return to Safety
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EmergencyPage;