import React, { useEffect, useRef } from 'react';

export const AuroraCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Stars background
    const stars = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
    }));

    const render = () => {
      time += 0.005;
      const width = canvas.width;
      const height = canvas.height;

      // Dark deep wine canvas background (#0d0208)
      ctx.fillStyle = '#0d0208';
      ctx.fillRect(0, 0, width, height);

      // Render twinkling stars
      ctx.save();
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.alpha += Math.sin(time * 5 + i) * 0.01;
        const currentAlpha = Math.max(0.15, Math.min(1, star.alpha));
        
        ctx.fillStyle = `rgba(255, 240, 245, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, Math.max(0, star.radius), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Render Deep Wine & Rose Gold Aurora Mesh
      const auroraGradient1 = ctx.createRadialGradient(
        width * (0.3 + Math.sin(time * 0.8) * 0.2),
        height * (0.2 + Math.cos(time * 0.6) * 0.15),
        20,
        width * 0.3,
        height * 0.3,
        width * 0.75
      );
      auroraGradient1.addColorStop(0, 'rgba(74, 14, 46, 0.45)'); // Burgundy wine
      auroraGradient1.addColorStop(0.5, 'rgba(225, 29, 72, 0.22)'); // Rose
      auroraGradient1.addColorStop(1, 'rgba(13, 2, 8, 0)');

      ctx.fillStyle = auroraGradient1;
      ctx.fillRect(0, 0, width, height);

      const auroraGradient2 = ctx.createRadialGradient(
        width * (0.7 + Math.cos(time * 0.7) * 0.2),
        height * (0.6 + Math.sin(time * 0.5) * 0.2),
        30,
        width * 0.7,
        height * 0.6,
        width * 0.8
      );
      auroraGradient2.addColorStop(0, 'rgba(245, 158, 11, 0.22)'); // Champagne gold
      auroraGradient2.addColorStop(0.5, 'rgba(190, 18, 60, 0.18)'); // Deep crimson
      auroraGradient2.addColorStop(1, 'rgba(13, 2, 8, 0)');

      ctx.fillStyle = auroraGradient2;
      ctx.fillRect(0, 0, width, height);

      // Wave path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height * 0.4);
      for (let x = 0; x <= width; x += 30) {
        const y = height * 0.35 +
          Math.sin(x * 0.003 + time * 1.2) * 60 +
          Math.cos(x * 0.002 - time * 0.8) * 40;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const waveGrad = ctx.createLinearGradient(0, height * 0.2, 0, height);
      waveGrad.addColorStop(0, 'rgba(219, 39, 119, 0.08)');
      waveGrad.addColorStop(0.5, 'rgba(124, 58, 237, 0.05)');
      waveGrad.addColorStop(1, 'rgba(6, 3, 13, 0.8)');
      ctx.fillStyle = waveGrad;
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
