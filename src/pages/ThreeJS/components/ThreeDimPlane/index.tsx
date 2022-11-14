/* eslint-disable no-console */
/* eslint-disable react/no-unknown-property */
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { Mesh } from "three";
import "./index.less";

const prefix = "page-threejs-3d-plane";

export const LineRect = (props: any) => {
  const lineRectRef = React.useRef<any>(null);

  return (
    <mesh>
      <Line
        {...props}
        ref={lineRectRef}
        position={[0, 1, 0]}
        points={[
          [0, 0, 0],
          [1, 0, 0],
          [1, 1, 0],
          [0, 1, 0],
          [0, 0, 0],
        ]}
        color="blue"
        lineWidth={2}
      />
    </mesh>
  );
};

const Box = () => {
  const boxRef = React.useRef<Mesh>(null);

  return (
    <mesh
      ref={boxRef}
      position={[-1.5, 1.5, 0]}
    >
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  );
};

const ThreeDimPlane = () => {
  return (
    <div className={prefix}>
      <Canvas>
        <Box />
        <LineRect />
        <OrbitControls makeDefault />
        <gridHelper args={[30, 50]} />
      </Canvas>
    </div>
  );
};

export default ThreeDimPlane;
