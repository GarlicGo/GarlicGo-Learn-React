import React, { useState } from "react";
import { Button, Input, Space } from "@douyinfe/semi-ui";
import { useMemoizedFn } from "ahooks";

const Watermark = () => {
  const [bgUrl, setBgUrl] = useState("");
  const [text, setText] = useState("");
  const [rotate, setRotate] = useState(-20);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const handleInputChange = useMemoizedFn((value: string) => {
    setText(value);
  });

  const handleRenderInCanvas = useMemoizedFn(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(centerX, centerY);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);
    ctx.font = "16px normal";
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    setRotate(0);
  });

  const handleCanvasRenderBg = useMemoizedFn(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    setBgUrl(canvas.toDataURL("image/png"));
  });

  return (
    <div
      style={{
        backgroundImage: `url("${bgUrl}")`,
        minHeight: "60vh",
      }}
    >
      <h1>前端明水印</h1>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Space>
          <Input
            placeholder="请输入生成水印的内容"
            onChange={handleInputChange}
            maxLength={10}
          />
          <Button onClick={handleRenderInCanvas}>在canvas中渲染</Button>
          <Button onClick={handleCanvasRenderBg}>生成并应用水印</Button>
        </Space>
      </div>
      <div>
        <canvas
          ref={canvasRef}
          style={{
            border: "1px solid #000",
          }}
          id="canvas"
          width="60"
          height="60"
        />
      </div>
    </div>
  );
};

export default React.memo(Watermark);
