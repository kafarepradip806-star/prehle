"use client";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

export default function MainMenu() {
  const { role } = useAuth();

  return (
    <>
      {/* Public */}
      <Link href="/" style={item}>Home</Link>
      <Link href="/services" style={item}>Services</Link>
      <Link href="/ai" style={item}>AI</Link>
      <Link href="/contact" style={item}>Contact</Link>
      <Link href="/pricing">Pricing</Link> |{" "}
      {/* Client only */}
      {role === "client" && (
        <>
          <Link href="/dashboard" style={item}>My Projects</Link>
          <Link href="/dashboard" style={item}>AI Studio</Link>
        </>
      )}

      {/* Admin only */}
      {role === "admin" && (
        <>
          <Link href="/admin" style={item}>Clients</Link>
          <Link href="/admin" style={item}>Revenue</Link>
        </>
      )}
    </>
  );
}

const item = {
  color: "#aaa",
  textDecoration: "none",
  fontSize: 15,
};
