# 🔧 Troubleshooting Backend Errors

## Error: 500 Internal Server Error

If you're getting a 500 error when trying to generate a diet plan, follow these steps:

### Step 1: Check Backend Console Output

Look at your **Terminal 1** (backend) console for detailed error messages. The updated server now shows:
- Whether the API key is loaded
- Exact error messages from Groq
- Request details

### Step 2: Test Your Groq API Key

1. Open your browser or use curl to test:
   ```
   GET http://localhost:5000/api/test-groq
   ```

2. You should see a response like:
   ```json
   {
     "success": true,
     "message": "Groq API is working!",
     "response": "Hello!"
   }
   ```

3. If you get an error, your API key is likely **invalid** or **expired**

### Step 3: Verify Your API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Log in and check your API keys
3. If expired, create a **new API key**
4. Update your `Backend/.env` file:
   ```env
   GROQ_API_KEY=your_new_api_key_here
   PORT=5000
   ```

### Step 4: Check Backend is Running

Make sure your backend terminal shows:
```
Backend server is running on http://localhost:5000
```

### Step 5: Restart Backend

After updating `.env`:

1. **Stop** the backend (Ctrl+C in Terminal 1)
2. **Restart** it:
   ```bash
   npm start
   ```

### Step 6: Test Again

Try generating a diet plan again in the frontend.

## Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "Invalid API key" | API key is wrong or expired | Get a new API key from console.groq.com |
| "Rate limit exceeded" | Too many requests | Wait a few minutes before trying again |
| "Model not found" | Groq service issue | Check if mixtral-8x7b-32768 model is available |
| "Connection refused" | Backend not running | Start backend with `npm start` |
| CORS error | Frontend can't reach backend | Make sure backend is on port 5000 |

## Debug Checklist

- [ ] Backend is running on port 5000
- [ ] Frontend can reach backend (`/api/health` returns status)
- [ ] Groq API test passes (`/api/test-groq` returns response)
- [ ] `.env` file has valid API key
- [ ] Backend console shows no errors
- [ ] API key is not expired (check console.groq.com)

## Still Not Working?

Check the **Terminal 1** (backend) output for the detailed error. You should see something like:

```
Full error object: {...}
Error message: Invalid API key
Error status: 401
```

Share this error message and we can debug further!
