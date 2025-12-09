// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
// Copyright (c) [2025] [Rasa Consultancy Services]. 
// All rights reserved.
//
// This software is confidential and proprietary to Rasa Consultancy Services.
// Do NOT disclose, distribute, or modify without permission.

import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

const LiveChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [typing, setTyping] = useState(false);
  const messageEndRef = useRef(null);

  /* ------------------------ MULTI-DEVICE SYNC ------------------------ */
  useEffect(() => {
    const cached = localStorage.getItem("jobPortalChat");
    if (cached) setMessages(JSON.parse(cached));
  }, []);

  useEffect(() => {
    localStorage.setItem("jobPortalChat", JSON.stringify(messages));
  }, [messages]);

  /* ------------------------ REAL-TIME SOCKET LISTENERS ------------------------ */
  useEffect(() => {
    socket.on("bot-response", (data) => {
      pushMessage("bot", data.message);
    });

    socket.on("live-update", (data) => {
      pushMessage("live", `🔴 Live Update: ${data.text}`);
    });

    socket.on("typing", () => {
      setTyping(true);
      setTimeout(() => setTyping(false), 1500);
    });

    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));
  }, []);

  /* ------------------------ SEND MESSAGE ------------------------ */
  const sendMessage = () => {
    if (!input.trim()) return;

    pushMessage("user", input);
    socket.emit("user-message", { text: input });
    setInput("");
  };

  const pushMessage = (type, text) => {
    const newMsg = { id: Date.now(), type, text };
    setMessages((prev) => [...prev, newMsg]);

    setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  /* ------------------------ PULL TO REFRESH ------------------------ */
  const refreshChat = () => {
    pushMessage("system", "🔄 Chat refreshed with latest live data...");
    socket.emit("pull-refresh");
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-300">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-3 text-lg font-semibold flex justify-between">
        Job Portal Assistant
        <span
          className={`h-3 w-3 rounded-full ${
            isOnline ? "bg-green-400" : "bg-red-400"
          }`}
        ></span>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto px-4 py-3 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`my-2 p-2 rounded-xl max-w-[85%] ${
              msg.type === "user"
                ? "ml-auto bg-blue-500 text-white"
                : msg.type === "live"
                ? "bg-red-100 text-red-600"
                : msg.type === "system"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-white border"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {typing && (
          <p className="text-sm text-gray-500 italic">Bot is typing...</p>
        )}

        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center border-t">
        <input
          className="flex-1 px-3 py-2 outline-none"
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Send
        </button>
      </div>

      {/* Footer Tools */}
      <button
        onClick={refreshChat}
        className="w-full text-sm py-2 bg-gray-200 hover:bg-gray-300"
      >
        🔄 Pull to Refresh Live Data
      </button>
    </div>
  );
};

export default LiveChatBot;
