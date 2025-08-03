import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Assuming you have a CSS file for styling

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:3001/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.message === "Login Success") {
          const user = res.data.user;

          // 🔁 Navigate based on admin_type_id
          if (user.admin_type_id === 1) {
            navigate("/superDashboard");
          } else if (user.admin_type_id === 2) {
            navigate("/subDashboard");
          } else if (user.admin_type_id === 3) {
            navigate("/studentDashboard");
          } else {
            setMessage("Unknown admin type");
          }
        } else {
          setMessage(res.data.message);
        }
      })
      .catch((err) => {
        setMessage("Server error occurred");
      });
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>LOG IN</h2>
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        <p className="login-message">{message}</p>
      </div>
    </div>
  );
}
