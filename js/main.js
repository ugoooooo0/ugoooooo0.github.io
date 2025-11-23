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
        
        // Initialiser le carrousel
        initHeroCarousel();
        
        initFilters();
        initLightbox();
        
        // Pré-traitement des images pour améliorer le layout
        preprocessImages();
        
        // Ajouter les tooltips de prévisualisation
        initPreviewTooltips();
        
        // Initialiser les images de survol pour les projets vidéo
        initVideoHoverImages();
        
        // Initialiser le masonry après chargement des images
        initMasonry();
        
        // Correction spéciale pour les images avec vidéos après 2 secondes
        setTimeout(() => {
            fixVideoImagePositioning();
        }, 2000);
    }
    
    // Gestion de la section logiciels (sur la page d'accueil)
    initSoftwareSection();
    
    // Gestion du contrôleur de taille
    initSizeController();
});

// Carrousel des projets vedettes
// Hero Carousel - Style Star Citizen
let currentHeroSlide = 0;
let heroInterval;
let progressInterval;
const HERO_AUTO_DELAY = 10000; // 10 secondes

function initHeroCarousel() {
    const heroThumbs = document.querySelectorAll('.hero-thumb');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroBgImage = document.getElementById('hero-bg-image');
    let heroCta = document.getElementById('hero-cta'); // Utiliser let pour pouvoir la reassigner
    
    if (!heroThumbs.length) {
        console.log('Aucun thumbnail trouvé');
        return;
    }
    
    console.log('Hero carousel initialisé avec', heroThumbs.length, 'thumbnails');
    console.log('Bouton CTA trouvé:', !!heroCta);
    
    // Fonction pour mettre à jour le hero
    function updateHero(index) {
        const activeThumb = heroThumbs[index];
        if (!activeThumb) return;
        
        // CORRECTIF COMPLET: Reset TOTAL de toutes les animations
        heroThumbs.forEach((thumb, i) => {
            thumb.classList.remove('active');
            // Supprimer COMPLÈTEMENT l'animation CSS
            thumb.style.animation = 'none !important';
            thumb.style.animationPlayState = 'paused';
            thumb.style.animationDelay = '0s';
            thumb.style.animationDuration = '0s';
            // Forcer une recalculation du style
            thumb.offsetHeight;
            thumb.offsetWidth;
        });
        
        // Attendre que le navigateur applique vraiment les changements
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Remettre l'animation CSS par défaut sur TOUS les thumbnails
                heroThumbs.forEach(thumb => {
                    thumb.style.animation = '';
                    thumb.style.animationPlayState = '';
                    thumb.style.animationDelay = '';
                    thumb.style.animationDuration = '';
                });
                
                // PUIS activer le thumbnail sélectionné
                activeThumb.classList.add('active');
                console.log('🔄 Animation redémarrée pour thumbnail:', index);
            });
        });
        
        // Récupérer les données du projet
        const title = activeThumb.dataset.title;
        const subtitle = activeThumb.dataset.subtitle;
        const background = activeThumb.dataset.background;
        const projectOrder = activeThumb.dataset.order;
        
        // Mettre à jour le contenu avec animation smooth
        if (heroTitle && heroSubtitle && heroBgImage) {
            // Animation de sortie plus smooth
            heroTitle.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            heroSubtitle.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(-20px)';
            heroSubtitle.style.opacity = '0';
            heroSubtitle.style.transform = 'translateY(-15px)';
            
            // Animation de l'image avec effet de transition
            heroBgImage.classList.add('transitioning');
            
            setTimeout(() => {
                // Changer le contenu
                heroTitle.textContent = title;
                heroSubtitle.textContent = subtitle;
                heroBgImage.src = background;
                
                // Retirer l'effet de transition
                heroBgImage.classList.remove('transitioning');
                
                // Animation d'entrée plus smooth
                setTimeout(() => {
                    heroTitle.style.opacity = '1';
                    heroTitle.style.transform = 'translateY(0)';
                    heroSubtitle.style.opacity = '1';
                    heroSubtitle.style.transform = 'translateY(0)';
                }, 100);
            }, 400);
        }
        
        // Configurer le bouton CTA pour OUVRIR DIRECTEMENT la lightbox du projet
        heroCta = document.getElementById('hero-cta'); // Récupérer la référence actuelle
        if (heroCta && projectOrder) {
            console.log('🎯 Configuration CTA pour ouvrir lightbox projet data-order:', projectOrder);
            
            // Supprimer TOUS les event listeners existants
            const newCta = heroCta.cloneNode(true);
            heroCta.parentNode.replaceChild(newCta, heroCta);
            heroCta = newCta; // Référence vers le nouveau bouton
            
            // Ajouter l'event listener pour OUVRIR LA LIGHTBOX
            heroCta.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('🎯🎯🎯 CLIC CTA! Ouverture lightbox pour data-order:', projectOrder);
                
                // Chercher le projet dans la galerie
                const galleryItem = document.querySelector(`.gallery-item[data-order="${projectOrder}"]`);
                console.log('🔍 Projet trouvé:', galleryItem);
                
                if (galleryItem) {
                    const projectImg = galleryItem.querySelector('img');
                    
                    if (projectImg) {
                        console.log('🚀 OUVERTURE DE LA LIGHTBOX!');
                        
                        // Définir le projet actuel pour la lightbox
                        window.currentProject = {
                            galleryItem: galleryItem,
                            img: projectImg
                        };
                        
                        // Récupérer la galerie d'images
                        const galleryData = galleryItem.getAttribute('data-gallery');
                        if (galleryData) {
                            try {
                                currentGallery = JSON.parse(galleryData);
                            } catch (e) {
                                console.error('Erreur parsing gallery:', e);
                                currentGallery = [projectImg.src];
                            }
                        } else {
                            currentGallery = [projectImg.src];
                        }
                        
                        currentImageIndex = 0;
                        
                        // Ouvrir la lightbox
                        const lightbox = document.getElementById('lightbox');
                        if (lightbox) {
                            lightbox.style.display = 'flex';
                            document.body.style.overflow = 'hidden';
                            isLightboxOpen = true;
                            
                            // Charger le média
                            loadMedia(0);
                            
                            // Mettre à jour les compteurs et navigation
                            const currentImageSpan = document.getElementById('current-image');
                            const totalImagesSpan = document.getElementById('total-images');
                            if (currentImageSpan && totalImagesSpan) {
                                currentImageSpan.textContent = '1';
                                totalImagesSpan.textContent = currentGallery.length;
                            }
                            
                            // Mettre à jour les boutons prev/next
                            const lightboxPrev = document.querySelector('.lightbox-prev');
                            const lightboxNext = document.querySelector('.lightbox-next');
                            if (lightboxPrev && lightboxNext) {
                                lightboxPrev.style.display = currentGallery.length > 1 ? 'block' : 'none';
                                lightboxNext.style.display = currentGallery.length > 1 ? 'block' : 'none';
                            }
                            
                            console.log('✅ Lightbox ouverte avec succès!');
                        } else {
                            console.error('❌ Lightbox element not found!');
                        }
                        
                    } else {
                        console.error('❌ Image du projet non trouvée!');
                    }
                } else {
                    console.error('❌ PROJET NON TROUVÉ! data-order:', projectOrder);
                    
                    // Debug: lister tous les projets disponibles
                    console.log('📋 Projets disponibles:');
                    document.querySelectorAll('.gallery-item[data-order]').forEach(item => {
                        console.log(`   - data-order: ${item.getAttribute('data-order')} | alt: ${item.querySelector('img')?.getAttribute('alt')}`);
                    });
                    
                    // Fallback: alert d'erreur
                    alert(`Projet non trouvé (ordre ${projectOrder}). Vérifiez la console pour plus d'infos.`);
                }
            };
            
            console.log('✅ CTA configuré pour ouverture lightbox data-order:', projectOrder);
        } else {
            console.error('⚠️ PROBLÈME CONFIG CTA:', {
                heroCta: !!heroCta, 
                projectOrder: projectOrder,
                ctaElement: document.getElementById('hero-cta')
            });
        }
    }
    
    // Navigation avec les vignettes
    heroThumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            console.log('🖱️ Clic manuel sur thumbnail:', index);
            currentHeroSlide = index;
            
            // SOLUTION ULTIME: Forcer le redémarrage complet
            heroThumbs.forEach(t => {
                t.classList.remove('active');
                // Hack CSS pour forcer le reset
                t.style.display = 'none';
            });
            
            // Double requestAnimationFrame + timeout pour être sûr
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        heroThumbs.forEach(t => {
                            t.style.display = '';
                        });
                        updateHero(currentHeroSlide);
                        restartAutoplay();
                    }, 10);
                });
            });
        });
    });
    
    // Boutons de navigation
    function nextSlide() {
        currentHeroSlide = (currentHeroSlide + 1) % heroThumbs.length;
        updateHero(currentHeroSlide);
    }
    
    function prevSlide() {
        currentHeroSlide = (currentHeroSlide - 1 + heroThumbs.length) % heroThumbs.length;
        updateHero(currentHeroSlide);
    }
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        restartAutoplay();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        restartAutoplay();
    });
    
    // Auto-play avec gestion de la barre de progression
    function startAutoplay() {
        heroInterval = setInterval(nextSlide, HERO_AUTO_DELAY);
    }
    
    function stopAutoplay() {
        if (heroInterval) {
            clearInterval(heroInterval);
        }
    }
    
    function restartAutoplay() {
        stopAutoplay();
        
        // CORRECTIF TOTAL: Reset complet de TOUTES les animations
        heroThumbs.forEach((thumb, i) => {
            // Supprimer complètement toute animation
            thumb.classList.remove('active');
            thumb.style.animation = 'none !important';
            thumb.style.animationPlayState = 'paused';
            thumb.style.animationDelay = '0s';
            thumb.style.animationDuration = '0s';
            thumb.style.animationIterationCount = '1';
            // Force la recalculation
            thumb.offsetHeight;
            thumb.offsetWidth;
        });
        
        // Double requestAnimationFrame pour être SÛR que le navigateur applique
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Remettre TOUS les styles CSS par défaut
                heroThumbs.forEach(thumb => {
                    thumb.style.animation = '';
                    thumb.style.animationPlayState = '';
                    thumb.style.animationDelay = '';
                    thumb.style.animationDuration = '';
                    thumb.style.animationIterationCount = '';
                });
                
                // Réactiver le thumbnail actuel
                const currentActiveThumb = heroThumbs[currentHeroSlide];
                if (currentActiveThumb) {
                    currentActiveThumb.classList.add('active');
                    console.log('🚀 Autoplay redémarré avec animation complète pour:', currentHeroSlide);
                }
                
                // Redémarrer l'autoplay
                startAutoplay();
            });
        });
    }
    
    // Pause au survol du carousel complet (pas seulement hero-main)
    const heroCarousel = document.querySelector('.hero-carousel-section');
    if (heroCarousel) {
        heroCarousel.addEventListener('mouseenter', stopAutoplay);
        heroCarousel.addEventListener('mouseleave', startAutoplay);
    }
    
    // Initialiser avec le premier projet
    updateHero(0);
    startAutoplay();
}

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
    const allItems = document.querySelectorAll('.gallery-item');
    
    // Filtrer seulement les items visibles
    const items = Array.from(allItems).filter(item => 
        getComputedStyle(item).display !== 'none' && !item.classList.contains('hidden')
    );
    
    if (!gallery || items.length === 0) {
        // Si aucun item visible, réduire la hauteur de la galerie ET minimiser l'espacement
        gallery.style.height = '50px';
        gallery.style.minHeight = '50px';
        return;
    }
    
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
                        // Réduire la hauteur si peu d'éléments
                        const finalHeight = items.length <= 3 ? Math.max(maxHeight, 200) : maxHeight;
                        gallery.style.height = `${finalHeight}px`;
                        
                        // Ajouter classe spéciale si peu d'éléments
                        if (items.length <= 3) {
                            gallery.classList.add('few-items');
                            gallery.style.marginBottom = '20px';
                        } else {
                            gallery.classList.remove('few-items');
                            gallery.style.marginBottom = '';
                        }
                        
                        console.log(`Masonry terminé: ${columns} colonnes, ${items.length} items, hauteur: ${finalHeight}px`);
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
                    // Réduire la hauteur si peu d'éléments
                    const finalHeight = items.length <= 3 ? Math.max(maxHeight, 200) : maxHeight;
                    gallery.style.height = `${finalHeight}px`;
                    
                    // Ajouter classe spéciale si peu d'éléments
                    if (items.length <= 3) {
                        gallery.classList.add('few-items');
                        gallery.style.marginBottom = '20px';
                    } else {
                        gallery.classList.remove('few-items');
                        gallery.style.marginBottom = '';
                    }
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
        const subject = `Portfolio - Message pour ${name}`;
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
                    item.classList.remove('hidden');
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }
            });
            
            // Compter les éléments visibles pour ajuster l'espacement
            const visibleItems = Array.from(galleryItems).filter(item => 
                getComputedStyle(item).display !== 'none' && !item.classList.contains('hidden')
            );
            
            const gallery = document.querySelector('.projects-gallery');
            if (gallery) {
                if (visibleItems.length <= 3) {
                    gallery.classList.add('few-items');
                    gallery.style.padding = '20px';
                } else {
                    gallery.classList.remove('few-items');
                    gallery.style.padding = '40px 20px';
                }
            }
            
            // Réorganiser le masonry après filtrage avec un délai plus court
            setTimeout(() => {
                layoutMasonry();
            }, 50);
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
            
            console.log('🔍 Clicked on gallery item:', galleryItem);
            
            // Vérifier si c'est un projet de jeu avec un lien direct
            const hasGame = galleryItem.getAttribute('data-has-game');
            const gameUrl = galleryItem.getAttribute('data-game-url');
            
            // Si c'est un jeu ET que l'utilisateur fait Ctrl+Clic, ouvrir directement le jeu
            if (hasGame === 'oui' && gameUrl && e.ctrlKey) {
                console.log('🎮 CTRL+Click detected! Opening game directly:', gameUrl);
                window.open(gameUrl, '_blank');
                return;
            }
            
            // Sinon, ouvrir la lightbox normalement
            console.log('📷 Opening lightbox for project');
            
            // Stocker la référence au projet actuel pour récupérer la description dynamiquement
            window.currentProject = {
                galleryItem: galleryItem,
                img: img
            };
            
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
            openLightbox();
        }
    });
    
    // Ouvrir la lightbox
    function openLightbox() {
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        isLightboxOpen = true;
        
        loadMedia(currentImageIndex);
        updateCounter();
        updateNavigation();
        updateGameButton();
        update3DButton();
    }
    
    // Charger un média (image ou vidéo)
    function loadMedia(index) {
        if (currentGallery[index]) {
            const mediaUrl = currentGallery[index];
            currentImageIndex = index;
            
            // Nettoyer le conteneur
            lightboxImageContainer.innerHTML = '';
            
            if (isYouTubeUrl(mediaUrl)) {
                // C'est une vidéo YouTube - ouvrir dans un nouvel onglet
                window.open(mediaUrl, '_blank');
                closeLightbox();
                return;
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
            
            // Mettre à jour la description du projet actuel
            updateLightboxDescription();
            updateCounter();
            updateNavigation();
            
            // Délai pour s'assurer que tout est chargé avant d'afficher les boutons
            setTimeout(() => {
                updateGameButton();
                update3DButton();
            }, 100);
        }
    }
    
    // Nouvelle fonction pour mettre à jour la description de la lightbox
    function updateLightboxDescription() {
        if (lightboxDescription && window.currentProject) {
            const description = window.currentProject.img.getAttribute('data-description') || 
                               window.currentProject.img.alt || 
                               'Image du portfolio';
            lightboxDescription.textContent = description;
            lightboxDescription.style.display = 'block';
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
    
    // Mettre à jour le bouton jouer
    function updateGameButton() {
        const gameButton = document.getElementById('lightbox-game-access');
        console.log('🎮 updateGameButton called');
        console.log('🎮 gameButton found:', gameButton);
        console.log('🎮 window.currentProject:', window.currentProject);
        
        if (!gameButton) {
            console.error('🎮 Game button element not found!');
            return;
        }
        
        if (!window.currentProject) {
            console.log('🎮 No current project, hiding button');
            gameButton.style.display = 'none';
            return;
        }
        
        const galleryItem = window.currentProject.galleryItem;
        console.log('🎮 galleryItem:', galleryItem);
        
        if (!galleryItem) {
            console.error('🎮 No gallery item found!');
            gameButton.style.display = 'none';
            return;
        }
        
        const hasGame = galleryItem.getAttribute('data-has-game');
        const gameUrl = galleryItem.getAttribute('data-game-url');
        
        console.log('🎮 data-has-game:', hasGame);
        console.log('🎮 data-game-url:', gameUrl);
        
        if (hasGame === 'oui' && gameUrl) {
            console.log('🎮 SHOWING GAME BUTTON!');
            gameButton.textContent = '🎮 Jouer maintenant';
            gameButton.title = 'Ouvrir le jeu sur itch.io';
            gameButton.onclick = function() {
                console.log('🎮 Button clicked, opening:', gameUrl);
                window.open(gameUrl, '_blank');
            };
            gameButton.style.display = 'flex';
        } else {
            console.log('🎮 Hiding game button - not a game or no URL');
            gameButton.style.display = 'none';
        }
    }
    
    // Mettre à jour le bouton 3D Sketchfab
    function update3DButton() {
        const threeDButton = document.getElementById('lightbox-3d-access');
        console.log('🎨 update3DButton called');
        console.log('🎨 threeDButton found:', threeDButton);
        console.log('🎨 window.currentProject:', window.currentProject);
        
        if (!threeDButton) {
            console.error('🎨 3D button element not found!');
            return;
        }
        
        if (!window.currentProject) {
            console.log('🎨 No current project, hiding button');
            threeDButton.style.display = 'none';
            return;
        }
        
        const galleryItem = window.currentProject.galleryItem;
        console.log('🎨 galleryItem:', galleryItem);
        
        if (!galleryItem) {
            console.error('🎨 No gallery item found!');
            threeDButton.style.display = 'none';
            return;
        }
        
        const has3D = galleryItem.getAttribute('data-3d');
        
        console.log('🎨 data-3d attribute:', has3D);
        console.log('🎨 data-3d exists:', has3D !== null);
        
        // Si l'attribut data-3d existe (même vide pour l'instant)
        if (has3D !== null) {
            console.log('🎨 SHOWING 3D BUTTON!');
            threeDButton.textContent = '🎨 Voir en 3D';
            threeDButton.title = 'Voir le modèle 3D interactif';
            threeDButton.onclick = function() {
                console.log('🎨 3D Button clicked');
                show3DModel(has3D);
            };
            threeDButton.style.display = 'flex';
        } else {
            console.log('🎨 Hiding 3D button - no data-3d attribute');
            threeDButton.style.display = 'none';
        }
    }
    
    // Afficher le modèle 3D Sketchfab
    function show3DModel(sketchfabUrl) {
        const sketchfabContainer = document.getElementById('lightbox-sketchfab-container');
        const sketchfabIframe = document.getElementById('lightbox-sketchfab-iframe');
        const closeButton = document.getElementById('close-sketchfab');
        
        if (!sketchfabContainer || !sketchfabIframe || !closeButton) {
            console.error('🎨 Sketchfab elements not found!');
            return;
        }
        
        // Si pas d'URL Sketchfab fournie, afficher un message
        if (!sketchfabUrl || sketchfabUrl === '') {
            alert('Modèle 3D bientôt disponible sur cette page !');
            return;
        }
        
        // Configurer l'iframe Sketchfab
        sketchfabIframe.src = sketchfabUrl;
        
        // Afficher le container
        sketchfabContainer.style.display = 'flex';
        
        // Gérer la fermeture
        closeButton.onclick = function() {
            sketchfabContainer.style.display = 'none';
            sketchfabIframe.src = ''; // Arrêter le chargement
        };
        
        // Fermer aussi avec Escape
        function handle3DEscape(e) {
            if (e.key === 'Escape') {
                sketchfabContainer.style.display = 'none';
                sketchfabIframe.src = '';
                document.removeEventListener('keydown', handle3DEscape);
            }
        }
        document.addEventListener('keydown', handle3DEscape);
    }
    
    // Restaurer les descriptions originales du carrousel
    function restoreCarouselDescriptions() {
        const carouselItems = document.querySelectorAll('.carousel-item');
        carouselItems.forEach(item => {
            const titleEl = item.querySelector('.carousel-overlay h3');
            const descEl = item.querySelector('.carousel-overlay p');
            
            if (titleEl && titleEl.hasAttribute('data-original-title')) {
                titleEl.textContent = titleEl.getAttribute('data-original-title');
            }
            if (descEl && descEl.hasAttribute('data-original-description')) {
                descEl.textContent = descEl.getAttribute('data-original-description');
            }
        });
    }
    
    // Fermer la lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
        isLightboxOpen = false;
        
        // Restaurer les descriptions originales du carrousel
        restoreCarouselDescriptions();
        
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
            
            // Définir window.currentProject pour récupérer la description
            window.currentProject = {
                galleryItem: galleryItem,
                img: this
            };
            
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
        // C'est une vidéo YouTube - ouvrir dans un nouvel onglet
        window.open(mediaUrl, '_blank');
        closeLightbox();
    } else {
        // C'est une image
        image.src = mediaUrl;
        
        // Mettre à jour la description en utilisant la fonction existante
        const description = document.getElementById('lightbox-description');
        if (description && window.currentProject) {
            const desc = window.currentProject.img.getAttribute('data-description') || 
                        window.currentProject.img.alt || 
                        'Image du portfolio';
            description.textContent = desc;
            description.style.display = 'block';
        }
    }
    
    // Gérer les boutons prev/next
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    if (prevBtn) prevBtn.style.display = index > 0 ? 'block' : 'none';
    if (nextBtn) nextBtn.style.display = index < currentGallery.length - 1 ? 'block' : 'none';
}

// Fonction pour initialiser les tooltips de prévisualisation
function initPreviewTooltips() {
    // Tooltips pour les éléments de la galerie
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            const description = img.getAttribute('data-description') || img.alt;
            if (description) {
                // Créer un tooltip avec une version courte de la description
                const shortDescription = description.length > 60 ? 
                    description.substring(0, 60) + '...' : description;
                
                const tooltip = document.createElement('div');
                tooltip.className = 'preview-tooltip';
                tooltip.textContent = shortDescription;
                item.appendChild(tooltip);
            }
        }
    });
    
    // Tooltips pour les éléments du carousel
    const carouselItems = document.querySelectorAll('.carousel-item');
    carouselItems.forEach(item => {
        const projectOrder = item.getAttribute('data-project-order');
        if (projectOrder) {
            // Trouver le projet correspondant dans la galerie pour récupérer sa description
            const galleryItem = document.querySelector(`[data-order="${projectOrder}"]`);
            if (galleryItem) {
                const galleryImg = galleryItem.querySelector('img');
                if (galleryImg) {
                    const description = galleryImg.getAttribute('data-description') || galleryImg.alt;
                    if (description) {
                        // Créer un tooltip plus court pour le carousel
                        const shortDescription = description.length > 50 ? 
                            description.substring(0, 50) + '...' : description;
                        
                        const tooltip = document.createElement('div');
                        tooltip.className = 'preview-tooltip';
                        tooltip.textContent = shortDescription;
                        item.appendChild(tooltip);
                    }
                }
            }
        }
    });
}

// ===== SYSTÈME DE HOVER IMAGE POUR PROJETS VIDÉO =====
function initVideoHoverImages() {
    console.log('🎥 Initialisation des images de survol pour les projets vidéo...');
    
    // Sélectionner tous les projets avec vidéo
    const videoProjects = document.querySelectorAll('.gallery-item[data-has-video="oui"]');
    
    videoProjects.forEach(project => {
        // D'abord vérifier s'il y a un data-hover-image défini
        let hoverImageUrl = project.getAttribute('data-hover-image');
        
        // Si pas d'image de survol définie, utiliser la deuxième image de la galerie
        if (!hoverImageUrl) {
            const galleryData = project.getAttribute('data-gallery');
            if (galleryData) {
                try {
                    const gallery = JSON.parse(galleryData);
                    // Utiliser la deuxième image comme fallback (index 1)
                    if (gallery.length > 1 && !gallery[1].includes('youtube.com')) {
                        hoverImageUrl = gallery[1];
                    }
                } catch (error) {
                    console.error('Erreur lors du parsing de la galerie:', error);
                }
            }
        }
        
        // Appliquer l'image de survol si on en a une
        if (hoverImageUrl) {
            // Appliquer l'image de survol via CSS custom property
            project.style.setProperty('--hover-image', `url('${hoverImageUrl}')`);
            
            // Mettre à jour le pseudo-element ::before avec l'image
            const style = document.createElement('style');
            style.textContent = `
                .gallery-item[data-order="${project.getAttribute('data-order')}"]::before {
                    background-image: url('${hoverImageUrl}');
                }
            `;
            document.head.appendChild(style);
            
            console.log(`✅ Image de survol ajoutée pour le projet ordre ${project.getAttribute('data-order')}`);
        }
    });
    
    console.log(`🎬 ${videoProjects.length} projets vidéo traités pour les images de survol`);
}

