import { GoogleGenerativeAI } from "@google/generative-ai"

interface DisasterResponse {
    location: string;
    latitude: number;
    longitude: number;
    description: string;
}
  

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function analyzeDisaster(report: DisasterResponse) {

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview"
  })

  const prompt = `
You are an advanced disaster response AI called AIDE (Artificial Intelligence Disaster Emergency).

A citizen has reported a potential disaster. Analyze the situation and produce a structured emergency response.

User Report:
Location: ${report.location}
Latitude: ${report.latitude}
Longitude: ${report.longitude}
Description: ${report.description}

Return JSON only in this format:

{
  "disasterType": "",
  "severity": "",
  "summary": "",
  "recommendedActions": [],
  "evacuationAdvice": "",
  "requiredResponders": [],
  "riskLevel": "",
  "estimatedImpactRadiusKm": ""
}

Guidelines:
- disasterType examples: Flood, Fire, Earthquake, Building Collapse, Accident, Storm
- severity: Low, Moderate, High, Critical
- riskLevel: Low, Medium, High, Extreme
- recommendedActions: 3–6 actionable steps
- responders examples: Firefighters, Medical Team, Police, Rescue Unit
`

  const result = await model.generateContent(prompt)

  const text = result.response.text()

  try {
    const parsed = JSON.parse(text)
    return parsed
  } catch {
    throw new Error("AI returned invalid JSON")
  }
}