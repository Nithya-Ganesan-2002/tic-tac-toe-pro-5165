import React, { useEffect, useState } from "react";
import { startGame, makeMove, getGameState } from "./api";
import Board from "./Board";
import OpponentPicker from "./OpponentPicker";

/**
 * Manages a game session (state, moves).
 */
export default function GameArea({ authUser }) {
  const [game, setGame] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [opponent, setOpponent] = useState("ai");
  const [info, setInfo] = useState("");
  const [myTurn, setMyTurn] = useState(true);
  const [lastMove, setLastMove] = useState(null);

  // Start new game
  async function handleStart(opType) {
    setInfo("Starting game...");
    setGame(null);
    setBoard(Array(9).fill(null));
    const res = await startGame(opType || opponent);
    if (res && res.board) {
      setGame(res);
      setBoard(res.board);
      setMyTurn(res.next_player === authUser);
      setInfo("");
    } else {
      setInfo(res.error || "Failed to start game");
    }
    setLastMove(null);
  }

  // Move
  async function handleMove(idx) {
    if (!game || !myTurn || board[idx]) return;
    setInfo("");
    const res = await makeMove(game.game_id || game.id, idx);
    if (res && res.board) {
      setBoard(res.board);
      setGame(res);
      setMyTurn(res.next_player === authUser);
      setLastMove(idx);
      if (res.winner || res.draw) {
        setInfo(
          res.winner ? (res.winner === authUser ? "You win!" : "You lose!") : "It's a draw."
        );
      }
    } else {
      setInfo(res.error || "Move failed");
    }
  }

  // Show game state if game changes externally (e.g. replay)
  async function handleLoadGame(id) {
    setInfo("Loading game...");
    const res = await getGameState(id);
    if (res && res.board) {
      setBoard(res.board);
      setGame(res);
      setMyTurn(res.next_player === authUser);
      setInfo("");
      setLastMove(null);
    } else {
      setInfo(res.error || "Game not found");
    }
  }

  // Reset
  function reset() {
    setGame(null);
    setBoard(Array(9).fill(null));
    setInfo("");
    setLastMove(null);
  }

  return (
    <div className="game-area">
      <OpponentPicker selected={opponent} setSelected={setOpponent} />
      <button onClick={() => handleStart(opponent)}>
        Start New Game
      </button>
      <Board
        board={board}
        onSquareClick={handleMove}
        disabled={!game || !myTurn || game.winner || game.draw}
        lastMoveIdx={lastMove}
      />
      <div className="game-info">{info}</div>
      <button onClick={reset} disabled={!game}>Reset</button>
      {/* Handler for loading old game from history would be injected here */}
    </div>
  );
}
