"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { savePreview } from "@/lib/previewstore";

export default function AIForm({ template }: any) {
  const router = useRouter();

  const [brand, setBrand] = useState("");
  const [business, setBusiness] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!template || !template.title) {
      alert("Please select a template first");
      return;
    }

    if (!brand || !business) {
      alert("Please enter business name and type");
      return;
    }

    setLoading(true);

    const type =
      template.type ||
      (template.title.toLowerCase().includes("restaurant")
        ? "restaurant"
        : template.title.toLowerCase().includes("shop")
        ? "shop"
        : "business");

    const data = {
      brand,
      business,
      phone,
      email,
      city,
      template: {
        id: template.id,
        title: template.title,
        type
      },
      createdAt: new Date().toISOString()
    };

    const id = savePreview(data);

    setTimeout(() => {
      router.push("/preview/" + id);
    }, 800);
  };

  return (
    <div style={wrap}>
      <h3 style={title}>Tell us about your business</h3>

      <input
        style={input}
        placeholder="Brand / Business Name"
        onChange={(e) => setBrand(e.target.value)}
      />

      <input
        style={input}
        placeholder="Business Type (Restaurant, IT, Shop...)"
        onChange={(e) => setBusiness(e.target.value)}
      />

      <input
        style={input}
        placeholder="Phone Number"
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        style={input}
        placeholder="Email Address"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={input}
        placeholder="City"
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={submit} style={btn} disabled={loading}>
        {loading ? "Generating Preview..." : "Generate My Website"}
      </button>

      <p style={note}>
        Your website preview will be generated instantly using AI
      </p>
    </div>
  );
}

/* ========== STYLES ========== */

const wrap = {
  marginTop: 20,
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const title = {
  color: "#D4AF37",
  fontSize: 18,
  textAlign: "center",
};

const input = {
  padding: 14,
  borderRadius: 10,
  border: "none",
  background: "#f1f1f1",
  fontSize: 14,
};

const btn = {
  marginTop: 10,
  padding: "14px 30px",
  background: "#D4AF37",
  border: "none",
  borderRadius: 30,
  fontSize: 16,
  cursor: "pointer",
  boxShadow: "0 0 25px rgba(212,175,55,.6)",
};

const note = {
  fontSize: 12,
  color: "#aaa",
  textAlign: "center",
};
