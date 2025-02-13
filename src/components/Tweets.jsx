import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Tweets = () => {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5001/api/disasters")
    .then(response => setDisasters(response.data))
    .catch(error => console.error("Error fetching disasters:", error));  
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Recent Disaster Alerts</h2>
      <div className="space-y-4">
        {disasters.map((disaster, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 border-l-4 rounded shadow-lg"
            style={{ borderColor: disaster.alertlevel === "Red" ? "red" : disaster.alertlevel === "Orange" ? "orange" : "green" }}
          >
            <h3 className="font-semibold">{disaster.title}</h3>
            <p className="text-sm text-gray-600">{disaster.description}</p>
            {disaster.image && <img src={disaster.image} alt="Disaster" className="mt-2 w-32 rounded" />}
            <a href={disaster.link} className="text-blue-600 text-sm mt-2 inline-block" target="_blank" rel="noopener noreferrer">
              View Details
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tweets;



// import { useState, useEffect } from "react";
// import { FaSearch, FaTwitter, FaRetweet, FaHeart, FaComment, FaRegClock } from "react-icons/fa";
// import "./Tweets.css";

// const Tweets = () => {
//   const [tweets, setTweets] = useState([]);
//   const [query, setQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     document.title = "Disaster Relief Tweets Search";
//     const input = document.querySelector('input[type="text"]');
//     if (input) input.focus();
//   }, []);

//   const fetchTweets = async () => {
//     if (!query.trim()) {
//       setErrorMessage("Please enter a search term");
//       return;
//     }
    
//     setIsLoading(true);
//     setErrorMessage("");
    
//     try {
//       const response = await fetch(`http://127.0.0.1:5001/api/tweets?q=${encodeURIComponent(query)}`);
//       const data = await response.json();
      
//       if (data.error) throw new Error(data.error);
//       if (data.length === 0) setErrorMessage("No relevant tweets found");
      
//       setTweets(data);
//     } catch (error) {
//       console.error("Error fetching tweets:", error);
//       setErrorMessage(error.message || "Failed to fetch tweets");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formatDate = (isoDate) => {
//     const date = new Date(isoDate);
//     return date.toLocaleDateString("en-US", {
//       hour: '2-digit',
//       minute: '2-digit',
//       day: 'numeric',
//       month: 'short'
//     });
//   };

//   return (
//     <div className="h-full flex flex-col">
//       <header className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
//         <div className="flex items-center gap-3 mb-4">
//           <FaTwitter className="text-3xl" />
//           <h1 className="text-2xl font-bold">Disaster Relief Tweet Search</h1>
//         </div>
        
//         <div className="flex gap-4 bg-black p-2 rounded-full">
//           <div className="flex-1 flex items-center pl-4">
//             <FaSearch className="text-gray-400 mr-2" />
//             <input
//               type="text"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Enter disaster-related keywords..."
//               className="w-full focus:outline-none"
//               onKeyPress={(e) => e.key === 'Enter' && fetchTweets()}
//             />
//           </div>
//           <button 
//             onClick={fetchTweets} 
//             disabled={isLoading}
//             className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
//           >
//             {isLoading ? 'Searching...' : 'Search'}
//           </button>
//         </div>
//       </header>

//       <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//         {errorMessage && <div className="text-red-600 text-center p-4">{errorMessage}</div>}

//         <div className="grid grid-cols-1 gap-4">
//           {tweets.map((tweet, index) => (
//             <div key={index} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
//               <div className="flex items-start gap-3 mb-3">
//                 <img 
//                   src={tweet.user.avatar} 
//                   alt={tweet.user.username} 
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-bold text-gray-800">{tweet.user.name}</h3>
//                   <p className="text-gray-600 text-sm">@{tweet.user.username}</p>
//                 </div>
//                 <time className="text-sm text-gray-500">{formatDate(tweet.date)}</time>
//               </div>

//               <p className="text-gray-800 mb-3">{tweet.text}</p>

//               {tweet.pictures.length > 0 && (
//                 <div className="grid grid-cols-2 gap-2 mb-3">
//                   {tweet.pictures.map((img, i) => (
//                     <img key={i} src={img} alt="Tweet media" className="rounded-lg" />
//                   ))}
//                 </div>
//               )}

//               <div className="flex items-center justify-between text-gray-600">
//                 <div className="flex gap-4">
//                   <span className="flex items-center gap-1">
//                     <FaComment /> {tweet.stats.comments}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <FaRetweet /> {tweet.stats.retweets}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <FaHeart /> {tweet.stats.likes}
//                   </span>
//                 </div>
//                 <a 
//                   href={tweet.link} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="text-purple-600 hover:text-purple-700 font-medium"
//                 >
//                   View Tweet
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Tweets;