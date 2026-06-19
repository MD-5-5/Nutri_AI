// API Configuration
// For development: uses localhost
// For production: uses environment variable set in Vercel
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
