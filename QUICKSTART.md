# 🚀 Quick Start Guide

## Step 1: Get Your Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up or log in to your account
3. Create a new API key
4. Copy your API key

## Step 2: Set Up Backend

### Terminal 1: Backend Setup
```bash
cd Backend

# Update .env file with your Groq API key
# Open Backend/.env and replace:
# GROQ_API_KEY=your_actual_groq_api_key_here

# Install dependencies (if not already done)
npm install

# Start the backend server
npm start
```

You should see:
```
Backend server is running on http://localhost:5000
```

## Step 3: Set Up Frontend

### Terminal 2: Frontend Setup
```bash
cd Frontend

# Install dependencies (if not already done)
npm install

# Start the frontend
npm run dev
```

You should see something like:
```
  ➜  Local:   http://localhost:5173/
```

## Step 4: Use the Application

1. Open your browser to `http://localhost:5173/`
2. Fill in your food preferences
3. (Optional) Add dietary restrictions
4. (Optional) Select a health goal
5. Click "Generate Diet Plan"
6. Wait for the AI to generate your personalized diet plan!

## Troubleshooting

| Problem | Solution |
|---------|----------|
| CORS Error | Make sure both servers are running and backend is on port 5000 |
| "Groq API Error" | Check your API key in `Backend/.env` |
| Port 5000 in use | Change PORT in `Backend/.env` and update frontend API URL |
| Blank page | Make sure frontend dev server is running |

## File Structure Created

```
Backend/
├── server.js           ← Main Express server (handles /api/diet requests)
├── .env                ← Your Groq API key goes here
└── package.json        ← Updated with start scripts

Frontend/
├── src/
│   ├── App.jsx         ← Main component with form
│   ├── App.css         ← Styling for the form
│   └── index.css       ← Global styles
└── package.json        ← Dependencies already included
```

## What Each Component Does

**Backend (server.js):**
- ✅ Listens for requests on port 5000
- ✅ Receives user preferences from frontend
- ✅ Sends request to Groq API
- ✅ Returns generated diet plan

**Frontend (App.jsx):**
- ✅ Displays a form for user input
- ✅ Sends data to backend API
- ✅ Shows loading state while generating
- ✅ Displays the diet plan result

## Next Steps

Once it's working, you can:
- Deploy backend to cloud (Heroku, Azure, etc.)
- Deploy frontend to Netlify, Vercel, or similar
- Add more features (save plans, email, PDF export, etc.)

Happy Diet Planning! 🥗
