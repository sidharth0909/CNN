import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaAmbulance, FaFire, FaFirstAid, FaMapMarkerAlt, FaPhoneAlt, FaBell } from "react-icons/fa";
import { MdEmergency, MdWarning, MdMyLocation } from "react-icons/md";

const EmergencyPage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isFirstAidExpanded, setFirstAidExpanded] = useState(false);
  const [emergencyServices, setEmergencyServices] = useState({
    police: [],
    fire: [],
    hospital: []
  });
  const [selectedServiceType, setSelectedServiceType] = useState("police");

  const tollFreeNumbers = {
    police: "100",
    fire: "101",
    hospital: "108"
  };

  const emergencyProcedures = [
    {
      title: "CPR Instructions",
      videoUrl: "https://www.youtube.com/watch?v=Plse2FOkV4Q",
      docUrl: "https://www.redcross.org/take-a-class/cpr/performing-cpr/cpr-steps"
    },
    {
      title: "Stop the Bleeding",
      videoUrl: "https://www.youtube.com/watch?v=dkb-Ddb8QFA",
      docUrl: "https://www.stopthebleed.org"
    },
    {
      title: "Basic First Aid",
      videoUrl: "https://www.youtube.com/watch?v=5OKFljZ2GQE",
      docUrl: "https://www.redcross.org/first-aid"
    },
    {
      title: "Heimlich Maneuver (Choking First Aid)",
      videoUrl: "https://www.youtube.com/watch?v=5VVat7k3NqI",
      docUrl: "https://www.redcross.org/take-a-class/choking"
    },
    {
      title: "Heart Attack First Aid",
      videoUrl: "https://www.youtube.com/watch?v=1pU12sXb_8g",
      docUrl: "https://www.heart.org/en/health-topics/heart-attack"
    },
    {
      title: "Poisoning Emergency Response",
      videoUrl: "https://www.youtube.com/watch?v=Ej3bItvgnjA",
      docUrl: "https://www.poison.org/"
    },
    {
      title: "Drowning Emergency Response",
      videoUrl: "https://www.youtube.com/watch?v=wJ69CKrASyY",
      docUrl: "https://www.redcross.org/take-a-class/drowning"
    }
  ];
  
  

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setLocation(userLocation);
      });
    }
  }, []);

  useEffect(() => {
    if (!location) return;

    const fetchLocationName = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`
        );
        const data = await response.json();
        const address = data.address;
        setLocationName({
          city: address.city || address.town || address.village,
          state: address.state,
          country: address.country
        });
      } catch (error) {
        console.error("Error fetching location name:", error);
      }
    };

    const fetchEmergencyServices = async () => {
      try {
        const radius = 5000;
        const overpassQuery = `
          [out:json][timeout:25];
          (
            node["amenity"="police"](around:${radius},${location.lat},${location.lng});
            node["amenity"="fire_station"](around:${radius},${location.lat},${location.lng});
            node["amenity"="hospital"](around:${radius},${location.lat},${location.lng});
          );
          out body;
          >;
          out skel qt;
        `;

        const response = await fetch(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
        );
        const data = await response.json();

        const services = { police: [], fire: [], hospital: [] };
        data.elements.forEach(element => {
          let serviceType, tollFree;
          if (element.tags.amenity === "police") {
            serviceType = "police";
            tollFree = tollFreeNumbers.police;
          } else if (element.tags.amenity === "fire_station") {
            serviceType = "fire";
            tollFree = tollFreeNumbers.fire;
          } else if (element.tags.amenity === "hospital") {
            serviceType = "hospital";
            tollFree = tollFreeNumbers.hospital;
          } else return;

          const service = {
            name: element.tags.name || "Unnamed",
            address: element.tags["addr:street"] || "Address not available",
            location: { lat: element.lat, lng: element.lon },
            phone: element.tags.phone || tollFree
          };

          services[serviceType].push(service);
        });

        setEmergencyServices(services);
      } catch (error) {
        console.error("Error fetching emergency services:", error);
      }
    };

    const fetchAlerts = async () => {
      try {
        const response = await fetch(
          `https://earthquake.usgs.gov/fdsnws/event/1/query?` +
          `format=geojson&latitude=${location.lat}&longitude=${location.lng}&maxradiuskm=500&limit=5`
        );
        const data = await response.json();
        if (data.features) {
          const earthquakeAlerts = data.features.map(feature => ({
            type: "earthquake",
            message: `${feature.properties.title} - Magnitude ${feature.properties.mag}`,
            time: new Date(feature.properties.time).toLocaleTimeString(),
            url: feature.properties.url
          }));
          setAlerts(earthquakeAlerts);
        }
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchLocationName();
    fetchEmergencyServices();
    fetchAlerts();
    const alertInterval = setInterval(fetchAlerts, 5 * 60 * 1000);
    return () => clearInterval(alertInterval);
  }, [location]);

  const triggerEmergencyProtocol = () => {
    if (!location) {
      alert("Location not available. Please enable location services.");
      return;
    }

    const message = `Emergency! My location: ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}. City: ${locationName?.city || 'Unknown'}, State: ${locationName?.state || 'Unknown'}, Country: ${locationName?.country || 'Unknown'}`;

    if (navigator.share) {
      navigator.share({
        title: 'EMERGENCY SOS',
        text: message
      }).catch(console.error);
    } else {
      const smsUrl = `sms:911?body=${encodeURIComponent(message)}`;
      window.open(smsUrl);
    }
  };

  return (
    <div className="mt-24 min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
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
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block mb-6">
            <MdEmergency className="text-red-500 w-16 h-16 mx-auto animate-pulse" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
            Emergency Response System
          </h1>
          <p className="text-gray-300">
            {location ? (
              <>
                {locationName ? `${locationName.city}, ${locationName.state}, ${locationName.country}` : 'Fetching location...'}
                <br />
                Coordinates: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </>
            ) : "Fetching location..."}
          </p>
        </div>

        {/* Emergency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {/* SOS Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="col-span-full bg-gradient-to-br from-red-600 to-amber-600 p-8 rounded-2xl flex flex-col items-center shadow-xl hover:shadow-red-500/30 transition-all"
            onClick={triggerEmergencyProtocol}
          >
            <FaBell className="w-16 h-16 mb-4 animate-bounce" />
            <span className="text-2xl font-bold">EMERGENCY SOS</span>
            <span className="text-sm opacity-75">Tap to alert authorities & share location</span>
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
    <button
      onClick={() => setSelectedServiceType("police")}
      className={`w-full flex justify-between items-center p-3 rounded-lg transition ${
        selectedServiceType === "police"
          ? "bg-red-500/30"
          : "bg-red-500/20 hover:bg-red-500/30"
      }`}
    >
      <span>Police</span>
      <FaPhoneAlt />
    </button>
    <button
      onClick={() => setSelectedServiceType("fire")}
      className={`w-full flex justify-between items-center p-3 rounded-lg transition ${
        selectedServiceType === "fire"
          ? "bg-blue-500/30"
          : "bg-blue-500/20 hover:bg-blue-500/30"
      }`}
    >
      <span>Fire Department</span>
      <FaFire />
    </button>
    <button
      onClick={() => setSelectedServiceType("hospital")}
      className={`w-full flex justify-between items-center p-3 rounded-lg transition ${
        selectedServiceType === "hospital"
          ? "bg-green-500/30"
          : "bg-green-500/20 hover:bg-green-500/30"
      }`}
    >
      <span>Medical Emergency</span>
      <FaFirstAid />
    </button>
  </div>

  <div className="mt-4 space-y-3">
    {emergencyServices[selectedServiceType].slice(0, 3).map((station, index) => (
      <div key={index} className="w-full flex flex-col p-3 bg-white/5 rounded-lg">
        <div className="font-medium">{station.name}</div>
        <div className="text-sm text-gray-300">{station.address}</div>
        <div className="text-sm mt-1 flex items-center gap-2">
          <FaPhoneAlt />
          <a href={`tel:${station.phone}`} className="hover:text-cyan-400">
            {station.phone}
          </a>
        </div>

        {/* Map Preview */}
        {station.location && (
          <iframe
            className="w-full h-48 rounded-lg border border-white/10 mt-2"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${station.location.lng - 0.01},${station.location.lat - 0.01},${station.location.lng + 0.01},${station.location.lat + 0.01}&layer=mapnik&marker=${station.location.lat},${station.location.lng}`}
            loading="lazy"
          ></iframe>
        )}

        <button
          className="text-xs mt-2 flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
          onClick={() =>
            window.open(
              `https://www.openstreetmap.org/?mlat=${station.location.lat}&mlon=${station.location.lng}#map=18/${station.location.lat}/${station.location.lng}`,
              "_blank"
            )
          }
        >
          <FaMapMarkerAlt />
          View on Map
        </button>
      </div>
    ))}
    {emergencyServices[selectedServiceType].length === 0 && (
      <div className="text-gray-400 text-center py-4">
        No {selectedServiceType} stations found nearby. Call {tollFreeNumbers[selectedServiceType]}
      </div>
    )}
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

    {/* Map Preview */}
    {location && (
      <iframe
        className="w-full h-48 rounded-lg border border-white/10"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.01},${location.lat - 0.01},${location.lng + 0.01},${location.lat + 0.01}&layer=mapnik&marker=${location.lat},${location.lng}`}
        loading="lazy"
      ></iframe>
    )}

    <div className="grid grid-cols-2 gap-3">
      <button
        className="p-2 bg-cyan-500/20 rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-500/30"
        onClick={() => navigator.clipboard.writeText(`${location.lat}, ${location.lng}`)}
      >
        <MdMyLocation />
        Copy
      </button>
      <button
        className="p-2 bg-cyan-500/20 rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-500/30"
        onClick={() => window.open(`https://www.openstreetmap.org/?mlat=${location?.lat}&mlon=${location?.lng}#map=18/${location?.lat}/${location?.lng}`, "_blank")}
      >
        <FaMapMarkerAlt />
        Open Map
      </button>
    </div>
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
              <button
                className="w-full flex justify-between items-center p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30"
                onClick={() => setFirstAidExpanded(!isFirstAidExpanded)}
              >
                <span>Emergency Procedures</span>
                <motion.span animate={{ rotate: isFirstAidExpanded ? 180 : 0 }}>▼</motion.span>
              </button>
              {isFirstAidExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-sm text-gray-300 space-y-4"
                >
                  {emergencyProcedures.map((proc, index) => (
                    <div key={index} className="space-y-2">
                      <p className="font-medium">{proc.title}</p>
                      <div className="flex gap-4">
                        <a
                          href={proc.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 text-sm"
                        >
                          Watch Video
                        </a>
                        <a
                          href={proc.docUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 text-sm"
                        >
                          Official Document
                        </a>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
  </div>
</motion.div>


          {/* First Aid Guide */}
          {/* <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaFirstAid className="text-green-400" />
              First Aid Guide
            </h2>
            <div className="space-y-3">
              <button
                className="w-full flex justify-between items-center p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30"
                onClick={() => setFirstAidExpanded(!isFirstAidExpanded)}
              >
                <span>Emergency Procedures</span>
                <motion.span animate={{ rotate: isFirstAidExpanded ? 180 : 0 }}>▼</motion.span>
              </button>
              {isFirstAidExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-sm text-gray-300 space-y-4"
                >
                  {emergencyProcedures.map((proc, index) => (
                    <div key={index} className="space-y-2">
                      <p className="font-medium">{proc.title}</p>
                      <div className="flex gap-4">
                        <a
                          href={proc.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 text-sm"
                        >
                          Watch Video
                        </a>
                        <a
                          href={proc.docUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 text-sm"
                        >
                          Official Document
                        </a>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div> */}
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
                <div className={`w-2 h-2 rounded-full ${alert.type === 'earthquake' ? 'bg-amber-400' : 'bg-red-400'}`}></div>
                <div>
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm text-gray-400">{alert.time}</p>
                  {alert.url && (
                    <a
                      href={alert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 text-sm hover:text-cyan-300"
                    >
                      More info
                    </a>
                  )}
                </div>
              </div>
            ))}
            {alerts.length === 0 && (
              <div className="text-gray-400 text-center py-4">No active alerts in your area</div>
            )}
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