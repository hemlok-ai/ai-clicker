// src/components/ClickerButton.tsx
import React from 'react';

interface ClickerButtonProps {
  id?: string;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  clickPower: number;
}

const ClickerButton: React.FC<ClickerButtonProps> = ({ id, onClick, clickPower }) => {
  return (
    <button
      id={id}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
                 text-white font-bold py-8 px-16 rounded-full shadow-lg transform active:scale-95
                 transition-all duration-150 ease-in-out text-4xl mb-8"
      onClick={onClick}
    >
      AIを生成
      <div className="text-xl mt-2">+{clickPower.toFixed(1)} AP</div>
    </button>
  );
};

export default ClickerButton;