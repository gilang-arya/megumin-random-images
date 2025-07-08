const RANDOM_GALLERY = document.getElementById("random-gallery");
const GALLERY_CONTAINER = document.getElementById("gallery");

const fetchImage = async () => {
  try {
    const res = await fetch("https://api.waifu.pics/sfw/megumin");
    if (!res.ok) throw new Error("Failed to fetch image");
    const data = await res.json();
    return data.url;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

const fetchAllImages = async (count = 6) => {
  const fetchPromises = Array.from({ length: count }, () => fetchImage());
  const urls = await Promise.all(fetchPromises);
  return urls.filter(Boolean); 
};

RANDOM_GALLERY.addEventListener("click", async () => {
  RANDOM_GALLERY.disabled = true;
  const urls = await fetchAllImages(18);

  GALLERY_CONTAINER.innerHTML = urls
    .map(
      (url) => `
        <a href="${url}" target="_blank" rel="noopener">
          <img src="${url}" alt="Megumin" loading="lazy" />
        </a>`
    )
    .join("");

  RANDOM_GALLERY.disabled = false;
});
