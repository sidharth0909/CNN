import React from "react";
import DisasterCard from "./DisasterCard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";

const Plans = () => {
  const disasterData = [
    {
      title: "Urban Floods",
      image: "https://www.preventionweb.net/sites/default/files/styles/landscape_16_9/public/2022-06/Image-Bangladesh-flood.jpg?h=2cf907fb&itok=zZ8txhqm",
      redirect: "/floods-ready",
    },
    {
      title: "Landslides",
      image: "https://cdn.cnn.com/cnnnext/dam/assets/210811223107-03-india-landslide-himchal-pradesh-intl-hnk-full-169.jpg",
      redirect: "/landslides-ready",
    },
    {
      title: "Drought",
      image: "https://images.newscast-pratyaksha.com/english/wp-content/uploads/2016/05/India-Drought-Loss_PTI5_11_2016_000047B.jpg",
      redirect: "/drought-ready",
    },
    {
      title: "Floods",
      image: "https://assets.telegraphindia.com/telegraph/2020/Sep/1598988182_2020_8img30_aug_2020_pti30-08-2020_000173b.jpg",
      redirect: "/floods-ready",
    },
    {
      title: "Cyclone",
      image: "https://th.bing.com/th/id/OIP.HXg-xGWNcRZliabDGF5VdQHaFq?rs=1&pid=ImgDetMain",
      redirect: "/cyclone-ready",
    },
    {
      title: "Earthquake",
      image: "https://th.bing.com/th/id/OIP.VN8dr_orOHFYNUmEGlmtXAHaE6?rs=1&pid=ImgDetMain",
      redirect: "/earthquake-ready",
    },
    {
      title: "Wildfires",
      image: "https://th.bing.com/th/id/OIP.n83OVh-ZjVwuzKzeiNBDrgHaE7?rs=1&pid=ImgDetMain",
      redirect: "/wildfires-ready",
    },
    {
      title: "Heatwaves",
      image: "https://www.worldatlas.com/r/w1200-q80/upload/51/2a/ea/shutterstock-1064320700.jpg",
      redirect: "/heatwaves-ready",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="mx-4 md:mx-8 lg:mx-16 text-center bg-white px-4 py-8 mt-28 rounded-xl shadow-2xl">
      <Typography 
        variant="h2" 
        className="mb-8 text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        Disaster Preparedness Plans
      </Typography>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {disasterData.map((disaster, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => navigate(disaster.redirect)}
            className="cursor-pointer"
          >
            <DisasterCard
              title={disaster.title}
              image={disaster.image}
              redirect={disaster.redirect}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Plans;