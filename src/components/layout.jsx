import React from "react";
import { Card, CardContent, Typography, Grid, Button, Box } from "@mui/material";
import YouTube from "react-youtube";
import { motion } from "framer-motion";

const videoOptions = {
  height: "100%",
  width: "100%",
  playerVars: {
    autoplay: 0,
    controls: 1,
    modestbranding: 1,
    showinfo: 0,
    loop: 1,
  },
};

const SafetyCard = ({ videoId, title }) => (
  <Card className="relative h-64 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
    <YouTube
      videoId={videoId}
      opts={videoOptions}
      className="absolute inset-0 w-full h-full"
    />
    <Box className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 to-transparent p-4">
      <Typography variant="h6" className="text-white font-bold">
        {title}
      </Typography>
    </Box>
  </Card>
);

const DosDontsCard = ({ image, title, onClick }) => (
  <motion.div whileHover={{ scale: 1.03 }} className="cursor-pointer">
    <Card className="h-full rounded-xl shadow-lg hover:shadow-xl">
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="bg-gray-50">
        <Typography gutterBottom variant="h6" className="font-bold text-gray-800">
          {title}
        </Typography>
      </CardContent>
      <Button
        fullWidth
        variant="contained"
        onClick={onClick}
        className="bg-blue-600 hover:bg-blue-700 rounded-t-none rounded-b-xl"
      >
        View Guidelines
      </Button>
    </Card>
  </motion.div>
);

const Layout = () => {
  const handleButtonClick = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  const videoContents = [
    { id: 1, videoId: "0MO2ohX2Iao", title: "Fire in Building" },
    { id: 2, videoId: "7MwazSAKcIw", title: "Building Collapse" },
    { id: 3, videoId: "xg_YC0tHdKA", title: "Bombing in Public Place" },
    { id: 4, videoId: "2z3ntqbdruc", title: "CPR Training" },
    { id: 5, videoId: "0tSLfrMRM3c", title: "Fire in Slum" },
    { id: 6, videoId: "3H_EbUdQ7_0", title: "Chemical Hazard" },
    { id: 7, videoId: "L2gx_rlvLgQ", title: "Flooding/Water Logging" },
    { id: 8, videoId: "ix-ox5fn02A", title: "Water Related Disaster" },
  ];

  const dosDontsData = [
    {
      title: "Cyclone",
      image: "https://www.eurokidsindia.com/blog/wp-content/uploads/2023/11/cyclone-stages-formation-impact.jpg",
      link: "public/dm.mcgm.gov.in_dos_and_donts.png",
    },
    {
      title: "Earthquake",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0YYZkbGXEQXL87ElcK47p4DipYjTd2ojdWo06NOYAVQ&s",
      link: "public/earthquake.png",
    },
    {
      title: "Flood",
      image: "https://assets.telegraphindia.com/telegraph/2020/Sep/1601144184_1595180760_20bihar_5.jpg",
      link: "public/floods.png",
    },
    {
      title: "Urban Floods",
      image: "https://assets.telegraphindia.com/telegraph/2022/Sep/1662676860_1662494289_bangalore.jpg",
      link: "public/urban_floods.png",
    },
  ];

  return (
    <div className="mx-4 md:mx-8 lg:mx-16 mt-32 space-y-16">
      <Typography
        variant="h2"
        className="text-center text-4xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
      >
        Safety & Preparedness Resources
      </Typography>

      <section className="space-y-12">
        <Typography variant="h3" className="text-3xl font-bold text-gray-800 text-center">
          Instructional Videos
        </Typography>
        <Grid container spacing={4}>
          {videoContents.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <SafetyCard videoId={item.videoId} title={item.title} />
            </Grid>
          ))}
        </Grid>
      </section>

      <section className="space-y-12">
        <Typography variant="h3" className="text-3xl font-bold text-gray-800 text-center">
          Emergency Guidelines
        </Typography>
        <Grid container spacing={4}>
          {dosDontsData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <DosDontsCard
                image={item.image}
                title={item.title}
                onClick={() => handleButtonClick(item.link)}
              />
            </Grid>
          ))}
        </Grid>
      </section>
    </div>
  );
};

export default Layout;