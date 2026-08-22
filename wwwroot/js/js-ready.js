// 漸進增強：在 CSS 套用增強樣式（如折疊預設隱藏）前，先於 <html> 標記 JavaScript 可用。
// 必須以同步外部腳本載入於 <head> 樣式表之前；CSP 禁止 inline script。
document.documentElement.classList.add("js");
