'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';

const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_dark;
  uniform float u_overlay;

  // 2D Hash function
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453123);
  }

  // Worley Noise: F2 - F1 with Euclidean metric
  float worleyF2MinusF1(vec2 p, float jitter) {
    vec2 n = floor(p);
    vec2 f = fract(p);
    float f1 = 8.0;
    float f2 = 8.0;

    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec2 g = vec2(float(i), float(j));
        vec2 o = hash2(n + g);
        o = 0.5 + jitter * (o - 0.5);
        vec2 r = g - f + o;
        float d = dot(r, r);
        if (d < f1) {
          f2 = f1;
          f1 = d;
        } else if (d < f2) {
          f2 = d;
        }
      }
    }
    return sqrt(f2) - sqrt(f1);
  }

  // Caustic noise field with organic breathing motion
  float causticNoise(vec2 p, float time) {
    vec2 drift1 = vec2(time * 0.018, time * 0.012);
    vec2 drift2 = vec2(-time * 0.014, time * 0.022);

    p.x += sin(p.y * 1.6 + time * 0.3) * 0.09;
    p.y += cos(p.x * 1.4 - time * 0.25) * 0.07;

    float w1 = worleyF2MinusF1(p + drift1, 0.88);
    float w2 = worleyF2MinusF1(p * 2.1 + drift2, 0.75) * 0.45;
    return (w1 + w2) / 1.45;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = uv;
    p.x *= aspect;

    // Angle: diagonal sunbeams from top-right down and left (~135° screen space)
    float angle = -1.02;
    vec2 dir = vec2(cos(angle), sin(angle));
    vec2 norm = vec2(-dir.y, dir.x);

    // Ray scale: exactly ~2 wide soft waves across the entire screen
    float crossScale = 0.48;
    float alongScale = 0.15;

    vec2 rayCoord = vec2(
      dot(p, norm) * crossScale,
      dot(p, dir) * alongScale
    );

    float t = u_time * 0.07;

    // Directional linear blur integration with chromatic dispersion (8 samples optimized for smooth diffuse light)
    const int SAMPLES = 8;
    float blurLength = 1.15;
    float chromaOffset = 0.08;

    float rAcc = 0.0;
    float gAcc = 0.0;
    float bAcc = 0.0;
    float totalWeight = 0.0;

    for (int i = 0; i < SAMPLES; i++) {
      float step = (float(i) / float(SAMPLES - 1) - 0.5) * blurLength;
      float weight = exp(-step * step * 3.8);
      totalWeight += weight;

      // Red channel offset (warm amber / peach)
      vec2 rCoord = rayCoord + vec2(-chromaOffset, step);
      rAcc += causticNoise(rCoord, t) * weight;

      // Green channel centered (golden sunshine)
      vec2 gCoord = rayCoord + vec2(0.0, step);
      gAcc += causticNoise(gCoord, t) * weight;

      // Blue channel offset (cool cyan / violet prism)
      vec2 bCoord = rayCoord + vec2(chromaOffset, step);
      bAcc += causticNoise(bCoord, t) * weight;
    }

    rAcc /= totalWeight;
    gAcc /= totalWeight;
    bAcc /= totalWeight;

    // Raw integrated channels
    float rawR = rAcc;
    float rawG = gAcc;
    float rawB = bAcc;
    float rawLuma = (rawR + rawG + rawB) * 0.3333;

    // Window mask: soft diagonal beam from top-right down across scene
    float windowMask = smoothstep(0.06, 0.94, uv.x * 0.75 + uv.y * 0.55);

    // Seamless bottom fade
    float bottomFade = smoothstep(0.0, 0.15, uv.y);

    if (u_overlay > 0.5) {
      // Warm 400-600W incandescent golden-amber sunlight with subtle dust motes (no rainbow)
      // Exactly ~2 wide, delicate waves that gently glide across the 3D monument
      float wave = smoothstep(0.14, 0.40, rawLuma);

      // Warm 400-600W golden-amber tone (rich golden honey / amber glow)
      vec3 warmAmberLight = vec3(0.95, 0.76, 0.44);  // Warm 400-600W golden amber
      vec3 warmCreamLight = vec3(1.0, 0.92, 0.72);   // Luminous pastel gold
      vec3 warmSunLight = mix(warmAmberLight, warmCreamLight, smoothstep(0.16, 0.42, rawLuma));

      vec3 warmAmberDark = vec3(0.92, 0.74, 0.46);    // ET LEGIS architectural bronze-gold
      vec3 warmCreamDark = vec3(1.0, 0.88, 0.65);
      vec3 warmSunDark = mix(warmAmberDark, warmCreamDark, smoothstep(0.16, 0.42, rawLuma));

      vec3 warmSun = mix(warmSunLight, warmSunDark, u_dark);

      // Very subtle floating golden dust micro-texture
      vec2 dustCoord = uv * u_resolution.xy * 0.35 + vec2(sin(u_time * 0.12) * 5.0, u_time * 0.7);
      float dustNoise = fract(sin(dot(dustCoord, vec2(12.9898, 78.233))) * 43758.5453);
      float dust = (dustNoise - 0.5) * 0.065;

      vec3 overlayColor = warmSun * (1.0 + dust);

      // Clear, warm, soft presence across the 3D monument and room (zero gray shadows)
      float overlayAlpha = wave * windowMask * bottomFade * mix(0.30, 0.38, u_dark);
      gl_FragColor = vec4(overlayColor, overlayAlpha);
    } else {
      // Background mode
      float rAccS = smoothstep(0.18, 0.70, rawR);
      float gAccS = smoothstep(0.18, 0.70, rawG);
      float bAccS = smoothstep(0.18, 0.70, rawB);

      // Color palettes
      // Light theme:
      vec3 bgBaseLight = vec3(0.972, 0.975, 0.980);
      vec3 shadowLight = vec3(0.72, 0.70, 0.70);
      vec3 highlightLight = vec3(1.0, 0.988, 0.965);
      vec3 warmFringeLight = vec3(1.06, 0.94, 0.82);
      vec3 coolFringeLight = vec3(0.88, 0.95, 1.05);

      // Dark theme:
      vec3 bgBaseDark = vec3(0.051, 0.059, 0.071);
      vec3 shadowDark = vec3(0.09, 0.08, 0.07);
      vec3 highlightDark = vec3(0.77, 0.66, 0.50);
      vec3 warmFringeDark = vec3(1.15, 0.92, 0.68);
      vec3 coolFringeDark = vec3(0.65, 0.82, 1.12);

      vec3 bgBase = mix(bgBaseLight, bgBaseDark, u_dark);
      vec3 shadow = mix(shadowLight, shadowDark, u_dark);
      vec3 highlight = mix(highlightLight, highlightDark, u_dark);
      vec3 wFringe = mix(warmFringeLight, warmFringeDark, u_dark);
      vec3 cFringe = mix(coolFringeLight, coolFringeDark, u_dark);

      vec3 rayColor = vec3(
        mix(shadow.r, highlight.r * wFringe.r, rAccS),
        mix(shadow.g, highlight.g, gAccS),
        mix(shadow.b, highlight.b * cFringe.b, bAccS)
      );

      float rayAlpha = mix(0.58, 0.32, u_dark) * windowMask * bottomFade;
      vec3 finalColor = mix(bgBase, rayColor, rayAlpha);
      float edgeVignette = 1.0 - 0.06 * dot(uv - 0.5, uv - 0.5);
      finalColor *= edgeVignette;
      gl_FragColor = vec4(finalColor, 1.0);
    }
  }
`;

interface AfternoonSunlightShaderProps {
  className?: string;
  fixed?: boolean;
  overlay?: boolean;
}

export default function AfternoonSunlightShader({
  className = '',
  fixed = false,
  overlay = false,
}: AfternoonSunlightShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof canvas.getContext !== 'function') return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext('webgl', {
        alpha: overlay,
        premultipliedAlpha: false,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }
    if (!gl) return;

    const createShader = (glCtx: WebGLRenderingContext, type: number, src: string) => {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, src);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vert = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const frag = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'position');
    const timeUni = gl.getUniformLocation(program, 'u_time');
    const resUni = gl.getUniformLocation(program, 'u_resolution');
    const darkUni = gl.getUniformLocation(program, 'u_dark');
    const overlayUni = gl.getUniformLocation(program, 'u_overlay');

    let animationFrameId: number;
    const startTime = performance.now();
    let currentDark = themeRef.current === 'dark' ? 1.0 : 0.0;
    let targetDark = currentDark;
    let isVisible = true;

    const handleResize = () => {
      if (!canvas) return;
      const isMobile = window.innerWidth < 768;
      // Sunlight is a soft diffuse volumetric beam; rendering at internal 0.75x (desktop) / 0.6x (mobile)
      // with CSS object-cover bilinear filtering produces softer, more organic light with ~75% lower GPU cost
      const scale = isMobile ? 0.6 : 0.75;
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = Math.max(Math.floor(Math.min(width * scale, 1280)), 320);
      canvas.height = Math.max(Math.floor(Math.min(height * scale, 800)), 240);
      if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Pause when tab is inactive to preserve battery and GPU
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Pause when scrolled far out of view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isVisible = entries[0].isIntersecting && document.visibilityState === 'visible';
        }
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    let lastRenderTime = 0;
    const TARGET_FPS = 30; // 30 FPS cap for atmospheric slow light drift
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible || !gl || !canvas) return;

      const elapsed = now - lastRenderTime;
      if (elapsed < FRAME_INTERVAL) return;
      lastRenderTime = now - (elapsed % FRAME_INTERVAL);

      const currentTime = (now - startTime) * 0.001;

      // Smooth transition when theme changes
      targetDark = themeRef.current === 'dark' || document.documentElement.classList.contains('dark') ? 1.0 : 0.0;
      currentDark += (targetDark - currentDark) * 0.08;

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(posAttr);
      gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(timeUni, currentTime);
      gl.uniform2f(resUni, canvas.width, canvas.height);
      gl.uniform1f(darkUni, currentDark);
      gl.uniform1f(overlayUni, overlay ? 1.0 : 0.0);
      if (overlay) {
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vert);
        gl.deleteShader(frag);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, []);

  const defaultZ = className.includes('z-') ? '' : 'z-0';
  const positionClasses = fixed
    ? 'fixed inset-0 pointer-events-none select-none -z-10 overflow-hidden'
    : `absolute inset-0 pointer-events-none select-none ${defaultZ} overflow-hidden`;

  return (
    <div
      ref={containerRef}
      className={`${positionClasses} ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
