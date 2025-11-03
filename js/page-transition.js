/**
 * Gestionnaire d'effets POP style CANVA
 * Animation élastique des éléments de la page
 */

class PagePopAnimation {
    constructor() {
        this.init();
    }

    init() {
        // Attendre que la page soit chargée
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startPopAnimations());
        } else {
            this.startPopAnimations();
        }
    }

    startPopAnimations() {
        // Préparer tous les éléments pour l'animation
        this.prepareElements();
        
        // Démarrer les animations avec des délais plus doux
        setTimeout(() => {
            this.animateHeader();
        }, 200);
        
        setTimeout(() => {
            this.animateMainContent();
        }, 400);
        
        setTimeout(() => {
            this.animateProjects();
        }, 600);
    }

    prepareElements() {
        // Les éléments sont déjà cachés par le CSS, pas besoin de les préparer
        console.log('Éléments préparés pour l\'animation POP');
    }

    animateHeader() {
        const header = document.querySelector('header');
        if (header) {
            this.popElement(header, 0);
        }
        
        // Bouton ArtStation externe
        const artstationBtn = document.querySelector('.artstation-btn-external');
        if (artstationBtn) {
            this.popElement(artstationBtn, 200);
        }
    }

    animateMainContent() {
        // Section présentation ou featured projects
        const presentationSection = document.querySelector('.presentation-section');
        const featuredSection = document.querySelector('.featured-projects-section');
        
        if (presentationSection) {
            this.popElement(presentationSection, 100);
        }
        
        if (featuredSection) {
            this.popElement(featuredSection, 100);
        }
        
        // Sections logiciels et contact avec délais plus fluides
        const logicielsSection = document.querySelector('.logiciels-section');
        const contactSection = document.querySelector('.contact-section');
        
        if (logicielsSection) {
            this.popElement(logicielsSection, 400);
        }
        
        if (contactSection) {
            this.popElement(contactSection, 500);
        }
    }

    animateProjects() {
        // Projets de la galerie (portfolio) - plus fluide
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            this.popElement(item, index * 120);
        });
        
        // Items du carousel - délai plus doux
        const carouselItems = document.querySelectorAll('.carousel-item');
        carouselItems.forEach((item, index) => {
            this.popElement(item, index * 150);
        });
        
        // Boutons - délai plus espacé
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach((btn, index) => {
            this.popElement(btn, index * 200);
        });
    }

    popElement(element, delay = 0) {
        setTimeout(() => {
            // Simplement ajouter la classe d'animation
            element.classList.add('pop-show');
        }, delay);
    }

    // Méthode pour animer un nouvel élément ajouté dynamiquement
    static animateNewElement(element, delay = 0) {
        const instance = new PagePopAnimation();
        element.style.transform = 'scale(0)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        instance.popElement(element, delay);
    }
}

// Initialiser automatiquement quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    new PagePopAnimation();
});

// Aussi au chargement complet de la page pour être sûr
window.addEventListener('load', () => {
    new PagePopAnimation();
});

// Exporter pour utilisation globale
window.PagePopAnimation = PagePopAnimation;
