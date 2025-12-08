<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1iELUFOnmio3bcr2vBLX-QAGfIl9spRRe

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

**重要：** 这个项目需要 Gemini API Key 才能正常工作。

### 部署步骤：

1. **推送代码到 GitHub**（如果还没有）

2. **在 Vercel 中导入项目**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "Add New Project"
   - 选择你的 GitHub 仓库

3. **配置环境变量**
   - 在项目设置中找到 "Environment Variables"
   - 添加以下环境变量：
     - **Name:** `GEMINI_API_KEY`
     - **Value:** 你的 Gemini API Key
   - 确保为所有环境（Production, Preview, Development）都设置了该变量

4. **部署**
   - Vercel 会自动检测到这是一个 Vite 项目并开始构建
   - 部署完成后，你的应用就可以正常使用了

### 安全说明：

✅ **已优化：** API Key 现在只在服务端（Vercel Serverless Function）使用，不会暴露给客户端，确保安全性。
