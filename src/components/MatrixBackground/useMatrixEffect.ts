import { useEffect, RefObject } from 'react';

const CHARACTERS = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789'.split('');

export function useMatrixEffect(canvasRef: RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let drops: number[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = Array(Math.ceil(canvas.width / 20))
        .fill(0)
        .map(() => Math.floor(Math.random() * -canvas.height));
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F0';
      ctx.font = '20px monospace';
      
      drops.forEach((y, i) => {
        const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        const x = i * 20;
        
        ctx.fillText(char, x, y);
        
        if (y > canvas.height) {
          drops[i] = 0;
        } else {
          drops[i] = y + 20;
        }
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
}