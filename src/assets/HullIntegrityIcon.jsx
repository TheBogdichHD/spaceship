export function HullIntegrityIcon({ color, percentage }) {
  const barWidth = 100;
  const barHeight = 20;
  const filledWidth = (percentage / 100) * barWidth;

  return (
    <svg width="120" height="100" className="hull-integrity-svg">
      {/* Progress bar background */}
      <rect
        x="10"
        y="40"
        width={barWidth}
        height={barHeight}
        fill="#1a1f3a"
        stroke="#444"
        strokeWidth="2"
        rx="4"
      />

      {/* Progress bar fill */}
      <rect
        x="10"
        y="40"
        width={filledWidth}
        height={barHeight}
        fill={color}
        rx="4"
        style={{
          transition: "width 0.5s ease, fill 0.3s ease",
        }}
      />

      {/* Segment dividers (optional) */}
      {[...Array(10)].map((_, i) => (
        <line
          key={i}
          x1={10 + (i * barWidth) / 10}
          y1="40"
          x2={10 + (i * barWidth) / 10}
          y2={40 + barHeight}
          stroke="#000"
          strokeWidth="1"
          opacity="0.3"
        />
      ))}

      {/* Border overlay for crisp edges */}
      <rect
        x="10"
        y="40"
        width={barWidth}
        height={barHeight}
        fill="none"
        stroke="#00ff88"
        strokeWidth="2"
        rx="4"
      />
    </svg>
  );
}
