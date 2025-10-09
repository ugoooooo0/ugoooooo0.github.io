// Système de like avec formulaire et envoi par email
class LikeSystem {
    constructor() {
        this.likeCount = this.getLikeCount();
        this.hasLiked = this.getHasLiked();
        this.init();
    }
    
    init() {
        this.setupElements();
        this.setupEventListeners();
        this.updateUI();
    }
    
    setupElements() {
        this.likeBtn = document.getElementById('like-btn');
        this.likeCountEl = document.getElementById('like-count');
        this.likeModal = document.getElementById('like-modal');
        this.likeModalClose = document.getElementById('like-modal-close');
        this.likeForm = document.getElementById('like-form');
        this.heartIcon = this.likeBtn.querySelector('.heart-icon');
    }
    
    setupEventListeners() {
        // Clic sur le bouton like
        this.likeBtn.addEventListener('click', () => {
            if (!this.hasLiked) {
                this.showModal();
            } else {
                this.showMessage('Vous avez déjà liké ce portfolio ! ❤️', 'info');
            }
        });
        
        // Fermer la modal
        this.likeModalClose.addEventListener('click', () => {
            this.hideModal();
        });
        
        // Fermer en cliquant à côté
        this.likeModal.addEventListener('click', (e) => {
            if (e.target === this.likeModal) {
                this.hideModal();
            }
        });
        
        // Soumission du formulaire
        this.likeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitLike();
        });
        
        // Fermer modal avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.likeModal.style.display === 'flex') {
                this.hideModal();
            }
        });
    }
    
    showModal() {
        this.likeModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus sur le premier input
        setTimeout(() => {
            const firstInput = this.likeForm.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
    }
    
    hideModal() {
        this.likeModal.style.display = 'none';
        document.body.style.overflow = '';
        this.likeForm.reset();
    }
    
    async submitLike() {
        const formData = new FormData(this.likeForm);
        const firstName = formData.get('firstName').trim();
        const lastName = formData.get('lastName').trim();
        const comment = formData.get('comment').trim();
        
        if (!firstName || !lastName) {
            this.showMessage('Veuillez remplir votre prénom et nom', 'error');
            return;
        }
        
        // Désactiver le bouton pendant l'envoi
        const submitBtn = this.likeForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = '✨ Envoi en cours...';
        
        try {
            // Simuler l'envoi (remplacer par vraie API si besoin)
            await this.sendLikeEmail(firstName, lastName, comment);
            
            // Marquer comme liké
            this.hasLiked = true;
            this.likeCount++;
            this.saveLikeData();
            this.updateUI();
            
            // Fermer la modal
            this.hideModal();
            
            // Message de succès
            this.showMessage(`Merci ${firstName} ! Votre like a été envoyé à Ugo ! 💖`, 'success');
            
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            this.showMessage('Une erreur est survenue. Réessayez plus tard.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }
    
    async sendLikeEmail(firstName, lastName, comment) {
        // Créer le contenu de l'email
        const subject = `💖 Nouveau like sur votre portfolio !`;
        const body = `Bonjour Ugo,

Vous avez reçu un nouveau like sur votre portfolio !

👤 Nom : ${firstName} ${lastName}
📅 Date : ${new Date().toLocaleString('fr-FR')}
💬 Commentaire : ${comment || 'Aucun commentaire'}
🌐 Page : ${window.location.href}

---
Envoyé automatiquement depuis votre portfolio
`;

        // Ouvrir le client email par défaut
        const mailtoLink = `mailto:ugo.ravard47@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoLink, '_blank');
        
        // Simuler un délai d'envoi
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    updateUI() {
        // Mettre à jour le compteur
        this.likeCountEl.textContent = this.likeCount;
        
        // Mettre à jour l'apparence du bouton
        if (this.hasLiked) {
            this.likeBtn.classList.add('liked');
            this.heartIcon.textContent = '❤️';
            this.likeBtn.title = 'Vous avez liké ce portfolio !';
        } else {
            this.likeBtn.classList.remove('liked');
            this.heartIcon.textContent = '🤍';
            this.likeBtn.title = 'J\'aime ce portfolio !';
        }
    }
    
    showMessage(message, type) {
        // Supprimer message existant
        const existing = document.querySelector('.like-message');
        if (existing) existing.remove();
        
        // Créer nouveau message
        const messageEl = document.createElement('div');
        messageEl.className = `like-message ${type}`;
        messageEl.textContent = message;
        
        // Styles
        let bgColor, textColor;
        switch (type) {
            case 'success':
                bgColor = '#64ffda';
                textColor = '#0f1419';
                break;
            case 'error':
                bgColor = '#ff6b6b';
                textColor = '#ffffff';
                break;
            case 'info':
                bgColor = '#4dabf7';
                textColor = '#ffffff';
                break;
        }
        
        messageEl.style.cssText = `
            position: fixed;
            top: 30px;
            right: 30px;
            background: ${bgColor};
            color: ${textColor};
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 3000;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            font-weight: bold;
            max-width: 300px;
            animation: slideInMessage 0.3s ease;
            font-size: 14px;
            line-height: 1.3;
        `;
        
        document.body.appendChild(messageEl);
        
        // Supprimer après 4 secondes
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.style.animation = 'slideOutMessage 0.3s ease';
                setTimeout(() => {
                    if (messageEl.parentNode) {
                        messageEl.remove();
                    }
                }, 300);
            }
        }, 4000);
    }
    
    // Sauvegarde locale (puisque pas de serveur)
    getLikeCount() {
        return parseInt(localStorage.getItem('portfolio-like-count') || '0');
    }
    
    getHasLiked() {
        return localStorage.getItem('portfolio-has-liked') === 'true';
    }
    
    saveLikeData() {
        localStorage.setItem('portfolio-like-count', this.likeCount.toString());
        localStorage.setItem('portfolio-has-liked', this.hasLiked.toString());
    }
}

// Initialiser le système de like
document.addEventListener('DOMContentLoaded', () => {
    new LikeSystem();
});

// Ajouter les animations CSS dynamiquement
const style = document.createElement('style');
style.textContent = `
@keyframes slideInMessage {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutMessage {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);