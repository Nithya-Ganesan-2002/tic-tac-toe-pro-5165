//
// Backend API functions for authentication, gameplay, history, and leaderboard.
//

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000/api";

/**
 * Helper to get the auth token from localStorage.
 */
function getToken() {
  return localStorage.getItem("token");
}

/**
 * Helper to set the auth token in localStorage.
 */
function setToken(token) {
  localStorage.setItem("token", token);
}

// PUBLIC_INTERFACE
export async function register(username, password) {
  /**
   * Registers a user and returns {success, error}.
   */
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (res.ok) return { success: true };
  return { success: false, error: (await res.json()).detail || "Registration failed" };
}

// PUBLIC_INTERFACE
export async function login(username, password) {
  /**
   * Logs in a user and sets local token. Returns {success, error}.
   */
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (res.ok) {
    const data = await res.json();
    setToken(data.token); // expect {'token': ...}
    return { success: true };
  }
  return { success: false, error: (await res.json()).detail || "Login failed" };
}

// PUBLIC_INTERFACE
export function logout() {
  /**
   * Clears the locally stored token.
   */
  localStorage.removeItem("token");
}

// PUBLIC_INTERFACE
export async function startGame(opponentType = "ai") {
  /**
   * Start a new game. opponentType: "ai" or "human".
   * Returns: {game_id, board, ...}
   */
  const res = await fetch(`${API_BASE}/game/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ opponent: opponentType }),
  });
  return res.ok ? await res.json() : { error: "Failed to start game" };
}

// PUBLIC_INTERFACE
export async function makeMove(gameId, position) {
  /**
   * Make a move in the current game. Returns new game state.
   */
  const res = await fetch(`${API_BASE}/game/move`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ game_id: gameId, position }),
  });
  return res.ok ? await res.json() : { error: "Invalid move" };
}

// PUBLIC_INTERFACE
export async function getGameState(gameId) {
  /**
   * Get the state of a specific game.
   */
  const res = await fetch(`${API_BASE}/game/state?game_id=${encodeURIComponent(gameId)}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.ok ? await res.json() : { error: "Failed to fetch game state" };
}

// PUBLIC_INTERFACE
export async function getGameHistory() {
  /**
   * Fetch all games for the logged-in user as history.
   */
  const res = await fetch(`${API_BASE}/game/history`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.ok ? await res.json() : [];
}

// PUBLIC_INTERFACE
export async function getLeaderboard() {
  /**
   * Fetch leaderboard.
   */
  const res = await fetch(`${API_BASE}/leaderboard`);
  return res.ok ? await res.json() : [];
}

