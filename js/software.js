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
}

// Initialiser quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    initSoftwareSection();
});
