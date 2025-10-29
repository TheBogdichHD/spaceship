import "../styles/ConnectionStatus.css";
import { ConnectionStatusIcon } from "../assets/ConnectionStatusIcon";

export function ConnectionStatus({ status, errorMessage }) {
  const getStatusConfig = () => {
    switch (status) {
      case "connected":
        return {
          color: "#4CAF50",
          text: "CONNECTED",
          icon: "signal",
        };
      case "scanning":
        return {
          color: "#2196F3",
          text: "SCANNING...",
          icon: "scanning",
        };
      case "error":
        return {
          color: "#F44336",
          text: "CONNECTION LOST",
          icon: "error",
        };
      default:
        return {
          color: "#888",
          text: "UNKNOWN",
          icon: "unknown",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="connection-status-container">
      <h3>BASE CONNECTION</h3>

      <ConnectionStatusIcon config={config} />

      <div className="connection-status-text" style={{ color: config.color }}>
        {config.text}
      </div>

      {errorMessage && (
        <div className="connection-status-error-message">{errorMessage}</div>
      )}
    </div>
  );
}

export default ConnectionStatus;
