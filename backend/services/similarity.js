export const cosineSimilarity = (a, b) => {
  const len = a.length;
  let dot = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < len; ++i) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
};

export const searchTopK = (queryEmbedding, products, k = 10) => {
  const scored = products
    .map((product) => ({
      product,
      score: cosineSimilarity(queryEmbedding, product.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
  return scored;
};
