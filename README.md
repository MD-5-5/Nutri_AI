# 🥗 NutriPlan AI - Premium AI-Powered Diet Planner

<div align="center">

![NutriPlan AI](https://img.shields.io/badge/NutriPlan-AI%20Powered-667eea?style=for-the-badge)
![Version](https://img.shields.io/badge/version-2.0-764ba2?style=for-the-badge)

**Transform Your Health Journey with AI-Powered Personalized Nutrition**

[Live Demo](#) | [Documentation](./DEPLOYMENT_GUIDE.md) | [Report Bug](#) | [Request Feature](#)

</div>

---

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Meal Planning** - Advanced AI generates personalized diet plans instantly
- **Customizable Preferences** - Tailor plans based on food preferences and dietary restrictions
- **Multiple Health Goals** - Weight loss, muscle gain, energy boost, and more
- **Instant Results** - Get comprehensive diet plans in seconds
- **Download Plans** - Export your diet plan as a text file

### 🎨 Premium UI/UX
- **Modern Glass-morphism Design** - Sleek, contemporary interface
- **Smooth Animations** - Polished micro-interactions throughout
- **Fully Responsive** - Perfect experience on desktop, tablet, and mobile
- **Accessibility Compliant** - WCAG 2.1 guidelines followed
- **Dark Mode Ready** - Eye-friendly design with premium gradient backgrounds

### 🚀 Technical Highlights
- **React 19** - Latest React features
- **Vite** - Lightning-fast development and builds
- **Express Backend** - Robust and scalable API
- **Groq AI** - Powered by advanced language models
- **RESTful API** - Clean and well-documented endpoints

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-19.1-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=flat-square&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.2-000000?style=flat-square&logo=express)
![Groq](https://img.shields.io/badge/Groq-AI-orange?style=flat-square)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?style=flat-square&logo=vercel)
![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=flat-square&logo=render)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Groq API Key** - [Get Free API Key](https://console.groq.com/)

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/nutriplan-ai.git
cd Diet_Planner
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create .env file
# Add your Groq API key (see Environment Variables section)
echo GROQ_API_KEY=your_groq_api_key_here > .env
echo PORT=5000 >> .env

# Start the backend server
npm start
```

Backend will run on: **http://localhost:5000**

### 3️⃣ Frontend Setup

```bash
# Open a new terminal
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend will run on: **http://localhost:5173**

### 4️⃣ Open Your Browser

Visit **http://localhost:5173** and start creating personalized diet plans!

---

## 🔐 Environment Variables

### Backend (.env)

Create a `Backend/.env` file:

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

### Frontend (for production)

When deploying, set this environment variable in Vercel:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## 📁 Project Structure

```
Diet_Planner/
├── Backend/
│   ├── node_modules/
│   ├── .env                 # Environment variables (create this)
│   ├── server.js            # Express server & API routes
│   ├── package.json
│   └── package-lock.json
│
├── Frontend/
│   ├── node_modules/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── App.jsx          # Main React component (PREMIUM UI)
│   │   ├── App.css          # Premium styling
│   │   ├── main.jsx         # React entry point
│   │   ├── index.css        # Global styles
│   │   └── config.js        # API configuration
│   ├── index.html           # HTML template with SEO
│   ├── vite.config.js
│   ├── package.json
│   └── package-lock.json
│
├── DEPLOYMENT_GUIDE.md      # Complete deployment instructions
├── README.md                # This file
└── QUICKSTART.md
```

---

