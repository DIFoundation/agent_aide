import { NextResponse } from "next/server"
import { analyzeDisaster } from "@/lib/ai/analyzeDisaster"

export async function POST(req: Request) {

  const body = await req.json()

  try {

    const analysis = await analyzeDisaster(body)

    return NextResponse.json({
      success: true,
      analysis
    })

  } catch (error) {

    console.error(error)
    return NextResponse.json(
      { success: false, error: "AI analysis failed" },
      { status: 500 }
    )
  }
}