"use client";
import React, { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { assets } from '../assets/assets'
import { IoMdClose } from "react-icons/io";
import { IoIosSend } from "react-icons/io";

const apiUrl = import.meta.env.VITE_CHATBOT_URL;


const generateBotResponse = async (userInput: string, useSimplePrompt = false) => {
  try {
    let systemInstruction;
    if(useSimplePrompt){
      systemInstruction = "You are a helpful doctor's assistant. Please assist the user accordingly.";

    }else{
    systemInstruction = `
    You are a helpful doctor's assistant. Please assist the user accordingly. 
    
    For simple symptoms like common cold, minor headaches, or small cuts:
    - Provide basic treatment advice and home remedies
    - Suggest over-the-counter medications when appropriate
    - Mention when symptoms should resolve
    
    For more complex symptoms or conditions that require professional diagnosis:
    - Explain why the symptoms need professional evaluation
    - Suggest the appropriate specialist from the list below
    
    If the user wants or needs a doctor suggestion, recommend one of the following specialists based on their symptoms:
    
    Dr. Maha Houidi - Dermatologist - For skin issues, rashes, acne, etc.
    City: Sfax - Street: Rue Ibn Khaldoun - Phone: +21650444555
    
    Dr. Roua Mahmoudi - Neurologist - For headaches, dizziness, numbness, etc.
    City: Ariena - Street: Rue Ibn Khaldoun - Phone: +21650444555
    
    Dr. Sara Hosni - Cardiologist - For chest pain, palpitations, etc.
    City: Kairouan - Street: 123 Rue Habib Bourguiba - Phone: +212634567890
    
    Dr. Hazem Hammami - General Practitioner - For general health concerns or unsure cases
    City: Ezzahra - Street: Hay el Habib - Phone: +212634567890
    
    Always remind users that this is not a substitute for professional medical advice, and they should seek immediate medical attention for any severe symptoms.
    `; 
    }
    const fullPrompt = `${systemInstruction}\n\nUser: ${userInput}`;
    
    const apiURL = `${apiUrl}/chatbot/generate?user_prompt=${encodeURIComponent(
      fullPrompt
    )}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    return data.user_response;
  } catch (error) {
    console.error("Error fetching bot response:", error);
    return "Sorry, I couldn't understand your request.";
  }
};

declare global {
  interface Window {
    handleBubbleClick: any;
  }
}

const ChatBotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<any>(null);

  useEffect(() => {
    scrollToBottom();
    window.handleBubbleClick = handleBubbleClick;
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBubbleClick = () => {
    setIsOpen(!isOpen);
  };

  const handlePopupClose = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const newMessages = [...messages, { sender: "user", text: inputValue }];
      setMessages(newMessages);
      setInputValue("");
      setLoading(true);
      try {
        let botResponse = await generateBotResponse(inputValue, false);
        
        // If response is empty, try again with simple prompt
        if (!botResponse || botResponse.trim() === "") {
          console.log("First attempt returned empty response, trying with simple prompt...");

          botResponse = await generateBotResponse(inputValue, true)
        }
        // Check if the response is empty and set a fallback message
        if (!botResponse || botResponse.trim() === "") {
          
          botResponse = "Sorry, I couldn't understand your request.";
        }
        setMessages([...newMessages, { sender: "bot", text: botResponse }]);
      } catch (error) {
        console.error("Error generating bot response:", error);
        // Add a fallback message in case of error
        setMessages([...newMessages, { sender: "bot", text: "Sorry, I couldn't understand your request." }]);
      } finally {
        setLoading(false);
      }
    }
  };


  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <Toaster />
      {!isOpen && (
        <div
          className="fixed bottom-6 right-6 bg-blue-400 rounded-full p-3 cursor-pointer shadow-lg"
          onClick={handleBubbleClick}
        >
          <img src={assets.logo} alt="Chatbot Icon" className="h-10 w-10" />
        </div>
      )}
  
  {isOpen && (
  <div className="fixed bottom-20 right-6 z-50 w-[670px] h-[500px] bg-indigo-100 rounded-2xl shadow-xl flex flex-col overflow-hidden">
    <div className="bg-blue-400 px-4 py-3 flex items-center justify-between">
      <h1 className="text-base font-bold text-black">Tbibi Chatbot</h1>
      <button onClick={handlePopupClose} aria-label="Close">
        <IoMdClose />

      </button>
    </div>

    <div className="flex-1 p-4 space-y-2 overflow-y-auto text-black custom-scroll">
      {messages.map((message: any, index: number) => (
        <div
          key={index}
          className={`p-3 rounded-lg max-w-[80%] ${
            message.sender === "user"
              ? "bg-blue-600 ml-auto text-white"
              : "bg-blue-400 text-black"
          }`}
        >
          {message.text}
        </div>
      ))}

      {loading && (
        <div className="bg-blue-400 text-black p-3 rounded-lg w-fit">
          Bot is typing <span className="animate-pulse">...</span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>

    <div className="border-t border-gray-300" />

    <div className="flex items-center p-4 bg-indigo-100">
      <input
        type="text"
        placeholder="Type a message..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="flex-grow p-2 rounded-md bg-gray-500 text-white border border-gray-300 focus:outline-none"
      />
      <button
        onClick={handleSendMessage}
        className="ml-2 bg-blue-400 hover:bg-blue-500 text-black p-2 rounded-md"
      >
        <IoIosSend />

      </button>
    </div>
  </div>
)}

    </>
  );
};

export default ChatBotButton;
