import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Search from "../assets/search.png";
import clouds from "../assets/clouds.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import mist from "../assets/mist.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import clear from "../assets/clear.png";
import aqiIcon from "../assets/aqi.png";
import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";
import { TbTemperature } from "react-icons/tb";

const Weather = () => {
  const [search, setSearch] = useState("Mumbai");
  const [res, setRes] = useState(null);
  const [src, setSrc] = useState(clear);
  const [pollution, setPollution] = useState(null);
  const [mapUrl, setMapUrl] = useState("");

  const getAQIText = (aqi) => {
    switch(aqi) {
      case 1: return 'Good';
      case 2: return 'Fair';
      case 3: return 'Moderate';
      case 4: return 'Poor';
      case 5: return 'Very Poor';
      default: return 'N/A';
    }
  };

  async function checkWeather(city) {
    try {
      // Geocoding API Call
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=37c7fd46488e0a04a9a39ae49f638db4`
      );
      const geoData = await geoResponse.json();
      
      if (!geoResponse.ok || geoData.length === 0) {
        throw new Error("City not found");
      }

      const { lat, lon } = geoData[0];
      setMapUrl(`https://www.google.com/maps?q=${lat},${lon}`);

      // Weather API Call
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=37c7fd46488e0a04a9a39ae49f638db4&lat=${lat}&lon=${lon}`
      );
      const weatherData = await weatherResponse.json();

      // Air Pollution API Call
      const pollutionResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=37c7fd46488e0a04a9a39ae49f638db4`
      );
      const pollutionData = await pollutionResponse.json();

      switch (weatherData.weather[0].main) {
        case "Clouds":
        case "Smoke":
          setSrc(clouds);
          break;
        case "Clear":
          setSrc(clear);
          break;
        case "Rain":
          setSrc(rain);
          break;
        case "Drizzle":
          setSrc(drizzle);
          break;
        case "Mist":
          setSrc(mist);
          break;
        case "Snow":
          setSrc(snow);
          break;
        default:
          setSrc(clear);
      }

      setRes(weatherData);
      setPollution(pollutionData);
    } catch (error) {
      alert("Please enter a valid city name");
      setRes(null);
      setPollution(null);
    }
  }

  useEffect(() => {
    checkWeather("Mumbai");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-[450px] mx-auto bg-gradient-to-br from-blue-500 to-blue-900 text-white rounded-lg p-6 text-center shadow-lg mt-20"
    >
      <h1 className="text-3xl font-bold text-gray-100 mb-4">Weather App</h1>
      <div className="flex items-center justify-between bg-white p-2 rounded-full shadow-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter city name"
          className="flex-1 px-4 py-2 text-white-700 outline-none rounded-full"
        />
        <button
          onClick={() => checkWeather(search)}
          className="bg-blue-500 p-2 rounded-full hover:bg-blue-700 transition"
        >
          <img src={Search} alt="Search" className="w-5 h-5" />
        </button>
      </div>

      {res && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <img src={src} alt="Weather icon" className="w-32 mx-auto" />
          <h2 className="text-5xl font-bold mt-2">{res.main.temp}°C</h2>
          <p className="text-xl mt-1">{res.name}</p>
          {mapUrl && (
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm text-blue-200 hover:text-blue-100"
            >
              View on Map →
            </a>
          )}

          <div className="flex justify-around mt-6 text-sm">
            <div className="flex flex-col items-center">
              <img src={humidity} alt="Humidity" className="w-8 mb-1" />
              <p>{res.main.humidity}%</p>
              <span className="text-gray-300">Humidity</span>
            </div>
            <div className="flex flex-col items-center">
              <img src={wind} alt="Wind" className="w-8 mb-1" />
              <p>{res.wind.speed} km/h</p>
              <span className="text-gray-300">Wind Speed</span>
            </div>
            <div className="flex flex-col items-center">
              <img src={aqiIcon} alt="AQI" className="w-8 mb-1" />
              <p>
                {pollution?.list[0]?.main?.aqi} -{" "}
                {getAQIText(pollution?.list[0]?.main?.aqi)}
              </p>
              <span className="text-gray-300">Air Quality</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Weather;



// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// // SIZE REDUCTION 1: Replace image imports with react-icons
// import { WiHumidity, WiStrongWind, WiDayCloudy, WiRain, WiSnow, WiDaySunny } from "react-icons/wi";
// import { TbTemperature, TbCloudRain, TbMist, TbWind } from "react-icons/tb";
// import { FiSearch } from "react-icons/fi";

// const Weather = () => {
//   const [search, setSearch] = useState("");
//   const [res, setRes] = useState(null);
//   const [weatherIcon, setWeatherIcon] = useState(<WiDaySunny />);
//   const [pollution, setPollution] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState("");

//   // SIZE REDUCTION 2: Convert to array lookup
//   const getAQIText = (aqi) => 
//     ["N/A", "Good", "Fair", "Moderate", "Poor", "Very Poor"][aqi] || "N/A";

//   useEffect(() => {
//     // SIZE REDUCTION 3: Replace with static country list if needed
//     fetch("https://restcountries.com/v3.1/all")
//       .then((res) => res.json())
//       .then(data => setCountries(data.map(c => ({
//         name: c.name.common,
//         code: c.cca2
//       })).sort((a,b) => a.name.localeCompare(b.name))));
//   }, []);

//   const checkWeather = async (city) => {
//     try {
//       const geoRes = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${city},${selectedCountry}&limit=1&appid=37c7fd46488e0a04a9a39ae49f638db4`
//       );
//       const geoData = await geoRes.json();
      
//       if (!geoRes.ok || !geoData[0]) throw new Error("City not found");
      
//       const { lat, lon } = geoData[0];
//       const [weatherRes, pollutionRes] = await Promise.all([
//         fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&appid=37c7fd46488e0a04a9a39ae49f638db4&lat=${lat}&lon=${lon}`),
//         fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=37c7fd46488e0a04a9a39ae49f638db4`)
//       ]);

//       const weatherData = await weatherRes.json();
//       const pollutionData = await pollutionRes.json();

//       // SIZE REDUCTION 4: Simplify icon handling
//       const icons = {
//         Clouds: <WiDayCloudy />,
//         Clear: <WiDaySunny />,
//         Rain: <TbCloudRain />,
//         Drizzle: <WiRain />,
//         Mist: <TbMist />,
//         Snow: <WiSnow />
//       };
//       setWeatherIcon(icons[weatherData.weather[0].main] || <WiDaySunny />);

//       setRes(weatherData);
//       setPollution(pollutionData);
//     } catch (error) {
//       alert("Invalid city name");
//       setRes(null);
//     }
//   };

//   // SIZE REDUCTION 5: Debounce search suggestions
//   useEffect(() => {
//     const timer = setTimeout(async () => {
//       if (search.length > 2 && selectedCountry) {
//         try {
//           const res = await fetch(
//             `https://api.openweathermap.org/geo/1.0/direct?q=${search},${selectedCountry}&limit=5&appid=37c7fd46488e0a04a9a39ae49f638db4`
//           );
//           const data = await res.json();
//           setSuggestions(data.map(city => city.name));
//         } catch (error) { setSuggestions([]); }
//       }
//     }, 300);
//     return () => clearTimeout(timer);
//   }, [search, selectedCountry]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="max-w-[450px] mx-auto bg-gradient-to-br from-blue-500 to-blue-900 text-white rounded-3xl p-6 mt-10"
//     >
//       <h1 className="text-4xl font-bold mb-6">Weather App</h1>

//       <select
//         value={selectedCountry}
//         onChange={(e) => setSelectedCountry(e.target.value)}
//         className="w-full p-3 rounded-2xl bg-white/20 mb-4"
//       >
//         <option value="">Select Country</option>
//         {countries.map((c) => (
//           <option key={c.code} value={c.code}>{c.name}</option>
//         ))}
//       </select>

//       <div className="relative mb-8">
//         <div className="flex items-center bg-white/20 p-2 rounded-2xl">
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder={selectedCountry ? "Enter city" : "Select country first"}
//             className="flex-1 bg-transparent p-2"
//             disabled={!selectedCountry}
//           />
//           <button 
//             onClick={() => checkWeather(search)}
//             className="p-2 hover:bg-white/20 rounded-xl"
//           >
//             <FiSearch size={24} />
//           </button>
//         </div>

//         {suggestions.length > 0 && (
//           <motion.ul className="absolute bg-white/90 text-black w-full rounded-xl mt-2">
//             {suggestions.map((s) => (
//               <li
//                 key={s}
//                 onClick={() => checkWeather(s)}
//                 className="p-2 hover:bg-blue-100 cursor-pointer"
//               >
//                 {s}
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </div>

//       {res && (
//         <motion.div className="space-y-6">
//           <div className="bg-white/10 p-6 rounded-3xl">
//             <div className="text-8xl mb-4">{weatherIcon}</div>
//             <h2 className="text-6xl font-bold">{Math.round(res.main.temp)}°C</h2>
//             <p className="text-2xl mt-2">{res.name}</p>
//             <p className="capitalize">{res.weather[0].description}</p>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             {/* SIZE REDUCTION 6: Create reusable WeatherCard component */}
//             <div className="bg-white/10 p-4 rounded-2xl">
//               <div className="flex items-center gap-2 mb-2">
//                 <WiHumidity size={24} />
//                 <span>Humidity</span>
//               </div>
//               <p className="text-2xl font-bold">{res.main.humidity}%</p>
//             </div>

//             <div className="bg-white/10 p-4 rounded-2xl">
//               <div className="flex items-center gap-2 mb-2">
//                 <TbWind size={24} />
//                 <span>Wind</span>
//               </div>
//               <p className="text-2xl font-bold">{res.wind.speed} km/h</p>
//             </div>

//             <div className="bg-white/10 p-4 rounded-2xl">
//               <div className="flex items-center gap-2 mb-2">
//                 <WiDayCloudy size={24} />
//                 <span>Air Quality</span>
//               </div>
//               <p className="text-2xl font-bold">
//                 {getAQIText(pollution?.list[0]?.main?.aqi)}
//               </p>
//             </div>

//             <div className="bg-white/10 p-4 rounded-2xl">
//               <div className="flex items-center gap-2 mb-2">
//                 <TbTemperature size={24} />
//                 <span>Feels Like</span>
//               </div>
//               <p className="text-2xl font-bold">{res.main.feels_like}°C</p>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default Weather;