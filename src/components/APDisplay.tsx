// src/components/APDisplay.tsx
import React from 'react';

interface APDisplayProps {
  aiPoints: number;
}

const APDisplay: React.FC<APDisplayProps> = ({ aiPoints }) => {
  return (
    <div className="text-3xl font-bold text-white mb-4">
      現在のAIポイント: <span className="text-blue-400">{aiPoints.toFixed(1)}</span> AP
    </div>
  );
};

export default APDisplay;