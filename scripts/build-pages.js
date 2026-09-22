const { execSync } = require('child_process');
const path = require('path');

process.env.OUTPUT_EXPORT = 'true';
process.env.NEXT_PUBLIC_BASE_PATH = '/etlegis';

console.log('--- [1/2] Building Next.js static export ---');
execSync('npx next build', {
  stdio: 'inherit',
  env: {
    ...process.env,
    OUTPUT_EXPORT: 'true',
    NEXT_PUBLIC_BASE_PATH: '/etlegis',
  },
});

console.log('--- [2/2] Preparing assets and .nojekyll for GitHub Pages ---');
require('./prepare-pages');
console.log('--- GitHub Pages static export completed in ./out ---');
