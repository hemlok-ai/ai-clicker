// src/components/UpgradeMenu.tsx
import React from 'react';
import { type Upgrade } from '../types';
import UpgradeCard from './UpgradeCard';

interface UpgradeMenuProps {
  upgrades: Upgrade[];
  currentAiPoints: number;
  onBuyUpgrade: (upgradeId: string, cost: number) => void;
}

const UpgradeMenu: React.FC<UpgradeMenuProps> = ({ upgrades, currentAiPoints, onBuyUpgrade }) => {
  // アンロックされているアップグレードのみをフィルタリングして表示
  const visibleUpgrades = upgrades.filter(u => u.unlocked);

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-xl h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
        アップグレード
      </h2>
      {visibleUpgrades.length > 0 ? (
        visibleUpgrades.map((upgrade) => (
          <UpgradeCard
            key={upgrade.id}
            upgrade={upgrade}
            currentAiPoints={currentAiPoints}
            onBuy={onBuyUpgrade}
          />
        ))
      ) : (
        <p className="text-gray-400">現在、利用可能なアップグレードはありません。</p>
      )}
    </div>
  );
};

export default UpgradeMenu;