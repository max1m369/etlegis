'use client';

import React, { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_dark;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    // 1. Нормализованные координаты UV
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.x *= u_resolution.x / u_resolution.y;

    // 2. Искажение координат (эффект струящегося ветра)
    float slowTime = u_time * 0.065;
    vec2 distortionUV = uv * 0.55 + vec2(slowTime, slowTime * 0.75);
    float distortionNoise = snoise(distortionUV);

    // 3. Деформация координат дыма
    vec2 deformedUV = uv + vec2(distortionNoise) * 0.075;

    // 4. Двухоктавный вихревой шум (легкие полупрозрачные клубы дыма)
    float fastTime = u_time * 0.095;
    float n1 = snoise(deformedUV * 1.35 + vec2(fastTime * 0.16, fastTime * 0.09));
    float n2 = 0.5 * snoise(deformedUV * 2.7 - vec2(fastTime * 0.12, -fastTime * 0.15));
    float n = clamp((n1 + n2) * 0.5 + 0.5, 0.0, 1.0);

    // 5. Премиальная полутоновая палитра:
    // Базовый цвет фона сайта #F7F8FA vs тёмный #0D0F12
    vec3 bgBase = mix(vec3(0.969, 0.973, 0.980), vec3(0.051, 0.059, 0.071), u_dark);
    // Легкая полутоновая дымка
    vec3 mistTone = mix(vec3(0.937, 0.949, 0.965), vec3(0.086, 0.098, 0.118), u_dark);
    // Тончайшая глубина вихрей
    vec3 accentTone = mix(vec3(0.906, 0.925, 0.949), vec3(0.125, 0.137, 0.165), u_dark);

    vec3 smokeMix = mix(mistTone, accentTone, smoothstep(0.40, 0.85, n));
    // Мягкое наложение — дымка еле заметна, создает ощущение легкого живого воздуха
    float smokeAlpha = smoothstep(0.10, 0.90, n) * 0.48;
    vec3 finalColor = mix(bgBase, smokeMix, smokeAlpha);

    // 6. Естественное рассеивание к краям
    vec2 center = vec2(0.60, 0.50);
    float d = distance(gl_FragCoord.xy / u_resolution.xy, center);
    finalColor = mix(finalColor, bgBase, smoothstep(0.40, 0.98, d) * 0.35);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function HeroBackgroundShader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof canvas.getContext !== 'function') return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext('webgl', { alpha: false, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }
    if (!gl) return;

    const createShader = (glContext: WebGLRenderingContext, type: number, source: string) => {
      const shader = glContext.createShader(type);
      if (!shader) return null;
      glContext.shaderSource(shader, source);
      glContext.compileShader(shader);
      if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
        glContext.deleteShader(shader);
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

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    const render = () => {
      if (!gl || !canvas) return;
      const currentTime = (performance.now() - startTime) * 0.001;

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(posAttr);
      gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(timeUni, currentTime);
      gl.uniform2f(resUni, canvas.width, canvas.height);
      const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
      gl.uniform1f(darkUni, isDark ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vert);
        gl.deleteShader(frag);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
