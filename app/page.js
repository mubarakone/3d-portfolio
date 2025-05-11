"use client"
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import Scene from '../src/scene';
import { Html } from "@react-three/drei";
import LoadingScreen from "../components/LoadingScreen";
import SoundToggle from '../src/components/SoundToggle';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [canvasVisible, setCanvasVisible] = useState(false);

  // Handle starting the experience
  const handleStarted = () => {
    setStarted(true);
    
    // Canvas becomes visible immediately when loading screen starts pull-down animation
    setCanvasVisible(true);
  };

  return (
    <div style={{width: "100%", height: "100%", position: "relative"}}>
      <LoadingScreen started={started} onStarted={handleStarted} />
      
      {/* Sound toggle button - only visible when experience has started */}
      {started && <SoundToggle />}
      
      <Canvas 
        shadows
        style={{ 
          height: '100vh', 
          width: '100vw', 
          position: 'absolute',
          opacity: canvasVisible ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          zIndex: 1
        }}
        gl={{ 
          alpha: false,
          antialias: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        frameloop={started ? "always" : "demand"}
        onCreated={({ gl, scene }) => {
          gl.setClearColor('black');
        }}
        camera={{ position: [0, 0, 45] }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
