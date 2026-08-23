# Wardrobe App 本機使用與資料搬移指南

## 先說結論

可以不用 Netlify 來開啟新版檔案。**最穩定的做法不是直接雙擊 `index.html`，而是用一個本機 HTTP server 以 `http://localhost` 開啟。** 這樣可以保留本專案的 PWA service worker 與離線快取能力；瀏覽器把 `localhost` 視為本機開發的安全來源。[1]

如果你主要在 iPhone 上使用，有兩條路。第一條是在 Mac／Windows 上啟動本機 server，再用電腦開啟；第二條是在 iPhone／iPad 上使用能提供 local server 的 App，例如 App Store 的 **iHost - HTML Live**。iHost 的官方說明包含在 iOS 裝置上分享檔案、建立網頁與提供 local server，但建議先實際測試你的 iOS 版本、照片、JavaScript 與資料保存行為。[3]

## 方案比較

| 使用情境 | 建議方式 | 優點 | 注意事項 |
|---|---|---|---|
| 在 Mac／Windows 上繼續開發 | 使用附帶的 `start-local.sh`，或 Python 本機 server | 最穩定、最容易除錯，PWA 快取可在 `localhost` 使用 | 需要電腦啟動 server |
| 在 iPhone／iPad 直接打開 ZIP | 使用 iHost - HTML Live | 不需要 Netlify，可以在 iOS 裝置直接提供 local server | 是否能像 Safari 一樣安裝到桌面、是否保留相同 Web Storage，需在實機測試；不要假設與原 Netlify PWA 完全相同 |
| 只想快速看畫面 | HTML viewer 類 App | 開啟檔案快 | 不一定支援 service worker、完整 JavaScript、檔案上傳或長期資料保存，不建議作為正式使用方式 |
| 直接雙擊 `index.html` | `file://` | 不需安裝工具 | 不建議。`file:` URL 的 localStorage 行為未被規範，不同瀏覽器可能不同；service worker 也不是穩定的執行環境。[1] |

## Mac／Linux／Windows 本機啟動

將 ZIP 解壓縮後，進入內層的 `wardrobe-app` 資料夾。Mac／Linux 可以執行：

```bash
cd wardrobe-app
python3 -m http.server 4173
```

然後在同一台電腦的瀏覽器開啟：

```text
http://localhost:4173/index.html
```

本版本也附有 `start-local.sh`。在 Mac／Linux 上可在終端機執行：

```bash
./start-local.sh
```

Windows 可在命令提示字元執行：

```bat
cd wardrobe-app
py -m http.server 4173
```

請不要關閉這個終端機視窗，因為它就是暫時的本機伺服器。要停止時按 `Ctrl+C` 即可。

如果你想用 iPhone 查看電腦上的版本，可讓 iPhone 與電腦連到同一個 Wi-Fi，然後在電腦查詢區域網路 IP，再在 iPhone Safari 開啟：

```text
http://你的電腦區域網路IP:4173/index.html
```

這種區域網路 HTTP 開啟方式可以用來測試畫面與功能，但不保證 service worker 會像 `localhost` 或 HTTPS 一樣啟用；要在 iPhone 上獲得較完整的 PWA 行為，應使用 HTTPS 來源，或先以 iHost 的實機行為測試。[1]

## 舊 localStorage 資料能不能搬？可以，但要用匯出／匯入

可以搬移，而且目前 wardrobe-app 已經有「匯出備份」與「匯入備份」。**不要直接複製瀏覽器的 localStorage 檔案**，因為 localStorage 是依照文件的 origin 分開儲存；例如 Netlify 的 HTTPS 網址、`http://localhost:4173`、`file://` 都不是同一個儲存區。[1] [2]

目前專案的資料鍵名是 `wardrobeAppState_v2`。圖片、衣物、穿著紀錄、清洗歷史、想買清單與設定會隨 JSON 備份一起匯出；圖片會以資料 URL 放在備份資料中，因此不需要另外搬圖片資料夾。

### 從舊 Netlify 版本匯出

請在**原本有資料的同一台裝置與同一個瀏覽器**中開啟舊 Netlify 版本或已安裝的 PWA。進入「設定」，按「匯出備份」。如果 iPhone 顯示分享面板，請選擇「儲存到檔案」，建議存到 iCloud Drive 或「我的 iPhone」中的容易找到的位置。檔名通常會是類似 `wardrobe-backup-YYYY-MM-DD.json`。

匯出完成後，請先保留這份 JSON，不要刪除，也不要用一般文字編輯器改內容。它就是你的原始資料備份。

### 匯入本機新版

先用本指南上面的方式開啟新版本機網站。進入「設定」，按「匯入備份」，選擇剛才的 JSON 檔案。匯入完成後重新確認衣櫥件數、至少一張照片、穿搭紀錄、洗衣歷史與想買清單。

匯入後資料會寫入**新的本機 origin**；之後即使關閉瀏覽器再重新開啟，只要仍使用相同的本機網址與瀏覽器，資料就會留在該本機環境。若日後改變 port、主機名稱、瀏覽器或 App，請把 JSON 備份保留在安全位置，必要時再次匯入。

## 建議的搬移順序

> **先匯出、再開新版、再匯入，確認無誤後才考慮停止使用舊版。**

| 順序 | 動作 | 確認點 |
|---:|---|---|
| 1 | 在舊 Netlify／舊 PWA 匯出 JSON | 檔案確實存在，大小不是 0 KB |
| 2 | 將新版 ZIP 解壓並用 localhost 開啟 | 看到首頁，不是瀏覽器的原始檔案預覽 |
| 3 | 在新版匯入 JSON | 出現匯入完成提示 |
| 4 | 檢查衣櫥與圖片 | 件數、名稱、照片可顯示 |
| 5 | 檢查穿搭紀錄與洗衣籃 | 日期、狀態與歷史仍在 |
| 6 | 檢查想買清單 | 圖片、標籤、參考網址仍在 |
| 7 | 再按一次匯出備份 | 保留本機環境的第二份備份 |

## 重要注意事項

第一，Netlify 不能繼續部署不代表既有網址上的資料會自動搬到本機；資料搬移仍要由你在原本有 localStorage 的瀏覽器環境中按「匯出備份」。如果舊網址目前仍打得開，請先做這一步。

第二，若舊 Netlify 網址已經完全無法開啟，但原本的 PWA 還能在手機桌面開啟，請從手機桌面的 PWA 進入設定並匯出。若兩者都無法開啟，直接取得 localStorage 會比較困難，這時需要先找回原本的瀏覽器／PWA 資料環境，或使用瀏覽器開發者工具取出資料。

第三，本專案目前是單機資料模型。使用 `localhost`、iHost 或其他新來源後，各環境的資料不會自動同步；請把 JSON 備份當成跨環境同步與災難復原的主要方式。

## References

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage "MDN: Window.localStorage property"
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API "MDN: Web Storage API"
[3]: https://apps.apple.com/us/app/ihost-html-live/id1338576676 "App Store: iHost - HTML Live"
