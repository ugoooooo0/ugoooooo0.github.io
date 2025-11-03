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
        
        // Animer selon la page
        setTimeout(() => {
            this.animateHeader(); // Bouton ArtStation
        }, 200);
        
        // Si on est sur la page portfolio, animer les projets
        if (document.querySelector('.gallery-item') || document.querySelector('.carousel-item')) {
            setTimeout(() => {
                this.animateProjects(); // Projets + boutons
            }, 400);
        } else {
            // Sinon on est sur index, animer boutons/badges/logiciels
            setTimeout(() => {
                this.animateButtons(); // Boutons
            }, 400);
            
            setTimeout(() => {
                this.animateBadges(); // Badges : ⚡ 5 ans d'exp, 🎓 CNAM, 😊 Super gentil
            }, 500);
            
            setTimeout(() => {
                this.animateSoftwareItems(); // Logiciels un par un
            }, 700);
        }
    }

    prepareElements() {
        // Les éléments sont déjà cachés par le CSS, pas besoin de les préparer
        console.log('Éléments préparés pour l\'animation POP');
    }

    animateHeader() {
        // Header visible immédiatement, seulement animer le bouton ArtStation
        const artstationBtn = document.querySelector('.artstation-btn-external');
        if (artstationBtn) {
            this.popElement(artstationBtn, 300);
        }
    }

    animateMainContent() {
        // Plus d'animation pour les containers - seulement les boutons
        console.log('Containers visibles immédiatement, animation seulement pour les boutons');
    }

    animateProjects() {
        // Animer les projets de la galerie (portfolio)
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            this.popElement(item, index * 120);
        });
        
        // Items du carousel
        const carouselItems = document.querySelectorAll('.carousel-item');
        carouselItems.forEach((item, index) => {
            this.popElement(item, index * 150);
        });
        
        // Animer les boutons (pour les deux pages)
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach((btn, index) => {
            this.popElement(btn, 400 + (index * 200));
        });
    }

    popElement(element, delay = 0) {
        setTimeout(() => {
            // Simplement ajouter la classe d'animation
            element.classList.add('pop-show');
        }, delay);
    }

    animateButtons() {
        // Animer seulement les boutons individuellement
        const allButtons = document.querySelectorAll('.btn');
        allButtons.forEach((btn, index) => {
            this.popElement(btn, 400 + (index * 200));
        });
    }

    animateSoftwareItems() {
        // Animer chaque logiciel individuellement avec délais fluides
        const softwareItems = document.querySelectorAll('.software-item');
        softwareItems.forEach((item, index) => {
            this.popElement(item, 600 + (index * 80));
        });
    }

    animateBadges() {
        // Animer chaque badge individuellement
        const badges = document.querySelectorAll('.badge-item');
        badges.forEach((badge, index) => {
            this.popElement(badge, 800 + (index * 150));
        });
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
