"use client";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

export default function Menu() {
  const { role, logout } = useAuth();

  if (!role) {
    return (
      <>
        <Link href="/login" style={link}>Login</Link>
        <Link href="/register" style={btn}>Start</Link>
      </>
    );
  }

  if (role === "client") {
    return (
      <>
        <Link href="/dashboard" style={btn}>Dashboard</Link>
        <button onClick={logout} style={logoutBtn}>Logout</button>
      </>
    );
  }

  return (
    <>
      <Link href="/admin" style={btn}>Admin</Link>
      <button onClick={logout} style={logoutBtn}>Logout</button>
    </>
  );
}

/* styles */

const link = {
  color: "#aaa",
  textDecoration: "none",
  fontSize: 16,
};

const btn = {
  padding: "10px 26px",
  background: "#D4AF37",
  borderRadius: 30,
  color: "#000",
  textDecoration: "none",
  fontWeight: 600,
};

const logoutBtn = {
  padding: "10px 20px",
  background: "transparent",
  border: "1px solid #D4AF37",
  borderRadius: 20,
  color: "#D4AF37",
  cursor: "pointer",
};
