import "../styles/SpaceMap.css";

export function SpaceMap({
  position,
  items,
  size = { width: 800, height: 600 },
}) {
  const { width, height } = size;

  const getItemIcon = (item) => {
    switch (item.type) {
      case "spaceship":
        return (
          <g key={`${item.x}-${item.y}`}>
            <polygon
              points={`${item.x},${item.y - 8} ${item.x - 6},${item.y + 8} ${
                item.x + 6
              },${item.y + 8}`}
              fill="#888"
              stroke="#aaa"
              strokeWidth="1"
            />
            <text
              x={item.x}
              y={item.y + 20}
              fontSize="10"
              fill="#aaa"
              textAnchor="middle"
            >
              {item.name}
            </text>
          </g>
        );

      case "asteroid":
        return (
          <circle
            key={`${item.x}-${item.y}`}
            cx={item.x}
            cy={item.y}
            r="6"
            fill="#666"
            stroke="#999"
            strokeWidth="1"
          />
        );

      case "fuel":
        return (
          <g key={`${item.x}-${item.y}`}>
            <rect
              x={item.x - 5}
              y={item.y - 8}
              width="10"
              height="16"
              rx="2"
              fill="#4CAF50"
              stroke="#66BB6A"
              strokeWidth="1"
            />
            <rect
              x={item.x - 3}
              y={item.y - 10}
              width="6"
              height="4"
              fill="#66BB6A"
            />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-map-container">
      <svg width={width} height={height} className="space-map-svg">
        {/* Background stars */}
        {[...Array(100)].map((_, i) => (
          <circle
            key={`star-${i}`}
            cx={Math.random() * width}
            cy={Math.random() * height}
            r="1"
            className="star"
            style={{ opacity: Math.random() * 0.5 + 0.3 }}
          />
        ))}

        {/* Render items */}
        {items.map((item) => getItemIcon(item))}

        {/* Collection radius indicator */}
        <circle
          cx={position.x}
          cy={position.y}
          r="10"
          fill="none"
          stroke="#00ff88"
          strokeWidth="1"
          strokeDasharray="2,2"
          opacity="0.3"
        />

        {/* Player spaceship */}
        <g>
          {/* Ship body */}
          <polygon
            points={`${position.x},${position.y - 6} ${position.x - 4},${
              position.y + 6
            } ${position.x + 4},${position.y + 6}`}
            fill="#00ff88"
            stroke="#00cc66"
            strokeWidth="2"
          />
        </g>

        {/* Coordinates display */}
        <text
          x={width - 10}
          y={height - 10}
          fontSize="12"
          fill="#00ff88"
          textAnchor="end"
        >
          X: {position.x} Y: {position.y}
        </text>
      </svg>
    </div>
  );
}

export default SpaceMap;
