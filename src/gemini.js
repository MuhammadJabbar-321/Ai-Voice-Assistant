// gemini.js

const apiKey = "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"; // ⚠️ replace this

async function run(prompt) {
  try {
    if (!prompt || prompt.trim() === "") {
      console.error("Empty prompt");
      return "I didn't hear anything.";
    }

    const limitedPrompt = `Respond in around 20 words only. ${prompt}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Shifra AI Assistant"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [{ role: "user", content: limitedPrompt }]
      }),
    });

    // ✅ FIX: check API response
    if (!response.ok) {
      const errText = await response.text();
      console.error("API ERROR:", errText);
      return "Sorry, I can't connect right now.";
    }

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content;

    if (!text) return "No response from AI.";

    return text;

  } catch (err) {
    console.error("Fetch error:", err);
    return "Connection error.";
  }
}

export default run;