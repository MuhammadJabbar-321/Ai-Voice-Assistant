let apiKey = "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";

async function run(prompt) {
  try {
    // Add word-limit instruction
    const limitedPrompt = `
      Respond in **exactly around 20 words**.
      No long paragraphs. No extra explanation.
      User request: ${prompt}
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        // Required for frontend
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Shifra AI Assistant"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [
          { role: "user", content: limitedPrompt }
        ]
      }),
    });

    const data = await response.json();

    return (
      data?.choices?.[0]?.message?.content ||
      "No response!"
    );
  } catch (err) {
    console.error("OpenRouter error:", err);
    return "Error contacting AI.";
  }
}

export default run;
