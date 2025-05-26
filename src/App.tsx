// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import APDisplay from './components/APDisplay';
import ClickerButton from './components/ClickerButton';
import FloatingText from './components/FloatingText';
import BackgroundEffect from './components/BackgroundEffect';
import RightSidebar from './components/RightSidebar';
import { initialUnits, initialUpgrades } from './types';
import type { Unit, Upgrade } from './types';
import useLocalStorage from './hooks/useLocalStorage';

type FloatingTextData = {
  id: string;
  value: number;
  x: number;
  y: number;
};

const App: React.FC = () => {
  // ゲームの状態をlocalStorageからロード、または初期値で設定
  const [aiPoints, setAiPoints] = useLocalStorage<number>('aiPoints', 0);
  const [clickPower, setClickPower] = useLocalStorage<number>('clickPower', 1);
  const [units, setUnits] = useLocalStorage<Unit[]>('units', initialUnits.map(unit => ({ ...unit })));
  const [upgrades, setUpgrades] = useLocalStorage<Upgrade[]>('upgrades', initialUpgrades.map(upgrade => ({ ...upgrade })));

  // 自動生成AP/秒と自動クリックのインターバルIDはlocalStorageに保存しない一時的な状態
  const [apPerSecond, setApPerSecond] = useState<number>(0);
  const [autoClickInterval, setAutoClickInterval] = useState<number | null>(null);
  const [floatingTexts, setFloatingTexts] = useState<FloatingTextData[]>([]);

  // 所持ユニットからのAP/秒を計算
  const calculateApPerSecond = useCallback(() => {
    let totalAp = 0;
    units.forEach(unit => {
      totalAp += unit.count * unit.baseApPerSecond;
    });
    return totalAp;
  }, [units]);

  // クリックパワーの更新
  useEffect(() => {
    let newClickPower = 1;
    upgrades.forEach(upgrade => {
      if (upgrade.purchased && upgrade.effect === 'clickPower') {
        newClickPower *= upgrade.value;
      }
    });
    setClickPower(newClickPower);
  }, [upgrades, setClickPower]);

  // 自動生成AP/秒の状態を更新
  useEffect(() => {
    setApPerSecond(calculateApPerSecond());
  }, [units, calculateApPerSecond]);

  // AIボタンがクリックされた時の処理
  const handleAIClick = useCallback((event?: React.MouseEvent<HTMLButtonElement>) => {
    setAiPoints(prevPoints => prevPoints + clickPower);

    // フローティングテキストの追加
    const textId = Date.now().toString();
    if (event) {
      setFloatingTexts(prev => [
        ...prev,
        { id: textId, value: clickPower, x: event.clientX, y: event.clientY },
      ]);
    } else {
      // オートクリックなど、イベントがない場合はボタンの中心に表示
      const buttonRect = document.getElementById('ai-button')?.getBoundingClientRect();
      if (buttonRect) {
        setFloatingTexts(prev => [
          ...prev,
          {
            id: textId,
            value: clickPower,
            x: buttonRect.left + buttonRect.width / 2,
            y: buttonRect.top + buttonRect.height / 2,
          },
        ]);
      }
    }
  }, [clickPower, setAiPoints]);

  // ユニット購入処理
  const handleBuyUnit = useCallback((unitId: string, cost: number) => {
    if (aiPoints >= cost) {
      setAiPoints(prevPoints => prevPoints - cost);
      setUnits(prevUnits =>
        prevUnits.map(unit =>
          unit.id === unitId
            ? { ...unit, count: unit.count + 1 }
            : unit
        )
      );
    } else {
      console.log('APが足りません！');
    }
  }, [aiPoints, setAiPoints, setUnits]);

  // アップグレード購入処理
  const handleBuyUpgrade = useCallback((upgradeId: string, cost: number) => {
    if (aiPoints >= cost) {
      setAiPoints(prevPoints => prevPoints - cost);

      setUpgrades(prevUpgrades => {
        const newUpgrades = prevUpgrades.map(upg =>
          upg.id === upgradeId
            ? { ...upg, purchased: true }
            : upg
        );

        const boughtUpgrade = newUpgrades.find(upg => upg.id === upgradeId);
        if (boughtUpgrade) {
          if (boughtUpgrade.effect === 'unitEfficiency' && boughtUpgrade.targetUnitId) {
            setUnits(prevUnits =>
              prevUnits.map(unit =>
                unit.id === boughtUpgrade.targetUnitId
                  ? { ...unit, baseApPerSecond: unit.baseApPerSecond * boughtUpgrade.value }
                  : unit
              )
            );
          } else if (boughtUpgrade.effect === 'autoClick') {
            if (autoClickInterval) {
              clearInterval(autoClickInterval);
            }
            const intervalId = setInterval(() => {
              handleAIClick();
            }, 1000 / boughtUpgrade.value);
            setAutoClickInterval(intervalId);
          }
        }
        return newUpgrades;
      });
    } else {
      console.log('APが足りません！');
    }
  }, [aiPoints, handleAIClick, autoClickInterval, setAiPoints, setUpgrades, setUnits]);

  // 自動AP生成ロジック (1秒ごとにAPを加算)
  useEffect(() => {
    const interval = setInterval(() => {
      setAiPoints(prevPoints => prevPoints + apPerSecond);
    }, 1000);

    return () => clearInterval(interval);
  }, [apPerSecond, setAiPoints]);

  // アンロック条件の判定
  useEffect(() => {
    let changed = false;
    setUpgrades(prevUpgrades => {
      const newUpgrades = prevUpgrades.map(upg => {
        if (!upg.unlocked) {
          if (upg.id === 'kiddy_efficiency_1' && aiPoints >= 300) {
            changed = true;
            return { ...upg, unlocked: true };
          }
          const scriptKiddy = units.find(unit => unit.id === 'script_kiddy');
          if (upg.id === 'gpu_optimization_1' && scriptKiddy && scriptKiddy.count >= 10) {
            changed = true;
            return { ...upg, unlocked: true };
          }
          const researchTeam = units.find(unit => unit.id === 'research_team');
          if (upg.id === 'auto_clicker_1' && researchTeam && researchTeam.count >= 1) {
            changed = true;
            return { ...upg, unlocked: true };
          }
        }
        return upg;
      });
      return changed ? newUpgrades : prevUpgrades;
    });
  }, [aiPoints, units, setUpgrades]);

  // フローティングテキストがフェードアウトしたときにリストから削除
  const handleFloatingTextFadeOut = useCallback((id: string) => {
    setFloatingTexts(prev => prev.filter(text => text.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col relative">
      {/* 背景エフェクト */}
      <BackgroundEffect />

      {/* AP表示エリア (固定) */}
      {/* PC表示では左側メインコンテンツの幅に合わせる (w-2/3) */}
      <div className="fixed top-0 left-0 right-0 sm:right-auto sm:w-2/3 p-4 bg-gray-800 bg-opacity-70 z-20 text-center sm:text-left rounded-br-lg sm:rounded-bl-none">
        <APDisplay aiPoints={aiPoints} />
        <p className="text-gray-400 text-sm">AP/秒: {apPerSecond.toFixed(1)}</p>
      </div>

      {/* メインコンテンツエリア (AP表示の高さ分オフセット) */}
      <div className="flex flex-col sm:flex-row flex-grow pt-[100px] sm:pt-0 z-10">
        {/* 左側・中央コンテンツ (スマホでは上部、PCでは左) */}
        <div className="flex-grow flex flex-col items-center p-4 sm:p-8">
          {/* AIボタン (縦方向の中央に配置) */}
          <div className="flex-grow flex items-center justify-center w-full">
            <ClickerButton id="ai-button" onClick={handleAIClick} clickPower={clickPower} />
          </div>
        </div>

        {/* 右側：サイドバー */}
        <div className="w-full sm:w-1/3 p-4">
          <RightSidebar
            currentAiPoints={aiPoints}
            units={units}
            upgrades={upgrades}
            onBuyUnit={handleBuyUnit}
            onBuyUpgrade={handleBuyUpgrade}
          />
        </div>
      </div>

      {/* フローティングテキストの表示 */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {floatingTexts.map(text => (
          <FloatingText
            key={text.id}
            id={text.id}
            value={text.value}
            x={text.x}
            y={text.y}
            onFadeOut={handleFloatingTextFadeOut}
          />
        ))}
      </div>
    </div>
  );
};

export default App;