'use client';

import { useEffect, useRef } from 'react';

// Highly optimized particle class for physics processing
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  opacity: number;
  angle: number;
  color: string;

  value: string;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = 0;
    this.vy = 0;
    // Slow, space-like drift
    this.baseVx = (Math.random() - 0.5) * 0.1;
    this.baseVy = (Math.random() - 0.5) * 0.1;
    this.size = Math.random() * 8 + 8; // Size for font
    this.opacity = Math.random() * 0.08 + 0.01; // Extremely reduced opacity for minimal dust
    this.angle = 0; 
    this.color = Math.random() > 0.5 ? '#0A84FF' : '#9CA3AF'; // Blue or gray numbers
    this.value = Math.random() > 0.5 ? '1' : '0'; // Binary numbers
  }

  update(mouseX: number, mouseY: number, width: number, height: number) {
    // 1. Calculate distance to mouse
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // 2. Interaction radius (Liquid/Swirl physics)
    const interactionRadius = 350;
    
    if (dist < interactionRadius && mouseX > 0) {
      const force = (interactionRadius - dist) / interactionRadius;
      
      const ax = (dx / dist) * force;
      const ay = (dy / dist) * force;
      
      const sx = (dy / dist) * force;
      const sy = -(dx / dist) * force;
      
      this.vx += (ax * 0.1) + (sx * 0.3); 
      this.vy += (ay * 0.1) + (sy * 0.3);
      
      this.opacity = Math.min(this.opacity + 0.02, 0.6);
    } else {
      if (this.opacity > 0.05) this.opacity -= 0.005;
    }

    this.vx *= 0.95;
    this.vy *= 0.95;

    // 4. Constant background drift
    this.x += this.vx + this.baseVx;
    this.y += this.vy + this.baseVy;

    // 5. Screen Wrapping
    if (this.x < -50) this.x = width + 50;
    if (this.x > width + 50) this.x = -50;
    if (this.y < -50) this.y = height + 50;
    if (this.y > height + 50) this.y = -50;

    if (Math.random() < 0.01) {
      this.value = this.value === '1' ? '0' : '1';
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.shadowBlur = 6;
    ctx.shadowColor = this.color;
    
    ctx.font = `${this.size}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.value, 0, 0);
    
    ctx.restore();
  }
}

export default function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable completely on mobile for performance
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouseX = -1000;
    let mouseY = -1000;
    
    // Smooth mouse coordinates for parallax
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      targetParallaxX = (e.clientX / width - 0.5) * 2;
      targetParallaxY = (e.clientY / height - 0.5) * 2;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      targetParallaxX = 0;
      targetParallaxY = 0;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    let particles: Particle[] = [];
    const initParticles = () => {
      particles = [];
      // Calculate how many particles fit on the screen.
      // We need a much higher global count so that the 300px mouse radius captures a good amount.
      const density = Math.floor((width * height) / 12000); 
      const particleCount = Math.min(density, 120); 
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
      }
    };
    initParticles();

    let animationFrameId: number;

    const render = () => {
      // 1. Process subtle UI parallax shift
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.03;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.03;
      
      container.style.transform = `translate(${currentParallaxX * -10}px, ${currentParallaxY * -10}px)`;

      // 2. Clear frame
      ctx.clearRect(0, 0, width, height);

      // 3. Draw subtle mouse glow
      if (mouseX > 0 && mouseY > 0) {
        const glowRadius = 300;
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, glowRadius);
        gradient.addColorStop(0, 'rgba(10, 132, 255, 0.05)'); 
        gradient.addColorStop(0.5, 'rgba(154, 103, 234, 0.02)'); 
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // 4. Process Physics & Draw
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouseX, mouseY, width, height);
        particles[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black" 
      aria-hidden="true"
    >
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-screen pointer-events-none z-0"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      <div ref={containerRef} className="w-full h-full will-change-transform scale-110 relative z-10">
        <canvas ref={canvasRef} className="w-full h-full hidden md:block" />
        
        <div className="absolute -left-[20%] top-1/4 w-[80vw] h-[80vh] rounded-full bg-gradient-to-tr from-[#9A67EA]/10 via-[#0A84FF]/5 to-transparent blur-[120px] -z-10" />
      </div>
      
      <div className="md:hidden absolute inset-0 bg-transparent">
        <div className="absolute -left-[30%] top-0 w-[150vw] h-[80vh] rounded-full bg-gradient-to-tr from-[#9A67EA]/10 via-[#0A84FF]/5 to-transparent blur-[100px]" />
      </div>
    </div>
  );
}
