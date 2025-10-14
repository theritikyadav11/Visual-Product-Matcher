import { fetchImageEmbedding } from "./jina.js";

export const getImageEmbedding = async (imageUrl) => {
  const embedding = await fetchImageEmbedding(imageUrl);
  return normalizeEmbedding(embedding);
};

export const normalizeEmbedding = (vec) => {
  const norm = Math.sqrt(vec.reduce((sum, x) => sum + x * x, 0));
  return norm > 0 ? vec.map((x) => x / norm) : vec;
};
