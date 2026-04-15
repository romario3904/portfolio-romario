const fs = require("fs");
const path = require("path");

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");

const itemsToCopy = [
  "index.html",
  "css",
  "js",
  "assets",
  "sections",
  "webfonts",
];

function ensureCleanDist() {
  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(distDir, { recursive: true });
}

function copyRecursive(srcPath, destPath) {
  const stats = fs.statSync(srcPath);

  if (stats.isDirectory()) {
    fs.mkdirSync(destPath, { recursive: true });
    fs.readdirSync(srcPath).forEach((entry) => {
      copyRecursive(path.join(srcPath, entry), path.join(destPath, entry));
    });
    return;
  }

  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);
}

function build() {
  ensureCleanDist();

  itemsToCopy.forEach((item) => {
    const source = path.join(rootDir, item);
    if (!fs.existsSync(source)) {
      throw new Error(`Élément à copier introuvable: ${item}`);
    }

    const destination = path.join(distDir, item);
    copyRecursive(source, destination);
  });

  console.log("✅ Build terminé: dossier dist/ prêt pour le déploiement.");
}

try {
  build();
} catch (error) {
  console.error("❌ Build échoué.");
  console.error(error.message);
  process.exit(1);
}
