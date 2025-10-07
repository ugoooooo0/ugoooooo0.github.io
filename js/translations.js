
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon Portfolio - Projets</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body class="portfolio-page">
    <!-- Bouton de test mobile -->
    <button id="mobile-test-btn" class="mobile-test-btn" title="Tester l'affichage mobile">
        Test Mobile
    </button>
    
    <div class="container">
        <header>
            <div class="header-content">
                <a href="index.html" class="back-home-btn" data-translate="ACCUEIL">
                    ACCUEIL
                </a>
                <h1 data-translate="Ugo RAVARD Artist 3D / 2D">Ugo RAVARD Artist 3D / 2D</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="#" class="filter-btn active" data-filter="all" data-translate="ALL">ALL</a></li>
                    <li><a href="#" class="filter-btn" data-filter="1" data-translate="3D">3D</a></li>
                    <li><a href="#" class="filter-btn" data-filter="2" data-translate="Tournage/Montage">Tournage/Montage</a></li>
                </ul>
            </nav>
        </header>

        <main>
            <!-- Bandeau Carrousel - Meilleurs Projets -->
            <section class="featured-projects-section">
                <div class="featured-projects-container">
                    <h2 class="featured-title" data-translate="Mes Meilleurs Projets">Mes Meilleurs Projets</h2>
                    
                    <div class="carousel-container">
                        <button class="carousel-btn prev" id="carousel-prev">‹</button>
                        
                        <div class="carousel-wrapper">
                            <div class="carousel-track" id="carousel-track">
                                <!-- 1. Le Colossus -->
                                <div class="carousel-item" data-project-order="27">
                                    <img src="https://raw.githubusercontent.com/ugoooooo0/ugoooooo0.github.io/refs/heads/main/assets/images/images/2D%20-%203D/space%20station.png" alt="Le Colossus">
                                    <div class="carousel-overlay">
                                        <h3>Le Colossus</h3>
                                    </div>
                                </div>
                                
                                <!-- 2. Ville avec animation de voiture -->
                                <div class="carousel-item" data-project-order="3">
                                    <img src="https://raw.githubusercontent.com/ugoooooo0/ugoooooo0.github.io/refs/heads/main/assets/images/images/2D%20-%203D/city%20blender.png" alt="Ville 3D">
                                    <div class="carousel-overlay">
                                        <h3>Ville 3D</h3>
                                    </div>
                                </div>
                                
                                <!-- 3. Projet Baccalauréat avec téléphone -->
                                <div class="carousel-item" data-project-order="10">
                                    <img src="https://raw.githubusercontent.com/ugoooooo0/ugoooooo0.github.io/refs/heads/main/assets/images/images/2D%20-%203D/shoot%201%20tel.png" alt="Projet Baccalauréat">
                                    <div class="carousel-overlay">
                                        <h3>Projet Baccalauréat</h3>
                                    </div>
                                </div>
                                
                                <!-- 4. Projet EDF -->
                                <div class="carousel-item" data-project-order="20">
                                    <img src="https://raw.githubusercontent.com/ugoooooo0/ugoooooo0.github.io/refs/heads/main/assets/images/images/Tournages%20-%20Images/" alt="Projet EDF">
                                    <div class="carousel-overlay">
                                        <h3>Projet EDF</h3>
                                    </div>
                                </div>
                                
                                <!-- 5. La Vie du Chef -->
                                <div class="carousel-item" data-project-order="32">
                                    <img src="https://raw.githubusercontent.com/ugoooooo0/ugoooooo0.github.io/refs/heads/main/assets/images/images/Tournages%20-%20Images/" alt="La Vie du Chef">
                                    <div class="carousel-overlay">
                                        <h3>La Vie du Chef</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <button class="carousel-btn next" id="carousel-next">›</button>
                    </div>
                    
                    <!-- Indicateurs -->
                    <div class="carousel-indicators" id="carousel-indicators">
                        <button class="indicator active" data-slide="0"></button>
                        <button class="indicator" data-slide="1"></button>
                        <button class="indicator" data-slide="2"></button>
                        <button class="indicator" data-slide="3"></button>
                        <button class="indicator" data-slide="4"></button>
                    </div>
                </div>
            </section>

            <!-- Projects Grid -->
            <section id="projets" class="projects-section">
                <div class="projects-gallery">

                    <!-- Projet 1 - Capture d'écran (sans sous-images) -->
                    <div class="gallery-item large" data-category="1" data-order="1" data-has-video="non">
                        <img src="https://i.imgur.com/rWLNaOi.jpeg" 
                             alt="Capture d'écran 3D"
                             data-description="Capture d'écran d'une scène 3D montrant mes compétences en modélisation et rendu 3D">
                    </div>

                    <div class="gallery-item medium" data-category="1" data-order="2" data-has-video="non"
                         data-gallery='[
                             "https://i.imgur.com/bYcyXZT.jpeg",
                             "https://i.imgur.com/LMWlFZ1.jpeg"
                         ]'>
                        <img src="https://i.imgur.com/bYcyXZT.jpeg" 
                             alt="Animation route et pluie"
                             data-description="Animation 3D d'une route sous la pluie, travail sur les effets atmosphériques et l'ambiance cinématographique">
                    </div>

                    <!-- Projet 5 - City avec galerie (CONTIENT UNE VIDÉO YOUTUBE) -->
                    <div class="gallery-item small" data-category="1" data-order="3" data-has-video="oui"
                         data-gallery='[
                             "https://i.imgur.com/M526tSA.jpeg",
                             "https://i.imgur.com/yZC28wu.png",
                             "https://i.imgur.com/xVpZU7N.jpeg",
                             "https://i.imgur.com/owVA5LF.png",
                             "https://www.youtube.com/watch?v=BwSIBaaBu-8"
                         ]'>
                        <img src="https://i.imgur.com/M526tSA.jpeg" 
                             alt="Ville 3D avec animation"
                             data-description="Projet d'animation de voiture dans une ville 3D - Modélisation environnementale et animation dynamique avec vidéo complète">
                    </div>

                    <!-- Projet 6 - GIF Animation (sans sous-images) -->
                    <div class="gallery-item small" data-category="1" data-order="4" data-has-video="non">
                        <img src="https://i.imgur.com/LB4dDrC.gif" 
                             alt="Animation 3D GIF"
                             data-description="Animation 3D au format GIF - Démonstration de cycles d'animation fluides et de techniques d'optimisation">
                    </div>

                    <!-- Projet 7 - Screenshot Gallery (sans sous-images) -->
                    <div class="gallery-item medium" data-category="1" data-order="5" data-has-video="non">
                        <img src="https://i.imgur.com/5Nrvako.jpeg" 
                             alt="Screenshot Gallery"
                             data-description="Galerie de captures d'écran montrant différentes étapes de production 3D et techniques de rendu">
                    </div>

                    <!-- Projet 8 - Toon Scape (sans sous-images) -->
                    <div class="gallery-item small" data-category="1" data-order="6" data-has-video="non">
                        <img src="https://i.imgur.com/nYp46XK.png" 
                             alt="Toon Scape"
                             data-description="Paysage en style cartoon - Exploration du rendu stylisé et des techniques de shading non-photoréaliste">
                    </div>

                    <!-- Projet 9 - Distrib Insta (sans sous-images) -->
                    <div class="gallery-item small" data-category="1" data-order="7" data-has-video="non">
                        <img src="https://i.imgur.com/IfFt83t.png" 
                             alt="Projet cartoon Instagram"
                             data-description="Design cartoon pour réseaux sociaux - Illustration stylisée et optimisation pour les plateformes digitales">
                    </div>

                    <!-- Projet 10 - Animation Route avec galerie (1 sous-image) -->
                    <div class="gallery-item medium" data-category="1" data-order="8" data-has-video="non"
                         data-gallery='[
                             "https://i.imgur.com/M385dqA.jpeg",
                             "https://i.imgur.com/hm5f6K1.jpeg"
                         ]'>
                        <img src="https://i.imgur.com/M385dqA.jpeg" 
                             alt="Route et pluie"
                             data-description="Scène d'animation route sous la pluie - Maîtrise des effets de particules et de l'éclairage atmosphérique">
                    </div>

                    <!-- Projet 11 - Fog and GTR (sans sous-images) -->
                    <div class="gallery-item small" data-category="1" data-order="9" data-has-video="non">
                        <img src="https://i.imgur.com/8bP2wNK.png" 
                             alt="GTR dans le brouillard"
                             data-description="Voiture GTR dans un environnement brumeux - Rendu photoréaliste avec effets de volumétrie">
                    </div>

                    <!-- Projet 12 - Batspace avec galerie (2 sous-images) -->
                    <div class="gallery-item large" data-category="1" data-order="10" data-has-video="non"
                         data-gallery='[
                             "https://i.imgur.com/etJKXxT.jpeg",
                             "https://i.imgur.com/Na8JoIe.jpeg",
                             "https://i.imgur.com/jbFweKy.jpeg"
                         ]'>
                        <img src="https://i.imgur.com/etJKXxT.jpeg" 
                             alt="Batspace - Véhicule spatial"
                             data-description="Véhicule spatial futuriste - Design conceptuel et modélisation hard-surface avec variations">
                    </div>

                    <!-- Projet 13 - Correction -->
                    <div class="gallery-item medium" data-category="1" data-order="11" data-has-video="non"
                         data-gallery='[
                             "https://i.imgur.com/An3GRse.png",
                             "https://i.imgur.com/QLZEImJ.jpeg",
                             "https://i.imgur.com/JQCLCv4.jpeg",
                             "https://i.imgur.com/pcCXcri.png"
                         ]'>
                        <img src="https://i.imgur.com/An3GRse.png" 
                             alt="Armure futuriste"
                             data-description="Armure futuriste 3D - Modélisation détaillée avec matériaux métalliques et process de création">
                    </div>

                    <!-- Projet 14 - Apple Vision Pro avec galerie (2 sous-images) -->
                    <div class="gallery-item small" data-category="1" data-order="12" data-has-video="non"
                         data-gallery='[
                             "https://i.imgur.com/PFnuGee.jpeg",
                             "https://i.imgur.com/QXoDWjd.jpeg",
                             "https://i.imgur.com/qN0tLs8.jpeg"
                         ]'>
                        <img src="https://i.imgur.com/PFnuGee.jpeg" 
                             alt="Apple Vision Pro 3D"
                             data-description="Modélisation Apple Vision Pro - Reproduction fidèle du casque VR avec matériaux réalistes">
                    </div>

                    <!-- Projet 15 - Correction -->
                    <div class="gallery-item medium" data-category="1" data-order="13" data-has-video="non"
                         data-gallery='[
                             "https://i.imgur.com/jzolHlt.jpeg",
                             "https://i.imgur.com/MkvQGFh.png"
                         ]'>
                        <img src="https://i.imgur.com/jzolHlt.jpeg" 
                             alt="Scène conceptuelle avec variations"
                             data-description="Scène conceptuelle 3D - Exploration artistique avec variations d'éclairage et d'ambiance">
                    </div>

                    <!-- Projet 17 - Motor Space avec galerie (4 sous-images) -->
                    <div class="gallery-item large" data-category="1" data-order="14" data-has-video="non"
                         data-gallery='[
                            "https://i.imgur.com/JURiEbT.jpeg",
                             "https://i.imgur.com/JoouOKq.png",
                             "https://i.imgur.com/GDb3Gb7.png",
                             "https://i.imgur.com/V93DInL.png",
                             "https://i.imgur.com/gwwNqEg.png",
                             "https://i.imgur.com/zTfQAkv.png"
                         ]'>
                        <img src="https://i.imgur.com/JURiEbT.jpeg" 
                             alt="Moto spatiale futuriste"
                             data-description="Moto spatiale futuriste - Concept design avec multiples variations et process de création détaillé">
                    </div>

                    <!-- Projet 18 - Correction -->
                    <div class="gallery-item medium" data-category="1" data-order="15" data-has-video="non"
                         data-gallery='[
                             "https://i.imgur.com/AskS27f.jpeg",
                             "https://i.imgur.com/MFObaDC.jpeg"
                         ]'>
                        <img src="https://i.imgur.com/AskS27f.jpeg" 
                             alt="Retribution - Scène dramatique"
                             data-description="Retribution - Scène dramatique 3D avec éclairage cinématographique et atmosphère sombre">
                    </div>

                    <!-- Projet 19 - Sci-fi Scene avec galerie (2 sous-images) -->
                    <div class="gallery-item small" data-category="1" data-order="16" data-has-video="non"
                         data-gallery='[
                             "https://i.imgur.com/izVTzPB.jpeg",
                             "https://i.imgur.com/Q1sF3Hb.jpeg",
                             "https://i.imgur.com/i3YzyvI.jpeg"
                         ]'>
                        <img src="https://i.imgur.com/izVTzPB.jpeg" 
                             alt="Environnement sci-fi futuriste"
                             data-description="Environnement sci-fi futuriste - Architecture avancée et design de science-fiction avec multiples vues">
                    </div>

                    <!-- Projet 20 - Shoot Tel (sans sous-images) -->
                    <div class="gallery-item small" data-category="1" data-order="17" data-has-video="non">
                        <img src="https://i.imgur.com/c4EAy8n.png" 
                             alt="Shoot photo téléphone stylisé"
                             data-description="Shoot photo téléphone stylisé - Mise en scène créative avec lighting studio et rendu propre">
                    </div>

                    <!-- Projet 22 - Space Station avec galerie (2 sous-images) -->
                    <div class="gallery-item large" data-category="1" data-order="18" data-has-video="non"
                         data-gallery='[
                             "https://i.imgur.com/3Ruqxku.jpeg",
                             "https://i.imgur.com/6iZj9wI.jpeg",
                             "https://i.imgur.com/Jv4KLle.jpeg"
                         ]'>
                        <img src="https://i.imgur.com/3Ruqxku.jpeg" 
                             alt="Station spatiale orbitale"
                             data-description="Station spatiale orbitale - Complex architectural spatial avec systèmes rotatifs et détails techniques">
                    </div>

                    <!-- Projet 23 - Correction -->
                    <div class="gallery-item medium" data-category="1" data-order="19" data-has-video="non"
                         data-gallery='[
                             "https://i.imgur.com/K1iwNmq.jpeg",
                             "https://i.imgur.com/i7mdDi4.png"
                         ]'>
                        <img src="https://i.imgur.com/K1iwNmq.jpeg"  
                             alt="Terra - Planète conceptuelle"
                             data-description="Terra - Conception de planète avec écosystème unique et formations géologiques fantastiques">
                    </div>

                <div class="gallery-item medium" data-category="1" data-order="20" data-has-video="oui"
                         data-gallery='[
                             "https://i.imgur.com/oiVM13r.png",
                             "https://www.youtube.com/watch?v=dkax0LbPZuI"
                         ]'>
                        <img src="https://i.imgur.com/oiVM13r.png" 
                             alt="Projet Baccalauréat - Téléphone 3D"
                             data-description="Projet Baccalauréat - Conception téléphone 3D avec animation et présentation vidéo complète">
                    </div>

                     <div class="gallery-item large" data-category="1" data-order="21" data-has-video="non">
                        <img src="https://i.imgur.com/jyIU6PG.jpeg" 
                             alt="Paysage cosmique avec trou noir"
                             data-description="Paysage cosmique avec trou noir - Exploration des effets spatiaux et de la distorsion gravitationnelle">
                    </div>

                    <div class="gallery-item large" data-category="1" data-order="22" data-has-video="non">
                        <img src="https://i.imgur.com/KF3wwYm.jpeg" 
                             alt="Entraînement textures PBR"
                             data-description="Entraînement textures PBR - Étude des matériaux et techniques de texturage photoréaliste">
                    </div>
                    
                    <div class="gallery-item large" data-category="1" data-order="23" data-has-video="non">
                        <img src="https://i.imgur.com/aS0VZJH.jpeg" 
                             alt="Paysages marécageux"
                             data-description="Environnements marécageux 3D - Modélisation d'écosystèmes naturels et végétation procédurale">
                    </div>

                    <div class="gallery-item large" data-category="1" data-order="24" data-has-video="non">
                        <img src="https://i.imgur.com/kdvNBHh.jpeg" 
                             alt="Lune avec displacement mapping"
                             data-description="Surface lunaire avec displacement mapping - Technique avancée de relief et de géologie spatiale">
                    </div>                    <div class="gallery-item large" data-category="1" data-order="25" data-has-video="non">
                        <img src="https://i.imgur.com/ynaluMT.png" 
                             alt="Scène d'expérimentation 3D"
                             data-description="Scène d'expérimentation 3D - Tests de lighting et de composition visuelle avancée">
                    </div>

                    <div class="gallery-item large" data-category="1" data-order="26" data-has-video="non">
                        <img src="https://i.imgur.com/UCGzkfR.jpeg" 
                             alt="Starship en vol dans les nuages"
                             data-description="Starship en vol - Animation de vaisseau spatial avec simulation de nuages et atmosphère">
                    </div>

                    <div class="gallery-item large" data-category="1" data-order="27" data-has-video="non"
                         data-gallery='[
                             "https://i.imgur.com/7i4zVDY.jpeg",
                             "https://i.imgur.com/HFJ4Oy3.png",
                             "https://i.imgur.com/M7q9GN2.png",
                             "https://i.imgur.com/IFNszcL.png",
                             "https://i.imgur.com/5nvpECw.png",
                             "https://i.imgur.com/yNVsPwr.jpeg",
                             "https://i.imgur.com/c8okZ8T.jpeg",
                             "https://i.imgur.com/5PjQr8Y.png",
                             "https://i.imgur.com/L10rrjj.jpeg"
                         ]'>
                        <img src="https://i.imgur.com/7i4zVDY.jpeg" 
                             alt="Le Colossus - Vaisseau spatial game-ready"
                             data-description="Le Colossus - Vaisseau spatial game-ready complet avec textures, materials et process de création détaillé">
                    </div>

                  <div class="gallery-item medium" data-category="1" data-order="28" data-has-video="non"
                         data-gallery='[
                             "https://i.imgur.com/9veRK58.jpeg",
                             "https://i.imgur.com/rIx4Wsw.jpeg"
                         ]'>
                        <img src="https://i.imgur.com/9veRK58.jpeg" 
                             alt="Effets VFX cinématographiques"
                             data-description="Effets VFX cinématographiques - Compositing et post-production avec intégration 3D/2D">
                    </div>

                    <div class="gallery-item medium" data-category="1" data-order="29" data-has-video="non"
                         data-gallery='[
                             "https://i.imgur.com/kgWAZ3n.png",
                             "https://i.imgur.com/XhqrpAH.jpeg"
                         ]'>
                        <img src="https://i.imgur.com/kgWAZ3n.png" 
                             alt="Compositing VFX avancé"
                             data-description="Compositing VFX avancé - Intégration d'éléments 3D dans environnements réels avec color grading">
                    </div>
                    
                    <div class="gallery-item medium" data-category="1" data-order="30" data-has-video="non"
                         data-gallery='[
                             "https://i.imgur.com/l8XUTI1.png",
                             "https://i.imgur.com/WCtLyf8.png",
                             "https://i.imgur.com/APd87TK.png"
                         ]'>
                        <img src="https://i.imgur.com/l8XUTI1.png" 
                             alt="Level design architectural"
                             data-description="Level design architectural - Conception d'environnements 3D pour jeux vidéo avec différentes variations">
                    </div>

                    <div class="gallery-item large" data-category="1" data-order="31" data-has-video="non">
                        <img src="https://i.imgur.com/t8Y441L.jpeg" 
                             alt="Paysage photoréaliste"
                             data-description="Paysage photoréaliste - Environnement naturel avec techniques de rendu avancées et éclairage naturel">
                    </div>

                   <div class="gallery-item medium" data-category="1" data-order="32" data-has-video="non"
                         data-gallery='[
                             "https://i.imgur.com/gxCcinm.png",
                             "https://i.imgur.com/bVVW1vk.jpeg"
                         ]'>
                        <img src="https://i.imgur.com/gxCcinm.png" 
                             alt="Machines industrielles imprimables 3D"
                             data-description="Machines industrielles - Modèles 3D techniques optimisés pour l'impression 3D avec assemblages complexes">
                    </div>

                    <div class="gallery-item medium" data-category="2" data-order="33" data-has-video="non"
                         data-gallery='[
                             "https://i.imgur.com/tvdD2dR.png",
                             "https://i.imgur.com/JQn1Zpc.png",
                             "https://i.imgur.com/6Pq71c5.jpeg",
                             "https://i.imgur.com/m9k6Tso.png"
                         ]'>
                        <img src="https://i.imgur.com/tvdD2dR.png" 
                             alt="Projet EDF - Tournage professionnel"
                             data-description="Projet EDF - Tournage professionnel et captation d'images techniques pour entreprise énergétique">
                    </div>


                   <div class="gallery-item medium" data-category="2" data-order="34" data-has-video="oui"
                         data-gallery='[
                             "https://i.imgur.com/0T3tOw6.png",
                             "https://www.youtube.com/watch?v=kCo_sF-JbVk"
                         ]'>
                        <img src="https://i.imgur.com/0T3tOw6.png" 
                             alt="Electromontage Elec - Vidéo corporate"
                             data-description="Electromontage Elec - Montage vidéo corporate avec grading et post-production complète">
                    </div>

                    <div class="gallery-item medium" data-category="2" data-order="35" data-has-video="oui"
                         data-gallery='[
                             "https://i.imgur.com/YfKKP0u.png",
                             "https://www.youtube.com/@LavieDuchef/videos"
                         ]'>
                        <img src="https://i.imgur.com/YfKKP0u.png" 
                             alt="La Vie Du Chef - Chaîne YouTube"
                             data-description="La Vie Du Chef - Tournages et montages pour chaîne YouTube culinaire avec animations et effets">
                    </div>


                </div>
            </section>

            <!-- Section Contact -->
            <section id="contact" class="section contact-section">
                <h2 data-translate="CONTACT">CONTACT</h2>
                <div class="contact-info">
                    <p>
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmMDAwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIzLjQ5OCA2LjE4NmMtLjI4NS0xLjA3Ni0xLjEyNS0xLjkyMy0yLjE5OC0yLjIwN0MxOS40MyAzLjU0IDEyIDMuNTQgMTIgMy41NHMtNy40MyAwLTkuMyAuNDM5Yy0xLjA3My4yODQtMS45MTMgMS4xMzEtMi4xOTggMi4yMDdDMCA4LjA3NCAwIDEyIDAgMTJzMCAzLjkyNi40NTggNS44MTRjLjI4NSAxLjA3NiAxLjEyNSAxLjkyMyAyLjE5OCAyLjIwN0M0LjU3IDIwLjQ2IDEyIDIwLjQ2IDEyIDIwLjQ2czcuNDMgMCA5LjMtLjQzOWMxLjA3My0uMjg0IDEuOTEzLTEuMTMxIDIuMTk4LTIuMjA3QzI0IDE1LjkyNiAyNCAxMiAyNCAxMnMwLTMuOTI2LS41MDItNS44MTRaIi8+CjxwYXRoIGQ9Im05LjU0NSAxNS41NjggNC43MjgtMi41NjgtNC43MjgtMi41Njh2NS4xMzZaIiBmaWxsPSIjZmZmZmZmIi8+Cjwvc3ZnPgo=" 
                             alt="YouTube" class="social-icon">
                        <a href="https://www.youtube.com/@Ugoravard" target="_blank">YouTube</a>
                    </p>
                    <p>
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzAwNzdiNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjQ0NyAyMC40NTJIMTYuODkzVjE0Ljg4M2MwLTEuMzI4LS4wMjctMy4wMzctMS44NTItMy4wMzctMS44NTMgMC0yLjEzNiAxLjQ0NS0yLjEzNiAyLjkzOXY1LjY2N0g5LjM1MVY5aDMuNDE0djEuNTYxaC4wNDdjLjQ3My0uODk2IDEuNjM3LTEuODQgMy4zNy0xLjg0IDMuNjAxIDAgNC4yNjcgMi4zNyA0LjI2NyA1LjQ1NXY2Ljc3NnpNNS4zMzcgNy40MzNhMi4wNjIgMi4wNjIgMCAxIDEtLjAwMS00LjEyNSAyLjA2MyAyLjA2MyAwIDAgMSAuMDAxIDQuMTI1ek0zLjU1OSAyMC40NTJINC4xMTRWOUgzLjU1OXYxMS40NTJaTTIyLjIyNSAwSDEuNzcxQy43OTIgMCAwIC43NzQgMCAxLjcyOXYyMC41NDJDMCAyMy4yMjcuNzkyIDI0IDEuNzcxIDI0aDIwLjQ1NDJDI4MjMuMjA4IDI0IDI0IDIzLjIyNyAyNCAyMi4yNzFWMS43MjlDMjQgLjc3NCAyMy4yMDggMCAyMi4yMjUgMHoiLz4KPC9zdmc+Cg==" 
                             alt="LinkedIn" class="social-icon">
                        <a href="https://www.linkedin.com/in/ugo-ravard-42b408349" target="_blank">LinkedIn</a>
                    </p>
                    <p>
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzMzMzMzMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIC4yOTdjLTYuNjMgMC0xMiA1LjM3My0xMiAxMiAwIDUuMzAzIDMuNDM4IDkuOCA4LjIwNSAxMS4zODcuNi4xMTMuODItLjI1OC44Mi0uNTc3IDAtLjI4NS0uMDEtMS4wNC0uMDE1LTIuMDQtMy4zMzguNzI0LTQuMDQyLTEuNjEtNC4wNDItMS42MS0uNTQ2LTEuMzg3LTEuMzMzLTEuNzU2LTEuMzMzLTEuNzU2LTEuMDg5LS43NDQuMDgzLS43MjkuMDgzLS43MjkgMS4yMDUuMDg0IDEuODM5IDEuMjM3IDEuODM5IDEuMjM3IDEuMDcgMS44MzQgMi44MDcgMS4zMDQgMy40OTIuOTk3LjEwNy0uNzc1LjQxOC0xLjMwNS43NjItMS42MDQtMi42NjUtLjMwNS01LjQ2Ny0xLjMzNC01LjQ2Ny01LjkzMSAwLTEuMzExLjQ2OS0yLjM4MSAxLjIzNi0zLjIyMS0uMTI0LS4zMDMtLjUzNS0xLjUyNC4xMTctMy4xNzYgMCAwIDEuMDA4LS4zMjIgMy4zIDEuMjMuOTU3LS4yNjYgMS45ODMtLjM5OSAzLjAwMy0uNDA0IDEuMDIuMDA1IDIuMDQ3LjEzOCAzLjAwNi40MDQgMi4yOTEtMS41NTIgMy4yOTctMS4yMyAzLjI5Ny0xLjIzLjY1MyAxLjY1My4yNDIgMi44NzQuMTE4IDMuMTc2Ljc3LjA0IDEuMjM1IDEuOTExIDEuMjM1IDMuMjIxIDAgNC42MDktMi44MDcgNS42MjQtNS40NzkgNS45MjEuNDMuMzcyLjgyMyAxLjEwMi44MjMgMi4yMjJ2My4yOTNjMCAuMzE5LjIxNi42OTQuODI1LjU3NkMyMC41NjUgMjIuMDkyIDI0IDE3LjU5MiAyNCAxMi4yOTdjMC02LjYyNy01LjM3My0xMi0xMi0xMiIvPgo8L3N2Zz4K" 
                             alt="GitHub" class="social-icon">
                        <a href="https://github.com/ugoooooo0" target="_blank">GitHub</a>
                    </p>
                </div>

                <!-- Formulaire de contact -->
                <div class="contact-form-container">
                    <h3 data-translate="Envoyez-moi un message">Envoyez-moi un message</h3>
                    <form id="contact-form" class="contact-form">
                        <div class="form-group">
                            <input type="text" id="name" name="name" placeholder="Votre nom" data-translate="Votre nom" required>
                        </div>
                        <div class="form-group">
                            <input type="email" id="email" name="email" placeholder="Votre email" data-translate="Votre email" required>
                        </div>
                        <div class="form-group">
                            <textarea id="message" name="message" placeholder="Votre message..." data-translate="Votre message..." rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" data-translate="📩 Envoyer le message">
                            📩 Envoyer le message
                        </button>
                    </form>
                </div>
            </section>
        </main>
    </div>

    <!-- Lightbox Modal améliorée -->
    <div id="lightbox" class="lightbox">
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-navigation">
                <button class="lightbox-prev">‹</button>
                <button class="lightbox-next">›</button>
            </div>
            <div class="lightbox-image-container">
                <img id="lightbox-image" src="" alt="">
            </div>
            <div id="lightbox-description" class="lightbox-description"></div>
            <div class="lightbox-counter">
                <span id="current-image">1</span> / <span id="total-images">1</span>
            </div>
        </div>
    </div>

    <script src="js/translations.js"></script>
    <script src="js/main.js"></script>
    <script src="js/mobile-test.js"></script>
</body>
</html>


// Système de traduction manuelle pour le portfolio
class TranslationSystem {
    constructor() {
        this.currentLanguage = localStorage.getItem('portfolio-language') || 'fr';
        this.originalDescriptions = new Map(); // Pour sauvegarder les descriptions originales
        this.translations = {
            fr: {
                // Navigation principale
                'PORTFOLIO UGO RAVARD': 'PORTFOLIO UGO RAVARD',
                'PRÉSENTATION': 'PRÉSENTATION',
                'PORTFOLIO': 'PORTFOLIO',
                'CV': 'CV',
                'CONTACT': 'CONTACT',
                'ACCUEIL': 'ACCUEIL',
                'MON PORTFOLIO': 'MON PORTFOLIO',
                
                // Filtres portfolio
                '2D/3D': '2D/3D',
                'Films': 'Films/Images',
                'Movies/Images': 'Movies/Images',
                
                // Page d'accueil - Section présentation
                'ARTISTE 3D': 'ARTISTE 3D',
                'presentation-text': 'Je m\'appelle Ugo Ravard, j\'ai 18 ans et je suis passionné par la création numérique et la 3D depuis plusieurs années. J\'aime donner vie à des idées à travers la modélisation, l\'animation et la conception visuelle. Actuellement étudiant au CNAM Enjmin, une école reconnue en France dans le domaine du jeu vidéo et de la création numérique, je développe mes compétences artistiques et techniques pour bâtir une carrière dans l\'industrie créative. Ce portfolio rassemble mes travaux et projets, reflets de mon univers et de mon évolution artistique.',
                '🎨 VOIR MON PORTFOLIO': '🎨 VOIR MON PORTFOLIO',
                
                // Section CV
                'Mon CV': 'Mon CV',
                'cv-description': 'Découvrez mon parcours, mes compétences et mes expériences professionnelles.',
                '📄 Voir mon CV': '📄 Voir mon CV',
                
                // Section Contact
                'Envoyez-moi un message': 'Envoyez-moi un message',
                'Votre nom': 'Votre nom',
                'Votre email': 'Votre email',
                'Votre message...': 'Votre message...',
                '📩 Envoyer le message': '📩 Envoyer le message',
                
                // Footer
                'footer-text': '© 2024 Ugo Ravard - Tous droits réservés',
                
                // Carrousel des projets vedettes
                'Mes Meilleurs Projets': 'Mes Meilleurs Projets',
                'Scène Éolienne': 'Scène Éolienne',
                'Scène sur une éolienne sous une mer de nuages': 'Scène sur une éolienne sous une mer de nuages',
                'Ville 3D': 'Ville 3D',
                'Projet de ville 3D avec animation de voiture': 'Projet de ville 3D avec animation de voiture',
                'Armures Spatiales': 'Armures Spatiales',
                'Collection d\'armures spatiales futuristes': 'Collection d\'armures spatiales futuristes',
                'Projet Terra': 'Projet Terra',
                'Exoplanète et sa lune dans l\'espace': 'Exoplanète et sa lune dans l\'espace',
                'Retribution': 'Retribution',
                'FanArt Star Citizen': 'FanArt Star Citizen',
                
                // Descriptions des projets portfolio
                'Scène sur une éolienne sous une mer de nuages': 'Scène sur une éolienne sous une mer de nuages',
                'Route sous la pluie': 'Route sous la pluie',
                'Projet de ville 3D avec animation de voiture': 'Projet de ville 3D avec animation de voiture',
                'Animation pixel art - épreuve de sélection à mon école (Cnam Enjmin)': 'Animation pixel art - épreuve de sélection à mon école (Cnam Enjmin)',
                'Astraunaute dans une nébuleuse volumétrique': 'Astronaute dans une nébuleuse volumétrique',
                'Environnement cartoon inspiré des films Ghibli': 'Environnement cartoon inspiré des films Ghibli',
                'Distributeur style cartoon': 'Distributeur style cartoon',
                'Voiture Nissane GTR dans le brouillard': 'Voiture Nissan GTR dans le brouillard',
                'Projet Batspace - Vaisseau spatial': 'Projet Batspace - Vaisseau spatial',
                'Modélisation d\'armure / combinaison spatiale': 'Modélisation d\'armure / combinaison spatiale',
                'Modélisation Apple Vision Pro': 'Modélisation Apple Vision Pro',
                'base terrestre - Blender - Twinmotion': 'Base terrestre - Blender - Twinmotion',
                'Projet moto futuriste - inspiré de la saga Star Wars': 'Projet moto futuriste - inspiré de la saga Star Wars',
                'Projet Retribution - FanArt Star Citizen': 'Projet Retribution - FanArt Star Citizen',
                'base de science science-fiction': 'Base de science science-fiction',
                'Imagination de shooting photo': 'Imagination de shooting photo',
                'Epave d\'une station spatiale': 'Épave d\'une station spatiale',
                'Projet Terra - Exoplanète et sa lune': 'Projet Terra - Exoplanète et sa lune',
                'Projet de conception de téléphone pour mon Baccalauréat': 'Projet de conception de téléphone pour mon Baccalauréat',
                'Paysage avec un trou noir': 'Paysage avec un trou noir',
                'Batiment avec textures réalistes': 'Bâtiment avec textures réalistes',
                'maraicages dans une forêt': 'Marécages dans une forêt',
                'lune + Displacement map': 'Lune + Displacement map',
                '...': '...',
                'Starship + nuages volumétriques': 'Starship + nuages volumétriques',
                'The Colossus - Un vaisseau spacial Game-Ready avec intérieur visitable': 'The Colossus - Un vaisseau spatial Game-Ready avec intérieur visitable',
                'VFX tracking Apple Vision Pro': 'VFX tracking Apple Vision Pro',
                'VFX tracking Lamborghini': 'VFX tracking Lamborghini',
                'Level design + Batiments inspirés du jeu Star Citizen (Blender + Unreal Engine)': 'Level design + Bâtiments inspirés du jeu Star Citizen (Blender + Unreal Engine)',
                'Environnement fait sur entièrement sur Blender': 'Environnement fait entièrement sur Blender',
                'Chaine de machines imprimables en 3D - Inspiré du jeu Satisfactory': 'Chaîne de machines imprimables en 3D - Inspiré du jeu Satisfactory',
                'Séries de tournages pour l\'entreprise EDF': 'Séries de tournages pour l\'entreprise EDF',
                'Montage pour Electromontage Elec sur After Effects': 'Montage pour Electromontage Elec sur After Effects',
                'Tournages et Montage vidéo pour l\'émission La Vie Du Chef': 'Tournages et Montage vidéo pour l\'émission La Vie Du Chef'
            },
            en: {
                // Navigation principale
                'PORTFOLIO UGO RAVARD': 'UGO RAVARD PORTFOLIO',
                'PRÉSENTATION': 'ABOUT',
                'PORTFOLIO': 'PORTFOLIO', 
                'CV': 'CV',
                'CONTACT': 'CONTACT',
                'ACCUEIL': 'HOME',
                'MON PORTFOLIO': 'MY PORTFOLIO',
                
                // Filtres portfolio
                '2D/3D': '2D/3D',
                'Films/Images': 'Movies/Images',
                
                // Page d'accueil - Section présentation
                'ARTISTE 3D': '3D ARTIST',
                'presentation-text': 'My name is Ugo Ravard, I am 18 years old and I have been passionate about digital creation and 3D for several years. I love bringing ideas to life through modeling, animation and visual design. Currently studying at CNAM Enjmin, a renowned school in France in the field of video games and digital creation, I am developing my artistic and technical skills to build a career in the creative industry. This portfolio brings together my work and projects, reflections of my universe and my artistic evolution.',
                '🎨 VOIR MON PORTFOLIO': '🎨 VIEW MY PORTFOLIO',
                
                // Section CV
                'Mon CV': 'My CV',
                'cv-description': 'Discover my background, skills and professional experiences.',
                '📄 Voir mon CV': '📄 View my CV',
                
                // Section Contact
                'Envoyez-moi un message': 'Send me a message',
                'Votre nom': 'Your name',
                'Votre email': 'Your email',
                'Votre message...': 'Your message...',
                '📩 Envoyer le message': '📩 Send message',
                
                // Footer
                'footer-text': '© 2024 Ugo Ravard - All rights reserved',
                
                // Carrousel des projets vedettes
                'Mes Meilleurs Projets': 'My Best Projects',
                'Scène Éolienne': 'Wind Turbine Scene',
                'Scène sur une éolienne sous une mer de nuages': 'Scene on a wind turbine under a sea of clouds',
                'Ville 3D': '3D City',
                'Projet de ville 3D avec animation de voiture': '3D city project with car animation',
                'Armures Spatiales': 'Space Armors',
                'Collection d\'armures spatiales futuristes': 'Collection of futuristic space armors',
                'Projet Terra': 'Terra Project',
                'Exoplanète et sa lune dans l\'espace': 'Exoplanet and its moon in space',
                'Retribution': 'Retribution',
                'FanArt Star Citizen': 'Star Citizen FanArt',
                
                // Descriptions des projets portfolio
                'Scène sur une éolienne sous une mer de nuages': 'Scene on a wind turbine under a sea of clouds',
                'Route sous la pluie': 'Road in the rain',
                'Projet de ville 3D avec animation de voiture': '3D city project with car animation',
                'Animation pixel art - épreuve de sélection à mon école (Cnam Enjmin)': 'Pixel art animation - selection test for my school (Cnam Enjmin)',
                'Astraunaute dans une nébuleuse volumétrique': 'Astronaut in a volumetric nebula',
                'Environnement cartoon inspiré des films Ghibli': 'Cartoon environment inspired by Ghibli films',
                'Distributeur style cartoon': 'Cartoon style vending machine',
                'Voiture Nissane GTR dans le brouillard': 'Nissan GTR car in the fog',
                'Projet Batspace - Vaisseau spatial': 'Batspace Project - Spaceship',
                'Modélisation d\'armure / combinaison spatiale': 'Armor / space suit modeling',
                'Modélisation Apple Vision Pro': 'Apple Vision Pro modeling',
                'base terrestre - Blender - Twinmotion': 'Terrestrial base - Blender - Twinmotion',
                'Projet moto futuriste - inspiré de la saga Star Wars': 'Futuristic motorcycle project - inspired by Star Wars saga',
                'Projet Retribution - FanArt Star Citizen': 'Retribution Project - Star Citizen FanArt',
                'base de science science-fiction': 'Science-fiction science base',
                'Imagination de shooting photo': 'Photo shoot imagination',
                'Epave d\'une station spatiale': 'Wreck of a space station',
                'Projet Terra - Exoplanète et sa lune': 'Terra Project - Exoplanet and its moon',
                'Projet de conception de téléphone pour mon Baccalauréat': 'Phone design project for my Baccalaureate',
                'Paysage avec un trou noir': 'Landscape with a black hole',
                'Batiment avec textures réalistes': 'Building with realistic textures',
                'maraicages dans une forêt': 'Marshlands in a forest',
                'lune + Displacement map': 'Moon + Displacement map',
                '...': '...',
                'Starship + nuages volumétriques': 'Starship + volumetric clouds',
                'The Colossus - Un vaisseau spacial Game-Ready avec intérieur visitable': 'The Colossus - A Game-Ready spaceship with visitable interior',
                'VFX tracking Apple Vision Pro': 'VFX tracking Apple Vision Pro',
                'VFX tracking Lamborghini': 'VFX tracking Lamborghini',
                'Level design + Batiments inspirés du jeu Star Citizen (Blender + Unreal Engine)': 'Level design + Buildings inspired by Star Citizen game (Blender + Unreal Engine)',
                'Environnement fait sur entièrement sur Blender': 'Environment made entirely in Blender',
                'Chaine de machines imprimables en 3D - Inspiré du jeu Satisfactory': '3D printable machine chain - Inspired by Satisfactory game',
                'Séries de tournages pour l\'entreprise EDF': 'Series of shoots for EDF company',
                'Montage pour Electromontage Elec sur After Effects': 'Editing for Electromontage Elec on After Effects',
                'Tournages et Montage vidéo pour l\'émission La Vie Du Chef': 'Video shooting and editing for La Vie Du Chef show'
            }
        };
        
        this.init();
    }
    
    init() {
        this.createLanguageToggle();
        this.saveOriginalDescriptions(); // Sauvegarder les descriptions originales
        this.applyTranslations();
        this.updateDocumentLanguage();
    }
    
    saveOriginalDescriptions() {
        // Sauvegarder les descriptions originales une seule fois
        if (this.originalDescriptions.size === 0) {
            document.querySelectorAll('[data-description]').forEach(element => {
                const originalDesc = element.getAttribute('data-description');
                this.originalDescriptions.set(element, originalDesc);
            });
        }
    }
    
    createLanguageToggle() {
        // Supprimer l'ancien sélecteur s'il existe
        const existingToggle = document.querySelector('.language-toggle');
        if (existingToggle) {
            existingToggle.remove();
        }
        
        // Créer le nouveau sélecteur de langue
        const languageToggle = document.createElement('div');
        languageToggle.className = 'language-toggle';
        languageToggle.innerHTML = `
            <button class="lang-btn ${this.currentLanguage === 'fr' ? 'active' : ''}" data-lang="fr">
                🇫🇷 FR
            </button>
            <button class="lang-btn ${this.currentLanguage === 'en' ? 'active' : ''}" data-lang="en">
                🇺🇸 EN
            </button>
        `;
        
        // Ajouter à la navigation
        const nav = document.querySelector('nav ul');
        if (nav) {
            const langItem = document.createElement('li');
            langItem.appendChild(languageToggle);
            nav.appendChild(langItem);
        }
        
        // Ajouter les événements de clic
        languageToggle.addEventListener('click', (e) => {
            if (e.target.classList.contains('lang-btn')) {
                const newLang = e.target.dataset.lang;
                if (newLang !== this.currentLanguage) {
                    this.switchLanguage(newLang);
                }
            }
        });
    }
    
    switchLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('portfolio-language', lang);
        
        // Mettre à jour l'état des boutons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Appliquer les traductions
        this.applyTranslations();
        this.updateDocumentLanguage();
        
        // Animation fluide
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 150);
    }
    
    applyTranslations() {
        const translations = this.translations[this.currentLanguage];
        
        // Traduire tous les éléments avec data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[key];
                } else {
                    element.textContent = translations[key];
                }
            }
        });
        
        // Changer le lien du CV selon la langue
        this.updateCVLink();
        
        // Traduire les descriptions des images du portfolio
        this.originalDescriptions.forEach((originalDescription, element) => {
            if (this.currentLanguage === 'fr') {
                // Remettre la description française originale
                element.setAttribute('data-description', originalDescription);
            } else {
                // Appliquer la traduction anglaise si elle existe
                const translation = translations[originalDescription];
                if (translation) {
                    element.setAttribute('data-description', translation);
                }
            }
        });
        
        // Mettre à jour le titre de la page
        this.updatePageTitle();
    }
    
    updatePageTitle() {
        const currentTitle = document.title;
        if (this.currentLanguage === 'en') {
            document.title = currentTitle
                .replace('Portfolio Ugo Ravard', 'Ugo Ravard Portfolio')
                .replace('Mon Portfolio', 'My Portfolio');
        } else {
            document.title = currentTitle
                .replace('Ugo Ravard Portfolio', 'Portfolio Ugo Ravard')
                .replace('My Portfolio', 'Mon Portfolio');
        }
    }
    
    updateCVLink() {
        // Trouver le lien du CV
        const cvLink = document.querySelector('a[data-translate="📄 Voir mon CV"]');
        if (cvLink) {
            if (this.currentLanguage === 'en') {
                // Lien vers le CV en anglais
                cvLink.href = 'https://www.canva.com/design/DAGjzlgawts/J7foXKJX4g_Yy0YpsQaT-w/edit?utm_content=DAGjzlgawts&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton';
            } else {
                // Lien vers le CV en français (original)
                cvLink.href = 'https://www.canva.com/design/DAGivKtUR64/-KT03Q_Ya9h_PIMTtj5ceA/edit?utm_content=DAGivKtUR64&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton';
            }
        }
    }
    
    updateDocumentLanguage() {
        document.documentElement.setAttribute('lang', this.currentLanguage);
    }
    
    // Méthode utilitaire pour obtenir une traduction
    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
    
    // Méthode pour ajouter une nouvelle traduction à chaud
    addTranslation(key, frText, enText) {
        this.translations.fr[key] = frText;
        this.translations.en[key] = enText;
    }
}

// Variables globales
let translationSystem = null;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    translationSystem = new TranslationSystem();
    
    // Debug info
    console.log('🌐 Translation System initialized');
    console.log('Current language:', translationSystem.currentLanguage);
});

