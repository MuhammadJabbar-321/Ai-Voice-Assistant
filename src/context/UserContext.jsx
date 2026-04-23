import React, { createContext, useEffect, useRef, useState } from "react";
import run from "../gemini";

export const datacontext = createContext();

function UserContext({ children }) {
  const [speaking, setSpeaking] = useState(false);
  const [prompt, setprompt] = useState("Click here to talk");
  const [response, setResponse] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [miniPlayer, setMiniPlayer] = useState(null);

  const recognitionRef = useRef(null);
  let audioPlayer = window.audioPlayer || new Audio();
  window.audioPlayer = audioPlayer;

  // -----------------------
  // FEMALE VOICE SELECTOR
  // -----------------------
  function chooseFemaleVoice(voices, lang) {
    return (
      voices.find(v => v.lang === lang && v.name.toLowerCase().includes("female")) ||
      voices.find(v => v.name.toLowerCase().includes("female")) ||
      voices.find(v => v.lang === lang) ||
      voices[0]
    );
  }

  // -----------------------
  // SPEAK FUNCTION (ONLY FEMALE)
  // -----------------------
  function speak(text) {
    try {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();

      msg.voice = chooseFemaleVoice(voices, language);
      msg.lang = language;
      msg.volume = 1;
      msg.rate = 1;
      msg.pitch = 1;

      msg.onstart = () => setSpeaking(true);
      msg.onend = () => {
        setSpeaking(false);
        setprompt("Click here to talk"); // Reset prompt
        setResponse(false);
      };
      msg.onerror = () => {
        setSpeaking(false);
        setprompt("Click here to talk");
        setResponse(false);
      };

      window.speechSynthesis.speak(msg);

    } catch {
      setSpeaking(false);
      setprompt("Click here to talk");
      setResponse(false);
    }
  }

  // -----------------------
  // AI RESPONSE
  // -----------------------
  async function aiResponse(promptText) {
    try {
      let text = await run(promptText);
      let newText = text.replace(/\*\*/g, "").replace(/\*/g, "").replace(/meta ai/gi, "Jabbar And Waqar");
      setprompt(newText);
      setResponse(true);
      setTimeout(() => speak(newText), 150);
    } catch {
      setTimeout(() => {
        setSpeaking(false);
        setprompt("Listening...");
        setResponse(false);
      }, 3000);
    }
  }

  // -----------------------
  // LANGUAGE DETECTION
  // -----------------------
  function detectLang(text) {
    if (/[\u0900-\u097F]/.test(text)) return "hi-IN"; // Hindi
    if (/[\u0600-\u06FF]/.test(text)) return "ur-PK"; // Urdu
    return "en-US"; // Default English
  }

  // -----------------------
  // COMMAND HANDLER
  // -----------------------
  function takeCommand(command) {
    const lang = detectLang(command);
    setLanguage(lang);

    // -----------------------
    // CUSTOM RESPONSES
    // -----------------------
    if (command.includes("what is your name") || command.includes("your name")) {
      const nameResponse = "My name is Shipra, AI Assistant created by Jabbar and Waqar.";
      speak(nameResponse);
      setprompt(nameResponse);
      setResponse(true);
      return;
    }

    if (command.includes("who created you")) {
      const creatorResponse = "I was created by Jabbar and Waqar.";
      speak(creatorResponse);
      setprompt(creatorResponse);
      setResponse(true);
      return;
    }

    if (command.includes("how are you")) {
      const howAreYou = "I am fine, thank you for asking!";
      speak(howAreYou);
      setprompt(howAreYou);
      setResponse(true);
      return;
    }

    // -----------------------
    // LANGUAGE SWITCH
    // -----------------------
    if (command.includes("hindi")) { setLanguage("hi-IN"); speak("अब मैं हिंदी में बात करूंगी।"); return; }
    if (command.includes("urdu")) { setLanguage("ur-PK"); speak("اب میں اردو میں بات کروں گی۔"); return; }

    // -----------------------
    // YOUTUBE VIDEO SEARCH / PLAY
    // -----------------------
    if ((command.includes("play") && command.includes("youtube")) || command.includes("youtube search")) {
      let query = command.replace(/play|on youtube|youtube par|youtube search/gi, "").trim();
      window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
      setMiniPlayer({ type: "youtube", query });
      speak(`Playing ${query} on YouTube`);
      return;
    }

    // -----------------------
    // MUSIC PLAYER
    // -----------------------
    if (command.includes("play music")) { audioPlayer.src="/music/song1.mp3"; audioPlayer.play(); setMiniPlayer({ type: "music", song:"song1" }); speak("Playing music"); return; }
    if (command.includes("pause music")) { audioPlayer.pause(); speak("Music paused"); return; }
    if (command.includes("stop music")) { audioPlayer.pause(); audioPlayer.currentTime=0; speak("Music stopped"); return; }
    if (command.includes("next song")) { audioPlayer.src="/music/song2.mp3"; audioPlayer.play(); setMiniPlayer({ type: "music", song:"song2" }); speak("Playing next song"); return; }
    if (command.includes("previous song")) { audioPlayer.src="/music/song1.mp3"; audioPlayer.play(); setMiniPlayer({ type: "music", song:"song1" }); speak("Playing previous song"); return; }

    // -----------------------
    // OPEN WEBSITES
    // -----------------------
    if (command.includes("open")) {
      let site = command.replace("open", "").trim();
      const knownSites = {
        whatsapp: "https://web.whatsapp.com",
        facebook: "https://www.facebook.com",
        instagram: "https://www.instagram.com",
        google: "https://www.google.com",
        youtube: "https://www.youtube.com",
        tiktok: "https://www.tiktok.com",
        twitter: "https://twitter.com",
        amazon: "https://www.amazon.com"
      };
      if (knownSites[site]) { window.open(knownSites[site], "_blank"); speak(`Opening ${site}`); return; }
      if (site.includes(".com") || site.includes(".org") || site.includes(".net")) { window.open(`https://${site}`, "_blank"); speak(`Opening ${site}`); return; }
      window.open(`https://www.google.com/search?q=${site}`, "_blank"); speak(`Searching for ${site}`); return;
    }

    // -----------------------
    // TIME & DATE
    // -----------------------
    if (command.includes("time")) { speak("The time is " + new Date().toLocaleTimeString()); return; }
    if (command.includes("date")) { speak("Today's date is " + new Date().toLocaleDateString(undefined, { weekday:"long", year:"numeric", month:"long", day:"numeric" })); return; }

    // -----------------------
    // DEFAULT AI RESPONSE
    // -----------------------
    aiResponse(command);
  }

  // -----------------------
  // SPEECH RECOGNITION
  // -----------------------
useEffect(() => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition not supported");
    return;
  }

  const recog = new SpeechRecognition();
  recog.lang = "en-US";
  recog.interimResults = false;
  recog.continuous = false;

  recog.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    console.log("USER SAID:", transcript);

    setprompt(transcript);
    takeCommand(transcript.toLowerCase());
  };

  recog.onerror = (err) => {
    console.error("Recognition Error:", err);
    setSpeaking(false);
  };

  recog.onend = () => {
    setSpeaking(false);
  };

  recognitionRef.current = recog;
}, []);

  // -----------------------
  // START LISTENING
  // -----------------------
  function startListening() {
    if (!recognitionRef.current) return;
    recognitionRef.current.start();
    setSpeaking(true);
  }

  return (
    <datacontext.Provider value={{
      startListening,
      speak,
      aiResponse,
      speaking,
      setSpeaking,
      prompt,
      setprompt,
      response,
      setResponse,
      language,
      setLanguage,
      miniPlayer,
      setMiniPlayer
    }}>
      {children}
    </datacontext.Provider>
  );
}

export default UserContext;
