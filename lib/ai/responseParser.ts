import { DisasterResponse } from "@/types/disaster";

export function parseAIResponse(text: string): DisasterResponse | null {
  try {
    const parsed = JSON.parse(text);
    return parsed as DisasterResponse;
  } catch (error: any) {
    console.error("Invalid AI JSON:", text);
    console.error("Error message", error.message);
    return null;
  }
}
