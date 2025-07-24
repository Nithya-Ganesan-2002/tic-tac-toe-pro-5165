import React, { useState, useEffect } from "react";
import "./App.css";
import { AuthProvider, useAuth } from "./AuthContext";
import AuthPanel from "./AuthPanel";
import GameArea from "./GameArea";
import GameHistory from "./GameHistory";
import Leaderboard from "./Leaderboard";

// PUBLIC_INTERFACE
function MainApp() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const { loggedIn, logout, user } = useAuth();

  // Integrating history/game area selection (replay)
  const [gameToReplay, setGameToReplay] = useState(null);

  return (
    <div className="App">
      <header className="App-header" style={{ padding: 0, minHeight: "unset" }}>
        <button
          className="theme-toggle"
          onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <nav className="navbar" style={{
          background: "var(--bg-secondary)",
          padding: "0.7em 2.5em", marginBottom: "1.5em",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderRadius: "0 0 1.1rem 1.1rem"
        }}>
          <span className="title" style={{ fontWeight: "bold", fontSize: "2em", color: "#1976D2" }}>
            Tic Tac Toe Pro
          </span>
          <span>
            {loggedIn && (
              <>
              <span style={{marginRight: "1em"}}>👤 {user}</span>
              <button style={{background: "var(--button-bg)", color: "var(--button-text)", border: "none", padding: "8px 14px", borderRadius: 8, fontSize: "1em", cursor: "pointer"}} onClick={logout}>Logout</button>
              </>
            )}
          </span>
        </nav>
        <main style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "stretch",
          minHeight: "65vh",
          gap: "2.5em"
        }}>
          <section style={{ minWidth: 320, flex: "0 1 370px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {!loggedIn ? <AuthPanel /> : <GameHistory onSelectGame={setGameToReplay} />}
          </section>
          <section style={{ flex: "1 1 420px", maxWidth: 540 }}>
            {loggedIn ? <GameArea authUser={user} replayId={gameToReplay}/> : (
              <div style={{marginTop: 90, color: "#888"}}>Please login or register to play.</div>
            )}
          </section>
          <section style={{ minWidth: 320, flex: "0 1 380px" }}>
            <Leaderboard />
          </section>
        </main>
        <footer style={{
          marginTop: 30, padding: "14px 0",
          color: "var(--text-secondary)",
          fontSize: "1em",
          background: "var(--bg-secondary)",
          borderRadius: "1.3em 1.3em 0 0"
        }}>
          &copy; {new Date().getFullYear()} Tic Tac Toe Pro. Created with <span style={{color:"#E87A41"}}>Kavia</span>.
        </footer>
      </header>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
