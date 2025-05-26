// src/components/RightSidebar.tsx
import React, { useState } from 'react';
import UnitShop from './UnitShop'; // ユニットショップをインポート
import UpgradeMenu from './UpgradeMenu'; // アップグレードメニューをインポート
import type { Unit, Upgrade } from '../types'; // 型をインポート

interface RightSidebarProps {
  currentAiPoints: number;
  units: Unit[];
  upgrades: Upgrade[];
  onBuyUnit: (unitId: string, cost: number) => void;
  onBuyUpgrade: (upgradeId: string, cost: number) => void;
}

// タブの種類を定義
type Tab = 'units' | 'upgrades';

const RightSidebar: React.FC<RightSidebarProps> = ({
  currentAiPoints,
  units,
  upgrades,
  onBuyUnit,
  onBuyUpgrade,
}) => {
  // 現在選択されているタブの状態
  const [activeTab, setActiveTab] = useState<Tab>('units'); // 初期値はユニットショップ

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

      {/* タブの内容 */}
      <div className="flex-grow p-4 overflow-y-auto">
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