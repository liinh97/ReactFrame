# ⚡ React Template

Production-ready React starter với TypeScript, Tailwind CSS, React Router v6, Axios, Auth Context, Toast — kèm Docker cho cả dev lẫn production.

---

## 🚀 Dùng lại cho project mới

```bash
# 1. Clone template
git clone https://github.com/YOUR_USERNAME/react-template.git ten-project-moi
cd ten-project-moi

# 2. Xóa git history cũ, tạo repo mới
rm -rf .git
git init && git add . && git commit -m "chore: init from template"

# 3. Push lên GitHub repo mới
git remote add origin https://github.com/YOUR_USERNAME/ten-project-moi.git
git push -u origin main

# 4. Setup env
cp .env.example .env
# Sửa .env theo project
```

---

## 🐳 Docker

### Cấu trúc file Docker

```
├── Dockerfile              # Production — multi-stage build (Node → Nginx)
├── Dockerfile.dev          # Development — chạy Vite dev server
├── docker-compose.yml      # Production compose
├── docker-compose.dev.yml  # Development compose (hot reload)
├── nginx.conf              # Nginx config cho SPA + gzip + cache
└── .dockerignore
```

### ⚡ Development — Hot Reload

Sửa file → browser tự reload, **không cần build lại Docker**.

```bash
# Lần đầu (hoặc khi thêm package mới)
docker compose -f docker-compose.dev.yml up --build

# Các lần sau (image đã có)
docker compose -f docker-compose.dev.yml up
```

Mở trình duyệt: **http://localhost:5173**

```bash
# Dừng
docker compose -f docker-compose.dev.yml down

# Xem logs
docker compose -f docker-compose.dev.yml logs -f

# Chạy lệnh bên trong container (ví dụ: thêm package)
docker compose -f docker-compose.dev.yml exec frontend npm install axios
```

> **Lưu ý:** Source code được mount trực tiếp từ máy host vào container qua volume,
> nên Vite HMR hoạt động bình thường. `node_modules` dùng riêng của container,
> không bị ảnh hưởng bởi `node_modules` trên máy host.

### 🚢 Production

```bash
# Build image và chạy
docker compose up -d --build

# Chỉ chạy (image đã build rồi)
docker compose up -d

# Dừng
docker compose down

# Dừng và xóa volumes
docker compose down -v

# Xem logs
docker compose logs -f

# Xem logs của service cụ thể
docker compose logs -f frontend

# Rebuild image (khi thay đổi code)
docker compose up -d --build

# Xem trạng thái các container
docker compose ps
```

Mở trình duyệt: **http://localhost:80** (hoặc port đã cấu hình trong `.env`)

### 🔄 Workflow thường ngày

```bash
# Đang dev → sửa code → browser tự reload
docker compose -f docker-compose.dev.yml up

# Khi thêm package mới vào package.json
docker compose -f docker-compose.dev.yml up --build

# Muốn test production build trước khi deploy
docker compose up --build
```

### ⚙️ Environment Variables

Tạo file `.env` từ mẫu:

```bash
cp .env.example .env
```

```env
# App (được bake vào lúc build bởi Vite)
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=My App

# Docker
APP_NAME=react-app
APP_VERSION=latest
PORT=80
```

> ⚠️ **Quan trọng:** Vite bake biến `VITE_*` vào lúc **build**, không phải runtime.
> Nếu đổi giá trị `.env` trong production, phải rebuild lại image: `docker compose up -d --build`

---

## 📁 Cấu trúc thư mục

```
src/
├── components/
│   ├── layout/             # MainLayout, Navbar, Footer
│   └── ui/                 # Button, Input, Select, Textarea, Card,
│                           # Badge, Spinner, Modal, EmptyState,
│                           # Skeleton, ProtectedRoute
├── context/
│   ├── AuthContext.tsx     # useAuth() — login, logout, user, isAuthenticated
│   └── ToastContext.tsx    # useToast() — success, error, warning, info
├── hooks/
│   ├── useFetch.ts         # Auto fetch với loading/error/refetch
│   ├── useLocalStorage.ts  # Synced localStorage state
│   ├── useDebounce.ts      # Debounce value
│   ├── useModal.ts         # isOpen, open, close, toggle
│   └── usePagination.ts    # page, totalPages, next, prev, goTo
├── pages/
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── LoginPage.tsx       # Form login với validation
│   └── NotFoundPage.tsx
├── router/                 # React Router config (public + protected)
├── services/
│   ├── api.ts              # Axios instance + interceptors
│   └── userService.ts      # Example CRUD service pattern
├── types/                  # ApiResponse, User, BaseEntity, utility types
├── utils/                  # formatDate, timeAgo, formatCurrency, cn()
└── styles/                 # Tailwind + component classes (.btn, .input, .card)
```

---

## 🧩 UI Components

| Component | Props chính |
|-----------|-------------|
| `Button` | `variant` (primary/secondary/danger), `size` (sm/md/lg), `loading` |
| `Input` | `label`, `error`, `hint` |
| `Select` | `label`, `options`, `placeholder`, `error` |
| `Textarea` | `label`, `error`, `hint` |
| `Card` | `padding` (none/sm/md/lg) |
| `Badge` | `color` (gray/blue/green/red/yellow/purple) |
| `Spinner` | `size` (sm/md/lg) |
| `Modal` | `isOpen`, `onClose`, `title`, `size` (sm/md/lg/xl) |
| `EmptyState` | `icon`, `title`, `description`, `action` |
| `Skeleton` / `SkeletonText` / `SkeletonCard` | loading placeholders |

---

## 🪝 Custom Hooks

```tsx
const { data, loading, error, refetch } = useFetch<User[]>('/users')
const [theme, setTheme] = useLocalStorage('theme', 'light')
const debouncedSearch = useDebounce(searchTerm, 500)
const { isOpen, open, close } = useModal()
const { page, totalPages, next, prev } = usePagination({ total: 100 })
```

---

## 🔐 Authentication

```tsx
const { user, isAuthenticated, login, logout } = useAuth()
await login(email, password)  // tự lưu token vào localStorage

// Bảo vệ route trong router/index.tsx:
{ element: <ProtectedRoute />, children: [...protected routes] }
```

---

## 🍞 Toast Notifications

```tsx
const { success, error, warning, info } = useToast()
success('Lưu thành công!')
error('Có lỗi xảy ra')
```

---

## 📡 Gọi API

```tsx
// Hook — tự fetch khi mount
const { data, loading } = useFetch<User[]>('/users')

// Service — manual CRUD
import { userService } from '@/services'
const { data } = await userService.getAll({ page: 1, limit: 10 })
await userService.create({ name: 'Nam', email: 'nam@example.com' })
await userService.update(1, { name: 'Nam Mới' })
await userService.delete(1)
```

---

## 🛠️ Scripts (không dùng Docker)

```bash
npm install       # Cài dependencies
npm run dev       # Dev server tại localhost:5173
npm run build     # Build production vào /dist
npm run preview   # Preview production build
npm run lint      # Chạy ESLint
npm run format    # Chạy Prettier
```

---

## 🔧 Thêm page mới

```bash
# 1. Tạo file page
touch src/pages/MyPage.tsx

# 2. Thêm route vào src/router/index.tsx
{ path: 'my-page', element: <MyPage /> }

# 3. (Tuỳ chọn) Thêm nav link vào src/components/layout/Navbar.tsx
{ to: '/my-page', label: 'My Page' }
```

---

## 🚀 CI/CD — GitHub Actions

Khi push lên `main`, workflow tự động build Docker image và push lên **GitHub Container Registry (ghcr.io)**.

**Setup một lần:**
1. Vào repo → **Settings → Secrets → Actions**
2. Thêm 2 secrets: `VITE_API_BASE_URL`, `VITE_APP_NAME`

**Pull image về server production:**
```bash
docker pull ghcr.io/YOUR_USERNAME/ten-project-moi:latest
docker compose up -d
```

---

## 📦 Tech Stack

| | |
|---|---|
| **React 18** + **TypeScript** | UI & type safety |
| **Vite** | Build tool siêu nhanh |
| **Tailwind CSS** | Utility-first styling |
| **React Router v6** | Client-side routing |
| **Axios** | HTTP client với interceptors |
| **Nginx** | Serve static files (production) |
| **Docker** | Containerization |
| **ESLint + Prettier** | Code quality |