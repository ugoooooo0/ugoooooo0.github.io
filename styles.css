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
        initFilters();
        initLightbox();
    }
    
    // Gestion du chatbot
    initChatbot();
    
    // Gestion du contrôleur de taille
    initSizeController();
});

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
- Réponds de manière professionnelle et amicale
- GARDE TES RÉPONSES COURTES ET CONCISES (maximum 2-3 phrases)
- Utilise ces informations pour donner des réponses précises
- Si on te demande des informations spécifiques sur le site, utilise le contenu extrait ci-dessus
- N'utilise pas d'émojis, juste du texte clair
- Si on te demande des détails, donne-les mais reste concis
- Évite les listes trop longues, privilégie l'essentiel`;
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
        
        // Message de bienvenue automatique
        setTimeout(() => {
            addMessage("Salut ! Je suis l'assistant virtuel d'Ugo. Vous avez des questions sur ses projets, compétences ou parcours ? Je suis là pour vous aider !", false);
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

    // Réponses de secours enrichies et plus concises
    function getFallbackResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('projet') || message.includes('travail') || message.includes('création')) {
            return "Ugo se spécialise en modélisation 3D avec Blender depuis 4 ans, créant objets, véhicules et environnements 3D réalistes. Il maîtrise le pipeline complet jusqu'à l'export .fbx pour Unreal Engine.";
        } else if (message.includes('compétence') || message.includes('technique') || message.includes('logiciel')) {
            return "Ugo maîtrise Blender, Substance Painter, Unreal Engine et tout le pipeline 3D. Il excelle aussi en audiovisuel (tournage, VFX, montage) et compose avec FL Studio.";
        } else if (message.includes('formation') || message.includes('école') || message.includes('enjmin') || message.includes('étude')) {
            return "Ugo étudie à l'ENJMIN Angoulême en jeux vidéo et 3D. Formation autodidacte via YouTube, stages chez ProdCastFilms en audiovisuel.";
        } else if (message.includes('workflow') || message.includes('méthode') || message.includes('processus')) {
            return "Processus structuré : idée → PureRef → whitebox → greybox → high-poly → low-poly → UVs → Texturing → export .fbx. Il prend le temps nécessaire pour un rendu satisfaisant.";
        } else if (message.includes('inspiration') || message.includes('référence') || message.includes('artiste')) {
            return "Références artistiques : Kane Parsent, Dan MacCabe, Chris Doretz. Découverte 3D via films d'animation et réseaux sociaux. Suit les showcases Unreal Engine et Blender.";
        } else if (message.includes('age') || message.includes('né') || message.includes('jeune')) {
            return "18 ans (né le 25/06/2007). Champion de France de gymnastique, 4 ans d'expérience 3D malgré son jeune âge.";
        } else if (message.includes('contact') || message.includes('email') || message.includes('linkedin')) {
            return "Email : ugo.ravard47@gmail.com, LinkedIn et GitHub disponibles. Formulaire de contact sur cette page.";
        } else if (message.includes('objectif') || message.includes('futur') || message.includes('ambition')) {
            return "Objectif : devenir artiste 3D dans l'industrie du jeu vidéo. Se prépare avec un portfolio solide spécialisé véhicules et environnements 3D.";
        } else if (message.includes('contrainte') || message.includes('client') || message.includes('optimisation')) {
            return "Expérience contraintes techniques : composants électroniques pour sites web, optimisation moteurs de jeu, projets clients/concours.";
        } else if (message.includes('salut') || message.includes('bonjour') || message.includes('hello')) {
            return "Salut ! Je suis l'assistant d'Ugo Ravard. Je peux vous parler de ses projets 3D, ses compétences, sa formation à l'ENJMIN, ou ses objectifs professionnels. Que souhaitez-vous savoir ?";
        } else if (message.includes('qui') || message.includes('présent')) {
            return "Ugo Ravard est un artiste 3D de 18 ans, étudiant à l'ENJMIN et passionné par la création numérique. Il combine développement web et modélisation 3D pour créer des projets innovants.";
        } else {
            // Utiliser la fonction améliorée qui s'adapte au contenu du site
            return getEnhancedFallbackResponse(userMessage);
        }
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
                    max_tokens: 200, // Réduit pour des réponses plus concises
                    temperature: 0.7
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

    // Réponses de secours améliorées avec contenu du site
    function getEnhancedFallbackResponse(userMessage) {
        const message = userMessage.toLowerCase();
        const siteContent = extractSiteContent();
        
        if (message.includes('projet') || message.includes('portfolio')) {
            if (siteContent.sections.portfolio) {
                const projectTitles = siteContent.sections.portfolio.projects.map(p => p.title).join(', ');
                return `Ugo a plusieurs projets dans son portfolio : ${projectTitles}. Vous pouvez voir tous ses projets sur la page Portfolio avec leurs descriptions détaillées.`;
            }
            return "Ugo se spécialise en modélisation 3D avec Blender depuis 4 ans. Consultez la page Portfolio pour voir ses créations détaillées.";
        } else if (message.includes('compétence') || message.includes('technique')) {
            if (siteContent.sections.presentation && siteContent.sections.presentation.skills.length > 0) {
                return `Les compétences principales d'Ugo incluent : ${siteContent.sections.presentation.skills.join(', ')}. Il maîtrise aussi Blender, Substance Painter et tout le pipeline 3D.`;
            }
            return "Ugo maîtrise JavaScript, React, Blender, 3D Design, Substance Painter, Unreal Engine et tout le pipeline 3D.";
        } else if (message.includes('contact')) {
            if (siteContent.sections.contact) {
                return `Vous pouvez contacter Ugo via : ${siteContent.sections.contact.info.join(', ')}. Il y a aussi un formulaire de contact sur cette page.`;
            }
            return "Email : ugo.ravard47@gmail.com, LinkedIn et GitHub disponibles. Formulaire de contact sur cette page.";
        } else {
            return "Je connais tout le contenu de ce site ! Posez-moi des questions sur les projets d'Ugo, ses compétences, ou consultez les sections Présentation, Portfolio et Contact.";
        }
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

// Gestion du formulaire de contact
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Attendre que EmailJS soit chargé
    const initEmailJS = () => {
        if (typeof emailjs !== 'undefined') {
            console.log('EmailJS disponible, initialisation...');
            emailjs.init("TFJ6nP0AQZGZJz4_X");
        } else {
            console.log('EmailJS non disponible, nouvelle tentative...');
            setTimeout(initEmailJS, 500);
        }
    };
    
    initEmailJS();
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Vérifier si EmailJS est disponible
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS non disponible');
            showStatusMessage('❌ Service d\'email non disponible. Contactez-moi directement à ugo.ravard47@gmail.com', 'error');
            return;
        }
        
        // Désactiver le bouton et afficher le chargement
        submitButton.disabled = true;
        submitButton.textContent = '📤 Envoi en cours...';
        
        const formData = new FormData(this);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            message: formData.get('message'),
            to_email: 'ugo.ravard47@gmail.com'
        };
        
        try {
            console.log('Tentative d\'envoi email avec:', templateParams);
            
            // Envoyer l'email via EmailJS
            const response = await emailjs.send(
                'service_c8qufpn',
                'template_4z5aaxg',
                templateParams
            );
            
            console.log('Email envoyé avec succès:', response);
            showStatusMessage('✅ Message envoyé avec succès ! Je vous répondrai bientôt.', 'success');
            
            // Réinitialiser le formulaire
            this.reset();
            
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            
            // Afficher une erreur plus spécifique
            let errorMessage = '❌ Erreur lors de l\'envoi. ';
            if (error.status === 400) {
                errorMessage += 'Vérifiez vos informations. ';
            } else if (error.status === 403) {
                errorMessage += 'Service temporairement indisponible. ';
            }
            errorMessage += 'Contactez-moi directement à ugo.ravard47@gmail.com';
            
            showStatusMessage(errorMessage, 'error');
        } finally {
            // Réactiver le bouton
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
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
    
    const backgroundColor = type === 'success' ? '#64ffda' : '#ff6b6b';
    const textColor = type === 'success' ? '#1a1a2e' : '#ffffff';
    
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
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(statusDiv);
    
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (statusDiv.parentNode) {
                    statusDiv.remove();
                }
            }, 300);
        }
    }, 5000);
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
                // C'est une image
                const img = document.createElement('img');
                img.id = 'lightbox-image';
                img.src = mediaUrl;
                img.alt = 'Image du portfolio';
                img.style.cssText = 'max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 10px;';
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
