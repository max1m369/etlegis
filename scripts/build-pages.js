const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

process.env.OUTPUT_EXPORT = 'true';
process.env.NEXT_PUBLIC_BASE_PATH = '/etlegis';

try {
  // 1. Run static export build
  console.log('--- [1/2] Building Next.js static export ---');
  execSync('npx next build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      OUTPUT_EXPORT: 'true',
      NEXT_PUBLIC_BASE_PATH: '/etlegis',
    },
  });

  // 3. Prepare assets for GitHub Pages (.nojekyll, static rewrites)
  console.log('--- [2/2] Preparing assets and .nojekyll for GitHub Pages ---');
  require('./prepare-pages');

  // Copy /hub/index.html to /index.html in out/ so GitHub Pages loads the Minimalist Hub by default!
  const outDir = path.join(__dirname, '..', 'out');
  const hubHtmlPath = path.join(outDir, 'hub', 'index.html');
  const rootHtmlPath = path.join(outDir, 'index.html');
  const v26HtmlDir = path.join(outDir, 'v2-6');
  const v26HtmlPath = path.join(v26HtmlDir, 'index.html');

  if (fs.existsSync(hubHtmlPath)) {
    // If rootHtml was v2.6, save it to /v2-6/index.html if needed
    if (!fs.existsSync(v26HtmlPath) && fs.existsSync(rootHtmlPath)) {
      if (!fs.existsSync(v26HtmlDir)) fs.mkdirSync(v26HtmlDir, { recursive: true });
      fs.copyFileSync(rootHtmlPath, v26HtmlPath);
    }
    // Set root index.html to be the Minimalist Hub
    fs.copyFileSync(hubHtmlPath, rootHtmlPath);
    console.log('--- Hub set as root index.html for GitHub Pages ---');
  }

  console.log('--- GitHub Pages static export completed successfully in ./out ---');
} catch (err) {
  console.error('Build pages error:', err);
  process.exit(1);
}
