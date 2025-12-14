#!/bin/bash

# 迁移 dessert-soul 构建产物到 the2025review 仓库
# 使用方法: ./migrate-dessert-soul.sh /path/to/dessert-soul/dist

if [ -z "$1" ]; then
    echo "❌ 错误: 请提供 dessert-soul 项目的 dist 目录路径"
    echo "使用方法: ./migrate-dessert-soul.sh /path/to/dessert-soul/dist"
    exit 1
fi

SOURCE_DIR="$1"
TARGET_DIR="./dessert-soul"

if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ 错误: 源目录不存在: $SOURCE_DIR"
    exit 1
fi

echo "📦 开始迁移 dessert-soul 构建产物..."
echo "源目录: $SOURCE_DIR"
echo "目标目录: $TARGET_DIR"

# 清空目标目录（保留 .gitkeep 和 README.md）
find "$TARGET_DIR" -type f ! -name ".gitkeep" ! -name "README.md" -delete
find "$TARGET_DIR" -type d -empty -delete

# 复制所有文件
cp -r "$SOURCE_DIR"/* "$TARGET_DIR/" 2>/dev/null || {
    echo "⚠️  警告: 某些文件可能无法复制"
}

echo "✅ 迁移完成！"
echo ""
echo "📝 下一步:"
echo "1. 检查 $TARGET_DIR 目录中的文件"
echo "2. 确保 index.html 中的资源路径使用相对路径"
echo "3. 运行 'git add dessert-soul/' 添加文件"
echo "4. 提交并推送: 'git commit -m \"feat: 添加 dessert-soul 子路径\" && git push'"

