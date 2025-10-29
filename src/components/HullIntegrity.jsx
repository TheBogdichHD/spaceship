import "../styles/HullIntegrity.css";
import { HullIntegrityIcon } from "../assets/HullIntegrityIcon";

export function HullIntegrity({ hull, maxHull = 100 }) {
  const percentage = (hull / maxHull) * 100;

  const getColor = () => {
    if (percentage > 70) return "#00ff88";
    if (percentage > 40) return "#FFC107";
    return "#F44336";
  };

  return (
    <div className="hull-integrity-container">
      <h3>HULL INTEGRITY</h3>

      <HullIntegrityIcon color={getColor()} percentage={percentage} />

      <div className="hull-percentage-display" style={{ color: getColor() }}>
        {Math.round(percentage)}%
      </div>

      <div className="hull-points">
        {hull} / {maxHull} HP
      </div>

      {percentage < 40 && (
        <div className="hull-warning">⚠ CRITICAL DAMAGE</div>
      )}

      {percentage === 0 && <div className="hull-destroyed">💥 DESTROYED</div>}
    </div>
  );
}

export default HullIntegrity;
