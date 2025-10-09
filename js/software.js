// Gestion de la section logiciels (tous dans la même grille)
function initSoftwareSection() {
    // Gestion des clics sur les logiciels pour ouvrir leur site
    const softwareItems = document.querySelectorAll('.software-item[data-url]');
    
    softwareItems.forEach(item => {
        item.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            }
        });
        
        // Ajouter un curseur pointer pour indiquer que c'est cliquable
        item.style.cursor = 'pointer';
    });
    
    // Gestion des clics sur les badges (comme CNAM Enjmin)
    const badgeItems = document.querySelectorAll('.badge-item[data-url]');
    
    badgeItems.forEach(badge => {
        badge.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            }
        });
        
        // Ajouter un curseur pointer pour indiquer que c'est cliquable
        badge.style.cursor = 'pointer';
        
        // Ajouter un effet hover pour indiquer que c'est cliquable
        badge.style.transition = 'transform 0.2s ease';
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialiser quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    initSoftwareSection();
});
