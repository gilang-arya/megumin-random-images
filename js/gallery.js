const RANDOM_GALLERY = document.getElementById("random-gallery");
const GALLERY_CONTAINER = document.getElementById("gallery");

// Lightbox elements
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
lightbox.className = "lightbox";
lightbox.innerHTML = `
  <span class="close">&times;</span>
  <img class="lightbox-img" src="" alt="Megumin">
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector(".lightbox-img");
const closeBtn = lightbox.querySelector(".close");

// Fetch single image
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

// Fetch multiple images
const fetchAllImages = async (count = 6) => {
  const fetchPromises = Array.from({ length: count }, () => fetchImage());
  const urls = await Promise.all(fetchPromises);
  return urls.filter(Boolean);
};

// Function to render gallery images
const renderGallery = (urls) => {
  GALLERY_CONTAINER.innerHTML = urls
    .map(
      (url) => `
        <a href="${url}" target="_blank" rel="noopener">
          <img src="${url}" alt="Megumin" loading="lazy" />
        </a>`
    )
    .join("");

  // Attach click events for lightbox
  const galleryImages = GALLERY_CONTAINER.querySelectorAll("img");
  galleryImages.forEach((img) => {
    img.addEventListener("click", (e) => {
      e.preventDefault(); // prevent default anchor behavior
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });
};

// Random gallery button
RANDOM_GALLERY.addEventListener("click", async () => {
  RANDOM_GALLERY.disabled = true;
  const urls = await fetchAllImages(30);
  renderGallery(urls);
  RANDOM_GALLERY.disabled = false;
});

// Lightbox close
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Click outside image closes lightbox
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// Optional: load initial gallery on page load
window.addEventListener("DOMContentLoaded", async () => {
  const urls = await fetchAllImages(30);
  renderGallery(urls);
});
