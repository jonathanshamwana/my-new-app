import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text, Environment, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { textileData, audioConfig, galleryConfig } from '../config/textiles';

// Space background component with stars and particles
function SpaceBackground() {
  const particlesRef = useRef();
  const cloudsRef = useRef();

  useFrame((state) => {
    if (particlesRef.current) {
      // Gentle rotation of particles
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
    
    if (cloudsRef.current) {
      // Slow movement of clouds
      cloudsRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2;
      cloudsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 1;
    }
  });

  return (
    <>
      {/* Stars background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
      
      {/* Floating particles */}
      <group ref={particlesRef} position={[0, 0, -10]}>
        {Array.from({ length: 100 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 40,
              (Math.random() - 0.5) * 40,
              (Math.random() - 0.5) * 20
            ]}
          >
            <sphereGeometry args={[Math.random() * 0.1 + 0.02, 8, 8]} />
            <meshBasicMaterial 
              color={new THREE.Color().setHSL(Math.random() * 0.1 + 0.6, 0.5, 0.8)}
              transparent
              opacity={Math.random() * 0.5 + 0.3}
            />
          </mesh>
        ))}
      </group>

      {/* Cloud-like formations */}
      <group ref={cloudsRef} position={[0, 0, -15]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 30,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 10
            ]}
          >
            <sphereGeometry args={[Math.random() * 2 + 1, 16, 16]} />
            <meshBasicMaterial 
              color={new THREE.Color().setHSL(0.6, 0.1, 0.3)}
              transparent
              opacity={0.1}
            />
          </mesh>
        ))}
      </group>

      {/* Nebula-like effects */}
      <mesh position={[10, 5, -20]}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial 
          color={new THREE.Color().setHSL(0.7, 0.8, 0.4)}
          transparent
          opacity={0.1}
        />
      </mesh>
      
      <mesh position={[-8, -3, -18]}>
        <sphereGeometry args={[6, 32, 32]} />
        <meshBasicMaterial 
          color={new THREE.Color().setHSL(0.3, 0.6, 0.5)}
          transparent
          opacity={0.08}
        />
      </mesh>
    </>
  );
}

// Textile component with audio integration
function Textile({ data, onSelect, isSelected }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Load texture
  const texture = useLoader(THREE.TextureLoader, data.textureUrl);

  // Animation loop
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = data.position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Subtle rotation
      meshRef.current.rotation.y = data.rotation[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const handleClick = () => {
    onSelect(data);
  };

  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'default';
  };

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={data.position}
        rotation={data.rotation}
        scale={hovered || isSelected ? data.scale.map(s => s * 1.1) : data.scale}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <planeGeometry args={[2, 3]} />
        <meshStandardMaterial 
          map={texture}
          transparent
          opacity={hovered || isSelected ? 1 : 0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Selection indicator */}
      {isSelected && (
        <mesh position={[data.position[0], data.position[1] - 2, data.position[2]]}>
          <ringGeometry args={[1.2, 1.5, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      )}
    </Float>
  );
}

// Audio controls component
function AudioControls({ selectedTextile, isPlaying, onPlayPause, onStop }) {
  if (!selectedTextile) return null;

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0, 0, 0, 0.8)',
      padding: '15px 25px',
      borderRadius: '25px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
      minWidth: '300px'
    }}>
      {/* Textile Info and Controls */}
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{selectedTextile.name}</h3>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>{selectedTextile.description}</p>
        <div style={{ marginTop: '8px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {selectedTextile.tags.map((tag, index) => (
            <span key={index} style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '2px 8px',
              borderRadius: '10px',
              fontSize: '12px'
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={onPlayPause}
          style={{
            background: isPlaying ? '#ff6b6b' : '#4ecdc4',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.3s ease'
          }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button
          onClick={onStop}
          style={{
            background: '#95a5a6',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.3s ease'
          }}
        >
          ⏹️
        </button>
      </div>
    </div>
  );
}

// Enter button component with portal expansion animation
function EnterButton({ onEnter }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Enter button clicked!'); // Debug log
    setIsAnimating(true);
    setTimeout(() => {
      console.log('Animation complete, calling onEnter'); // Debug log
      onEnter();
    }, 1500); // Portal expansion duration
  };

  return (
    <div 
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      <div
        style={{
          width: isAnimating ? '200vw' : '120px',
          height: isAnimating ? '200vh' : '120px',
          borderRadius: '50%',
          border: '3px solid white',
          background: isAnimating 
            ? 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 30%, transparent 70%)'
            : isHovered 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'transparent',
          color: 'white',
          fontSize: isAnimating ? '0px' : '18px',
          fontWeight: 'bold',
          transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          boxShadow: isHovered 
            ? '0 0 30px rgba(255, 255, 255, 0.3)' 
            : '0 0 20px rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {!isAnimating && 'Enter'}
        
        {/* Portal effect during animation */}
        {isAnimating && (
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 100%)',
            animation: 'portalPulse 0.5s infinite alternate'
          }} />
        )}
      </div>
      
      <style jsx>{`
        @keyframes portalPulse {
          0% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// Main TextileViewer component
function TextileViewer() {
  const [selectedTextile, setSelectedTextile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRefs, setAudioRefs] = useState({});
  const [hasEntered, setHasEntered] = useState(false);
  const [ambientAudio, setAmbientAudio] = useState(null);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  useEffect(() => {
    // Initialize audio references
    const ambient = new Audio(audioConfig.ambientAudioUrl);
    ambient.volume = audioConfig.ambientVolume;
    ambient.loop = true;
    setAmbientAudio(ambient);

    // Initialize textile audio references
    const refs = {};
    textileData.forEach(textile => {
      const audio = new Audio(textile.audioUrl);
      audio.volume = audioConfig.defaultVolume;
      
      // Add event listeners for when textile audio ends
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        // Restart ambient audio when textile audio ends
        if (ambient && !isAmbientPlaying) {
          ambient.play().catch(err => {
            console.log('Ambient audio restart failed:', err);
          });
          setIsAmbientPlaying(true);
        }
      });
      
      refs[textile.id] = audio;
    });
    setAudioRefs(refs);
  }, []);

  const handleEnter = () => {
    console.log('handleEnter called!'); // Debug log
    setHasEntered(true);
    console.log('hasEntered set to true'); // Debug log
    
    // Start ambient audio after user interaction
    if (ambientAudio && !isAmbientPlaying) {
      console.log('Starting ambient audio...'); // Debug log
      ambientAudio.play().catch(err => {
        console.log('Ambient audio start failed:', err);
      });
      setIsAmbientPlaying(true);
    } else {
      console.log('Ambient audio not available or already playing'); // Debug log
    }
  };

  const handleTextileSelect = (textile) => {
    setSelectedTextile(textile);
    
    // Stop ambient audio when textile is clicked
    if (ambientAudio && isAmbientPlaying) {
      ambientAudio.pause();
      setIsAmbientPlaying(false);
    }
  };

  const handlePlayPause = () => {
    if (!selectedTextile) return;
    
    const audio = audioRefs[selectedTextile.id];
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      // Restart ambient audio when textile audio is paused
      if (ambientAudio && !isAmbientPlaying) {
        ambientAudio.play().catch(err => {
          console.log('Ambient audio restart failed:', err);
        });
        setIsAmbientPlaying(true);
      }
    } else {
      // Stop all other audio
      Object.values(audioRefs).forEach(a => {
        a.pause();
        a.currentTime = 0;
      });
      
      audio.play().catch(err => {
        console.log('Audio playback failed:', err);
      });
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (!selectedTextile) return;
    
    const audio = audioRefs[selectedTextile.id];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      // Restart ambient audio when textile audio is stopped
      if (ambientAudio && !isAmbientPlaying) {
        ambientAudio.play().catch(err => {
          console.log('Ambient audio restart failed:', err);
        });
        setIsAmbientPlaying(true);
      }
    }
  };

  if (!hasEntered) {
    return (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Space background for enter screen */}
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <SpaceBackground />
          </Suspense>
        </Canvas>
        
        <EnterButton onEnter={handleEnter} />
      </div>
    );
  }

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Space background with stars and particles */}
          <SpaceBackground />
          
          {/* Lighting */}
          <ambientLight intensity={galleryConfig.ambientLightIntensity} />
          <directionalLight position={[10, 10, 5]} intensity={galleryConfig.directionalLightIntensity} />
          <pointLight position={[-10, -10, -5]} intensity={galleryConfig.pointLightIntensity} color="#ff6b6b" />
          
          {/* Environment */}
          <Environment preset="night" />
          
          {/* Textiles */}
          {textileData.map((textile) => (
            <Textile
              key={textile.id}
              data={textile}
              onSelect={handleTextileSelect}
              isSelected={selectedTextile?.id === textile.id}
            />
          ))}
        </Suspense>
        
        <OrbitControls 
          enablePan={galleryConfig.enablePan}
          enableZoom={galleryConfig.enableZoom}
          enableRotate={galleryConfig.enableRotate}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          maxDistance={galleryConfig.maxDistance}
          minDistance={galleryConfig.minDistance}
          autoRotate={galleryConfig.autoRotate}
          autoRotateSpeed={galleryConfig.autoRotateSpeed}
        />
      </Canvas>

      {/* Audio Controls */}
      <AudioControls
        selectedTextile={selectedTextile}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onStop={handleStop}
      />
    </div>
  );
}

export default TextileViewer;
