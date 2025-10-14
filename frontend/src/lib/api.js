const API_BASE_URL = "https://visual-product-matcher-backend-8wqc.onrender.com";

export async function searchByImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE_URL}/api/search/image`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    let error = { error: res.statusText };
    try {
      error = await res.json();
    } catch (e) {}
    throw new Error(error?.error || "Failed to search by image");
  }

  return await res.json();
}

export async function searchByUrl(imageUrl) {
  const res = await fetch(`${API_BASE_URL}/api/search/url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageUrl }),
  });

  if (!res.ok) {
    let error = { error: res.statusText };
    try {
      error = await res.json();
    } catch (e) {}
    throw new Error(error?.error || "Failed to search by URL");
  }

  return await res.json();
}
