// Gestion de la section logiciels
function initSoftwareSection() {
    const showMoreBtn = document.getElementById('show-more-btn');
    const secondarySection = document.querySelector('.software-secondary');
    
    // Gestion du bouton "Voir plus"
    if (showMoreBtn && secondarySection) {
        showMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const isExpanded = secondarySection.classList.contains('show');
            
            if (isExpanded) {
                // Masquer les logiciels secondaires
                secondarySection.classList.remove('show');
                this.textContent = this.getAttribute('data-translate') || 'Voir plus ⌄';
                this.classList.remove('expanded');
            } else {
                // Afficher les logiciels secondaires
                secondarySection.classList.add('show');
                this.textContent = 'Voir moins ⌃';
                this.classList.add('expanded');
            }
        });
    }
    
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
}

// Initialiser quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    initSoftwareSection();
});
