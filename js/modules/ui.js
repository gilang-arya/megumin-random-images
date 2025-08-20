// UI utilities
export function setButtonLoading(button, isLoading) {
  button.disabled = isLoading;
  button.innerHTML = isLoading ? '<span class="loading-spinner"></span>Loading...' : 'Random';
  button.style.opacity = isLoading ? "0.7" : "1";
}

export function showButtonError(button) {
  const originalBg = button.style.backgroundColor;
  button.textContent = "Error - Try Again";
  button.style.backgroundColor = "#e53e3e";
  
  setTimeout(() => {
    button.textContent = "Random";
    button.style.backgroundColor = originalBg;
  }, 2000);
}
