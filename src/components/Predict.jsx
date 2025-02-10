import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import emailjs from '@emailjs/browser';

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
  const [response, setResponse] = useState();
  const [infraResponse, setInfraResponse] = useState();
  const [isHelpMode, setIsHelpMode] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [helpPreview, setHelpPreview] = useState(null);
  const [helpImage, setHelpImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
      Alert sent to authorities successfully!
    </div>
  );

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = await convertToBase64(file);
      setPreview(data);
      setImage(file);
    }
  };

  const handleInfraFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = await convertToBase64(file);
      setInfraPreview(data);
      setInfraImage(file);
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

    // Submit to disaster endpoint
    const formDataDisaster = new FormData();
    formDataDisaster.append("image", helpImage);
    try {
      const resDisaster = await axios.post("http://127.0.0.1:5000/predict_image", formDataDisaster);
      if (resDisaster.status === 200) {
        setResponse(resDisaster.data);
        await sendEmail('Disaster Classification', resDisaster.data.class, location, mapUrl);
      }
    } catch (error) {
      console.error('Disaster classification error:', error);
    }

    // Submit to infra endpoint
    const formDataInfra = new FormData();
    formDataInfra.append("infrastructure_image", helpImage);
    try {
      const resInfra = await axios.post("http://127.0.0.1:5000/predict_infra", formDataInfra);
      if (resInfra.status === 200) {
        setInfraResponse(resInfra.data);
        await sendEmail('Infrastructure Vulnerability', resInfra.data.damage_class, location, mapUrl);
      }
    } catch (error) {
      console.error('Infrastructure classification error:', error);
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
    <div className="mt-28 container mx-auto px-4 min-h-screen bg-gray-50">
      {emailSent && <EmailNotification />}

      <div className="text-center py-8">
        <button
          onClick={() => setIsHelpMode(!isHelpMode)}
          className={`py-2 px-6 rounded-lg font-semibold transition-colors ${
            isHelpMode 
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isHelpMode ? 'Education Mode' : 'Emergency Mode'}
        </button>
        <p className="mt-2 text-sm text-gray-600">
          {isHelpMode ? 'Emergency alerts enabled - location sharing active' : 'Educational mode - no alerts will be sent'}
        </p>
      </div>

      {isHelpMode ? (
        <div className="grid md:grid-cols-5 gap-8 mt-8">
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-red-600">Emergency Assistance</h2>
            <div className="mb-4">
              <button
                onClick={() => setCameraActive(!cameraActive)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {cameraActive ? 'Stop Camera' : 'Activate Camera'}
              </button>
            </div>

            {cameraActive && (
              <div className="mb-4">
                <video ref={videoRef} autoPlay className="w-full rounded-lg border-2 border-gray-200 mb-4"></video>
                <button
                  onClick={capturePhoto}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors w-full"
                >
                  Capture Emergency Photo
                </button>
                <canvas ref={canvasRef} className="hidden"></canvas>
              </div>
            )}

            {helpPreview && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Captured Photo:</h3>
                <img src={helpPreview} alt="Emergency Preview" className="w-full h-64 object-cover rounded-lg border-2 border-gray-200" />
                <button
                  onClick={handleHelpSubmit}
                  className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-lg font-semibold mt-4 w-full transition-colors"
                >
                  Send Emergency Alert
                </button>
              </div>
            )}
          </div>

          <div className="md:col-span-3 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Analysis Results</h2>
            <div className="space-y-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">Disaster Analysis</h3>
                {response ? (
                  <>
                    <div className="text-lg font-bold text-gray-800 mb-2">{response.class}</div>
                    <p className="text-gray-600">{response.info}</p>
                  </>
                ) : (
                  <p className="text-gray-400 italic">No disaster analysis available</p>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">Infrastructure Assessment</h3>
                {infraResponse ? (
                  <>
                    <div className="text-lg font-bold text-gray-800 mb-2">{infraResponse.damage_class}</div>
                    <p className="text-gray-600">{infraResponse.damage_info}</p>
                  </>
                ) : (
                  <p className="text-gray-400 italic">No infrastructure assessment available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 mt-8">
  {/* Disaster Education Section */}
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-blue-600">Disaster Education</h2>
    <form onSubmit={handleImageSubmit}>
      <label className="block mb-4">
        <span className="text-gray-700">Upload Disaster Image:</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors"
      >
        Analyze
      </button>
    </form>

    {preview && (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Preview:</h3>
        <img src={preview} alt="Disaster Preview" className="w-full h-64 object-cover rounded-lg border-2 border-gray-200" />
      </div>
    )}

    {response && (
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 text-blue-600">Analysis Result:</h3>
        <div className="text-lg font-bold text-gray-800 mb-2">{response.class}</div>
        <div className="text-gray-600">
          {response.info.split("\n").map((line, index) => {
            if (line.trim().endsWith(":")) {
              return <p key={index} className="font-bold mt-4">{line.trim()}</p>; // Bold title without bullet
            }
            return line.trim() ? <li key={index} className="list-disc list-inside">{line}</li> : <br key={index} />;
          })}
        </div>
      </div>
    )}
  </div>

  {/* Infrastructure Education Section */}
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-blue-600">Infrastructure Education</h2>
    <form onSubmit={handleInfraSubmit}>
      <label className="block mb-4">
        <span className="text-gray-700">Upload Infrastructure Image:</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleInfraFileChange}
          className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors"
      >
        Analyze
      </button>
    </form>

    {infraPreview && (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Preview:</h3>
        <img src={infraPreview} alt="Infrastructure Preview" className="w-full h-64 object-cover rounded-lg border-2 border-gray-200" />
      </div>
    )}

    {infraResponse && (
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 text-blue-600">Assessment Result:</h3>
        <div className="text-lg font-bold text-gray-800 mb-2">{infraResponse.damage_class}</div>
        <div className="text-gray-600">
          {infraResponse.damage_info.split("\n").map((line, index) => {
            if (line.trim().endsWith(":")) {
              return <p key={index} className="font-bold mt-4">{line.trim()}</p>; // Bold title without bullet
            }
            return line.trim() ? <li key={index} className="list-disc list-inside">{line}</li> : <br key={index} />;
          })}
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