document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const msg = document.getElementById("msg");
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a");
  let lastScrollY = window.scrollY;

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const button = form.querySelector("button");
      button.textContent = "Sending...";
      button.disabled = true;
      
      setTimeout(function () {
        if (msg) msg.textContent = "✅ Message sent successfully!";
        form.reset();
        button.textContent = "Send Message";
        button.disabled = false;
        setTimeout(function () { if (msg) msg.textContent = ""; }, 4000);
      }, 1500);
    });
  }

  window.addEventListener("scroll", function () {
    if (!header) return;
    const currentScrollY = window.scrollY;

    // A. iPad Top Safety (Stops the haze flicker)
    if (currentScrollY <= 50) {
      header.style.transform = "translateY(0)";
    } 
    // B. Hide/Show Header
    else if (Math.abs(currentScrollY - lastScrollY) > 15) {
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        header.style.transform = "translateY(-100%)";
      } else {
        header.style.transform = "translateY(0)";
      }
      lastScrollY = currentScrollY;
    }

    // C. Active Link Highlight
    let currentSection = "";
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - window.innerHeight * 0.3;
      if (currentScrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  }, { passive: true });
});