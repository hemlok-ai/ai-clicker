// src/components/BackgroundEffect.tsx
import React from 'react';
import './BackgroundEffect.css'; // 専用のCSSファイルをインポート

const BackgroundEffect: React.FC = () => {
  // 適当な数のパーティクルを生成
  const particles = Array.from({ length: 50 }).map((_, i) => (
    <div
      key={i}
      className="particle"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 10 + 5}s`, // 5〜15秒のランダムな速度
        animationDelay: `${Math.random() * -10}s`, // 初期位置をランダムにするためのディレイ
        // particleサイズをランダムにする
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
      }}
    />
  ));

  return <div className="background-effect-container">{particles}</div>;
};

export default BackgroundEffect;