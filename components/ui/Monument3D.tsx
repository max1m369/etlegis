'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';
import { useTheme } from '@/components/providers/ThemeProvider';

interface Monument3DProps {
  className?: string;
  showBust?: boolean;
  showFragments?: boolean;
}

export default function Monument3D({
  className = '',
  showBust = true,
  showFragments = true,
}: Monument3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let destroyed = false;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let animationFrameId: number;
    let markMesh: THREE.Mesh | null = null;
    let presets: { stone: THREE.Material; dark: THREE.Material; bronze: THREE.Material } | null = null;
    const floats: { object: THREE.Object3D; y: number; rotation: THREE.Euler; phase: number }[] = [];
    const busts: THREE.Object3D[] = [];
    let environmentTexture: THREE.Texture | null = null;

    const targetPos = { x: 0, y: 0 };
    const currentPos = { x: 0, y: 0 };

    async function initScene() {
      if (!container) return;

      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        });
      } catch (e) {
        console.warn('WebGL not available for 3D monument:', e);
        setIsFallback(true);
        return;
      }

      if (!renderer) return;

      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2);
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.VSMShadowMap;

      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(32, 1, 0.1, 150);
      const lookAt = new THREE.Vector3(0, 2.2, 0);
      const baseCamera = new THREE.Vector3(6.3, 1.65, 14);

      // Load 3D Monument GLB and Studio HDR Environment
      try {
        const gltfLoader = new GLTFLoader();
        const hdrLoader = new HDRLoader();

        const [gltf, hdr] = await Promise.all([
          gltfLoader.loadAsync('/monument.glb'),
          hdrLoader.loadAsync('/assets/studio.hdr'),
        ]);

        if (destroyed || !scene || !renderer) return;

        const pmrem = new THREE.PMREMGenerator(renderer);
        const env = pmrem.fromEquirectangular(hdr);
        hdr.dispose();
        pmrem.dispose();
        environmentTexture = env.texture;
        scene.environment = environmentTexture;
        scene.environmentIntensity = 0.55;

        const root = gltf.scene;
        scene.add(root);

        // Lighting matching the Blender studio setup
        scene.add(new THREE.HemisphereLight(0xf9f4e8, 0x9c9480, 0.65));

        const key = new THREE.DirectionalLight(0xffedd2, 3.2);
        key.position.set(-3.5, 11, 5);
        key.castShadow = true;
        key.shadow.mapSize.set(1024, 1024);
        Object.assign(key.shadow.camera, {
          left: -7,
          right: 7,
          top: 8,
          bottom: -5,
          near: 1,
          far: 30,
        });
        key.shadow.normalBias = 0.018;
        key.shadow.bias = -0.00015;
        key.shadow.radius = 12;
        key.shadow.blurSamples = 16;
        key.target.position.set(0, 1.5, 0);
        scene.add(key, key.target);

        const fill = new THREE.DirectionalLight(0xe4edff, 0.9);
        fill.position.set(6, 4, 1);
        scene.add(fill);

        const rim = new THREE.DirectionalLight(0xffedd4, 2.0);
        rim.position.set(2, 6, -5);
        scene.add(rim);

        // Traverse objects and configure materials
        let baseMaterial: THREE.MeshStandardMaterial | null = null;
        root.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.castShadow = true;
          object.receiveShadow = true;
          if (object.material && 'envMapIntensity' in object.material) {
            object.material.envMapIntensity = 0.8;
          }

          if (object.name.startsWith('Float_')) {
            floats.push({
              object,
              y: object.position.y,
              rotation: object.rotation.clone(),
              phase: floats.length * 2.2,
            });
            object.visible = showFragments && typeof window !== 'undefined' && window.innerWidth > 768;
          }

          if (object.name.startsWith('Bust_')) {
            busts.push(object);
            object.visible = showBust;
          }

          if (object.name === 'Monument_Mark') {
            markMesh = object;
            baseMaterial = object.material as THREE.MeshStandardMaterial;
            if (baseMaterial) {
              baseMaterial.roughness = 0.65;
              if (baseMaterial.normalScale) {
                baseMaterial.normalScale.set(0.23, 0.23);
              }
            }
          }

          if (object.name === 'Gallery_Ground') {
            object.castShadow = false;
            object.material = new THREE.ShadowMaterial({
              color: 0x5f5948,
              opacity: 0.23,
            });
          }

          if (object.material && 'map' in object.material && object.material.map) {
            object.material.map.anisotropy = Math.min(
              renderer?.capabilities.getMaxAnisotropy() || 8,
              8
            );
          }
        });

        const markMaterial = markMesh ? (markMesh.material as THREE.MeshStandardMaterial) : null;
        if (markMesh && markMaterial) {
          const darkMat = markMaterial.clone();
          darkMat.color.set(0x343b38);
          darkMat.roughness = 0.38;
          darkMat.metalness = 0.12;

          const bronzeMat = new THREE.MeshPhysicalMaterial({
            color: 0xa58b56,
            metalness: 0.87,
            roughness: 0.29,
            clearcoat: 0.22,
            envMapIntensity: 1.1,
          });

          presets = {
            stone: markMaterial,
            dark: darkMat,
            bronze: bronzeMat,
          };

          // Apply initial theme material
          if (themeRef.current === 'dark') {
            markMesh.material = presets.dark;
          } else {
            markMesh.material = presets.stone;
          }
        }

        setIsLoaded(true);

        // Viewport resize handling with viewOffset to place monument on the right
        let currentW = 0;
        let currentH = 0;

        const updateProjection = () => {
          if (!container || !renderer || !camera) return;
          const w = container.clientWidth;
          const h = container.clientHeight;
          if (!w || !h) return;

          if (w !== currentW || h !== currentH) {
            currentW = w;
            currentH = h;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
          }

          const isDesktop = w > 768;
          camera.clearViewOffset();

          if (isDesktop) {
            camera.zoom = 1.08;
            // Shift view offset so the 3D monument sits on the right side of the screen
            camera.setViewOffset(w, h, -w * 0.21, 0, w, h);
          } else {
            camera.zoom = 1.0;
            camera.setViewOffset(w, h, 0, 0, w, h);
          }
          camera.updateProjectionMatrix();

          if (showFragments) {
            for (const item of floats) {
              item.object.visible = isDesktop;
            }
          }
        };

        updateProjection();
        const resizeObserver = new ResizeObserver(() => updateProjection());
        resizeObserver.observe(container);

        // Pointer mouse parallax
        const handlePointerMove = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          if (rect.width <= 0 || rect.height <= 0) return;
          targetPos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          targetPos.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        };

        const handlePointerLeave = () => {
          targetPos.x = 0;
          targetPos.y = 0;
        };

        window.addEventListener('mousemove', handlePointerMove, { passive: true });
        window.addEventListener('mouseleave', handlePointerLeave, { passive: true });

        // Animation render loop
        let lastTime = performance.now();
        let elapsed = 0;

        const renderLoop = (now: number) => {
          if (destroyed) return;

          const deltaMs = now - lastTime;
          lastTime = now;
          const delta = Math.min(deltaMs * 0.001, 0.05);

          if (document.visibilityState === 'visible' && renderer && scene && camera) {
            // Smooth mouse dampening
            const alpha = 1 - Math.exp(-deltaMs / 220);
            currentPos.x += (targetPos.x - currentPos.x) * alpha;
            currentPos.y += (targetPos.y - currentPos.y) * alpha;

            // Camera tilt
            const isDesktop = window.innerWidth > 768;
            camera.position.copy(baseCamera);
            camera.position.x += currentPos.x * 0.38;
            camera.position.y += currentPos.y * 0.12;
            camera.lookAt(lookAt);

            // Floating fragments animation (if enabled)
            if (showFragments && floats.length > 0) {
              elapsed += delta;
              for (const item of floats) {
                item.object.position.y =
                  item.y +
                  Math.sin(elapsed * 0.42 + item.phase) * 0.12 +
                  0.8 * Math.exp(-elapsed * 1.8);
                item.object.rotation.z =
                  item.rotation.z + Math.sin(elapsed * 0.27 + item.phase) * 0.045;
                item.object.rotation.y =
                  item.rotation.y + Math.sin(elapsed * 0.32 + item.phase) * 0.065;
              }
            }

            // Sync material if theme changes
            if (markMesh && presets) {
              const isDark =
                themeRef.current === 'dark' ||
                document.documentElement.classList.contains('dark');
              const targetMat = isDark ? presets.dark : presets.stone;
              if (markMesh.material !== targetMat) {
                markMesh.material = targetMat;
              }
            }

            renderer.render(scene, camera);
          }

          animationFrameId = requestAnimationFrame(renderLoop);
        };

        animationFrameId = requestAnimationFrame(renderLoop);

        // WebGL context lost handler
        renderer.domElement.addEventListener(
          'webglcontextlost',
          (event) => {
            event.preventDefault();
            setIsFallback(true);
          },
          { once: true }
        );

        return () => {
          resizeObserver.disconnect();
          window.removeEventListener('mousemove', handlePointerMove);
          window.removeEventListener('mouseleave', handlePointerLeave);
        };
      } catch (err) {
        console.error('Error loading 3D monument model:', err);
        setIsFallback(true);
      }
    }

    const cleanupPromise = initScene();

    return () => {
      destroyed = true;
      cancelAnimationFrame(animationFrameId);
      cleanupPromise.then((cleanup) => {
        if (typeof cleanup === 'function') cleanup();
      });
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
      if (environmentTexture) {
        environmentTexture.dispose();
      }
    };
  }, [showBust, showFragments]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Fallback image when 3D is still loading or WebGL is lost */}
      <img
        src="/monument-render.png"
        alt="ETLEGIS 3D Monument"
        className={`absolute right-0 top-0 w-full lg:w-[62%] h-full object-contain pointer-events-none transition-opacity duration-700 ${
          isLoaded && !isFallback ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
}
