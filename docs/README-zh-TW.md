# 🌿 植物星球 PlantPlanet

[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=plant-planet-lemon)](https://plant-planet-lemon.vercel.app/)

一個開放原始碼的植物愛好者社群平台，讓植物愛好者分享知識、記錄成長、結交同好。

🌍 [English version](../README.md)

## ✨ 功能特色

- **社群論壇** — 分享你的植物旅程、獲得專家建議、結交植物同好
- **植物圖鑑** — 瀏覽豐富的植物資料庫，包含照護指南
- **成長日誌** — 用照片和筆記記錄你的植物成長過程
- **交換網絡** — 與其他種植者交換插枝、種子和植物
- **響應式設計** — 美觀的介面，桌面和手機都能完美使用

## 🚀 線上體驗

前往 [plant-planet-lemon.vercel.app](https://plant-planet-lemon.vercel.app/)

## 🛠️ 技術棧

- **前端框架：** React 19 + TypeScript
- **建構工具：** Vite
- **樣式：** Tailwind CSS v4
- **路由：** React Router v7
- **部署：** Vercel

## 📦 快速開始

### 環境需求

- Node.js 18+
- npm 或 yarn

### 安裝

```bash
# 複製儲存庫
git clone https://github.com/HoDZadkiel/PlantPlanet.git
cd PlantPlanet

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

開啟 [http://localhost:5173](http://localhost:5173)。

### 生產環境打包

```bash
npm run build
```

打包後的檔案在 `dist/` 目錄，可以直接部署。

## 🤝 貢獻方式

歡迎貢獻！以下是你可以幫忙的方式：

### 方式一：提交 Issue（推薦）

1. 前往 [Issues](https://github.com/HoDZadkiel/PlantPlanet/issues)
2. 點擊「New issue」→「Get started」
3. 選擇合適的模板：
   - **✨ 功能改善** — 改善現有功能或文案
   - **🐛 Bug 回報** — 報告錯誤或顯示異常
   - **🌐 翻譯修正** — 修正翻譯或新增翻譯
   - **🚀 新功能** — 提出新功能建議
   - **🎨 設計調整** — UI/UX 建議
4. 填寫模板 — 自動化系統會幫你處理！

### 方式二：Pull Request

1. Fork 此儲存庫
2. 建立功能分支 (`git checkout -b feature/新功能`)
3. 進行修改
4. 執行 `npm run build` 確認編譯通過
5. 提交修改 (`git commit -m '新增新功能'`)
6. 推送分支 (`git push origin feature/新功能`)
7. 開啟 Pull Request

## 🔧 指令說明

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 打包生產版本 |
| `npm run preview` | 本機預覽生產版本 |
| `npm run lint` | 執行程式碼檢查 |
| `npm run check` | 類型檢查 |

## 📁 專案結構

```
src/
├── components/          # 可重複使用的 UI 元件
│   ├── Navbar.tsx       # 頂部導航列
│   └── MobileMenu.tsx   # 手機版選單
├── pages/               # 路由頁面
│   ├── HomePage.tsx     # 首頁
│   ├── ForumPage.tsx    # 論壇頁面
│   ├── PostPage.tsx     # 單篇貼文頁面
│   ├── PlantLibraryPage.tsx  # 植物圖鑑
│   ├── JournalPage.tsx  # 成長日誌
│   └── CommunityPage.tsx    # 社群頁面
├── data/
│   └── mockData.ts      # 開發用模擬資料
├── types/
│   └── index.ts         # TypeScript 類型定義
├── App.tsx              # 應用程式根元件
├── main.tsx             # 入口點
└── index.css            # 全域樣式
```

## 🚀 部署說明

本專案部署於 Vercel，每次合併到 `main` 分支會自動更新。

## 📄 授權條款

本專案採用 MIT License 授權。

## 🙏 致謝

由植物愛好者，為植物愛好者所建構。
