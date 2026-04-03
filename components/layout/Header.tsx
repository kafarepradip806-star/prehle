"use client";

import PrelheLogo from "@/components/brand/PrelheLogo";
import MainMenu from "@/components/layout/MainMenu";
import Menu from "@/components/layout/Menu";

export default function Header() {
  return (
    <header style={bar}>
      <PrelheLogo size={50} />

      <nav style={nav}>
        {/* Public + Role based links */}
        <MainMenu />

        {/* Login / Dashboard / Logout */}
        <Menu />
      </nav>
    </header>
  );
}

/* ========== STYLES ========== */

const bar = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 40px",
  background: "rgba(2,7,18,.95)",
  backdropFilter: "blur(12px)",
  borderBottom: "1px solid rgba(255,255,255,.05)",
};

const nav = {
  display: "flex",
  alignItems: "center",
  gap: 30,
};
