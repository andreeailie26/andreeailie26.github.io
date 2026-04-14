function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let autoplayId = null;

    const autoplayEnabled = carousel.dataset.autoplay === "true";
    const interval = parseInt(carousel.dataset.interval, 10) || 4000;
    const totalSlides = slides.length;

    if (totalSlides <= 1) {
      carousel.classList.add("single-slide");
      track.style.transform = "translateX(0%)";
      return;
    }

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function goToNext() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    }

    function goToPrev() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
    }

    function startAutoplay() {
      if (!autoplayEnabled) return;
      stopAutoplay();
      autoplayId = setInterval(goToNext, interval);
    }

    function stopAutoplay() {
      if (autoplayId) {
        clearInterval(autoplayId);
        autoplayId = null;
      }
    }

    nextBtn.addEventListener("click", () => {
      goToNext();
      startAutoplay();
    });

    prevBtn.addEventListener("click", () => {
      goToPrev();
      startAutoplay();
    });

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    updateCarousel();
    startAutoplay();
  });
});