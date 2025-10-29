export function FuelGaugeIcon({
  color,
  radius,
  circumference,
  strokeDashoffset,
  percentage,
  fuel,
  maxFuel,
}) {
  return (
    <svg width="120" height="120" className="fuel-gauge-svg">
      {/* Background circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke="#1a1f3a"
        strokeWidth="10"
      />

      {/* Progress circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
        style={{
          transition: "stroke-dashoffset 0.5s ease, stroke 0.3s ease",
        }}
      />

      {/* Center text */}
      <text
        x="60"
        y="60"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="24"
        fontWeight="bold"
        fill={color}
      >
        {Math.round(percentage)}%
      </text>

      {/* Fuel amount */}
      <text x="60" y="78" textAnchor="middle" fontSize="12" fill="#aaa">
        {fuel}/{maxFuel}
      </text>
    </svg>
  );
}
