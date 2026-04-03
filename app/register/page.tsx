"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const register = async () => {
    setMsg("");
    try {
      const res = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // ✅ BACKEND MATCH
      if (res.success) {
        setMsg("Account created! Redirecting...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setMsg("Registration failed");
      }
    } catch (e: any) {
      setMsg(e.message || "Registration failed");
    }
  };

  return (
    <div style={bg}>
      <div style={card}>
        <h2>Create PRELHE Account</h2>

        <input
          placeholder="Email"
          style={inp}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={inp}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {msg && <p style={{ color: "#D4AF37" }}>{msg}</p>}

        <button style={btn} onClick={register}>
          Register
        </button>

        <p style={{ marginTop: 20, color: "#aaa" }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

const bg = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#050c18,#0f2a44)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const card = {
  background: "#0a1931",
  padding: 50,
  borderRadius: 20,
  width: "100%",
  maxWidth: 420,
  color: "white",
  boxShadow: "0 40px 120px rgba(0,0,0,.8)",
};

const inp = {
  width: "100%",
  padding: 14,
  margin: "12px 0",
  background: "#050c18",
  border: "none",
  borderRadius: 10,
  color: "white",
  fontSize: 16,
};

const btn = {
  width: "100%",
  marginTop: 20,
  padding: 14,
  background: "#D4AF37",
  border: "none",
  borderRadius: 30,
  fontSize: 18,
  cursor: "pointer",
};
