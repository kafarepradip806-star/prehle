"use client";
import Modal from "@/components/ui/Modal";
import AIForm from "./AIForm";

export default function TemplatePreview({ template, close }: any) {
  if (!template) return null;

  return (
    <Modal close={close}>
      <h2>{template.title}</h2>
      <img src={template.img} style={{ width: "100%", borderRadius: 20 }} />
      <p>{template.type}</p>

      <AIForm onGenerate={(data:any)=>alert("AI will generate preview for "+data.brand)} />
    </Modal>
  );
}
