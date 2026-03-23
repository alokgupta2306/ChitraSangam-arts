export default function Logo({ dark = false }) {
  return (
    <div className="flex items-center gap-3">
      {/* SVG Logo Icon */}
      <svg
        viewBox="0 0 200 200"
        width="70"
        height="70"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1 — 8 Outer Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <path
            key={angle}
            d="M100 92 C89 69 89 44 100 30 C111 44 111 69 100 92Z"
            fill="#D4520A"
            transform={`rotate(${angle} 100 92)`}
          />
        ))}

        {/* Layer 2 — 8 Inner Petals */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
          <path
            key={angle}
            d="M100 92 C94 76 94 60 100 50 C106 60 106 76 100 92Z"
            fill="#F4A030"
            opacity="0.85"
            transform={`rotate(${angle} 100 92)`}
          />
        ))}

        {/* Layer 3 — 3 Centre Circles */}
        <circle cx="100" cy="92" r="16" fill="#F4A030" />
        <circle cx="100" cy="92" r="10" fill="#C45E0A" />
        <circle cx="100" cy="92" r="4" fill="#7B1818" />

        {/* Layer 4 — Paintbrush Handle */}
        <rect x="97" y="104" width="6" height="54" rx="3" fill="#5A2A00" />
        <ellipse cx="100" cy="160" rx="9" ry="4" fill="#7B3A00" opacity="0.4" />
      </svg>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <div>
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              fontSize: "50px",
              color: dark ? "#F4A030" : "#C45E0A",
              fontWeight: 600,
            }}
          >
            Chitra
          </span>
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              fontSize: "50px",
              color: dark ? "#E8C8A0" : "#7B1818",
              fontWeight: 600,
            }}
          >
            Sangam
          </span>
        </div>
        <span
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "25px",
            letterSpacing: "0.4em",
            color: dark ? "#E8C8A0" : "#AAAAAA",
          }}
        >
          A R T S
        </span>
      </div>
    </div>
  );
}