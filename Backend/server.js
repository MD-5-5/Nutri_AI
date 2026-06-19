import Groq from "groq-sdk";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Function to clean markdown formatting
function cleanMarkdown(text) {
  return text
    .replace(/^#+\s/gm, "")              // Remove headings (#, ##, ###, etc.)
    .replace(/^\*\s/gm, "")              // Remove bullet points (*)
    .replace(/^\-\s/gm, "")              // Remove dashes (-)
    .replace(/^\+\s/gm, "")              // Remove plus signs (+)
    .replace(/\*\*/g, "")                // Remove bold (**)
    .replace(/\*/g, "")                  // Remove italic (*)
    .replace(/`/g, "")                   // Remove backticks
    .replace(/\[(.+?)\]\(.+?\)/g, "$1") // Remove markdown links
    .trim();
}

// Route to generate diet plan
app.post("/api/diet", async (req, res) => {
  try {
    const { preferences, restrictions, goal } = req.body;

    if (!preferences) {
      return res.status(400).json({ error: "Preferences are required" });
    }

    console.log("Received request:", { preferences, restrictions, goal });

    const prompt = `Create a personalized diet plan based on these details:
- Food Preferences: ${preferences}
- Dietary Restrictions: ${restrictions || "None"}
- Goal: ${goal || "General Health"}

Please provide a detailed diet plan with:
1. Daily meal suggestions (Breakfast, Lunch, Dinner, Snacks)
2. Estimated calorie breakdown
3. Nutritional tips
4. Foods to avoid
5. Weekly meal prep ideas

Format the response in a clear, structured way.`

    console.log("Sending request to Groq API...");
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

    const dietPlan = chatCompletion.choices[0]?.message?.content || "";
    const cleanedDietPlan = cleanMarkdown(dietPlan);
    console.log("Successfully generated diet plan");

    res.json({
      success: true,
      dietPlan: cleanedDietPlan,
    });
  } catch (error) {
    console.error("Full error object:", error);
    console.error("Error message:", error.message);
    console.error("Error status:", error.status);
    console.error("Error type:", error.type);
    
    res.status(500).json({
      error: "Failed to generate diet plan",
      message: error.message,
      details: error.error?.message || error.type || "Unknown error",
    });
  }
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "Backend is running",
    groqApiKeyExists: !!process.env.GROQ_API_KEY,
    port: PORT
  });
});

// Test Groq connection
app.get("/api/test-groq", async (req, res) => {
  try {
    console.log("Testing Groq API connection...");
    
    const test = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "Say hello!",
        },
      ],
      model: "llama-3.3-70b-versatile",
      max_tokens: 100,
    });

    res.json({
      success: true,
      message: "Groq API is working!",
      response: test.choices[0]?.message?.content,
    });
  } catch (error) {
    console.error("Groq API test failed:", error);
    res.status(500).json({
      success: false,
      error: "Groq API test failed",
      message: error.message,
      details: error.error?.message || error.type,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
