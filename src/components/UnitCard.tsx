// src/components/UnitCard.tsx
import React from 'react';
import { type Unit } from '../types';

interface UnitCardProps {
  unit: Unit; // 表示するユニットデータ
  currentAiPoints: number; // 現在のAP (購入可否判定用)
  onBuy: (unitId: string, cost: number) => void; // 購入時のコールバック関数
}

const UnitCard: React.FC<UnitCardProps> = ({ unit, currentAiPoints, onBuy }) => {
  // 次に購入するユニットのコストを計算
  // コストは (基本コスト * (倍率 ^ 現在の所持数)) で計算されます。
  const nextCost = Math.floor(unit.baseCost * Math.pow(unit.costMultiplier, unit.count));

  // 購入可能かどうかを判定
  const canBuy = currentAiPoints >= nextCost;

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md mb-4 border border-gray-600">
      <h3 className="text-xl font-bold text-white mb-2">{unit.name}</h3>
      <p className="text-gray-300 text-sm mb-2">{unit.description}</p>
      <div className="flex justify-between items-center mb-2">
        <p className="text-blue-300">所持数: {unit.count}</p>
        <p className="text-green-300">+{unit.baseApPerSecond} AP/秒</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-yellow-300">コスト: {nextCost} AP</p>
        <button
          className={`px-4 py-2 rounded-md font-bold text-white transition-colors duration-200
                      ${canBuy ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 cursor-not-allowed'}`}
          onClick={() => onBuy(unit.id, nextCost)}
          disabled={!canBuy} // 購入できない場合はボタンを無効化
        >
          購入
        </button>
      </div>
    </div>
  );
};

export default UnitCard;