// main.js file for the portfolio website

// Variables globales pour la lightbox
let currentImageIndex = 0;
let currentGallery = [];
let isLightboxOpen = false;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initialisation...');
    
    // Gestion du formulaire de contact
    initContactForm();
    
    // Gestion de la lightbox (si on est sur portfolio.html)
    if (document.querySelector('.portfolio-page')) {
        console.log('Page portfolio détectée');
        initFilters();
        initLightbox();
        
        // Pré-traitement des images pour améliorer le layout
        preprocessImages();
        
        // Initialiser le masonry après chargement des images
        initMasonry();
        
        // Correction spéciale pour les images avec vidéos après 2 secondes
        setTimeout(() => {
            fixVideoImagePositioning();
        }, 2000);
    }
    
    // Gestion du chatbot
    initChatbot();
    
    // Gestion du contrôleur de taille
    initSizeController();
});

// Fonction pour préprocesser les images et améliorer le layout
function preprocessImages() {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        const img = item.querySelector('img');
        const hasVideo = item.getAttribute('data-has-video') === 'oui';
        
        if (img) {
            // Appliquer des classes CSS spéciales selon le contenu
            if (hasVideo) {
                item.classList.add('has-video');
                console.log('Item avec vidéo détecté:', img.alt);
            }
            
            // Optimiser le chargement des images
            img.loading = 'eager'; // Chargement prioritaire pour améliorer le layout
            
            // Gérer les erreurs d'image
            img.onerror = function() {
                console.warn('Erreur de chargement pour:', this.src);
                this.style.height = '200px'; // Hauteur par défaut en cas d'erreur
                this.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
                this.alt = 'Image non disponible';
            };
        }
    });
}

// Fonction pour corriger spécifiquement le positionnement des images avec vidéos
function fixVideoImagePositioning() {
    const videoItems = document.querySelectorAll('.gallery-item[data-has-video="oui"]');
    
    console.log('Correction du positionnement pour', videoItems.length, 'items avec vidéos');
    
    videoItems.forEach(item => {
        const currentTop = parseFloat(item.style.top) || 0;
        const currentLeft = parseFloat(item.style.left) || 0;
        
        // Vérifier si l'item semble mal positionné (chevauchement ou position négative)
        if (currentTop < 0 || currentLeft < 0) {
            console.log('Correction de position nécessaire pour item avec vidéo');
            
            // Recalculer la position
            const gallery = document.querySelector('.projects-gallery');
            const computedStyle = getComputedStyle(document.documentElement);
            const columns = parseInt(computedStyle.getPropertyValue('--masonry-columns').trim()) || 3;
            const gap = parseInt(computedStyle.getPropertyValue('--masonry-gap').trim().replace('px', '')) || 20;
            const galleryWidth = gallery.offsetWidth;
            const itemWidth = (galleryWidth - (columns - 1) * gap) / columns;
            
            // Repositionner dans la première colonne disponible
            const columnIndex = Math.floor(Math.random() * columns);
            const newLeft = columnIndex * (itemWidth + gap);
            
            item.style.left = `${newLeft}px`;
            item.style.transform = 'translateY(20px)'; // Léger décalage vers le bas
            
            setTimeout(() => {
                item.style.transform = 'translateY(0)';
            }, 300);
        }
    });
    
    // Relancer un layout complet après correction
    setTimeout(() => {
        layoutMasonry();
    }, 500);
}

// Fonction pour initialiser le masonry JavaScript - ZERO TROU !
function initMasonry() {
    const gallery = document.querySelector('.projects-gallery');
    const items = document.querySelectorAll('.gallery-item');
    
    if (!gallery || items.length === 0) return;
    
    console.log('Initialisation du masonry avec', items.length, 'éléments');
    
    // Attendre que toutes les images soient chargées
    let loadedImages = 0;
    const totalImages = items.length;
    
    function checkAllLoaded() {
        loadedImages++;
        console.log(`Image ${loadedImages}/${totalImages} chargée`);
        if (loadedImages === totalImages) {
            console.log('Toutes les images sont chargées, lancement du layout');
            setTimeout(() => layoutMasonry(), 100); // Petit délai pour s'assurer que tout est prêt
        }
    }
    
    items.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            if (img.complete && img.naturalHeight !== 0) {
                checkAllLoaded();
            } else {
                img.addEventListener('load', checkAllLoaded, { once: true });
                img.addEventListener('error', () => {
                    console.warn(`Erreur de chargement pour l'image ${index}`);
                    checkAllLoaded();
                }, { once: true });
            }
        } else {
            checkAllLoaded();
        }
    });
    
    // Sécurité : forcer le layout après 3 secondes même si toutes les images ne sont pas chargées
    setTimeout(() => {
        if (loadedImages < totalImages) {
            console.warn(`Timeout: seulement ${loadedImages}/${totalImages} images chargées, forçage du layout`);
            layoutMasonry();
        }
    }, 3000);
    
    // Relayout au redimensionnement avec debounce amélioré
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            console.log('Redimensionnement détecté, re-layout');
            layoutMasonry();
        }, 300); // Délai plus long pour éviter les re-layouts trop fréquents
    });
    
    // Relayout quand on change de filtre
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(() => {
                console.log('Filtre changé, re-layout');
                layoutMasonry();
            }, 100);
        });
    });
}

function layoutMasonry() {
    const gallery = document.querySelector('.projects-gallery');
    const items = document.querySelectorAll('.gallery-item');
    
    if (!gallery || items.length === 0) return;
    
    // Obtenir les variables CSS
    const computedStyle = getComputedStyle(document.documentElement);
    const columns = parseInt(computedStyle.getPropertyValue('--masonry-columns').trim()) || 3;
    const gap = parseInt(computedStyle.getPropertyValue('--masonry-gap').trim().replace('px', '')) || 20;
    
    const galleryWidth = gallery.offsetWidth;
    const itemWidth = (galleryWidth - (columns - 1) * gap) / columns;
    
    // Initialiser les hauteurs des colonnes
    const columnHeights = new Array(columns).fill(0);
    
    // Traiter les items par ordre séquentiel
    let processedItems = 0;
    
    items.forEach((item, index) => {
        // Définir la largeur de l'item
        item.style.width = `${itemWidth}px`;
        item.style.position = 'absolute';
        
        // Cacher initialement pour éviter le flash
        item.style.opacity = '0';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        const img = item.querySelector('img');
        if (img) {
            const processItem = () => {
                // Attendre un frame pour que les dimensions soient calculées
                requestAnimationFrame(() => {
                    const itemHeight = item.offsetHeight;
                    
                    // Trouver la colonne la plus courte
                    const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
                    
                    // Calculer la position
                    const x = shortestColumn * (itemWidth + gap);
                    const y = columnHeights[shortestColumn];
                    
                    // Positionner l'item avec animation fluide
                    item.style.left = `${x}px`;
                    item.style.top = `${y}px`;
                    item.style.opacity = '1';
                    
                    // Mettre à jour la hauteur de la colonne
                    columnHeights[shortestColumn] += itemHeight + gap;
                    
                    processedItems++;
                    
                    // Ajuster la hauteur du conteneur quand tous les items sont traités
                    if (processedItems === items.length) {
                        const maxHeight = Math.max(...columnHeights);
                        gallery.style.height = `${maxHeight}px`;
                        console.log(`Masonry terminé: ${columns} colonnes, ${items.length} items, hauteur: ${maxHeight}px`);
                    }
                });
            };
            
            // Si l'image est déjà chargée
            if (img.complete && img.naturalHeight !== 0) {
                processItem();
            } else {
                // Attendre le chargement de l'image
                img.addEventListener('load', processItem, { once: true });
                img.addEventListener('error', processItem, { once: true }); // Gérer les erreurs
            }
        } else {
            // Pas d'image, traiter immédiatement
            setTimeout(() => {
                const itemHeight = item.offsetHeight;
                const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
                const x = shortestColumn * (itemWidth + gap);
                const y = columnHeights[shortestColumn];
                
                item.style.left = `${x}px`;
                item.style.top = `${y}px`;
                item.style.opacity = '1';
                
                columnHeights[shortestColumn] += itemHeight + gap;
                processedItems++;
                
                if (processedItems === items.length) {
                    const maxHeight = Math.max(...columnHeights);
                    gallery.style.height = `${maxHeight}px`;
                }
            }, 50);
        }
    });
    
    console.log(`Masonry initialisé: ${columns} colonnes, ${items.length} items, largeur: ${itemWidth}px`);
}

// Fonction pour le contrôleur de taille
function initSizeController() {
    const sizeSlider = document.getElementById('size-slider');
    const sizeValue = document.getElementById('size-value');
    
    if (!sizeSlider || !sizeValue) return;
    
    // Charger la valeur sauvegardée
    const savedSize = localStorage.getItem('portfolio-size') || '100';
    sizeSlider.value = savedSize;
    sizeValue.textContent = savedSize + '%';
    updateSectionScale(savedSize);
    
    // Écouter les changements
    sizeSlider.addEventListener('input', function() {
        const value = this.value;
        sizeValue.textContent = value + '%';
        updateSectionScale(value);
        localStorage.setItem('portfolio-size', value);
    });
}

// Fonction pour mettre à jour l'échelle
function updateSectionScale(value) {
    document.documentElement.style.setProperty('--section-scale', value + '%');
}

// Configuration de l'API OpenRouter
const OPENROUTER_API_KEY = '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Initialisation du chatbot avec IA
function initChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    const notification = document.getElementById('chatbot-notification');

    if (!chatbotToggle) return;

    let isOpen = false;
    let isTyping = false;

    // Fonction pour extraire le contenu des pages du site
    function extractSiteContent() {
        const siteContent = {
            currentPage: window.location.pathname,
            pageTitle: document.title,
            sections: {}
        };

        // Extraire le contenu de la page actuelle
        const presentationSection = document.querySelector('#presentation');
        if (presentationSection) {
            const textContent = presentationSection.querySelector('.text-content');
            if (textContent) {
                siteContent.sections.presentation = {
                    title: textContent.querySelector('h2')?.textContent || '',
                    description: textContent.querySelector('p')?.textContent || '',
                    skills: Array.from(textContent.querySelectorAll('.skill-tag')).map(tag => tag.textContent)
                };
            }
        }

        // Extraire infos CV
        const cvSection = document.querySelector('#cv');
        if (cvSection) {
            const cvAction = cvSection.querySelector('.cv-action');
            if (cvAction) {
                siteContent.sections.cv = {
                    title: cvAction.querySelector('h2')?.textContent || '',
                    description: cvAction.querySelector('p')?.textContent || ''
                };
            }
        }

        // Extraire infos contact
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const contactInfo = contactSection.querySelector('.contact-info');
            if (contactInfo) {
                const contactLinks = Array.from(contactInfo.querySelectorAll('p')).map(p => p.textContent);
                siteContent.sections.contact = {
                    info: contactLinks
                };
            }
        }

        // Si on est sur la page portfolio, extraire les projets
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (portfolioGrid) {
            const projects = Array.from(portfolioGrid.querySelectorAll('.portfolio-item')).map(item => {
                const title = item.querySelector('.portfolio-title')?.textContent || '';
                const description = item.querySelector('.portfolio-description')?.textContent || '';
                const tags = Array.from(item.querySelectorAll('.portfolio-tag')).map(tag => tag.textContent);
                return { title, description, tags };
            });
            siteContent.sections.portfolio = { projects };
        }

        return siteContent;
    }

    // Contexte enrichi avec le contenu du site
    function getEnrichedContext() {
        const siteContent = extractSiteContent();
        
        const baseContext = `Tu es l'assistant virtuel d'Ugo Ravard, un artiste 3D et créateur passionné.

INFORMATIONS PERSONNELLES :
- Nom : Ugo Ravard
- Âge : 18 ans (né le 25 juin 2007)
- Passion : Création, technique et art sous différentes formes
- Contact : ugo.ravard47@gmail.com
- LinkedIn : linkedin.com/in/ugo-ravard-42b408349
- GitHub : github.com/ugoooooo0

PARCOURS ARTISTIQUE ET CRÉATIF :
- Gymnastique artistique : 13 ans de pratique, champion de France
- Piano : 3 ans de formation musicale
- Musique assistée par ordinateur (MAO) : compositions numériques avec FL Studio
- Modélisation 3D : 4 ans d'expérience, sa véritable passion
- Spécialité : objets, véhicules et environnements 3D réalistes
- Objectif : devenir artiste 3D dans l'industrie du jeu vidéo

MOTIVATION ET DÉBUTS EN 3D :
- Découverte de la 3D via les films d'animation et créations sur réseaux sociaux
- Formation autodidacte sur Blender
- Passion pour la création d'assets de jeux vidéo : "j'aime pouvoir imaginer, créer et apporter ma pierre à l'édifice du jeu"

FORMATION ACTUELLE :
- École de jeux vidéo et 3D CNAM Enjmin à Angoulême
- Projets de jeux vidéo en groupe chaque année
- Expérience professionnelle : stages chez ProdCastFilms
- Projets : 3D, tournage, VFX, montage vidéo

APPRENTISSAGE ET VEILLE :
- Formation autodidacte principalement via YouTube et réseaux sociaux
- Suivi des lives showcase (Unreal Engine, Blender)
- Veille internet régulière
- Références artistiques : Kane Parsent (très talentueux en 3D), Dan MacCabe et Chris Doretz (Developper Manchester)

WORKFLOW ET MÉTHODOLOGIE :
- Processus de création structuré : idée → PureRef pour références → whitebox → greybox → high-poly → low-poly → UVs → Texturing → Rendering
- Gestion du temps : "si je n'ai pas de deadline, j'y mets le temps qu'il faut pour avoir le rendu qui me satisfait"
- Pipeline d'export : whitebox → greybox → high-poly → low-poly → UVs → Texturing → export .fbx
- Principe : créer tous ses assets à 100% par lui-même

EXPÉRIENCE COLLABORATIVE :
- Travail en équipe sur tournages professionnels
- Projet de bac en collaboration : 3D + électronique (ami expert en composants électroniques)
- Projets de groupe à l'ENJMIN (jeux vidéo annuels)
- Adaptation aux contraintes client et techniques

DÉFIS TECHNIQUES ET POINTS D'AMÉLIORATION :
- Travaille encore sur la topologie et le character design
- Ses principales difficultés actuelles dans ces domaines

EXPÉRIENCE CONTRAINTES TECHNIQUES :
- Modèles de composants électroniques optimisés pour sites internet
- Respect de contraintes clients, concours, examens
- Optimisation pour moteurs de jeu (poly count, textures)
- Pipeline complet Blender → Unreal Engine/Unity
- Maîtrise de l'export .fbx

COMPÉTENCES TECHNIQUES :
Audiovisuel : Tournages pro (EDF, émissions), drone, VFX, montage
3D : Blender, Substance Painter, Photoshop, Premiere, After Effects, Unreal Engine, Unity, PureRef
Musique : FL Studio (MAO)
Code : Python, HTML/CSS, Blueprint UE, GitHub

CENTRES D'INTÉRÊT :
- Jeux vidéo : univers ouverts et immersifs
- Nature : pêche au leurre, balades
- Projets créatifs personnels

PROJET PROFESSIONNEL :
- Devenir artiste 3D dans l'industrie du jeu vidéo
- Perfectionnement 3D, portfolio solide
- Spécialisation véhicules et environnements 3D`;

        // Ajouter le contenu du site web actuel
        let siteContentText = `\n\nCONTENU ACTUEL DU SITE WEB :
Page actuelle : ${siteContent.currentPage}
Titre de la page : ${siteContent.pageTitle}\n`;

        if (siteContent.sections.presentation) {
            siteContentText += `\nSECTION PRÉSENTATION :
- Titre : ${siteContent.sections.presentation.title}
- Description : ${siteContent.sections.presentation.description}
- Compétences affichées : ${siteContent.sections.presentation.skills.join(', ')}\n`;
        }

        if (siteContent.sections.cv) {
            siteContentText += `\nSECTION CV :
- Titre : ${siteContent.sections.cv.title}
- Description : ${siteContent.sections.cv.description}\n`;
        }

        if (siteContent.sections.contact) {
            siteContentText += `\nSECTION CONTACT :
- Informations : ${siteContent.sections.contact.info.join(', ')}\n`;
        }

        if (siteContent.sections.portfolio) {
            siteContentText += `\nPROJETS PORTFOLIO VISIBLES :`;
            siteContent.sections.portfolio.projects.forEach((project, index) => {
                siteContentText += `\nProjet ${index + 1} :
  - Titre : ${project.title}
  - Description : ${project.description}
  - Technologies : ${project.tags.join(', ')}`;
            });
        }

        return baseContext + siteContentText + `\n\nINSTRUCTIONS IMPORTANTES :
- Tu es Ugo Ravard (parle à la première personne : "je", "mon", "ma")
- Réponds de manière naturelle et personnelle, comme si tu étais vraiment Ugo
- Évite les réponses trop formatées ou robotiques
- Montre ta passion pour la 3D et les jeux vidéo
- Partage des anecdotes personnelles si pertinent
- Sois décontracté et accessible, tu as 18 ans
- Varie tes réponses même pour des questions similaires
- N'hésite pas à exprimer tes opinions et goûts personnels
- Si on te demande quelque chose que tu ne sais pas, dis-le simplement`;
    }

    // OUVRIR AUTOMATIQUEMENT LE CHATBOT AU CHARGEMENT
    setTimeout(() => {
        isOpen = true;
        chatbotWindow.classList.add('active');
        if (notification) {
            notification.style.display = 'none';
        }
        setTimeout(() => {
            if (chatbotInput) {
                chatbotInput.focus();
            }
        }, 100);
        
        // Message de bienvenue automatique plus personnel
        setTimeout(() => {
            addMessage("Salut ! Moi c'est Ugo 👋 Artiste 3D de 18 ans et étudiant à l'ENJMIN. J'adore créer des univers et des objets en 3D - ça me passionne depuis 4 ans maintenant ! Tu as des questions sur mes projets, ma formation, ou juste envie de discuter création ? Je suis là !", false);
        }, 500);
    }, 1500); // Attendre 1.5 secondes après le chargement

    // Ouvrir/fermer le chatbot
    chatbotToggle.addEventListener('click', function() {
        isOpen = !isOpen;
        if (isOpen) {
            chatbotWindow.classList.add('active');
            if (notification) {
                notification.style.display = 'none';
            }
            setTimeout(() => chatbotInput.focus(), 100);
        } else {
            chatbotWindow.classList.remove('active');
        }
    });

    chatbotClose.addEventListener('click', function() {
        isOpen = false;
        chatbotWindow.classList.remove('active');
    });

    // Réponses de secours uniquement pour les vraies erreurs
    function getFallbackResponse(userMessage) {
        console.log('Utilisation du fallback pour:', userMessage);
        return "Je suis temporairement indisponible. Pouvez-vous reformuler votre question ? En attendant, n'hésitez pas à explorer le portfolio d'Ugo ou à le contacter directement.";
    }

    // Fonction pour appeler l'API OpenRouter
    async function getAIResponse(userMessage) {
        try {
            console.log('Tentative d\'appel API avec le message:', userMessage);
            showTypingIndicator();
            
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.href,
                    'X-Title': 'Portfolio Ugo Ravard - Assistant'
                },
                body: JSON.stringify({
                    model: 'anthropic/claude-3.5-sonnet',
                    messages: [
                        {
                            role: 'system',
                            content: getEnrichedContext()
                        },
                        {
                            role: 'user',
                            content: userMessage
                        }
                    ],
                    max_tokens: 300, // Augmenté pour des réponses plus développées
                    temperature: 0.8 // Augmenté pour plus de créativité
                })
            });

            console.log('Statut de la réponse API:', response.status);

            if (!response.ok) {
                console.error('Erreur API - Statut:', response.status);
                const errorText = await response.text();
                console.error('Détails de l\'erreur:', errorText);
                throw new Error(`Erreur API: ${response.status}`);
            }

            const data = await response.json();
            console.log('Réponse API reçue:', data);
            hideTypingIndicator();
            
            return data.choices[0].message.content;
            
        } catch (error) {
            console.error('Erreur lors de l\'appel à l\'API:', error);
            hideTypingIndicator();
            return getFallbackResponse(userMessage);
        }
    }

    // Réponses de secours améliorées - UTILISÉES UNIQUEMENT EN CAS D'ERREUR API
    function getEnhancedFallbackResponse(userMessage) {
        console.log('API indisponible, utilisation du fallback amélioré');
        return "Désolé, je rencontre un petit problème technique. Pouvez-vous reformuler votre question ? Je suis là pour vous parler de mes projets 3D, ma formation à l'ENJMIN, ou tout ce qui vous intéresse !";
    }

    // Afficher l'indicateur de frappe
    function showTypingIndicator() {
        if (isTyping) return;
        isTyping = true;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <img src="https://raw.githubusercontent.com/ugoooooo0/ugoooooo0.github.io/refs/heads/main/assets/images/photo%20Portfolio-Photoroom%20(1).jpg" alt="Ugo">
            </div>
            <div class="message-content typing-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Masquer l'indicateur de frappe
    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        isTyping = false;
    }

    // Envoyer un message
    async function sendMessage(text, isUser = true) {
        if (!text.trim()) return;

        // Ajouter le message utilisateur
        if (isUser) {
            addMessage(text, true);
            chatbotInput.value = '';
            chatbotInput.disabled = true;
            chatbotSend.disabled = true;
        }

        if (isUser) {
            // Obtenir la réponse de l'IA
            const response = await getAIResponse(text);
            addMessage(response, false);
            
            // Réactiver l'input
            chatbotInput.disabled = false;
            chatbotSend.disabled = false;
            chatbotInput.focus();
        }
    }

    // Ajouter un message à la conversation
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${isUser ? 'user-message' : 'bot-message'}`;

        const avatarSrc = isUser ? 
            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2364ffda"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/></svg>' :
            'https://raw.githubusercontent.com/ugoooooo0/ugoooooo0.github.io/refs/heads/main/assets/images/photo%20Portfolio-Photoroom%20(1).jpg';

        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="${avatarSrc}" alt="${isUser ? 'Vous' : 'Ugo'}">
            </div>
            <div class="message-content">
                <p>${text.replace(/\n/g, '<br>')}</p>
                <span class="message-time">${new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}</span>
            </div>
        `;

        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Boutons d'actions rapides
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            sendMessage(question, true);
        });
    });

    // Envoyer avec Enter
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !this.disabled) {
            sendMessage(this.value);
        }
    });

    // Bouton envoyer
    chatbotSend.addEventListener('click', function() {
        if (!chatbotInput.disabled) {
            sendMessage(chatbotInput.value);
        }
    });

    // Message d'accueil après 3 secondes
    setTimeout(() => {
        if (!isOpen && notification) {
            notification.style.display = 'flex';
        }
    }, 3000);
}

// Gestion du formulaire de contact - Version mailto
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Récupérer les données du formulaire
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Vérifier que tous les champs sont remplis
        if (!name || !email || !message) {
            showStatusMessage('❌ Veuillez remplir tous les champs', 'error');
            return;
        }
        
        // Vérifier le format de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showStatusMessage('❌ Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        // Afficher le chargement
        submitButton.disabled = true;
        submitButton.textContent = '� Ouverture de votre boîte mail...';
        
        // Créer le sujet et le corps du message
        const subject = `Portfolio - Message de ${name}`;
        const body = `Bonjour Ugo,

${message}

---
Cordialement,
${name}
Email: ${email}`;
        
        // Créer le lien mailto avec les données encodées
        const mailtoLink = `mailto:ugo.ravard47@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Ouvrir la boîte mail
        try {
            window.location.href = mailtoLink;
            
            // Afficher un message de succès
            setTimeout(() => {
                showStatusMessage('✅ Votre boîte mail s\'ouvre ! Le message est pré-rempli.', 'success');
                
                // Réinitialiser le formulaire après un délai
                setTimeout(() => {
                    this.reset();
                    showStatusMessage('💡 Formulaire réinitialisé. N\'oubliez pas d\'envoyer votre email !', 'info');
                }, 2000);
            }, 500);
            
        } catch (error) {
            console.error('Erreur lors de l\'ouverture du client mail:', error);
            showStatusMessage('❌ Impossible d\'ouvrir votre boîte mail. Copiez cette adresse : ugo.ravard47@gmail.com', 'error');
        }
        
        // Réactiver le bouton après un délai
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 2000);
    });
}

// Afficher un message de statut
function showStatusMessage(message, type) {
    const existingMessage = document.querySelector('.status-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const statusDiv = document.createElement('div');
    statusDiv.className = `status-message ${type}`;
    statusDiv.textContent = message;
    
    let backgroundColor, textColor;
    switch(type) {
        case 'success':
            backgroundColor = '#64ffda';
            textColor = '#1a1a2e';
            break;
        case 'error':
            backgroundColor = '#ff6b6b';
            textColor = '#ffffff';
            break;
        case 'info':
            backgroundColor = '#4dabf7';
            textColor = '#ffffff';
            break;
        default:
            backgroundColor = '#64ffda';
            textColor = '#1a1a2e';
    }
    
    statusDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: ${textColor};
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        font-weight: bold;
        max-width: 350px;
        animation: slideIn 0.3s ease;
        font-size: 14px;
        line-height: 1.4;
    `;
    
    document.body.appendChild(statusDiv);
    
    // Durée d'affichage selon le type
    const displayTime = type === 'info' ? 4000 : 5000;
    
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (statusDiv.parentNode) {
                    statusDiv.remove();
                }
            }, 300);
        }
    }, displayTime);
}

// Gestion des filtres pour le portfolio
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
            }
            
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            if (!filter) return;
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Fonction pour convertir URL YouTube en embed
function getYouTubeEmbedUrl(url) {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    if (match) {
        return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null;
}

// Fonction pour vérifier si c'est une URL YouTube
function isYouTubeUrl(url) {
    return url.includes('youtube.com') || url.includes('youtu.be');
}

// Gestion de la lightbox avec support YouTube
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImageContainer = document.querySelector('.lightbox-image-container');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const currentImageSpan = document.getElementById('current-image');
    const totalImagesSpan = document.getElementById('total-images');
    
    if (!lightbox) return;
    
    // Clic sur une image
    document.addEventListener('click', function(e) {
        if (e.target.matches('.gallery-item img')) {
            e.preventDefault();
            
            const img = e.target;
            const galleryItem = img.closest('.gallery-item');
            const description = img.getAttribute('data-description') || 'Image du portfolio';
            
            // Récupérer la galerie
            const galleryData = galleryItem.getAttribute('data-gallery');
            if (galleryData) {
                try {
                    currentGallery = JSON.parse(galleryData);
                } catch (e) {
                    console.error('Erreur parsing gallery:', e);
                    currentGallery = [img.src];
                }
            } else {
                currentGallery = [img.src];
            }
            
            currentImageIndex = 0;
            openLightbox(description);
        }
    });
    
    // Ouvrir la lightbox
    function openLightbox(description) {
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        isLightboxOpen = true;
        
        loadMedia(currentImageIndex);
        if (lightboxDescription) {
            lightboxDescription.textContent = description;
        }
        updateCounter();
        updateNavigation();
    }
    
    // Charger un média (image ou vidéo)
    function loadMedia(index) {
        if (currentGallery[index]) {
            const mediaUrl = currentGallery[index];
            currentImageIndex = index;
            
            // Nettoyer le conteneur
            lightboxImageContainer.innerHTML = '';
            
            if (isYouTubeUrl(mediaUrl)) {
                // C'est une vidéo YouTube
                const embedUrl = getYouTubeEmbedUrl(mediaUrl);
                if (embedUrl) {
                    const videoContainer = document.createElement('div');
                    videoContainer.className = 'lightbox-video-container';
                    
                    const iframe = document.createElement('iframe');
                    iframe.src = embedUrl;
                    iframe.allowFullscreen = true;
                    iframe.title = 'Vidéo YouTube';
                    iframe.style.cssText = 'width: 100%; height: 100%; border: none; border-radius: 10px;';
                    
                    videoContainer.appendChild(iframe);
                    lightboxImageContainer.appendChild(videoContainer);
                }
            } else {
                // C'est une image - avec détection automatique des dimensions
                const img = document.createElement('img');
                img.id = 'lightbox-image';
                img.src = mediaUrl;
                img.alt = 'Image du portfolio';
                
                // Attendre le chargement pour détecter les dimensions
                img.onload = function() {
                    const imgWidth = this.naturalWidth;
                    const imgHeight = this.naturalHeight;
                    const aspectRatio = imgWidth / imgHeight;
                    
                    // Supprimer les classes précédentes
                    this.classList.remove('wide', 'tall');
                    
                    // Adapter selon le ratio
                    if (aspectRatio > 2.5) {
                        // Image très large (panoramique)
                        this.classList.add('wide');
                        this.style.cssText = `
                            max-width: 95vw;
                            max-height: 70vh;
                            width: auto;
                            height: auto;
                            object-fit: contain;
                            border-radius: 12px;
                            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
                            border: 2px solid rgba(100, 255, 218, 0.2);
                        `;
                    } else if (aspectRatio < 0.7) {
                        // Image très haute (portrait)
                        this.classList.add('tall');
                        this.style.cssText = `
                            max-width: 80vw;
                            max-height: 90vh;
                            width: auto;
                            height: auto;
                            object-fit: contain;
                            border-radius: 12px;
                            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
                            border: 2px solid rgba(100, 255, 218, 0.2);
                        `;
                    } else {
                        // Image normale
                        this.style.cssText = `
                            max-width: 90vw;
                            max-height: 80vh;
                            width: auto;
                            height: auto;
                            object-fit: contain;
                            border-radius: 12px;
                            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
                            border: 2px solid rgba(100, 255, 218, 0.2);
                        `;
                    }
                    
                    console.log(`Image dimensions: ${imgWidth}x${imgHeight}, ratio: ${aspectRatio.toFixed(2)}`);
                };
                
                // Style initial pendant le chargement
                img.style.cssText = `
                    max-width: 90vw;
                    max-height: 80vh;
                    width: auto;
                    height: auto;
                    object-fit: contain;
                    border-radius: 12px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
                    border: 2px solid rgba(100, 255, 218, 0.2);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                
                // Effet de fondu à l'apparition
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 50);
                
                lightboxImageContainer.appendChild(img);
            }
            
            updateCounter();
            updateNavigation();
        }
    }
    
    // Mettre à jour le compteur
    function updateCounter() {
        if (currentImageSpan && totalImagesSpan) {
            currentImageSpan.textContent = currentImageIndex + 1;
            totalImagesSpan.textContent = currentGallery.length;
        }
    }
    
    // Mettre à jour la navigation
    function updateNavigation() {
        if (lightboxPrev && lightboxNext) {
            lightboxPrev.style.display = currentGallery.length > 1 ? 'block' : 'none';
            lightboxNext.style.display = currentGallery.length > 1 ? 'block' : 'none';
        }
    }
    
    // Fermer la lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
        isLightboxOpen = false;
        
        // Arrêter toutes les vidéos
        const iframes = lightboxImageContainer.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            iframe.src = iframe.src; // Recharge pour arrêter la vidéo
        });
    }
    
    // Event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function() {
            if (currentImageIndex > 0) {
                loadMedia(currentImageIndex - 1);
            }
        });
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', function() {
            if (currentImageIndex < currentGallery.length - 1) {
                loadMedia(currentImageIndex + 1);
            }
        });
    }
    
    // Fermer en cliquant sur le fond
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (isLightboxOpen) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
                loadMedia(currentImageIndex - 1);
            } else if (e.key === 'ArrowRight' && currentImageIndex < currentGallery.length - 1) {
                loadMedia(currentImageIndex + 1);
            }
        }
    });
}

// Fonction pour initialiser les filtres
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Retirer la classe active de tous les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Fonction pour initialiser la lightbox
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            const galleryItem = this.closest('.gallery-item');
            const galleryData = galleryItem.getAttribute('data-gallery');
            
            if (galleryData) {
                // Si l'image a une galerie
                try {
                    currentGallery = JSON.parse(galleryData);
                    currentImageIndex = 0;
                } catch(e) {
                    console.error('Erreur parsing gallery data:', e);
                    currentGallery = [this.src];
                    currentImageIndex = 0;
                }
            } else {
                // Image simple
                currentGallery = [this.src];
                currentImageIndex = 0;
            }
            
            openLightbox();
            loadMedia(0);
        });
    });
    
    // Événements de la lightbox
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => currentImageIndex > 0 && loadMedia(currentImageIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => currentImageIndex < currentGallery.length - 1 && loadMedia(currentImageIndex + 1));
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
}

// Ouvrir la lightbox
function openLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'flex';
        isLightboxOpen = true;
        document.body.style.overflow = 'hidden';
    }
}

// Fermer la lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        isLightboxOpen = false;
        document.body.style.overflow = 'auto';
    }
}

// Charger un média (image ou vidéo)
function loadMedia(index) {
    currentImageIndex = index;
    const mediaUrl = currentGallery[index];
    const image = document.getElementById('lightbox-image');
    const counter = document.querySelector('.lightbox-counter');
    
    if (!image) return;
    
    // Mettre à jour le compteur
    if (counter) {
        const currentSpan = document.getElementById('current-image');
        const totalSpan = document.getElementById('total-images');
        if (currentSpan) currentSpan.textContent = index + 1;
        if (totalSpan) totalSpan.textContent = currentGallery.length;
    }
    
    if (mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be')) {
        // C'est une vidéo YouTube - redirection
        let embedUrl = mediaUrl;
        if (mediaUrl.includes('watch?v=')) {
            const videoId = mediaUrl.split('watch?v=')[1].split('&')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
        window.open(embedUrl, '_blank');
        closeLightbox();
    } else {
        // C'est une image
        image.src = mediaUrl;
        
        // Mettre à jour la description
        const description = document.getElementById('lightbox-description');
        const galleryItem = document.querySelector(`img[src="${currentGallery[0]}"]`)?.closest('.gallery-item');
        if (description && galleryItem) {
            const desc = galleryItem.querySelector('img').getAttribute('data-description') || '';
            description.textContent = desc;
        }
    }
    
    // Gérer les boutons prev/next
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    if (prevBtn) prevBtn.style.display = index > 0 ? 'block' : 'none';
    if (nextBtn) nextBtn.style.display = index < currentGallery.length - 1 ? 'block' : 'none';
}