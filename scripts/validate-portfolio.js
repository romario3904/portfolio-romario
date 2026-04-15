const fs = require("fs");
const path = require("path");

const modeArg = process.argv.find((arg) => arg.startsWith("--mode="));
const mode = modeArg ? modeArg.split("=")[1] : "test";

const rootDir = process.cwd();

const requiredFiles = [
  "index.html",
  "css/style.css",
  "css/bootstrap.min.css",
  "js/main.js",
  "js/bootstrap.bundle.min.js",
  "sections/header.html",
  "sections/hero.html",
];

function assertFileExists(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Fichier requis introuvable: ${relativePath}`);
  }
}

function collectLocalAssetsFromIndex(indexContent) {
  const regex = /(src|href)\s*=\s*"([^"]+)"/g;
  const localAssets = [];
  let match = regex.exec(indexContent);

  while (match) {
    const assetPath = match[2].trim();
    const isExternal =
      assetPath.startsWith("http://") ||
      assetPath.startsWith("https://") ||
      assetPath.startsWith("mailto:") ||
      assetPath.startsWith("tel:") ||
      assetPath.startsWith("#") ||
      assetPath.startsWith("data:");

    if (!isExternal) {
      localAssets.push(assetPath);
    }

    match = regex.exec(indexContent);
  }

  return localAssets;
}

function validateLocalAssets() {
  const indexPath = path.join(rootDir, "index.html");
  const indexContent = fs.readFileSync(indexPath, "utf8");
  const localAssets = collectLocalAssetsFromIndex(indexContent);

  const missingAssets = localAssets.filter((assetPath) => {
    const cleanPath = assetPath.split("?")[0].split("#")[0];
    return !fs.existsSync(path.join(rootDir, cleanPath));
  });

  if (missingAssets.length > 0) {
    throw new Error(
      `Ressources locales manquantes dans index.html:\n- ${missingAssets.join("\n- ")}`
    );
  }
}

function validateSections() {
  const sectionsDir = path.join(rootDir, "sections");
  const sectionFiles = fs
    .readdirSync(sectionsDir)
    .filter((file) => file.endsWith(".html"));

  if (sectionFiles.length === 0) {
    throw new Error("Aucun fichier de section HTML détecté dans sections/.");
  }
}

function run() {
  requiredFiles.forEach(assertFileExists);
  validateLocalAssets();
  validateSections();

  const label = mode === "lint" ? "LINT" : "TEST";
  console.log(`✅ ${label}: vérifications portfolio passées avec succès.`);
}

try {
  run();
} catch (error) {
  console.error("❌ Vérification échouée.");
  console.error(error.message);
  process.exit(1);
}
