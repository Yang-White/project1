const backToTopButton = document.querySelector(".back-to-top");

function updateBackToTopVisibility() {
  backToTopButton.hidden = window.scrollY < 320;
}

window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
backToTopButton.addEventListener("click", () => {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
  window.scrollTo({ top: 0, behavior });
});

updateBackToTopVisibility();
