import React, { useState, ChangeEvent } from "react";
import "./login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "client",
  });

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
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

            <button onClick={handleSubmit} className="submit-button">
              {isLogin ? "Login" : "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
