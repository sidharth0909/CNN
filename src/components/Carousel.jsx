import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Carousel = () => {
  const navigate = useNavigate();
  
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    appendDots: dots => (
      <div className="custom-dots">
        <ul>{dots}</ul>
      </div>
    )
  };

  const slides = [
    {
      imgSrc: "https://assets.telegraphindia.com/telegraph/2023/Apr/1681962670_heatwave.jpg",
      title: "#HeatwaveReady",
      subtitle: "Being #Heatwave Ready means understanding HeatWave risk and taking steps now to prepare."
    },
    {
      imgSrc: "https://assets.telegraphindia.com/telegraph/376e2768-95d8-4b32-94b3-a3a1208d21c0.jpg",
      title: "#FireProof",
      subtitle: "Being #FireProof means understanding Safety Tips and taking steps now to prevent fire"
    },
    {
      imgSrc: "https://assets.telegraphindia.com/telegraph/2023/Apr/1681962670_heatwave.jpg",
      title: "Beat the Heat",
      subtitle: "Learn emergency cooling techniques and hydration strategies"
    },
    {
      imgSrc: "https://assets.telegraphindia.com/telegraph/376e2768-95d8-4b32-94b3-a3a1208d21c0.jpg",
      title: "Fire Safety Now",
      subtitle: "Essential evacuation plans and fire prevention systems"
    }
  ];

  return (
    <div>
      <Slider {...carouselSettings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[70vh] overflow-hidden rounded-xl">
            <img
              src={slide.imgSrc}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute left-10 bottom-10 max-w-2xl bg-white/50 p-4 rounded-lg backdrop-blur-sm"
            >
              <h2 className="text-3xl font-bold mb-2 text-black">{slide.title}</h2>
              <p className="text-lg mb-4 text-black">{slide.subtitle}</p>
              <button
                onClick={() => navigate("/plan")}
                className="px-6 py-2 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 border-2 border-black"
              >
                View Safety Plan
              </button>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
