💳 金流系統 MVP ⚡ Payment System MVP

![alt text](image.png)

🚀 專案名稱： Payment System MVP  
📌 版本： v1.0  
📅 最後更新日期： 2025-03-05

本專案為 SPEC-004: 金流系統架構設計 的 最小可用產品 (MVP, Minimum Viable Product)，整合 客樂得 (KPay) 與 台灣里 (TPay) 金流，提供統一的支付介面，並支援 Webhook 驗證、交易查詢、RBAC 權限管理，確保金流交易的安全性與穩定性。

🎯 專案目標
✅ 整合 客樂得、台灣里 金流，提供統一 `PaymentProvider` 介面  
✅ 支援 Webhook 簽章驗證（HMAC），確保交易安全  
✅ 透過 RBAC 權限管理，保護 API 存取權限  
✅ MySQL + Redis 快取，提升交易查詢效能  
✅ Docker + Kubernetes 部署，確保系統可擴展

```
⚙️ 技術架構
💻 後端
⚡ 框架： NestJS (Node.js + TypeScript)
⚡ 資料庫： MySQL（交易記錄）、Redis（快取交易統計）
⚡ 身份驗證： JWT（JSON Web Token）
⚡ 金流 API 介接： 客樂得 (KPay)、台灣里 (TPay)
⚡ Webhook 驗證： HMAC 簽章驗證 + Exponential Backoff 重試
⚡ 日誌監控： ELK (Elasticsearch, Logstash, Kibana) / Loki
⚡ 部署： Docker + Kubernetes (K8s)

💻 前端
⚡ 框架： Vue 3 + Pinia
⚡ API 呼叫： Axios / Fetch
⚡ 即時通知： WebSocket / SSE
⚡ UI 框架： Element Plus
```

```

                         (前端使用者)
                              │
                              ▼
  ┌───────────────────────────────────────────────────────┐
  │        Vue 3 + Pinia (前端應用程式)                 │
  │    (透過 Axios/Fetch 與後端進行 API 呼叫)           │
  └───────────────────────────────────────────────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │   API Gateway / LB      │
                 │ (負責負載平衡與安全控管)│
                 └─────────────────────────┘
                              │
                              ▼
  ┌───────────────────────────────────────────────────────┐
  │                 NestJS (後端伺服器)                  │
  │  ┌───────────────────┐   ┌───────────────────┐       │
  │  │  Auth Module      │   │  Payment Module   │       │
  │  │ (JWT / RBAC)      │   │ (客樂得、台灣里等 │       │
  │  │                  │   │  金流介接 & Webhook)│       │
  │  └───────────────────┘   └───────────────────┘       │
  │  ┌───────────────────┐   ┌───────────────────┐       │
  │  │  Order Module     │   │  Admin Module     │       │
  │  │ (訂單相關 CRUD)    │   │ (公告管理、報表、 │       │
  │  │                   │   │  撥款審核)         │       │
  │  └───────────────────┘   └───────────────────┘       │
  │                  ┌────────────────────────────────────┤
  │                  │  Logging Module                   │
  │                  │ (API & Webhook 紀錄、             │
  │                  │  Audit Log)                       │
  │                  └────────────────────────────────────┘
  └───────────────────────────────────────────────────────┘
                              │
                              ▼
  ┌───────────────────────────────────────────────────────┐
  │  MySQL / PostgreSQL (交易資料庫)                      │
  │   ├─ 交易表分區 (Partitioning)                        │
  │   ├─ 索引優化 (status, created_at 等)                 │
  │   └─ 儲存交易/訂單/使用者等核心資料                  │
  └───────────────────────────────────────────────────────┘
                              │
                              ▼
  ┌───────────────────────────────────────────────────────┐
  │  Redis (交易統計快取)                                 │
  │   └─ 優化查詢效率，減少 DB 負載                       │
  └───────────────────────────────────────────────────────┘

  ┌───────────────────────────────┐
  │  Webhook (第三方金流回呼)     │
  │   ├─ 客樂得                  │
  │   ├─ 台灣里                  │
  │   ├─ 未來支援 Stripe/PayPal/ │
  │   │  綠界...                │
  │   └─ 以 HMAC / JWT 驗證安全  │
  └───────────────────────────────┘

  ┌───────────────────────────────────────────────────────┐
  │  日誌系統 (ELK / Loki)                               │
  │   ├─ 集中式儲存 & 搜尋 API / Webhook 紀錄            │
  │   ├─ 監控交易流程、例外狀況                          │
  │   └─ 搭配 Prometheus + Grafana 進行性能監控          │
  └───────────────────────────────────────────────────────┘

```

```
📂 專案目錄結構
payment-system-mvp/
├── backend/ # 🚀 後端服務 (NestJS)
│ ├── src/
│ │ ├── auth/ # 🔑 身份驗證 (JWT + RBAC)
│ │ ├── payment/ # 💳 金流模組 (客樂得、台灣里)
│ │ ├── order/ # 📦 訂單管理
│ │ ├── common/ # 🔧 共用模組 (錯誤處理、API 限流)
│ │ ├── database/ # 🗄 資料庫模組 (MySQL + Redis)
│ ├── .env.example # 🛠 環境變數範本
│ ├── docker-compose.yml # 🐳 Docker 設定
│ └── README.md
│
├── frontend/ # 🎨 前端 (Vue 3)
│ ├── src/
│ │ ├── components/ # 可重複使用的 UI 元件
│ │ ├── views/ # 頁面
│ │ ├── api/ # API 呼叫
│ ├── README.md
│
├── deployment/ # 🚀 CI/CD 與部署
│ ├── k8s/ # Kubernetes 設定
│ ├── github-actions/ # GitHub Actions CI/CD
│ ├── README.md
│
├── docs/ # 📖 文件
│ ├── api-spec.yaml # OpenAPI / Swagger 規格
│ ├── architecture.md # 系統架構設計
│ ├── README.md
│
└── README.md # 📌 專案說明
```

```
2️⃣ 啟動後端
cd backend
npm install
npm run start

3️⃣ 啟動前端
cd frontend
npm install
npm run dev

4️⃣ 啟動 Docker (本地開發)
docker⚡compose up ⚡d
```

📌 API 設計  
🔑 身份驗證 API（Auth API）
✅ `POST /auth/login`

- 🔹 描述：用戶登入，回傳 JWT Token
- 🔹 請求參數：
  - `email` (string) - 使用者 Email
  - `password` (string) - 使用者密碼

✅ `GET /auth/profile`

- 🔹 描述：取得登入用戶的個人資訊
- 🔹 請求標頭：
  - `Authorization: Bearer <JWT_TOKEN>`

💳 金流交易 API（Payments API）
✅ `POST /payments`

- 🔹 描述：建立支付交易
- 🔹 請求參數：
  - `provider` (string) - 金流服務商 (`kpay` / `tpay`)
  - `amount` (number) - 交易金額
  - `orderId` (string) - 訂單 ID

✅ `GET /payments/:id`

- 🔹 描述：查詢交易詳情
- 🔹 路徑參數：
  - `id` (string) - 交易 ID

✅ `POST /payments/refund/:id`

- 🔹 描述：申請退款
- 🔹 路徑參數：
  - `id` (string) - 交易 ID

🔔 Webhook API
✅ `POST /payments/notify`

- 🔹 描述：金流 Webhook 回調，接收支付結果通知
- 🔹 請求標頭：
  - `X-Signature` (string) - HMAC 簽章驗證

📦 訂單 API（Orders API）
✅ `POST /orders`

- 🔹 描述：建立訂單
- 🔹 請求參數：
  - `items` (array) - 訂單商品列表
  - `totalAmount` (number) - 訂單總金額

✅ `GET /orders/:id`

- 🔹 描述：查詢訂單詳情
- 🔹 路徑參數：
  - `id` (string) - 訂單 ID

✅ `GET /orders`

- 🔹 描述：查詢所有訂單（支援分頁）
- 🔹 查詢參數：
  - `page` (number) - 分頁數
  - `limit` (number) - 單頁筆數

🔍 測試與驗收
✅ 單元測試（Jest）：覆蓋 API、金流交易、Webhook 驗證  
✅ 整合測試：與金流沙盒進行測試（成功、失敗、退款）  
✅ 壓力測試（JMeter / k6）：模擬多線程交易場景  
✅ 安全測試：防禦 SQL Injection、XSS、CSRF，確保系統安全

📜 授權
本專案採用 MIT License，可自由使用與修改，但需保留原始版權資訊。

📬 聯絡方式
📧 Email: vinceyue667@gmail.com
🌐 官方網站:
