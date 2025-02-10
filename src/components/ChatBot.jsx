import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaUser, FaPaperPlane, FaTimes, FaExpand, FaCompress } from "react-icons/fa";
import Draggable from "react-draggable";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const draggableRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  if (!API_KEY) console.error("API Key is missing! Please set VITE_GEMINI_API_KEY in your .env file.");
  
  const genAI = new GoogleGenerativeAI(API_KEY);
  
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (text = input) => {
    if (!text.trim() || isLoading) return;
    
    const userMessage = { text, isBot: false, id: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text }] }] });
      
      if (!result || !result.response || !result.response.candidates) throw new Error("Invalid API response structure.");
      
      const botMessage = {
        text: result.response.candidates[0]?.content?.parts[0]?.text || "Sorry, no response received.",
        isBot: true,
        id: Date.now() + 1,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [...prev, { text: "Sorry, I'm having trouble connecting. Please try again.", isBot: true, id: Date.now(), error: true }]);
    }
    setIsLoading(false);
  };

  return (
    <Draggable handle=".drag-handle" cancel=".no-drag" bounds="parent" disabled={isExpanded} nodeRef={draggableRef}>
      <div ref={draggableRef} className={`fixed ${isExpanded ? "inset-0" : "bottom-8 right-8"} z-50 transition-all duration-300`}>
        {isOpen && (
          <div className={`${isExpanded ? "w-full h-full rounded-none" : "w-80 h-[500px] rounded-xl"} bg-white shadow-xl flex flex-col transition-all duration-300`}>
            
            {/* Chat Header */}
            <div className="drag-handle bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaRobot className="text-xl" />
                <h3 className="font-semibold">AI Assistant</h3>
              </div>
              <div className="flex space-x-2">
                {/* Minimize Button Always Visible in Expanded Mode */}
                {isExpanded && (
                  <button onClick={() => setIsExpanded(false)} className="no-drag p-2 hover:bg-blue-700 rounded-full" aria-label="Minimize">
                    <FaCompress />
                  </button>
                )}
                {/* Maximize Button */}
                {!isExpanded && (
                  <button onClick={() => setIsExpanded(true)} className="no-drag p-2 hover:bg-blue-700 rounded-full" aria-label="Maximize">
                    <FaExpand />
                  </button>
                )}
                {/* Close Button */}
                <button onClick={() => { if (messages.length > 0 && !window.confirm('Close chat? Messages will be lost.')) return; setIsOpen(false); }} className="no-drag p-2 hover:bg-blue-700 rounded-full" aria-label="Close chat">
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100">
              {messages.map((msg) => (
                <div key={msg.id} className={`mb-4 flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${msg.isBot ? "bg-white text-gray-800 shadow-md" : "bg-blue-600 text-white"} ${msg.error ? "border border-red-200 bg-red-50" : ""}`}>
                    <div className="flex items-center space-x-2 mb-1">
                      {msg.isBot ? <FaRobot className="text-blue-500" /> : <FaUser className="text-white" />}
                      <span className="text-xs font-medium">{msg.isBot ? "AI Assistant" : "You"}</span>
                    </div>
                    <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t bg-white">
              <div className="mt-4 flex space-x-2">
                <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSend()} placeholder="Type your message..." className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" disabled={isLoading} />
                <button onClick={handleSend} disabled={isLoading} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chat Toggle Button */}
        {!isOpen && (
          <button onClick={() => setIsOpen(true)} className="bg-gradient-to-br from-blue-600 to-blue-500 text-white p-4 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all transform hover:scale-110">
            <FaRobot className="text-2xl" />
          </button>
        )}
      </div>
    </Draggable>
  );
};

export default ChatBot;
