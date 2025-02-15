import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaServer,
  FaBook,
  FaHandHoldingHeart,
  FaBell,
  FaExternalLinkAlt,
  FaCode,
  FaFilePdf,
  FaBrain,
  FaUniversity,
} from "react-icons/fa";
import { FiAlertTriangle, FiImage } from "react-icons/fi";

const PlaceholderImage = () => (
  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
    <FiImage className="text-gray-400 text-3xl" />
    <span className="ml-2 text-gray-500">Preview not available</span>
  </div>
);

const disasterResources = {
  research: [
    {
      title: "CNN-based Disaster Response Classification",
      description: "Deep learning approach for disaster response using convolutional neural networks",
      link: "https://arxiv.org/abs/2105.14121",
      category: "algorithm",
      free: true,
      preview: ""
    },
    {
      title: "Natural Disaster Management Using AI",
      description: "Comprehensive review of AI applications in disaster prediction and response",
      link: "https://www.nature.com/articles/s41598-021-83845-2",
      category: "researchPaper",
      free: false,
      preview: "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41598-021-83845-2/MediaObjects/41598_2021_83845_Fig1_HTML.png"
    },
    {
      title: "Satellite Image Analysis for Flood Detection",
      description: "Machine learning techniques for flood detection using satellite imagery",
      link: "https://ieeexplore.ieee.org/document/8905589",
      category: "researchPaper",
      free: true,
      preview: ""
    },
    {
      title: "Earthquake Early Warning Systems",
      description: "Advanced seismic signal processing for early earthquake detection",
      link: "https://www.science.org/doi/10.1126/science.abb1224",
      category: "researchPaper",
      free: false,
      preview: "https://www.science.org/cms/10.1126/science.abb1224/asset/abb1224-f1.jpg"
    },
    {
      title: "Social Media in Disaster Response",
      description: "Real-time social media analysis for crisis management",
      link: "https://dl.acm.org/doi/10.1145/3341161",
      category: "researchPaper",
      free: true,
      preview: ""
    },
    {
      title: "Drone-based Disaster Assessment",
      description: "Autonomous drone systems for post-disaster damage assessment",
      link: "https://www.mdpi.com/2226-4310/8/5/129",
      category: "researchPaper",
      free: true,
      preview: "https://www.mdpi.com/2226-4310/8/5/129/html"
    },
    {
      title: "Climate Change and Disaster Risk",
      description: "Long-term climate models for disaster risk reduction",
      link: "https://www.ipcc.ch/report/ar6/wg1/",
      category: "report",
      free: true,
      preview: "https://www.ipcc.ch/site/assets/uploads/sites/2/2023/03/IPCC_AR6_WGI_Logo_RGB-1.png"
    },
    {
      title: "Blockchain for Disaster Relief",
      description: "Decentralized systems for transparent aid distribution",
      link: "https://www.sciencedirect.com/science/article/pii/S0167739X20319818",
      category: "researchPaper",
      free: false,
      preview: ""
    },
    {
      title: "GIS-based Disaster Mapping",
      description: "Geographic information systems for disaster vulnerability mapping",
      link: "https://www.tandfonline.com/doi/full/10.1080/19475683.2020.1773535",
      category: "researchPaper",
      free: true,
      preview: ""
    },
    {
      title: "Humanitarian Logistics Optimization",
      description: "AI-driven supply chain optimization for disaster relief",
      link: "https://link.springer.com/article/10.1007/s10696-020-09418-1",
      category: "researchPaper",
      free: false,
      preview: "https://media.springer.com/covers/journal/10696/34/5.jpg"
    }
  ],
  systems: [
    {
      title: "GDACS API",
      description: "Global Disaster Alert and Coordination System",
      link: "https://www.gdacs.org",
      api: "https://www.gdacs.org/content/api.html",
      free: true,
      alerts: true,
      preview: "https://www.gdacs.org/Resources/Img/gdacs-logo-claim-white.png"
    },
    {
      title: "USGS Earthquake API",
      description: "Real-time earthquake data from United States Geological Survey",
      link: "https://earthquake.usgs.gov",
      api: "https://earthquake.usgs.gov/fdsnws/event/1/",
      free: true,
      alerts: true,
      preview: "https://www.usgs.gov/themes/custom/usgs_zen/logo.png"
    },
    {
      title: "NASA FIRMS",
      description: "Fire Information for Resource Management System",
      link: "https://firms.modaps.eosdis.nasa.gov",
      api: "https://firms.modaps.eosdis.nasa.gov/api/",
      free: true,
      alerts: true,
      preview: "https://firms.modaps.eosdis.nasa.gov/img/nasa_logo.png"
    },
    {
      title: "ReliefWeb API",
      description: "Humanitarian information service with global disaster reports",
      link: "https://reliefweb.int",
      api: "https://apidoc.rwlabs.org",
      free: true,
      alerts: false,
      preview: "https://reliefweb.int/sites/default/files/reliefweb_logo.png"
    },
    {
      title: "NOAA Weather Alerts",
      description: "National Oceanic and Atmospheric Administration alerts",
      link: "https://www.weather.gov",
      api: "https://www.weather.gov/documentation/services-web-api",
      free: true,
      alerts: true,
      preview: "https://www.weather.gov/images/wtf/logo.svg"
    },
    {
      title: "Global Flood Monitor",
      description: "Real-time global flood detection system",
      link: "https://flood.globalfloodmap.org",
      api: null,
      free: true,
      alerts: true,
      preview: "https://flood.globalfloodmap.org/images/logo.png"
    },
    {
      title: "Disaster Charter Activation",
      description: "International disaster response coordination system",
      link: "https://disasterscharter.org",
      api: null,
      free: true,
      alerts: true,
      preview: "https://disasterscharter.org/image/logo/en.gif"
    },
    {
      title: "Pacific Tsunami Warning Center",
      description: "Real-time tsunami detection and warning system",
      link: "https://ptwc.weather.gov",
      api: null,
      free: true,
      alerts: true,
      preview: "https://ptwc.weather.gov/images/tsunami_logo.png"
    }
  ],
  donation: [
    {
      title: "Red Cross Disaster Relief",
      description: "Emergency response and disaster relief efforts worldwide",
      link: "https://www.redcross.org",
      preview: "https://www.redcross.org/content/dam/redcross/imported-images/redcross-logo.png.img.png"
    },
    {
      title: "UNICEF Emergency Fund",
      description: "Children's emergency relief and protection",
      link: "https://www.unicef.org",
      preview: "https://www.unicef.org/sites/default/files/styles/logo/public/UNICEF_Logo_Blue_RGB_HR.png"
    },
    {
      title: "Direct Relief",
      description: "Medical resources for disaster-affected communities",
      link: "https://www.directrelief.org",
      preview: "https://www.directrelief.org/wp-content/uploads/2021/09/cropped-DR-Logo-Horizontal.png"
    },
    {
      title: "Save the Children Emergency Fund",
      description: "Child-focused disaster response and recovery",
      link: "https://www.savethechildren.org",
      preview: "https://www.savethechildren.org/content/dam/global/images/countries/united-states/logo/stc-logo.png"
    },
    {
      title: "World Food Programme",
      description: "Emergency food assistance in disaster zones",
      link: "https://www.wfp.org",
      preview: "https://cdn.wfp.org/guides/ui/v1.34.4/assets/logos/wfp.svg"
    }
  ]
};

const ResourceCard = ({ item }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
  >
    <div className="h-48 bg-gray-100 overflow-hidden">
      {item.preview ? (
        <img
          src={item.preview}
          alt={item.title}
          className="w-full h-full object-contain p-4"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.parentElement.innerHTML = <PlaceholderImage />;
          }}
        />
      ) : (
        <PlaceholderImage />
      )}
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
        {item.title}
        {item.alerts && <FiAlertTriangle className="text-red-500" />}
      </h3>
      <p className="text-gray-600 mb-4">{item.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {item.free && (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            Free Access
          </span>
        )}
        {item.api && (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
            <FaCode /> API Available
          </span>
        )}
        {item.category === "algorithm" && (
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-2">
            <FaBrain /> AI Algorithm
          </span>
        )}
        {item.category === "researchPaper" && (
          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center gap-2">
            <FaFilePdf /> Research Paper
          </span>
        )}
      </div>

      <div className="flex gap-4 mt-4">
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          Visit {item.category === "researchPaper" ? "Paper" : "Site"} <FaExternalLinkAlt />
        </a>
        {item.api && (
          <a
            href={item.api}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            API Docs <FaCode />
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

const ExploreWorldOfDisaster = () => {
  const [activeTab, setActiveTab] = useState("research");
  const tabs = ["research", "systems", "donation"];

  return (
    <div className="mt-24 min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-24 bg-gradient-to-r from-blue-700 to-purple-800 text-white"
      >
        <h1 className="text-5xl font-bold mb-6">
          Explore Disaster Management Systems
        </h1>
        <p className="text-xl opacity-90">
          Discover global disaster APIs, alert systems, research platforms, and relief organizations
        </p>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab === "research" && <FaBook />}
              {tab === "systems" && <FaServer />}
              {tab === "donation" && <FaHandHoldingHeart />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {disasterResources[activeTab].map((item, index) => (
              <ResourceCard key={index} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExploreWorldOfDisaster;