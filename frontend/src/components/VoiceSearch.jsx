import React, { useState } from "react";

const VoiceSearch = ({ onSearch }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Sorry, your browser does not support voice search!");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      onSearch(speechResult); // trigger parent search function
    };

    recognition.onerror = (err) => {
      console.error("Voice recognition error:", err);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={startListening}
        className="px-4 py-2 rounded-lg bg-blue-500 text-white"
      >
        {listening ? "Listening..." : "🎤 Speak"}
      </button>
      {transcript && <span>You said: {transcript}</span>}
    </div>
  );
};

export default VoiceSearch;
