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
            
            // Animer l'image de profil séparément
            const profileImage = document.querySelector('.profile-image');
            if (profileImage) {
                this.popElement(profileImage, 300);
            }
            
            // Animer les badges de présentation
            const badges = document.querySelectorAll('.badge-item');
            badges.forEach((badge, index) => {
                this.popElement(badge, 500 + (index * 100));
            });
        }
        
        if (featuredSection) {
            this.popElement(featuredSection, 100);
        }
        
        // Section CV
        const cvSection = document.querySelector('.cv-section');
        if (cvSection) {
            this.popElement(cvSection, 400);
        }
        
        // Image CV séparément (même si elle est dans la section)
        const cvImage = document.querySelector('.cv-image');
        if (cvImage) {
            this.popElement(cvImage, 600);
        }
        
        // Sections logiciels et contact
        const logicielsSection = document.querySelector('.logiciels-section');
        const contactSection = document.querySelector('.contact-section');
        
        if (logicielsSection) {
            this.popElement(logicielsSection, 800);
            // Animer les logiciels individuellement
            this.animateSoftwareItems();
        }
        
        if (contactSection) {
            this.popElement(contactSection, 1000);
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
        
        // Animer les boutons si on n'est pas sur la page d'index
        if (!document.querySelector('.presentation-section')) {
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach((btn, index) => {
                this.popElement(btn, index * 200);
            });
        } else {
            // Sur la page index, animer les boutons différemment
            this.animateButtons();
        }
    }

    popElement(element, delay = 0) {
        setTimeout(() => {
            // Simplement ajouter la classe d'animation
            element.classList.add('pop-show');
        }, delay);
    }

    animateSoftwareItems() {
        // Animer chaque logiciel individuellement
        const softwareItems = document.querySelectorAll('.software-item');
        softwareItems.forEach((item, index) => {
            this.popElement(item, 900 + (index * 60));
        });
    }

    animateButtons() {
        // Animer tous les boutons de la page
        const buttonsContainer = document.querySelector('.buttons-container');
        if (buttonsContainer) {
            this.popElement(buttonsContainer, 400);
        }
        
        // Animer les boutons individuellement aussi
        const allButtons = document.querySelectorAll('.btn');
        allButtons.forEach((btn, index) => {
            this.popElement(btn, 600 + (index * 150));
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
