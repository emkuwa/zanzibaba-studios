'use client';

import { useEffect, useState } from 'react';

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let target = { x: -100, y: -100 };
    const onMove = (e: MouseEvent) => {
      target = { x: e.clientX, y: e.clientY };
      setPos(target);
      const targetEl = e.target as HTMLElement | null;
      const interactive = targetEl?.closest('a, button, [data-cursor]');
      setHover(Boolean(interactive));
    };
    const loop = () => {
      setRing((prev) => ({
        x: prev.x + (target.x - prev.x) * 0.18,
        y: prev.y + (target.y - prev.y) * 0.18,
      }));
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          transform: `translate(${pos.x - 4}px, ${pos.y - 4}px) scale(${hover ? 0.4 : 1})`,
        }}
      />
      <div
        className="cursor-ring"
        style={{
          transform: `translate(${ring.x - 18}px, ${ring.y - 18}px) scale(${hover ? 1.6 : 1})`,
          borderColor: hover ? 'rgba(34,211,238,0.8)' : 'rgba(255,90,20,0.6)',
        }}
      />
    </>
  );
}
