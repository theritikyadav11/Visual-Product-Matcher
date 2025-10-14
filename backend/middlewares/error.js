export const errorHandler = (err, req, res, next) => {
  console.error("API Error:", err.message);
  res.status(400).json({ error: err.message, detail: err.stack });
};
