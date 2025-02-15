import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import EarthQuake from "../assets/EarthQuake.png";
import Floods from "../assets/Floods.png";
import Drought from "../assets/drought.png";
import Volcano from "../assets/volcano.png";
import {
  FaInfoCircle,
  FaMapPin,
  FaGlobeAmericas,
  FaShieldAlt,
  FaChevronDown,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Custom map marker icons
const disasterIcons = {
  earthquake: new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
  }),
  flood: new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    iconSize: [25, 41],
  }),
  drought: new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    iconSize: [25, 41],
  }),
  volcano: new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
  }),
};

// Sample real-time data (replace with API data)
const liveDisasterData = [
  { type: "earthquake", lat: 35.6762, lng: 139.6503, magnitude: 6.5 },
  { type: "flood", lat: 23.6850, lng: 90.3563, severity: "High" },
  { type: "volcano", lat: 14.0583, lng: 120.8937, status: "Active" },
  { type: "drought", lat: 33.8688, lng: 151.2093, intensity: "Severe" },
];

const data = [
  {
    name: "earthquakes",
    image: EarthQuake,
    content: {
      location: [
        "Pacific Ring of Fire (Japan, Indonesia, Chile)",
        "Himalayan Region (Nepal, India, Bhutan)",
        "San Andreas Fault (United States)",
        "Hellenic Arc (Greece)",
        "East African Rift (Ethiopia, Kenya, Tanzania)",
      ],
      pm: [
        "Seismic Building Codes and Regulations",
        "Early Warning Systems",
        "Retrofitting of Infrastructure",
        "Land Use Planning and Zoning",
        "Emergency Preparedness and Evacuation Plans",
        "Public Education and Awareness",
        "Geological Surveys and Monitoring",
        "International Cooperation",
        "Disaster Response and Recovery Planning",
        "Community Resilience Programs",
      ],
    },
  },
  {
    name: "floods",
    image: Floods,
    content: {
      location: [
        "Ganges-Brahmaputra Delta (Bangladesh, India)",
        "Yangtze River Basin (China)",
        "Nile River Basin (Egypt, Sudan)",
        "Mississippi River Basin (United States)",
        "Amazon River Basin (Brazil, Peru)",
        "Preventive Measures",
      ],
      pm: [
        "Floodplain Zoning and Land Use Planning",
        "Early Warning Systems",
        "Construction of Flood Barriers and Levees",
        "Sustainable Watershed Management",
        "Emergency Preparedness and Evacuation Plans",
        "Public Education and Awareness",
        "River Channel Maintenance and Restoration",
        "International Cooperation",
        "Floodplain Mapping and Risk Assessment",
        "Community Flood Resilience Programs",
      ],
    },
  },
  {
    name: "drought",
    image: Drought,
    content: {
      location: [
        "Sub-Saharan Africa (East Africa, Somalia)",
        "Southwestern United States (California, Arizona, and Nevada)",
        "Australia",
        "Middle East (Iran, Iraq and Saudi Arabia)",
        "Central Asia (Uzbekistan, Turkmenistan and Kazakhstan",
      ],
      pm: [
        "Water Conservation and Efficiency",
        "Diversification of Water Sources",
        "Drought-resistant Crops and Agricultural Practices",
        "Early Warning Systems",
        "Water Use Planning and Regulation",
        "Forest and Ecosystem Management",
        "Community Engagement and Education",
        "Infrastructure Resilience",
        "Government Policies and Planning",
        "International Cooperation",
      ],
    },
  },
  {
    name: "volcano",
    image: Volcano,
    content: {
      location: [
        "Pacific Ring of Fire (Indonesia, Philippines, Japan, Chile)",
        "Yellowstone National Park (United States)",
        "Mount Vesuvius (Italy)",
        "Popocatepetl (Mexico)",
        "Mount St. Helens (United States)",
        "Preventive Measures",
      ],
      pm: [
        "Hazard Mapping and Zoning",
        "Early Warning Systems",
        "Emergency Preparedness and Evacuation Plans",
        "Infrastructure Resilience",
        "Community Education and Awareness",
        "Land Use Planning and Regulation",
        "Monitoring and Research",
        "International Cooperation",
        "Sustainable Development Practices",
        "Geological Surveys and Risk Assessments ",
      ],
    },
  },
];

const DisasterPage = () => {
  const [activeTab, setActiveTab] = useState("locations");
  const [expandedDisaster, setExpandedDisaster] = useState(null);

  const toggleExpand = (name) => {
    setExpandedDisaster(expandedDisaster === name ? null : name);
  };

  return (
    <div className="mt-24 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="text-center py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4"
        >
          Global Disaster Intelligence
        </motion.h1>
        <p className="text-xl">Real-time disaster monitoring & prevention strategies</p>
      </div>
      {/* Live Map Section */}
      <div className="mx-8 my-12 rounded-xl overflow-hidden shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          <FaGlobeAmericas className="inline mr-2" />
          Live Disaster Tracker
        </h2>
        <div className="h-96 w-full relative z-0">
        <MapContainer center={[20, 0]} zoom={2} className="h-full w-full z-0">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="">OpenStreetMap</a> contributors'
            />
            
            {liveDisasterData.map((event, index) => (
              <Marker
                key={index}
                position={[event.lat, event.lng]}
                icon={disasterIcons[event.type]}
              >
                <Popup>
                  <div className="font-bold capitalize">{event.type}</div>
                  {Object.entries(event).map(([key, value]) => (
                    key !== 'type' && <div key={key}>{key}: {value}</div>
                  ))}
                  <a
                    href={`https://www.google.com/maps?q=${event.lat},${event.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    Open in Maps <FaExternalLinkAlt className="inline" />
                  </a>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Disasters Section */}
      <div className="mx-8 my-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Disaster Preparedness Hub
        </h2>
        
        {data.map((elem, index) => (
          <motion.div 
            key={elem.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-1/2 relative group overflow-hidden">
                <img
                  src={elem.image}
                  alt={elem.name}
                  className="w-full h-96 object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-6 left-6 text-4xl font-bold text-white capitalize">
                  {elem.name}
                </h3>
              </div>

              {/* Content Section */}
              <div className="lg:w-1/2 p-8">
                <div className="flex gap-4 mb-6 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('locations')}
                    className={`pb-2 px-4 ${
                      activeTab === 'locations'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500'
                    }`}
                  >
                    <FaMapPin className="inline mr-2" />
                    Vulnerable Areas
                  </button>
                  <button
                    onClick={() => setActiveTab('measures')}
                    className={`pb-2 px-4 ${
                      activeTab === 'measures'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500'
                    }`}
                  >
                    <FaShieldAlt className="inline mr-2" />
                    Preventive Measures
                  </button>
                </div>

                <div className="h-96 overflow-y-auto pr-4">
                  {activeTab === 'locations' ? (
                    elem.content.location.map((loc, idx) => (
                      <div key={idx} className="flex items-center p-3 hover:bg-blue-50 rounded-lg">
                        <FaMapPin className="mr-3 text-red-500 flex-shrink-0" />
                        <span>{loc}</span>
                      </div>
                    ))
                  ) : (
                    elem.content.pm.map((measure, idx) => (
                      <div key={idx} className="flex items-center p-3 hover:bg-blue-50 rounded-lg">
                        <FaInfoCircle className="mr-3 text-blue-500 flex-shrink-0" />
                        <span>{measure}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Additional Resources */}
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <button
                    onClick={() => toggleExpand(elem.name)}
                    className="flex items-center justify-between w-full text-blue-600 hover:text-blue-800"
                  >
                    <span>Additional Resources & Live Data</span>
                    <FaChevronDown className={`transform transition-transform ${
                      expandedDisaster === elem.name ? 'rotate-180' : ''
                    }`} />
                  </button>
                  <AnimatePresence>
                    {expandedDisaster === elem.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-2"
                      >
                        <a href={`https://reliefweb.int/${elem.name}`} target="_blank" rel="noopener noreferrer" className="block hover:underline">
                          Latest {elem.name} reports <FaExternalLinkAlt className="inline" />
                        </a>
                        <a href={`https://www.preventionweb.net/${elem.name}`} target="_blank" rel="noopener noreferrer" className="block hover:underline">
                          Prevention strategies <FaExternalLinkAlt className="inline" />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="mx-8 text-center">
          <p className="mb-4">Real-time data sources:</p>
          <div className="flex justify-center gap-6">
            <a href="https://gdacs.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              GDACS
            </a>
            <a href="https://earthquake.usgs.gov" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              USGS
            </a>
            <a href="https://www.reliefweb.int" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              ReliefWeb
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DisasterPage;

// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { Icon } from "leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import EarthQuake from "../assets/EarthQuake.png";
// import Floods from "../assets/Floods.png";
// import Drought from "../assets/drought.png";
// import Volcano from "../assets/volcano.png";
// import {
//   FaInfoCircle,
//   FaMapPin,
//   FaGlobeAmericas,
//   FaShieldAlt,
//   FaChevronDown,
//   FaExternalLinkAlt,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { useQuery } from "@tanstack/react-query";
// import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
// import marker from 'leaflet/dist/images/marker-icon.png';
// import shadow from 'leaflet/dist/images/marker-shadow.png';


// // Fix leaflet marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: marker2x,
//   iconUrl: marker,
//   shadowUrl: shadow,
// });

// // GDACS API configuration
// const GDACS_API_URL = "https://www.gdacs.org/gdacsapi/api/alerts/getalertlist";
// const DISASTER_TYPES = {
//   EQ: "earthquake",
//   FL: "flood",
//   TC: "storm",
//   DR: "drought",
//   VO: "volcano"
// };

// // Custom map marker icons
// const disasterIcons = {
//   earthquake: new Icon({
//     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41]
//   }),
//   flood: new Icon({
//     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41]
//   }),
//   drought: new Icon({
//     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41]
//   }),
//   volcano: new Icon({
//     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41]
//   }),
//   storm: new Icon({
//     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41]
//   })
// };

// // Fetch real-time disaster data from GDACS API
// const fetchDisasters = async () => {
//   const response = await axios.get(GDACS_API_URL, {
//     params: {
//       alertlist: "EQ,FL,VO,DR",
//       timeframe: "24"
//     }
//   });
//   return response.data.features.map(feature => ({
//     type: DISASTER_TYPES[feature.properties.hazardType] || 'storm',
//     lat: feature.geometry.coordinates[1],
//     lng: feature.geometry.coordinates[0],
//     title: feature.properties.title,
//     severity: feature.properties.severity,
//     alertLevel: feature.properties.alertlevel,
//     duration: feature.properties.duration,
//     url: feature.properties.url
//   }));
// };

// // Rest of your existing data array remains the same
// const data = [
//     {
//       name: "earthquakes",
//       image: EarthQuake,
//       content: {
//         location: [
//           "Pacific Ring of Fire (Japan, Indonesia, Chile)",
//           "Himalayan Region (Nepal, India, Bhutan)",
//           "San Andreas Fault (United States)",
//           "Hellenic Arc (Greece)",
//           "East African Rift (Ethiopia, Kenya, Tanzania)",
//         ],
//         pm: [
//           "Seismic Building Codes and Regulations",
//           "Early Warning Systems",
//           "Retrofitting of Infrastructure",
//           "Land Use Planning and Zoning",
//           "Emergency Preparedness and Evacuation Plans",
//           "Public Education and Awareness",
//           "Geological Surveys and Monitoring",
//           "International Cooperation",
//           "Disaster Response and Recovery Planning",
//           "Community Resilience Programs",
//         ],
//       },
//     },
//     {
//       name: "floods",
//       image: Floods,
//       content: {
//         location: [
//           "Ganges-Brahmaputra Delta (Bangladesh, India)",
//           "Yangtze River Basin (China)",
//           "Nile River Basin (Egypt, Sudan)",
//           "Mississippi River Basin (United States)",
//           "Amazon River Basin (Brazil, Peru)",
//           "Preventive Measures",
//         ],
//         pm: [
//           "Floodplain Zoning and Land Use Planning",
//           "Early Warning Systems",
//           "Construction of Flood Barriers and Levees",
//           "Sustainable Watershed Management",
//           "Emergency Preparedness and Evacuation Plans",
//           "Public Education and Awareness",
//           "River Channel Maintenance and Restoration",
//           "International Cooperation",
//           "Floodplain Mapping and Risk Assessment",
//           "Community Flood Resilience Programs",
//         ],
//       },
//     },
//     {
//       name: "drought",
//       image: Drought,
//       content: {
//         location: [
//           "Sub-Saharan Africa (East Africa, Somalia)",
//           "Southwestern United States (California, Arizona, and Nevada)",
//           "Australia",
//           "Middle East (Iran, Iraq and Saudi Arabia)",
//           "Central Asia (Uzbekistan, Turkmenistan and Kazakhstan",
//         ],
//         pm: [
//           "Water Conservation and Efficiency",
//           "Diversification of Water Sources",
//           "Drought-resistant Crops and Agricultural Practices",
//           "Early Warning Systems",
//           "Water Use Planning and Regulation",
//           "Forest and Ecosystem Management",
//           "Community Engagement and Education",
//           "Infrastructure Resilience",
//           "Government Policies and Planning",
//           "International Cooperation",
//         ],
//       },
//     },
//     {
//       name: "volcano",
//       image: Volcano,
//       content: {
//         location: [
//           "Pacific Ring of Fire (Indonesia, Philippines, Japan, Chile)",
//           "Yellowstone National Park (United States)",
//           "Mount Vesuvius (Italy)",
//           "Popocatepetl (Mexico)",
//           "Mount St. Helens (United States)",
//           "Preventive Measures",
//         ],
//         pm: [
//           "Hazard Mapping and Zoning",
//           "Early Warning Systems",
//           "Emergency Preparedness and Evacuation Plans",
//           "Infrastructure Resilience",
//           "Community Education and Awareness",
//           "Land Use Planning and Regulation",
//           "Monitoring and Research",
//           "International Cooperation",
//           "Sustainable Development Practices",
//           "Geological Surveys and Risk Assessments ",
//         ],
//       },
//     },
//   ];

// const DisasterPage = () => {
//   const [activeTab, setActiveTab] = useState("locations");
//   const [expandedDisaster, setExpandedDisaster] = useState(null);
  
//  const { data: liveDisasterData, isLoading, error } = useQuery({
//   queryKey: ['disasters'],
//   queryFn: fetchDisasters,
//   refetchInterval: 300000, // Refresh every 5 minutes
//   staleTime: 300000
// });


//   const toggleExpand = (name) => {
//     setExpandedDisaster(expandedDisaster === name ? null : name);
//   };

//   return (
//     <div className="mt-24 min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       {/* Hero Section */}
//       <div className="text-center py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
//         <motion.h1 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-5xl font-bold mb-4"
//         >
//           Global Disaster Intelligence
//         </motion.h1>
//         <p className="text-xl">Real-time disaster monitoring & prevention strategies</p>
//       </div>

//       {/* Live Map Section */}
//       <div className="mx-8 my-12 rounded-xl overflow-hidden shadow-2xl">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">
//           <FaGlobeAmericas className="inline mr-2" />
//           Live Disaster Tracker
//         </h2>
//         <div className="h-96 w-full relative z-0">
//           {isLoading ? (
//             <div className="flex items-center justify-center h-full">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : error ? (
//             <div className="flex items-center justify-center h-full text-red-500">
//               Error loading disaster data
//             </div>
//           ) : (
//             <MapContainer center={[20, 0]} zoom={2} className="h-full w-full z-0">
//               <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               />
              
//               {liveDisasterData?.map((event, index) => (
//                 <Marker
//                   key={index}
//                   position={[event.lat, event.lng]}
//                   icon={disasterIcons[event.type]}
//                 >
//                   <Popup className="gdacs-popup">
//                     <div className="font-bold capitalize text-lg mb-2">{event.title}</div>
//                     <div className="space-y-1">
//                       <p><strong>Type:</strong> {event.type}</p>
//                       <p><strong>Severity:</strong> {event.severity}</p>
//                       <p><strong>Alert Level:</strong> {event.alertLevel}</p>
//                       {event.duration && <p><strong>Duration:</strong> {event.duration}</p>}
//                     </div>
//                     <a
//                       href={event.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="mt-2 inline-block text-blue-600 hover:underline"
//                     >
//                       More details <FaExternalLinkAlt className="inline" />
//                     </a>
//                   </Popup>
//                 </Marker>
//               ))}
//             </MapContainer>
//           )}
//         </div>
//       </div>

//       {/* Rest of your existing component remains the same */}
      
//       {/* Disasters Section */}
//       <div className="mx-8 my-12">
//         <h2 className="text-3xl font-bold mb-8 text-gray-800">
//           Disaster Preparedness Hub
//         </h2>
        
//         {data.map((elem, index) => (
//           <motion.div 
//             key={elem.name}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-12 bg-white rounded-2xl shadow-xl overflow-hidden"
//           >
//             <div className="flex flex-col lg:flex-row">
//               {/* Image Section */}
//               <div className="lg:w-1/2 relative group overflow-hidden">
//                 <img
//                   src={elem.image}
//                   alt={elem.name}
//                   className="w-full h-96 object-cover transform transition-transform duration-500 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                 <h3 className="absolute bottom-6 left-6 text-4xl font-bold text-white capitalize">
//                   {elem.name}
//                 </h3>
//               </div>

//               {/* Content Section */}
//               <div className="lg:w-1/2 p-8">
//                 <div className="flex gap-4 mb-6 border-b border-gray-200">
//                   <button
//                     onClick={() => setActiveTab('locations')}
//                     className={`pb-2 px-4 ${
//                       activeTab === 'locations'
//                         ? 'border-b-2 border-blue-600 text-blue-600'
//                         : 'text-gray-500'
//                     }`}
//                   >
//                     <FaMapPin className="inline mr-2" />
//                     Vulnerable Areas
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('measures')}
//                     className={`pb-2 px-4 ${
//                       activeTab === 'measures'
//                         ? 'border-b-2 border-blue-600 text-blue-600'
//                         : 'text-gray-500'
//                     }`}
//                   >
//                     <FaShieldAlt className="inline mr-2" />
//                     Preventive Measures
//                   </button>
//                 </div>

//                 <div className="h-96 overflow-y-auto pr-4">
//                   {activeTab === 'locations' ? (
//                     elem.content.location.map((loc, idx) => (
//                       <div key={idx} className="flex items-center p-3 hover:bg-blue-50 rounded-lg">
//                         <FaMapPin className="mr-3 text-red-500 flex-shrink-0" />
//                         <span>{loc}</span>
//                       </div>
//                     ))
//                   ) : (
//                     elem.content.pm.map((measure, idx) => (
//                       <div key={idx} className="flex items-center p-3 hover:bg-blue-50 rounded-lg">
//                         <FaInfoCircle className="mr-3 text-blue-500 flex-shrink-0" />
//                         <span>{measure}</span>
//                       </div>
//                     ))
//                   )}
//                 </div>

//                 {/* Additional Resources */}
//                 <div className="mt-6 border-t border-gray-200 pt-4">
//                   <button
//                     onClick={() => toggleExpand(elem.name)}
//                     className="flex items-center justify-between w-full text-blue-600 hover:text-blue-800"
//                   >
//                     <span>Additional Resources & Live Data</span>
//                     <FaChevronDown className={`transform transition-transform ${
//                       expandedDisaster === elem.name ? 'rotate-180' : ''
//                     }`} />
//                   </button>
//                   <AnimatePresence>
//                     {expandedDisaster === elem.name && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: 'auto' }}
//                         exit={{ opacity: 0, height: 0 }}
//                         className="mt-4 space-y-2"
//                       >
//                         <a href={`https://reliefweb.int/${elem.name}`} target="_blank" rel="noopener noreferrer" className="block hover:underline">
//                           Latest {elem.name} reports <FaExternalLinkAlt className="inline" />
//                         </a>
//                         <a href={`https://www.preventionweb.net/${elem.name}`} target="_blank" rel="noopener noreferrer" className="block hover:underline">
//                           Prevention strategies <FaExternalLinkAlt className="inline" />
//                         </a>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-8 mt-16">
//         <div className="mx-8 text-center">
//           <p className="mb-4">Real-time data sources:</p>
//           <div className="flex justify-center gap-6">
//             <a href="https://gdacs.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
//               GDACS
//             </a>
//             <a href="https://earthquake.usgs.gov" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
//               USGS
//             </a>
//             <a href="https://www.reliefweb.int" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
//               ReliefWeb
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default DisasterPage;