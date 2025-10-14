import app from "./app.js";
import connectMongo from "./config/mongo.js";
import { PORT } from "./config/env.js";

const startServer = async () => {
  await connectMongo();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Startup error:", err);
  process.exit(1);
});
