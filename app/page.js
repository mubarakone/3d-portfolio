"use client"
import React from "react";
import Image from "next/image";
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import Scene from '../src/scene';
import { Html } from "@react-three/drei";

export default function Home() {

  return (
  <div style={{width: "100%", height: "100%", position: "relative"}}>
    <Canvas 
      shadows
      style={{ height: '100vh', width: '100vw', position: 'absolute', }}
      gl={{ 
        alpha: false,
        antialias: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true
      }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      frameloop="always"
      onCreated={({ gl, scene }) => {
        gl.setClearColor('black');
      }}
      camera={{ position: [0, 0, 45] }}
    >
      <Scene />
    </Canvas>
  </div>
  );
}
