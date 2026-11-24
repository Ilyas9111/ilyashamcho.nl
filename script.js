const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

menuButton?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const nav = document.querySelector(".nav-wrap");
const progress = document.querySelector(".page-progress");
const hero = document.querySelector(".hero");
const glow = document.querySelector(".cursor-glow");

const updateScrollEffects = () => {
  const y = window.scrollY;
  nav?.classList.toggle("scrolled", y > 24);

  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
};

window.addEventListener("scroll", updateScrollEffects, { passive: true });
updateScrollEffects();

if (!reduceMotion) {
  const revealTargets = document.querySelectorAll(
    ".intro-grid > *, .section-heading > *, .skill-card, .experience-title, .timeline-item, .contact-card"
  );
  revealTargets.forEach((element) => element.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px" }
  );
  revealTargets.forEach((element) => observer.observe(element));

  hero?.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty("--mouse-x", `${x}%`);
    hero.style.setProperty("--mouse-y", `${y}%`);
  });

  document.addEventListener("mousemove", (event) => {
    if (!glow) return;
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
    glow.style.opacity = "1";
  });
  document.addEventListener("mouseleave", () => {
    if (glow) glow.style.opacity = "0";
  });

  document.querySelectorAll(".skill-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}
