import React, { useEffect, useRef } from "react";
import Tweets from "./Tweets";
import { FaExclamationTriangle, FaMapPin } from "react-icons/fa";
import rajasthan from "./Top_disaster_tweets_rajasthan.json";
import maha from "./Top_disaster_tweets_maha.json";
import assam from "./Top_disaster_tweets_assam.json";
import delhi from "./Top_disaster_tweets_delhi.json";
import karnataka from "./Top_disaster_tweets_karnataka.json";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import RegionCard from "./RegionCard";

const Service = () => {
  const data = {
    labels: ["Fire", "Tsunami", "EOC", "Water Logging", "Airport Emergency"],
    datasets: [
      {
        label: "Emergency Counts",
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.8)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: [72, 52, 45, 35, 29],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#4a5568"
        }
      },
      x: {
        ticks: {
          color: "#4a5568"
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: "#4a5568"
        }
      }
    }
  };

  return (
    <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Left Column */}
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-2xl shadow-xl text-white">
          <h2 className="text-4xl font-bold mb-2">Potential Risk Updates</h2>
          <p className="text-xl opacity-90">Stay informed about potential risks in real-time</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Live Emergency Distribution</h2>
          <Bar data={data} options={options} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Top Regional Threats</h2>
          <div className="space-y-4 h-[400px] overflow-y-auto pr-2">
            <RegionCard title="Delhi" data={delhi} color="from-red-500 to-orange-500" />
            <RegionCard title="Assam" data={assam} color="from-green-500 to-teal-500" />
            <RegionCard title="Maharashtra" data={maha} color="from-blue-500 to-purple-500" />
            <RegionCard title="Rajasthan" data={rajasthan} color="from-yellow-500 to-amber-500" />
            <RegionCard title="Karnataka" data={karnataka} color="from-pink-500 to-rose-500" />
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <Tweets />
      </div>
    </div>
  );
};

export default Service;