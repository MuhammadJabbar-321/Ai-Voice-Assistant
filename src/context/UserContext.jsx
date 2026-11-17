
import React, { createContext, useEffect, useRef, useState } from "react";

export const datacontext = createContext();

function UserContext({ children }) {
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [prompt, setprompt] = useState("Click here to talk");
  const [response, setResponse] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [miniPlayer, setMiniPlayer] = useState(null);

  const recognitionRef = useRef(null);
  const audioPlayerRef = useRef(null);

  // Audio player
  if (!audioPlayerRef.current && typeof window !== "undefined") {
    audioPlayerRef.current = new Audio();
  }

  const audioPlayer = audioPlayerRef.current;

  // FEMALE VOICE SELECTOR
  function chooseFemaleVoice(voices, lang) {
    return (
      voices.find(
        v => v.lang === lang && v.name.toLowerCase().includes("female")
      ) ||
      voices.find(v => v.name.toLowerCase().includes("female")) ||
      voices.find(v => v.lang === lang) ||
      voices[0]
    );
  }

  // AI SPEAK FUNCTION
  function speak(text) {
    if (!text || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    msg.voice = chooseFemaleVoice(voices, language);
    msg.lang = language;
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 1;

    msg.onstart = () => {
      setListening(false);
      setSpeaking(true);
    };

    msg.onend = () => {
      setSpeaking(false);
      setprompt("Click here to talk");
      setResponse(false);
    };

    msg.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setSpeaking(false);
    };

    window.speechSynthesis.speak(msg);
  }

  // GEMINI + GROQ BACKEND RESPONSE
  async function aiResponse(promptText) {
    try {
      console.log("Sending prompt to AI:", promptText);

      setListening(false);
      setSpeaking(false);
      setprompt("Thinking...");
      setResponse(true);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: promptText })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${res.status}`);
      }

      const data = await res.json();

      console.log("AI RESPONSE:", data);
      console.log("AI PROVIDER:", data.provider);

      const newText = String(data.text || "I could not generate a response.")
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/meta ai/gi, "Jabbar");

      setprompt(newText);
      setResponse(true);

      speak(newText);

    } catch (error) {
      console.error("AI RESPONSE ERROR:", error);

      setSpeaking(false);
      setListening(false);
      setprompt("Sorry, I cannot connect to my AI server. Please check the backend.");
      setResponse(true);
    }
  }

  // LANGUAGE DETECTION
  function detectLang(text) {
    if (/[\u0900-\u097F]/.test(text)) return "hi-IN";
    if (/[\u0600-\u06FF]/.test(text)) return "ur-PK";
    return "en-US";
  }

  // COMMAND HANDLER
  function takeCommand(command) {
    const lang = detectLang(command);
    setLanguage(lang);

    // CUSTOM RESPONSES
    if (command.includes("what is your name") || command.includes("your name")) {
      const answer = "My name is Shifra, AI Assistant created by Jabbar.";
      setprompt(answer);
      setResponse(true);
      speak(answer);
      return;
    }

    if (command.includes("who created you")) {
      const answer = "I was created by Jabbar.";
      setprompt(answer);
      setResponse(true);
      speak(answer);
      return;
    }

    if (command.includes("how are you")) {
      const answer = "I am fine, thank you for asking!";
      setprompt(answer);
      setResponse(true);
      speak(answer);
      return;
    }

    // LANGUAGE SWITCH
    if (command.includes("hindi")) {
      setLanguage("hi-IN");
      speak("अब मैं हिंदी में बात करूंगी।");
      return;
    }

    if (command.includes("urdu")) {
      setLanguage("ur-PK");
      speak("اب میں اردو میں بات کروں گی۔");
      return;
    }

    // YOUTUBE SEARCH
    if (
      (command.includes("play") && command.includes("youtube")) ||
      command.includes("youtube search")
    ) {
      const query = command
        .replace(/play|on youtube|youtube par|youtube search/gi, "")
        .trim();

      window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
        "_blank"
      );

      setMiniPlayer({ type: "youtube", query });
      speak(`Playing ${query} on YouTube`);
      return;
    }

    // MUSIC PLAYER
    if (command.includes("play music")) {
      audioPlayer.src = "/music/song1.mp3";
      audioPlayer.play().catch(console.error);
      setMiniPlayer({ type: "music", song: "song1" });
      speak("Playing music");
      return;
    }

    if (command.includes("pause music")) {
      audioPlayer.pause();
      speak("Music paused");
      return;
    }

    if (command.includes("stop music")) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      speak("Music stopped");
      return;
    }

    if (command.includes("next song")) {
      audioPlayer.src = "/music/song2.mp3";
      audioPlayer.play().catch(console.error);
      setMiniPlayer({ type: "music", song: "song2" });
      speak("Playing next song");
      return;
    }

    if (command.includes("previous song")) {
      audioPlayer.src = "/music/song1.mp3";
      audioPlayer.play().catch(console.error);
      setMiniPlayer({ type: "music", song: "song1" });
      speak("Playing previous song");
      return;
    }

    // OPEN WEBSITES
    if (command.includes("open")) {
      const site = command.replace("open", "").trim();

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

      if (knownSites[site]) {
        window.open(knownSites[site], "_blank");
        speak(`Opening ${site}`);
        return;
      }

      if (/\.(com|org|net)$/i.test(site)) {
        window.open(`https://${site}`, "_blank");
        speak(`Opening ${site}`);
        return;
      }

      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(site)}`,
        "_blank"
      );
      speak(`Searching for ${site}`);
      return;
    }

    // TIME AND DATE
    if (command.includes("time")) {
      speak("The time is " + new Date().toLocaleTimeString());
      return;
    }

    if (command.includes("date")) {
      speak(
        "Today's date is " +
        new Date().toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        })
      );
      return;
    }

    // SEND OTHER QUESTIONS TO AI
    aiResponse(command);
  }

  // SPEECH RECOGNITION
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition is not supported. Try Chrome.");
      return;
    }

    const recog = new SpeechRecognition();

    recog.lang = "en-US";
    recog.interimResults = false;
    recog.continuous = false;

    recog.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();

      console.log("USER SAID:", transcript);

      setListening(false);

      if (!transcript) {
        setprompt("I didn't hear anything. Please try again.");
        setResponse(true);
        return;
      }

      setprompt(transcript);
      setResponse(true);

      takeCommand(transcript.toLowerCase());
    };

    recog.onerror = (event) => {
      console.error("Recognition error:", event.error);
      setListening(false);
      setprompt("I couldn't hear you. Please try again.");
      setResponse(true);
    };

    recog.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recog;

    return () => {
      recog.onend = null;
      recog.stop();
      recognitionRef.current = null;
    };
  }, []);

  // START LISTENING
  function startListening() {
    if (!recognitionRef.current) {
      console.error("Speech recognition is not initialized.");
      return;
    }

    try {
      window.speechSynthesis?.cancel();
      setSpeaking(false);
      setListening(true);
      setprompt("Listening...");
      setResponse(false);

      recognitionRef.current.start();
    } catch (error) {
      console.error("Could not start microphone:", error);
      setListening(false);
    }
  }

  return (
    <datacontext.Provider
      value={{
        startListening,
        speak,
        aiResponse,
        speaking,
        listening,
        setSpeaking,
        prompt,
        setprompt,
        response,
        setResponse,
        language,
        setLanguage,
        miniPlayer,
        setMiniPlayer
      }}
    >
      {children}
    </datacontext.Provider>
  );
}

export default UserContext;
