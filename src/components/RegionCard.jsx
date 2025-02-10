import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { FaExclamationTriangle, FaMapPin } from "react-icons/fa";

const RegionCard = ({ title, data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Emergency Counts",
        backgroundColor: "rgba(30,67,86,0.6)",
        borderColor: "rgba(30,67,86,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(30,67,86,0.1)",
        hoverBorderColor: "rgba(30,67,86,1)",
        data: Object.values(data),
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="region-card flex items-center justify-berween w-full gap-4">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <FaMapPin /> {title}
        </h3>
        <ul className="list-disc pl-4 border border-gray-50 p-4 rounded-lg bg-white">
          {Object.entries(data).map(([threat, percentage]) => (
            <li key={threat} className="flex items-center mb-2">
              <FaExclamationTriangle className="text-red-500 mr-2" />
              <span className="font-bold">{threat} </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="chart-container flex-1 h-[100%] mt-8">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default RegionCard;
