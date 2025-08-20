import { fetchImage } from './modules/api.js';
import { setButtonLoading, showButtonError } from './modules/ui.js';

const randomBtn = document.getElementById("random-btn");
const downloadBtn = document.getElementById("download-btn");
const randomImg = document.getElementById("single-img");

let currentImageUrl = "https://i.waifu.pics/o-JMTJX.png";

randomBtn.addEventListener("click", async () => {
  setButtonLoading(randomBtn, true);
  
  try {
    const imageUrl = await fetchImage();
    currentImageUrl = imageUrl;
    
    randomImg.style.opacity = "0.5";
    randomImg.src = imageUrl;
    
    randomImg.onload = () => {
      randomImg.style.opacity = "1";
      setButtonLoading(randomBtn, false);
    };
  } catch (error) {
    console.error("Failed to fetch image:", error);
    setButtonLoading(randomBtn, false);
    showButtonError(randomBtn);
  }
});

downloadBtn.addEventListener("click", () => {
  if (currentImageUrl) {
    window.open(currentImageUrl, "_blank");
  }
});

// Add fade-in animation
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  if (container) container.classList.add("fade-in");
});
