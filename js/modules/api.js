// API utilities
const API_URL = "https://api.waifu.pics/sfw/megumin";

export async function fetchImage() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data.url;
}

export async function fetchMultipleImages(count = 30) {
  const promises = Array.from({ length: count }, () => fetchImage());
  const urls = await Promise.all(promises);
  return urls.filter(Boolean);
}
