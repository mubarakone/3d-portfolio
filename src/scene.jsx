import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { CanvasTexture, BackSide, Vector3, ShaderMaterial, SphereGeometry, TextureLoader } from 'three';
import { Html, OrbitControls, PerspectiveCamera, Text, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Main from '../components/Main';
import Experience from '../components/Experience';
import Projects from '../components/Projects'
import Links from '../components/Links'
import { useAssetPreloader } from './utils/assetLoader';
import soundManager from './utils/sound';
import sounds from './utils/sounds';

// Create hexagon pattern texture once at module level
let hexagonalTexture = null;

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
  if (typeof window === 'undefined') return null; // Skip on server-side
  if (hexagonalTexture) return hexagonalTexture;

  // Reduced texture size for better performance
  const size = 512; // Reduced from 1024
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

  hexagonalTexture = new CanvasTexture(canvas);
  hexagonalTexture.needsUpdate = true;
  return hexagonalTexture;
};

// Create shared geometries
const sphereGeometry = new SphereGeometry(5, 32, 32); // Reduced segments from 64 to 32

// Create shader materials once
const createGlowingMaterial = () => {
  return {
    uniforms: {
      uGlowStrength: { value: 1.5 },
      uGlowColor: { value: new Vector3(0.0, 1.0, 1.0) },
      uOpacity: { value: 0.5 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uGlowStrength;
      uniform vec3 uGlowColor;
      uniform float uOpacity;
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        float distanceFromCenter = length(vPosition);
        float glowFactor = 1.0 - smoothstep(0.0, 5.0, distanceFromCenter);
        vec3 glow = uGlowColor * glowFactor * uGlowStrength;
        vec3 baseColor = vec3(0.1, 0.1, 0.1);
        gl_FragColor = vec4(glow + baseColor, uOpacity);
      }
    `,
  };
};

// Singleton EffectComposer to be used app-wide
const GlobalEffects = () => {
  return (
    <EffectComposer>
      <Bloom intensity={1.5} luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} />
    </EffectComposer>
  );
};

// Create a component to handle asset preloading
const AssetPreloader = () => {
  // Register textures to be loaded through drei's useProgress
  const assetUrls = [
    '/textures/sphere_texture.jpg', 
    '/textures/background_texture.jpg',
    '/textures/glow_texture.jpg',
    '/textures/ui_element_1.png',
    '/textures/ui_element_2.png',
    '/textures/ui_element_3.png',
    '/textures/ui_element_4.png',
    '/textures/particle_texture.png',
  ];
  
  try {
    // This will throw errors for missing files, but that's okay
    // The important part is that it registers with the loading manager
    useLoader(TextureLoader, assetUrls);
  } catch (error) {
    // Ignore the errors, we just want to trigger the loading progress
  }
  
  return null;
};

const BackgroundSphere = ({ position }) => {
  const meshRef = useRef();
  const texture = useMemo(createHexagonalPatternTexture, []);
  const rotationSpeed = useMemo(() => 0.001, []); // Constant rotation speed

  // Run animation continuously regardless of interaction
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <>
      <pointLight
        position={position}
        intensity={2.0}
        decay={2}
        distance={15}
        color="cyan"
      />

      <mesh ref={meshRef} position={position} geometry={sphereGeometry}>
        <meshPhysicalMaterial
          map={texture}
          side={BackSide}
          roughness={0}
          transmission={0.1}
          thickness={2}
          clearcoat={2}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </>
  );
};

const GlowingSphere = ({ position, scale, offsetPosition, image, right }) => {
  const sphereRef = useRef();
  const shaderMaterialRef = useRef();
  
  // Use shared material definition
  const shaderMaterial = useMemo(() => createGlowingMaterial(), []);

  // Ensure animation runs continuously
  useFrame(({ clock }) => {
    if (!shaderMaterialRef.current) return;
    
    // Animation runs at a consistent rate
    const elapsedTime = clock.getElapsedTime() * 0.5;
    const pulseIntensity = 1.5 + Math.sin(elapsedTime) * 0.5;
    shaderMaterialRef.current.uniforms.uGlowStrength.value = pulseIntensity;
  });

  return (
    <>
      <mesh ref={sphereRef} position={position} scale={scale} geometry={sphereGeometry}>
        <shaderMaterial
          ref={shaderMaterialRef}
          attach="material"
          args={[shaderMaterial]}
          transparent={true}
          depthWrite={false}
        />
      </mesh>

      {image !== null && (
        <Html transform distanceFactor={1.2} position={[position[0] + offsetPosition[0], position[1] + offsetPosition[1] + 0.9, position[2] - 1.5]}>
          <div
            style={{
              height: '400px',
              width: '400px',
              position: 'absolute',
              top: '0px',
              left: '0px',
              zIndex: 600,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0)',
              maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 80%)',
              WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 80%)'
            }}
          >
            <img
              src={`/${image}`}
              alt=""
              style={{
                maxHeight: '80%',
                maxWidth: '80%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 10px rgba(0, 186, 215, 0.7))',
                opacity: 0.8
              }}
            />
          </div>
        </Html>
      )}
    </>
  );
};

function Scene() {
  const [selectedPath, setSelectedPath] = useState('MAIN');
  const [hoveredPath, setHoveredPath] = useState(null);
  const [activeSection, setActiveSection] = useState('MAIN');
  const previousSection = useRef('MAIN');

  const { camera } = useThree();
  const targetPosition = useRef([-0.3, -0.2, 41.5]); // Default for MAIN
  const targetLookAt = useRef([0, 0, 0]); // Add target look-at reference
  const initialized = useRef(false);
  const transitionInProgress = useRef(false);
  const soundInitialized = useRef(false);

  // Initialize sound manager on client side only
  useEffect(() => {
    if (!soundInitialized.current) {
      soundManager.init({
        // UI interaction sounds
        uiClick: sounds.uiClick,
        progressComplete: sounds.progressComplete,
        enterButton: sounds.enterButton,
        hover: sounds.hover
      });
      soundInitialized.current = true;
    }
  }, []);

  const handlePathClick = (pathText) => {
    // Always play sound for any menu item click
    soundManager.play('uiClick');
    
    // Always allow navigation to any section
    setSelectedPath(pathText);
  };

  const handleHoveredPath = (imageSource) => {
    setHoveredPath(imageSource);
  };

  // Define section positions and targets
  const sections = useMemo(() => ({
    MAIN: {
      cameraPosition: [-0.3, -0.2, 41.5],
      lookAt: [0, 0.3, 38], // Look slightly down at the main sphere
      componentPosition: [0, 0, 40]
    },
    EXPERIENCE: {
      cameraPosition: [-0.1, -0.6, 21.5],
      lookAt: [0.8, 0.5, 18], // Tilt camera up by looking higher (positive y value)
      componentPosition: [0.5, 0, 20]
    },
    PROJECTS: {
      cameraPosition: [-9.5, -0.6, 21.5],
      lookAt: [-9.5, 0.5, 18], // Tilt camera up by looking higher (positive y value)
      componentPosition: [-9.5, 0, 20]
    },
    LINKS: {
      cameraPosition: [10.5, -0.6, 21.5],
      lookAt: [10.5, 0.5, 18], // Tilt camera up by looking higher (positive y value)
      componentPosition: [10.5, 0, 20]
    }
  }), []);

  // Memoize component rendering to reduce re-renders
  const mainComponent = useMemo(() => (
    <Html transform distanceFactor={1.2} position={sections.MAIN.componentPosition}> 
      <Main onHoveredPath={handleHoveredPath} onPathClick={handlePathClick} />
    </Html>
  ), [sections]);

  const experienceComponent = useMemo(() => (
    <Html transform distanceFactor={1.2} position={sections.EXPERIENCE.componentPosition}> 
      <Experience onHoveredPath={handleHoveredPath} onPathClick={handlePathClick} />
    </Html>
  ), [sections]);

  const projectsComponent = useMemo(() => (
    <Html transform distanceFactor={1.2} position={sections.PROJECTS.componentPosition}> 
      <Projects onHoveredPath={handleHoveredPath} onPathClick={handlePathClick} />
    </Html>
  ), [sections]);

  const linksComponent = useMemo(() => (
    <Html transform distanceFactor={1.2} position={sections.LINKS.componentPosition}> 
      <Links onHoveredPath={handleHoveredPath} onPathClick={handlePathClick} />
    </Html>
  ), [sections]);

  useEffect(() => {
    if (sections[selectedPath]) {
      // Set target position and look-at point based on selected section
      targetPosition.current = sections[selectedPath].cameraPosition;
      targetLookAt.current = sections[selectedPath].lookAt;
      setActiveSection(selectedPath);
      transitionInProgress.current = true;
    }

    camera.fov = 60;
    camera.updateProjectionMatrix();
    initialized.current = true;
  }, [selectedPath, camera, sections]);

  // Manage camera movement and orientation
  useFrame(() => {
    if (!initialized.current) return;

    // Increase speed factor for zippy camera movement
    camera.position.lerp(
      { 
        x: targetPosition.current[0], 
        y: targetPosition.current[1], 
        z: targetPosition.current[2] 
      }, 
      0.15 // Increased from 0.05 for much faster movement
    );

    // Create a vector for the target look-at position
    const lookAtTarget = new Vector3(
      targetLookAt.current[0],
      targetLookAt.current[1],
      targetLookAt.current[2]
    );

    // Faster rotation to match the faster movement
    const tempCamera = camera.clone();
    tempCamera.position.copy(camera.position);
    tempCamera.lookAt(lookAtTarget);
    
    // Increase rotation speed to match the faster position change
    camera.quaternion.slerp(tempCamera.quaternion, 0.18);
    
    // Check if we're close enough to target to end the transition state
    // But don't change the movement behavior based on this
    const positionDistance = camera.position.distanceTo(new Vector3(
      targetPosition.current[0],
      targetPosition.current[1],
      targetPosition.current[2]
    ));
    
    // Only update the transition state, don't change the movement behavior
    if (positionDistance < 0.2 && transitionInProgress.current) {
      transitionInProgress.current = false;
    }
  });

  // Conditional rendering based on active section
  const renderActiveSection = () => {
    switch(activeSection) {
      case 'MAIN': return mainComponent;
      case 'EXPERIENCE': return experienceComponent;
      case 'PROJECTS': return projectsComponent;
      case 'LINKS': return linksComponent;
      default: return mainComponent;
    }
  };

  return (
    <>
      {/* Preload assets to trigger the loading progress */}
      <AssetPreloader />
      
      <PerspectiveCamera />
      
      {/* Single global EffectComposer */}
      <GlobalEffects />
      
      {/* Background spheres - always render the main one */}
      <BackgroundSphere position={[0, 0, 40]} />
      
      {/* Only render secondary spheres when in the corresponding section */}
      {activeSection !== 'MAIN' && (
        <>
          <BackgroundSphere position={[0, 0, 20]} />
          {activeSection === 'PROJECTS' && <BackgroundSphere position={[-10, 0, 20]} />}
          {activeSection === 'LINKS' && <BackgroundSphere position={[10, 0, 20]} />}
        </>
      )}
      
      {/* Only render the active glowing sphere */}
      {activeSection === 'MAIN' && <GlowingSphere position={[0.32,0,39.5]} scale={0.13} offsetPosition={[0,0]} image={hoveredPath} />}
      {activeSection === 'EXPERIENCE' && <GlowingSphere position={[0,0.1,19.5]} scale={0.13} offsetPosition={[-0.3,0.6,0.3]} image={hoveredPath} right={'-5px'} />}
      {activeSection === 'PROJECTS' && <GlowingSphere position={[-10,0.1,19.5]} scale={0.13} offsetPosition={[-1,0.6]} image={hoveredPath} right={'0px'} />}
      {activeSection === 'LINKS' && <GlowingSphere position={[10,0.1,19.5]} scale={0.13} offsetPosition={[-1,0.6]} image={hoveredPath} right={'0px'} />}
      
      {renderActiveSection()}
    </>
  );
}

export default Scene;
