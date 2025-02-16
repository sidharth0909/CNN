import React, { useCallback } from "react";
import { FaLinkedin, FaGithub, FaFilePdf, FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export const Creators = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const team = [
    {
      name: "Sidharth Saholiya",
      role: "AI/ML Engineer",
      college: "Atharva College of Engineering",
      linkedin: "https://www.linkedin.com/in/sidharthsaholiya/",
      github: "https://github.com/sidharth0909",
      image: "/Profile/Profile.jpg",
      pdf: "/Resume/Resume_SID.pdf",
      email: "sidharthsaholiya@gmail.com",
    },
    {
      name: "Shantanu Pawar",
      role: "Software Developer",
      college: "Atharva College of Engineering",
      linkedin: "https://www.linkedin.com/in/shantanu-pawar-93790424a/",
      github: "https://github.com/shantanu-02",
      image: "/Profile/Shantanu Image.jpg",
      pdf: "/Resume/Shantanu Pawar.pdf",
      email: "shantanupawar101@gmail.com",
    },
    {
      name: "Arya Rane",
      role: "Data Engineer",
      college: "Atharva College of Engineering",
      linkedin: "https://www.linkedin.com/in/arya-rane/",
      github: "https://github.com/Arya-N-Rane",
      image: "/Profile/Arya photo.jpg",
      pdf: "/Resume/Aarya's_Resume.pdf",
      email: "ranearya23@gmail.com",
    },
    {
      name: "Kartik Raul",
      role: "Data Analyst",
      college: "Atharva College of Engineering",
      linkedin: "https://www.linkedin.com/in/kartikraul16/",
      github: "https://github.com/Kartikraul6",
      image: "/Profile/Kartik.jpg",
      pdf: "/Resume/Resume_Kartik Raul.pdf",
      email: "kartikraul16@gmail.com",
    },
  ];

  return (
    <div className="mt-24 min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Particles
          init={particlesInit}
          options={{
            particles: {
              number: { value: 70 },
              color: { value: ["#00f2fe", "#4facfe", "#9d50bb"] },
              opacity: { value: 0.7 },
              size: { value: 1.5 },
              move: { enable: true, speed: 1.5, outMode: "bounce" },
              links: {
                enable: true,
                distance: 130,
                color: "#2d3748",
                opacity: 0.5,
                width: 1.2,
              },
            },
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-20 animate-float">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
            The Visionaries
          </span>
          <p className="text-lg mt-4 text-gray-300 font-normal">
            Architects of Digital Innovation
          </p>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative h-[500px] rounded-3xl transition-all duration-500 hover:transform hover:scale-105 hover:shadow-[0_0_30px_#4facfe]"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 backdrop-blur-xl shadow-2xl border border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-15"></div>

                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-400/40 transition-all duration-500"></div>

                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative h-full flex flex-col items-center p-6">
                  {/* Image Section */}
                  <div className="relative w-44 h-44 mt-8 rounded-full overflow-hidden border-4 border-blue-400/30 group-hover:border-purple-400/60 transition-all duration-500 shadow-[0_0_20px_#4facfe]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 grayscale-50 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>

                  {/* Floating Details */}
                  <div className="mt-6 text-center transform group-hover:-translate-y-4 transition-transform duration-500">
                    <h3 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_#4facfe]">
                      {member.name}
                    </h3>
                    <p className="text-sm text-purple-400 mt-2 font-mono">
                      {member.role}
                    </p>
                    <p className="text-xs text-gray-300 mt-1 italic">
                      {member.college}
                    </p>
                  </div>

                  {/* Slide-up Panel */}
                  <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-40 bg-gradient-to-t from-black/70 via-gray-900/70 to-transparent backdrop-blur-lg transition-all duration-500 overflow-hidden rounded-b-3xl border-t border-white/5">
                    <div className="p-4 flex flex-col items-center space-y-4">
                      <div className="flex space-x-4">
                        <a
                          href={member.linkedin}
                          className="p-3 bg-black/50 rounded-xl hover:bg-blue-600/90 transition-all duration-300 hover:scale-110 shadow-[0_0_15px_#4facfe]"
                          target="_blank"
                        >
                          <FaLinkedin className="text-xl text-blue-400" />
                        </a>
                        <a
                          href={member.github}
                          className="p-3 bg-black/50 rounded-xl hover:bg-gray-800/90 transition-all duration-300 hover:scale-110 shadow-[0_0_15px_#4facfe]"
                          target="_blank"
                        >
                          <FaGithub className="text-xl text-gray-300" />
                        </a>
                        <a
                          href={member.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-black/50 rounded-xl hover:bg-red-600/90 transition-all duration-300 hover:scale-110 shadow-[0_0_15px_#4facfe]"
                        >
                          <FaFilePdf className="text-xl text-red-400" />
                        </a>
                      </div>
                      <div className="w-full flex justify-center items-center border-t border-white/10 pt-4">
                        <a
                          href={`mailto:${member.email}?subject=Contact from DMS Portal`}
                          className="text-xs text-gray-400 text-center hover:text-cyan-400 transition-colors duration-300 font-mono"
                        >
                          {`>> CONNECT WITH ${member.name
                            .split(" ")[0]
                            .toUpperCase()} <<`}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center animate-bounce-slow">
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-500 text-lg font-semibold text-white rounded-2xl hover:shadow-[0_0_30px_#4facfe] transition-all duration-300 border border-white/10"
          >
            <span>Return to DMS Portal</span>
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Creators;

// import React, { useCallback } from "react";
// import { FaLinkedin, FaGithub, FaFilePdf, FaRocket } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";

// export const Creators = () => {
//   const particlesInit = useCallback(async (engine) => {
//     await loadFull(engine); // Correctly initialize the engine
//   }, []);

//   const team = [
//     {
//       name: "Sidharth Saholiya",
//       role: "Full Stack Developer",
//       college: "Atharva College of Engineering",
//       linkedin: "https://www.linkedin.com/in/sidharthsaholiya/",
//       github: "https://github.com/sidharth0909",
//       image: "/Profile/Profile.jpg",
//       pdf: "/Resume/Resume_SID.pdf",
//     },
//     {
//       name: "Shantanu Pawar",
//       role: "Frontend Developer",
//       college: "Atharva College of Engineering",
//       linkedin: "https://www.linkedin.com/in/shantanu-pawar-93790424a/",
//       github: "https://github.com/shantanu-02",
//       image: "/Profile/Shantanu Image.jpg",
//       pdf: "/Resume/Shantanu Pawar.pdf",
//     },
//     {
//       name: "Arya Rane",
//       role: "Backend Developer",
//       college: "Atharva College of Engineering",
//       linkedin: "https://www.linkedin.com/in/arya-rane/",
//       github: "https://github.com/Arya-N-Rane",
//       image: "/Profile/Arya photo.jpg",
//       pdf: "/Resume/Aarya's_Resume.pdf",
//     },
//     {
//       name: "Kartik Raul",
//       role: "UI/UX Designer",
//       college: "Atharva College of Engineering",
//       linkedin: "https://www.linkedin.com/in/kartikraul16/",
//       github: "https://github.com/Kartikraul6",
//       image: "/Profile/Kartik.jpg",
//       pdf: "/Resume/Resume_Kartik Raul.pdf",
//     },
//   ];

//   return (
//     <div className="mt-24 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
//       <div className="absolute inset-0 z-0">
//         <Particles
//           init={particlesInit}
//           options={{
//             particles: {
//               number: { value: 50 },
//               color: { value: ["#3B82F6", "#8B5CF6", "#EC4899"] },
//               opacity: { value: 0.5 },
//               size: { value: 1 },
//               move: {
//                 enable: true,
//                 speed: 1,
//                 outMode: "bounce",
//               },
//               links: {
//                 enable: true,
//                 distance: 150,
//                 color: "#4B5563",
//                 opacity: 0.4,
//                 width: 1,
//               },
//             },
//           }}
//         />
//       </div>

//       <div className="relative z-10 container mx-auto px-4 py-16">
//         <h1 className="text-5xl md:text-6xl font-bold text-center mb-20 animate-float">
//           <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
//             The Visionaries
//           </span>
//           <p className="text-lg mt-4 text-gray-400 font-normal">
//             Pioneers of Next-Gen Research
//           </p>
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {team.map((member, index) => (
//             <div
//               key={index}
//               className="relative group perspective-1000 hover:z-20 transition-all duration-500"
//             >
//               <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow"></div>

//               <div className="relative w-full h-96 transform-style-preserve-3d transition-transform duration-500 group-hover:rotate-y-180">
//                 {/* Front Side */}
//                 <div className="absolute w-full h-full bg-gray-800/50 backdrop-blur-lg rounded-3xl p-6 shadow-2xl flex flex-col items-center justify-center">
//                   <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden relative">
//                     <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10"></div>
//                     <img
//                       src={member.image}
//                       alt={member.name}
//                       className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
//                     />
//                     <div className="absolute bottom-4 left-4 z-20 bg-gray-800/80 px-3 py-1 rounded-full text-xs text-gray-300">
//                       {member.college}
//                     </div>
//                   </div>

//                   <h3 className="text-2xl font-bold text-white mb-2">
//                     {member.name}
//                   </h3>
//                 </div>

//                 {/* Back Side */}
//                 <div className="absolute w-full h-full bg-gray-800/50 backdrop-blur-lg rounded-3xl p-6 shadow-2xl flex flex-col items-center justify-center transform rotate-y-180 backface-hidden">
//                   <h3 className="text-2xl font-bold text-white mb-2">
//                     {member.role}
//                   </h3>
//                   <div className="flex flex-wrap gap-3 mt-6">
//                     <a
//                       href={member.linkedin}
//                       className="p-3 bg-gray-700/50 rounded-xl hover:bg-blue-600/80 transition-all duration-300 hover:scale-110"
//                       target="_blank"
//                     >
//                       <FaLinkedin className="text-xl" />
//                     </a>
//                     <a
//                       href={member.github}
//                       className="p-3 bg-gray-700/50 rounded-xl hover:bg-gray-600/80 transition-all duration-300 hover:scale-110"
//                       target="_blank"
//                     >
//                       <FaGithub className="text-xl" />
//                     </a>
//                     <a
//                       href={member.pdf}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="p-3 bg-gray-700/50 rounded-xl hover:bg-gray-600/80 transition-all duration-300 hover:scale-110"
//                     >
//                       <FaFilePdf className="text-xl" />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-20 text-center animate-bounce-slow">
//           <Link
//             to="/"
//             className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-semibold text-white rounded-2xl hover:shadow-2xl transition-all duration-300"
//           >
//             <span>Return to DMS Portal</span>
//             <svg
//               className="w-4 h-4 ml-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M10 19l-7-7m0 0l7-7m-7 7h18"
//               />
//             </svg>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Creators;
