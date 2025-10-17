import express from "express";
import Product from "../models/Product.js";
import SearchLog from "../models/SearchLog.js";
import { getImageEmbedding } from "../services/embeddings.js";
import { searchTopK } from "../services/similarity.js";
import { upload, handleCloudinaryUpload } from "../middlewares/upload.js";
import { validateImageUrl } from "../utils/validation.js";

const router = express.Router();

// search by image
router.post(
  "/search/image",
  upload.single("image"),
  handleCloudinaryUpload,
  async (req, res, next) => {
    try {
      const queryImageUrl = req.imageUrl;
      const k = Math.max(1, Math.min(10, Number(req.body?.k) || 10));
      const t0 = Date.now();

      const embedding = await getImageEmbedding(queryImageUrl);
      const products = await Product.find({ embedding: { $exists: true } });
      const topResults = searchTopK(embedding, products, k);

      await SearchLog.create({
        queryType: "image",
        queryImageUrl,
        topProductIds: topResults.map((r) => r.product._id),
        similarityScores: topResults.map((r) => r.score),
        latencyMs: Date.now() - t0,
      });

      res.json({
        k,
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

// Search by Image URL
router.post("/search/url", async (req, res, next) => {
  try {
    const { imageUrl, k: kRaw } = req.body;
    validateImageUrl(imageUrl);
    const k = Math.max(1, Math.min(10, Number(kRaw) || 10));
    const t0 = Date.now();

    const embedding = await getImageEmbedding(imageUrl);
    const products = await Product.find({ embedding: { $exists: true } });
    const topResults = searchTopK(embedding, products, k);

    await SearchLog.create({
      queryType: "url",
      queryImageUrl: imageUrl,
      topProductIds: topResults.map((r) => r.product._id),
      similarityScores: topResults.map((r) => r.score),
      latencyMs: Date.now() - t0,
    });

    res.json({
      k,
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
