// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

// Tは保存したいデータの型
function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  // stateの初期値を設定する関数
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // localStorageから値を取得
      const item = window.localStorage.getItem(key);
      // JSONをパースして返す。もし存在しない場合はinitialValueを使用
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // エラーが発生した場合 (例: localStorageが利用できない場合) はinitialValueを返す
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // storedValueが変更されたときにlocalStorageを更新
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]); // keyまたはstoredValueが変更されたら実行

  return [storedValue, setStoredValue];
}

export default useLocalStorage;