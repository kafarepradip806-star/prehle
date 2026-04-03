"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

/* ====== CORE UI ====== */
import FloatingAI from "@/components/ai/FloatingAI";
import HeroFlow from "@/components/home/Heroflow";
import RoleNotice from "@/components/ui/RoleNotice";

/* ====== HOME SECTIONS ====== */
import Stats from "@/components/home/Stats";
import ServiceCard from "@/components/ui/ServiceCard";
import Card3D from "@/components/ui/Card3D";
import Templates from "@/components/templates/Templates";
import Value from "@/components/home/Value";
import UseCases from "@/components/home/UseCases";

export default function Home() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <div style={bg}>
      {/* SYSTEM LAYERS */}
      <HeroFlow />
      <FloatingAI />
      <RoleNotice />

      {/* HERO */}
      <section style={hero}>
        <h1 style={title}>PRELHE</h1>
        <p style={tag}>AI-Powered Digital Product Factory</p>

        <div style={{ marginTop: 40 }}>
          {!role && (
            <>
              <Link href="/login"><button style={btn}>Login</button></Link>
              <Link href="/register"><button style={btnOutline}>Start Free</button></Link>
            </>
          )}
          {role === "client" && (
            <Link href="/dashboard"><button style={btn}>Client Dashboard</button></Link>
          )}
          {role === "admin" && (
            <Link href="/admin"><button style={btn}>Admin Panel</button></Link>
          )}
        </div>
      </section>

      {/* TRUST */}
      <Stats />

      {/* SERVICES */}
      <section style={section}>
        <h2 style={sectionTitle}>What we build</h2>
        <div style={grid}>
          <ServiceCard icon="🌐" title="Websites" desc="Business & startup websites" />
          <ServiceCard icon="📱" title="Mobile Apps" desc="Android & iOS apps" />
          <ServiceCard icon="🛒" title="E-Commerce" desc="Online stores with payments" />
          <ServiceCard icon="🤖" title="AI Systems" desc="Chatbots & automation" />
          <ServiceCard icon="🖥" title="Custom Software" desc="CRM, ERP & dashboards" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={darkSection}>
        <h2 style={sectionTitle}>How PRELHE works</h2>
        <div style={grid}>
          <Card3D><h3>Describe</h3><p>Tell us your idea</p></Card3D>
          <Card3D><h3>AI Builds</h3><p>AI designs the first draft</p></Card3D>
          <Card3D><h3>Preview</h3><p>See before paying</p></Card3D>
          <Card3D><h3>Pay</h3><p>Only if you like it</p></Card3D>
          <Card3D><h3>Launch</h3><p>We deliver & go live</p></Card3D>
        </div>
      </section>

      {/* TEMPLATES */}
      <section style={section}>
        <h2 style={sectionTitle}>Choose a ready-made template</h2>
        <Templates />
      </section>

      {/* WHY */}
      <section style={darkSection}>
        <h2 style={sectionTitle}>Why companies choose PRELHE</h2>
        <div style={grid}>
          <Card3D><h3>AI + Developers</h3><p>Best of both worlds</p></Card3D>
          <Card3D><h3>Live Preview</h3><p>See before you pay</p></Card3D>
          <Card3D><h3>Secure Payments</h3><p>100% safe</p></Card3D>
          <Card3D><h3>Fixed Pricing</h3><p>No hidden cost</p></Card3D>
        </div>
      </section>

      {/* ENTERPRISE VALUE */}
      <section style={section}>
        <h2 style={sectionTitle}>Enterprise-grade platform</h2>
        <Value />
      </section>

      {/* USE CASES */}
      <section style={darkSection}>
        <h2 style={sectionTitle}>What people build with PRELHE</h2>
        <UseCases />
      </section>

      {/* FINAL CTA */}
      <section style={cta}>
        <h2>Turn your idea into real software</h2>
        <Link href="/login"><button style={btn}>Start with AI</button></Link>
      </section>
    </div>
  );
}

/* ===== STYLES ===== */

const bg = { minHeight:"100vh", background:"#020712", color:"white", position:"relative", overflow:"hidden" };

const hero = { padding:"160px 20px", textAlign:"center", position:"relative", zIndex:5 };

const title = {
  fontSize:80, fontWeight:900,
  background:"linear-gradient(90deg,#D4AF37,#3b82f6,#fff)",
  WebkitBackgroundClip:"text",
  WebkitTextFillColor:"transparent"
};

const tag = { fontSize:22, color:"#aaa", marginTop:20 };

const btn = {
  margin:10,
  padding:"16px 50px",
  background:"linear-gradient(90deg,#D4AF37,#FFEE9A)",
  border:"none",
  borderRadius:40,
  fontSize:18,
  cursor:"pointer",
  boxShadow:"0 0 40px rgba(212,175,55,.8)"
};

const btnOutline = {
  ...btn,
  background:"transparent",
  border:"2px solid #D4AF37",
  color:"#D4AF37"
};

const section = { padding:"120px 60px", position:"relative", zIndex:5 };
const darkSection = { ...section, background:"#050c18" };
const sectionTitle = { fontSize:42, textAlign:"center", marginBottom:60 };

const grid = {
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",
  gap:40
};

const cta = {
  padding:120,
  textAlign:"center",
  background:"linear-gradient(135deg,#0f172a,#020712)"
};
