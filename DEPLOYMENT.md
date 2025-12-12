# 部署指南 - www.aigeniestudio.io/year-in-review

## ✅ 已完成的配置

所有代码配置已经完成并推送到 GitHub：
- ✅ Vite base 路径配置为 `/year-in-review/`
- ✅ Vercel 路径重写规则已配置
- ✅ API 路由已适配子路径
- ✅ 所有功能已测试

## 📋 你需要完成的步骤（仅 3 步）

### 步骤 1：在 Vercel 中导入项目（如果还没做）

1. 访问 https://vercel.com/dashboard
2. 点击 **"Add New Project"**
3. 选择 GitHub 仓库：`Pepperlena/the2025review`
4. 点击 **"Import"**
5. Vercel 会自动开始部署

### 步骤 2：配置环境变量（重要！）

1. 在 Vercel 项目页面，点击 **"Settings"**
2. 点击左侧菜单的 **"Environment Variables"**
3. 添加以下环境变量：
   - **Name**: `GEMINI_API_KEY`
   - **Value**: 你的 Gemini API Key
   - **Environment**: 选择所有（Production, Preview, Development）
4. 点击 **"Save"**
5. 回到项目页面，点击 **"Redeploy"** 重新部署

### 步骤 3：配置 Namecheap DNS（5 分钟）

1. 登录 https://www.namecheap.com
2. 进入 **"Domain List"** → 找到 `aigeniestudio.io` → 点击 **"Manage"**
3. 点击 **"Advanced DNS"** 标签
4. 在 **"Host Records"** 部分，点击 **"Add New Record"**
5. 添加以下记录：
   - **Type**: `CNAME Record`
   - **Host**: `www`
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: `Automatic`
6. 点击 **"Save"**（绿色勾号）

### 步骤 4：在 Vercel 中添加域名

1. 在 Vercel 项目页面，点击 **"Settings"** → **"Domains"**
2. 在输入框中输入：`www.aigeniestudio.io`
3. 点击 **"Add"**
4. Vercel 会显示 DNS 配置说明（你已经配置好了，可以忽略）
5. 等待几分钟，直到状态变为 **"Valid"**（绿色勾号）

## 🎉 完成！

部署完成后，访问：
**https://www.aigeniestudio.io/year-in-review**

## ⚠️ 常见问题

### DNS 还没生效？
- 通常需要 15-30 分钟
- 可以在 https://www.whatsmydns.net 检查 DNS 传播状态
- 输入 `www.aigeniestudio.io` 查看 CNAME 记录

### 域名状态一直是 "Pending"？
- 检查 Namecheap 中的 DNS 记录是否正确
- 确认 Host 是 `www`，Value 是 `cname.vercel-dns.com`
- 等待更长时间（最多 48 小时）

### 应用显示 404？
- 确认访问的是 `/year-in-review` 路径
- 检查 Vercel 部署日志是否有错误
- 确认 `vercel.json` 文件已正确配置

### API 调用失败？
- 检查 Vercel 的 Environment Variables 中是否设置了 `GEMINI_API_KEY`
- 查看 Vercel Function Logs 中的错误信息
- 确认 API Key 是有效的

## 📞 需要帮助？

如果遇到问题，检查：
1. Vercel 部署日志：项目页面 → "Deployments" → 点击最新部署 → 查看日志
2. Vercel Function Logs：项目页面 → "Functions" → 查看 API 调用日志
3. 浏览器控制台：F12 → Console 标签查看错误信息

