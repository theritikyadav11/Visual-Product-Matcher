export const validateImageUrl = (url) => {
  try {
    const parsed = new URL(url);
    const allowedProtocols = ["https:", "http:"];
    if (!allowedProtocols.includes(parsed.protocol))
      throw new Error("Invalid protocol");
    if (!parsed.pathname.match(/\.(jpg|jpeg|png|webp|gif)$/i))
      throw new Error("URL must point to an image file");
    return true;
  } catch (err) {
    throw new Error("Invalid image URL: " + err.message);
  }
};
