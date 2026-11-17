
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
  process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

function shouldUseGroq(error) {
  const status = Number(error?.status || error?.code);

  // Switch on quota, rate-limit and temporary server errors.
  if ([429, 500, 502, 503, 504].includes(status)) {
    return true;
  }

  // Network errors
  return [
    "ECONNRESET",
    "ETIMEDOUT",
    "ECONNREFUSED",
    "ENOTFOUND",
  ].includes(error?.code);
}

async function askGemini(prompt) {
  const response = await gemini.models.generateContent({
    model: "gemini-3.8-flash",
    contents: prompt,
  });

  return response.text;
}

async function askGroq(prompt) {
  const response = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0]?.message?.content || "No response";
}

app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        error: "Please provide a valid prompt.",
      });
    }

    try {
      // PRIMARY AI: GEMINI
      const text = await askGemini(prompt);

      return res.json({
        text,
        provider: "Gemini",
      });

    } catch (error) {
      console.error("Gemini error:", error.message);

      if (!shouldUseGroq(error)) {
        throw error;
      }

      console.log("Gemini unavailable. Switching to Groq...");

      // BACKUP AI: GROQ
      const text = await askGroq(prompt);

      return res.json({
        text,
        provider: "Groq",
      });
    }

  } catch (error) {
    console.error("AI server error:", error.message);

    return res.status(500).json({
      error: "Both AI services failed or are unavailable.",
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`SHIFRA AI server running on port ${PORT}`);
});
