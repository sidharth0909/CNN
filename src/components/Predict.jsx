import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import emailjs from '@emailjs/browser';
import { FiCamera, FiAlertTriangle, FiBook, FiMapPin, FiMail, FiXCircle } from "react-icons/fi";

emailjs.init('S8HZVEJfLhIH6G-gp');

export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
}

const Predict = () => {
  const [image, setImage] = useState(null);
  const [infraImage, setInfraImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [infraPreview, setInfraPreview] = useState(null);
  const [response, setResponse] = useState(null);
  const [infraResponse, setInfraResponse] = useState(null);
  const [isHelpMode, setIsHelpMode] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [helpPreview, setHelpPreview] = useState(null);
  const [helpImage, setHelpImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);
  const [classificationType, setClassificationType] = useState('');

  useEffect(() => {
    if (cameraActive) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [cameraActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    
    canvas.toBlob(async (blob) => {
      const file = new File([blob], 'captured-photo.jpg', { type: 'image/jpeg' });
      const data = await convertToBase64(file);
      if (isHelpMode) {
        setHelpPreview(data);
        setHelpImage(file);
      } else {
        setPreview(data);
        setImage(file);
      }
      setCameraActive(false);
    }, 'image/jpeg');
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });
  };

  const sendEmail = async (classificationType, result, location, mapUrl) => {
    try {
      const templateParams = {
        classification_type: classificationType,
        classification_result: result,
        user_location: location,
        map_url: mapUrl,
        submission_time: new Date().toLocaleString(),
      };

      const templateId = classificationType === 'Disaster Classification' 
        ? 'disaster_classification' 
        : 'infrastructure_vulnerability';

      await emailjs.send(
        'service_zq8jmtd',
        templateId,
        templateParams
      );
      
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const EmailNotification = () => (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
      <FiMail className="text-xl" />
      <span>Alert sent to authorities successfully!</span>
    </div>
  );

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = await convertToBase64(file);
      setPreview(data);
      setImage(file);
      setResponse(null); // Clear previous results
    }
  };

  const handleInfraFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = await convertToBase64(file);
      setInfraPreview(data);
      setInfraImage(file);
      setInfraResponse(null); // Clear previous results
    }
  };

  const handleHelpSubmit = async (e) => {
    e.preventDefault();
    if (!helpImage) return;

    let location = 'Unable to retrieve location';
    let mapUrl = '';
    try {
      const position = await getLocation();
      location = `${position.coords.latitude}, ${position.coords.longitude}`;
      mapUrl = `https://maps.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}&z=15&output=embed`;
    } catch (error) {
      console.error('Error getting location:', error);
    }

    // Reset previous results
    setResponse(null);
    setInfraResponse(null);

    // Submit to both endpoints
    try {
      const formDataDisaster = new FormData();
      formDataDisaster.append("image", helpImage);
      const resDisaster = await axios.post("http://127.0.0.1:5000/predict_image", formDataDisaster);
      
      if (resDisaster.status === 200) {
        setResponse(resDisaster.data);
        await sendEmail('Disaster Classification', resDisaster.data.class, location, mapUrl);
      }

      const formDataInfra = new FormData();
      formDataInfra.append("infrastructure_image", helpImage);
      const resInfra = await axios.post("http://127.0.0.1:5000/predict_infra", formDataInfra);
      
      if (resInfra.status === 200) {
        setInfraResponse(resInfra.data);
        await sendEmail('Infrastructure Vulnerability', resInfra.data.damage_class, location, mapUrl);
      }
    } catch (error) {
      console.error('Classification error:', error);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post("http://127.0.0.1:5000/predict_image", formData);
    if (res.status === 200) setResponse(res.data);
  };

  const handleInfraSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("infrastructure_image", infraImage);

    const res = await axios.post("http://127.0.0.1:5000/predict_infra", formData);
    if (res.status === 200) setInfraResponse(res.data);
  };

  return (
    <div className="mt-20 container mx-auto px-4 min-h-screen bg-gray-50">
      {emailSent && <EmailNotification />}

      <div className="text-center py-8">
        <button
          onClick={() => {
            setIsHelpMode(!isHelpMode);
            setResponse(null);
            setInfraResponse(null);
          }}
          className={`py-3 px-8 rounded-xl font-semibold transition-all flex items-center gap-2 mx-auto ${
            isHelpMode 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-red'
              : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue'
          } shadow-lg hover:shadow-xl`}
        >
          {isHelpMode ? (
            <>
              <FiBook className="text-lg" />
              Switch to Education Mode
            </>
          ) : (
            <>
              <FiAlertTriangle className="text-lg" />
              Activate Emergency Mode
            </>
          )}
        </button>
        <p className="mt-3 text-sm text-gray-600 flex items-center justify-center gap-2">
          <FiMapPin className="text-red-500" />
          {isHelpMode ? 'Emergency alerts enabled - location sharing active' : 'Educational mode - no alerts will be sent'}
        </p>
      </div>

      {isHelpMode ? (
        <div className="grid md:grid-cols-5 gap-8 mt-8">
          {/* Emergency Input Section */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-xl border-2 border-red-100">
            <h2 className="text-2xl font-bold mb-6 text-red-600 flex items-center gap-2">
              <FiAlertTriangle /> Emergency Assistance
            </h2>
            
            <div className="mb-6">
              <button
                onClick={() => setCameraActive(!cameraActive)}
                className="bg-red-500 text-white py-3 px-6 rounded-xl hover:bg-red-600 transition-all w-full flex items-center justify-center gap-2"
              >
                <FiCamera className="text-xl" />
                {cameraActive ? 'Stop Camera' : 'Activate Camera'}
              </button>
            </div>

            {cameraActive && (
              <div className="mb-6 space-y-4">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  className="w-full rounded-xl border-2 border-gray-200 aspect-video"
                ></video>
                <button
                  onClick={capturePhoto}
                  className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-semibold w-full flex items-center justify-center gap-2 transition-all"
                >
                  Capture Emergency Photo
                </button>
                <canvas ref={canvasRef} className="hidden"></canvas>
              </div>
            )}

            {helpPreview && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FiCamera /> Captured Photo:
                </h3>
                <img 
                  src={helpPreview} 
                  alt="Emergency Preview" 
                  className="w-full h-64 object-cover rounded-xl border-2 border-gray-200" 
                />
                <button
                  onClick={handleHelpSubmit}
                  className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-semibold w-full flex items-center justify-center gap-2 transition-all"
                >
                  <FiAlertTriangle /> Send Emergency Alert
                </button>
              </div>
            )}
          </div>

          {/* Emergency Results Section */}
          <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-xl border-2 border-blue-100">
            <h2 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-2">
              <FiMapPin /> Emergency Analysis
            </h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-red-600 flex items-center gap-2">
                  Disaster Analysis
                </h3>
                {response ? (
                  <>
                    <div className="text-lg font-bold text-red-700 mb-3">{response.class}</div>
                    <p className="text-gray-700 leading-relaxed">{response.info}</p>
                  </>
                ) : (
                  <p className="text-gray-400 italic">Waiting for disaster analysis...</p>
                )}
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
                  Infrastructure Assessment
                </h3>
                {infraResponse ? (
                  <>
                    <div className="text-lg font-bold text-blue-700 mb-3">{infraResponse.damage_class}</div>
                    <p className="text-gray-700 leading-relaxed">{infraResponse.damage_info}</p>
                  </>
                ) : (
                  <p className="text-gray-400 italic">Waiting for infrastructure assessment...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Disaster Education Section */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-blue-100">
            <h2 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-2">
              <FiAlertTriangle /> Disaster Education
            </h2>
            
            <form onSubmit={handleImageSubmit} className="space-y-6">
              <label className="block">
                <span className="text-gray-700 mb-2 block">Upload Disaster Image:</span>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                  />
                </div>
              </label>
              
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors flex items-center gap-2 w-full justify-center"
              >
                Analyze Disaster
              </button>
            </form>

            {preview && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">Preview:</h3>
                <img 
                  src={preview} 
                  alt="Disaster Preview" 
                  className="w-full h-64 object-cover rounded-xl border-2 border-gray-200" 
                />
              </div>
            )}

            {response && (
              <div className="mt-6 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Analysis Result:</h3>
                <div className="text-lg font-bold text-blue-700 mb-3">{response.class}</div>
                <div className="text-gray-700 space-y-3">
                  {response.info.split("\n").map((line, index) => (
                    <p key={index} className="leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Infrastructure Education Section */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-blue-100">
            <h2 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-2">
              <FiMapPin /> Infrastructure Education
            </h2>
            
            <form onSubmit={handleInfraSubmit} className="space-y-6">
              <label className="block">
                <span className="text-gray-700 mb-2 block">Upload Infrastructure Image:</span>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleInfraFileChange}
                    className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                  />
                </div>
              </label>
              
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors flex items-center gap-2 w-full justify-center"
              >
                Analyze Infrastructure
              </button>
            </form>

            {infraPreview && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">Preview:</h3>
                <img 
                  src={infraPreview} 
                  alt="Infrastructure Preview" 
                  className="w-full h-64 object-cover rounded-xl border-2 border-gray-200" 
                />
              </div>
            )}

            {infraResponse && (
              <div className="mt-6 bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Assessment Result:</h3>
                <div className="text-lg font-bold text-blue-700 mb-3">{infraResponse.damage_class}</div>
                <div className="text-gray-700 space-y-3">
                  {infraResponse.damage_info.split("\n").map((line, index) => (
                    <p key={index} className="leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Predict;