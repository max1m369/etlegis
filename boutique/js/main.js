import * as THREE from 'three';
import { clamp, L, ease, reduce } from './utils.js';
import { SILVER, BLUE } from './geometry.js';
import { createStates } from './states.js';
import { create3D } from './scene.js';
import { setupInteractions } from './interactions.js';

/* ================= Input & state ================= */
const M = { x: 0, y: 0, px: window.innerWidth / 2, py: window.innerHeight / 2 };
const S = { mx: 0, my: 0, f: 0, hold: 0, tilt: 0, stamp: 0 };
const state = {
  holding: false,
  aboutHover: -1,
  svcHover: -1,
  svcOpen: -1,
  memHover: -1,
  caseHover: null,
  stampAt: -10,
  filed: false,
};

window.addEventListener(
  'pointermove',
  e => {
    M.px = e.clientX;
    M.py = e.clientY;
    M.x = (e.clientX / window.innerWidth) * 2 - 1;
    M.y = (e.clientY / window.innerHeight) * 2 - 1;
    document.documentElement.style.setProperty('--mx', (e.clientX / window.innerWidth).toFixed(3));
  },
  { passive: true }
);

/* ================= 3D scene & states ================= */
const { renderer, scene, camera, group, meshes } = create3D('gl');
let intro = reduce ? 1 : 0;
const STATES = createStates(() => intro);

/* ================= Scroll -> state ================= */
const secs = [...document.querySelectorAll('[data-state]')];
let tops = [];
const measure = () => {
  tops = secs.map(s => s.getBoundingClientRect().top + window.scrollY);
};
function targetF() {
  const y = window.scrollY, vh = window.innerHeight;
  let f = 0;
  for (let k = 1; k < tops.length; k++) {
    // Start transition into Approach (k=3) and Team (k=4) earlier to eliminate dead scroll gap
    const triggerOffset = k === 3 ? vh * 1.25 : (k === 4 ? vh * 1.15 : vh * 0.85);
    const span = k === 3 ? vh * 0.75 : (k === 4 ? vh * 0.75 : vh * 0.6);
    f += clamp((y - (tops[k] - triggerOffset)) / span);
  }
  return f;
}
function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  measure();
}
window.addEventListener('resize', resize);
resize();
if (document.fonts) document.fonts.ready.then(measure);
new ResizeObserver(measure).observe(document.body);

/* ================= DOM interactions ================= */
setupInteractions(state);

const ring = document.getElementById('holdring');
const cur = document.getElementById('cur');
const dot = document.getElementById('dot');
const SNAP = 'a,button,.svc,.member,.case,.num,.field,.note,.tok';
let snapEl = null;
const cb = { x: 0, y: 0, w: 14, h: 14 };

document.addEventListener('pointerover', e => {
  snapEl = e.target.closest(SNAP);
});
document.addEventListener('pointerleave', () => {
  snapEl = null;
});

const nav = [...document.querySelectorAll('#railnav a')];
const leaf = document.getElementById('leaf');
let lastIdx = -1;

// Per-volume hover progress for the 6 practice tomes
const volProgress = [0, 0, 0, 0, 0, 0];

/* ================= Animation loop ================= */
const clock = new THREE.Clock();

function frame() {
  const t = clock.getElapsedTime();
  const now = performance.now() / 1000;
  if (intro < 1) intro = Math.min(1, intro + clock.getDelta() * 0 + 1 / 150);

  S.mx += (M.x - S.mx) * 0.05;
  S.my += (M.y - S.my) * 0.05;
  S.f += (targetF() - S.f) * (reduce ? 1 : 0.11);
  S.hold += ((state.holding ? 1 : 0) - S.hold) * 0.07;
  S.tilt += ((state.caseHover ?? 0) - S.tilt) * 0.06;

  // Track hover progress for each of the 6 volumes in Section 3
  const inPracticeSec = Math.abs(S.f - 2) < 0.95;
  const activeHover = inPracticeSec ? (state.svcHover >= 0 ? state.svcHover : state.svcOpen) : -1;
  for (let k = 0; k < 6; k++) {
    const target = (activeHover === k) ? 1 : 0;
    volProgress[k] += (target - volProgress[k]) * (reduce ? 1 : 0.085);
  }

  const st = now - state.stampAt;
  const stamp = st < 0 || st > 1.4 ? 0 : st < 0.17 ? ease(st / 0.17) : 1 - ease(clamp((st - 0.17) / 1.1));
  const stampTint = state.filed ? Math.max(0.25, 1 - clamp((st - 0.6) / 1.2)) : 0;

  const aspect = window.innerWidth / window.innerHeight;
  const Hh = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const c = {
    W: Hh * aspect,
    H: Hh,
    mobile: window.innerWidth < 900,
    mx: S.mx,
    my: S.my,
    t,
    hold: S.hold,
    aboutHover: state.aboutHover,
    svc: state.svcHover,
    volProgress,
    mem: state.memHover,
    tilt: S.tilt,
    stamp,
    stampTint,
  };

  const fi = clamp(S.f, 0, STATES.length - 1);
  const i = Math.min(Math.floor(fi), STATES.length - 2);
  const fr = ease(fi - i);

  const A = STATES[i](c);
  const B = STATES[i + 1](c);
  const lv = (a, b) => a.map((v, j) => L(v, b[j], fr));

  const gp = lv(A.g.p, B.g.p);
  const gr = lv(A.g.r, B.g.r);
  const gk = L(A.g.k, B.g.k, fr);

  group.position.set(...gp);
  group.rotation.set(...gr);
  group.scale.setScalar(gk);

  meshes.forEach((m, k) => {
    const a = A.pcs[k];
    const b = B.pcs[k];
    const tp = lv(a.p, b.p);
    const tr = lv(a.r, b.r);
    const ts = lv(a.s, b.s);
    const tt = L(a.tint, b.tint, fr);
    const q = reduce ? 1 : 0.16;

    m.position.x += (tp[0] - m.position.x) * q;
    m.position.y += (tp[1] - m.position.y) * q;
    m.position.z += (tp[2] - m.position.z) * q;

    m.rotation.x += (tr[0] - m.rotation.x) * q;
    m.rotation.y += (tr[1] - m.rotation.y) * q;
    m.rotation.z += (tr[2] - m.rotation.z) * q;

    m.scale.x += (ts[0] - m.scale.x) * q;
    m.scale.y += (ts[1] - m.scale.y) * q;
    m.scale.z += (ts[2] - m.scale.z) * q;

    m.userData.tint += (tt - m.userData.tint) * 0.1;
    if (m.userData.sideMat) {
      m.userData.sideMat.color.copy(SILVER).lerp(BLUE, m.userData.tint);
    } else if (m.material && m.material.color) {
      m.material.color.copy(SILVER).lerp(BLUE, m.userData.tint);
    }
  });

  renderer.render(scene, camera);

  // Hero hold ring update
  if (ring) {
    ring.style.strokeDashoffset = 126 * (1 - S.hold);
  }

  // Cursor magnet tracking
  let tx = M.px - 7, ty = M.py - 7, tw = 14, th = 14;
  if (snapEl && document.contains(snapEl)) {
    const r = snapEl.getBoundingClientRect();
    if (r.width < window.innerWidth * 0.8) {
      tx = r.left - 6;
      ty = r.top - 6;
      tw = r.width + 12;
      th = r.height + 12;
    }
  }
  cb.x += (tx - cb.x) * 0.22;
  cb.y += (ty - cb.y) * 0.22;
  cb.w += (tw - cb.w) * 0.22;
  cb.h += (th - cb.h) * 0.22;

  if (cur) {
    cur.style.transform = `translate(${cb.x}px,${cb.y}px)`;
    cur.style.width = cb.w + 'px';
    cur.style.height = cb.h + 'px';
    cur.classList.toggle('snap', !!snapEl);
  }
  if (dot) {
    dot.style.transform = `translate(${M.px}px,${M.py}px)`;
  }

  // Rail navigation indicator
  const idx = Math.round(clamp(S.f, 0, STATES.length - 1));
  if (idx !== lastIdx) {
    lastIdx = idx;
    nav.forEach((a, j) => a.classList.toggle('on', j === idx));
    if (leaf) leaf.textContent = String(idx + 1).padStart(2, '0');
  }

  requestAnimationFrame(frame);
}

measure();
frame();
