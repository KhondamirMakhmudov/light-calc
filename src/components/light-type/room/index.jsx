import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

const Wall = ({ position, rotation, dimensions }) => {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[dimensions.width, dimensions.height, 0.1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

const Model = ({ position, scale }) => {
  const { scene } = useGLTF("/3d-models/window-model/scene.gltf");

  return (
    <primitive
      fit="contain"
      object={scene}
      position={position}
      scale={scale}
      depth={0.1}
    />
  );
};

const Window = ({ position }) => {
  return (
    <mesh position={position}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color="skyblue" transparent opacity={0.5} />
    </mesh>
  );
};

const Plant = ({ position }) => {
  return (
    <mesh position={position}>
      <coneGeometry args={[0.2, 0.5, 16]} />
      <meshStandardMaterial color="green" />
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </mesh>
  );
};

const Table = ({ position }) => (
  <group position={position}>
    {/* Tabletop */}
    <mesh position={[0, 0.75, 0]}>
      <boxGeometry args={[1.5, 0.1, 1]} />
      <meshStandardMaterial color="#8B4513" />
    </mesh>
    {/* Legs */}
    {[
      [-0.65, 0.33, -0.45],
      [0.65, 0.33, -0.45],
      [-0.65, 0.33, 0.45],
      [0.65, 0.33, 0.45],
    ].map((legPos, index) => (
      <mesh key={index} position={[...legPos, 0.375]}>
        <cylinderGeometry args={[0.05, 0.05, 0.75, 16]} />
        <meshStandardMaterial color="#5F4339" />
      </mesh>
    ))}
  </group>
);

const Chair = ({ position }) => (
  <group position={[-1, 0, 0]} rotation={[0, 1.6, 0]}>
    {/* Seat */}
    <mesh position={[0, 0.4, 0]}>
      <boxGeometry args={[0.7, 0.1, 0.7]} />
      <meshStandardMaterial color="#8B4513" />
    </mesh>
    {/* Backrest */}
    <mesh position={[0, 0.7, -0.3]}>
      <boxGeometry args={[0.7, 0.6, 0.1]} />
      <meshStandardMaterial color="#8B4513" />
    </mesh>
    {/* Legs */}
    {[
      [-0.3, 0.19, -0.3],
      [0.3, 0.19, -0.3],
      [-0.3, 0.19, 0.3],
      [0.3, 0.19, 0.3],
    ].map((legPos, index) => (
      <mesh key={index} position={[...legPos, 0.2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
        <meshStandardMaterial color="#5F4339" />
      </mesh>
    ))}
  </group>
);

const House3D = ({ length = 5, width = 5, height = 3, workSurface = 0 }) => {
  return (
    <Canvas style={{ height: "400px" }}>
      <ambientLight intensity={4} />
      <directionalLight position={[3, 4, 1]} />
      <OrbitControls />

      {/* Base */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[length, 0.1, width]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Walls */}
      <Wall
        position={[0, height / 2, -width / 2]}
        dimensions={{ width: length, height }}
      />
      <Wall
        position={[-length / 2, height / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        dimensions={{ width, height }}
      />

      {workSurface === 0 ? "" : <Table position={[0, 0, 0]} />}

      {/* Chair */}
      {workSurface === 0 ? "" : <Chair position={[-1, 0, 0]} />}

      {/* Window */}
      <Window position={[0, 1.5, -width / 2 + 0.05]} />

      {/* Plant */}
      <Plant position={[length / 2 - 0.5, 0.3, width / 2 - 0.5]} />

      {/* Labels */}
    </Canvas>
  );
};

export default House3D;
