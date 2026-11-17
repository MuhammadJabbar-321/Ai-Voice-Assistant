
import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const { prompt } = req.body || {};

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({
      error: "Please provide a valid prompt.",
    });
  }

  try {
    // PRIMARY: GEMINI
    const gemini = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const result = await gemini.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    return res.status(200).json({
      text: result.text,
      provider: "Gemini",
    });
  } catch (geminiError) {
    console.error("Gemini failed:", geminiError.message);
  }

  try {
    // BACKUP: GROQ
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const result = await groq.chat.completions.create({
      model:
        process.env.GROQ_MODEL || "openai/gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return res.status(200).json({
      text:
        result.choices[0]?.message?.content ||
        "No response",
      provider: "Groq",
    });
  } catch (groqError) {
    console.error("Groq failed:", groqError.message);

    return res.status(500).json({
      error: "Both Gemini and Groq are unavailable.",
    });
  }
}
