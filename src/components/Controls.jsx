import "../styles/Controls.css";

export function Controls({ onMove, onScan, disabled, isMoving }) {
  const handleMove = (direction) => {
    if (!disabled && !isMoving) {
      onMove(direction);
    }
  };

  const handleScan = () => {
    if (!disabled && !isMoving) {
      onScan();
    }
  };

  return (
    <div className="controls-container">
      <h3>CONTROLS</h3>

      <div className="controls-directional">
        <div></div>
        <button
          onClick={() => handleMove("up")}
          disabled={disabled || isMoving}
          className="control-button"
        >
          ▲
        </button>
        <div></div>

        <button
          onClick={() => handleMove("left")}
          disabled={disabled || isMoving}
          className="control-button"
        >
          ◄
        </button>
        <button
          onClick={() => handleMove("down")}
          disabled={disabled || isMoving}
          className="control-button"
        >
          ▼
        </button>
        <button
          onClick={() => handleMove("right")}
          disabled={disabled || isMoving}
          className="control-button"
        >
          ►
        </button>
      </div>

      <div className="controls-action-buttons">
        <button
          onClick={handleScan}
          disabled={disabled || isMoving}
          className="control-button"
        >
          📡 SCAN
        </button>
      </div>

      {isMoving && <div className="status-indicator">⏳ PROCESSING...</div>}

      <div className="controls-instructions">
        <div>
          <strong>Movement:</strong> Use arrow buttons to navigate
        </div>
        <div>
          <strong>Scan:</strong> Detect nearby objects
        </div>
        <div>
          <strong>Note:</strong> Each move consumes fuel
        </div>
      </div>
    </div>
  );
}

export default Controls;
