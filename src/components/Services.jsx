import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GiStack , GiEarthCrack, GiArchiveResearch } from "react-icons/gi";
import { AiFillAlert } from "react-icons/ai";
import { MdSocialDistance } from "react-icons/md";


const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <GiStack  className="w-12 h-12" />,
      title: "Resources Request",
      path: "/resources_requests",
      desc: "Dynamic resource allocation system for emergency management",
      color: "from-teal-500 to-cyan-500",
      delay: 0.1
    },
    {
      icon: <GiEarthCrack className="w-12 h-12" />,
      title: "Disaster Classification",
      path: "/predict",
      desc: "AI-powered disaster recognition through image analysis",
      color: "from-orange-500 to-red-500",
      delay: 0.2
    },
    {
      icon: <GiArchiveResearch className="w-12 h-12" />,
      title: "Disaster Archives",
      path: "/disaster",
      desc: "Historical data repository for strategic analysis",
      color: "from-purple-500 to-indigo-500",
      delay: 0.3
    },
    {
      icon: <MdSocialDistance className="w-12 h-12" />,
      title: "Social Media Analysis",
      path: "/social_media",
      desc: "Real-time threat detection through social patterns",
      color: "from-pink-500 to-rose-500",
      delay: 0.4
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-1/4 w-48 h-48 bg-purple-500 rounded-full mix-blend-screen blur-3xl animate-float"></div>
        <div className="absolute top-40 right-1/3 w-64 h-64 bg-cyan-500 rounded-full mix-blend-screen blur-3xl animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
        >
          Crisis Response Solutions
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: service.delay, duration: 0.4 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden shadow-xl cursor-pointer transform transition-all duration-300 hover:border-cyan-400/30"
              onClick={() => navigate(service.path)}
            >
              <div className="p-8">
                <div className={`mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                  <span className="text-white text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">{service.desc}</p>
              </div>
              
              {/* Animated hover element */}
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 animate-spin-slow"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-4 text-lg">Need emergency assistance?</p>
          <button 
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-semibold shadow-lg hover:shadow-cyan-500/20 transition-all hover:scale-105"
            onClick={() => navigate("/emergency")}
          >
            Activate Emergency Protocol
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;