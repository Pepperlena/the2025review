# Dessert Soul

这个目录包含 dessert-soul 项目的构建产物。

## 迁移步骤

1. 找到你的 dessert-soul 项目的 `dist` 目录
2. 将 `dist` 目录中的所有内容复制到这个 `dessert-soul` 目录中
3. 确保所有资源路径使用相对路径（适配子目录部署）

## 目录结构

```
dessert-soul/
  ├── index.html
  ├── assets/
  │   ├── *.js
  │   ├── *.css
  │   └── *.png/jpg/svg (图片资源)
  └── ... (其他静态资源)
```

## 注意事项

- 所有资源路径应该是相对路径（如 `./assets/` 而不是 `/assets/`）
- 如果使用绝对路径，需要确保它们指向 `/dessert-soul/` 前缀
- 确保 `index.html` 中的资源引用使用相对路径

