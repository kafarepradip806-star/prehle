"use client";
import Modal from "@/components/ui/Modal";
import { useState } from "react";

export default function ConvertToTemplate({ project, onSave, close }: any) {
  const [name,setName]=useState(project.name);

  return (
    <Modal close={close}>
      <h2>Convert Project to Template</h2>
      <input value={name} onChange={e=>setName(e.target.value)} />

      <button onClick={() => onSave({ ...project, templateName: name })}>
        Save Template
      </button>
    </Modal>
  );
}
