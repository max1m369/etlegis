const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

if (!fs.existsSync(outDir)) {
  console.error('out directory does not exist!');
  process.exit(1);
}

// 1. Create .nojekyll
fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
console.log('Created .nojekyll');

// 2. Replacements for GitHub Pages base path
const replacements = [
  { from: /(["'])\/logo\.svg/g, to: '$1/etlegis/logo.svg' },
  { from: /(["'])\/ETLEGIS-logo\.svg/g, to: '$1/etlegis/ETLEGIS-logo.svg' },
  { from: /(["'])\/footer-bg\.webp/g, to: '$1/etlegis/footer-bg.webp' },
  { from: /(["'])\/footer-bg-hflip\.webp/g, to: '$1/etlegis/footer-bg-hflip.webp' },
  { from: /(["'])\/team\//g, to: '$1/etlegis/team/' },
  { from: /(["'])\/previews\//g, to: '$1/etlegis/previews/' },
  { from: /(["'])\/assets\//g, to: '$1/etlegis/assets/' },
  { from: /(["'])\/favicon\.ico/g, to: '$1/etlegis/favicon.ico' },
];

let modifiedCount = 0;

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (/\.(html|js|css|json|txt|xml)$/.test(entry.name)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      for (const { from, to } of replacements) {
        if (from.test(content)) {
          content = content.replace(from, to);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        modifiedCount++;
      }
    }
  }
}

processDirectory(outDir);
console.log(`Updated paths in ${modifiedCount} exported files.`);
