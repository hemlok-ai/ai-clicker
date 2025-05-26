// src/types/index.ts

// ユニットの型定義
export type Unit = {
  id: string;
  name: string;
  baseCost: number;
  costMultiplier: number;
  baseApPerSecond: number;
  description: string;
  count: number;
};

// アップグレードの型定義
export type Upgrade = {
  id: string;
  name: string;
  cost: number;
  description: string;
  effect: 'clickPower' | 'unitEfficiency' | 'autoClick'; // 'autoClick'を追加
  value: number; // 効果量 (例: 1.05で5%増加, 10で+10AP)
  targetUnitId?: string; // unitEfficiencyの場合、対象ユニットのID
  purchased: boolean; // 購入済みかどうか
  unlocked: boolean; // 解放されているか (購入可能かどうか)
};

// 初期ユニットデータ
export const initialUnits: Unit[] = [
  {
    id: 'script_kiddy',
    name: 'スクリプトキディ',
    baseCost: 10,
    costMultiplier: 1.15,
    baseApPerSecond: 0.1,
    description: 'とりあえず動くコードをコピペしてAIポイントを生成します。',
    count: 0,
  },
  {
    id: 'cloud_gpu',
    name: 'クラウドGPU',
    baseCost: 100,
    costMultiplier: 1.15,
    baseApPerSecond: 2,
    description: '強力な計算リソースでAP生成を加速させます。',
    count: 0,
  },
  {
    id: 'research_team',
    name: '研究チーム',
    baseCost: 1000,
    costMultiplier: 1.15,
    baseApPerSecond: 10,
    description: 'AIの基礎研究から新たなAP生成技術を生み出します。',
    count: 0,
  },
  {
    id: 'agi_simulator',
    name: 'AGIシミュレーター',
    baseCost: 10000,
    costMultiplier: 1.15,
    baseApPerSecond: 100,
    description: '汎用人工知能の挙動をシミュレートし、膨大なAPを生成します。',
    count: 0,
  },
  {
    id: 'ai_core',
    name: 'AIコア',
    baseCost: 100000,
    costMultiplier: 1.15,
    baseApPerSecond: 1000,
    description: '独立したAIの頭脳で、さらに高度なAP生成を実現します。',
    count: 0,
  },
  {
    id: 'singularity',
    name: '特異点',
    baseCost: 1000000,
    costMultiplier: 1.15,
    baseApPerSecond: 10000,
    description: 'AIが自らAIを開発する究極の地点。AP生成は無限大に。',
    count: 0,
  },
];

// 初期アップグレードデータ
export const initialUpgrades: Upgrade[] = [
  {
    id: 'enhanced_click_1',
    name: '強化クリック v1.0',
    cost: 50,
    description: 'クリック効率が少し向上します (+50%)',
    effect: 'clickPower',
    value: 1.5, // 1クリックあたりのAPを1.5倍にする
    purchased: false,
    unlocked: true, // 最初から購入可能
  },
  {
    id: 'kiddy_efficiency_1',
    name: 'スクリプト最適化',
    cost: 100,
    description: 'スクリプトキディの効率が向上します (+100%)',
    effect: 'unitEfficiency',
    value: 2.0, // スクリプトキディのAP/秒を2倍にする
    targetUnitId: 'script_kiddy',
    purchased: false,
    unlocked: false, // 後で条件付きで解放
  },
  {
    id: 'gpu_optimization_1',
    name: 'クラウドGPU最適化',
    cost: 500,
    description: 'クラウドGPUの効率が向上します (+50%)',
    effect: 'unitEfficiency',
    value: 1.5,
    targetUnitId: 'cloud_gpu',
    purchased: false,
    unlocked: false,
  },
  {
    id: 'auto_clicker_1',
    name: '自動クリックボット',
    cost: 1000,
    description: '1秒に1回、自動でAIボタンをクリックします。',
    effect: 'autoClick',
    value: 1, // クリック回数 (1回/秒)
    purchased: false,
    unlocked: false,
  },
  // さらにアップグレードを追加可能
];