// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import fetch from 'node-fetch';

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Welcome to the Disaster Management API');
// });

// app.get('/api/tweets', async (req, res) => {
//   try {
//     const bearerToken = process.env.TWITTER_BEARER_TOKEN;
//     if (!bearerToken) {
//       throw new Error('Twitter API token is missing');
//     }

//     // Ensure query parameter is provided
//     if (!req.query.q) {
//       return res.status(400).json({ error: "Query parameter 'q' is required" });
//     }

//     const query = encodeURIComponent(`${req.query.q} (help OR relief OR rescue OR emergency) -is:retweet`);
//     const url = `https://api.twitter.com/2/tweets/search/recent?query=${query}&max_results=5&expansions=author_id,attachments.media_keys&tweet.fields=created_at,public_metrics,entities&user.fields=name,username,profile_image_url&media.fields=preview_image_url,url`;

//     const response = await fetch(url, {
//       headers: { Authorization: `Bearer ${bearerToken}` },
//     });

//     // Log response status and body for debugging
//     console.log(`Twitter API Response Status: ${response.status}`);
//     const data = await response.json();
//     console.log("Twitter API Response Body:", data);

//     if (!response.ok) {
//       throw new Error(`Twitter API error: ${response.status} ${response.statusText}`);
//     }

//     if (!data.data) {
//       throw new Error('No tweets found or invalid API response');
//     }

//     const processed = processTwitterData(data);
//     res.json(processed);
//   } catch (error) {
//     console.error('Error fetching tweets:', error.message);
//     res.status(500).json({ error: error.message || 'Failed to fetch tweets' });
//   }
// });

// function processTwitterData(response) {
//   const users = response.includes?.users || [];
//   const media = response.includes?.media || [];

//   return response.data?.map(tweet => {
//     const user = users.find(u => u.id === tweet.author_id) || {};
//     return {
//       text: tweet.text || "No text available",
//       date: tweet.created_at ? new Date(tweet.created_at).toLocaleString() : "Unknown",
//       link: user.username ? `https://twitter.com/${user.username}/status/${tweet.id}` : "#",
//       user: {
//         name: user.name || "Unknown",
//         username: user.username || "unknown",
//         avatar: user.profile_image_url || "https://via.placeholder.com/50",
//       },
//       stats: {
//         comments: tweet.public_metrics?.reply_count || 0,
//         retweets: tweet.public_metrics?.retweet_count || 0,
//         likes: tweet.public_metrics?.like_count || 0,
//       },
//       pictures: media.filter(m => m.type === 'photo').map(m => m.url || m.preview_image_url),
//       videos: media.filter(m => m.type === 'video').map(m => m.url || m.preview_image_url),
//     };
//   }) || [];
// }

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
