/**
 * Système de likes pour les projets du portfolio
 * Utilise le localStorage pour persister les données
 */

class ProjectLikeSystem {
    constructor() {
        this.likes = this.loadLikes();
        this.init();
    }

    init() {
        // Attendre que la page soit chargée
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupLikeSystem());
        } else {
            this.setupLikeSystem();
        }
    }

    loadLikes() {
        // Charger les likes depuis le localStorage
        const stored = localStorage.getItem('portfolio_project_likes');
        return stored ? JSON.parse(stored) : {};
    }

    saveLikes() {
        // Sauvegarder les likes dans le localStorage
        localStorage.setItem('portfolio_project_likes', JSON.stringify(this.likes));
    }

    generateProjectId(item) {
        // Générer un ID unique pour chaque projet basé sur son image
        const img = item.querySelector('img');
        if (img && img.src) {
            // Utiliser l'URL de l'image comme identifiant unique
            return btoa(img.src).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
        }
        return 'project_' + Math.random().toString(36).substring(2, 8);
    }

    setupLikeSystem() {
        // Ajouter le système de likes à tous les projets
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item, index) => {
            this.addLikeButton(item, index);
        });

        console.log(`Système de likes initialisé pour ${galleryItems.length} projets`);
    }

    addLikeButton(item, index) {
        // Générer un ID unique pour ce projet
        const projectId = this.generateProjectId(item);
        
        // Créer le système de like
        const likeSystem = document.createElement('div');
        likeSystem.className = 'like-system';
        
        const likeBtn = document.createElement('button');
        likeBtn.className = 'like-btn';
        likeBtn.dataset.projectId = projectId;
        
        // Récupérer le nombre actuel de likes
        const currentLikes = this.likes[projectId] || 0;
        const isLiked = localStorage.getItem(`liked_${projectId}`) === 'true';
        
        likeBtn.innerHTML = `
            <span class="heart-icon">${isLiked ? '❤️' : '🤍'}</span>
            <span class="like-count">${currentLikes}</span>
        `;
        
        if (isLiked) {
            likeBtn.classList.add('liked');
        }
        
        // Événement de clic
        likeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleLike(projectId, likeBtn);
        });
        
        likeSystem.appendChild(likeBtn);
        
        // Ajouter à l'item (position relative nécessaire)
        item.style.position = 'relative';
        item.appendChild(likeSystem);
    }

    handleLike(projectId, button) {
        const isCurrentlyLiked = button.classList.contains('liked');
        const heartIcon = button.querySelector('.heart-icon');
        const countElement = button.querySelector('.like-count');
        
        if (isCurrentlyLiked) {
            // Unlike
            this.likes[projectId] = Math.max(0, (this.likes[projectId] || 1) - 1);
            button.classList.remove('liked');
            heartIcon.textContent = '🤍';
            localStorage.setItem(`liked_${projectId}`, 'false');
        } else {
            // Like
            this.likes[projectId] = (this.likes[projectId] || 0) + 1;
            button.classList.add('liked');
            heartIcon.textContent = '❤️';
            localStorage.setItem(`liked_${projectId}`, 'true');
            
            // Animation du like
            this.animateLike(button);
            
            // Particules de coeurs
            this.createHeartParticles(button);
        }
        
        // Mettre à jour le compteur
        countElement.textContent = this.likes[projectId];
        
        // Sauvegarder
        this.saveLikes();
        
        console.log(`Projet ${projectId}: ${this.likes[projectId]} likes`);
    }

    animateLike(button) {
        button.classList.add('animating');
        
        setTimeout(() => {
            button.classList.remove('animating');
        }, 400);
    }

    createHeartParticles(button) {
        const rect = button.getBoundingClientRect();
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'heart-particles';
        
        // Créer 3-5 particules de coeurs
        for (let i = 0; i < 4; i++) {
            const particle = document.createElement('div');
            particle.className = 'heart-particle';
            particle.textContent = '💖';
            
            // Position aléatoire autour du bouton
            const offsetX = (Math.random() - 0.5) * 40;
            const offsetY = Math.random() * 20;
            
            particle.style.left = (rect.width / 2 + offsetX) + 'px';
            particle.style.top = offsetY + 'px';
            particle.style.animationDelay = (i * 0.1) + 's';
            
            particlesContainer.appendChild(particle);
        }
        
        button.parentElement.appendChild(particlesContainer);
        
        // Supprimer les particules après l'animation
        setTimeout(() => {
            if (particlesContainer.parentElement) {
                particlesContainer.parentElement.removeChild(particlesContainer);
            }
        }, 1200);
    }

    // Méthodes publiques pour les statistiques
    getTotalLikes() {
        return Object.values(this.likes).reduce((sum, count) => sum + count, 0);
    }

    getMostLikedProject() {
        let maxLikes = 0;
        let mostLiked = null;
        
        for (const [projectId, likes] of Object.entries(this.likes)) {
            if (likes > maxLikes) {
                maxLikes = likes;
                mostLiked = projectId;
            }
        }
        
        return { projectId: mostLiked, likes: maxLikes };
    }

    exportLikes() {
        // Pour debug ou analytics
        return {
            total: this.getTotalLikes(),
            byProject: this.likes,
            mostLiked: this.getMostLikedProject()
        };
    }
}

// Initialiser automatiquement le système
window.addEventListener('DOMContentLoaded', () => {
    window.projectLikes = new ProjectLikeSystem();
});

// Exporter pour utilisation globale
window.ProjectLikeSystem = ProjectLikeSystem;