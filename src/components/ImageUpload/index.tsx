"use client";
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import GeminiRecipe from "../GeminiRecipe";

const ImageUpload: React.FC = () => {
  const [image64, setImage64] = useState("");

  useEffect(() => {

    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(
      "AIzaSyB3Qu9Jd5SWg1RwNa7r7tfNSLiGFhsc3jc"
    );

    async function run() {
      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = "batata em ingles";

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setImage64(text);
      console.log(text);
    }

    run();
  }, []);

  return (
    <div>
      <h1>Minha Página</h1>
      <h3>{image64}</h3>
    </div>
  );
};

export default ImageUpload;
