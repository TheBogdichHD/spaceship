import "../styles/FuelGauge.css";
import { FuelGaugeIcon } from "../assets/FuelGaugeIcon";

export function FuelGauge({ fuel, maxFuel = 100 }) {
  const percentage = (fuel / maxFuel) * 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage > 60) return "#4CAF50";
    if (percentage > 30) return "#FFC107";
    return "#F44336";
  };

  return (
    <div className="fuel-gauge-container">
      <h3>FUEL</h3>
      <FuelGaugeIcon
        color={getColor()}
        radius={radius}
        circumference={circumference}
        strokeDashoffset={strokeDashoffset}
        percentage={percentage}
        fuel={fuel}
        maxFuel={maxFuel}
      />

      {percentage < 30 && <div className="fuel-warning">⚠ LOW FUEL</div>}
    </div>
  );
}

export default FuelGauge;
