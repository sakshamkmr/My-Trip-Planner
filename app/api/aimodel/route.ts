  import { NextRequest, NextResponse } from "next/server";
  import OpenAI from "openai";

  const PROMPT = `You are an AI Trip Planner Agent.

  You must ALWAYS respond in valid JSON.
  Do NOT include explanations, markdown, or extra text.

  Ask ONE relevant trip-related question at a time, strictly in this order:
  1. Starting location (source)
  2. Destination city or country
  3. Group size (Solo, Couple, Family, Friends)
  4. Budget (Low, Medium, High)
  5. Trip duration (number of days)
  6. Travel interests
  7. Special requirements

  Return ONLY this JSON schema on EVERY response:

  {
    "resp": "Your message to the user",
    "ui": "groupSize | budget | number_of_days | final"
  }

  Rules:
  - ui must be EXACTLY one of: groupSize, budget, number_of_days, final
  - Ask only ONE question at a time
  - When all info is collected, set ui to "final"
  - Never return plain text`

const FINAL_PROMPT = `Generate Travel Plan with give details, give me Hotels options list with HotelName,
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


  `
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY!,
    defaultHeaders: {
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "AI Trip Planner",
    },
  });
  function detectUIFromText(text: string) {
    const lower = text.toLowerCase();

    
    if (lower.includes('how many days') || lower.includes('number of days'))
      return 'number_of_days';

    if (lower.includes('budget'))
      return 'budget';

    if (lower.includes('group'))
      return 'groupSize';

    return null;
  }



  export async function POST(req: NextRequest) {
    try {
      const { messages,isFinal } = await req.json();

      if (!Array.isArray(messages)) {
        throw new Error("Messages must be an array");
      }

      const completion = await openai.chat.completions.create({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          { role: "system", content: isFinal ? FINAL_PROMPT : PROMPT },
          ...messages,
        ],
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error("Empty AI response");
      }

      
      let parsed;

  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found');

    parsed = JSON.parse(jsonMatch[0]);
  } catch {
    parsed = {
      resp: content,
      ui: detectUIFromText(content) ?? 'final',
    };
  }


      console.log("✅ FINAL AI RESPONSE:", parsed);
      

      return NextResponse.json(parsed);
    }catch (e: any) {
  if (e.code === 429) {
    return NextResponse.json(
      {
        resp: "I'm getting too many requests right now. Please try again in a bit 🙂",
        ui: "error"
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { error: e.message || "Internal Server Error" },
    { status: 500 }
  );
}

  }
