// Système de traduction manuelle pour le portfolio
class TranslationSystem {
    constructor() {
        this.currentLanguage = localStorage.getItem('portfolio-language') || 'fr';
        this.originalDescriptions = new Map(); // Pour sauvegarder les descriptions originales
        this.translations = {
            fr: {
                // Navigation principale
                'PORTFOLIO UGO RAVARD': 'PORTFOLIO UGO RAVARD',
                'PRÉSENTATION': 'PRÉSENTATION',
                'PORTFOLIO': 'PORTFOLIO',
                'CV': 'CV',
                'CONTACT': 'CONTACT',
                'ACCUEIL': 'ACCUEIL',
                'MON PORTFOLIO': 'MON PORTFOLIO',
                'Ugo RAVARD Artist 3D / 2D': 'Ugo RAVARD Artist 3D / 2D',
                
                // Nouveaux filtres portfolio
                'ALL': 'TOUT',
                '3D': '3D',
                'Tournage/Montage': 'Tournage/Montage',
                
                // Anciens filtres (rétrocompatibilité)
                '2D/3D': '2D/3D',
                'Films': 'Films/Images',
                'Movies/Images': 'Films/Images',
                
                // Page d'accueil - Section présentation
                'ARTISTE 3D': 'ARTISTE 3D',
                'presentation-text': 'Je m\'appelle Ugo Ravard, j\'ai 18 ans et je suis passionné par la création numérique et la 3D depuis plusieurs années. J\'aime donner vie à des idées à travers la modélisation, l\'animation et la conception visuelle. Actuellement étudiant au CNAM Enjmin, une école reconnue en France dans le domaine du jeu vidéo et de la création numérique, je développe mes compétences artistiques et techniques pour bâtir une carrière dans l\'industrie créative. Ce portfolio rassemble mes travaux et projets, reflets de mon univers et de mon évolution artistique.',
                '🎨 VOIR MON PORTFOLIO': '🎨 VOIR MON PORTFOLIO',
                
                // Section CV
                'Mon CV': 'Mon CV',
                'cv-description': 'Découvrez mon parcours, mes compétences et mes expériences professionnelles.',
                '📄 Voir mon CV': '📄 Voir mon CV',
                
                // Section Contact
                'Envoyez-moi un message': 'Envoyez-moi un message',
                'Votre nom': 'Votre nom',
                'Votre email': 'Votre email',
                'Votre message...': 'Votre message...',
                '📩 Envoyer le message': '📩 Envoyer le message',
                
                // Footer
                'footer-text': '© 2024 Ugo Ravard - Tous droits réservés',
                
                // Carrousel des projets vedettes
                'Mes Meilleurs Projets': 'Mes Meilleurs Projets',
                'Scène Éolienne': 'Scène Éolienne',
                'Scène sur une éolienne sous une mer de nuages': 'Scène sur une éolienne sous une mer de nuages',
                'Ville 3D': 'Ville 3D',
                'Projet de ville 3D avec animation de voiture': 'Projet de ville 3D avec animation de voiture',
                'Armures Spatiales': 'Armures Spatiales',
                'Collection d\'armures spatiales futuristes': 'Collection d\'armures spatiales futuristes',
                'Projet Terra': 'Projet Terra',
                'Exoplanète et sa lune dans l\'espace': 'Exoplanète et sa lune dans l\'espace',
                'Retribution': 'Retribution',
                'FanArt Star Citizen': 'FanArt Star Citizen',
                
                // Descriptions des projets portfolio
                'Scène sur une éolienne sous une mer de nuages': 'Scène sur une éolienne sous une mer de nuages',
                'Route sous la pluie': 'Route sous la pluie',
                'Projet de ville 3D avec animation de voiture': 'Projet de ville 3D avec animation de voiture',
                'Animation pixel art - épreuve de sélection à mon école (Cnam Enjmin)': 'Animation pixel art - épreuve de sélection à mon école (Cnam Enjmin)',
                'Astraunaute dans une nébuleuse volumétrique': 'Astronaute dans une nébuleuse volumétrique',
                'Environnement cartoon inspiré des films Ghibli': 'Environnement cartoon inspiré des films Ghibli',
                'Distributeur style cartoon': 'Distributeur style cartoon',
                'Voiture Nissane GTR dans le brouillard': 'Voiture Nissan GTR dans le brouillard',
                'Projet Batspace - Vaisseau spatial': 'Projet Batspace - Vaisseau spatial',
                'Modélisation d\'armure / combinaison spatiale': 'Modélisation d\'armure / combinaison spatiale',
                'Modélisation Apple Vision Pro': 'Modélisation Apple Vision Pro',
                'base terrestre - Blender - Twinmotion': 'Base terrestre - Blender - Twinmotion',
                'Projet moto futuriste - inspiré de la saga Star Wars': 'Projet moto futuriste - inspiré de la saga Star Wars',
                'Projet Retribution - FanArt Star Citizen': 'Projet Retribution - FanArt Star Citizen',
                'base de science science-fiction': 'Base de science science-fiction',
                'Imagination de shooting photo': 'Imagination de shooting photo',
                'Epave d\'une station spatiale': 'Épave d\'une station spatiale',
                'Projet Terra - Exoplanète et sa lune': 'Projet Terra - Exoplanète et sa lune',
                'Projet de conception de téléphone pour mon Baccalauréat': 'Projet de conception de téléphone pour mon Baccalauréat',
                'Paysage avec un trou noir': 'Paysage avec un trou noir',
                'Batiment avec textures réalistes': 'Bâtiment avec textures réalistes',
                'maraicages dans une forêt': 'Marécages dans une forêt',
                'lune + Displacement map': 'Lune + Displacement map',
                '...': '...',
                'Starship + nuages volumétriques': 'Starship + nuages volumétriques',
                'The Colossus - Un vaisseau spacial Game-Ready avec intérieur visitable': 'The Colossus - Un vaisseau spatial Game-Ready avec intérieur visitable',
                'VFX tracking Apple Vision Pro': 'VFX tracking Apple Vision Pro',
                'VFX tracking Lamborghini': 'VFX tracking Lamborghini',
                'Level design + Batiments inspirés du jeu Star Citizen (Blender + Unreal Engine)': 'Level design + Bâtiments inspirés du jeu Star Citizen (Blender + Unreal Engine)',
                'Environnement fait sur entièrement sur Blender': 'Environnement fait entièrement sur Blender',
                'Chaine de machines imprimables en 3D - Inspiré du jeu Satisfactory': 'Chaîne de machines imprimables en 3D - Inspiré du jeu Satisfactory',
                'Séries de tournages pour l\'entreprise EDF': 'Séries de tournages pour l\'entreprise EDF',
                'Montage pour Electromontage Elec sur After Effects': 'Montage pour Electromontage Elec sur After Effects',
                'Tournages et Montage vidéo pour l\'émission La Vie Du Chef': 'Tournages et Montage vidéo pour l\'émission La Vie Du Chef'
            },
            en: {
                // Navigation principale
                'PORTFOLIO UGO RAVARD': 'UGO RAVARD PORTFOLIO',
                'PRÉSENTATION': 'ABOUT',
                'PORTFOLIO': 'PORTFOLIO', 
                'CV': 'CV',
                'CONTACT': 'CONTACT',
                'ACCUEIL': 'HOME',
                'MON PORTFOLIO': 'MY PORTFOLIO',
                'Ugo RAVARD Artist 3D / 2D': 'Ugo RAVARD Artist 3D / 2D',
                
                // Nouveaux filtres portfolio
                'ALL': 'ALL',
                '3D': '3D',
                'Tournage/Montage': 'Filming/Editing',
                
                // Anciens filtres (rétrocompatibilité)
                '2D/3D': '2D/3D',
                'Films/Images': 'Movies/Images',
                
                // Page d'accueil - Section présentation
                'ARTISTE 3D': '3D ARTIST',
                'presentation-text': 'My name is Ugo Ravard, I am 18 years old and I have been passionate about digital creation and 3D for several years. I love bringing ideas to life through modeling, animation and visual design. Currently studying at CNAM Enjmin, a renowned school in France in the field of video games and digital creation, I am developing my artistic and technical skills to build a career in the creative industry. This portfolio brings together my work and projects, reflections of my universe and my artistic evolution.',
                '🎨 VOIR MON PORTFOLIO': '🎨 VIEW MY PORTFOLIO',
                
                // Section CV
                'Mon CV': 'My CV',
                'cv-description': 'Discover my background, skills and professional experiences.',
                '📄 Voir mon CV': '📄 View my CV',
                
                // Section Contact
                'Envoyez-moi un message': 'Send me a message',
                'Votre nom': 'Your name',
                'Votre email': 'Your email',
                'Votre message...': 'Your message...',
                '📩 Envoyer le message': '📩 Send message',
                
                // Footer
                'footer-text': '© 2024 Ugo Ravard - All rights reserved',
                
                // Carrousel des projets vedettes
                'Mes Meilleurs Projets': 'My Best Projects',
                'Scène Éolienne': 'Wind Turbine Scene',
                'Scène sur une éolienne sous une mer de nuages': 'Scene on a wind turbine under a sea of clouds',
                'Ville 3D': '3D City',
                'Projet de ville 3D avec animation de voiture': '3D city project with car animation',
                'Armures Spatiales': 'Space Armors',
                'Collection d\'armures spatiales futuristes': 'Collection of futuristic space armors',
                'Projet Terra': 'Terra Project',
                'Exoplanète et sa lune dans l\'espace': 'Exoplanet and its moon in space',
                'Retribution': 'Retribution',
                'FanArt Star Citizen': 'Star Citizen FanArt',
                
                // Descriptions des projets portfolio
                'Scène sur une éolienne sous une mer de nuages': 'Scene on a wind turbine under a sea of clouds',
                'Route sous la pluie': 'Road in the rain',
                'Projet de ville 3D avec animation de voiture': '3D city project with car animation',
                'Animation pixel art - épreuve de sélection à mon école (Cnam Enjmin)': 'Pixel art animation - selection test for my school (Cnam Enjmin)',
                'Astraunaute dans une nébuleuse volumétrique': 'Astronaut in a volumetric nebula',
                'Environnement cartoon inspiré des films Ghibli': 'Cartoon environment inspired by Ghibli films',
                'Distributeur style cartoon': 'Cartoon style vending machine',
                'Voiture Nissane GTR dans le brouillard': 'Nissan GTR car in the fog',
                'Projet Batspace - Vaisseau spatial': 'Batspace Project - Spaceship',
                'Modélisation d\'armure / combinaison spatiale': 'Armor / space suit modeling',
                'Modélisation Apple Vision Pro': 'Apple Vision Pro modeling',
                'base terrestre - Blender - Twinmotion': 'Terrestrial base - Blender - Twinmotion',
                'Projet moto futuriste - inspiré de la saga Star Wars': 'Futuristic motorcycle project - inspired by Star Wars saga',
                'Projet Retribution - FanArt Star Citizen': 'Retribution Project - Star Citizen FanArt',
                'base de science science-fiction': 'Science-fiction science base',
                'Imagination de shooting photo': 'Photo shoot imagination',
                'Epave d\'une station spatiale': 'Wreck of a space station',
                'Projet Terra - Exoplanète et sa lune': 'Terra Project - Exoplanet and its moon',
                'Projet de conception de téléphone pour mon Baccalauréat': 'Phone design project for my Baccalaureate',
                'Paysage avec un trou noir': 'Landscape with a black hole',
                'Batiment avec textures réalistes': 'Building with realistic textures',
                'maraicages dans une forêt': 'Marshlands in a forest',
                'lune + Displacement map': 'Moon + Displacement map',
                '...': '...',
                'Starship + nuages volumétriques': 'Starship + volumetric clouds',
                'The Colossus - Un vaisseau spacial Game-Ready avec intérieur visitable': 'The Colossus - A Game-Ready spaceship with visitable interior',
                'VFX tracking Apple Vision Pro': 'VFX tracking Apple Vision Pro',
                'VFX tracking Lamborghini': 'VFX tracking Lamborghini',
                'Level design + Batiments inspirés du jeu Star Citizen (Blender + Unreal Engine)': 'Level design + Buildings inspired by Star Citizen game (Blender + Unreal Engine)',
                'Environnement fait sur entièrement sur Blender': 'Environment made entirely in Blender',
                'Chaine de machines imprimables en 3D - Inspiré du jeu Satisfactory': '3D printable machine chain - Inspired by Satisfactory game',
                'Séries de tournages pour l\'entreprise EDF': 'Series of shoots for EDF company',
                'Montage pour Electromontage Elec sur After Effects': 'Editing for Electromontage Elec on After Effects',
                'Tournages et Montage vidéo pour l\'émission La Vie Du Chef': 'Video shooting and editing for La Vie Du Chef show'
            }
        };
        
        this.init();
    }
    
    init() {
        this.createLanguageToggle();
        this.saveOriginalDescriptions(); // Sauvegarder les descriptions originales
        this.applyTranslations();
        this.updateDocumentLanguage();
    }
    
    saveOriginalDescriptions() {
        // Sauvegarder les descriptions originales une seule fois
        if (this.originalDescriptions.size === 0) {
            document.querySelectorAll('[data-description]').forEach(element => {
                const originalDesc = element.getAttribute('data-description');
                this.originalDescriptions.set(element, originalDesc);
            });
        }
    }
    
    createLanguageToggle() {
        // Chercher les boutons existants dans le HTML
        const languageSwitcher = document.querySelector('.language-switcher');
        
        if (languageSwitcher) {
            // Si les boutons existent déjà dans le HTML, les configurer
            const buttons = languageSwitcher.querySelectorAll('.lang-btn');
            
            // Mettre à jour l'état actif selon la langue courante
            buttons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === this.currentLanguage);
            });
            
            // Ajouter les événements de clic
            languageSwitcher.addEventListener('click', (e) => {
                if (e.target.classList.contains('lang-btn')) {
                    const newLang = e.target.dataset.lang;
                    if (newLang !== this.currentLanguage) {
                        this.switchLanguage(newLang);
                    }
                }
            });
        } else {
            // Créer dynamiquement si pas trouvé (rétrocompatibilité)
            const languageToggle = document.createElement('div');
            languageToggle.className = 'language-toggle';
            languageToggle.innerHTML = `
                <button class="lang-btn ${this.currentLanguage === 'fr' ? 'active' : ''}" data-lang="fr">
                    FR
                </button>
                <button class="lang-btn ${this.currentLanguage === 'en' ? 'active' : ''}" data-lang="en">
                    EN
                </button>
            `;
            
            // Ajouter à la navigation
            const nav = document.querySelector('nav ul');
            if (nav) {
                const langItem = document.createElement('li');
                langItem.appendChild(languageToggle);
                nav.appendChild(langItem);
            }
            
            // Ajouter les événements de clic
            languageToggle.addEventListener('click', (e) => {
                if (e.target.classList.contains('lang-btn')) {
                    const newLang = e.target.dataset.lang;
                    if (newLang !== this.currentLanguage) {
                        this.switchLanguage(newLang);
                    }
                }
            });
        }
    }
    
    switchLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('portfolio-language', lang);
        
        // Mettre à jour l'état des boutons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Appliquer les traductions
        this.applyTranslations();
        this.updateDocumentLanguage();
        
        // Animation fluide
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 150);
    }
    
    applyTranslations() {
        const translations = this.translations[this.currentLanguage];
        
        // Traduire tous les éléments avec data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[key];
                } else {
                    element.textContent = translations[key];
                }
            }
        });
        
        // Changer le lien du CV selon la langue
        this.updateCVLink();
        
        // Traduire les descriptions des images du portfolio
        this.originalDescriptions.forEach((originalDescription, element) => {
            if (this.currentLanguage === 'fr') {
                // Remettre la description française originale
                element.setAttribute('data-description', originalDescription);
            } else {
                // Appliquer la traduction anglaise si elle existe
                const translation = translations[originalDescription];
                if (translation) {
                    element.setAttribute('data-description', translation);
                }
            }
        });
        
        // Mettre à jour le titre de la page
        this.updatePageTitle();
    }
    
    updatePageTitle() {
        const currentTitle = document.title;
        if (this.currentLanguage === 'en') {
            document.title = currentTitle
                .replace('Portfolio Ugo Ravard', 'Ugo Ravard Portfolio')
                .replace('Mon Portfolio', 'My Portfolio');
        } else {
            document.title = currentTitle
                .replace('Ugo Ravard Portfolio', 'Portfolio Ugo Ravard')
                .replace('My Portfolio', 'Mon Portfolio');
        }
    }
    
    updateCVLink() {
        // Trouver le lien du CV
        const cvLink = document.querySelector('a[data-translate="📄 Voir mon CV"]');
        if (cvLink) {
            if (this.currentLanguage === 'en') {
                // Lien vers le CV en anglais
                cvLink.href = 'https://www.canva.com/design/DAGjzlgawts/J7foXKJX4g_Yy0YpsQaT-w/edit?utm_content=DAGjzlgawts&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton';
            } else {
                // Lien vers le CV en français (original)
                cvLink.href = 'https://www.canva.com/design/DAGivKtUR64/-KT03Q_Ya9h_PIMTtj5ceA/edit?utm_content=DAGivKtUR64&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton';
            }
        }
    }
    
    updateDocumentLanguage() {
        document.documentElement.setAttribute('lang', this.currentLanguage);
    }
    
    // Méthode utilitaire pour obtenir une traduction
    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
    
    // Méthode pour ajouter une nouvelle traduction à chaud
    addTranslation(key, frText, enText) {
        this.translations.fr[key] = frText;
        this.translations.en[key] = enText;
    }
}

// Variables globales
let translationSystem = null;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    translationSystem = new TranslationSystem();
    
    // Debug info
    console.log('🌐 Translation System initialized');
    console.log('Current language:', translationSystem.currentLanguage);
});
