"use client";

import { useState } from "react";
import axios from "axios";

type Message = {
  sender: "user" | "ai";
  text: string;
};

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hi! I can help you navigate this app.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
    ]);

    setInput("");
    setLoading(true);

    try {
      const role = localStorage.getItem("role");

      const actionResponse = await axios.post("/api/ai/action", {
        message: userMessage,
      });

      if (actionResponse.data.reply) {
        const isActionMessage =
          userMessage.toLowerCase().includes("add") ||
          userMessage.toLowerCase().includes("edit") ||
          userMessage.toLowerCase().includes("delete") ||
          userMessage.toLowerCase().includes("raise") ||
          userMessage.toLowerCase().includes("lower");

        if (isActionMessage && role !== "admin") {
          setMessages((prev) => [
            ...prev,
            {
              sender: "ai",
              text: "Only admins can add, edit, delete, raise, or lower student data.",
            },
          ]);

          setLoading(false);
          return;
        }

        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: actionResponse.data.reply },
        ]);

        setLoading(false);
        return;
      }

      const response = await axios.post("/api/ai/chat", {
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: response.data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, I could not answer right now.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="w-80 bg-white rounded-2xl shadow-xl border border-gray-200 mb-4 overflow-hidden">
          <div className="bg-violet-800 text-white p-4 font-semibold">
            UniHub Assistant
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.sender === "user" ? "text-right" : "text-left"
                }
              >
                <div
                  className={
                    message.sender === "user"
                      ? "inline-block bg-violet-800 text-white p-2 rounded-lg max-w-[85%]"
                      : "inline-block bg-gray-100 text-gray-800 p-2 rounded-lg max-w-[85%]"
                  }
                >
                  {message.text}
                </div>
              </div>
            ))}

            {loading && <p className="text-sm text-gray-500">Thinking...</p>}
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Ask me..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
              className="bg-violet-800 text-white px-4 rounded-lg hover:bg-violet-900 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="bg-violet-800 text-white px-5 py-3 rounded-full shadow-lg hover:bg-violet-900 transition"
      >
        {open ? "Close" : "AI Help"}
      </button>
    </div>
  );
}