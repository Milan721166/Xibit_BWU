
const express = require("express");
const axios = require("axios");
const router = express.Router();
const app=router;

const GEMINI_API_KEY = "AIzaSyCiEAC9PJb7qRA10j8qAudF_jXIDh4QbzM";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
app.post("/generate-text", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required!" });
        }

        const response = await axios.post(
            GEMINI_API_URL,
            { contents: [{ parts: [{ text: prompt }] }] },
            { headers: { "Content-Type": "application/json" } }
        );

        const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedText) {
            return res.status(500).json({ error: "No text generated" });
        }
        console.log("Generated Text:", generatedText,prompt); // Log the generated text for debugging
        res.json({ prompt, generatedText });
    } catch (error) {
        console.error("Error generating text:", error); // Log the full error
        res.status(500).json({
            error: "Error generating text",
            details: error.response?.data || error.message,
        });
    }
});

module.exports = app;