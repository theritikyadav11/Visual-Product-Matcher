import express from "express";
import cors from "cors";
import morgan from "morgan";
import healthRoutes from "./routes/health.js";
import productRoutes from "./routes/products.js";
import searchRoutes from "./routes/search.js";
import { errorHandler } from "./middlewares/error.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

app.use("/api", healthRoutes);
app.use("/api", productRoutes);
app.use("/api", searchRoutes);

app.use(errorHandler);

export default app;
