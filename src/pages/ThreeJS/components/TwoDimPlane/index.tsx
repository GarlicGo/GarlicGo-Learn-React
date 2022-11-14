/* eslint-disable no-console */
/* eslint-disable react/no-unknown-property */
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import "./index.less";

const prefix = "page-threejs-2d-plane";

const LineRect = (props: any) => {
  const lineRectRef = React.useRef<any>(null);

  return (
    <mesh>
      <Line
        {...props}
        ref={lineRectRef}
        position={[0, 0, 0]}
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

const TwoDimPlane = () => {
  return (
    <div className={prefix}>
      <Canvas>
        <LineRect />
        <OrbitControls makeDefault />
        <gridHelper args={[30, 50]} rotation={[0.5 * Math.PI, 0, 0]} />
      </Canvas>
    </div>
  );
};

export default TwoDimPlane;
