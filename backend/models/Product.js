import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  embedding: {
    type: [Number],
    validate: (arr) => arr == null || arr.length === 2048,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ProductSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
