import * as THREE from 'three';
import { rng } from './utils.js';

export const SILVER = new THREE.Color(0xe6e9eb);
export const BLUE = new THREE.Color(0x2238e0);
export const DE = 0.7;
export const DF = 0.5;

// Logo decomposed into 8 rectangles (exact mathematical geometry of the ETLEGIS mark)
export const P = [
  { w: 0.55, h: 5.76, x: -3.285, y: -0.685, z: -0.25, d: DF }, // frame: left
  { w: 5.2,  h: 0.55, x: -0.41,  y: -3.29,  z: -0.25, d: DF }, // frame: bottom
  { w: 0.55, h: 1.10, x: 1.915,  y: -2.465, z: -0.25, d: DF }, // frame: right stub
  { w: 1.09, h: 0.55, x: -2.465, y: 1.92,   z: -0.25, d: DF }, // frame: top stub
  { w: 1.37, h: 5.48, x: -1.235, y: 0.825,  z: 0,     d: DE }, // E spine
  { w: 4.11, h: 1.37, x: 1.505,  y: 2.88,   z: 0,     d: DE }, // E arm 1
  { w: 4.11, h: 1.10, x: 1.505,  y: 0.825,  z: 0,     d: DE }, // E arm 2
  { w: 4.11, h: 1.37, x: 1.505,  y: -1.23,  z: 0,     d: DE }, // E arm 3
];

export const base = k => ({
  p: [P[k].x, P[k].y, P[k].z],
  r: [0, 0, 0],
  s: [P[k].w, P[k].h, P[k].d],
  tint: 0,
});

export function logo(out = 0) {
  return P.map((q, k) => {
    const b = base(k);
    if (k >= 4) {
      b.p[0] += out * 0.55;
      b.p[1] += out * 0.55;
      b.p[2] += out * 2.6;
      b.r = [out * -0.12, out * 0.18, 0];
    } else {
      b.p[0] -= out * 0.3;
      b.p[1] -= out * 0.3;
      b.p[2] -= out * 1.1;
      b.tint = out;
    }
    return b;
  });
}

export function G(c, x, y, rx, ry, rz, k) {
  if (c.mobile) return { p: [0, c.H * 0.2, 0], r: [rx, ry, rz], k: k * 0.55 };
  return { p: [c.W * x, y, 0], r: [rx, ry, rz], k };
}

export const scatter = P.map((q, k) => {
  const r = rng(k * 977 + 13);
  return {
    p: [(r() - 0.5) * 22, (r() - 0.5) * 14, (r() - 0.5) * 10 - 4],
    r: [r() * 6, r() * 6, r() * 6],
  };
});
