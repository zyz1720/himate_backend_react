<a href="./README.EN.md" >English</a> | <a href="./README.md" >简体中文</a>

# Himate React Backend

Himate React Backend is the React-based backend management system for the Himate project.

## ✨ Features

- 🎨 Modern UI design based on Ant Design
- 🌐 Internationalization support (Chinese/English)
- 📊 Multi-module management system (user, team, group, message, file, music, etc.)
- 🛠️ Built-in development tools (code generator, JSON editor, icon selector)
- 📱 Responsive layout, supporting multi-device access
- 🔒 Comprehensive permission management
- 📝 Rich form and table components
- 📦 Modular architecture, easy to extend

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 6
- **UI Component Library**: Ant Design 5
- **Routing Management**: React Router 7
- **State Management**: Zustand 5
- **Internationalization**: i18next, react-i18next
- **Styling Solution**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Mock Data**: Mock.js
- **Code Standards**: ESLint, Prettier

## 📁 Project Structure

```
himate_react_backend/
├── public/                 # Static resources
├── src/
│   ├── api/               # API interface definitions
│   │   ├── auth/          # Authentication-related interfaces
│   │   ├── pages/         # Page-related interfaces
│   │   └── upload/        # File upload interfaces
│   ├── components/        # Common components
│   ├── config/            # Configuration files
│   ├── constants/         # Constant definitions
│   ├── i18n/              # Internationalization resources
│   ├── layout/            # Layout components
│   ├── mock/              # Mock data
│   ├── pages/             # Page components
│   │   ├── ability/       # Development tools
│   │   ├── auth/          # Authentication pages
│   │   ├── group/         # Group management
│   │   ├── messages/      # Message management
│   │   ├── music/         # Music management
│   │   └── user/          # User management
│   ├── router/            # Routing configuration
│   ├── stores/            # State management
│   ├── styles/            # Global styles
│   ├── utils/             # Utility functions
│   └── main.jsx           # Application entry
├── .env.development       # Development environment configuration
├── .env.production        # Production environment configuration
├── package.json           # Project dependencies
└── vite.config.js         # Vite configuration
```

## 🚀 Quick Start

### Environment Requirements

- Node.js ≥ 18.0.0
- Yarn ≥ 1.22.0

### Install Dependencies

```bash
yarn
```

### Development Mode

```bash
yarn dev
```

The application will start at `http://localhost:8080`.

### Build Production Version

```bash
yarn build
```

Build artifacts will be generated in the `dist` directory.

### Preview Production Version

```bash
yarn preview
```

### Code Style Check

```bash
yarn lint
```

## 📖 Feature Modules

### 1. User Management
- User information management
- User permission configuration
- User status management

### 2. Application Package Management
- Application package information management
- Application package version control

### 3. Team Management
- Team information management
- Team member management

### 4. Group Management
- Group information management
- Group member management

### 5. Message Management
- Session management
- Message management
- Message read records

### 6. File Management
- File upload and download
- File classification management
- Recycle bin function

### 7. Music Management
- Music information management
- Music favorites function
- Music extended information

## 🌐 Internationalization

The project supports Chinese/English switching. Internationalization resources are located in the `src/i18n/langs` directory.

- Chinese: `src/i18n/langs/zh-CN`
- English: `src/i18n/langs/en-US`

## 🎨 Custom Theme

You can customize theme styles by modifying CSS files in the `src/styles` directory, or adjust theme variables through the Tailwind CSS configuration file `tailwind.config.js`.

## 🔧 Configuration

### Environment Variables

- **Development Environment**: `.env.development`
- **Production Environment**: `.env.production`

### Routing Configuration

Routing configuration is located in `src/router/routes.jsx`. You can add or modify routes as needed.

### API Configuration

API configuration is located in `src/api/config.js`. You can configure API base path and request interceptors.

### Open Source License

This project is open source under the MIT License. You can freely use, modify, and distribute the code of this project as long as you comply with the terms of the license.

### Related Projects
- **Frontend**: [Himate React Native App](https://gitee.com/zyz1720/himate_app_rn)
- **Backend**: [Himate NestJS Server](https://gitee.com/zyz1720/himate_server_nest)
