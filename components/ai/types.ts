export type MessageBlock =
  | { type: "text"; value: string }
  | {
      type: "template";
      id: string;
      name: string;
      price?: number;
      preview: string;
      buy?: string;
    };

export interface AIMessage {
  id: string;
  role: "user" | "ai";
  blocks: MessageBlock[];
  time: number;
}
