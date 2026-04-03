import type { AIMessage } from "./types";

export default function Message({ message }: { message: AIMessage }) {
  return (
    <div
      style={{
        marginBottom: 14,
        display: "flex",
        justifyContent:
          message.role === "user" ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: "80%",
          background:
            message.role === "user" ? "#2563eb" : "#1f2937",
          padding: 12,
          borderRadius: 12,
        }}
      >
        {message.blocks.map((b, i) => {
          if (b.type === "text") {
            return (
              <p key={i} style={{ marginBottom: 8 }}>
                {b.value}
              </p>
            );
          }

          if (b.type === "template") {
            return (
              <div
                key={i}
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: 12,
                  borderRadius: 10,
                  marginTop: 10,
                }}
              >
                <h4>{b.name}</h4>
                {b.price && (
                  <p style={{ opacity: 0.7 }}>₹{b.price}</p>
                )}

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginTop: 8,
                  }}
                >
                  <a href={b.preview} target="_blank">
                    Preview
                  </a>
                  {b.buy && (
                    <a
                      href={b.buy}
                      target="_blank"
                      style={{ color: "#22c55e" }}
                    >
                      Buy
                    </a>
                  )}
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
