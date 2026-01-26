import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";


const PROMPT = `
You are an AI Trip Planner Agent.


RULES (STRICT):
- Ask ONLY ONE question at a time
- Follow this order strictly:
 1. Starting location
 2. Destination
 3. Group size
 4. Budget
 5. Number of days
 6. Interests
 7. Preferences
- DO NOT skip steps
- DO NOT summarize
- DO NOT generate final plan early


Respond ONLY in valid JSON:


{
  "resp": "text shown to user",
  "ui": "text | groupSize | budget | number_of_days | final"
}
`;


const FINAL_PROMPT = `
You are now generating the FINAL trip plan.


Return ONLY valid JSON.
NO text outside JSON.


Output format MUST be exactly this:


{
  "ui": "final",
  "resp": {
    "trip_plan": {
      "destination": "string",
      "duration": "string",
      "origin": "string",
      "budget": "string",
      "group_size": "string",
      "hotels": [
        {
          "hotel_name": "string",
          "hotel_address": "string",
          "price_per_night": "string",
          "hotel_image_url": "string",
          "geo_coordinates": {
            "latitude": "number",
            "longitude": "number"
          },
          "rating": "number",
          "description": "string"
        }
      ],
      "itinerary": [
        {
          "day": "number",
          "day_plan": "string",
          "best_time_to_visit_day": "string",
          "activities": [
            {
              "place_name": "string",
              "place_details": "string",
              "place_image_url": "string",
              "geo_coordinates": {
                "latitude": "number",
                "longitude": "number"
              },
              "place_address": "string",
              "ticket_pricing": "string",
              "time_travel_each_location": "string",
              "best_time_to_visit": "string"
            }
          ]
        }
      ]
    }
  }
}
`;


const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "AI Trip Planner",
  },
});


const ALLOWED_UI = new Set([
  "text",
  "groupSize",
  "budget",
  "number_of_days",
  "final",
  "error",
]);


function extractJSON(content: string): string | null {
  const cleaned = content
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .replace(/^\s*[^\{]*\{/gm, "{")  // New: Skip leading non-JSON text
    .replace(/\}\s*[^\}]*$/gm, "}")  // New: Skip trailing non-JSON text
    .trim();


  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;


  const jsonStr = cleaned.slice(start, end + 1);
  
  // New: Test parse before returning
  try {
    JSON.parse(jsonStr);
    return jsonStr;
  } catch {
    return null;
  }
}



export async function POST(req: NextRequest) {
  try {
    const { messages, isFinal } = await req.json();


    const model = isFinal 
      ? "google/gemini-2.0-flash-thinking-exp:free"  // FREE + Excellent JSON
      : "mistralai/devstral-2512:free";              // FREE + Good for Q&A

    const completion = await openai.chat.completions.create({
      model,
      temperature: isFinal ? 0.1 : 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: isFinal ? FINAL_PROMPT : PROMPT },
        ...messages,
      ],
    });




    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error("Empty AI response");


    const jsonText = extractJSON(raw);
    if (!jsonText) {
      return NextResponse.json({
        ui: "error",
        resp: "Something went wrong. Please try again.",
      });
    }


    let parsed: any;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      return NextResponse.json({
        ui: "error",
        resp: "Something went wrong. Please try again.",
      });
    }


    if (!ALLOWED_UI.has(parsed.ui)) {
      parsed.ui = "text";
    }


    if (parsed.ui !== "final") {
      if (typeof parsed.resp !== "string") {
        parsed.resp =
          parsed.resp?.resp ||
          parsed.resp?.message ||
          "Please continue.";
      }
    }


    if (parsed.ui === "final") {
      if (
        typeof parsed.resp !== "object" ||
        parsed.resp === null ||
        !parsed.resp.trip_plan
      ) {
        return NextResponse.json({
          ui: "error",
          resp: "Failed to generate trip plan. Please try again.",
        });
      }
    }


    return NextResponse.json(parsed);
  } catch (e: any) {
    if (e?.code === 429) {
      return NextResponse.json({
        ui: "error",
        resp: "Too many requests. Please wait a bit 🙂",
      });
    }


    return NextResponse.json({
      ui: "error",
      resp: "Something went wrong",
    });
  }
}
