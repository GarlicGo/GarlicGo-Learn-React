/* eslint-disable no-console */
/* eslint-disable react/no-unknown-property */
import React, { useEffect, useMemo, useState } from "react";
import { Space, Button } from "@douyinfe/semi-ui";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemoizedFn } from "ahooks";
import { Mesh } from "three";
import "./index.less";

const prefix = "page-threejs-3d-move";
const CUBE_START_POSITION = [0, 0, -0.5];
const CUBE_TARGET_POSITION = [-1, 2, 0.5];
const FOOT_LENGTH = 0.01;

const RECT_START_POSITION = [0, 0, 0];
const RECT_TARGET_POSITION = [1, -2, 0];

const Cube = ({ cubeStartPosition, cubeTarget }: any) => {
  const cubeRef = React.useRef<Mesh>(null);

  const distanceX = useMemo(() => {
    return cubeTarget[0] - cubeStartPosition[0];
  }, [cubeTarget, cubeStartPosition]);

  const distanceY = useMemo(() => {
    return cubeTarget[1] - cubeStartPosition[1];
  }, [cubeTarget, cubeStartPosition]);

  const distanceZ = useMemo(() => {
    return cubeTarget[2] - cubeStartPosition[2];
  }, [cubeTarget, cubeStartPosition]);

  useEffect(() => {
    console.log("cubeRef", cubeRef);
  }, [cubeRef]);

  useFrame(() => {
    if (!cubeRef?.current?.position) {
      return;
    }

    if (Math.abs(cubeRef.current.position.x - cubeTarget[0]) > FOOT_LENGTH) {
      cubeRef.current.position.x += 0.01 * distanceX;
    }

    if (Math.abs(cubeRef.current.position.y - cubeTarget[1]) > FOOT_LENGTH) {
      cubeRef.current.position.y += 0.01 * distanceY;
    }

    if (Math.abs(cubeRef.current.position.z - cubeTarget[2]) > FOOT_LENGTH) {
      cubeRef.current.position.z += 0.01 * distanceZ;
    }
  });

  return (
    <mesh ref={cubeRef} position={cubeStartPosition}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  );
};

const LineRect = ({ cubeStartPosition, cubeTarget }: any) => {
  const lineRectRef = React.useRef<any>(null);

  const distanceX = useMemo(() => {
    return cubeTarget[0] - cubeStartPosition[0];
  }, [cubeTarget, cubeStartPosition]);

  const distanceY = useMemo(() => {
    return cubeTarget[1] - cubeStartPosition[1];
  }, [cubeTarget, cubeStartPosition]);

  useFrame(() => {
    if (!lineRectRef?.current?.position) {
      return;
    }

    if (Math.abs(lineRectRef.current.position.x - cubeTarget[0]) > FOOT_LENGTH) {
      lineRectRef.current.position.x += 0.01 * distanceX;
    }

    if (Math.abs(lineRectRef.current.position.y - cubeTarget[1]) > FOOT_LENGTH) {
      lineRectRef.current.position.y += 0.01 * distanceY;
    }
  });

  return (
    <mesh>
      <Line
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

const ThreeDimMove = () => {
  const [cubeKey, setCubeKey] = useState("cubeInit");
  const [rectKey, setRectKey] = useState("rectInit");

  const handleMoveCube = useMemoizedFn(() => {
    setCubeKey(`cube-${Date.now()}`);
  });

  const handleMoveRect = useMemoizedFn(() => {
    setRectKey(`rect-${Date.now()}`);
  });

  return (
    <div className={prefix}>
      <div className={`${prefix}-canvas-opts`}>
        <Space>
          <Button theme="solid" onClick={handleMoveCube}>
            移动 3D 正方体
          </Button>
          <Button theme="solid" onClick={handleMoveRect}>
            移动 2D 正方形
          </Button>
        </Space>
      </div>
      <div className={`${prefix}-canvas`}>
        <div className={`${prefix}-canvas-container`}>
          <Canvas>
            <Cube
              key={cubeKey}
              cubeStartPosition={CUBE_START_POSITION}
              cubeTarget={CUBE_TARGET_POSITION}
            />
            <LineRect
              key={rectKey}
              cubeStartPosition={RECT_START_POSITION}
              cubeTarget={RECT_TARGET_POSITION}
            />
            <OrbitControls makeDefault />
            <gridHelper args={[30, 50]} rotation={[0.5 * Math.PI, 0, 0]} />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default ThreeDimMove;
