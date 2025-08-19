import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../checklogin/CheckLogin";

export default function PyTutorChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false); // State to track loading
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const sendMessage = async () => {
    if (!isLoggedIn()) { navigate('/login'); return; }
    if (!message.trim() || loading) return; // Don't send if empty or already loading

    const userMessage = { sender: "user", text: message };
    setChat((prevChat) => [...prevChat, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/chat/pytutor/", {
        message: message,
      });
      const botReply = { sender: "bot", text: res.data.reply };
      setChat((prevChat) => [...prevChat, botReply]);
    } catch (err) {
      console.error("Error sending message:", err);
      // Display a user-friendly error message in the chat
      const errorMessage = {
        sender: "bot",
        text: "Sorry, I ran into an error. Please check the server logs and try again.",
        isError: true, // Custom flag for styling
      };
      setChat((prevChat) => [...prevChat, errorMessage]);
    } finally {
      setLoading(false); // Stop loading in both success and error cases
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-black px-4 py-8">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 dark:bg-slate-800/60">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">PyTutor Chat</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Ask anything. PyTutor will help you out.</p>
        </div>

        <div className="px-4 sm:px-6 py-4">
          <div className="h-[60vh] overflow-y-auto space-y-4 p-2 bg-slate-50/60 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800">
            {chat.map((msg, idx) => {
              const isUser = msg.sender === "user";
              const isError = msg.isError;
              return (
                <div key={idx} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  {!isUser && (
                    <div className="mr-2 mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">🤖</div>
                  )}
                  <div
                    className={`max-w-[80%] whitespace-pre-wrap text-[15px] leading-relaxed rounded-2xl px-4 py-2 shadow ${
                      isUser
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-sm"
                        : isError
                        ? "bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/40 dark:text-red-200 dark:border-red-800"
                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {isUser && (
                    <div className="ml-2 mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300">🧑</div>
                  )}
                </div>
              );
            })}
            {loading && (
              <div className="flex items-center gap-2 w-fit bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl px-3 py-2 border border-slate-200 dark:border-slate-700 shadow">
                <span className="text-sm">Thinking</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-pulse"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-pulse [animation-delay:150ms]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-pulse [animation-delay:300ms]"></span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="px-4 sm:px-6 pb-5">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-xl p-2 border border-slate-200 dark:border-slate-800">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400"
              placeholder="Ask PyTutor..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:opacity-95 active:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}