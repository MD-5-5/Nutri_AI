import { useState } from "react";
import "./App.css";
import { API_URL } from "./config";

function App() {
  const [preferences, setPreferences] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [goal, setGoal] = useState("");
  const [dietPlan, setDietPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDietPlan("");

    try {
      const response = await fetch(`${API_URL}/api/diet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          preferences,
          restrictions,
          goal,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate diet plan");
      }

      const data = await response.json();
      setDietPlan(data.dietPlan);
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPreferences("");
    setRestrictions("");
    setGoal("");
    setDietPlan("");
    setError("");
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([dietPlan], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "my-diet-plan.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatDietPlan = (text) => {
    const lines = text.split("\n");
    const formatted = [];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        return;
      }
      
      // Check if it's a numbered section header (1., 2., etc.)
      if (/^\d+\./.test(trimmedLine)) {
        formatted.push(
          <h3 key={index} className="section-header">
            {trimmedLine}
          </h3>
        );
      }
      // Check if it's a meal type or important heading
      else if (
        /^(Breakfast|Lunch|Dinner|Snacks|Morning|Evening|Pre-Workout|Post-Workout|Meal|Weekly|Daily|Tips|Foods|Nutritional|Calorie)/i.test(
          trimmedLine
        )
      ) {
        formatted.push(
          <h4 key={index} className="subsection-header">
            {trimmedLine}
          </h4>
        );
      }
      // Regular content
      else {
        formatted.push(
          <p key={index} className="content-line">
            {trimmedLine}
          </p>
        );
      }
    });
    
    return formatted;
  };

  return (
    <div className="app-container">
      {/* Animated Background Elements */}
      <div className="bg-decoration">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <header className="header">
        <div className="header-content">
          <div className="logo-wrapper">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
              </svg>
            </div>
            <h1>NutriPlan AI</h1>
          </div>
          <p className="tagline">Transform Your Health Journey with AI-Powered Nutrition</p>
          <div className="header-badges">
            <span className="badge">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              AI-Powered
            </span>
            <span className="badge">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              Personalized
            </span>
            <span className="badge">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
              </svg>
              Instant Results
            </span>
          </div>
        </div>
      </header>

      <main className="main-content">
        {!dietPlan ? (
          <div className="form-section glass-card">
            <div className="form-header">
              <h2>Start Your Journey</h2>
              <p>Tell us about your preferences and goals</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="preferences">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd"/>
                  </svg>
                  Food Preferences <span className="required">*</span>
                </label>
                <textarea
                  id="preferences"
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  placeholder="e.g., I love vegetables, grilled chicken, salmon, and Mediterranean cuisine. I enjoy quinoa and fresh fruits..."
                  required
                  rows="4"
                />
                <span className="input-hint">Be specific about foods you enjoy</span>
              </div>

              <div className="form-group">
                <label htmlFor="restrictions">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd"/>
                  </svg>
                  Dietary Restrictions
                </label>
                <textarea
                  id="restrictions"
                  value={restrictions}
                  onChange={(e) => setRestrictions(e.target.value)}
                  placeholder="e.g., Vegetarian, Vegan, Gluten-free, Dairy-free, Nut allergy, Lactose intolerant..."
                  rows="3"
                />
                <span className="input-hint">List any allergies or dietary requirements</span>
              </div>

              <div className="form-group">
                <label htmlFor="goal">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                  Health Goal
                </label>
                <select
                  id="goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value="">Select your primary goal</option>
                  <option value="Weight Loss">🎯 Weight Loss</option>
                  <option value="Muscle Gain">💪 Muscle Gain</option>
                  <option value="General Health">❤️ General Health</option>
                  <option value="Energy Boost">⚡ Energy Boost</option>
                  <option value="Athletic Performance">🏃 Athletic Performance</option>
                  <option value="Diabetes Management">🩺 Diabetes Management</option>
                </select>
                <span className="input-hint">Choose what matters most to you</span>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={loading || !preferences}
                  className="submit-btn"
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Generating Your Personalized Plan...
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"/>
                      </svg>
                      Generate My Diet Plan
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <h4>Personalized</h4>
                <p>Tailored to your unique needs</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <h4>Instant</h4>
                <p>Get results in seconds</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🧠</div>
                <h4>AI-Powered</h4>
                <p>Smart recommendations</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <h4>Detailed</h4>
                <p>Complete meal planning</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="result-section glass-card">
            <div className="result-header">
              <div className="result-title-wrapper">
                <div className="success-icon">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h2>Your Personalized Diet Plan</h2>
                  <p className="result-subtitle">Created just for you based on your preferences</p>
                </div>
              </div>
              
              <div className="action-buttons">
                <button onClick={handleDownload} className="icon-btn download-btn" title="Download Plan">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                  Download
                </button>
                <button onClick={handleReset} className="icon-btn reset-btn" title="Create New Plan">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
                  </svg>
                  New Plan
                </button>
              </div>
            </div>

            <div className="diet-plan-content">
              {formatDietPlan(dietPlan)}
            </div>

            <div className="plan-footer">
              <div className="disclaimer">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                <p><strong>Disclaimer:</strong> This diet plan is AI-generated for informational purposes. Please consult with a healthcare professional or registered dietitian before making significant dietary changes.</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="error-section glass-card">
            <div className="error-icon">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
            </div>
            <p className="error-message">{error}</p>
            <button onClick={() => setError("")} className="dismiss-btn">Dismiss</button>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2026 NutriPlan AI | Powered by Advanced AI Technology</p>
      </footer>
    </div>
  );
}

export default App;