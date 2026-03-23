export default function DoodleBg({ dark = false }) {
  const color1 = dark ? "#F4A030" : "#C45E0A";
  const color2 = dark ? "#C45E0A" : "#7B1818";

  return (
    <div className="doodle-bg">
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        {/* Dashed circles at different radii */}
        <circle cx="200" cy="200" r="160" fill="none" stroke={color1} strokeWidth="0.8" strokeDasharray="8 6" />
        <circle cx="200" cy="200" r="120" fill="none" stroke={color2} strokeWidth="0.8" strokeDasharray="8 6" />
        <circle cx="200" cy="200" r="80" fill="none" stroke={color1} strokeWidth="0.8" strokeDasharray="8 6" />
        <circle cx="200" cy="200" r="40" fill="none" stroke={color2} strokeWidth="0.8" strokeDasharray="8 6" />

        {/* Ellipses rotated at 30 degree intervals */}
        {[0, 30, 60, 90, 120, 150].map((angle) => (
          <ellipse
            key={angle}
            cx="200"
            cy="200"
            rx="160"
            ry="40"
            fill="none"
            stroke={angle % 60 === 0 ? color1 : color2}
            strokeWidth="0.8"
            transform={`rotate(${angle} 200 200)`}
          />
        ))}

        {/* 8 small teardrop petals around outer ring */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <path
            key={angle}
            d="M200 50 C196 38 196 28 200 22 C204 28 204 38 200 50Z"
            fill="none"
            stroke={color1}
            strokeWidth="0.8"
            transform={`rotate(${angle} 200 200)`}
          />
        ))}

        {/* Centre dot */}
        <circle cx="200" cy="200" r="3" fill="none" stroke={color2} strokeWidth="0.8" />
      </svg>
    </div>
  );
}