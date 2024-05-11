"use client";
import React, { useState } from "react";

const GeminiRecipe: React.FC = () => {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [difference, setDifference] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const convertFileToBase64 = (file: File) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });

    const image1Data = image1 ? await convertFileToBase64(image1) : null;
    const image2Data = image2 ? await convertFileToBase64(image2) : null;

    console.log("Enviando dados:", { image1: image1Data, image2: image2Data });

    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image1: image1Data, image2: image2Data }),
    });
    console.log(response);
    const data = await response.json();
    setDifference(data.difference);
  };

  return (
    <div>
      <h1>Comparador de Imagens com Gemini</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage1(e.target.files[0]);
            }
          }}
        />
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage2(e.target.files[0]);
            }
          }}
        />
        <button type="submit">Comparar</button>
      </form>
      <p>{difference}</p>
    </div>
  );
};

export default GeminiRecipe;
