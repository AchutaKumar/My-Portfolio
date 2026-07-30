import React, { useEffect, useMemo, useRef, useState } from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function PerspectiveGrid({
  className = '',
  gridSize = 36,
  showOverlay = true,
  fadeRadius = 80,
}) {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [bounds, setBounds] = useState({ width: 0, height: 0, left: 0, top: 0 });

  useEffect(() => {
    setMounted(true);

    const updateBounds = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setBounds({ width: rect.width, height: rect.height, left: rect.left, top: rect.top });
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);

    const handlePointerMove = (event) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPointer({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    };

    window.addEventListener('mousemove', handlePointerMove);

    return () => {
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  const handleMouseMove = (event) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPointer({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  const tiles = useMemo(() => Array.from({ length: gridSize * gridSize }), [gridSize]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPointer({ x: -1000, y: -1000 })}
      className={cn('pointer-events-none relative h-full w-full overflow-hidden bg-transparent', className)}
      style={{
        perspective: '2000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="absolute aspect-square w-[80rem] origin-center grid"
        style={{
          left: '50%',
          top: '50%',
          transform:
            'translate(-50%, -50%) rotateX(30deg) rotateY(-5deg) rotateZ(20deg) scale(2)',
          transformStyle: 'preserve-3d',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {mounted &&
          tiles.map((_, i) => {
            const row = Math.floor(i / gridSize);
            const col = i % gridSize;
            const relativeX = bounds.width ? (col / gridSize) * bounds.width : 0;
            const relativeY = bounds.height ? (row / gridSize) * bounds.height : 0;
            const distance = Math.hypot(pointer.x - relativeX, pointer.y - relativeY);
            const maxDistance = Math.max(bounds.width, bounds.height) * 0.16;
            const intensity = Math.max(0, 1 - distance / maxDistance);
            const isActive = intensity > 0.03;

            return (
              <div
                key={i}
                className="min-h-[1px] min-w-[1px] border border-[#2d2d2d] bg-transparent transition-all duration-200"
                style={{
                  borderColor: isActive ? 'rgba(204, 255, 0, 0.9)' : '#2d2d2d',
                  backgroundColor: isActive ? `rgba(204, 255, 0, ${0.08 + intensity * 0.2})` : 'transparent',
                  transform: isActive ? 'scale(1.06)' : 'scale(1)',
                  boxShadow: isActive ? 'inset 0 0 0 1px rgba(204, 255, 0, 0.3)' : 'none',
                }}
              />
            );
          })}
      </div>

      {showOverlay && (
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: `radial-gradient(circle, transparent 25%, rgba(12, 12, 12, 0.35) ${fadeRadius}%)`,
          }}
        />
      )}
    </div>
  );
}

export default PerspectiveGrid;
