// Système de traduction simple FR <-> EN
class SimpleTranslation {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'fr';
        
        // Traductions directes : Français = English
        this.translations = {
            // Navigation
            'PORTFOLIO UGO RAVARD': 'UGO RAVARD PORTFOLIO',
            'PRÉSENTATION': 'ABOUT',
            'PORTFOLIO': 'PORTFOLIO', 
            'CV': 'RESUME',
            'CONTACT': 'CONTACT',
            'ACCUEIL': 'HOME',
            
            // Page présentation
            'ARTISTE 3D': '3D ARTIST',
            'Je m\'appelle Ugo Ravard, j\'ai 18 ans et je suis passionné par la création numérique et la 3D depuis plusieurs années. J\'aime donner vie à des idées à travers la modélisation, l\'animation et la conception visuelle. Actuellement étudiant au CNAM Enjmin, une école reconnue en France dans le domaine du jeu vidéo et de la création numérique, je développe mes compétences artistiques et techniques pour bâtir une carrière dans l\'industrie créative. Ce portfolio rassemble mes travaux et projets, reflets de mon univers et de mon évolution artistique.': 'My name is Ugo Ravard, I am 18 years old and passionate about digital creation and 3D for several years. I love bringing ideas to life through modeling, animation and visual design. Currently studying at CNAM Enjmin, a renowned school in France in video games and digital creation, I develop my artistic and technical skills to build a career in the creative industry. This portfolio brings together my work and projects, reflections of my universe and artistic evolution.',
            '🎨 PORTFOLIO SITE WEB': '🎨 WEBSITE PORTFOLIO',
            
            // Badges
            '5 ans d\'expérience': '5 years experience',
            'École CNAM Enjmin': 'CNAM Enjmin School', 
            'Super gentil :)': 'Super nice :)',
            'TRAVAILLONS ENSEMBLE !': 'LET\'S WORK TOGETHER!',
            
            // CV Section
            'Mon CV': 'My Resume',
            'Découvrez mon parcours, mes compétences et mes expériences professionnelles.': 'Discover my background, skills and professional experiences.',
            '📄 Voir mon CV': '📄 View my Resume',
            
            // Logiciels
            'Logiciels & Outils': 'Software & Tools',
            'Les outils que j\'utilise pour donner vie à mes créations': 'The tools I use to bring my creations to life',
            
            // Contact
            'Envoyez-moi un message': 'Send me a message',
            'Votre nom': 'Your name',
            'Votre email': 'Your email', 
            'Votre message...': 'Your message...',
            '📩 Envoyer le message': '📩 Send message',
            
            // Portfolio
            'Mes Meilleurs Projets': 'My Best Projects',
            'ALL': 'ALL',
            '3D': '3D',
            'Tournage/Montage': 'Filming/Editing',
            
            // Projets descriptions courtes pour les data-description
            'vaisseau spatial game-ready': 'game-ready spaceship',
            'qualité AAA': 'AAA quality',
            'extérieur + intérieur': 'exterior + interior', 
            'animation et demoreel': 'animation and demoreel',
            'ville futuriste': 'futuristic city',
            'modélisation et animation': 'modeling and animation',
            'armure futuriste': 'futuristic armor',
            'matériaux détaillés': 'detailed materials',
            'base terrestre': 'terrestrial base',
            'moto spatiale': 'space motorcycle',
            'concept design': 'concept design',
            'environnement sci-fi': 'sci-fi environment',
            'station orbitale': 'orbital station',
            'level design': 'level design',
            'composition et lightning': 'composition and lighting',
            'rendu photoréaliste': 'photorealistic rendering',
            'jeu vidéo': 'video game',
            'énigmes en FPS': 'FPS puzzles',
            'développé en équipe': 'team developed',
            'Blender + Unity': 'Blender + Unity',
            'vaisseau chasseur lourd': 'heavy fighter ship',
            'projet personnel': 'personal project',
            'work in progress': 'work in progress',
            'eoliennes au dessus des nuages': 'wind turbines above clouds',
            'route sous la pluie': 'road in the rain',
            'effets de particules': 'particle effects',
            'éclairage atmosphérique': 'atmospheric lighting',
            'rendu volumétrique': 'volumetric rendering',
            'véhicule spatial futuriste': 'futuristic space vehicle',
            'reproduction fidèle': 'faithful reproduction',
            'casque avec matériaux réalistes': 'helmet with realistic materials',
            'scène conceptuelle': 'conceptual scene',
            'rendu sur Twinmotion': 'rendered on Twinmotion',
            'inspiré de Star Wars': 'Star Wars inspired',
            'reproduction du vaisseau': 'ship reproduction',
            'à partir d\'une image 2D': 'from a 2D image',
            'architecture futuriste': 'futuristic architecture',
            'shading, lightning, compositing': 'shading, lighting, compositing',
            'mise en scène avec lighting studio': 'studio lighting setup',
            'épave d\'une station': 'station wreck',
            'conception de planète': 'planet conception',
            'matériaux nodaux': 'nodal materials',
            'conception téléphone 3D': '3D phone design',
            'présentation vidéo complète': 'complete video presentation',
            'trou noir et distorsion': 'black hole and distortion',
            'textures PBR photoréalistes': 'photorealistic PBR textures',
            'environnements marécageux': 'swamp environments',
            'displacement mapping': 'displacement mapping',
            'tests de lighting': 'lighting tests',
            'nuages volumétriques': 'volumetric clouds',
            'atmosphère réaliste': 'realistic atmosphere',
            'textures et matériaux': 'textures and materials',
            'processus de création': 'creation process',
            'tracking et VFX': 'tracking and VFX',
            'compositing VFX avancé': 'advanced VFX compositing',
            'conception sur Gaea': 'designed on Gaea',
            'rendu sur Unreal Engine 5': 'rendered on Unreal Engine 5',
            'environnement naturel': 'natural environment',
            'matériaux procéduraux': 'procedural materials',
            'modèles 3D techniques': 'technical 3D models',
            'inspiré du jeu Satisfactory': 'inspired by Satisfactory game',
            'pour un particulier sur Fiverr': 'for a client on Fiverr',
            'tournages professionnels': 'professional filming',
            'sur Bordeaux, Toulouse, Anglet': 'in Bordeaux, Toulouse, Anglet',
            'post production et VFX': 'post production and VFX',
            'tournages et montages': 'filming and editing',
            'émission YouTube': 'YouTube show',
            
            // Footer
            '© 2025 Ugo Ravard - Tous droits réservés': '© 2025 Ugo Ravard - All rights reserved',
            'Conditions générales d\'utilisation': 'Terms and Conditions of Use',
            
            // Test page
            'Test du Système de Traduction': 'Translation System Test',
            'Textes de Test': 'Test Texts',
            'Bonjour, ceci est un test du système de traduction.': 'Hello, this is a translation system test.',
            'Informations de Debug': 'Debug Information'
        };
        
        this.init();
    }
    
    init() {
        this.createLanguageButtons();
        this.applyTranslations();
    }
    
    createLanguageButtons() {
        console.log('🔧 Création des boutons de langue...');
        
        // Supprimer ancien toggle s'il existe
        const oldToggle = document.querySelector('.language-toggle');
        if (oldToggle) oldToggle.remove();
        
        // Créer nouveaux boutons
        const toggle = document.createElement('div');
        toggle.className = 'language-toggle';
        
        // Bouton français
        const frBtn = document.createElement('button');
        frBtn.className = `lang-btn ${this.currentLanguage === 'fr' ? 'active' : ''}`;
        frBtn.innerHTML = '🇫🇷 FR';
        frBtn.addEventListener('click', () => this.switchLanguage('fr'));
        
        // Bouton anglais
        const enBtn = document.createElement('button');
        enBtn.className = `lang-btn ${this.currentLanguage === 'en' ? 'active' : ''}`;
        enBtn.innerHTML = '🇺🇸 EN';
        enBtn.addEventListener('click', () => this.switchLanguage('en'));
        
        toggle.appendChild(frBtn);
        toggle.appendChild(enBtn);
        
        // Ajouter dans le header
        const header = document.querySelector('header .header-content');
        if (header) {
            header.appendChild(toggle);
            console.log('✅ Boutons de langue ajoutés au header');
        } else {
            console.error('❌ Header .header-content introuvable !');
        }
    }
    
    switchLanguage(lang) {
        console.log('Switching to language:', lang);
        
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        
        // Mettre à jour les boutons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.includes(lang.toUpperCase())) {
                btn.classList.add('active');
            }
        });
        
        this.applyTranslations();
        
        // Animation fluide
        document.body.style.opacity = '0.9';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 150);
    }
    
    applyTranslations() {
        // Sauvegarder les textes originaux français la première fois
        if (!this.originalTexts) {
            this.originalTexts = new Map();
            document.querySelectorAll('[data-translate]').forEach(element => {
                this.originalTexts.set(element, element.getAttribute('data-translate'));
            });
            
            this.originalDescriptions = new Map();
            document.querySelectorAll('[data-description]').forEach(element => {
                this.originalDescriptions.set(element, element.getAttribute('data-description'));
            });
        }
        
        if (this.currentLanguage === 'fr') {
            // Remettre les textes français originaux
            this.originalTexts.forEach((originalText, element) => {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = originalText;
                } else {
                    element.textContent = originalText;
                }
            });
            
            // Remettre les descriptions françaises
            this.originalDescriptions.forEach((originalDesc, element) => {
                element.setAttribute('data-description', originalDesc);
            });
        } else {
            // Traduire en anglais
            this.originalTexts.forEach((originalText, element) => {
                const translation = this.translations[originalText];
                if (translation) {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = translation;
                    } else {
                        element.textContent = translation;
                    }
                }
            });
            
            // Traduire les descriptions
            this.originalDescriptions.forEach((originalDesc, element) => {
                let translatedDesc = originalDesc;
                
                Object.keys(this.translations).forEach(fr => {
                    const en = this.translations[fr];
                    translatedDesc = translatedDesc.replace(new RegExp(fr, 'gi'), en);
                });
                
                element.setAttribute('data-description', translatedDesc);
            });
        }
    }
}

// Initialiser le système
let translator;
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('🔄 Initialisation du système de traduction...');
        translator = new SimpleTranslation();
        console.log('✅ Système de traduction initialisé avec succès');
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation du système de traduction:', error);
    }
});
