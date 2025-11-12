# PROCOMP Backend

这是一个基于 React 18 构建的现代化管理系统前端框架，集成了 Ant Design Pro、Tailwind CSS、国际化等功能，提供了完整的权限管理、布局配置，集成了完整的react gin nestjs的CURD代码生成功能，支持可视化配置和一键应用。

## 技术栈

### 核心框架
- **React 18** - 前端 UI 库
- **Vite 6** - 下一代前端构建工具
- **React Router 7** - 路由管理

### UI 与样式
- **Ant Design 5** - 企业级 UI 组件库
- **@ant-design/pro-components** - Ant Design Pro 组件集合
- **Tailwind CSS 4** - 实用优先的 CSS 框架

### 状态管理与数据流
- **Zustand 5** - 轻量级状态管理库
- **Axios** - HTTP 客户端

### 国际化与工具
- **i18next** - 国际化框架
- **dayjs** - 轻量级日期处理库
- **Mock.js** - 模拟数据生成

### 辅助功能
- **React Quill** - 富文本编辑器
- **jszip** - 压缩/解压工具
- **node-sql-parser** - SQL 解析工具

## 功能特性

### 1. 完整的布局系统
- 响应式布局设计，支持桌面端和移动端
- 可配置的导航菜单和面包屑
- 支持深色/浅色主题切换
- 全屏模式支持

### 2. 用户认证与权限管理
- 登录认证流程
- 基于角色的路由权限控制
- 路由守卫保护

### 3. 国际化支持
- 中英文语言切换
- 统一的国际化配置管理

### 4. 开发辅助功能
- 代码生成器
- JSON 编辑器
- 表格示例

### 5. 状态管理
- 布局配置状态管理
- 用户信息状态管理
- 应用状态管理

## 项目结构

```
├── src/
│   ├── api/           # API 接口定义
│   ├── assets/        # 静态资源
│   ├── components/    # 公共组件
│   ├── config/        # 配置文件
│   ├── constants/     # 常量定义
│   ├── i18n/          # 国际化资源
│   ├── layout/        # 布局组件
│   ├── main.jsx       # 应用入口
│   ├── mock/          # 模拟数据
│   ├── pages/         # 页面组件
│   ├── router/        # 路由配置
│   ├── stores/        # 状态管理
│   ├── styles/        # 全局样式
│   └── utils/         # 工具函数
├── public/            # 公共资源
├── vite.config.js     # Vite 配置
└── package.json       # 项目依赖
```

## 核心页面与功能

### 认证相关
- **登录页面** - 用户身份认证入口

### 首页与通用
- **欢迎页面** - 系统首页
- **404页面** - 页面未找到

### 开发工具
- **代码生成器** - 快速生成代码模板
- **JSON 编辑器** - 在线 JSON 编辑工具

### 示例功能
- **表格示例** - 展示 Ant Design 表格组件的使用

## 快速开始

### 环境要求
- Node.js 18+
- npm/yarn/pnpm

### 安装依赖

```bash
# 使用 yarn
yarn

# 或使用 npm
npm install

# 或使用 pnpm
pnpm install
```

### 启动开发服务器

```bash
# 使用 yarn
yarn dev

# 或使用 npm
npm run dev

# 或使用 pnpm
pnpm dev
```

### 构建生产版本

```bash
# 使用 yarn
yarn build

# 或使用 npm
npm run build

# 或使用 pnpm
pnpm build
```

### 预览生产版本

```bash
# 使用 yarn
yarn preview

# 或使用 npm
npm run preview

# 或使用 pnpm
pnpm preview
```

## 环境配置

项目使用 `.env` 文件管理环境变量：
- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置

## 开发指南

### 添加新页面

1. 在 `src/pages` 目录下创建页面组件
2. 在 `src/router/routes.jsx` 中添加路由配置
3. 如需 API 调用，在 `src/api` 中定义接口
4. 如需模拟数据，在 `src/mock` 中配置

### 样式管理

- 使用 Tailwind CSS 进行快速样式开发
- 使用 Ant Design 组件的内置样式
- 全局样式定义在 `src/styles` 目录下

### 状态管理

- 使用 Zustand 创建 store
- 主要的 store 文件位于 `src/stores` 目录
  - `userStore.js` - 用户相关状态
  - `layoutStore.js` - 布局配置状态
  - `statusStore.js` - 应用状态

### 国际化开发

1. 在 `src/i18n/langs` 中添加翻译文本
2. 使用 `useTranslation` hook 访问翻译
3. 使用 `t('key')` 形式调用翻译

## 注意事项

1. 项目使用 `@` 作为 `src` 目录的别名
2. 路由使用 HashRouter 模式
3. 组件懒加载已配置，自动优化性能
4. 深色模式通过 CSS 变量和 Ant Design 主题配置实现

## 配套设施
1. gin后端：https://gitee.com/zyz1720/gin_server
1. nestjs后端：https://gitee.com/zyz1720/nest_server
