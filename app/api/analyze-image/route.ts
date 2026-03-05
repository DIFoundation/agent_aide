import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { VISION_DISASTER_PROMPT } from "@/lib/ai/visionPrompt";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get("image") as File;

  const bytes = await image.arrayBuffer();

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview"
  });

  const result = await model.generateContent([
    VISION_DISASTER_PROMPT,
    {
      inlineData: {
        data: Buffer.from(bytes).toString("base64"),
        mimeType: image.type
      }
    }
  ]);

  const text = result.response.text();

  try {
    const parsed = JSON.parse(text);

    return NextResponse.json({
      success: true,
      data: parsed
    });

  } catch {
    return NextResponse.json({
      success: false,
      raw: text
    });
  }
}