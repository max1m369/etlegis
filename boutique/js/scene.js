import * as THREE from 'three';
import { L } from './utils.js';
import { P, SILVER } from './geometry.js';

// 6 groups of practice strictly according to etlegis.docx
export const PRACTICE_TITLES = [
  'Уголовно-правовая защита',
  'Налоговые споры и комплаенс',
  'Банкротство и ответственность',
  'Корпоративные споры',
  'Частные и имущественные споры',
  'Интеллектуальная собственность',
];

export const CUSTOM_COVERS = [null, null, null, null, null, null];

export function createCoverTexture(index, title) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Background: Deep archival slate navy / ink leather
  const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
  grad.addColorStop(0, '#0e131d');
  grad.addColorStop(0.5, '#151c29');
  grad.addColorStop(1, '#090d14');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle parchment & leather grain
  ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
  for (let i = 0; i < 9000; i++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 1024;
    ctx.fillRect(rx, ry, 1.5, 1.5);
  }

  // Outer border: Gold / Brass accent
  ctx.strokeStyle = '#c5a059';
  ctx.lineWidth = 4;
  ctx.strokeRect(48, 48, 928, 928);

  // Inner hairline border
  ctx.strokeStyle = 'rgba(197, 160, 89, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(64, 64, 896, 896);

  // Corner legal rosettes
  const cs = 22;
  const p1 = 76;
  const p2 = 1024 - 76 - cs;
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#c5a059';
  ctx.strokeRect(p1, p1, cs, cs);
  ctx.strokeRect(p2, p1, cs, cs);
  ctx.strokeRect(p1, p2, cs, cs);
  ctx.strokeRect(p2, p2, cs, cs);

  // Header: ETLEGIS · СУДЕБНОЕ ДЕЛО
  ctx.fillStyle = '#c5a059';
  ctx.font = '500 24px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('ETLEGIS · СУДЕБНОЕ ДЕЛО', 512, 160);

  // Divider line
  ctx.strokeStyle = 'rgba(197, 160, 89, 0.35)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(180, 200);
  ctx.lineTo(844, 200);
  ctx.stroke();

  // Volume number
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 68px "JetBrains Mono", monospace';
  ctx.fillText(`ТОМ 0${index + 1}`, 512, 330);

  // Title: Cormorant Garamond serif italic
  ctx.fillStyle = '#f4f2ee';
  ctx.font = 'italic 500 48px "Cormorant Garamond", serif';

  const words = (title || '').split(' ');
  let line = '';
  let y = 470;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    if (testLine.length > 18 && n > 0) {
      ctx.fillText(line.trim(), 512, y);
      line = words[n] + ' ';
      y += 62;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), 512, y);

  // Bottom seal / stamp text
  ctx.fillStyle = 'rgba(197, 160, 89, 0.85)';
  ctx.font = '500 20px "JetBrains Mono", monospace';
  ctx.fillText('СУДЕБНЫЙ ДЕПАРТАМЕНТ · АРХИВ БЮРО', 512, 860);

  ctx.strokeStyle = 'rgba(197, 160, 89, 0.35)';
  ctx.beginPath();
  ctx.moveTo(260, 810);
  ctx.lineTo(764, 810);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export function create3D(canvasId = 'gl') {
  const canvas = document.getElementById(canvasId);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 200);
  camera.position.set(0, 0, 24);

  // Custom studio environment
  (function env() {
    const es = new THREE.Scene();
    const g = new THREE.SphereGeometry(40, 48, 24);
    const col = [];
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i) / 40;
      const v = y > 0 ? L(0.62, 0.34, y) : L(0.62, 0.03, Math.pow(-y, 0.6));
      col.push(v, v, v * 1.02);
    }
    g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    es.add(new THREE.Mesh(g, new THREE.MeshBasicMaterial({ side: THREE.BackSide, vertexColors: true })));

    const strip = (w, h, x, y, z, v) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
      m.material.color.setRGB(v, v, v);
      m.position.set(x, y, z);
      m.lookAt(0, 0, 0);
      es.add(m);
    };
    strip(26, 7, 0, 24, 6, 6);
    strip(3, 30, -22, 2, 10, 5);
    strip(2, 26, 21, 0, -6, 4);
    strip(26, 1.6, 0, -5, 24, 3);
    strip(8, 8, 10, 10, 22, 2.2);

    const pm = new THREE.PMREMGenerator(renderer);
    scene.environment = pm.fromScene(es, 0).texture;
  })();

  const pl = new THREE.PointLight(0xffffff, 60, 0, 2);
  pl.position.set(0, 0, 8);
  scene.add(pl);

  const group = new THREE.Group();
  scene.add(group);

  const geo = new THREE.BoxGeometry(1, 1, 1);
  const meshes = P.map((p, i) => {
    // 5 faces use chrome metal
    const sideMat = new THREE.MeshPhysicalMaterial({
      color: SILVER.clone(),
      metalness: 0.95,
      roughness: 0.16,
      clearcoat: 0.5,
      clearcoatRoughness: 0.12,
    });

    // Face 2 (+Y) uses archival legal leather texture for the 6 practice tomes
    const coverTex = i < PRACTICE_TITLES.length ? createCoverTexture(i, PRACTICE_TITLES[i]) : null;
    const topMat = coverTex
      ? new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          map: coverTex,
          metalness: 0.25,
          roughness: 0.32,
          clearcoat: 0.8,
          clearcoatRoughness: 0.12,
        })
      : sideMat;

    const materials = [sideMat, sideMat, topMat, sideMat, sideMat, sideMat];
    const m = new THREE.Mesh(geo, materials);
    m.userData.tint = 0;
    m.userData.sideMat = sideMat;
    m.userData.topMat = topMat;
    m.userData.coverTex = coverTex;
    group.add(m);
    return m;
  });

  return { renderer, scene, camera, group, meshes };
}
