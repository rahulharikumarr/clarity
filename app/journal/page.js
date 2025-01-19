"use client";

import { useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setLoading(true);
    recognition.onend = () => setLoading(false);
    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e);
      setLoading(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setEntry((prevEntry) => prevEntry + " " + transcript);
    };

    recognition.start();
  };

  const handleGeneratePolishedEntry = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/transformText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: entry }),
      });

      const data = await response.json();

      if (!data.polishedText) throw new Error("Invalid API response");

      const sentimentEmoji =
        data.polishedText.toLowerCase() === "positive"
          ? "😊"
          : data.polishedText.toLowerCase() === "negative"
          ? "😔"
          : "🤔";

      const updatedEntry = `${entry.trim()} ${sentimentEmoji}`;
      setEntry(updatedEntry);
      setMessage("Sentiment analyzed and emoji added successfully!");
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      setMessage("Failed to analyze sentiment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEntry = async () => {
    if (!entry.trim()) {
      setMessage("Journal entry cannot be empty.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setMessage("Please log in to save your journal entry.");
      return;
    }

    try {
      await addDoc(collection(db, "journals"), {
        userId: user.uid,
        content: entry.trim(),
        timestamp: new Date(),
      });
      setMessage("🎉 Journal entry saved successfully!");
      setEntry("");
    } catch (error) {
      console.error("Error saving journal entry:", error);
      setMessage("Failed to save your journal entry.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center py-12"
      style={{
        backgroundImage: "url('/table.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-8 w-11/12 lg:w-2/3">
        <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-8 drop-shadow-lg">
          Create Your Journal Entry
        </h1>

        {/* Speech-to-Text Button */}
        <button
          onClick={handleSpeechRecognition}
          className={`flex items-center justify-center px-8 py-4 rounded-full text-white font-semibold shadow-lg ${
            loading ? "bg-red-500" : "bg-blue-500"
          } hover:bg-opacity-90 transition transform hover:scale-105 mb-6`}
        >
          {loading ? "Listening..." : "Start Speaking"}
        </button>

        {/* Journal Entry Text Area */}
        <textarea
  value={entry}
  onChange={(e) => setEntry(e.target.value)}
  rows={6}
  className="w-full p-6 border border-gray-300 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 bg-white text-gray-700 text-lg mb-6"
  placeholder="Write your journal entry here..."
></textarea>


        {/* Analyze Sentiment Button */}
        <button
          onClick={handleGeneratePolishedEntry}
          disabled={loading}
          className={`px-10 py-4 ${
            loading ? "bg-gray-400" : "bg-green-500"
          } text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-110 mb-4`}
        >
          {loading ? "Analyzing Sentiment..." : "Analyze Sentiment"}
        </button>

        {/* Save Entry Button */}
        <button
          onClick={handleSaveEntry}
          className="px-10 py-4 bg-indigo-500 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-600 transition transform hover:scale-110"
        >
          Save Entry
        </button>

        {/* Success/Error Message */}
        {message && (
          <p className="mt-8 text-lg font-medium text-gray-700 animate-fadeIn text-center">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
