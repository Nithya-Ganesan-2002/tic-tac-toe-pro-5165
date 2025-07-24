import React from "react";

/**
 * Renders the 3x3 tic-tac-toe board and handles moves.
 */
export default function Board({ board, onSquareClick, disabled, lastMoveIdx }) {
  /*
    board: Array(9). Each value: 'X' | 'O' | null
    onSquareClick: function(i)
    disabled: boolean
    lastMoveIdx: highlight last move if this idx
  */
  function renderSquare(i) {
    return (
      <button
        className={"square" + (lastMoveIdx === i ? " highlight" : "")}
        key={i}
        onClick={() => onSquareClick(i)}
        disabled={disabled || board[i]}
        aria-label={board[i] || "empty"}
      >
        {board[i] || ""}
      </button>
    );
  }
  return (
    <div className="board">
      {[0, 1, 2].map(row =>
        <div className="board-row" key={row}>
          {[0, 1, 2].map(col => renderSquare(row * 3 + col))}
        </div>
      )}
    </div>
  );
}
