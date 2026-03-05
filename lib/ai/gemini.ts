import { GoogleGenerativeAI } from "@google/generative-ai";
import { DISASTER_SYSTEM_PROMPT } from "./prompts";

const apiKey = process.env.GEMINI_API_KEY!;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const disasterModel = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
  systemInstruction: DISASTER_SYSTEM_PROMPT
});