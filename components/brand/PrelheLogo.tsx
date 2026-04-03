export default function PrelheLogo({ size = 60 }: { size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{ filter: "drop-shadow(0 0 20px #D4AF37)" }}
      >
        <defs>
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>

        {/* Outer Hexagon */}
        <polygon
          points="50,5 90,25 90,75 50,95 10,75 10,25"
          fill="none"
          stroke="url(#gold)"
          strokeWidth="4"
        />

        {/* P letter */}
        <path
          d="M40 30 V70 M40 30 H60 Q72 30 72 42 Q72 54 60 54 H40"
          fill="none"
          stroke="url(#gold)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>

      <div>
        <div style={brand}>PRELHE</div>
        <div style={tag}>AI IT Company</div>
      </div>
    </div>
  );
}

const brand = {
  fontSize: 26,
  fontWeight: 900,
  background: "linear-gradient(90deg,#D4AF37,#ffffff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  letterSpacing: 2
};

const tag = {
  fontSize: 12,
  color: "#aaa",
  marginTop: -4
};
