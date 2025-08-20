import { fetchMultipleImages } from './modules/api.js';
import { setButtonLoading, showButtonError } from './modules/ui.js';
import { initLightbox, openLightbox } from './modules/lightbox.js';

const galleryContainer = document.getElementById('gallery');
const randomBtn = document.getElementById('random-gallery');

async function loadGallery() {
  setButtonLoading(randomBtn, true);
  
  try {
    const imageUrls = await fetchMultipleImages(30);
    if (imageUrls.length === 0) throw new Error("No images loaded");
    
    galleryContainer.innerHTML = imageUrls
      .map(url => `
        <a href="${url}" target="_blank" rel="noopener">
          <img src="${url}" alt="Megumin" loading="lazy" />
        </a>
      `)
      .join("");
    
    // Add lightbox functionality
    galleryContainer.querySelectorAll('img').forEach(img => {
      img.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(img.src);
      });
    });
  } catch (error) {
    console.error("Failed to load gallery:", error);
    showButtonError(randomBtn);
  } finally {
    setButtonLoading(randomBtn, false);
  }
}

randomBtn.addEventListener('click', loadGallery);

// Initialize lightbox and load initial gallery
document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
  loadGallery();
});
