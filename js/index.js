const RANDOM_BTN = document.getElementById("random-btn");
const DOWNLOAD_BTN = document.querySelector("#download-btn");
const RANDOM_IMG = document.getElementById("single-img");

let img_url = "https://i.waifu.pics/o-JMTJX.png";

RANDOM_BTN.addEventListener("click", async () => {
  try {
    const response = await fetch("https://api.waifu.pics/sfw/megumin");
    const data = await response.json();
    img_url = data.url;
    RANDOM_IMG.src = img_url;
  } catch (error) {
    console.error("Gagal mengambil gambar:", error);
  }
});

DOWNLOAD_BTN.addEventListener("click", async () => {
  window.open(img_url, "_blank");
});
