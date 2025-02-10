import { FaLinkedin, FaGithub, FaFilePdf, FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { useCallback } from "react";
import { loadFull } from "tsparticles";

export const Creators = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const team = [
    {
      name: "Sidharth Saholiya",
      college: "Atharva College of Engineering",
      linkedin: "https://www.linkedin.com/in/sidharthsaholiya/",
      github: "https://github.com/sidharth0909",
      image: "/Profile/Profile.jpg",
      pdf: "/Resume/Resume_SID.pdf",
    },
    {
      name: "Shantanu Pawar",
      college: "Atharva College of Engineering",
      linkedin: "https://www.linkedin.com/in/shantanu-pawar-93790424a/",
      github: "https://github.com/shantanu-02",
      image: "/Profile/Shantanu Image.jpg",
      pdf: "/Resume/Shantanu Pawar.pdf",
    },
    {
      name: "Arya Rane",
      college: "Atharva College of Engineering",
      linkedin: "https://www.linkedin.com/in/arya-rane/",
      github: "https://github.com/Arya-N-Rane",
      image: "/Profile/Arya photo.jpg",
      pdf: "/Resume/Aarya's_Resume.pdf",
    },
    {
      name: "Kartik Raul",
      college: "Atharva College of Engineering",
      linkedin: "https://www.linkedin.com/in/kartikraul16/",
      github: "#",
      image: "/Profile/",
      pdf: "/Resume/Kartik Raul.pdf",
    },
  ];

  return (
    <div className="mt-24 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Particles
          init={particlesInit}
          options={{
            particles: {
              number: { value: 50 },
              color: { value: ["#3B82F6", "#8B5CF6", "#EC4899"] },
              opacity: { value: 0.5 },
              size: { value: 1 },
              move: {
                enable: true,
                speed: 1,
                outMode: "bounce",
              },
              links: {
                enable: true,
                distance: 150,
                color: "#4B5563",
                opacity: 0.4,
                width: 1,
              },
            },
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-20 animate-float">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            The Visionaries
          </span>
          <p className="text-lg mt-4 text-gray-400 font-normal">
            Pioneers of Next-Gen Research
          </p>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="relative group perspective-1000 hover:z-20 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow"></div>

              <div className="relative bg-gray-800/50 backdrop-blur-lg rounded-3xl p-6 transform transition-all duration-500 group-hover:rotate-x-12 group-hover:rotate-y-12 group-hover:scale-105 shadow-2xl">
                <div className="w-full h-64 mb-6 rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 z-20 bg-gray-800/80 px-3 py-1 rounded-full text-xs text-gray-300">
                    {member.college}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {member.name}
                </h3>

                <div className="flex flex-wrap gap-3 mt-6">
                  <a
                    href={member.linkedin}
                    className="p-3 bg-gray-700/50 rounded-xl hover:bg-blue-600/80 transition-all duration-300 hover:scale-110"
                    target="_blank"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                  <a
                    href={member.github}
                    className="p-3 bg-gray-700/50 rounded-xl hover:bg-gray-600/80 transition-all duration-300 hover:scale-110"
                    target="_blank"
                  >
                    <FaGithub className="text-xl" />
                  </a>
                  <a
                    href={member.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-700/50 rounded-xl hover:bg-gray-600/80 transition-all duration-300 hover:scale-110"
                  >
                    <FaFilePdf className="text-xl" />
                  </a>
                </div>

                {member.name === "Sidharth Saholiya" && (
                  <div className="mt-4">
                    <a
                      href="https://sidharth-portfolio-sooty.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <FaRocket className="mr-2 animate-pulse" />
                      <span>View Profile</span>
                    </a>
                  </div>
                )}

                {member.name === "Shantanu Pawar" && (
                  <div className="mt-4">
                    <a
                      href="https://shantanu02-portfolio-xi.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <FaRocket className="mr-2 animate-pulse" />
                      <span>View Profile</span>
                    </a>
                  </div>
                )}
                {member.name === "Arya Rane" && (
                  <div className="mt-4">
                    <a
                      href="#research-paper"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <FaRocket className="mr-2 animate-pulse" />
                      <span>View Profile</span>
                    </a>
                  </div>
                )}
                {member.name === "Kartik Raul" && (
                  <div className="mt-4">
                    <a
                      href="#research-paper"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <FaRocket className="mr-2 animate-pulse" />
                      <span>View Profile</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center animate-bounce-slow">
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-semibold text-white rounded-2xl hover:shadow-2xl transition-all duration-300"
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
