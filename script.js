// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Cart Functionality
let cartCount = 0;
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartCountElement = document.querySelector(".cart span");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cartCount++;
    cartCountElement.textContent = cartCount;

    // Animation
    button.textContent = "Added!";
    button.style.backgroundColor = "#4CAF50";

    setTimeout(() => {
      button.textContent = "Add to Cart";
      button.style.backgroundColor = "#1e1e1e";
    }, 2000);
  });
});

// Newsletter Form
const newsletterForm = document.getElementById("newsletter-form");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = newsletterForm.querySelector("input").value;

  // Simple validation
  if (email.includes("@") && email.includes(".")) {
    alert("Thanks for subscribing! Check your email for a 10% discount code.");
    newsletterForm.reset();
  } else {
    alert("Please enter a valid email address.");
  }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      }
    }
  });
});

// Sticky Navigation on Scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 100) {
    nav.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
  } else {
    nav.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});
