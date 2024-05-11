import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verifica se a requisição é POST antes de fazer o parsing
  if (req.method === "POST") {
    await req.json();
  }

  const image1 = req.body.image1;
  const image2 = req.body.image2;
  console.log("Imagens recebidas:", image1, image2);

  const apiKey = "AIzaSyB3Qu9Jd5SWg1RwNa7r7tfNSLiGFhsc3jc";
  console.log("API Key:", apiKey);

  const genAI = new GoogleGenerativeAI(apiKey);

  async function analyze() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = "What's different between these pictures?";
    const imageParts = [
      {
        inlineData: image1.split(",")[1],
        mimeType: "image/png",
      },
      {
        inlineData: image2.split(",")[1],
        mimeType: "image/jpeg",
      },
    ];
    return await model.generateContent([prompt, ...imageParts]);
  }

  try {
    const output = await analyze();
    console.log("Resposta do Gemini:", output);
    const difference = await output.response.text();
    console.log("Diferença:", difference);
    res.status(200).json({ difference });
  } catch (error) {
    console.error("Erro ao chamar o Gemini:", error);
    res.status(500).json({ error: "Erro ao processar as imagens." });
  }
}
