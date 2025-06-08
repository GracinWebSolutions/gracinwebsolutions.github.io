window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const slides = document.querySelectorAll(".slide");
  const navbar = document.querySelector(".navbar");
  let currentSlide = 0;
  let isScrolling = false;

  // Position all slides vertically
  slides.forEach((slide, index) => {
    slide.style.transform = `translateY(${index * 100}vh)`;
  });

  // Function to move to a slide
  function goToSlide(index) {
    container.style.transform = `translateY(-${index * 100}vh)`;

    if (index === 0) {
      navbar.classList.remove("scrolled");
    } else {
      navbar.classList.add("scrolled");
    }
  }

  window.goToSlide = goToSlide;

  // Handle scroll (wheel)
  window.addEventListener("wheel", (e) => {
    if (isScrolling) return;
    isScrolling = true;

    if (e.deltaY > 0 && currentSlide < slides.length - 1) {
      currentSlide++;
    } else if (e.deltaY < 0 && currentSlide > 0) {
      currentSlide--;
    }

    goToSlide(currentSlide);

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  });

  // Handle navbar link clicks
  const navLinks = document.querySelectorAll(".navbar a");

  navLinks.forEach((link) => {
    const text = link.textContent.trim().toLowerCase();

    link.addEventListener("click", (e) => {
      if (text === "home") {
        e.preventDefault();
        currentSlide = 0;
        goToSlide(currentSlide);
      } else if (text === "contact") {
        e.preventDefault();
        currentSlide = slides.length - 1;
        goToSlide(currentSlide);
      }
      // Book and others follow default behavior
    });
  });

  // Handle external redirect like index.html?goto=footer
  const urlParams = new URLSearchParams(window.location.search);
  const targetId = urlParams.get("goto");

  if (targetId) {
    const targetIndex = Array.from(slides).findIndex(
      (slide) => slide.id === targetId
    );

    if (targetIndex !== -1) {
      setTimeout(() => {
        currentSlide = targetIndex;
        goToSlide(currentSlide);
        isScrolling = false;
      }, 200);

      // Set nav color right away
      if (targetIndex === 0) {
        navbar.classList.remove("scrolled");
      } else {
        navbar.classList.add("scrolled");
      }
    }
  }

  let touchStartY = 0;

  window.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0].clientY;
  });

  window.addEventListener("touchend", (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;

    if (Math.abs(deltaY) < 50 || isScrolling) return; // ignore small swipes
    isScrolling = true;

    if (deltaY > 0 && currentSlide < slides.length - 1) {
      currentSlide++;
    } else if (deltaY < 0 && currentSlide > 0) {
      currentSlide--;
    }

    goToSlide(currentSlide);

    setTimeout(() => {
      isScrolling = false;
  }, 1000);

  
})});
