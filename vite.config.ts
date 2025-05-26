import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: '/ai-clicker/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Service Workerの登録タイプ (自動更新)
      injectRegister: 'auto',     // Service Workerの登録コードを自動注入
      manifest: {                 // manifest.json の内容
        name: 'AI Clicker',
        short_name: 'AIClicker',
        description: 'AIがAIを開発する放置系ゲーム',
        theme_color: '#1a202c', // 背景色 (Tailwindのbg-gray-900に近い色)
        background_color: '#1a202c',
        display: 'standalone',    // PWAを通常のアプリのように表示
        start_url: '/ai-clicker/',           // アプリ起動時のURL
        icons: [                  // アイコンの設定
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable', // マスク可能なアイコン (Android用)
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'], // キャッシュするファイルのパターン
      },
      devOptions: {
        enabled: true, // 開発モードでもPWAを有効にする (デバッグ用)
      },
    }),
  ],
});