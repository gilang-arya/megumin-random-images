// Lightbox functionality
let lightbox, lightboxImg, closeBtn;

export function initLightbox() {
  lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <span class="close">&times;</span>
    <img class="lightbox-img" src="" alt="Megumin">
  `;
  document.body.appendChild(lightbox);
  
  lightboxImg = lightbox.querySelector(".lightbox-img");
  closeBtn = lightbox.querySelector(".close");
  
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.style.display === "flex") closeLightbox();
  });
}

export function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.style.display = "none";
  document.body.style.overflow = "";
}
