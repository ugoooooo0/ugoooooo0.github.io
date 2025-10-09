// Gestion de la section logiciels
function initSoftwareSection() {
    const showMoreBtn = document.getElementById('show-more-btn');
    const secondarySection = document.querySelector('.software-secondary');
    
    if (!showMoreBtn || !secondarySection) return;
    
    showMoreBtn.addEventListener('click', function() {
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

// Initialiser quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    initSoftwareSection();
});