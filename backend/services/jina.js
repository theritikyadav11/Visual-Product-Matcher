import axios from "axios";
import { JINA_API_KEY } from "../config/env.js";

const JINA_EMBEDDINGS_URL = "https://api.jina.ai/v1/embeddings";
const JINA_MODEL = "jina-embeddings-v4";

export const fetchImageEmbedding = async (imageUrl) => {
  try {
    const res = await axios.post(
      JINA_EMBEDDINGS_URL,
      {
        model: JINA_MODEL,
        input: [{ image: imageUrl }],
      },
      {
        headers: {
          Authorization: `Bearer ${JINA_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (
      res.data &&
      Array.isArray(res.data.data) &&
      Array.isArray(res.data.data[0].embedding)
    ) {
      return res.data.data[0].embedding;
    }
    throw new Error("Jina API: Malformed response");
  } catch (error) {
    console.error("Jina API error:", error?.response?.data || error.message);
    throw new Error("Failed to fetch image embedding");
  }
};
