export function parseAIResponse(text: string) {
    try {
      return JSON.parse(text);
    } catch (error: any) {
      console.error("Invalid AI JSON:", text);
      console.error("Error message", error.message)
      return null;
    }
  }