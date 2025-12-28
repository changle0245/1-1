# ArabGold Factory 部署教程

完整的 Vercel 部署指南，从零开始到网站上线。

---

## 📋 准备工作

### 你需要的账号
1. **GitHub 账号** - 存放代码
2. **Vercel 账号** - 部署网站（用 GitHub 登录即可）

### 你已有的
- 域名: `arabgoldfactory.com`（已在 Vercel 部署）
- 项目代码: `arabgold-factory.zip`

---

## 🚀 部署步骤

### 第一步：上传代码到 GitHub

#### 1.1 创建 GitHub 仓库

1. 登录 https://github.com
2. 点击右上角 `+` → `New repository`
3. 填写信息：
   - Repository name: `arabgold-factory`
   - 选择 `Private`（私有仓库）
   - 不要勾选 "Add a README file"
4. 点击 `Create repository`

#### 1.2 上传代码

**方法一：使用 GitHub 网页上传**

1. 解压 `arabgold-factory.zip`
2. 在 GitHub 仓库页面点击 `uploading an existing file`
3. 拖拽所有文件到上传区域
4. 点击 `Commit changes`

**方法二：使用命令行（推荐）**

```bash
# 解压项目
unzip arabgold-factory.zip
cd arabgold-factory

# 初始化 Git
git init
git add .
git commit -m "Initial commit"

# 连接远程仓库（替换成你的用户名）
git remote add origin https://github.com/YOUR_USERNAME/arabgold-factory.git
git branch -M main
git push -u origin main
```

---

### 第二步：在 Vercel 创建项目

#### 2.1 导入项目

1. 登录 https://vercel.com
2. 点击 `Add New...` → `Project`
3. 选择 `Import Git Repository`
4. 找到 `arabgold-factory` 仓库，点击 `Import`

#### 2.2 配置项目

在配置页面：
- **Framework Preset**: Next.js（自动检测）
- **Root Directory**: `./`（默认）
- **Build Command**: `npm run build`（默认）
- **先不要点击 Deploy**，我们需要先配置存储

---

### 第三步：创建 Vercel KV 数据库

#### 3.1 创建 KV 存储

1. 在 Vercel Dashboard，点击左侧 `Storage`
2. 点击 `Create Database`
3. 选择 `KV`
4. 配置：
   - Name: `arabgold-kv`
   - Region: `Singapore (sin1)`（离你最近）
5. 点击 `Create`

#### 3.2 连接到项目

1. 在 KV 页面，点击 `Connect Project`
2. 选择 `arabgold-factory` 项目
3. 点击 `Connect`

这会自动添加以下环境变量：
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

---

### 第四步：创建 Vercel Blob 存储

#### 4.1 创建 Blob 存储

1. 在 `Storage` 页面，点击 `Create Database`
2. 选择 `Blob`
3. 配置：
   - Name: `arabgold-blob`
4. 点击 `Create`

#### 4.2 连接到项目

1. 在 Blob 页面，点击 `Connect Project`
2. 选择 `arabgold-factory` 项目
3. 点击 `Connect`

这会自动添加环境变量：
- `BLOB_READ_WRITE_TOKEN`

---

### 第五步：部署网站

#### 5.1 触发部署

1. 回到 Vercel Dashboard
2. 进入 `arabgold-factory` 项目
3. 点击 `Deployments` 标签
4. 点击右上角 `Redeploy`（重新部署以应用环境变量）

#### 5.2 等待部署完成

- 部署通常需要 1-2 分钟
- 看到绿色 `Ready` 表示成功

---

### 第六步：绑定域名

#### 6.1 添加域名

1. 在项目页面，点击 `Settings` → `Domains`
2. 输入 `arabgoldfactory.com`
3. 点击 `Add`

#### 6.2 配置 DNS

Vercel 会显示需要配置的 DNS 记录：

**方法一：使用 Vercel Nameservers（推荐）**

在你的域名注册商处，将 Nameservers 改为：
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**方法二：使用 A/CNAME 记录**

添加以下 DNS 记录：
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### 6.3 等待 DNS 生效

- 通常需要 5-30 分钟
- 最长可能需要 24-48 小时
- 在 Vercel Domains 页面可以看到状态

---

### 第七步：验证部署

#### 7.1 检查网站

访问以下页面确认正常：

| 页面 | URL |
|------|-----|
| 首页 | https://arabgoldfactory.com |
| 产品 | https://arabgoldfactory.com/products |
| 联系 | https://arabgoldfactory.com/contact |
| 后台 | https://arabgoldfactory.com/admin |

#### 7.2 测试后台

1. 访问 `/admin`
2. 输入密码 `arabgold2025`
3. 登录后检查 Dashboard

#### 7.3 测试询盘表单

1. 访问 `/contact`
2. 填写测试询盘
3. 在后台 `/admin/inquiries` 查看是否收到

---

## ⚙️ 可选配置

### 配置邮件通知

如果你想收到询盘邮件通知：

#### 1. 注册 Resend

1. 访问 https://resend.com
2. 注册账号
3. 获取 API Key

#### 2. 添加环境变量

在 Vercel 项目设置中添加：
```
RESEND_API_KEY=re_xxxxxxxx
NOTIFICATION_EMAIL=your-email@example.com
```

#### 3. 验证域名（可选但推荐）

在 Resend 后台验证 `arabgoldfactory.com` 域名，这样发件人可以是 `noreply@arabgoldfactory.com`

---

### 修改后台密码

1. 登录后台 `/admin`
2. 进入 `Settings`
3. 修改密码

或者在 Vercel 环境变量中设置：
```
ADMIN_PASSWORD=你的新密码
```

---

## 🔧 常见问题

### Q1: 部署失败怎么办？

1. 检查 Vercel 部署日志
2. 常见错误：
   - **Module not found**: 检查 package.json 依赖
   - **Build error**: 检查 TypeScript 错误
   - **KV connection error**: 确认 KV 已连接

### Q2: 图片上传失败？

确保：
1. Blob 存储已创建并连接
2. `BLOB_READ_WRITE_TOKEN` 环境变量存在

### Q3: 数据不保存？

确保：
1. KV 存储已创建并连接
2. 所有 KV 环境变量存在

### Q4: 域名不生效？

1. 检查 DNS 配置是否正确
2. 等待 DNS 传播（可能需要几小时）
3. 使用 https://dnschecker.org 检查 DNS 状态

### Q5: WhatsApp 链接不正确？

在以下文件中修改 WhatsApp 号码：
- `components/Header.tsx`
- `components/Footer.tsx`
- `components/WhatsAppButton.tsx`
- `app/contact/page.tsx`

搜索 `8613115825523` 并替换

---

## 📊 费用说明

| 服务 | 免费额度 | 超出价格 |
|------|----------|----------|
| Vercel Hosting | 100GB 带宽/月 | $20/100GB |
| Vercel KV | 256MB 存储 | $0.20/GB |
| Vercel Blob | 1GB 存储 | $0.15/GB |
| Resend | 100 邮件/天 | $20/月起 |

**预计月费用：$0**（在免费额度内）

---

## 🔄 后续更新

### 更新代码

```bash
# 修改代码后
git add .
git commit -m "Update: 描述修改内容"
git push
```

Vercel 会自动检测到更新并重新部署。

### 回滚版本

1. 在 Vercel Dashboard → Deployments
2. 找到之前的成功部署
3. 点击 `...` → `Promote to Production`

---

## 📞 技术支持

如有问题，可以：
1. 查看 Vercel 文档: https://vercel.com/docs
2. 检查部署日志排查错误
3. 联系 Claude 协助解决

---

**部署完成后，记得：**
1. ✅ 修改后台默认密码
2. ✅ 添加真实产品图片
3. ✅ 测试询盘表单功能
4. ✅ 配置 Google Search Console
5. ✅ 开始 Google Ads 测试
