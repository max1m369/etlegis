import { clamp, L, ease } from './utils.js';
import { P, base, logo, G, scatter } from './geometry.js';

export function createStates(getIntro) {
  return [
    // §1 Home / Знак
    c => {
      let pcs = logo(c.hold);
      const intro = getIntro();
      if (intro < 1) {
        pcs = pcs.map((b, k) => {
          const e = ease(clamp(intro * 1.5 - k * 0.07));
          const s = scatter[k];
          return {
            ...b,
            p: [L(s.p[0], b.p[0], e), L(s.p[1], b.p[1], e), L(s.p[2], b.p[2], e)],
            r: [L(s.r[0], b.r[0], e), L(s.r[1], b.r[1], e), L(s.r[2], b.r[2], e)],
          };
        });
      }
      return {
        g: G(c, 0.22, 0.55, 0.08 - c.my * 0.25, -0.32 + c.mx * 0.5 + Math.sin(c.t * 0.35) * 0.06, 0, 0.92),
        pcs,
      };
    },

    // §2 О бюро / Информационная иконка (3D Info Icon «ℹ» в архитектурной рамке)
    c => {
      const hov = c.aboutHover ?? -1;
      const dotBob = Math.sin(c.t * 1.6) * 0.08;

      const pcs = [];

      // 4 внешние грани защитной рамки (обрамляют 4 принципа бюро):
      // 0: Левая грань рамки
      pcs[0] = {
        p: [-2.38, 0.2, 0],
        r: [0, 0, 0],
        s: [0.44, 3.8, 0.48],
        tint: hov === 0 ? 1 : 0.08,
      };
      // 1: Нижняя грань рамки
      pcs[1] = {
        p: [0, -2.1, 0],
        r: [0, 0, 0],
        s: [4.2, 0.44, 0.48],
        tint: hov === 1 ? 1 : 0.08,
      };
      // 2: Правая грань рамки
      pcs[2] = {
        p: [2.38, 0.2, 0],
        r: [0, 0, 0],
        s: [0.44, 3.8, 0.48],
        tint: hov === 2 ? 1 : 0.08,
      };
      // 3: Верхняя грань рамки
      pcs[3] = {
        p: [0, 2.5, 0],
        r: [0, 0, 0],
        s: [4.2, 0.44, 0.48],
        tint: hov === 3 ? 1 : 0.08,
      };

      // 4 внутренние детали буквы «i» (знак информации бюро):
      // 4: Ствол (вертикальное тело) буквы «i»
      pcs[4] = {
        p: [0, 0.1, 0.15],
        r: [0, 0, 0],
        s: [0.85, 2.1, 0.58],
        tint: hov >= 0 ? 0.35 : 0.15,
      };
      // 5: Верхняя засечка / флажок буквы «i»
      pcs[5] = {
        p: [-0.42, 0.95, 0.15],
        r: [0, 0, 0],
        s: [0.75, 0.42, 0.58],
        tint: hov >= 0 ? 0.35 : 0.15,
      };
      // 6: Парящая точка буквы «i» (сапфировый индикатор с левитацией)
      pcs[6] = {
        p: [0, 1.8 + dotBob, 0.22],
        r: [0, Math.sin(c.t * 0.9) * 0.15, 0],
        s: [0.82, 0.82, 0.65],
        tint: hov >= 0 ? 1 : 0.9,
      };
      // 7: Нижний постамент / основание буквы «i»
      pcs[7] = {
        p: [0, -1.1, 0.15],
        r: [0, 0, 0],
        s: [1.9, 0.42, 0.58],
        tint: hov >= 0 ? 0.35 : 0.15,
      };

      return {
        g: G(
          c,
          c.mobile ? 0 : 0.28,
          c.mobile ? c.H * 0.15 : -0.15,
          0.15 + c.my * 0.08,
          0.42 + c.mx * 0.18 + Math.sin(c.t * 0.25) * 0.06,
          0,
          c.mobile ? 0.52 : 0.72
        ),
        pcs,
      };
    },

    // §3 Практика / 6 Томов практики
    c => {
      const eulerFrontal = [
        1.117 - c.my * 0.12,
        0.322 - c.mx * 0.15,
        -0.575,
      ];

      return {
        g: G(c, -0.2, -1.0, 0.55 + c.my * 0.08, -0.65 + c.mx * 0.15, 0, 0.82),
        pcs: P.map((q, k) => {
          if (k >= 6) {
            // Pieces 6 & 7 are completely removed from Practice scene
            return {
              p: [0, -8, 0],
              r: [0, 0, 0],
              s: [0, 0, 0],
              tint: 0,
            };
          }

          const u = c.volProgress ? c.volProgress[k] : (c.svc === k ? 1 : 0);
          const yStack = 1.95 - k * 0.72 + Math.sin(c.t * 1.1 + k * 0.7) * 0.03;
          const sStack = [3.9 + ((k * 7) % 4) * 0.18, 0.17, 2.7 - ((k * 5) % 3) * 0.15];

          if (u <= 0.001) {
            return {
              p: [0, yStack, 0],
              r: [0, 0, 0],
              s: sStack,
              tint: 0,
            };
          }

          const pSlide = [1.7, yStack - 0.2, 0.8];
          const rSlide = [0, -0.2, 0];
          const pBottom = [1.5, -3.9, 3.4];
          const rBottom = [0.3, 0.1, 0];
          const pFrontal = [c.mobile ? 0.4 : 2.4, c.mobile ? 0.4 : 1.9, 4.8];
          const sFrontal = [3.7, 0.18, 3.6];

          if (u <= 0.35) {
            const w = ease(u / 0.35);
            return {
              p: [L(0, pSlide[0], w), L(yStack, pSlide[1], w), L(0, pSlide[2], w)],
              r: [0, L(0, rSlide[1], w), 0],
              s: sStack,
              tint: L(0, 0.2, w),
            };
          } else if (u <= 0.65) {
            const w = ease((u - 0.35) / 0.3);
            return {
              p: [L(pSlide[0], pBottom[0], w), L(pSlide[1], pBottom[1], w), L(pSlide[2], pBottom[2], w)],
              r: [L(rSlide[0], rBottom[0], w), L(rSlide[1], rBottom[1], w), 0],
              s: sStack,
              tint: L(0.2, 0.45, w),
            };
          } else {
            const w = ease((u - 0.65) / 0.35);
            return {
              p: [L(pBottom[0], pFrontal[0], w), L(pBottom[1], pFrontal[1], w), L(pBottom[2], pFrontal[2], w)],
              r: [L(rBottom[0], eulerFrontal[0], w), L(rBottom[1], eulerFrontal[1], w), L(rBottom[2], eulerFrontal[2], w)],
              s: [L(sStack[0], sFrontal[0], w), L(sStack[1], sFrontal[1], w), L(sStack[2], sFrontal[2], w)],
              tint: L(0.45, 1.0, w),
            };
          }
        }),
      };
    },

    // §4 Подход / 3 Этапа
    c => {
      return {
        g: G(c, 0.28, -0.25, 0.35 + c.my * 0.1, -0.45 + c.mx * 0.2 + Math.sin(c.t * 0.25) * 0.08, 0, 0.7),
        pcs: P.map((q, k) => {
          if (k < 3) {
            return {
              p: [-2.4 + k * 1.6, -1.8, 0.2],
              r: [0.12, 0.2, 0],
              s: [1.4, 0.38, 2.8],
              tint: 0.1,
            };
          } else if (k < 6) {
            return {
              p: [-1.6 + (k - 3) * 1.6, 0.1, 1.0],
              r: [0.18, 0.35, 0],
              s: [1.4, 0.42, 2.4],
              tint: 0.45,
            };
          } else {
            // Pieces 6 & 7 are completely removed from Approach scene
            return {
              p: [0, -8, 0],
              r: [0, 0, 0],
              s: [0, 0, 0],
              tint: 0,
            };
          }
        }),
      };
    },

    // §5 Люди / Команда (Портик правосудия)
    c => {
      const cols = [4, 5, 6, 7, 2, 3];
      return {
        g: G(c, 0.29, -0.2, 0.1 + c.my * 0.08, -0.5 + c.mx * 0.25 + Math.sin(c.t * 0.2) * 0.08, 0, 0.62),
        pcs: P.map((q, k) => {
          if (k === 0) return { p: [0, 2.3, 0], r: [0, 0, 0], s: [7.8, 0.5, 1.7], tint: 0 };
          if (k === 1) return { p: [0, -2.3, 0], r: [0, 0, 0], s: [7.8, 0.4, 2.3], tint: 0 };
          const i = cols.indexOf(k);
          const on = c.mem >= 0 && (c.mem === i || (c.mem === 0 && (i === 1 || i === 2)) || (c.mem === 1 && (i === 3 || i === 4)));
          return {
            p: [-3.1 + i * 1.24, 0, on ? 0.45 : 0],
            r: [0, on ? 0.785 : 0, 0],
            s: [0.5, 4.1, 0.5],
            tint: on ? 1 : 0,
          };
        }),
      };
    },

    // §6 Дела / Кейсы (Чаши весов)
    c => {
      const th = c.tilt + Math.sin(c.t * 0.8) * 0.025;
      const pv = [0, 2.2];
      const Lb = 3;
      const le = [pv[0] - Lb * Math.cos(th), pv[1] - Lb * Math.sin(th)];
      const re = [pv[0] + Lb * Math.cos(th), pv[1] + Lb * Math.sin(th)];
      const on = c.tilt < -0.05 ? 1 : 0;
      const pcs = [];
      pcs[0] = { p: [pv[0], pv[1], 0], r: [0, 0, th], s: [6.2, 0.14, 0.14], tint: 0 };
      pcs[4] = { p: [0, -0.2, 0], r: [0, 0, 0], s: [0.28, 4.8, 0.28], tint: 0 };
      pcs[1] = { p: [0, -2.65, 0], r: [0, 0, 0], s: [3.4, 0.22, 1.8], tint: 0 };
      pcs[6] = { p: [0, 2.2, 0], r: [0.6, 0.785 + c.t * 0.4, 0], s: [0.5, 0.5, 0.5], tint: 0 };
      pcs[2] = { p: [le[0], le[1] - 0.8, 0], r: [0, 0, 0], s: [0.05, 1.6, 0.05], tint: 0 };
      pcs[3] = { p: [re[0], re[1] - 0.8, 0], r: [0, 0, 0], s: [0.05, 1.6, 0.05], tint: on };
      pcs[5] = { p: [le[0], le[1] - 1.65, 0], r: [0, 0, 0], s: [1.8, 0.1, 1.8], tint: 0 };
      pcs[7] = { p: [re[0], re[1] - 1.65, 0], r: [0, 0, 0], s: [1.8, 0.1, 1.8], tint: on };
      return {
        g: G(c, -0.25, -0.1, 0.15 + c.my * 0.08, 0.4 + c.mx * 0.2, 0, 0.72),
        pcs,
      };
    },

    // §7 Аналитика / Блог
    c => {
      return {
        g: G(c, 0.32, -0.1, 0.25 + c.my * 0.08, -0.3 + c.mx * 0.18 + Math.sin(c.t * 0.2) * 0.05, 0, 0.75),
        pcs: P.map((q, k) => {
          const ang = (k - 3.5) * 0.22;
          const rad = 2.6;
          return {
            p: [Math.sin(ang) * rad, Math.cos(ang) * rad * 0.6 - 0.5, -k * 0.28],
            r: [0.2, ang * 0.75, -ang * 0.25],
            s: [2.4, 1.4, 0.12],
            tint: 0.15 * (k % 3),
          };
        }),
      };
    },

    // §8 Иск & Решение / Контакты
    c => {
      if (c.stamp > 0.01) {
        return {
          g: G(c, 0.33, 0.3 - c.stamp * 1.7, 0.4, 0.7 + c.mx * 0.1, 0, 0.85),
          pcs: P.map((q, k) => ({
            p: [0, 1.4 - k * 0.4 * (1 - c.stamp * 0.12), 0],
            r: [0, Math.sin(c.t * 0.5 + k * 0.35) * 0.22 * (1 - c.stamp), 0],
            s: [2.6, 0.34, 2.6],
            tint: c.stampTint,
          })),
        };
      }
      return {
        g: G(c, 0.26, 1.1, -c.my * 0.3, c.mx * 0.6 + Math.sin(c.t * 0.3) * 0.1 - 0.2, 0, 0.7),
        pcs: logo(0),
      };
    },
  ];
}
