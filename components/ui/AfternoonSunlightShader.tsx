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

    // Ray scale: tight across ray, stretched along ray
    float crossScale = 3.6;
    float alongScale = 0.38;

    vec2 rayCoord = vec2(
      dot(p, norm) * crossScale,
      dot(p, dir) * alongScale
    );

    float t = u_time * 0.16;

    // Directional linear blur integration with chromatic dispersion
    const int SAMPLES = 20;
    float blurLength = 0.95;
    float chromaOffset = 0.055;

    float rAcc = 0.0;
    float gAcc = 0.0;
    float bAcc = 0.0;
    float totalWeight = 0.0;

    for (int i = 0; i < SAMPLES; i++) {
      float step = (float(i) / float(SAMPLES - 1) - 0.5) * blurLength;
      float weight = exp(-step * step * 4.5);
      totalWeight += weight;

      // Red channel offset slightly along normal (warm amber fringe)
      vec2 rCoord = rayCoord + vec2(-chromaOffset, step);
      rAcc += causticNoise(rCoord, t) * weight;

      // Green channel centered
      vec2 gCoord = rayCoord + vec2(0.0, step);
      gAcc += causticNoise(gCoord, t) * weight;

      // Blue channel offset opposite along normal (cool sky/violet fringe)
      vec2 bCoord = rayCoord + vec2(chromaOffset, step);
      bAcc += causticNoise(bCoord, t) * weight;
    }

    rAcc /= totalWeight;
    gAcc /= totalWeight;
    bAcc /= totalWeight;

    // Contrast shaping
    rAcc = smoothstep(0.12, 0.68, rAcc);
    gAcc = smoothstep(0.12, 0.68, gAcc);
    bAcc = smoothstep(0.12, 0.68, bAcc);

    // Window mask: smooth soft bloom from right/top-right, keeping left readable
    float windowMask = smoothstep(0.20, 0.96, uv.x * 0.78 + uv.y * 0.52);

    // Color palettes
    // Light theme:
    vec3 bgBaseLight = vec3(0.972, 0.975, 0.980); // #F8F9FA
    vec3 shadowLight = vec3(0.72, 0.70, 0.70);    // #a69f9f
    vec3 highlightLight = vec3(1.0, 0.988, 0.965); // #fcf8f0
    vec3 warmFringeLight = vec3(1.06, 0.94, 0.82);
    vec3 coolFringeLight = vec3(0.88, 0.95, 1.05);

    // Dark theme:
    vec3 bgBaseDark = vec3(0.051, 0.059, 0.071);  // #0D0F12
    vec3 shadowDark = vec3(0.09, 0.08, 0.07);
    vec3 highlightDark = vec3(0.77, 0.66, 0.50);  // ET LEGIS #C5A880 warm bronze
    vec3 warmFringeDark = vec3(1.15, 0.92, 0.68);
    vec3 coolFringeDark = vec3(0.65, 0.82, 1.12);

    vec3 bgBase = mix(bgBaseLight, bgBaseDark, u_dark);
    vec3 shadow = mix(shadowLight, shadowDark, u_dark);
    vec3 highlight = mix(highlightLight, highlightDark, u_dark);
    vec3 wFringe = mix(warmFringeLight, warmFringeDark, u_dark);
    vec3 cFringe = mix(coolFringeLight, coolFringeDark, u_dark);

    vec3 rayColor = vec3(
      mix(shadow.r, highlight.r * wFringe.r, rAcc),
      mix(shadow.g, highlight.g, gAcc),
      mix(shadow.b, highlight.b * cFringe.b, bAcc)
    );

    // Seamless bottom fade so light beams dissolve naturally into the following section
    float bottomFade = smoothstep(0.0, 0.16, uv.y);
    float rayAlpha = mix(0.58, 0.32, u_dark) * windowMask * bottomFade;
    vec3 finalColor = mix(bgBase, rayColor, rayAlpha);

    // Subtle edge vignette
    float edgeVignette = 1.0 - 0.06 * dot(uv - 0.5, uv - 0.5);
    finalColor *= edgeVignette;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

interface AfternoonSunlightShaderProps {
  className?: string;
  fixed?: boolean;
}

export default function AfternoonSunlightShader({
  className = '',
  fixed = false,
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
        alpha: false,
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

    let animationFrameId: number;
    const startTime = performance.now();
    let currentDark = themeRef.current === 'dark' ? 1.0 : 0.0;
    let targetDark = currentDark;
    let isVisible = true;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = Math.max(width, 320) * dpr;
      canvas.height = Math.max(height, 320) * dpr;
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

    // Optional observer to pause when scrolled far out of view
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

    const render = () => {
      if (isVisible && gl && canvas) {
        const currentTime = (performance.now() - startTime) * 0.001;

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

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

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

  const positionClasses = fixed
    ? 'fixed inset-0 pointer-events-none select-none -z-10 overflow-hidden'
    : 'absolute inset-0 pointer-events-none select-none z-0 overflow-hidden';

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
