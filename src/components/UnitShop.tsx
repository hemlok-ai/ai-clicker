// src/components/UnitShop.tsx
import React from 'react';
import { type Unit } from '../types';
import UnitCard from './UnitCard';

interface UnitShopProps {
  units: Unit[]; // 利用可能なユニットのリスト
  currentAiPoints: number; // 現在のAP
  onBuyUnit: (unitId: string, cost: number) => void; // ユニット購入時のコールバック
}

const UnitShop: React.FC<UnitShopProps> = ({ units, currentAiPoints, onBuyUnit }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-xl h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
        自動生成ユニット
      </h2>
      {units.map((unit) => (
        <UnitCard
          key={unit.id} // Reactのリストレンダリングにはkeyが必要
          unit={unit}
          currentAiPoints={currentAiPoints}
          onBuy={onBuyUnit}
        />
      ))}
    </div>
  );
};

export default UnitShop;