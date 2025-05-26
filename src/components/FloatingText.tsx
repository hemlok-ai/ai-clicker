// src/components/FloatingText.tsx
import React, { useEffect, useState } from 'react';

interface FloatingTextProps {
  id: string;
  value: number;
  onFadeOut: (id: string) => void;
  x: number;
  y: number;
}

const FloatingText: React.FC<FloatingTextProps> = ({ id, value, onFadeOut, x, y }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const animationDuration = 800;
    const fadeOutDelay = 100;

    const timer = setTimeout(() => {
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / animationDuration;

        if (progress < 1) {
          setOpacity(1 - progress);
          setOffsetY(-50 * progress);
          requestAnimationFrame(animate);
        } else {
          setIsVisible(false);
          onFadeOut(id);
        }
      };
      requestAnimationFrame(animate);
    }, fadeOutDelay);

    return () => clearTimeout(timer);
  }, [id, onFadeOut]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute text-3xl font-bold text-blue-300 pointer-events-none whitespace-nowrap"
      style={{
        left: `${x}px`,
        top: `${y + offsetY}px`,
        opacity: opacity,
        transform: 'translateX(-50%)',
        textShadow: '0 0 5px rgba(0,255,255,0.7)'
      }}
    >
      +{value.toFixed(1)} AP
    </div>
  );
};

export default FloatingText; // ★この行が重要です。ファイルの一番最後に存在することを確認してください。★