import express from "express";
import Product from "../models/Product.js";
import SearchLog from "../models/SearchLog.js";
import { getImageEmbedding } from "../services/embeddings.js";
import { searchTopK } from "../services/similarity.js";
import { upload, handleCloudinaryUpload } from "../middlewares/upload.js";
import { validateImageUrl } from "../utils/validation.js";

const router = express.Router();

router.post(
  "/search/image",
  upload.single("image"),
  handleCloudinaryUpload,
  async (req, res, next) => {
    try {
      const queryImageUrl = req.imageUrl;
      const t0 = Date.now();
      const embedding = await getImageEmbedding(queryImageUrl);
      const products = await Product.find({ embedding: { $exists: true } });
      const topResults = searchTopK(embedding, products, 10);
      await SearchLog.create({
        queryType: "image",
        queryImageUrl,
        topProductIds: topResults.map((r) => r.product._id),
        similarityScores: topResults.map((r) => r.score),
        latencyMs: Date.now() - t0,
      });
      res.json({
        results: topResults.map(({ product, score }) => ({
          ...product.toObject(),
          score,
        })),
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/search/url", async (req, res, next) => {
  try {
    const { imageUrl } = req.body;
    validateImageUrl(imageUrl);
    const t0 = Date.now();
    const embedding = await getImageEmbedding(imageUrl);
    const products = await Product.find({ embedding: { $exists: true } });
    const topResults = searchTopK(embedding, products, 10);
    await SearchLog.create({
      queryType: "url",
      queryImageUrl: imageUrl,
      topProductIds: topResults.map((r) => r.product._id),
      similarityScores: topResults.map((r) => r.score),
      latencyMs: Date.now() - t0,
    });
    res.json({
      results: topResults.map(({ product, score }) => ({
        ...product.toObject(),
        score,
      })),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
