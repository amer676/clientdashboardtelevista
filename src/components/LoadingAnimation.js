"use client";
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Individual cube component with physics-like behavior
function Cube({ position, delay, isExiting }) {
  const meshRef = useRef();
  const velocity = useRef({ x: 0, y: 0, z: 0 });
  const initialPosition = useRef(position);
  const exitDirection = useRef({
    x: (Math.random() - 0.5) * 4,
    y: (Math.random() - 0.5) * 4,
    z: -5 - Math.random() * 3
  });
  
  // Random properties for natural movement
  const floatSpeed = useMemo(() => 0.5 + Math.random() * 1.5, []);
  const floatAmplitude = useMemo(() => 0.1 + Math.random() * 0.3, []);
  const rotationSpeed = useMemo(() => ({
    x: (Math.random() - 0.5) * 0.02,
    y: (Math.random() - 0.5) * 0.02,
    z: (Math.random() - 0.5) * 0.02
  }), []);
  
  const scale = useMemo(() => 0.08 + Math.random() * 0.15, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    if (isExiting) {
      // Exit animation - cubes fly out
      velocity.current.x += exitDirection.current.x * 0.08;
      velocity.current.y += exitDirection.current.y * 0.08;
      velocity.current.z += exitDirection.current.z * 0.15;
      
      meshRef.current.position.x += velocity.current.x * 0.1;
      meshRef.current.position.y += velocity.current.y * 0.1;
      meshRef.current.position.z += velocity.current.z * 0.1;
      
      // Spin faster on exit
      meshRef.current.rotation.x += rotationSpeed.x * 5;
      meshRef.current.rotation.y += rotationSpeed.y * 5;
      meshRef.current.rotation.z += rotationSpeed.z * 5;
      
      // Fade out
      if (meshRef.current.material) {
        meshRef.current.material.opacity = Math.max(0, meshRef.current.material.opacity - 0.03);
      }
    } else {
      // Floating animation
      const delayedTime = Math.max(0, time - delay * 0.1);
      
      meshRef.current.position.x = initialPosition.current[0] + Math.sin(delayedTime * floatSpeed) * floatAmplitude;
      meshRef.current.position.y = initialPosition.current[1] + Math.cos(delayedTime * floatSpeed * 0.7) * floatAmplitude;
      meshRef.current.position.z = initialPosition.current[2] + Math.sin(delayedTime * floatSpeed * 0.5) * floatAmplitude * 0.5;
      
      // Gentle rotation
      meshRef.current.rotation.x += rotationSpeed.x;
      meshRef.current.rotation.y += rotationSpeed.y;
      meshRef.current.rotation.z += rotationSpeed.z;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#3b82f6"
        transparent
        opacity={0.8}
        roughness={0.2}
        metalness={0.8}
        emissive="#1d4ed8"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

// Scene with all cubes
function CubeField({ isExiting }) {
  const cubes = useMemo(() => {
    const positions = [];
    const count = 60; // Number of cubes
    
    for (let i = 0; i < count; i++) {
      // Distribute cubes in a sphere-like pattern
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.5 + Math.random() * 2;
      
      positions.push({
        position: [
          Math.sin(phi) * Math.cos(theta) * radius,
          Math.sin(phi) * Math.sin(theta) * radius,
          Math.cos(phi) * radius - 2
        ],
        delay: i
      });
    }
    return positions;
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#60a5fa" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[0, 0, 5]} intensity={0.8} color="#93c5fd" />
      
      {cubes.map((cube, i) => (
        <Cube
          key={i}
          position={cube.position}
          delay={cube.delay}
          isExiting={isExiting}
        />
      ))}
    </>
  );
}

export default function LoadingAnimation({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start exit animation after 2 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2000);

    // Complete and hide after exit animation
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 2800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="loading-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <CubeField isExiting={isExiting} />
      </Canvas>
      
      <div className={`loading-text ${isExiting ? 'exiting' : ''}`}>
        <div className="loading-logo">BISON</div>
        <div className="loading-subtitle">Solar & Roofing</div>
      </div>

      <style jsx>{`
        .loading-container {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: linear-gradient(135deg, #0a0f1a 0%, #0d1424 50%, #0f172a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .loading-text {
          position: absolute;
          text-align: center;
          pointer-events: none;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .loading-text.exiting {
          opacity: 0;
          transform: scale(0.9);
        }
        
        .loading-logo {
          font-size: 3rem;
          font-weight: 900;
          letter-spacing: 0.2em;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 60px rgba(59, 130, 246, 0.5);
        }
        
        .loading-subtitle {
          font-size: 0.875rem;
          font-weight: 600;
          color: #64748b;
          letter-spacing: 0.3em;
          margin-top: 0.5rem;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}
