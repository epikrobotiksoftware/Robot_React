import React, { useEffect, useState } from "react";
import "./speedSetCss.css";
function SpeedDividerBar({ dividing, setDividing }) {
  const fixed = Number(dividing).toFixed(2);

  function handleDecrease() {
    setDividing(+dividing - 0.1);
  }

  function handleIncrease() {
    setDividing(+dividing + 0.1);
  }

  return (
    <div className="speed_container">
      <button className="button-42" role="button" onClick={handleDecrease}>
        -
      </button>
      <input
        type="range"
        min="0.3"
        max="1.2"
        step="0.1"
        value={fixed}
        onChange={(event) => setDividing(event.target.value)}
      />
      <label>{fixed + " m/sn"}</label>

      <button className="button-42" role="button" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
}

export default SpeedDividerBar;
