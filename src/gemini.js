
async function aiResponse(promptText) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: promptText,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "AI request failed");
    }

    const newText = (data.text || "I couldn't generate a response.")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/meta ai/gi, "Jabbar");

    console.log("SHIFRA AI Provider:", data.provider);

    setprompt(newText);
    setResponse(true);

    setTimeout(() => speak(newText), 150);

  } catch (error) {
    console.error("SHIFRA AI Error:", error);

    setSpeaking(false);
    setprompt("Sorry, both AI services are currently unavailable.");
    setResponse(true);
  }
}
