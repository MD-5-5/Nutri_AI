# 🚀 NutriPlan AI - Complete Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Testing](#local-testing)
3. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
4. [Backend Deployment (Render)](#backend-deployment-render)
5. [Environment Configuration](#environment-configuration)
6. [Alternative Deployment Options](#alternative-deployment-options)
7. [Post-Deployment Testing](#post-deployment-testing)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts (Free Tier Available)
- ✅ **GitHub Account** - For code repository
- ✅ **Vercel Account** - For frontend deployment (free)
- ✅ **Render Account** - For backend deployment (free)
- ✅ **Groq API Key** - Already configured in your `.env` file

### Required Software (Already Installed)
- ✅ Node.js (v18 or higher)
- ✅ npm or yarn
- ✅ Git

---

## Local Testing

### Step 1: Test Backend Locally

```bash
# Navigate to backend directory
cd Backend

# Install dependencies (if not already done)
npm install

# Start the backend server
npm start
```

Expected Output:
```
Backend server is running on http://localhost:5000
```

**Test the backend:**
- Open browser: http://localhost:5000/api/health
- You should see: `{"status":"Backend is running","groqApiKeyExists":true,"port":5000}`

---

### Step 2: Test Frontend Locally

```bash
# Open a NEW terminal/command prompt
# Navigate to frontend directory
cd Frontend

# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

Expected Output:
```
VITE v7.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
```

**Test the application:**
1. Open browser: http://localhost:5173/
2. Fill out the form with your preferences
3. Click "Generate My Diet Plan"
4. Verify you receive a personalized diet plan

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Production

1. **Update API URL for Production**

Create a new file `Frontend/src/config.js`:

```javascript
// Frontend/src/config.js
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

2. **Update App.jsx to use config**

In `Frontend/src/App.jsx`, change:
```javascript
const response = await fetch("http://localhost:5000/api/diet", {
```

To:
```javascript
import { API_URL } from './config';

// ... later in handleSubmit:
const response = await fetch(`${API_URL}/api/diet`, {
```

3. **Build the frontend to test**

```bash
cd Frontend
npm run build
```

This creates an optimized production build in the `dist` folder.

---

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to Frontend directory
cd Frontend

# Login to Vercel
vercel login

# Deploy
vercel
```

**Follow the prompts:**
- Set up and deploy? `Y`
- Which scope? Select your account
- Link to existing project? `N`
- Project name? `nutriplan-ai` (or your preferred name)
- Which directory? `./` (current directory)
- Want to override settings? `N`

**Set Environment Variable:**
After deployment, add environment variable:
```bash
vercel env add VITE_API_URL
```
When prompted, enter: `https://your-backend-url.onrender.com`
Select: Production

**Deploy to production:**
```bash
vercel --prod
```

#### Option B: Deploy via Vercel Dashboard

1. **Push code to GitHub:**

```bash
# From the Diet_Planner directory
git init
git add .
git commit -m "Initial commit - NutriPlan AI"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/your-username/nutriplan-ai.git
git branch -M main
git push -u origin main
```

2. **Import to Vercel:**
   - Go to https://vercel.com/new
   - Click "Import Project"
   - Select your GitHub repository
   - Configure:
     - **Framework Preset:** Vite
     - **Root Directory:** `Frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Add Environment Variable:
     - **Name:** `VITE_API_URL`
     - **Value:** `https://your-backend-url.onrender.com` (add after backend deployment)
   - Click "Deploy"

3. **Your frontend will be live at:** `https://your-project-name.vercel.app`

---

## Backend Deployment (Render)

### Step 1: Prepare Backend for Deployment

1. **Ensure `package.json` has correct start script** (Already configured):

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

2. **Create `.gitignore` in Backend folder** (if not exists):

```
node_modules/
.env
```

---

### Step 2: Deploy to Render

#### Option A: Deploy via Render Dashboard (Recommended for Beginners)

1. **Push Backend to GitHub:**

```bash
# From Backend directory
cd Backend
git init
git add .
git commit -m "Backend for NutriPlan AI"

# Create a new repository on GitHub named "nutriplan-backend", then:
git remote add origin https://github.com/your-username/nutriplan-backend.git
git branch -M main
git push -u origin main
```

2. **Create Web Service on Render:**
   - Go to https://dashboard.render.com/
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select `nutriplan-backend` repository
   - Configure:
     - **Name:** `nutriplan-api`
     - **Region:** Choose closest to your users
     - **Branch:** `main`
     - **Root Directory:** Leave empty (or `.` if needed)
     - **Runtime:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Instance Type:** `Free`

3. **Add Environment Variables:**
   - Click "Advanced" → "Add Environment Variable"
   - Add:
     - **Key:** `GROQ_API_KEY`
     - **Value:** Your Groq API key from `.env` file
     - **Key:** `PORT`
     - **Value:** `5000`

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Your backend will be live at: `https://nutriplan-api.onrender.com`

5. **Test Backend:**
   - Visit: `https://nutriplan-api.onrender.com/api/health`
   - Should return: `{"status":"Backend is running","groqApiKeyExists":true,"port":5000}`

#### Option B: Deploy via Render YAML (Advanced)

Create `render.yaml` in Backend directory:

```yaml
services:
  - type: web
    name: nutriplan-api
    runtime: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: GROQ_API_KEY
        sync: false
      - key: PORT
        value: 5000
```

---

### Step 3: Update Frontend with Backend URL

Once backend is deployed:

1. **Update Vercel Environment Variable:**

```bash
# If using Vercel CLI
vercel env add VITE_API_URL production
# Enter: https://your-backend-url.onrender.com

# Redeploy frontend
cd Frontend
vercel --prod
```

Or via Vercel Dashboard:
- Go to your project settings
- Environment Variables
- Edit `VITE_API_URL`
- Value: `https://nutriplan-api.onrender.com`
- Redeploy from "Deployments" tab

---

## Environment Configuration

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GROQ_API_KEY` | Your Groq API key | `gsk_...` |
| `PORT` | Server port | `5000` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://nutriplan-api.onrender.com` |

---

## Alternative Deployment Options

### Frontend Alternatives

#### **Netlify** (Similar to Vercel)
```bash
npm install -g netlify-cli
cd Frontend
netlify deploy --prod
```

#### **GitHub Pages** (Static only)
1. Build: `npm run build`
2. Install: `npm install -g gh-pages`
3. Add to `package.json`:
   ```json
   "homepage": "https://username.github.io/nutriplan-ai",
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
4. Deploy: `npm run deploy`

---

### Backend Alternatives

#### **Railway** (Great free tier)
1. Go to https://railway.app/
2. "New Project" → "Deploy from GitHub repo"
3. Select backend repository
4. Add environment variables
5. Deploy

#### **Heroku** (Has free tier)
```bash
heroku login
cd Backend
heroku create nutriplan-api
heroku config:set GROQ_API_KEY=your_key_here
git push heroku main
```

#### **AWS Elastic Beanstalk** (Production-grade)
```bash
npm install -g eb
eb init
eb create nutriplan-api
eb setenv GROQ_API_KEY=your_key_here
eb deploy
```

---

## Post-Deployment Testing

### Checklist

- [ ] **Backend Health Check**
  - Visit: `https://your-backend.onrender.com/api/health`
  - Status: Should return success

- [ ] **Backend Groq Test**
  - Visit: `https://your-backend.onrender.com/api/test-groq`
  - Should return: `"Groq API is working!"`

- [ ] **Frontend Loading**
  - Visit: `https://your-app.vercel.app`
  - Page loads correctly
  - No console errors

- [ ] **Full Flow Test**
  - Fill out form
  - Submit
  - Receive diet plan
  - Download plan works
  - Reset button works

- [ ] **Mobile Responsiveness**
  - Test on mobile device or browser DevTools
  - All features work on mobile

---

## Troubleshooting

### Common Issues

#### 1. **CORS Error**

**Error:** `Access to fetch at 'https://backend...' from origin 'https://frontend...' has been blocked by CORS`

**Solution:** Update `Backend/server.js`:

```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

---

#### 2. **Environment Variables Not Working**

**Frontend:**
- Ensure variable starts with `VITE_`
- Restart dev server after adding variables
- For production: Redeploy after adding variables

**Backend:**
- Check spelling of variable names
- Verify in Render dashboard under "Environment"
- Redeploy backend after adding variables

---

#### 3. **Backend Returns 500 Error**

**Check Render Logs:**
1. Go to Render Dashboard
2. Select your service
3. Click "Logs" tab
4. Look for error messages

**Common Causes:**
- Invalid `GROQ_API_KEY`
- Missing dependencies
- Port configuration issue

---

#### 4. **Frontend Shows "Failed to fetch"**

**Check:**
1. Backend is running (visit health endpoint)
2. `VITE_API_URL` is set correctly
3. No trailing slash in API URL
4. CORS is configured properly

---

#### 5. **Render Service Sleeping (Free Tier)**

Free tier on Render sleeps after 15 minutes of inactivity.

**Solutions:**
- Upgrade to paid tier ($7/month)
- Use a ping service like [UptimeRobot](https://uptimerobot.com/) to keep it awake
- Accept 30-60 second cold start delay

---

## Custom Domain Setup (Optional)

### Vercel (Frontend)

1. Go to Project Settings → Domains
2. Add your domain: `www.nutriplanai.com`
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

### Render (Backend)

1. Go to Service → Settings → Custom Domain
2. Add: `api.nutriplanai.com`
3. Add CNAME record to your DNS provider
4. Wait for SSL certificate generation

---

## Performance Optimization Tips

### Frontend
1. ✅ Already using Vite (fast builds)
2. ✅ Code splitting enabled by default
3. ✅ Lazy loading implemented where needed

### Backend
1. **Enable Compression:**
```bash
npm install compression
```

```javascript
import compression from 'compression';
app.use(compression());
```

2. **Add Rate Limiting:**
```bash
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## Monitoring & Analytics

### Recommended Tools (Free Tiers)

1. **Vercel Analytics** - Built-in, enable in dashboard
2. **Google Analytics** - Add tracking code to `index.html`
3. **Sentry** - Error tracking for production
4. **LogRocket** - Session replay and error tracking

---

## Security Best Practices

✅ **Already Implemented:**
- Environment variables for sensitive data
- HTTPS by default (Vercel & Render)
- Input validation on forms

🔒 **Additional Recommendations:**
1. Add rate limiting (shown above)
2. Implement API authentication if scaling
3. Add request size limits
4. Use Content Security Policy headers

---

## Cost Breakdown

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Vercel** | Unlimited hobby projects | $20/month (Pro) |
| **Render** | 750 hours/month | $7/month (Starter) |
| **Groq API** | Free tier available | Pay as you go |
| **GitHub** | Unlimited public repos | $4/month (Pro) |
| **Total** | **$0/month** | ~$31/month |

---

## Quick Reference Commands

```bash
# Local Development
cd Backend && npm start
cd Frontend && npm run dev

# Build Frontend
cd Frontend && npm run build

# Deploy Frontend (Vercel)
cd Frontend && vercel --prod

# Check Backend Logs (Render)
# Visit dashboard.render.com → Your Service → Logs

# Update Environment Variable (Vercel)
vercel env add VITE_API_URL production

# Test Production Build Locally
cd Frontend
npm run build
npm run preview
```

---

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **Vite Docs:** https://vitejs.dev/
- **React Docs:** https://react.dev/
- **Groq API Docs:** https://console.groq.com/docs

---

## Next Steps After Deployment

1. ✅ Share your app URL with users
2. 📊 Set up analytics to track usage
3. 🐛 Monitor error logs in Render & Vercel
4. 🎨 Customize branding (logo, colors, domain)
5. 🚀 Add new features based on user feedback
6. 💰 Consider monetization if scaling
7. 📱 Create a Progressive Web App (PWA)
8. 🔒 Add user authentication for saving plans

---

## Success Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] CORS configured properly
- [ ] Health endpoints return success
- [ ] Full diet plan flow works end-to-end
- [ ] Mobile responsive design works
- [ ] No console errors in production
- [ ] Custom domain configured (optional)
- [ ] Analytics setup (optional)

---

🎉 **Congratulations!** Your NutriPlan AI is now live and ready to help users transform their health journey!

**Your Live URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-api.onrender.com`

Need help? Check the troubleshooting section or reach out to the respective platform support.
