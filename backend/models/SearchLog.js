import mongoose from "mongoose";

const SearchLogSchema = new mongoose.Schema({
  queryType: { type: String, enum: ["image", "url"], required: true },
  queryImageUrl: { type: String, required: true },
  topProductIds: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  similarityScores: [{ type: Number }], // Optional: Store returned scores for reference
  latencyMs: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const SearchLog = mongoose.model("SearchLog", SearchLogSchema);

export default SearchLog;
