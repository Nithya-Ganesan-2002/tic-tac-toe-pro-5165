import React, { useState } from "react";
import { useAuth } from "./AuthContext";

/**
 * Shows a login/register form and manages auth.
 */
export default function AuthPanel() {
  const [tab, setTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const auth = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    let result;
    if (tab === "login") {
      result = await auth.login(username, password);
    } else {
      result = await auth.register(username, password);
    }
    if (result.success) {
      setMessage("Success!");
    } else {
      setMessage(result.error || "Authentication failed");
    }
  }

  return (
    <div className="auth-panel">
      <div className="auth-tabs">
        <button
          className={tab === "login" ? "active" : ""}
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button
          className={tab === "register" ? "active" : ""}
          onClick={() => setTab("register")}
        >
          Register
        </button>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          minLength={4}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">{tab === "login" ? "Login" : "Register"}</button>
      </form>
      {message && <div className="auth-msg">{message}</div>}
    </div>
  );
}
