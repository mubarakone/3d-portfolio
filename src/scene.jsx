import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { CanvasTexture, BackSide, Vector3, ShaderMaterial } from 'three';
import { Html, OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Main from '../components/Main';
import Experience from '../components/Experience';
import Projects from '../components/Projects'

const drawHexagon = (context, x, y, size) => {
  const height = size; // Normal height
  const width = size * 1.5; // Increased width
  context.beginPath();
  for (let side = 0; side < 7; side++) {
    const angle = (side * Math.PI / 3) + Math.PI / 6;
    context.lineTo(x + width * Math.cos(angle), y + height * Math.sin(angle));
  }
  context.closePath();
  context.fillStyle = 'black';
  context.fill();
  context.strokeStyle = 'cyan';
  context.stroke();
};

const createHexagonalPatternTexture = () => {
  const size = 1024;
  const hexSize = 20; // Adjusted hexagon size for better fill
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');

  // Adjusted layout for reduced spacing
  const rowHeight = Math.sin(Math.PI / 3) * hexSize * 2;
  const colWidth = 1.5 * hexSize; // Adjusted column width
  for (let y = 0; y < size + rowHeight; y += rowHeight) {
    const xOffset = Math.floor(y / rowHeight) % 2 * colWidth;
    for (let x = -hexSize; x < size + hexSize; x += 2 * colWidth) {
      drawHexagon(context, x + xOffset, y, hexSize);
    }
  }

  return new CanvasTexture(canvas);
};

const BackgroundSphere = ({ position }) => {
  const meshRef = useRef();
  const texture = useMemo(createHexagonalPatternTexture, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001; // Adjust the speed of rotation here
    }
  });

  return (
    <>
      {/* PointLight to illuminate the sphere from the outside */}
      <pointLight
        position={position} // Place the light outside the sphere
        intensity={2.0} // Adjust the intensity to control how bright it is
        decay={2} // Controls how fast the light decays
        distance={15} // Maximum distance the light affects
        color="cyan" // Light color
      />

      {/* The sphere itself */}
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[5, 64, 64]} />

        {/* MeshPhysicalMaterial for translucent, glowing effect */}
        <meshPhysicalMaterial
          map={texture} // Apply the texture
          side={BackSide} // Show the inside of the sphere
          roughness={0} // Adjust to control how rough the surface looks
          transmission={0.1} // Makes the material translucent
          thickness={2} // Thickness for subsurface scattering effect
          clearcoat={2} // Add a clear coat to enhance the surface shine
          clearcoatRoughness={0.1} // Control the roughness of the clear coat
        />
      </mesh>
    </>
    
  );
};

const GlowingSphere = ({ position, scale, offsetPosition, image, right }) => {
  const sphereRef = useRef();
  const glowStrengthRef = useRef(1.5); // Reference for glow strength uniform
  const shaderMaterialRef = useRef(); // Reference for the shader material

  // Shader material definition
  const shaderMaterial = {
    uniforms: {
      uGlowStrength: { value: glowStrengthRef.current }, // Glow strength
      uGlowColor: { value: new Vector3(0.0, 1.0, 1.0) }, // Cyan glow color
      uOpacity: { value: 0.5 }, // Opacity for the sphere itself
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal); // Pass normal to fragment shader
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz; // Pass world position to fragment shader
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uGlowStrength;
      uniform vec3 uGlowColor;
      uniform float uOpacity; // Sphere opacity
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        // Calculate the distance from the center to the current fragment
        float distanceFromCenter = length(vPosition);

        // Create a gradient based on distance from the center
        float glowFactor = 1.0 - smoothstep(0.0, 5.0, distanceFromCenter); // Adjust gradient for sphere radius (5.0)

        // Combine the glow color with the calculated glow factor
        vec3 glow = uGlowColor * glowFactor * uGlowStrength;

        // Base color (translucent sphere)
        vec3 baseColor = vec3(0.1, 0.1, 0.1); // A faint base color to avoid black rendering

        // Output the glow with full opacity and the base sphere with translucency
        gl_FragColor = vec4(glow + baseColor, uOpacity); // Apply translucency only to the base color
      }
    `,
  };

  useFrame(({ clock }) => {
    // Animate the glow intensity using a sine wave for a smooth pulsing effect
    const elapsedTime = clock.getElapsedTime();
    const pulseIntensity = 1.5 + Math.sin(elapsedTime * 2) * 0.5; // Pulse between 1.0 and 2.0
    shaderMaterialRef.current.uniforms.uGlowStrength.value = pulseIntensity;
  });

  return (
    <>
      <mesh ref={sphereRef} position={position} scale={scale}>
        <sphereGeometry args={[5, 64, 64]} />
        <shaderMaterial
          ref={shaderMaterialRef} // Assign shader material to ref for animation
          attach="material"
          args={[shaderMaterial]}
          transparent={true} // Enable transparency for the sphere
          depthWrite={false} // Helps with rendering translucent objects correctly
        />
      </mesh>

      {/* Add bloom for a glowing effect */}
      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>

      <Html transform distanceFactor={1.2} position={[position[0] + offsetPosition[0], position[1] + offsetPosition[1], position[2] - 1]}>
      {image !== null && (
        <img
          src={image}
          style={{
            height: '300px',
            width: '300px',
            position: 'absolute',
            bottom: '0px',
            right: right,
            maskImage: 'radial-gradient(circle, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 80%)',
          }}
        />
      )}
      </Html>
    </>
  );
};

function Scene() {
  const [selectedPath, setSelectedPath] = useState('MAIN');
  const [hoveredPath, setHoveredPath] = useState(null)

  const { camera } = useThree();
  const targetPosition = useRef();
  const initializedPosition = useRef([0, 0, 45])
  const initialized = useRef(false);

  const handlePathClick = (pathText) => {
    setSelectedPath(pathText);
  };

  const handleHoveredPath = (imageSource) => {
    setHoveredPath(imageSource)
  }

  const renderPath = (pathClicked, pathHovered) => {
    switch (selectedPath) {

      case 'MAIN':
        targetPosition.current = [-0.3, -0.2, 41.5];
        camera.lookAt(5, 5, 5)
        return (
          <Html transform distanceFactor={1.2} position={[0, 0, 40]}> 
            <Main onHoveredPath={pathHovered} onPathClick={pathClicked} />
          </Html>
        );

      case 'EXPERIENCE':
        targetPosition.current = [-0.1, -0.6, 21.5];
        camera.lookAt(5, 5, 5)
        return (
          <Html transform distanceFactor={1.2} position={[0.5, 0, 20]}> 
            <Experience onHoveredPath={pathHovered} onPathClick={pathClicked} />
          </Html>
        );

      case 'PROJECTS':
        targetPosition.current = [-9.5, -0.6, 21.5];
        camera.lookAt(-11, 5, 5)
        return (
          <Html transform distanceFactor={1.2} position={[-9.5, 0, 20]}> 
            <Projects onHoveredPath={pathHovered} onPathClick={pathClicked} />
          </Html>
        );
    }
  }

  useEffect(() => {
    // camera.lookAt(5, 5, 5)
    camera.fov = 60; // Lower FOV to zoom in (default is typically 50-75 for perspective cameras)
    camera.updateProjectionMatrix(); // Update the projection matrix to apply the FOV change
    initialized.current = true;

  }, [selectedPath, camera]);

  useFrame(() => {
    // Gradually move the camera towards the target position
    camera.position.lerp({ x: targetPosition.current[0], y: targetPosition.current[1], z: targetPosition.current[2] }, 0.05);
  });

  return (
    <>
      <PerspectiveCamera />
      {/* <ambientLight intensity={0.5} /> */}
      <BackgroundSphere position={[0, 0, 40]} />
      <BackgroundSphere position={[0, 0, 20]} /> {/* New BackgroundSphere */}
      <BackgroundSphere position={[-10, 0, 20]} /> {/* New BackgroundSphere */}
      <GlowingSphere  position={[0.32,0,39.5]} scale={0.13} offsetPosition={[0,0]} image={hoveredPath} />
      <GlowingSphere  position={[0,0.1,19.5]} scale={0.13} offsetPosition={[0.5,0.3]} image={hoveredPath} right={'-5px'} />
      <GlowingSphere  position={[-10,0.1,19.5]} scale={0.13} offsetPosition={[0.1,0.3]} image={hoveredPath} right={'0px'} />
      {renderPath(handlePathClick, handleHoveredPath)}
      {/* <OrbitControls /> */}
    </>
  );
}

export default Scene;
