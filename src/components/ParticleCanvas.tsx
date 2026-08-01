import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: 'balloon' | 'firefly' | 'sparkle' | 'confetti' | 'touch';
  color: string;
  alpha: number;
  rotation: number;
  rotationSpeed: number;
  wobble?: number;
  wobbleSpeed?: number;
  stringLength?: number;
  life?: number;
  maxLife?: number;
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];

    // Color palettes for balloons and celebration effects
    const balloonColors = ['#f43f5e', '#fb7185', '#f59e0b', '#fbbf24', '#a855f7', '#ec4899', '#38bdf8'];
    const celebrationColors = ['#f43f5e', '#fbbf24', '#f59e0b', '#f472b6', '#60a5fa', '#34d399', '#fb7185'];

    // 1. Spawn floating balloons (continuous motion rising slowly)
    for (let i = 0; i < 14; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height + height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.7 - 0.3,
        size: Math.random() * 12 + 14,
        type: 'balloon',
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
        alpha: Math.random() * 0.55 + 0.35,
        rotation: 0,
        rotationSpeed: 0,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.01,
        stringLength: Math.random() * 25 + 20,
      });
    }

    // 2. Spawn golden & rose fireflies / sparkles
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3.5 + 1.2,
        type: 'firefly',
        color: Math.random() > 0.4 ? '#fde047' : '#fda4af',
        alpha: Math.random() * 0.8 + 0.2,
        rotation: 0,
        rotationSpeed: 0,
      });
    }

    // 3. Spawn floating sparkling stars & confetti dust
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: Math.random() * 0.6 + 0.2,
        size: Math.random() * 8 + 6,
        type: 'confetti',
        color: celebrationColors[Math.floor(Math.random() * celebrationColors.length)],
        alpha: Math.random() * 0.7 + 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
      });
    }

    // Touch / Click fireworks particle explosion generator
    const createTouchBurst = (clientX: number, clientY: number) => {
      for (let i = 0; i < 24; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 2;
        particles.push({
          x: clientX,
          y: clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          size: Math.random() * 7 + 4,
          type: 'touch',
          color: celebrationColors[Math.floor(Math.random() * celebrationColors.length)],
          alpha: 1,
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.15,
          life: 0,
          maxLife: 50 + Math.random() * 35,
        });
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      let x = 0;
      let y = 0;
      if ('touches' in e) {
        if (e.touches.length > 0) {
          x = e.touches[0].clientX;
          y = e.touches[0].clientY;
        }
      } else {
        x = (e as MouseEvent).clientX;
        y = (e as MouseEvent).clientY;
      }
      createTouchBurst(x, y);
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('touchstart', handlePointerDown, { passive: true });

    // Helper: Draw Balloon with String
    const drawBalloon = (
      x: number,
      y: number,
      radius: number,
      color: string,
      alpha: number,
      wobble: number,
      stringLength: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha;

      const tilt = Math.sin(wobble) * 0.12;
      ctx.rotate(tilt);

      // Balloon Oval Body
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.max(0, radius * 0.85), Math.max(0, radius * 1.15), 0, 0, Math.PI * 2);
      ctx.fill();

      // Shiny Highlight Arc
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.beginPath();
      ctx.ellipse(-radius * 0.3, -radius * 0.35, Math.max(0, radius * 0.25), Math.max(0, radius * 0.45), -0.4, 0, Math.PI * 2);
      ctx.fill();

      // Balloon Knot
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(-3, radius * 1.15);
      ctx.lineTo(3, radius * 1.15);
      ctx.lineTo(0, radius * 1.15 + 4);
      ctx.closePath();
      ctx.fill();

      // Balloon Ribbon / String
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, radius * 1.15 + 4);
      const cp1x = Math.sin(wobble * 2) * 8;
      const cp2x = Math.cos(wobble * 2) * -8;
      ctx.bezierCurveTo(
        cp1x,
        radius * 1.15 + stringLength * 0.4,
        cp2x,
        radius * 1.15 + stringLength * 0.7,
        0,
        radius * 1.15 + stringLength
      );
      ctx.stroke();

      ctx.restore();
    };

    // Helper: Draw Confetti Piece
    const drawConfetti = (x: number, y: number, size: number, color: string, alpha: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.fillRect(-size / 2, -size / 4, size, size / 2);
      ctx.restore();
    };

    // Animation Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.type === 'balloon') {
          if (p.wobble !== undefined && p.wobbleSpeed !== undefined) {
            p.wobble += p.wobbleSpeed;
            p.x += Math.sin(p.wobble) * 0.6;
          }

          drawBalloon(
            p.x,
            p.y,
            p.size,
            p.color,
            p.alpha,
            p.wobble || 0,
            p.stringLength || 30
          );

          // Wrap top
          if (p.y < -60) {
            p.y = height + 60;
            p.x = Math.random() * width;
          }
        } else if (p.type === 'firefly') {
          p.vx += (Math.random() - 0.5) * 0.1;
          p.vy += (Math.random() - 0.5) * 0.1;

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        } else if (p.type === 'confetti') {
          p.x += Math.sin(p.y * 0.02) * 0.5;
          drawConfetti(p.x, p.y, p.size, p.color, p.alpha, p.rotation);

          if (p.y > height + 30) {
            p.y = -30;
            p.x = Math.random() * width;
          }
        } else if (p.type === 'touch') {
          if (p.life !== undefined && p.maxLife !== undefined) {
            p.life++;
            p.alpha = Math.max(0, 1 - p.life / p.maxLife);
            p.vy += 0.08; // subtle gravity

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            const currentRadius = Math.max(0, p.size * (1 - p.life / p.maxLife));
            ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            if (p.life >= p.maxLife) {
              particles.splice(i, 1);
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  );
};
