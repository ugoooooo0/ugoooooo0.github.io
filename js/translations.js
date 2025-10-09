// Système de traduction manuelle pour le portfolio
class TranslationSystem {
    constructor() {
        this.currentLanguage = localStorage.getItem('portfolio-language') || 'fr';
        this.originalDescriptions = new Map(); // Pour sauvegarder les descriptions originales
        this.translations = {
            fr: {
                // Navigation principale
                'PORTFOLIO UGO RAVARD': 'PORTFOLIO UGO RAVARD',
                'Artiste 3D & Designer': 'Artiste 3D & Designer',
                'ACCUEIL': 'ACCUEIL',
                'À PROPOS': 'À PROPOS',
                'PRÉSENTATION': 'PRÉSENTATION',
                'PORTFOLIO': 'PORTFOLIO',
                'COMPÉTENCES': 'COMPÉTENCES',
                'CV': 'CV',
                'CONTACT': 'CONTACT',
                'MON PORTFOLIO': 'MON PORTFOLIO',
                
                // Section Hero
                'Ugo Ravard': 'Ugo Ravard',
                'Artiste 3D & Créateur Digital': 'Artiste 3D & Créateur Digital',
                'hero-description': 'Passionné par la création numérique, je donne vie à des univers extraordinaires à travers la 3D, l\'animation et le design visuel.',
                '🎨 Découvrir mon travail': '🎨 Découvrir mon travail',
                '💬 Me contacter': '💬 Me contacter',
                'Années d\'expérience': 'Années d\'expérience',
                'Projets réalisés': 'Projets réalisés',
                'Créativité': 'Créativité',
                
                // Section À propos
                'À propos de moi': 'À propos de moi',
                'about-text-1': 'Je m\'appelle Ugo Ravard, j\'ai 18 ans et je suis passionné par la création numérique et la 3D depuis plusieurs années. J\'aime donner vie à des idées à travers la modélisation, l\'animation et la conception visuelle.',
                'about-text-2': 'Actuellement étudiant au CNAM Enjmin, une école reconnue en France dans le domaine du jeu vidéo et de la création numérique, je développe mes compétences artistiques et techniques pour bâtir une carrière dans l\'industrie créative.',
                'about-text-3': 'Ce portfolio rassemble mes travaux et projets, reflets de mon univers et de mon évolution artistique. Chaque création raconte une histoire et témoigne de ma passion pour l\'art numérique.',
                'Formation': 'Formation',
                'CNAM Enjmin - École du jeu vidéo': 'CNAM Enjmin - École du jeu vidéo',
                'Expérience': 'Expérience',
                '5 ans de création 3D': '5 ans de création 3D',
                'Spécialités': 'Spécialités',
                '3D • Animation • Design': '3D • Animation • Design',
                
                // Section Compétences
                'Mes Compétences': 'Mes Compétences',
                'skills-description': 'Les outils et technologies que je maîtrise pour donner vie à mes créations',
                
                // Section CV
                'Mon Parcours': 'Mon Parcours',
                'cv-intro': 'Découvrez mon parcours, mes expériences et mes réalisations à travers mon CV détaillé.',
                'Cursus spécialisé en jeu vidéo': 'Cursus spécialisé en jeu vidéo',
                'Expériences': 'Expériences',
                'Projets personnels et collaboratifs': 'Projets personnels et collaboratifs',
                'Réalisations': 'Réalisations',
                'Portfolio de créations 3D': 'Portfolio de créations 3D',
                '📄 Télécharger mon CV': '📄 Télécharger mon CV',
                'Cliquez pour voir': 'Cliquez pour voir',
                
                // Section Contact
                'Travaillons Ensemble': 'Travaillons Ensemble',
                'contact-intro': 'Vous avez un projet en tête ? N\'hésitez pas à me contacter !',
                'Mes réseaux': 'Mes réseaux',
                
                // Filtres portfolio
                '2D/3D': '2D/3D',
                'Films': 'Films/Images',
                'Movies/Images': 'Movies/Images',
                
                // Page d'accueil - Section présentation
                'ARTISTE 3D': 'ARTISTE 3D',
                'presentation-text': 'Je m\'appelle Ugo Ravard, j\'ai 18 ans et je suis passionné par la création numérique et la 3D depuis plusieurs années. J\'aime donner vie à des idées à travers la modélisation, l\'animation et la conception visuelle. Actuellement étudiant au CNAM Enjmin, une école reconnue en France dans le domaine du jeu vidéo et de la création numérique, je développe mes compétences artistiques et techniques pour bâtir une carrière dans l\'industrie créative. Ce portfolio rassemble mes travaux et projets, reflets de mon univers et de mon évolution artistique.',
                '🎨 VOIR MON PORTFOLIO': '🎨 VOIR MON PORTFOLIO',
                
                // Badges de présentation
                '5 ans d\'expérience': '5 ans d\'expérience',
                'École CNAM Enjmin': 'École CNAM Enjmin',
                'Super gentil :)': 'Super gentil :)',
                
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
                
                // Section Logiciels
                'Logiciels & Outils': 'Logiciels & Outils',
                'logiciels-description': 'Les outils que j\'utilise pour donner vie à mes créations',
                'Voir plus ⌄': 'Voir plus ⌄',
                
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
                'Artiste 3D & Designer': '3D Artist & Designer',
                'ACCUEIL': 'HOME',
                'À PROPOS': 'ABOUT',
                'PRÉSENTATION': 'ABOUT',
                'PORTFOLIO': 'PORTFOLIO',
                'COMPÉTENCES': 'SKILLS',
                'CV': 'RESUME',
                'CONTACT': 'CONTACT',
                'MON PORTFOLIO': 'MY PORTFOLIO',
                
                // Section Hero
                'Ugo Ravard': 'Ugo Ravard',
                'Artiste 3D & Créateur Digital': '3D Artist & Digital Creator',
                'hero-description': 'Passionate about digital creation, I bring extraordinary worlds to life through 3D, animation and visual design.',
                '🎨 Découvrir mon travail': '🎨 Discover my work',
                '💬 Me contacter': '💬 Contact me',
                'Années d\'expérience': 'Years of experience',
                'Projets réalisés': 'Projects completed',
                'Créativité': 'Creativity',
                
                // Section À propos
                'À propos de moi': 'About me',
                'about-text-1': 'My name is Ugo Ravard, I am 18 years old and I have been passionate about digital creation and 3D for several years. I love bringing ideas to life through modeling, animation and visual design.',
                'about-text-2': 'Currently studying at CNAM Enjmin, a renowned school in France in the field of video games and digital creation, I am developing my artistic and technical skills to build a career in the creative industry.',
                'about-text-3': 'This portfolio brings together my work and projects, reflections of my universe and my artistic evolution. Each creation tells a story and reflects my passion for digital art.',
                'Formation': 'Education',
                'CNAM Enjmin - École du jeu vidéo': 'CNAM Enjmin - Video Game School',
                'Expérience': 'Experience',
                '5 ans de création 3D': '5 years of 3D creation',
                'Spécialités': 'Specialties',
                '3D • Animation • Design': '3D • Animation • Design',
                
                // Section Compétences
                'Mes Compétences': 'My Skills',
                'skills-description': 'The tools and technologies I master to bring my creations to life',
                
                // Section CV
                'Mon Parcours': 'My Journey',
                'cv-intro': 'Discover my background, experiences and achievements through my detailed resume.',
                'Cursus spécialisé en jeu vidéo': 'Specialized video game curriculum',
                'Expériences': 'Experiences',
                'Projets personnels et collaboratifs': 'Personal and collaborative projects',
                'Réalisations': 'Achievements',
                'Portfolio de créations 3D': '3D creations portfolio',
                '📄 Télécharger mon CV': '📄 Download my resume',
                'Cliquez pour voir': 'Click to view',
                
                // Section Contact
                'Travaillons Ensemble': 'Let\'s Work Together',
                'contact-intro': 'Do you have a project in mind? Don\'t hesitate to contact me!',
                'Mes réseaux': 'My networks',
                
                // Filtres portfolio
                '2D/3D': '2D/3D',
                'Films/Images': 'Movies/Images',
                
                // Page d'accueil - Section présentation
                'ARTISTE 3D': '3D ARTIST',
                'presentation-text': 'My name is Ugo Ravard, I am 18 years old and I have been passionate about digital creation and 3D for several years. I love bringing ideas to life through modeling, animation and visual design. Currently studying at CNAM Enjmin, a renowned school in France in the field of video games and digital creation, I am developing my artistic and technical skills to build a career in the creative industry. This portfolio brings together my work and projects, reflections of my universe and my artistic evolution.',
                '🎨 VOIR MON PORTFOLIO': '🎨 VIEW MY PORTFOLIO',
                
                // Badges de présentation
                '5 ans d\'expérience': '5 years experience',
                'École CNAM Enjmin': 'CNAM Enjmin School',
                'Super gentil :)': 'Super nice :)',
                
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
                
                // Section Logiciels
                'Logiciels & Outils': 'Software & Tools',
                'logiciels-description': 'The tools I use to bring my creations to life',
                'Voir plus ⌄': 'Show more ⌄',
                
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
        // Supprimer l'ancien sélecteur s'il existe
        const existingToggle = document.querySelector('.language-toggle');
        if (existingToggle) {
            existingToggle.remove();
        }
        
        // Créer le nouveau sélecteur de langue
        const languageToggle = document.createElement('div');
        languageToggle.className = 'language-toggle';
        languageToggle.innerHTML = `
            <button class="lang-btn ${this.currentLanguage === 'fr' ? 'active' : ''}" data-lang="fr">
                🇫🇷 FR
            </button>
            <button class="lang-btn ${this.currentLanguage === 'en' ? 'active' : ''}" data-lang="en">
                🇺🇸 EN
            </button>
        `;
        
        // Ajouter en haut à gauche de l'entête
        const headerContent = document.querySelector('.header-content');
        if (headerContent) {
            headerContent.appendChild(languageToggle);
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
