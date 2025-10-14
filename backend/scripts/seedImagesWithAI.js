import fs from "fs/promises";
import path from "path";
import connectMongo from "../config/mongo.js";
import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import { fetchImageEmbedding } from "../services/jina.js";
import { normalizeEmbedding } from "../services/embeddings.js";
import { GoogleGenAI } from "@google/genai";

const IMAGES_ROOT = path.join(process.cwd(), "images");
const ai = new GoogleGenAI({
  apiKey: "AIzaSyDN7NC8hn6GTO7C82ymJ-pnyPxQRkk8en0",
});

async function* walkImages(root) {
  const folders = await fs.readdir(root, { withFileTypes: true });
  for (const folder of folders) {
    if (folder.isDirectory()) {
      const category = folder.name;
      const files = await fs.readdir(path.join(root, category));
      for (const file of files) {
        if (/\.(jpe?g|png|webp|gif)$/i.test(file)) {
          yield {
            filePath: path.join(root, category, file),
            filename: file,
            category,
          };
        }
      }
    }
  }
}

async function uploadToCloudinary(filePath, public_id) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { resource_type: "image", public_id, folder: "product-images" },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    );
  });
}

async function generateDescription(title, category) {
  const prompt = `Write a short product description for a ${category} called ${title}.`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text || String(response);
}

async function processAndSave() {
  await connectMongo();
  for await (const { filePath, filename, category } of walkImages(
    IMAGES_ROOT
  )) {
    try {
      const title = path.parse(filename).name;
      console.log(`Processing ${category}/${filename} ...`);
      // Cloudinary upload
      const imageUrl = await uploadToCloudinary(
        filePath,
        `${category}_${title}`
      );
      // Generate AI description
      const description = await generateDescription(title, category);
      // Jina embedding
      const emb = await fetchImageEmbedding(imageUrl);
      const embedding = normalizeEmbedding(emb);
      // Create & Save
      await Product.create({
        title,
        category,
        imageUrl,
        description,
        embedding,
      });
      console.log(`Added: ${title}`);
    } catch (err) {
      console.warn(`Failed: ${filename}:`, err.message);
    }
  }
  console.log("Done!");
  process.exit(0);
}

processAndSave().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
