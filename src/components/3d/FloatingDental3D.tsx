import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCw, Shield, Cpu } from 'lucide-react';

export const FloatingDental3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeModel, setActiveModel] = useState<'tooth' | 'implant' | 'aligner'>('tooth');
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    currentMount.innerHTML = '';
    currentMount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x0EA5E9, 3.5);
    mainLight.position.set(5, 8, 5);
    scene.add(mainLight);

    const secondaryLight = new THREE.DirectionalLight(0x06B6D4, 2.5);
    secondaryLight.position.set(-5, -5, -3);
    scene.add(secondaryLight);

    const rimLight = new THREE.PointLight(0x2563EB, 4, 15);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);

    // Group for all dental objects
    const dentalGroup = new THREE.Group();
    scene.add(dentalGroup);

    // Material definitions (Apple/Tesla inspired sleek ceramic & cyan glow)
    const ceramicMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.12,
      metalness: 0.05,
      transmission: 0.25,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
    });

    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0xa1a1aa,
      roughness: 0.35,
      metalness: 0.9,
    });

    const cyanGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const alignerMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      roughness: 0.1,
      metalness: 0.0,
      transmission: 0.85,
      opacity: 0.75,
      transparent: true,
      ior: 1.45,
    });

    // Create Models according to mode
    if (activeModel === 'tooth') {
      // Build a realistic sculpted tooth using combined primitives
      const crownGeo = new THREE.SphereGeometry(1.2, 32, 32);
      // Deform sphere slightly into molar/incisor crown shape
      const pos = crownGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let y = pos.getY(i);
        let x = pos.getX(i);
        let z = pos.getZ(i);
        if (y > 0) {
          // Flatten top slightly and create cusps
          y = y * 0.75 + Math.sin(x * 3) * 0.12 + Math.cos(z * 3) * 0.12;
        } else {
          // Taper down toward roots
          const factor = 1 + (y * 0.25);
          x *= factor;
          z *= factor;
        }
        pos.setXYZ(i, x, y, z);
      }
      crownGeo.computeVertexNormals();

      const crown = new THREE.Mesh(crownGeo, ceramicMaterial);
      crown.position.y = 0.5;
      dentalGroup.add(crown);

      // Roots (2 prongs)
      const rootGeo = new THREE.ConeGeometry(0.48, 1.8, 24);
      const root1 = new THREE.Mesh(rootGeo, ceramicMaterial);
      root1.position.set(-0.45, -1.0, 0);
      root1.rotation.z = 0.15;
      dentalGroup.add(root1);

      const root2 = new THREE.Mesh(rootGeo, ceramicMaterial);
      root2.position.set(0.45, -1.0, 0);
      root2.rotation.z = -0.15;
      dentalGroup.add(root2);

      // Cyan diagnostic hologram ring around tooth
      const ringGeo = new THREE.TorusGeometry(1.8, 0.02, 16, 100);
      const ring = new THREE.Mesh(ringGeo, cyanGlowMaterial);
      ring.rotation.x = Math.PI / 2 + 0.3;
      dentalGroup.add(ring);
    } else if (activeModel === 'implant') {
      // Titanium threaded screw base
      const screwGeo = new THREE.CylinderGeometry(0.5, 0.4, 2.2, 32);
      const screw = new THREE.Mesh(screwGeo, titaniumMaterial);
      screw.position.y = -0.8;
      dentalGroup.add(screw);

      // Threads rings
      for (let i = 0; i < 5; i++) {
        const threadGeo = new THREE.TorusGeometry(0.52, 0.06, 12, 32);
        const thread = new THREE.Mesh(threadGeo, titaniumMaterial);
        thread.rotation.x = Math.PI / 2;
        thread.position.y = -1.6 + (i * 0.35);
        dentalGroup.add(thread);
      }

      // Zirconia Crown on top
      const crownTopGeo = new THREE.SphereGeometry(0.9, 32, 32);
      crownTopGeo.scale(1, 1.2, 0.9);
      const crownTop = new THREE.Mesh(crownTopGeo, ceramicMaterial);
      crownTop.position.y = 0.9;
      dentalGroup.add(crownTop);

      // Holographic medical bracket
      const bracketGeo = new THREE.BoxGeometry(2.4, 2.4, 2.4);
      const bracket = new THREE.Mesh(bracketGeo, cyanGlowMaterial);
      dentalGroup.add(bracket);
    } else if (activeModel === 'aligner') {
      // Clear aligner arch geometry
      const archGeo = new THREE.TorusGeometry(1.6, 0.5, 24, 48, Math.PI * 1.2);
      const arch = new THREE.Mesh(archGeo, alignerMaterial);
      arch.rotation.x = Math.PI / 2;
      arch.position.y = 0.2;
      dentalGroup.add(arch);

      // Inner glowing dental alignment grid
      const innerGridGeo = new THREE.SphereGeometry(1.2, 16, 16);
      const innerGrid = new THREE.Mesh(innerGridGeo, cyanGlowMaterial);
      dentalGroup.add(innerGrid);
    }

    // Add floating cyan medical spheres and crosses around
    const particlesGroup = new THREE.Group();
    for (let i = 0; i < 15; i++) {
      const pGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const pMat = new THREE.MeshBasicMaterial({ 
        color: i % 2 === 0 ? 0x0EA5E9 : 0x06B6D4 
      });
      const sphere = new THREE.Mesh(pGeo, pMat);
      sphere.position.set(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      );
      particlesGroup.add(sphere);
    }
    scene.add(particlesGroup);

    // Mouse interactive movement
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / height) * 2 + 1;
    };
    currentMount.addEventListener('mousemove', handleMouseMove);

    // Animation Loop (60 FPS)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth idle rotation + mouse parallax
      if (!isInteractive) {
        dentalGroup.rotation.y = elapsedTime * 0.4 + (mouseX * 0.6);
        dentalGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.15 + (-mouseY * 0.4);
        dentalGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
      } else {
        // Direct responsiveness
        dentalGroup.rotation.y += (mouseX * 2 - dentalGroup.rotation.y) * 0.08;
        dentalGroup.rotation.x += (-mouseY * 2 - dentalGroup.rotation.x) * 0.08;
      }

      // Rotate floating particles slowly
      particlesGroup.rotation.y = elapsedTime * 0.15;
      particlesGroup.rotation.z = Math.sin(elapsedTime * 0.3) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      currentMount.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [activeModel, isInteractive]);

  return (
    <div className="relative w-full h-[460px] lg:h-[540px] flex flex-col items-center justify-center select-none">
      {/* 3D Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-300 relative z-10"
        onMouseEnter={() => setIsInteractive(true)}
        onMouseLeave={() => setIsInteractive(false)}
      />

      {/* Luxury Glassmorphic Controls Panel */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full border border-sky-500/20 shadow-xl max-w-full overflow-x-auto">
        <button
          onClick={() => setActiveModel('tooth')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeModel === 'tooth'
              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30'
              : 'text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          3D Zirconia Tooth
        </button>

        <button
          onClick={() => setActiveModel('implant')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeModel === 'implant'
              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30'
              : 'text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          Titanium Implant
        </button>

        <button
          onClick={() => setActiveModel('aligner')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeModel === 'aligner'
              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30'
              : 'text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Clear Aligner
        </button>
      </div>

      {/* Decorative Interactive Badge */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 text-xs font-medium animate-pulse">
        <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
        <span>Interactive 3D WebGL • Move Mouse to Spin</span>
      </div>
    </div>
  );
};
