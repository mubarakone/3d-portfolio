"use client"
import React from "react";
import RiveButtons from "../components/RiveButtons"
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
      gl={{ alpha: false }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor('black');
      }}
      camera={{ position: [0, 0, 45] }}
    >
      <Scene />
    </Canvas>
    {/* <div style={{
      display: "grid",
      gridTemplateRows: "repeat(2, minmax(0, 1fr))",
      gridAutoFlow: "column",
      gap: "1rem",
      position: "absolute",
      zIndex: 1,
    }}>
      <div style={{gridRow: "span 3 / span 3",}}>
        <Image width={500} height={500} src="FIRST NAME LAST NAME.svg" />
      </div>
      <div style={{gridRow: "span 2 / span 2",}}>
        <RiveButtons />
      </div>
    </div> */}
  </div>
  );
}
