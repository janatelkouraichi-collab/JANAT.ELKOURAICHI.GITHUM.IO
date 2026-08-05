// ===== Smooth Scroll Reveal Animations =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== Navbar background on scroll =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        navbar.style.background = 'rgba(248, 250, 252, 0.92)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 4px 30px rgba(15, 23, 42, 0.08)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = 'none';
    }

    if (backToTop) {
        backToTop.classList.toggle('visible', currentScroll > 400);
    }

    lastScroll = currentScroll;
});

// ===== Smooth anchor scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Parallax effect on blobs =====
window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    document.querySelectorAll('.blob').forEach((blob, i) => {
        const speed = (i + 1) * 8;
        blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// ===== Typing effect on hero subtitle =====
const heroH2 = document.querySelector('.hero-content h2');
if (heroH2) {
    const text = heroH2.textContent;
    heroH2.textContent = '';
    heroH2.style.borderRight = '2px solid rgba(16, 185, 129, 0.8)';
    heroH2.style.animation = 'none';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroH2.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 60);
        } else {
            // Blink cursor then remove
            setTimeout(() => {
                heroH2.style.borderRight = 'none';
            }, 2000);
        }
    };
    
    setTimeout(typeWriter, 800);
}

// ===== Contact form animation =====
const form = document.querySelector('.contact-form');
if (form) {
    const messageBox = document.querySelector('#form-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('button');
        btn.disabled = true;
        btn.textContent = 'Envoi...';
        btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';

        if (messageBox) {
            messageBox.style.display = 'none';
            messageBox.textContent = '';
        }

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                form.reset();
                if (messageBox) {
                    messageBox.textContent = 'Merci ! Votre message a été envoyé avec succès.';
                    messageBox.style.display = 'block';
                }
            } else {
                throw new Error('Échec de l’envoi');
            }
        } catch (error) {
            console.error('Contact form submission failed:', error);
            if (messageBox) {
                messageBox.textContent = 'Désolé, une erreur est survenue. Veuillez réessayer.';
                messageBox.style.display = 'block';
            }
        } finally {
            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = 'Envoyer';
                btn.style.background = '';
            }, 2500);
        }
    });
}
