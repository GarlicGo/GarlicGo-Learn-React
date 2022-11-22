/* eslint-disable no-console */
/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls, Text } from "@react-three/drei";
import { useMemoizedFn, useMount } from "ahooks";
import { animated, useSpring } from "@react-spring/three";
import "./index.less";
import { Button, Space } from "@douyinfe/semi-ui";

const prefix = "page-frame-animation";
// ms
const DURATION_TIME = 1000;

type Number3 = [number, number, number];

const ROUTES: Number3[] = [
  [0, 0, 0],
  [1, 0, 0],
  [1, 1, 0],
  [1, 2, 0],
  [2, 2, 0],
  [3, 2, 0],
  [3, 3, 0],
  [4, 3, 0],
  [5, 3.5, 0],
  [6, 4, 0],
  [7, 4, 0],
];

const LINE_POINTS_STORAGE: Number3[] = [...ROUTES];

const RECT_POINTS_STORAGE: Number3[] = [[0, 0, 0], [0, 0, 0], ...ROUTES];

interface LineGuideProps {
  historyPoints: Number3[];
  targetPoint: Number3;
  onRest: () => void;
}

const LineGuide: React.FC<LineGuideProps> = ({
  historyPoints,
  targetPoint,
  onRest,
}) => {
  const [lastPoint, setLastPoint] = useState<Number3>([0, 0, 0]);

  useSpring({
    to: {
      lastPoint: targetPoint,
    },
    from: { lastPoint: historyPoints[historyPoints.length - 1] || [0, 0, 0] },
    config: { duration: DURATION_TIME },
    onRest: onRest,
    onChange: ({ value }) => {
      setLastPoint(value.lastPoint);
    },
  });

  return (
    <mesh>
      <Line
        position={[0, 0, 0]}
        points={[...historyPoints, lastPoint]}
        color="green"
        lineWidth={2}
      />
    </mesh>
  );
};

interface LineRectProps {
  startPosition: Number3;
  targetPosition: Number3;
  onRest: () => void;
}

const LineRect: React.FC<LineRectProps> = ({
  startPosition,
  targetPosition,
  onRest,
}) => {
  const { position } = useSpring({
    to: {
      position: targetPosition,
    },
    from: { position: startPosition },
    config: { duration: DURATION_TIME },
    onRest: onRest,
  });

  return (
    <animated.mesh position={position}>
      <Line
        points={[
          [-0.5, -0.5, 0],
          [0.5, -0.5, 0],
          [0.5, 0.5, 0],
          [-0.5, 0.5, 0],
          [-0.5, -0.5, 0],
        ]}
        color="blue"
        lineWidth={2}
      />
    </animated.mesh>
  );
};

const FrameAnimation = () => {
  const [linePoints, setLinePoints] = useState<Number3[]>([]);
  const [lineHistoryPoints, setLineHistoryPoints] = useState<Number3[]>([]);
  const [lineNextPoint, setLineNextPoint] = useState<Number3>([0, 0, 0]);

  const [rectPoints, setRectPoints] = useState<Number3[]>([]);
  const [rectStart, setRectStartPosition] = useState<Number3>([0, 0, 0]);
  const [rectTarget, setRectTargetPosition] = useState<Number3>([0, 0, 0]);

  const handleInit = useMemoizedFn(() => {
    const linePointsStorage = [...LINE_POINTS_STORAGE];
    const lineStart = linePointsStorage.shift();
    const lineNext = linePointsStorage.shift();

    const rectPointsStorage = [...RECT_POINTS_STORAGE];
    const rectStart = rectPointsStorage.shift();
    const rectNext = rectPointsStorage.shift();

    if (!lineStart || !lineNext || !rectStart || !rectNext) {
      return;
    }
    setLineHistoryPoints([lineStart]);
    setLineNextPoint(lineNext);

    setRectStartPosition(rectStart);
    setRectTargetPosition(rectNext);

    setLinePoints(linePointsStorage);
    setRectPoints(rectPointsStorage);
  });

  useMount(() => {
    handleInit();
  });

  const handleLineGuideRest = useMemoizedFn(() => {
    const linePointsStorage = linePoints;
    const rectPointsStorage = rectPoints;
    const next = linePointsStorage.shift();
    if (!next) {
      return;
    }
    setLineHistoryPoints([...lineHistoryPoints, lineNextPoint]);
    if (rectStart.toString() === rectTarget.toString()) {
      const rectNext = rectPointsStorage.shift();
      if (!rectNext) {
        return;
      }
      setRectStartPosition(rectTarget);
      setRectTargetPosition(rectNext);
      setLinePoints(linePointsStorage);
      setRectPoints(rectPointsStorage);
    }

    setLineNextPoint(next);
  });

  const handleRectRest = useMemoizedFn(() => {
    console.log("handleRectRest");
    const rectPointsStorage = rectPoints;
    const next = rectPointsStorage.shift();
    if (!next) {
      return;
    }
    setRectTargetPosition(next);
    setRectPoints(rectPointsStorage);
  });

  const handleMoveRect = useMemoizedFn(() => {
    handleInit();
  });

  return (
    <div className={prefix}>
      <div className={`${prefix}-canvas-opts`}>
        <Space>
          <Button theme="solid" onClick={handleMoveRect}>
            重新播放
          </Button>
        </Space>
      </div>
      <div className={`${prefix}-canvas`}>
        <div className={`${prefix}-canvas-container`}>
          <Canvas>
            <LineGuide
              historyPoints={lineHistoryPoints}
              targetPoint={lineNextPoint}
              onRest={handleLineGuideRest}
            />
            <LineRect
              startPosition={rectStart}
              targetPosition={rectTarget}
              onRest={handleRectRest}
            />
            <Text position={[-1, 0, 0]} color={"#EC2D2D"} fontSize={0.5}>
              Start
            </Text>
            <Text position={[8, 4, 0]} color={"#EC2D2D"} fontSize={0.5}>
              End
            </Text>
            <OrbitControls makeDefault />
            <gridHelper args={[60, 100]} rotation={[0.5 * Math.PI, 0, 0]} />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FrameAnimation);
