## 🔥 Overview
The **Disaster Management System** is a comprehensive application designed to aid in disaster preparedness, response, and recovery. It integrates advanced **machine learning models** for **image classification**, **real-time data analysis**, **resource allocation**, and a **blockchain-based disaster relief fund**, providing a robust platform for crisis management.

---

## 🚀 Key Features

### 🎨 Image Classification
- Uses **CNN (Convolutional Neural Networks)** to classify disaster-related images (e.g., damaged buildings) with **94% accuracy**.
- The **Xception Model** is used for **infrastructure vulnerability assessment**.

### 📊 Real-time Data Analysis
- Processes data from various sources (sensors, reports) to assess disaster impact and prioritize responses.
- **Predictive analytics** is applied to forecast disaster severity.

### 📍 Resource Allocation
- Optimizes deployment of **personnel, equipment, and resources** based on predictive models and real-time needs.
- Ensures efficient response coordination during emergencies.

### 🤖 Chatbot Integration
- Provides real-time updates, FAQs, and emergency assistance.
- Can guide users on disaster preparedness measures and connect them to relief services.

### 💰 Disaster Relief Fund - Blockchain Crowdfunding
- A decentralized crowdfunding platform using **Web3.js, Truffle, and Ganache** to collect and manage **ETH donations** for disaster relief.

---

## 🌐 Backend of Disaster Classification

### 🛠 Technologies Used
- **Backend Framework:** Flask (Python)
- **Deep Learning Models:** TensorFlow, Keras (CNN, Xception)
- **Database:** MongoDB (for storing classified disaster reports and user requests)
- **API Integration:** REST API for seamless communication between frontend and backend

### 🎉 Working of Backend
1. **Image Input:** Users upload images through the frontend.
2. **Preprocessing:** Images are resized, normalized, and converted into tensor format.
3. **Model Prediction:** The CNN or Xception model classifies the image.
4. **Result Storage:** Classified results are stored in **MongoDB**.
5. **Response Generation:** The response is sent to the frontend with disaster classification results and suggested actions.

---

## 🌐 Disaster Relief Fund - Blockchain Crowdfunding

### 🛠 Technologies Used
- **Smart Contract Development:** Solidity, Truffle  
- **Local Blockchain:** Ganache  
- **Frontend:** React.js, Bootstrap  
- **Web3 Integration:** Web3.js, MetaMask  
- **Data Visualization:** Chart.js  

### 📌 Features

#### 1️⃣ User Features
- **Connect Wallet:** Users can connect their MetaMask wallet.  
- **Donate ETH:** Users donate ETH to specific disaster relief campaigns.  
- **View Campaigns:** Users can see active fundraising campaigns.  

#### 2️⃣ Admin Features
- **Create Campaigns:** Admins can create new campaigns.  
- **Edit & Delete Campaigns:** Manage active campaigns.  
- **Withdraw Funds:** Admins can withdraw donated ETH from campaigns.  
- **Dashboard Analytics:** View fundraising progress via Chart.js.  

#### 3️⃣ Smart Contract Functions
- `createCampaign()` → Admin-only function to create new campaigns.  
- `donate()` → Allows users to donate ETH to campaigns.  
- `withdrawFunds()` → Admin-only function to withdraw collected ETH.  
- `getCampaigns()` → Fetches all active campaigns.  

---

## 🚀 Setup & Installation

### 📌 Prerequisites
Ensure you have the following installed:
- **Node.js**
- **MetaMask**
- **Ganache**
- **Truffle**
- **Python 3.x**

### 📞 Setup
```bash
# Clone the Repository
git clone https://github.com/your-repo/disaster-management-system.git
cd disaster-management-system

# Install Dependencies
npm install
pip install -r requirements.txt

# Compile & Deploy Smart Contract (Truffle)
truffle compile
truffle migrate --network development

# Ensure Ganache is running before executing the migration.

# Start the Development Server (React)
npm start
```

### ⚡ Usage Guide

#### 1️⃣ Start Ganache
- Open **Ganache** and start a new workspace.  
- Copy the first account's **private key** (Admin Wallet).  
- Import it into **MetaMask**.  

#### 2️⃣ Connect Wallet (For Users & Admins)
- Open the React frontend (**http://localhost:3000**).  
- Click **"Connect Wallet"** to link your MetaMask account.  

#### 3️⃣ Admin Actions
- Log in as **Admin** (Default: `admin / admin123`).  
- Create new campaigns and manage existing ones.  
- Withdraw funds after donations.  

#### 4️⃣ User Actions
- View campaigns.  
- Donate **ETH** using MetaMask.  
- Track fundraising progress via charts.  

---


## Preview of Project 

![Campaigns_png](https://github.com/sidharth0909/CNN/blob/master/src/assets/Preview/Campaigns.png)** → Likely represents disaster relief campaigns or fundraising efforts.  
- **[Chatbot.png](https://github.com/sidharth0909/CNN/blob/master/src/assets/Preview/Chatbot.png)** → Displays an AI-powered chatbot interface for user interaction.  
- **[Disaster_classification_education.png](https://github.com/sidharth0909/CNN/blob/master/src/assets/Preview/Disaster_classification_education.png)** → Demonstrates educational insights related to disaster classification.  
- **[Disaster_classification_emergency.png](https://github.com/sidharth0909/CNN/blob/master/src/assets/Preview/Disaster_classification_emergency.png)** → Shows real-time emergency disaster classification results.  
- **[Emergency_page.png](https://github.com/sidharth0909/CNN/blob/master/src/assets/Preview/Emergency_page.png)** → Represents the emergency assistance interface for users in crisis.  
- **[Historical_data.png](https://github.com/sidharth0909/CNN/blob/master/src/assets/Preview/Historical_data.png)** → Displays past disaster data for analysis and insights.  
- **[Home.png](https://github.com/sidharth0909/CNN/blob/master/src/assets/Preview/Home.png)** → The homepage of the application, providing navigation to key features.  
- **[Relief-fund.png](https://github.com/sidharth0909/CNN/blob/master/src/assets/Preview/Relief-fund.png)** → Related to financial aid or support funds for disaster relief.  
- **[Safety.png](https://github.com/sidharth0909/CNN/blob/master/src/assets/Preview/Safety.png)** → Highlights safety measures and protocols in case of a disaster.  
- **[Services.png](https://github.com/sidharth0909/CNN/blob/master/src/assets/Preview/Services.png)** → Lists the services provided by the disaster management system.  
- **[Social_media_analysis.png](https://github.com/sidharth0909/CNN/blob/master/src/assets/Preview/Social_media_analysis.png)** → Analyzes disaster-related data from social media platforms.  
- **[resource request.png](https://github.com/sidharth0909/CNN/blob/master/src/assets/Preview/resource%20request.png)** → Represents a page where users can request resources during a disaster.  



## 📌 Possible Improvements
✅ **Enhance AI Accuracy:** Improve CNN & Xception models with better datasets.  
✅ **Integration with Government Databases:** Provide real-time access to official disaster alerts.  
✅ **Mobile App Version:** Develop a mobile app for easy access.  
✅ **Geo-Location Tracking:** Enable real-time user location tracking for emergency assistance.  
✅ **Multi-Currency Support for Donations:** Allow other cryptocurrencies like USDT, BNB, and MATIC.  
✅ **Improved Data Security Measures:** Implement encryption for sensitive user data.  

---

## 📞 Support
If you need help, reach out via **GitHub Issues** or email at **sidharthsaholiyabh@gmail.com**.

🚀 *Built for Transparency & Impact in Disaster Relief* 🚀  

---

## 🛠 Development Notes

### ▶️ Simple Steps to Run the Project:
```bash
# Start Ganache server
ganache-cli --db ./ganache-data --port 8545 --networkId 1337

# Open MetaMask and connect your local server (Show test network)

# Compile the contract
truffle compile

# Deploy the contract
truffle migrate --network development

# Start the frontend
npm start
```

---
🎯 *Built for efficient disaster response and recovery!* 🪑🔥🌍

