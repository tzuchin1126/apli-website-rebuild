# 專案進度與待辦

## 已完成

### 2026-09-03 Admin 驗證碼限流修正

- 驗證碼 API 改用獨立的 `admin-captcha` 限流政策，每個 IP 每分鐘最多 30 次。
- 登入 API 維持 `admin-login` 限流，每個 IP 每分鐘最多 5 次。
- 目的：避免錯誤登入後自動重新載入驗證碼時，因登入限流而顯示破圖。
- 實際驗證：`dotnet build -c Release` 成功（0 warnings、0 errors）；`git diff --check` 成功。
- 未驗證項目：實際瀏覽器登入流程與桌機／手機 RWD；本次僅調整後端限流設定。
- Commit：`c23ec60`。

## 待辦

- 依各次變更補充實際驗證結果與 commit 紀錄。
