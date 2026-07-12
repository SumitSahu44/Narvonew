"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Sparkles, MapPin, Phone, Building, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  isForm?: boolean;
}

const WHATSAPP_NUMBER = "918875341190";

const SUB_MENUS = {
  initial: [
    { text: "🧵 Textile Customization", action: "textiles" },
    { text: "🛠️ Hardware Products", action: "hardware" },
    { text: "📦 Wholesale B2B Quote", action: "wholesale" },
    { text: "📍 Showroom Location", action: "showroom" },
    { text: "📞 Talk to an Agent", action: "form" }
  ],
  textiles: [
    { text: "🧵 Curtains Inquiry", action: "form" },
    { text: "🛋️ Upholstery Fabrics", action: "form" },
    { text: "📖 Request Catalog", action: "form" },
    { text: "🔙 Back to Menu", action: "menu" }
  ],
  hardware: [
    { text: "🚪 Luxury Door Handles", action: "form" },
    { text: "🗄️ Cabinet Pulls", action: "form" },
    { text: "📖 Request Catalog", action: "form" },
    { text: "🔙 Back to Menu", action: "menu" }
  ],
  showroom: [
    { text: "🗺️ Get Location Link", action: "map_link" },
    { text: "📞 Call Showroom", action: "call" },
    { text: "🔙 Back to Menu", action: "menu" }
  ],
  map_link: [
    { text: "🔙 Back to Menu", action: "menu" }
  ],
  call: [
    { text: "🔙 Back to Menu", action: "menu" }
  ],
  custom: [
    { text: "🔙 Back to Menu", action: "menu" }
  ]
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Hello! Welcome to NARVO Textile & Hardware. How can we assist you today? Select an option below or type your inquiry directly.",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [currentMenu, setCurrentMenu] = useState<string>("initial");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    inquiry: ""
  });
  const [showUnreadGlow, setShowUnreadGlow] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showForm]);

  // Handle preset chip clicks
  const handleChipClick = (action: string, text: string) => {
    // Add user message
    const userMsgId = Math.random().toString(36).substring(7);
    const userMsg: Message = {
      id: userMsgId,
      sender: "user",
      text,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      handleBotResponse(action, text);
    }, 600);
  };

  // Bot response engine
  const handleBotResponse = (action: string, userText: string) => {
    const botMsgId = Math.random().toString(36).substring(7);
    let replyText = "";
    let triggerForm = false;

    switch (action) {
      case "menu":
        replyText = "How else can I assist you? Select from the options below or type your inquiry directly:";
        setCurrentMenu("initial");
        break;
      case "map_link":
        window.open("https://maps.app.goo.gl/o1HhD7nrfW1m3yGv8", "_blank");
        replyText = "I have opened the Google Maps showroom location in a new tab! Let me know if you need any other details.";
        setCurrentMenu("map_link");
        break;
      case "call":
        replyText = "You can call us directly at our showroom phone: +91 8875341190. We are open Mon-Sat, 10 AM to 7:30 PM.";
        setCurrentMenu("call");
        break;
      case "textiles":
        replyText = "NARVO designs premium textiles for luxury spaces. We offer bespoke curtains, performance upholstery fabrics, and custom weaves. Tell me a bit about your project or style preferences!";
        setCurrentMenu("textiles");
        break;
      case "hardware":
        replyText = "Our hardware collection features architectural-grade door handles, luxury cabinet pulls, and custom fittings, mostly handcrafted in solid brass. What kind of hardware solutions are you sourcing?";
        setCurrentMenu("hardware");
        break;
      case "showroom":
        replyText = "📍 Showroom Address:\nA-1, Basement, Triveni Nagar Mod, Gopalpura Bypass, Jaipur, Rajasthan - 302018\n\n🕒 Timings:\nMon-Sat, 10:00 AM - 7:30 PM\n\nWould you like to get navigation links or call our showroom?";
        setCurrentMenu("showroom");
        break;
      case "wholesale":
        replyText = "We offer wholesale pricing, custom designs, and dedicated account support for architects, builders, and designers. Please fill in the details below, and our team will get back to you immediately.";
        triggerForm = true;
        setCurrentMenu("custom");
        break;
      case "form":
        replyText = "Sure! Let's get you connected to a member of our sales and design team. Please fill in this quick info to start the WhatsApp chat:";
        triggerForm = true;
        setCurrentMenu("custom");
        break;
      default:
        // Keyword checking
        const textLower = userText.toLowerCase();
        if (textLower.includes("textile") || textLower.includes("fabric") || textLower.includes("curtain") || textLower.includes("sofa")) {
          replyText = "Our textiles represent premium quality weaves and designs. We'd love to show you catalog swatches. Let us know what project you are working on!";
          setCurrentMenu("textiles");
        } else if (textLower.includes("hardware") || textLower.includes("handle") || textLower.includes("lock") || textLower.includes("pull")) {
          replyText = "We offer bespoke solid-brass hardware, door locks, and designer cabinet knobs. Let us know if you need our catalog or pricing details!";
          setCurrentMenu("hardware");
        } else if (textLower.includes("showroom") || textLower.includes("address") || textLower.includes("jaipur") || textLower.includes("location")) {
          replyText = "📍 Jaipur Showroom: A-1, Basement, Triveni Nagar Mod, Gopalpura Bypass, Jaipur - 302018 (Open Mon-Sat, 10 AM to 7:30 PM). Let us know if you plan to visit!";
          setCurrentMenu("showroom");
        } else if (textLower.includes("wholesale") || textLower.includes("price") || textLower.includes("b2b") || textLower.includes("quote")) {
          replyText = "We offer customized B2B quotes for designers and developers. Let me show you our contact form so we can finalize details via WhatsApp.";
          triggerForm = true;
          setCurrentMenu("custom");
        } else {
          replyText = "I want to make sure you get the best assistance. Let me hand you over to our experts. Please complete this mini-form and we will redirect you to WhatsApp chat directly!";
          triggerForm = true;
          setCurrentMenu("custom");
        }
    }

    const botMsg: Message = {
      id: botMsgId,
      sender: "bot",
      text: replyText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, botMsg]);

    if (triggerForm) {
      setFormData((prev) => ({
        ...prev,
        inquiry: prev.inquiry || userText
      }));
      setShowForm(true);
    }
  };

  // Handle custom typed input
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText("");

    const userMsgId = Math.random().toString(36).substring(7);
    const userMsg: Message = {
      id: userMsgId,
      sender: "user",
      text: userText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      handleBotResponse("custom", userText);
    }, 600);
  };

  // Redirect to WhatsApp
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const formattedText = `Hi NARVO Textile & Hardware,%0A%0A*New Inquiry from Chatbot*:%0A*Name*: ${encodeURIComponent(formData.name)}%0A*Phone/Email*: ${encodeURIComponent(formData.phone || "Not provided")}%0A*Inquiry*: ${encodeURIComponent(formData.inquiry || "General Inquiry")}`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${formattedText}`;
    
    window.open(waUrl, "_blank");

    // Add confirmation message
    const botMsgId = Math.random().toString(36).substring(7);
    const botMsg: Message = {
      id: botMsgId,
      sender: "bot",
      text: `Thank you, ${formData.name}! I have redirected you to WhatsApp. If the chat window did not open automatically, please click below to connect with us.`,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, botMsg]);
    setShowForm(false);
    setFormData({ name: "", phone: "", inquiry: "" });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (showUnreadGlow) {
      setShowUnreadGlow(false);
    }
  };

  return (
    <>
      {/* Floating Action Trigger Button Stack */}
      <div className="fixed bottom-8 right-8 z-[999] flex flex-col items-end gap-3.5 pointer-events-none">
        
        {/* Chat Window Container */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute bottom-[144px] right-0 pointer-events-auto w-[330px] sm:w-[380px] h-[460px] max-h-[calc(100vh-180px)] rounded-2xl flex flex-col shadow-2xl bg-[#141414] border border-white/10 overflow-hidden z-[1000]"
            >
              {/* Header */}
              <div className="bg-[#1a1a1a] px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#1a1a1a]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide font-heading">NARVO Assistant</h3>
                    <p className="text-[10px] text-white/50 font-sans">Typically replies instantly</p>
                  </div>
                </div>
                <button
                  onClick={toggleChat}
                  className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200 interactive"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div 
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent overscroll-contain"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[80%] ${
                      msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                    }`}
                  >
                    {/* Sender Name */}
                    <span className="text-[9px] text-white/40 mb-1 px-1 font-sans">
                      {msg.sender === "user" ? "You" : "NARVO Bot"}
                    </span>
                    {/* Bubble */}
                    <div
                      className={`px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-primary text-white rounded-tr-none font-medium shadow-md shadow-primary/10"
                          : "bg-white/10 text-white rounded-tl-none border border-white/5"
                      } whitespace-pre-line`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Inline Redirection Form */}
                {showForm && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full self-start max-w-[90%] bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3.5 my-2 shadow-lg"
                  >
                    <div className="flex items-center gap-2 text-primary text-xs font-bold font-heading">
                      <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
                      <span>Connect with Sales Agent</span>
                    </div>
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-2.5">
                      <div>
                        <label className="block text-[9px] text-white/50 uppercase tracking-wider mb-1 font-sans">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full bg-[#1c1c1c] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] text-white/50 uppercase tracking-wider mb-1 font-sans">Phone No. / Email</label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 9999999999"
                          className="w-full bg-[#1c1c1c] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] text-white/50 uppercase tracking-wider mb-1 font-sans">Requirement Details</label>
                        <textarea
                          rows={2}
                          value={formData.inquiry}
                          onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                          placeholder="What can we help you with?"
                          className="w-full bg-[#1c1c1c] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors resize-none font-sans"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full mt-1.5 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-[#25d366]/10 active:scale-98 interactive cursor-pointer"
                      >
                        <FaWhatsapp className="w-4 h-4" />
                        <span>Send to WhatsApp</span>
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* Initial Chip Options */}
                {!showForm && messages[messages.length - 1]?.sender === "bot" && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(SUB_MENUS[currentMenu as keyof typeof SUB_MENUS] || SUB_MENUS.custom).map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChipClick(chip.action, chip.text)}
                        className="text-[11px] font-sans font-medium px-3.5 py-2 bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/40 rounded-full text-white hover:text-primary transition-all duration-200 active:scale-95 interactive cursor-pointer"
                      >
                        {chip.text}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="bg-[#1a1a1a] p-3.5 border-t border-white/5">
                {showForm ? (
                  <p className="text-[10px] text-white/40 text-center font-sans">
                    Please submit the form above to proceed.
                  </p>
                ) : (
                  <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type a message or question..."
                      className="flex-1 bg-[#242424] text-white text-xs placeholder-white/30 rounded-xl pl-4 pr-10 py-3 border border-white/5 focus:outline-none focus:border-primary focus:bg-[#2c2c2c] transition-all font-sans"
                    />
                    <button
                      type="submit"
                      disabled={!inputText.trim()}
                      className={`absolute right-1.5 p-2 rounded-lg transition-all ${
                        inputText.trim()
                          ? "bg-primary text-white hover:bg-primary/95 active:scale-90 interactive cursor-pointer"
                          : "text-white/20"
                      }`}
                      aria-label="Send message"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Direct WhatsApp Button (Top Button in visual Stack) */}
        <motion.a
          href="https://wa.me/918875341190?text=Hi%20NARVO%20Textile%20%26%20Hardware%2C%20I%20am%20interested%20in%20inquiring%20about%20your%20products%20for%20a%20B2B%20wholesale%20requirement."
          target="_blank"
          rel="noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
          className="pointer-events-auto w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-95 group interactive cursor-pointer"
          aria-label="Direct WhatsApp Chat"
        >
          {/* Subtle green blinking/ping indicator */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-ping group-hover:animate-none pointer-events-none" />
          <FaWhatsapp className="w-7 h-7 relative z-10" />

          {/* Floating Tooltip */}
          <span className="absolute right-16 bg-[#111111] text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md whitespace-nowrap border border-white/10 pointer-events-none">
            WhatsApp Direct
          </span>
        </motion.a>

        {/* The Toggle FAB (AI Assistant) (Bottom Button in visual Stack) */}
        <motion.button
          onClick={toggleChat}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 260, damping: 20 }}
          className={`pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-95 group interactive cursor-pointer ${
            isOpen ? "bg-white text-secondary hover:bg-white/95" : "bg-primary text-white hover:bg-primary/90"
          }`}
          aria-label="Chat with NARVO Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageSquare className="w-6.5 h-6.5" />
          )}

          {/* Floating Tooltip */}
          <span className="absolute right-16 bg-[#111111] text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md whitespace-nowrap border border-white/10 pointer-events-none">
            {isOpen ? "Close Chat" : "AI Assistant"}
          </span>
        </motion.button>

      </div>
    </>
  );
}
