/* eslint-disable @typescript-eslint/prefer-enum-initializers */
/* eslint-disable no-console */
/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import { Canvas, Vector3 } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { Button } from "@douyinfe/semi-ui";
import { useMemoizedFn } from "ahooks";
import "./index.less";

const prefix = "page-react-spring";

const LineRect = () => {

  const { position } = useSpring({
    to: {
      position: [1, 1, 1],
    },
    from: { position: [0, 0, 0] },
    config: { mass: 5, tension: 500, friction: 150 },
  });

  return (
    <animated.mesh position={position as unknown as Vector3}>
      <Line
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
    </animated.mesh>
  );
};

const ReactSpring = () => {
  const [key, setKey] = useState('');

  const handleScale = useMemoizedFn(() => {
    setKey(Date.now().toString());
  });

  return (
    <div className={prefix}>
      <h1>React Spring</h1>
      <div>
        <Button theme="solid" onClick={handleScale}>
          运动
        </Button>
      </div>
      <div className={`${prefix}-canvas`}>
        <Canvas>
          <LineRect key={key} />
          <gridHelper args={[30, 50]} rotation={[0.5 * Math.PI, 0, 0]} />
          <OrbitControls enableRotate={false} makeDefault />
        </Canvas>
      </div>
    </div>
  );
};

export default React.memo(ReactSpring);
