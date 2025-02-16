import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 mt-1">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FiAlertTriangle className="text-3xl text-red-500" />
              <span className="text-2xl font-bold text-white">DisasterGuard</span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering communities through proactive disaster management and rapid response solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { path: "/", name: "Home" },
                { path: "/resources_requests", name: "Network" },
                { path: "/predict", name: "Predict" },
                { path: "/social_media", name: "Threats" },
                { path: "/creators", name: "Creators" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="flex items-center hover:text-blue-400 transition-all duration-300 group"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white mb-4">Emergency Contacts</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-red-400" />
                <div>
                  <p>National Disaster Response Force</p>
                  <p>6th Floor, NDCC.II Building,</p>
                  <p>Jai Singh Road, New Delhi - 110001</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-3 text-green-400" />
                <span>011-23438091</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-yellow-400" />
                <span>hq.ndrf@nic.in</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white mb-4">Stay Connected</h4>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/NDRFHQ"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-500 transition-colors"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-blue-700 transition-colors"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="https://github.com/sidharth0909/CNN"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-600 transition-colors"
              >
                <FaGithub className="text-xl" />
              </a>
            </div>
            <div className="mt-6">
              <Link
                to="/plan"
                className="inline-block w-full py-2 px-4 bg-red-600 text-white text-center rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Emergency Preparedness Guide
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 DisasterGuard. All rights reserved. |{" "}
            <a href="/privacy" className="hover:text-blue-400 ml-2">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="/terms" className="hover:text-blue-400 ml-2">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;