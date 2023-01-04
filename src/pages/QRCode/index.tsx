import React, { useRef } from 'react';
import jsQR from 'jsqr';
import { useMemoizedFn, useMount } from 'ahooks';

const QRCodeFC = () => {
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef(document.createElement('video'));

  const tick = useMemoizedFn(() => {
    const video = videoRef.current;
    const canvasElement = canvasElementRef.current;
    if (!video || !canvasElement) {
      return;
    }
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      // console.log('false', video.readyState);
    }
    const canvas = canvasElement.getContext('2d');
    if (!canvas) {
      return;
    }

    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    const imageData = canvas.getImageData(
      0,
      0,
      canvasElement.width,
      canvasElement.height,
    );
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });
    if (!code) {
      requestAnimationFrame(tick);
    }
  });

  useMount(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(function (stream) {
        const video = videoRef.current;
        video.srcObject = stream;
        video.setAttribute('playsinline', 'true');
        video.play();
        requestAnimationFrame(tick);
      });
  });

  return (
    <div>
      <div>QRcode</div>
      <canvas ref={canvasElementRef} id="canvas" />
    </div>
  );
};

export default React.memo(QRCodeFC);
