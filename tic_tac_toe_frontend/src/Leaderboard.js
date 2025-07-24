import React, { useEffect, useState } from "react";
import { getLeaderboard } from "./api";

/**
 * Displays the leaderboard for tic-tac-toe.
 */
export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard().then(data => {
      setEntries(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      {loading ? <p>Loading...</p> : (
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Wins</th>
              <th>Games</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 && <tr><td colSpan="3">No leaderboard yet.</td></tr>}
            {entries.map(entry =>
              <tr key={entry.username}>
                <td>{entry.username}</td>
                <td>{entry.wins}</td>
                <td>{entry.games_played}</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
