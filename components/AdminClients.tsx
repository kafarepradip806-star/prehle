"use client";
import { useEffect, useState } from "react";
import AddClientForm from "@/components/AddclientForm";
import ClientList from "@/components/ClientList";


export default function AdminClients() {
  const [clients, setClients] = useState([]);

  const load = async () => {
    const res = await fetch("/api/clients");
    setClients(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40 }}>
      <AddClientForm onAdded={load} />
      <ClientList clients={clients} />
    </div>
  );
}
