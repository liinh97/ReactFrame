# ⚡ React Template

A production-ready React starter with TypeScript, Tailwind CSS, React Router v6, Axios, Auth Context, and Toast notifications.

## 🚀 Quick Start — Dùng lại cho project mới

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

# 4. Cài dependencies & chạy
npm install
cp .env.example .env   # Sửa .env theo project
npm run dev
```

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

## 🪝 Custom Hooks

```tsx
const { data, loading, error, refetch } = useFetch<User[]>('/users')
const [theme, setTheme] = useLocalStorage('theme', 'light')
const debouncedSearch = useDebounce(searchTerm, 500)
const { isOpen, open, close } = useModal()
const { page, totalPages, next, prev } = usePagination({ total: 100 })
```

## 🔐 Authentication

```tsx
const { user, isAuthenticated, login, logout } = useAuth()
await login(email, password)  // tự lưu token vào localStorage

// Bảo vệ route trong router/index.tsx:
{ element: <ProtectedRoute />, children: [...protected routes] }
```

## 🍞 Toast Notifications

```tsx
const { success, error, warning, info } = useToast()
success('Lưu thành công!')
error('Có lỗi xảy ra')
```

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

## 🛠️ Scripts

```bash
npm run dev       # Dev server (localhost:5173)
npm run build     # Build production
npm run preview   # Preview build
npm run lint      # ESLint
npm run format    # Prettier
```

## ⚙️ Environment Variables

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=My App
```

## 🚢 CI/CD — Deploy lên GitHub Pages

File `.github/workflows/deploy.yml` đã được cấu hình sẵn.

1. Push lên nhánh `main`
2. Vào repo → **Settings → Pages → Source → GitHub Actions**
3. Thêm secrets: **Settings → Secrets → Actions** (`VITE_API_BASE_URL`, `VITE_APP_NAME`)

## 🔧 Thêm page mới (3 bước)

```bash
# 1. Tạo file
touch src/pages/MyPage.tsx

# 2. Thêm route vào src/router/index.tsx
{ path: 'my-page', element: <MyPage /> }

# 3. (Tuỳ chọn) Thêm nav link vào Navbar.tsx
{ to: '/my-page', label: 'My Page' }
```

## 📦 Tech Stack

- **React 18** + **TypeScript** — UI & type safety
- **Vite** — Build tool siêu nhanh
- **Tailwind CSS** — Utility-first styling
- **React Router v6** — Client-side routing
- **Axios** — HTTP client với interceptors
- **ESLint + Prettier** — Code quality
