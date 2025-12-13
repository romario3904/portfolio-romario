# Portfolio TODY Eugène Romario

## 📋 Description
Portfolio professionnel développé avec JavaScript et Bootstrap pour TODY Eugène Romario, étudiant en première année de master professionnel à l'École Nationale d'Informatique.

## 🚀 Fonctionnalités

### ✨ Design et Interface
- **Design moderne et responsive** : Interface adaptée à tous les écrans (mobile, tablette, desktop)
- **Animations fluides** : Effets de transition et animations au scroll
- **Thème professionnel** : Couleurs et typographie soignées
- **Navigation intuitive** : Menu fixe avec indicateur de section active

### 📱 Sections du Portfolio
1. **Accueil** : Présentation personnelle avec effet de frappe
2. **À propos** : Parcours académique et informations personnelles
3. **Compétences** : Barres de progression animées pour les technologies
4. **Projets** : Galerie de projets avec technologies utilisées
5. **Contact** : Formulaire de contact fonctionnel avec validation

### 🛠️ Technologies Utilisées
- **HTML5** : Structure sémantique
- **CSS3** : Styles personnalisés avec variables CSS et animations
- **JavaScript ES6+** : Interactivité et fonctionnalités avancées
- **Bootstrap 5.3** : Framework CSS responsive
- **Font Awesome** : Icônes vectorielles
- **Google Fonts** : Police Poppins

## 📁 Structure du Projet
```
Portfolio/
├── index.html          # Page principale
├── styles.css          # Styles personnalisés
├── script.js           # Fonctionnalités JavaScript
└── README.md           # Documentation
```

## 🚀 Installation et Utilisation

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur web local (optionnel pour le développement)

### Installation
1. **Téléchargez** tous les fichiers dans un dossier
2. **Ouvrez** `index.html` dans votre navigateur
3. **Personnalisez** le contenu selon vos besoins

### Utilisation avec un serveur local
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (si vous avez http-server installé)
npx http-server

# Avec PHP
php -S localhost:8000
```

## 🎨 Personnalisation

### Modifier les Informations Personnelles
1. **Nom et titre** : Modifiez dans `index.html` (lignes 25-30)
2. **Informations de contact** : Mettez à jour la section contact
3. **Compétences** : Ajustez les pourcentages dans les barres de progression
4. **Projets** : Remplacez les exemples par vos vrais projets

### Changer les Couleurs
Modifiez les variables CSS dans `styles.css` :
```css
:root {
    --primary-color: #007bff;    /* Couleur principale */
    --secondary-color: #6c757d;  /* Couleur secondaire */
    /* ... autres variables */
}
```

### Ajouter des Projets
1. Dupliquez un `.project-card` existant
2. Modifiez l'icône, le titre, la description
3. Ajustez les technologies utilisées
4. Ajoutez le lien vers votre projet

## 📧 Configuration du Formulaire de Contact

Le formulaire de contact est actuellement configuré pour une démonstration. Pour le rendre fonctionnel :

1. **Avec un service comme Formspree** :
   - Créez un compte sur formspree.io
   - Remplacez l'action du formulaire par votre URL Formspree

2. **Avec PHP** :
   - Créez un fichier `contact.php` pour traiter les données
   - Modifiez l'action du formulaire

3. **Avec JavaScript et emailJS** :
   - Intégrez le service EmailJS
   - Configurez l'envoi d'emails côté client

## 🔧 Fonctionnalités JavaScript

### Fonctionnalités Principales
- **Navigation fluide** : Scroll smooth entre les sections
- **Animations au scroll** : Éléments qui apparaissent progressivement
- **Validation de formulaire** : Vérification des données saisies
- **Effet de frappe** : Animation du nom dans la section hero
- **Barres de progression animées** : Animation des compétences
- **Bouton retour en haut** : Apparaît au scroll

### Fonctions Utilitaires
- `showNotification(message, type)` : Affiche des notifications
- `isValidEmail(email)` : Valide les adresses email
- `downloadCV()` : Télécharge le CV (à configurer)
- `copyEmail()` : Copie l'email dans le presse-papiers

## 📱 Responsive Design

Le portfolio est entièrement responsive avec des breakpoints :
- **Mobile** : < 768px
- **Tablette** : 768px - 992px
- **Desktop** : > 992px

## 🎯 Optimisations

### Performance
- **Lazy loading** : Chargement différé des images
- **Animations optimisées** : Utilisation de `requestAnimationFrame`
- **CSS minifié** : Styles optimisés pour la production

### SEO
- **Méta tags** : Description et mots-clés
- **Structure sémantique** : Utilisation des balises HTML5 appropriées
- **Alt text** : Descriptions des images

## 🚀 Déploiement

### Hébergement Gratuit
- **GitHub Pages** : Déployez directement depuis GitHub
- **Netlify** : Drag & drop des fichiers
- **Vercel** : Déploiement automatique

### Hébergement Payant
- **Serveur web classique** : Uploadez les fichiers via FTP
- **CDN** : Utilisez un CDN pour de meilleures performances

## 📞 Support

Pour toute question ou personnalisation :
- **Email** : eugene.tody@eni.edu
- **École** : École Nationale d'Informatique
- **Formation** : Master Professionnel - 1ère année

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser et de le modifier selon vos besoins.

---

**Développé avec ❤️ par TODY Eugène Romario**
