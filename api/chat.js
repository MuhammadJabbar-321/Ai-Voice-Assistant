export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    res.status(200).json({
      text: data?.choices?.[0]?.message?.content || "No response",
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}