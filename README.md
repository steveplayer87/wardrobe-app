# 衣櫥助手 Wardrobe App

這是一個可安裝到 iPhone 主畫面的個人衣櫥與洗衣管理 PWA。資料預設保存在目前瀏覽器／網站來源中，並可透過 App 內的「設定 → 匯出備份／匯入備份」搬移。

## 使用方式

發布後請用 iPhone Safari 開啟 GitHub Pages 網址，選擇「分享 → 加入主畫面」，再開啟「以 Web App 開啟」。之後從手機桌面開啟即可像一般 App 使用。

## 開發方式

這個專案不需要 build step。修改 `index.html`、`styles.css`、`app.js` 或 `seed-items.js` 後推送到 `main`，GitHub Actions 會自動部署到 GitHub Pages。若更新 JavaScript 或 CSS，請同步更新 `index.html` 與 `sw.js` 中的 query-string 版本及 service worker cache 名稱，避免舊快取殘留。

## 備份

localStorage 不會跨網站來源自動同步。從舊版本移轉時，請先在舊版本使用「設定 → 匯出備份」，再在新版本使用「設定 → 匯入備份」。圖片會包含在 JSON 備份中。
