// src/components/RightSidebar.tsx
import React, { useState } from 'react';
import UnitShop from './UnitShop';
import UpgradeMenu from './UpgradeMenu';
import type { Unit, Upgrade } from '../types';

interface RightSidebarProps {
  currentAiPoints: number;
  units: Unit[];
  upgrades: Upgrade[];
  onBuyUnit: (unitId: string, cost: number) => void;
  onBuyUpgrade: (upgradeId: string, cost: number) => void;
}

type Tab = 'units' | 'upgrades';

const RightSidebar: React.FC<RightSidebarProps> = ({
  currentAiPoints,
  units,
  upgrades,
  onBuyUnit,
  onBuyUpgrade,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('units');

  return (
    <div className="w-full h-full bg-gray-800 border-t border-gray-700 sm:border-t-0 sm:border-l shadow-lg flex flex-col">
      {/* タブ切り替えボタン */}
      <div className="flex justify-around p-2 bg-gray-700 border-b border-gray-600">
        <button
          className={`flex-1 py-2 text-lg font-bold transition-colors duration-200 ${
            activeTab === 'units'
              ? 'text-white bg-blue-600 rounded-md'
              : 'text-gray-400 hover:text-white hover:bg-gray-600 rounded-md'
          }`}
          onClick={() => setActiveTab('units')}
        >
          ユニット
        </button>
        <button
          className={`flex-1 py-2 text-lg font-bold transition-colors duration-200 ml-2 ${
            activeTab === 'upgrades'
              ? 'text-white bg-purple-600 rounded-md'
              : 'text-gray-400 hover:text-white hover:bg-gray-600 rounded-md'
          }`}
          onClick={() => setActiveTab('upgrades')}
        >
          アップグレード
        </button>
      </div>

      {/* タブの内容 - overflow-y-auto を overflow-y-scroll に変更 */}
      <div className="flex-grow p-4 overflow-y-scroll"> {/* ★ここを修正しました！★ */}
        {activeTab === 'units' && (
          <UnitShop
            units={units}
            currentAiPoints={currentAiPoints}
            onBuyUnit={onBuyUnit}
          />
        )}
        {activeTab === 'upgrades' && (
          <UpgradeMenu
            upgrades={upgrades}
            currentAiPoints={currentAiPoints}
            onBuyUpgrade={onBuyUpgrade}
          />
        )}
      </div>
    </div>
  );
};

export default RightSidebar;