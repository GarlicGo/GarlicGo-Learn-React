import React, { useState } from "react";
import { Button, Input, Radio, RadioGroup, Space } from "@douyinfe/semi-ui";
import { useMemoizedFn } from "ahooks";
import { RadioChangeEvent } from "@douyinfe/semi-ui/lib/es/radio";

const CANVAS_SIZE = 100;
enum RenderType {
  Canvas = "Canvas",
  OffScreenCanvas = "OffScreenCanvas",
}

const Watermark = () => {
  const [renderType, setRenderType] = useState<RenderType>(RenderType.Canvas);
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

  const handleRenderInOffScreenCanvas = useMemoizedFn(() => {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", `${CANVAS_SIZE}px`);
    canvas.setAttribute("height", `${CANVAS_SIZE}px`);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.rotate((-20 * Math.PI) / 180);
    ctx.font = "16px normal";
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    setBgUrl(canvas.toDataURL("image/png"));
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

  const handleRender = useMemoizedFn(() => {
    if (renderType === RenderType.Canvas) {
      handleRenderInCanvas();
      handleCanvasRenderBg();
    }
    if (renderType === RenderType.OffScreenCanvas) {
      handleRenderInOffScreenCanvas();
    }
  });

  const handleRadioGroupChange = useMemoizedFn((value: RadioChangeEvent) => {
    if (value.target.value === RenderType.Canvas) {
      setRotate(-20);
    }
    setRenderType(value.target.value);
  });

  return (
    <div
      style={{
        backgroundImage: `url("${bgUrl}")`,
        minHeight: "60vh",
      }}
    >
      <h1>前端明水印</h1>
      <RadioGroup
        type="button"
        buttonSize="large"
        defaultValue={RenderType.Canvas}
        onChange={handleRadioGroupChange}
      >
        <Radio value={RenderType.Canvas}>Canvas 渲染</Radio>
        <Radio value={RenderType.OffScreenCanvas}>离屏 Canvas 渲染</Radio>
      </RadioGroup>
      <div
        style={{
          margin: "20px 0",
        }}
      >
        <Space>
          <Input
            placeholder="请输入生成水印的内容"
            onChange={handleInputChange}
            maxLength={10}
          />
          <Button
            disabled={renderType !== RenderType.Canvas}
            onClick={handleRenderInCanvas}
          >
            在canvas中渲染
          </Button>
          <Button onClick={handleRender}>生成并应用水印</Button>
        </Space>
      </div>
      <div>
        {renderType === RenderType.Canvas && (
          <canvas
            ref={canvasRef}
            style={{
              border: "1px solid #000",
            }}
            id="canvas"
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
          />
        )}
        {renderType === RenderType.OffScreenCanvas && <div>离屏渲染</div>}
      </div>
    </div>
  );
};

export default React.memo(Watermark);
