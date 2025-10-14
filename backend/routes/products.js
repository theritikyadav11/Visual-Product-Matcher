import express from "express";
import Product from "../models/Product.js";
import { getImageEmbedding } from "../services/embeddings.js";
import { ADMIN_SEED_TOKEN } from "../config/env.js";

const router = express.Router();

// Seed products (admin only)
router.post("/products/seed", async (req, res, next) => {
  try {
    const token = req.headers["x-admin-token"];
    if (ADMIN_SEED_TOKEN && token !== ADMIN_SEED_TOKEN)
      throw new Error("Unauthorized");
    // Expects req.body.products: array of {title, category, imageUrl, description}
    const { products } = req.body;
    if (!Array.isArray(products)) throw new Error("Products array required");
    const docs = await Product.insertMany(products);
    res.json({ success: true, inserted: docs.length });
  } catch (err) {
    next(err);
  }
});

// Backfill embeddings (admin only)
router.post("/products/backfill-embeddings", async (req, res, next) => {
  try {
    const token = req.headers["x-admin-token"];
    if (ADMIN_SEED_TOKEN && token !== ADMIN_SEED_TOKEN)
      throw new Error("Unauthorized");
    const products = await Product.find({
      $or: [{ embedding: { $exists: false } }, { embedding: null }],
    });
    let updated = 0;
    for (const p of products) {
      const embedding = await getImageEmbedding(p.imageUrl);
      p.embedding = embedding;
      await p.save();
      updated++;
    }
    res.json({ success: true, updated });
  } catch (err) {
    next(err);
  }
});

// List products
router.get("/products", async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 20,
      skip = Number(req.query.skip) || 0;
    const products = await Product.find({}).skip(skip).limit(limit);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

export default router;
