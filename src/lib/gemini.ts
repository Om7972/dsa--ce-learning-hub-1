
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
}

export async function analyzeMistake(code: string, problemTitle: string, userError: string) {
    if (!model) {
        console.warn("Gemini API key is missing. Returning mock analysis.");
        return {
            mistakePattern: "Unknown Object Reference",
            feedback: "It seems like you're trying to access a property of undefined. Check your loop conditions and array indices.",
            suggestion: "Ensure that 'arr[i]' is valid before accessing its properties."
        };
    }

    const prompt = `
    Analyze the following code for a DSA problem styled "${problemTitle}".
    The user is facing this error/issue: "${userError}".
    
    Code:
    \`\`\`
    ${code}
    \`\`\`
    
    Identify the mistake pattern (e.g., Off-by-one, Null Pointer, Infinite Loop, Logic Error).
    Provide brief feedback explaining what went wrong.
    Suggest a fix (logic only, do not write the full code).
    
    Return the response in valid JSON format with keys: "mistakePattern", "feedback", "suggestion".
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // Clean up markdown code blocks if present
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        return {
            mistakePattern: "Analysis Failed",
            feedback: "Could not analyze the code at this time.",
            suggestion: "Please review your logic manually."
        };
    }
}

export async function predictComplexity(code: string, language: string) {
    if (!model) {
        console.warn("Gemini API key is missing. Returning mock complexity.");
        return {
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            explanation: "Contains a single loop iterating through the input."
        };
    }

    const prompt = `
      Analyze the following ${language} code and predict its Time and Space complexity.
      
      Code:
      \`\`\`${language}
      ${code}
      \`\`\`
      
      Explain the reasoning step-by-step.
      Return the response in valid JSON format with keys: "timeComplexity", "spaceComplexity", "explanation".
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // Clean up markdown code blocks if present
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Gemini Complexity Prediction Error:", error);
        return {
            timeComplexity: "Unknown",
            spaceComplexity: "Unknown",
            explanation: "Could not analyze complexity."
        };
    }
}
