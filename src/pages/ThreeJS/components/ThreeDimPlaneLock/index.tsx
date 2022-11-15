/* eslint-disable @typescript-eslint/prefer-enum-initializers */
/* eslint-disable no-console */
/* eslint-disable react/no-unknown-property */
import React, { useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import "./index.less";
import { Button } from "@douyinfe/semi-ui";
import { useMemoizedFn } from "ahooks";

const prefix = "page-threejs-2d-plane-lock";
const RECT_START_POSITION = [-2, 1, 0];
const RECT_TARGET_POSITION = [1, -2, 0];
const FOOT_LENGTH = 0.01;

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

    if (
      Math.abs(lineRectRef.current.position.x - cubeTarget[0]) > FOOT_LENGTH
    ) {
      lineRectRef.current.position.x += 0.01 * distanceX;
    }

    if (
      Math.abs(lineRectRef.current.position.y - cubeTarget[1]) > FOOT_LENGTH
    ) {
      lineRectRef.current.position.y += 0.01 * distanceY;
    }
  });

  return (
    <mesh>
      <Line
        ref={lineRectRef}
        position={[-2, 1, 0]}
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

const ThreeDimPlaneLock = () => {
  const [rectKey, setRectKey] = useState("rectInit");

  const handleClick = useMemoizedFn(() => {
    setRectKey(Date.now().toString());
  });

  return (
    <div className={prefix}>
      <div>
        <Button theme="solid" onClick={handleClick}>移动矩形方块</Button>
      </div>
      <div className={`${prefix}-canvas`}>
        <Canvas>
          <LineRect
            key={rectKey}
            cubeStartPosition={RECT_START_POSITION}
            cubeTarget={RECT_TARGET_POSITION}
          />
          <gridHelper args={[30, 50]} rotation={[0.5 * Math.PI, 0, 0]} />
          <OrbitControls enableRotate={false} makeDefault />
        </Canvas>
      </div>
    </div>
  );
};

export default ThreeDimPlaneLock;
