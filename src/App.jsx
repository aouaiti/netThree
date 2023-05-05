import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Grid,
  PivotControls,
  GizmoHelper,
  GizmoViewport,
  QuadraticBezierLine,
} from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import LineMaker from "./LineMaker";
import * as THREE from "three";

const Switch = ({ position, setAnimate, setPos }) => {
  const [drag, setDrag] = useState([false, false, false]);
  const pos = useRef();
  // console.log(pos);
  useEffect(() => {
    // if (!pos) return;
    setPos(pos.current.position);
    console.log(pos.current.position);
  });
  // useFrame(() => {
  //   console.log(pos.current.getWorldPosition());
  // });
  return (
    <PivotControls
      object={pos}
      scale={2}
      onDragStart={() => setAnimate(true)}
      onDragEnd={() => setAnimate(false)}
      activeAxes={drag}
      depthTest={false}
      opacity={0.8}
      anchor={[0, 1, 0]}
      onDrag={(l, dl, w, dw) => {
        // Extract the position and rotation
        const position = new THREE.Vector3();
        const rotation = new THREE.Quaternion();
        // I'm never sure whether to grab "l" or "w" here... sorry
        w.decompose(position, rotation, new THREE.Vector3());
        console.log(position);
      }}
    >
      <group position={position}>
        <mesh
          ref={pos}
          onClick={() => setDrag([true, false, true])}
          onPointerMissed={(e) =>
            e.type === "click" && setDrag([false, false, false])
          }
        >
          <boxGeometry args={[1, 0.25, 0.8]} />
          <meshStandardMaterial />
        </mesh>
        <mesh rotation-x={-Math.PI / 2}>
          <ringGeometry args={[1, 1.03, 26, 1]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
    </PivotControls>
  );
};

function App() {
  const [points, setPoints] = useState();
  const [animate, setAnimate] = useState(false);
  const [pos1, setPos1] = useState([]);
  const [pos2, setPos2] = useState([]);
  const [pos3, setPos3] = useState([]);

  const data = {
    buildings: {
      building1: {
        equipments: {
          equipment1: {
            position: pos1,
            id: "equipment1",
            type: "switch",
            links: ["equipment2", "equipment3"],
          },
          equipment2: {
            position: [5, 0, 5],
            id: "equipment2",
            type: "switch",
            links: ["equipment1"],
          },
          equipment3: {
            position: [-5, 0, 5],
            id: "equipment3",
            type: "router",
            links: ["equipment1"],
          },
        },
      },
    },
  };

  return (
    <div className="App">
      <Canvas camera={{ position: [-5, 15, 15], fov: 45 }}>
        <color args={["#131313"]} attach="background" />
        <OrbitControls makeDefault />
        <Environment preset="city" />
        <Grid
          position-y={-0.15}
          infiniteGrid
          cellColor={"#6f6f6f"}
          sectionColor={"#9d4b4b"}
          fadeDistance={50}
          fadeStrength={5}
          // sectionThickness={1.1}
        />
        <Switch setPos={setPos1} setAnimate={setAnimate} position={[0, 0, 0]} />
        <Switch setPos={setPos2} setAnimate={setAnimate} position={[5, 0, 5]} />
        <Switch
          setPos={setPos3}
          setAnimate={setAnimate}
          position={[-5, 0, 5]}
        />
        <LineMaker data={data} animate={animate} />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport labelColor="black" />
          {/* alternative: <GizmoViewcube /> */}
        </GizmoHelper>
      </Canvas>
    </div>
  );
}

export default App;
