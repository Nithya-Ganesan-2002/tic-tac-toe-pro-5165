import React, { useEffect, useState } from "react";
import { getGameHistory } from "./api";

/**
 * Displays user's past games (history).
 */
export default function GameHistory({ onSelectGame }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const items = await getGameHistory();
      setGames(items.reverse()); // newest first
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="game-history">
      <h3>Game History</h3>
      {loading ? <p>Loading...</p> : (
        <ul>
          {games.length === 0 && <li>No games played yet.</li>}
          {games.map(game =>
            <li key={game.id}>
              <button onClick={() => onSelectGame(game.id)}>
                vs {game.opponent_name || game.opponent} – {game.result}
              </button>
              <span>{(new Date(game.created_at)).toLocaleString()}</span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
