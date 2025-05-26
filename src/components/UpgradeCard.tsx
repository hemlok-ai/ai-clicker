// src/components/UpgradeCard.tsx
import React from 'react';
import { type Upgrade } from '../types';

interface UpgradeCardProps {
  upgrade: Upgrade;
  currentAiPoints: number;
  onBuy: (upgradeId: string, cost: number) => void;
}

const UpgradeCard: React.FC<UpgradeCardProps> = ({ upgrade, currentAiPoints, onBuy }) => {
  // すでに購入済み、またはAPが足りない、またはアンロックされていない場合は購入不可
  const canBuy = !upgrade.purchased && currentAiPoints >= upgrade.cost && upgrade.unlocked;

  if (!upgrade.unlocked) {
    // アンロックされていないアップグレードは表示しない (またはグレーアウトするなど)
    return null;
  }

  return (
    <div className="bg-gray-700 p-3 rounded-lg shadow-md mb-3 border border-gray-600">
      <h3 className="text-lg font-bold text-white mb-1">{upgrade.name}</h3>
      <p className="text-gray-300 text-sm mb-2">{upgrade.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-yellow-300">コスト: {upgrade.cost} AP</p>
        {upgrade.purchased ? (
          <span className="text-green-400 font-bold">購入済み</span>
        ) : (
          <button
            className={`px-3 py-1 rounded-md font-bold text-white text-sm transition-colors duration-200
                        ${canBuy ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-500 cursor-not-allowed'}`}
            onClick={() => onBuy(upgrade.id, upgrade.cost)}
            disabled={!canBuy}
          >
            購入
          </button>
        )}
      </div>
    </div>
  );
};

export default UpgradeCard;