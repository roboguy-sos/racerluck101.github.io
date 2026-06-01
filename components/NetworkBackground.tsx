"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

/**
 * Lightweight canvas particle-network used as the hero / page backdrop.
 * Evokes a SOC threat-map: drifting nodes, proximity links, occasional
 * "ping" pulses. Pauses when offscreen and honours reduced-motion.
 */
export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let raf = 0;
    let running = true;
    const pings: { x: number; y: number; t: number }[] = [];

    const ACCENT = "0, 230, 118";

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // density scales with viewport, capped for performance
      const target = Math.min(90, Math.floor((width * height) / 16000));
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const linkDist = 130;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // edges
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > width) a.vx *= -1;
        if (a.y < 0 || a.y > height) a.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.18;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.55)";
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // occasional ping pulses from random nodes
      if (!reduced && pings.length < 4 && Math.random() < 0.012 && nodes.length) {
        const n = nodes[Math.floor(Math.random() * nodes.length)];
        pings.push({ x: n.x, y: n.y, t: 0 });
      }
      for (let i = pings.length - 1; i >= 0; i--) {
        const p = pings[i];
        p.t += 0.018;
        const radius = p.t * 60;
        const alpha = Math.max(0, 0.5 - p.t * 0.5);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${ACCENT},${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.stroke();
        if (p.t >= 1) pings.splice(i, 1);
      }

      raf = requestAnimationFrame(draw);
    };

    resize();

    if (reduced) {
      // static single frame for reduced-motion users
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // pause when tab hidden to save battery
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running && !reduced) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
