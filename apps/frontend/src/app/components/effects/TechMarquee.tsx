'use client';

import { useEffect, useRef } from 'react';
import { 
  IconBrandReact, 
  IconBrandNextjs, 
  IconBrandTypescript, 
  IconBrandNodejs, 
  IconBrandPython, 
  IconDatabase, 
  IconBrandAws, 
  IconBrandDocker, 
  IconBrandGraphql,
  IconServer
} from '@tabler/icons-react';

class DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  value: string;
  color: string;

  constructor(x: number, y: number) {
    // Start randomly around the badge center
    this.x = x + (Math.random() - 0.5) * 60;
    this.y = y + (Math.random() - 0.5) * 30;
    
    // Slow drift, falling down and slightly outwards
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = Math.random() * 0.6 + 0.2; // Gravity pulling down
    
    this.life = 1.0; // 1.0 to 0
    this.size = Math.random() * 6 + 8; // Restored smaller size
    this.value = Math.random() > 0.5 ? '1' : '0';
    this.color = Math.random() > 0.5 ? '#0A84FF' : '#9CA3AF';
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 0.012; // Restored faster dissolve rate
    if (Math.random() < 0.02) {
      this.value = this.value === '1' ? '0' : '1'; // Flicker effect
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    // Restored max opacity to 0.25
    ctx.globalAlpha = Math.max(0, this.life * 0.32); 
    ctx.fillStyle = this.color;
    ctx.font = `${this.size}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.value, this.x, this.y);
    ctx.restore();
  }
}

export default function TechMarquee() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgesRef = useRef<(HTMLDivElement | null)[]>([]);

  const techStack = [
    { name: "React.js", icon: <IconBrandReact size={24} stroke={2} /> },
    { name: "Next.js", icon: <IconBrandNextjs size={24} stroke={2} /> },
    { name: "TypeScript", icon: <IconBrandTypescript size={24} stroke={2} /> },
    { name: "Node.js", icon: <IconBrandNodejs size={24} stroke={2} /> },
    { name: "NestJS", icon: <IconServer size={24} stroke={2} /> },
    { name: "Python", icon: <IconBrandPython size={24} stroke={2} /> },
    { name: "PostgreSQL", icon: <IconDatabase size={24} stroke={2} /> },
    { name: "Redis", icon: <IconDatabase size={24} stroke={2} /> },
    { name: "GraphQL", icon: <IconBrandGraphql size={24} stroke={2} /> },
    { name: "Docker", icon: <IconBrandDocker size={24} stroke={2} /> },
    { name: "AWS", icon: <IconBrandAws size={24} stroke={2} /> },
    { name: "React Native", icon: <IconBrandReact size={24} stroke={2} /> }
  ];

  const CIRCLE_SIZE = 950;
  const RADIUS = CIRCLE_SIZE / 2;

  useEffect(() => {
    // Disable on mobile for performance
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    let particles: DustParticle[] = [];
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const canvasRect = canvas.getBoundingClientRect();

      badgesRef.current.forEach((badge) => {
        if (!badge) return;
        const rect = badge.getBoundingClientRect();
        // Calculate center of the badge relative to the canvas
        const centerX = rect.left - canvasRect.left + rect.width / 2;
        const centerY = rect.top - canvasRect.top + rect.height / 2;

        // Strictly target only the regions where the badge is actively fading (not completely invisible)
        // Left fade: 2% to 15%. Right fade: 85% to 98%. Bottom fade: 40% to 55%.
        const inLeftFade = centerX > width * 0.00 && centerX < width * 0.15 && centerY < height * 0.55;
        const inRightFade = centerX > width * 0.85 && centerX < width * 1.00 && centerY < height * 0.55;
        const inBottomFade = centerY > height * 0.40 && centerY < height * 0.55;

        if (inLeftFade || inRightFade || inBottomFade) {
          // Restored spawn chance back to 5%
          if (Math.random() < 0.05) { 
             particles.push(new DustParticle(centerX, centerY));
          }
        }
      });

      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
    >
      {/* Particle Canvas overlaid on top, NOT masked so particles can drift outside the visible badges */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* 
        We combine BOTH masks (horizontal and vertical) on this single wrapper.
        No more nested absolute wrappers resetting the layout context.
      */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 55%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 55%, rgba(0,0,0,0) 100%)',
          WebkitMaskComposite: 'source-in',
          maskComposite: 'intersect'
        }}
      >
        {/* Centering Wrapper that won't be overwritten by the rotate animation */}
        <div 
          className="absolute top-1/2 left-1/2"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          {/* The Rotating Planetary Ring */}
          <div 
            className="rounded-full border border-white/5 pointer-events-auto group"
            style={{
              width: `${CIRCLE_SIZE}px`,
              height: `${CIRCLE_SIZE}px`,
              animation: 'orbit-spin 200s linear infinite',
              boxShadow: '0 0 50px rgba(66, 133, 244, 0.03), inset 0 0 50px rgba(154, 103, 234, 0.03)'
            }}
          >
          {/* Tech Items */}
          {techStack.map((tech, i) => {
            const rotation = i * (360 / techStack.length);
            return (
              <div 
                key={i}
                className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div 
                  className="absolute top-0 left-0"
                  style={{ transform: `translate(-50%, -${RADIUS}px)` }}
                >
                  <div 
                    className="group-hover:[animation-play-state:paused]" 
                    style={{ animation: 'orbit-spin-reverse 200s linear infinite' }}
                  >
                    <div 
                      ref={(el) => { badgesRef.current[i] = el; }}
                      className="flex items-center justify-center gap-3 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer bg-[#050B14]/80 backdrop-blur-md border border-white/10 px-6 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] pointer-events-auto"
                      style={{ height: '50px', transform: `rotate(-${rotation}deg)` }}
                    >
                      <div className="opacity-70">{tech.icon}</div>
                      <span className="font-display-md text-lg font-bold tracking-wide whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
}