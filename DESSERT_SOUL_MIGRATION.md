# Dessert Soul 迁移指南

## 已完成的工作

✅ 已创建 `dessert-soul/` 目录  
✅ 已更新 `vercel.json` 添加路由规则  
✅ 已创建迁移脚本 `migrate-dessert-soul.sh`

## 迁移步骤

### 方法 1: 使用迁移脚本（推荐）

```bash
# 如果你知道 dessert-soul 项目的 dist 目录路径
./migrate-dessert-soul.sh /path/to/dessert-soul/dist
```

### 方法 2: 手动复制

1. 找到你的 `dessert-soul` 项目的 `dist` 目录
2. 将 `dist` 目录中的所有内容复制到 `the-2025-review/dessert-soul/` 目录
3. 确保目录结构如下：

```
dessert-soul/
  ├── index.html
  ├── assets/
  │   ├── *.js
  │   ├── *.css
  │   └── *.png/jpg/svg
  └── ... (其他静态资源)
```

## 重要：路径配置

### 检查 index.html

确保 `dessert-soul/index.html` 中的资源路径使用**相对路径**：

✅ **正确** (相对路径):
```html
<script type="module" src="./assets/index.js"></script>
<link rel="stylesheet" href="./assets/style.css">
```

❌ **错误** (绝对路径):
```html
<script type="module" src="/assets/index.js"></script>
<link rel="stylesheet" href="/assets/style.css">
```

### 如果使用 Vite

如果你的 `dessert-soul` 项目使用 Vite，在 `vite.config.ts` 中设置：

```typescript
export default defineConfig({
  base: '/dessert-soul/',
  // ... 其他配置
});
```

然后重新构建：
```bash
npm run build
```

## Vercel 路由配置

已更新 `vercel.json`，支持以下路由：

- `/year-in-review` → 主应用
- `/year-in-review/*` → 主应用路由
- `/dessert-soul` → dessert-soul 应用
- `/dessert-soul/*` → dessert-soul 静态资源

## 验证

迁移完成后：

1. 提交更改：
   ```bash
   git add dessert-soul/ vercel.json
   git commit -m "feat: 添加 dessert-soul 子路径支持"
   git push
   ```

2. 部署到 Vercel 后，访问：
   - `https://your-domain.com/year-in-review` (主应用)
   - `https://your-domain.com/dessert-soul` (dessert-soul 应用)

3. 检查浏览器控制台，确保没有 404 错误

## 故障排除

### 资源加载失败 (404)

- 检查 `index.html` 中的路径是否为相对路径
- 检查 Vercel 部署日志
- 确保 `vercel.json` 路由规则正确

### 页面空白

- 检查浏览器控制台错误
- 确认所有资源文件都已复制
- 验证 `index.html` 中的脚本路径

