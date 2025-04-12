// Initialisation AOS (Animation On Scroll)
AOS.init({
  duration: 800, // Durée de l'animation en millisecondes
  once: true, // L'animation ne se déclenche qu'une seule fois
});

// Gestion du thème clair/sombre
const themeToggle = document.getElementById("theme-toggle");

// Appliquer le thème enregistré dans le localStorage
document.body.classList.toggle(
  "light-mode",
  localStorage.getItem("theme") === "light"
);

// Basculer entre les thèmes clair et sombre
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light-mode") ? "light" : "dark"
  );
});

// Chargement dynamique des articles de blog
fetch("blog.json")
  .then((response) => response.json())
  .then((posts) => {
    const container = document.getElementById("blog-posts");
    posts.forEach((post) => {
      container.innerHTML += `
        <article class="blog-post">
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <a href="${post.url}" target="_blank">Lire plus →</a>
        </article>
      `;
    });
  })
  .catch((error) => {
    console.error("Erreur lors du chargement des articles :", error);
  });

// Ajout d'un effet de défilement fluide pour les liens de navigation
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Fonction pour afficher un message de confirmation après l'envoi du formulaire
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    alert("Merci pour votre message ! Je vous répondrai bientôt.");
    contactForm.reset(); // Réinitialise le formulaire
  });
}
