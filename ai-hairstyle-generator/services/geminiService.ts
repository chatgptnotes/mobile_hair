
import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateContentResponse, Part } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Applies a hairstyle to an image using the Gemini API.
 * @param base64Image The base64 encoded image string.
 * @param mimeType The MIME type of the image (e.g., 'image/jpeg').
 * @param styleName The name of the hairstyle to apply.
 * @returns A promise that resolves to the base64 string of the generated image.
 */
export const applyHairstyle = async (
  base64Image: string,
  mimeType: string,
  styleName: string
): Promise<string> => {
  const model = 'gemini-2.5-flash-image-preview';

  const prompt = `Analyze the person in this image. Apply a photorealistic "${styleName}" hairstyle to them. The new hairstyle should seamlessly blend with their head shape, face structure, and the original image's lighting. Do not add any text or watermarks to the image. The final output must be only the modified image.`;

  const imagePart: Part = {
    inlineData: {
      data: base64Image,
      mimeType: mimeType,
    },
  };

  const textPart: Part = {
    text: prompt,
  };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [imagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    // Find the image part in the response
    const imageCandidate = response.candidates?.[0];
    if (!imageCandidate) {
      throw new Error("No candidates returned from the API.");
    }
    
    const imagePartResponse = imageCandidate.content.parts.find(part => part.inlineData);

    if (imagePartResponse && imagePartResponse.inlineData) {
      return imagePartResponse.inlineData.data;
    } else {
      // Check for safety ratings or other issues
      const safetyReason = imageCandidate.finishReason;
      const safetyRatings = imageCandidate.safetyRatings;
      console.error("API response details:", { safetyReason, safetyRatings });
      throw new Error("The API did not return an image. This could be due to a safety block or an issue processing the request.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error(`An error occurred while communicating with the AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};