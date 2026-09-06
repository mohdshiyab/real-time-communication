import { useState } from "react";
import { MessageSquare, Lock, Mail, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

export default function AuthCard() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { login, signup, isLoggingIn, isSigningUp } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isLogin && !formData.fullName.trim()) {
      setErrorMessage("Please enter your full name");
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email");
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    if (isLogin) {
      const res = await login({ email: formData.email, password: formData.password });
      if (!res.success) {
        setErrorMessage(res.error || "Login failed");
      }
    } else {
      const res = await signup(formData);
      if (!res.success) {
        setErrorMessage(res.error || "Signup failed");
      }
    }
  };

  const handleQuickFill = (name, email, pass) => {
    setFormData({
      fullName: name,
      email: email,
      password: pass,
    });
    setErrorMessage("");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo-badge">
            <MessageSquare className="w-8 h-8 text-indigo-400" />
          </div>
          <h2 className="auth-title">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="auth-subtitle">
            {isLogin
              ? "Sign in to continue real-time conversations"
              : "Get started with your free real-time chat account"}
          </p>
        </div>

        {/* Tab switch */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${isLogin ? "active" : ""}`}
            onClick={() => {
              setIsLogin(true);
              setErrorMessage("");
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab ${!isLogin ? "active" : ""}`}
            onClick={() => {
              setIsLogin(false);
              setErrorMessage("");
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && <div className="auth-error-alert">{errorMessage}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-icon-wrapper">
                <User className="input-icon w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. Alice Walker"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-icon-wrapper">
              <Mail className="input-icon w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-icon-wrapper">
              <Lock className="input-icon w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn || isSigningUp}
            className="btn-auth-submit"
          >
            {isLoggingIn || isSigningUp ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Quick test helper for two users */}
        <div className="quick-test-section">
          <span className="quick-test-label">Quick Test Fill:</span>
          <div className="quick-test-buttons">
            <button
              type="button"
              onClick={() => handleQuickFill("Alice Smith", "alice@example.com", "password123")}
              className="btn-quick-fill"
            >
              Fill Alice
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill("Bob Jones", "bob@example.com", "password123")}
              className="btn-quick-fill"
            >
              Fill Bob
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
