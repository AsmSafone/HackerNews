import React, { useRef } from 'react';
import { useMatrixEffect } from './useMatrixEffect';

export const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useMatrixEffect(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ opacity: 0.3 }}
    />
  );
};