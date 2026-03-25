document.addEventListener("DOMContentLoaded", () => {

  // MENU
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.querySelector("nav");
  if(menuBtn && nav){
    menuBtn.addEventListener("click", () => nav.classList.toggle("active"));
  }

  // DARK MODE
  const toggle = document.getElementById("darkModeToggle");
  if(toggle){
    if(localStorage.getItem("theme")==="dark"){
      document.body.classList.add("dark");
    }

    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("theme",
        document.body.classList.contains("dark") ? "dark" : "light"
      );
    });
  }

  // FORM (BACKEND READY)
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if(form && status){
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      status.textContent = "Sending...";

      try {
        const res = await fetch("https://formspree.io/f/mqeyoade", {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });

        if(res.ok){
          status.textContent = "Message sent successfully!";
          form.reset();
        } else {
          status.textContent = "Something went wrong!";
        }

      } catch {
        status.textContent = "Network error!";
      }
    });
  }

  // LOADER
  const loader = document.getElementById("loader");
  if(loader){
    window.addEventListener("load", () => {
      loader.style.display = "none";
    });
  }

  // FADE-IN
  const faders = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if(entry.isIntersecting){
        setTimeout(() => {
          entry.target.classList.add("show");
        }, i * 150);
      }
    });
  });

  faders.forEach(el => observer.observe(el));

  // NAVBAR SCROLL
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if(window.scrollY > 50){
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

});
