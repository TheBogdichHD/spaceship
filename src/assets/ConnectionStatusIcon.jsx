export function ConnectionStatusIcon({ config }) {
  return (
    <svg width="120" height="80" className="connection-status-svg">
      {/* Signal waves */}
      {config.icon === "signal" && (
        <g>
          <svg
            data-slot="icon"
            aria-hidden="true"
            fill="none"
            stroke-width="1.5"
            stroke={config.color}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </g>
      )}

      {/* Scanning animation */}
      {config.icon === "scanning" && (
        <g>
          <circle
            cx="60"
            cy="40"
            r="8"
            fill="none"
            stroke={config.color}
            strokeWidth="2"
          >
            <animate
              attributeName="r"
              from="8"
              to="30"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="1"
              to="0"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="60" cy="40" r="6" fill={config.color} />
        </g>
      )}

      {/* Error icon */}
      {config.icon === "error" && (
        <g>
          <circle
            cx="60"
            cy="40"
            r="20"
            fill="none"
            stroke={config.color}
            strokeWidth="3"
          />
          <line
            x1="50"
            y1="30"
            x2="70"
            y2="50"
            stroke={config.color}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="70"
            y1="30"
            x2="50"
            y2="50"
            stroke={config.color}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}
