import React, { useContext } from "react";
import "./App.css";
import va from "./assets/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from "./context/UserContext";
import speak from "./assets/speak.gif";
import ai from "./assets/aiVoice.gif";

export default function App() {
  const { startListening, speaking, prompt, response, setprompt,setResponse } = useContext(datacontext);

  return (
    <div className="main">
      <img src={va} alt="Shifra" id="shifra" />
      <span id="shifra-text">
        I'm Shifra, your AI Assistant {speaking ? "(Speaking...)" : ""}
      </span>

      {!speaking ? (
        <button
          onClick={() => {
            startListening(true);
            setprompt("listening...");
            setResponse(false);
          }}
        >
          Click here <CiMicrophoneOn />
        </button>
      ) : (
        <div className="response">
          {!response ? (
            <img src={speak} alt="Listening" id="speak" />
          ) : (
            <img src={ai} alt="AI Speaking" id="ai" />
          )}
          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
}
