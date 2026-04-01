# 部署到 Vercel 指南

## 方式一：GitHub 集成（推荐）

### 1. 创建 GitHub 仓库

```bash
cd zen-crystal
git init
git add .
git commit -m "Initial commit: Zen Crystal E-commerce"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/zen-crystal.git
git push -u origin main
```

### 2. 在 Vercel 导入项目

1. 访问 https://vercel.com 并登录
2. 点击 "Add New Project"
3. 选择 "Import Git Repository"
4. 选择 `zen-crystal` 仓库
5. 配置环境变量（见下方）
6. 点击 "Deploy"

### 3. 环境变量配置

在 Vercel 项目设置中添加：

| 变量名 | 值 |
|--------|-----|
| `VITE_SUPABASE_URL` | `https://nexvpdztcsuoeuwizyhk.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` |

### 4. 自定义域名

1. 进入项目 Settings → Domains
2. 添加 `fasver.store`
3. Vercel 会自动配置 DNS

---

## 方式二：CLI 部署

### 1. 安装 Vercel CLI

```bash
npm install -g vercel
```

### 2. 登录并部署

```bash
cd zen-crystal
vercel login
vercel
```

### 3. 生产环境部署

```bash
vercel --prod
```

---

## 方式三：拖拽上传（临时测试）

1. 构建项目：`npm run build`
2. 访问 https://vercel.com/new
3. 直接拖拽 `dist` 文件夹

---

## 部署后验证

1. 检查 https://your-project.vercel.app 是否正常
2. 测试产品页面加载
3. 测试购物车功能
4. 配置自定义域名

---

## OpenClaw 接管指南

OpenClaw 需要的信息：

1. **GitHub 仓库地址**: `https://github.com/YOUR_USERNAME/zen-crystal`
2. **Vercel 项目地址**: `https://vercel.com/dashboard`
3. **环境变量**: 见 `.env.example`

每次代码更新后：
1. OpenClaw 修改代码
2. 推送到 GitHub
3. Vercel 自动部署

---

## 故障排除

### 构建失败
```bash
npm install
npm run build
```

### 环境变量未生效
- 在 Vercel 重新添加环境变量
- 触发重新部署

### 自定义域名不工作
- 检查 DNS 配置
- 等待 DNS 传播（最长48小时）
