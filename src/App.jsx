import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PointerLockControls, useGLTF } from '@react-three/drei';

// --- 1. THE MODEL ---
function Model() {
  const { scene } = useGLTF('/court.glb'); 

  useEffect(() => {
    scene.traverse((child) => {
      child.frustumCulled = false;
      if (child.isMesh) {
        child.material.wireframe = false;
        child.castShadow = true;
        child.receiveShadow = true;
      }
      if (child.isLight) {
        child.intensity = 0.5; 
        child.distance = 20; 
        child.decay = 2;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={0.02} position={[0, -0.1, 0]} />;
}

// --- 2. MOVEMENT LOGIC ---
function FirstPersonMovement() {
  const controlsRef = useRef();
  const [keys, setKeys] = useState({ w: false, a: false, s: false, d: false });

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) setKeys((k) => ({ ...k, [key]: true }));
    };
    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) setKeys((k) => ({ ...k, [key]: false }));
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (controlsRef.current) {
      const speed = 0.05; 
      if (keys.w) controlsRef.current.moveForward(speed);
      if (keys.s) controlsRef.current.moveForward(-speed);
      if (keys.a) controlsRef.current.moveRight(-speed);
      if (keys.d) controlsRef.current.moveRight(speed);
    }
  });

  return (
    <PointerLockControls 
      ref={controlsRef} 
      selector="#canvas-container" 
      pointerSpeed={0.5} // <-- FIX: SLIGHTLY SLOWER MOUSE LOOK
    />
  );
}

// --- 3. MAIN APP ---
export default function App() {
  const [isFirstPerson, setIsFirstPerson] = useState(true);

  return (
    <div id="canvas-container" style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      background: '#101010', 
      overflow: 'hidden' 
    }}>
      
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 100, color: 'white', fontFamily: 'sans-serif' }}>
        <h2>🏀 Campus Court</h2>
        <button 
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => setIsFirstPerson(!isFirstPerson)}
        >
          {isFirstPerson ? "EXIT First Person" : "ENTER First Person"}
        </button>
      </div>

      {/* CAMERA ADJUSTMENT:
          Y: 0.01 (FIX: Lifts camera slightly off the floor to prevent clipping)
          Z: 1.0  (FIX: Moves camera back from the wall to prevent side-clipping)
      */}
      <Canvas shadows camera={{ position: [-0.5, 0.00, -1.0],fov: 75, far: 10000 }}>
        
        <ambientLight intensity={0.1} /> 

        <Suspense fallback={null}>
          <Model />
          {isFirstPerson ? <FirstPersonMovement /> : <OrbitControls makeDefault target={[0, 0, 0]} />}
        </Suspense>

      </Canvas>
    </div>
  );
}