const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: '0px 0px -30px 0px',
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const nav = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (!nav) return;

  if (window.scrollY > 18) {
    nav.style.boxShadow = '0 10px 25px rgba(17, 20, 18, 0.04)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

const form = document.querySelector('#contact-form');
const formMessage = document.querySelector('#form-message');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    if (!button) return;

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Envoi...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        mode: 'cors',
        body: new FormData(form),
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l’envoi du message.');
      }

      form.reset();
      if (formMessage) {
        formMessage.textContent = 'Merci ! Votre message a bien été envoyé.';
        formMessage.style.color = '#1d3557';
      }
    } catch (error) {
      console.error(error);
      if (formMessage) {
        formMessage.textContent = 'Une erreur est survenue. Veuillez réessayer.';
        formMessage.style.color = '#8a3d2d';
      }
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
}

window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-copy h1');
  if (heroTitle) {
    heroTitle.style.opacity = '1';
  }
});
