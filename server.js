
import express from "express";
import cors from "cors";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";

const app = express();

app.use(cors());
app.use(express.json());

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const GROQ_MODEL =
  process.env.GROQ_MODEL || "openai/gpt-oss-120b";

async function askGemini(prompt) {
  const result = await gemini.models.generateContent({
    model: "gemini-3.8-flash",
    contents: prompt,
  });

  return result.text;
}

async function askGroq(prompt) {
  const result = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return (
    result.choices[0]?.message?.content || "No response"
  );
}

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body || {};

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({
      error: "Please provide a valid prompt.",
    });
  }

  try {
    // PRIMARY: GEMINI
    const text = await askGemini(prompt);

    return res.json({
      text,
      provider: "Gemini",
    });
  } catch (geminiError) {
    console.error("Gemini failed:", geminiError.message);
  }

  try {
    // BACKUP: GROQ
    console.log("Switching to Groq...");

    const text = await askGroq(prompt);

    return res.json({
      text,
      provider: "Groq",
    });
  } catch (groqError) {
    console.error("Groq failed:", groqError.message);

    return res.status(500).json({
      error: "Both Gemini and Groq are unavailable.",
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`SHIFRA AI server running on port ${PORT}`);
});
