import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { DISASTER_SYSTEM_PROMPT } from "@/lib/ai/prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get("image") as File;

  const bytes = await image.arrayBuffer();

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview"
  });

  const result = await model.generateContent([
    DISASTER_SYSTEM_PROMPT,
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

// export async function POST(req: Request) {
//   try {
//     const { image } = await req.json(); // base64 string
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = "Analyze this image for disaster-related risks. " + DISASTER_SYSTEM_PROMPT;

//     const result = await model.generateContent([
//       prompt,
//       { inlineData: { data: image.split(",")[1], mimeType: "image/jpeg" } }
//     ]);

//     const text = result.response.text();
//     // Clean JSON string if model adds markdown blocks
//     const cleanedJson = text.replace(/```json|```/g, "").trim();
//     const data = JSON.parse(cleanedJson);

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Vision Analysis Error:", error);
//     return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 });
//   }
// }
