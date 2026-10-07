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
  centered?: boolean;
  viewOffsetX?: number;
  viewOffsetY?: number;
  zoom?: number;
}

export default function Monument3D({
  className = '',
  showBust = true,
  showFragments = true,
  centered = false,
  viewOffsetX,
  viewOffsetY,
  zoom,
}: Monument3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const container = containerRef.current;
    const canvasHost = canvasHostRef.current;
    if (!container || !canvasHost) return;

    let destroyed = false;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let animationFrameId: number;
    let markMesh: THREE.Mesh | null = null;
    let monumentRoot: THREE.Group | null = null;
    let presets: { stone: THREE.Material; dark: THREE.Material; bronze: THREE.Material } | null = null;
    const floats: { object: THREE.Object3D; y: number; rotation: THREE.Euler; phase: number }[] = [];
    const busts: THREE.Object3D[] = [];
    let environmentTexture: THREE.Texture | null = null;

    const targetPos = { x: 0, y: 0 };
    const currentPos = { x: 0, y: 0 };

    async function initScene() {
      if (!container || !canvasHost) return;

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

      const isMobile = window.innerWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.25);
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';
      canvasHost.innerHTML = '';
      canvasHost.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(32, 1, 0.1, 150);
      const lookAt = new THREE.Vector3(0, 2.2, 0);
      const baseCamera = new THREE.Vector3(6.3, 1.65, 14);

      // Load 3D Monument GLB and Studio HDR Environment
      try {
        const gltfLoader = new GLTFLoader();
        const hdrLoader = new HDRLoader();
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

        const [gltf, hdr] = await Promise.all([
          gltfLoader.loadAsync(`${basePath}/monument.glb`),
          hdrLoader.loadAsync(`${basePath}/assets/studio.hdr`),
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
        monumentRoot = root;
        scene.add(root);

        // Lighting matching the Blender studio setup
        scene.add(new THREE.HemisphereLight(0xf9f4e8, 0x9c9480, 0.65));

        const key = new THREE.DirectionalLight(0xffedd2, 3.2);
        key.position.set(-3.5, 11, 5);
        key.castShadow = true;
        key.shadow.mapSize.set(isMobile ? 512 : 1024, isMobile ? 512 : 1024);
        Object.assign(key.shadow.camera, {
          left: -7,
          right: 7,
          top: 8,
          bottom: -5,
          near: 1,
          far: 30,
        });
        key.shadow.normalBias = 0.02;
        key.shadow.bias = -0.0002;
        key.shadow.radius = 2.5;
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

          // Floating pieces removed as requested by user
          if (object.name.startsWith('Float_')) {
            object.visible = false;
            return;
          }

          // Bronze underlay / reveal removed as requested by user ("бронзовая подложка вон там")
          if (
            object.name === 'Monument_Bronze_Reveal' ||
            object.name.includes('Bronze_Reveal') ||
            object.name === 'Bust_Plinth_Reveal'
          ) {
            object.visible = false;
            object.castShadow = false;
            object.receiveShadow = false;
            return;
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

        // Viewport resize handling with viewOffset to place monument
        let currentW = 0;
        let currentH = 0;
        let needsRender = true;
        let isIntersecting = true;
        let isTabActive = document.visibilityState === 'visible';

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

          const targetZoom = zoom !== undefined ? zoom : (isDesktop ? 0.90 : 0.85);
          camera.zoom = targetZoom;

          const offsetX = viewOffsetX !== undefined ? -w * viewOffsetX : (centered ? 0 : (isDesktop ? -w * 0.20 : 0));
          const offsetY = viewOffsetY !== undefined ? -h * viewOffsetY : 0;

          if (offsetX !== 0 || offsetY !== 0) {
            camera.setViewOffset(w, h, offsetX, offsetY, w, h);
          } else {
            camera.clearViewOffset();
          }
          camera.updateProjectionMatrix();

          if (showFragments) {
            for (const item of floats) {
              item.object.visible = isDesktop;
            }
          }
          needsRender = true;
        };

        updateProjection();
        const resizeObserver = new ResizeObserver(() => updateProjection());
        resizeObserver.observe(container);

        // IntersectionObserver to pause rendering when scrolled out of view
        const intersectionObserver = new IntersectionObserver(
          (entries) => {
            if (entries[0]) {
              isIntersecting = entries[0].isIntersecting;
              if (isIntersecting) {
                needsRender = true;
              }
            }
          },
          { threshold: 0.05 }
        );
        intersectionObserver.observe(container);

        const handleVisibilityChange = () => {
          isTabActive = document.visibilityState === 'visible';
          if (isTabActive && isIntersecting) {
            needsRender = true;
          }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Pointer mouse parallax
        const handlePointerMove = (e: MouseEvent) => {
          if (!isIntersecting || !isTabActive) return;
          const rect = container.getBoundingClientRect();
          if (rect.width <= 0 || rect.height <= 0) return;
          targetPos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          targetPos.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
          needsRender = true;
        };

        const handlePointerLeave = () => {
          targetPos.x = 0;
          targetPos.y = 0;
          needsRender = true;
        };

        window.addEventListener('mousemove', handlePointerMove, { passive: true });
        window.addEventListener('mouseleave', handlePointerLeave, { passive: true });

        // Animation render loop with on-demand dirty-checking & 60 FPS cap
        let lastTime = performance.now();
        let lastRenderTime = 0;
        const TARGET_FPS = 60;
        const FRAME_INTERVAL = 1000 / TARGET_FPS;

        const renderLoop = (now: number) => {
          if (destroyed) return;
          animationFrameId = requestAnimationFrame(renderLoop);

          // 1. If tab is in background or Hero is scrolled out of view, sleep completely
          if (!isIntersecting || !isTabActive || !renderer || !scene || !camera) {
            return;
          }

          // 2. Throttle rendering to max 60 FPS (prevents 144Hz/240Hz monitors from overworking GPU)
          const elapsedSinceLast = now - lastRenderTime;
          if (elapsedSinceLast < FRAME_INTERVAL) {
            return;
          }

          const deltaMs = now - lastTime;
          lastTime = now;

          // 3. Smooth horizontal mouse dampening (strictly left-right)
          const alpha = 1 - Math.exp(-Math.min(deltaMs, 100) / 180);
          const diffX = targetPos.x - currentPos.x;

          if (Math.abs(diffX) > 0.0001) {
            currentPos.x += diffX * alpha;
            needsRender = true;
          } else if (currentPos.x !== targetPos.x) {
            currentPos.x = targetPos.x;
            needsRender = true;
          }

          // 4. Sync material if theme changes
          if (markMesh && presets) {
            const isDark =
              themeRef.current === 'dark' ||
              document.documentElement.classList.contains('dark');
            const targetMat = isDark ? presets.dark : presets.stone;
            if (markMesh.material !== targetMat) {
              markMesh.material = targetMat;
              needsRender = true;
            }
          }

          // 5. ON-DEMAND RENDERING: If scene has not changed and motion settled, SKIP RENDER (0% GPU!)
          if (!needsRender) {
            return;
          }

          lastRenderTime = now - (elapsedSinceLast % FRAME_INTERVAL);

          // Direct 3D monument mark rotation with mouse movement: strictly horizontal (Y axis)
          if (monumentRoot) {
            monumentRoot.rotation.y = currentPos.x * 0.14;
            monumentRoot.rotation.x = 0;
            monumentRoot.rotation.z = 0;
          }

          // Camera horizontal parallax only (strictly no vertical movement)
          camera.position.copy(baseCamera);
          camera.position.x += currentPos.x * 0.40;
          camera.lookAt(lookAt);

          renderer.render(scene, camera);

          // Once motion reaches target and state is current, enter idle state until next event
          if (Math.abs(targetPos.x - currentPos.x) <= 0.0001) {
            needsRender = false;
          }
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
          intersectionObserver.disconnect();
          document.removeEventListener('visibilitychange', handleVisibilityChange);
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
  }, [showBust, showFragments, centered, viewOffsetX, viewOffsetY, zoom]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        ref={canvasHostRef}
        className={`w-full h-full transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
