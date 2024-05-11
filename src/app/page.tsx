import Image from "next/image";
import styles from "./page.module.css";
import GeminiRecipe from "@/components/GeminiRecipe";
import ImageUpload from "@/components/ImageUpload";

export default function Home() {
  return (
    <main className={styles.main}>
      <ImageUpload/>
      <GeminiRecipe/>
    </main>
  );
}
