import { authService } from "../services/authService";
import React, { useState, ChangeEvent } from "react";
import { role } from "@fixlance/core";
import "./login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "client",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const response = await authService.login({
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", response.data.token);
        console.log("Login successful:", response);
      } else {
        const response = await authService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role as role,
        });

        localStorage.setItem("token", response.data.token);
        console.log("Register successful:", response);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <h1 className="login-title">Fixlance</h1>
          <p className="login-subtitle">Connect with certified professionals</p>
        </div>

        <div className="login-card">
          <div className="login-tabs">
            <button
              onClick={() => setIsLogin(true)}
              className={`login-tab ${isLogin ? "active" : ""}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`login-tab ${!isLogin ? "active" : ""}`}
            >
              Register
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div>
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                Password
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
            </div>

            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Register as</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="role"
                      value="client"
                      checked={formData.role === "client"}
                      onChange={handleChange}
                      className="radio-input"
                    />
                    <span>Client</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="role"
                      value="technician"
                      checked={formData.role === "technician"}
                      onChange={handleChange}
                      className="radio-input"
                    />
                    <span>Technician</span>
                  </label>
                </div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="submit-button"
              disabled={loading}
            >
              {loading ? "Loading..." : isLogin ? "Login" : "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
