const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Début du build du portfolio...');

// Créer la structure de dossiers si nécessaire
const directories = ['assets/css', 'assets/js', 'assets/img'];
directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Installer les dépendances
console.log('📦 Installation des dépendances...');
try {
  execSync('npm install', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Erreur lors de l\'installation des dépendances:', error);
  process.exit(1);
}

// Copier Bootstrap depuis node_modules
console.log('📁 Copie des fichiers Bootstrap...');
try {
  execSync('npm run copy-bootstrap', { stdio: 'inherit' });
} catch (error) {
  console.log('⚠️ Tentative alternative de copie de Bootstrap...');
  
  // Copie manuelle des fichiers Bootstrap
  const bootstrapSource = 'node_modules/bootstrap/dist';
  const bootstrapDest = 'assets';
  
  if (fs.existsSync(bootstrapSource)) {
    // Copier CSS
    const cssSource = path.join(bootstrapSource, 'css', 'bootstrap.min.css');
    const cssDest = path.join(bootstrapDest, 'css', 'bootstrap.min.css');
    if (fs.existsSync(cssSource)) {
      fs.copyFileSync(cssSource, cssDest);
      console.log('✅ Bootstrap CSS copié');
    }
    
    // Copier JS
    const jsSource = path.join(bootstrapSource, 'js', 'bootstrap.bundle.min.js');
    const jsDest = path.join(bootstrapDest, 'js', 'bootstrap.bundle.min.js');
    if (fs.existsSync(jsSource)) {
      fs.copyFileSync(jsSource, jsDest);
      console.log('✅ Bootstrap JS copié');
    }
  }
}

// Vérifier et créer l'image de profil par défaut si elle n'existe pas
console.log('🖼️ Vérification des images...');
const defaultImage = path.join('assets', 'img', 'romario_profil.jpg');
if (!fs.existsSync(defaultImage)) {
  console.log('⚠️ Image de profil non trouvée, création d\'une image par défaut...');
  
  // Créer un SVG par défaut comme image de profil
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4361ee;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3a0ca3;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#gradient)"/>
  <circle cx="400" cy="300" r="120" fill="#ffffff"/>
  <circle cx="340" cy="260" r="25" fill="#2d3047"/>
  <circle cx="460" cy="260" r="25" fill="#2d3047"/>
  <path d="M 340 380 Q 400 450 460 380" stroke="#2d3047" stroke-width="20" fill="none"/>
  <text x="400" y="600" text-anchor="middle" fill="white" font-family="Arial" font-size="40" font-weight="bold">
    T. Romario
  </text>
  <text x="400" y="650" text-anchor="middle" fill="white" font-family="Arial" font-size="30">
    Portfolio
  </text>
</svg>`;
  
  fs.writeFileSync(defaultImage.replace('.jpg', '.svg'), svgContent);
  console.log('✅ Image par défaut créée (SVG)');
}

// Vérifier les fichiers essentiels
console.log('🔍 Vérification des fichiers...');
const essentialFiles = ['index.html', 'package.json', 'script.js'];
essentialFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} trouvé`);
  } else {
    console.error(`❌ ${file} manquant!`);
    process.exit(1);
  }
});

// Optimiser le HTML pour la production
console.log('⚡ Optimisation du HTML...');
try {
  const htmlPath = 'index.html';
  let htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // Remplacer les CDN par les fichiers locaux
  htmlContent = htmlContent.replace(
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
    'assets/css/bootstrap.min.css'
  );
  
  htmlContent = htmlContent.replace(
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js',
    'assets/js/bootstrap.bundle.min.js'
  );
  
  // Ajouter des attributs de performance
  htmlContent = htmlContent.replace(
    '<link href="assets/css/bootstrap.min.css" rel="stylesheet">',
    '<link href="assets/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">'
  );
  
  htmlContent = htmlContent.replace(
    '<script src="assets/js/bootstrap.bundle.min.js"',
    '<script src="assets/js/bootstrap.bundle.min.js" defer crossorigin="anonymous"'
  );
  
  fs.writeFileSync(htmlPath, htmlContent);
  console.log('✅ HTML optimisé pour la production');
} catch (error) {
  console.error('⚠️ Erreur lors de l\'optimisation HTML:', error.message);
}

console.log('🎉 Build terminé avec succès!');
console.log('📁 Fichiers générés:');
console.log('  - index.html (optimisé)');
console.log('  - assets/css/bootstrap.min.css');
console.log('  - assets/js/bootstrap.bundle.min.js');
console.log('  - script.js');
console.log('\n🚀 Prêt pour le déploiement sur Vercel!');