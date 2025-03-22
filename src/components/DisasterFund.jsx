import React, { useEffect, useState } from "react";
import Web3 from "web3";
import DisasterReliefFundABI from "../abis/DisasterReliefFund.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faInfoCircle,
  faDonate,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Bar } from "react-chartjs-2";
import { Carousel } from 'react-bootstrap';
import "./DisasterFund.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const disasterReliefWebsites = [
  {
    name: "Prime Minister's National Relief Fund",
    url: "https://pmnrf.gov.in/",
    description: "Official relief fund for national disasters.",
  },
  {
    name: "Chief Minister's Relief Fund",
    url: "https://cmrf.gov.in/",
    description: "State-level relief fund for disasters.",
  },
];

const DisasterFund = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const heroImages = [
    "https://th.bing.com/th/id/OIP.Mqp65D6sIsrRustp9AZzTgHaEK?rs=1&pid=ImgDetMain",
    "https://www.worldvision.org.sg/sites/default/files/styles/product_image/public/tsf_donation_page_photo.jpg?itok=Fq1dKh3S",
    "https://i.natgeofe.com/n/79dd0b3b-0038-4d3c-a947-a8e3a0ecb9d5/52801.jpg"
  ];

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    goal: "",
    description: "",
  });

  const [disasterInfo, setDisasterInfo] = useState([
    {
      id: 1,
      title: "Earthquake Preparedness",
      content: "Learn how to stay safe during earthquakes",
      type: "guide",
    },
    {
      id: 2,
      title: "Flood Relief Centers",
      content: "Locations of active relief centers",
      type: "location",
    },
  ]);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3.eth.getAccounts();
    
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          } else {
            console.error("No accounts found.");
            return;
          }
    
          const networkId = await web3.eth.net.getId();
          console.log("Network ID:", networkId);
          const networkData = DisasterReliefFundABI.networks[networkId];
    
          if (networkData) {
            console.log("Contract Address:", networkData.address);
            const contractInstance = new web3.eth.Contract(
              DisasterReliefFundABI.abi,
              networkData.address
            );
            setContract(contractInstance);
            refreshCampaigns(contractInstance);
          } else {
            console.error("Smart contract not deployed on the current network!");
            alert("Smart contract not deployed on the current network!");
          }
        } catch (error) {
          console.error("Blockchain error:", error);
        }
      } else {
        alert("Please install MetaMask!");
      }
    };    
    loadBlockchainData();
  }, []);

  const refreshCampaigns = async (contractInstance) => {
    const campaigns = await contractInstance.methods.getCampaigns().call();
    setCampaigns(campaigns);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUsername === "admin" && adminPassword === "admin123") {
      setAdminLoggedIn(true);
      setShowAdminLogin(false);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setAdminLoggedIn(false);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("Please install MetaMask to connect your wallet.");
    }
  };

  const handleCampaignSubmit = async (e) => {
    e.preventDefault();
    if (!contract || !account) {
      alert("Contract not initialized or account not connected");
      return;
    }

    try {
      const weiGoal = Web3.utils.toWei(formData.goal.toString(), "ether");

      if (editingCampaign !== null) {
        await contract.methods
          .updateCampaign(
            editingCampaign,
            formData.name,
            formData.location,
            weiGoal,
            formData.description
          )
          .send({ from: account });
      } else {
        await contract.methods
          .createCampaign(
            formData.name,
            formData.location,
            weiGoal,
            formData.description
          )
          .send({ from: account });
      }

      await refreshCampaigns(contract);
      setShowCampaignModal(false);
      setFormData({ name: "", location: "", goal: "", description: "" });
    } catch (error) {
      console.error("Campaign error:", error);
      alert(`Error processing transaction: ${error.message}`);
    }
  };

  const handleDeleteCampaign = async (campaignId) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      await contract.methods.deleteCampaign(campaignId).send({ from: account });
      refreshCampaigns(contract);
    }
  };

  const withdrawFunds = async (campaignId) => {
    if (!contract || !account) return alert("Contract not initialized");
  
    try {
      await contract.methods.withdrawFunds(campaignId).send({ from: account });
      alert("Funds withdrawn successfully!");
      await refreshCampaigns(contract);
    } catch (error) {
      console.error("Withdrawal error:", error);
      alert("Failed to withdraw funds.");
    }
  };

  const openEditModal = (campaign, index) => {
    setEditingCampaign(index);
    setFormData({
      name: campaign.name,
      location: campaign.location,
      goal: Web3.utils.fromWei(campaign.goal, "ether"),
      description: campaign.description,
    });
    setShowCampaignModal(true);
  };

  const DonationCard = ({ campaign, index }) => {
    const [donationAmount, setDonationAmount] = useState("");
    const isCompleted = Number(campaign.amountRaised) >= Number(campaign.goal);
    const progress = Math.min(
      (Number(campaign.amountRaised) / Number(campaign.goal)) * 100,
      100
    );

    const handleDonate = async () => {
      if (isCompleted) {
        alert("This campaign has already reached its goal. Thank you for your support!");
        return;
      }

      try {
        const weiAmount = Web3.utils.toWei(donationAmount.toString(), "ether");
        await contract.methods.donate(index).send({
          from: account,
          value: weiAmount,
        });
        await refreshCampaigns(contract);
        setDonationAmount("");
      } catch (error) {
        console.error("Donation error:", error);
        alert(`Donation failed: ${error.message}`);
      }
    };

    return (
      <div className={`campaign-card card mb-4 ${isCompleted ? 'completed' : ''}`}>
        {isCompleted && (
          <div className="completed-ribbon">
            <FontAwesomeIcon icon={faCheckCircle} /> Goal Reached
          </div>
        )}
        <div className="card-body">
          <h3 className="card-title">
            {campaign.name}
            {isCompleted && (
              <Badge pill className="ml-2" bg="success">
                Completed
              </Badge>
            )}
          </h3>
          <p className="text-muted">{campaign.location}</p>
          <p className="card-text">{campaign.description}</p>

          <div className="progress mb-3">
            <div
              className={`progress-bar ${isCompleted ? 'bg-success' : ''}`}
              role="progressbar"
              style={{ width: `${progress}%` }}
            >
              {progress.toFixed(1)}%
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <span>Raised: {Web3.utils.fromWei(campaign.amountRaised, "ether")} ETH</span>
            <span>Goal: {Web3.utils.fromWei(campaign.goal, "ether")} ETH</span>
          </div>

          {!adminLoggedIn && !isCompleted && (
            <div className="donation-input input-group">
              <input
                type="number"
                className="form-control"
                placeholder="ETH amount"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                min="0.01"
                step="0.01"
              />
              <div className="input-group-append">
                <button className="btn btn-primary" onClick={handleDonate}>
                  <FontAwesomeIcon icon={faDonate} /> Donate
                </button>
              </div>
            </div>
          )}

          {adminLoggedIn && (
            <div className="admin-controls">
              <button
                className="btn btn-warning btn-sm mr-2"
                onClick={() => openEditModal(campaign, index)}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteCampaign(index)}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
              {Number(campaign.amountRaised) > 0 && (
                <button
                  className="btn btn-success btn-sm ml-2"
                  onClick={() => withdrawFunds(index)}
                >
                  <FontAwesomeIcon icon={faDonate} /> Withdraw Funds
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const EmergencyContacts = () => (
    <div className="emergency-contacts card mt-4">
      <div className="card-body">
        <h4 className="card-title">🚨 Emergency Contacts</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            National Emergency: <strong>112</strong>
          </li>
          <li className="list-group-item">
            Disaster Management: <strong>108</strong>
          </li>
          <li className="list-group-item">
            Fire Brigade: <strong>101</strong>
          </li>
        </ul>
      </div>
    </div>
  );

  const activeCampaigns = campaigns.filter(
    (campaign) => Number(campaign.amountRaised) < Number(campaign.goal)
  );
  const completedCampaigns = campaigns.filter(
    (campaign) => Number(campaign.amountRaised) >= Number(campaign.goal)
  );

  const chartData = {
    labels: campaigns.map((campaign) => campaign.name),
    datasets: [
      {
        label: "Amount Raised (ETH)",
        data: campaigns.map((campaign) =>
          Web3.utils.fromWei(campaign.amountRaised, "ether")
        ),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
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
    <div className="disaster-fund-container mt-24">
      {adminLoggedIn ? (
        <div className="admin-dashboard">
          <nav className="admin-navbar navbar navbar-dark bg-dark">
            <span className="navbar-brand">Admin Dashboard</span>
            <button className="btn btn-success" onClick={connectWallet}>
              {account ? `Connected: ${account.substring(0, 6)}...` : "Connect Wallet"}
            </button>
            <button className="btn btn-light" onClick={handleLogout}>
              Logout
            </button>
          </nav>

          <div className="container mt-4">
            <div className="d-flex justify-content-between mb-4">
              <h2>Manage Campaigns</h2>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setEditingCampaign(null);
                  setFormData({
                    name: "",
                    location: "",
                    goal: "",
                    description: "",
                  });
                  setShowCampaignModal(true);
                }}
              >
                <FontAwesomeIcon icon={faPlus} /> New Campaign
              </button>
            </div>

            <div className="row">
              <div className="col-md-8">
                {campaigns.map((campaign, index) => (
                  <DonationCard key={index} campaign={campaign} index={index} />
                ))}
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Campaign Metrics</h5>
                    <Bar data={chartData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="user-interface mt-24">
          <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary">
            <div className="container">
              <span className="navbar-brand font-weight-bold text-black">🌍 Disaster Relief Network</span>
              <button
                className="btn btn-light ml-auto"
                onClick={() => setShowAdminLogin(true)}
              >
                Admin Login
              </button>
            </div>
          </nav>

          <Carousel fade interval={5000} className="hero-carousel">
            {heroImages.map((img, index) => (
              <Carousel.Item key={index}>
                <div 
                  className="hero-slide"
                  style={{ backgroundImage: `url(${img})` }}
                >
                  <div className="carousel-caption">
                    <h2 className="animated fadeInUp">Together We Can Make a Difference</h2>
                    <p className="animated fadeInUp delay-1">Support disaster relief efforts around the world</p>
                    <button 
                      className="btn btn-lg btn-primary animated fadeInUp delay-2"
                      onClick={connectWallet}
                    >
                      {account ? `Connected: ${account.substring(0, 6)}...` : "Connect Wallet to Donate"}
                    </button>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>

          {showAdminLogin && (
            <div className="modal show" style={{ display: "block" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Admin Login</h5>
                    <button
                      className="close"
                      onClick={() => setShowAdminLogin(false)}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleAdminLogin}>
                      <div className="form-group">
                        <label>Username</label>
                        <input
                          type="text"
                          className="form-control"
                          value={adminUsername}
                          onChange={(e) => setAdminUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-6">
                <div className="disaster-info-sidebar">
                  <h4 className="mb-3">
                    <FontAwesomeIcon icon={faInfoCircle} /> Disaster Resources
                  </h4>

                  {disasterInfo.map((info) => (
                    <div key={info.id} className="info-card card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">{info.title}</h5>
                        <p className="card-text">{info.content}</p>
                        <button className="btn btn-outline-primary btn-sm">
                          Learn More
                        </button>
                      </div>
                    </div>
                  ))}
                  <EmergencyContacts />
                </div>
              </div>

              <div className="col-md-6">
                <h2 className="mb-4">Active Campaigns</h2>
                {activeCampaigns.length > 0 ? (
                  activeCampaigns.map((campaign, index) => (
                    <DonationCard key={index} campaign={campaign} index={index} />
                  ))
                ) : (
                  <div className="alert alert-info">
                    No active campaigns at the moment. Check back later!
                  </div>
                )}

                <h2 className="mt-5 mb-4">Completed Campaigns</h2>
                {completedCampaigns.length > 0 ? (
                  completedCampaigns.map((campaign, index) => (
                    <DonationCard key={index} campaign={campaign} index={index} />
                  ))
                ) : (
                  <div className="alert alert-info">
                    No completed campaigns yet.
                  </div>
                )}
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Official Relief Websites</h4>
                    <ul className="list-group">
                      {disasterReliefWebsites.map((site, index) => (
                        <li key={index} className="list-group-item">
                          <a
                            href={site.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {site.name}
                          </a>
                          <p className="text-muted">{site.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCampaignModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingCampaign !== null ? "Edit Campaign" : "Create Campaign"}
                </h5>
                <button
                  className="close"
                  onClick={() => setShowCampaignModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCampaignSubmit}>
                  <div className="form-group">
                    <label>Campaign Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Goal (ETH)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.goal}
                      onChange={(e) =>
                        setFormData({ ...formData, goal: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {editingCampaign !== null ? "Update" : "Create"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisasterFund;