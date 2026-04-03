import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const NEST_BACKEND = "http://localhost:3001";
const AUTODEV_AI = process.env.AUTODEV_AI_URL!;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  // ✅ IMPORTANT: forward cookies PROPERLY
  const cookie = req.cookies.toString();

  const authRes = await fetch(`${NEST_BACKEND}/auth/me`, {
    method: "GET",
    headers: {
      Cookie: cookie,
    },
    credentials: "include", // 🔥 VERY IMPORTANT
  });

  if (!authRes.ok) {
    return NextResponse.json(
      {
        reply: {
          role: "assistant",
          content: "❌ Please login to continue.",
        },
      },
      { status: 401 }
    );
  }

  const user = await authRes.json();
  const userId = user.id;

  // 🧠 SYSTEM PROMPT
  const systemPrompt = `
You are Prelhe AutoDev AI Architect.

USER_ID=${userId}

Rules:
- Ask deep questions
- Cross-check everything
- Do not proceed without confirmation
- On confirmation return FINAL JSON only
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages,
    ],
  });

  const reply = completion.choices[0].message;

  // 🚀 CALL AUTODEV AI ONLY ON FINAL JSON
  if (reply.content?.trim().startsWith("{")) {
    await fetch(`${AUTODEV_AI}/create-project`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        spec: JSON.parse(reply.content),
      }),
    });
  }

  return NextResponse.json({ reply });
}
