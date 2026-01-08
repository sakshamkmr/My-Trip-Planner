import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const PROMPT = `You are an AI Trip Planner Agent.

Ask ONE question at a time.

Respond ONLY with valid JSON:
{
  "resp": "Text Resp",
  "ui": "source/destination/groupSize/budget/TripDuration/Final"
}

NO explanations. NO markdown. NO extra text.
`;

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "AI Trip Planner",
  },
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      throw new Error("Messages must be an array");
    }

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      messages: [
        { role: "system", content: PROMPT },
        ...messages,
      ],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Empty AI response");
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
      
    } catch {
      // 🔥 Extract JSON if model adds extra text
      const match = content.match(/\{[\s\S]*\}/);
      if (!match) {
        console.error("RAW AI OUTPUT:", content);
        throw new Error("No JSON found in AI response");
      }
      parsed = JSON.parse(match[0]);
      
    }
    console.log("✅ FINAL AI RESPONSE:", parsed);
    

    return NextResponse.json(parsed);
  } catch (e: any) {
    console.error("AI ROUTE ERROR:", e);
    return NextResponse.json(
      { error: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
