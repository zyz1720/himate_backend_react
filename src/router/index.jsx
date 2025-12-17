import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/stores/userStore';
import { useSettingStore } from '@/stores/settingStore';
import { useLayoutStore } from '@/stores/layoutStore';
import { hasRouteAccess } from '@/utils/common/layout_util';
import { ConfigProvider, App, theme } from 'antd';
import { dayjsLocaleMap, localeMap } from '@/constants/locale';
import routes from './routes';
import React, { useEffect, Suspense } from 'react';
import Login from '@/pages/auth/Login';
import Index from '@/layout/index';
import FullscreenLoading from '@/components/common/FullscreenLoading';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

// 递归渲染路由，支持父级路由自动重定向到第一个子路由
const renderRoutes = (routes) => {
  return routes.map((route) => {
    // 重定向渲染
    if (route.redirect) {
      return (
        <React.Fragment key={route.key}>
          <Route
            path={route.path}
            element={<Navigate to={route.redirect} replace />}
          />
          {/* 渲染子路由 */}
          {renderRoutes(route.routes)}
        </React.Fragment>
      );
    }
    return <Route key={route.key} path={route.path} element={route.element} />;
  });
};

// 路由拦截器高阶组件
const AuthGuard = ({ children }) => {
  const { isLogin } = useUserStore();
  const { routesConfig } = useLayoutStore();

  const whiteList = ['/login', '/notfound'];

  const { pathname } = useLocation();

  // 不需要权限的页面
  const notRequiredAuth = whiteList.includes(pathname);

  // 用户可以访问的路由
  const canAccessRoutes = hasRouteAccess(pathname, routesConfig);

  // 如果访问的是根路径，重定向到welcome页面
  if (pathname === '/') {
    return <Navigate to="/welcome" replace />;
  }

  // 已登录但没有访问权限，重定向到404页面
  if (isLogin && !notRequiredAuth && !canAccessRoutes) {
    return <Navigate to="/notfound" replace />;
  }

  // 未登录或在白名单中，允许访问
  return isLogin || notRequiredAuth ? (
    <Suspense fallback={<FullscreenLoading />}>{children}</Suspense>
  ) : (
    <Navigate to="/login" replace state={pathname} />
  );
};

function Root() {
  const { locale } = useSettingStore();
  const { i18n } = useTranslation();
  const { settingConfig } = useLayoutStore();
  const { isLogin, setUserInfo } = useUserStore();
  const isDarkMode = settingConfig?.navTheme === 'realDark';

  useEffect(() => {
    i18n.changeLanguage(locale);
    dayjs.locale(dayjsLocaleMap[locale]);
  }, [i18n, locale]);

  useEffect(() => {
    if (isLogin) {
      setUserInfo();
    }
  }, [isLogin]);

  return (
    <ConfigProvider
      locale={localeMap[locale]}
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <App>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <AuthGuard>
                  <Index />
                </AuthGuard>
              }
            >
              {renderRoutes(routes)}
            </Route>
            <Route path="*" element={<Navigate to="/notfound" replace />} />
          </Routes>
        </HashRouter>
      </App>
    </ConfigProvider>
  );
}

export default Root;
