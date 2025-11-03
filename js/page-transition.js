/**
 * Gestionnaire d'effets de transition POP entre pages
 * Crée un effet visuel moderne lors du changement de page
 */

class PageTransition {
    constructor() {
        this.overlay = null;
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.createTransitionOverlay();
        this.bindEvents();
        
        // Animation d'entrée pour les nouvelles pages
        this.pageEnterAnimation();
    }

    createTransitionOverlay() {
        // Créer l'overlay principal
        this.overlay = document.createElement('div');
        this.overlay.className = 'page-transition-overlay';
        
        // Créer le cercle de transition
        const circle = document.createElement('div');
        circle.className = 'transition-circle';
        
        // Créer le contenu de transition
        const content = document.createElement('div');
        content.className = 'transition-content';
        content.innerHTML = `
            <h2 class="transition-title">UGO RAVARD</h2>
            <p class="transition-subtitle">Chargement en cours...</p>
            <div class="transition-loader"></div>
        `;
        
        // Créer les particules
        const particles = document.createElement('div');
        particles.className = 'transition-particles';
        
        // Assembler l'overlay
        this.overlay.appendChild(circle);
        this.overlay.appendChild(content);
        this.overlay.appendChild(particles);
        document.body.appendChild(this.overlay);
    }

    bindEvents() {
        // Intercepter les liens de navigation
        const navLinks = document.querySelectorAll('a[href="portfolio.html"], a[href="index.html"], .btn[href="portfolio.html"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                this.startTransition(href);
            });
        });
    }

    startTransition(targetUrl) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Mettre à jour le texte de transition
        const subtitle = this.overlay.querySelector('.transition-subtitle');
        if (targetUrl.includes('portfolio')) {
            subtitle.textContent = 'Chargement du portfolio...';
        } else {
            subtitle.textContent = 'Retour à l\'accueil...';
        }
        
        // Démarrer les particules
        this.startParticles();
        
        // Activer l'overlay
        this.overlay.classList.add('active');
        
        // Attendre la fin de l'animation avant de naviguer
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 1200);
    }

    startParticles() {
        const particlesContainer = this.overlay.querySelector('.transition-particles');
        
        // Créer plusieurs particules avec des délais différents
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.createParticle(particlesContainer);
            }, i * 80);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Taille et position aléatoire
        const size = Math.random() * 4 + 2; // 2-6px
        const left = Math.random() * 100; // 0-100%
        const animationDuration = Math.random() * 2 + 2; // 2-4s
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = left + '%';
        particle.style.animationDuration = animationDuration + 's';
        particle.style.animationDelay = Math.random() * 0.5 + 's';
        
        container.appendChild(particle);
        
        // Supprimer la particule après l'animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (animationDuration + 0.5) * 1000);
    }

    pageEnterAnimation() {
        // Animation d'entrée fluide pour la page
        document.body.style.opacity = '0';
        document.body.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            document.body.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            document.body.style.opacity = '1';
            document.body.style.transform = 'scale(1)';
        }, 100);
        
        // Nettoyer les styles après l'animation
        setTimeout(() => {
            document.body.style.transition = '';
            document.body.style.transform = '';
        }, 700);
    }

    // Méthode pour déclencher manuellement une transition
    static triggerTransition(targetUrl, customText = '') {
        const instance = new PageTransition();
        if (customText) {
            const subtitle = instance.overlay.querySelector('.transition-subtitle');
            subtitle.textContent = customText;
        }
        instance.startTransition(targetUrl);
    }
}

// Initialiser automatiquement quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    new PageTransition();
});

// Exporter pour utilisation globale
window.PageTransition = PageTransition;