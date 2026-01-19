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

VERY IMPORTANT:
You MUST respond ONLY in valid JSON like this:

{
  "resp": "text shown to user",
  "ui": "text | groupSize | budget | number_of_days | final"
}

Never return markdown, explanations, or plain text.
`;

const FINAL_PROMPT = `
You are now generating the FINAL trip plan.

Return ONLY valid JSON.
NO text outside JSON.

const FINAL_PROMPT = Generate Travel Plan with give details, give me Hotels options list with HotelName,
Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url,
Geo Coordinates, Place address, ticket Pricing, Time travel each of the location , with each day plan with best time to visit in JSON format.
Output Schema:
{
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

export async function POST(req: NextRequest) {
  try {
    const { messages, isFinal } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        { role: "system", content: isFinal ? FINAL_PROMPT : PROMPT },
        ...messages,
      ],
      temperature: 0.2,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("Empty AI response");

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json({
        resp: content,
        ui: "text",
      });
    }

    if (!ALLOWED_UI.has(parsed.ui)) {
      parsed.ui = "text";
    }

    return NextResponse.json(parsed);
  } catch (e: any) {
    if (e.code === 429) {
      return NextResponse.json({
        resp: "Too many requests. Please wait a bit 🙂",
        ui: "error",
      });
    }

    return NextResponse.json(
      { resp: "Something went wrong", ui: "error" },
      { status: 500 }
    );
  }
}