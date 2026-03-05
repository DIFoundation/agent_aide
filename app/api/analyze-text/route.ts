import { NextResponse } from "next/server";
import { disasterModel } from "@/lib/ai/gemini";
import { parseAIResponse } from "@/lib/ai/responseParser";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const result = await disasterModel.generateContent(message);

    const response = await result.response;
    const text = parseAIResponse(response.text());

    return NextResponse.json({ data: text });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return NextResponse.json(
      { error: error.message || "AI processing failed" },
      { status: 500 }
    );
  }
}
