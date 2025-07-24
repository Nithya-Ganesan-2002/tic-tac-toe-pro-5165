import React from "react";

/**
 * Choose between playing AI or human.
 */
export default function OpponentPicker({ selected, setSelected }) {
  return (
    <div className="opponent-picker">
      <label>Choose Opponent: </label>
      <button
        className={selected === "ai" ? "selected" : ""}
        onClick={() => setSelected("ai")}
      >
        AI
      </button>
      <button
        className={selected === "human" ? "selected" : ""}
        onClick={() => setSelected("human")}
      >
        Human
      </button>
    </div>
  );
}
