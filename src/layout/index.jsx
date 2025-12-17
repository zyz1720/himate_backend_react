import {
  LogoutOutlined,
  SunFilled,
  MoonFilled,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
  DefaultFooter,
} from '@ant-design/pro-components';
import { ConfigProvider, Dropdown, message } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { IoLanguage } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/stores/userStore';
import { useLayoutStore } from '@/stores/layoutStore.js';
import { useSettingStore } from '@/stores/settingStore';
import { useState, useEffect } from 'react';
import { filterRoutes } from '@/utils/common/layout_util';
import routes from '@/router/routes';

const STATIC_URL = import.meta.env.VITE_STATIC_URL;

function Main() {
  const navigate = useNavigate();

  const { t } = useTranslation();
  // 布局配置
  const {
    settingConfig,
    colorList,
    headerConfig,
    footerConfig,
    routesConfig,
    setSettingConfig,
  } = useLayoutStore();
  const { userInfo, clearUserStore } = useUserStore();
  const { locale, setLocale } = useSettingStore();

  const { pathname } = useLocation();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [_routes, setRoutes] = useState([]);

  useEffect(() => {
    setRoutes(filterRoutes(routes, routesConfig));
  }, [routesConfig]);

  useEffect(() => {
    if (settingConfig?.colorPrimary) {
      document.documentElement.style.setProperty(
        '--color-primary',
        settingConfig.colorPrimary,
      );
    }
    if (settingConfig?.navTheme === 'realDark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [settingConfig]);

  if (typeof document === 'undefined') {
    return <div />;
  }

  // 退出登录
  const handleLogout = () => {
    clearUserStore();
    navigate('/login');
    message.success(t('login.logout_success'));
  };

  // 全屏
  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  return (
    <div id="main-layout" className="h-screen overflow-auto">
      <ProConfigProvider hashed={true}>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById('main-layout') || document.body;
          }}
        >
          <ProLayout
            locale={locale}
            {...headerConfig}
            route={{ path: '/', routes: _routes }}
            location={{ pathname }}
            avatarProps={{
              src: userInfo?.user_avatar
                ? STATIC_URL + userInfo?.user_avatar
                : headerConfig.logo,
              title: userInfo?.user_name,
              render: (props, dom) => {
                return (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'logout',
                          icon: <LogoutOutlined />,
                          label: t('login.logout'),
                          onClick: handleLogout,
                        },
                      ],
                    }}
                  >
                    {dom}
                  </Dropdown>
                );
              },
            }}
            actionsRender={(props) => {
              if (props.isMobile) return [];
              if (typeof window === 'undefined') return [];
              return [
                settingConfig?.navTheme === 'light' ? (
                  <MoonFilled
                    key={'dark'}
                    size={20}
                    onClick={() => {
                      setSettingConfig({
                        ...settingConfig,
                        navTheme: 'realDark',
                      });
                    }}
                  />
                ) : (
                  <SunFilled
                    key={'light'}
                    size={20}
                    onClick={() => {
                      setSettingConfig({
                        ...settingConfig,
                        navTheme: 'light',
                      });
                    }}
                  />
                ),
                <div key="FaLanguage">
                  <Dropdown
                    placement="bottom"
                    menu={{
                      selectable: true,
                      defaultSelectedKeys: [locale],
                      items: [
                        {
                          key: 'zh-CN',
                          label: '简体中文',
                          onClick: () => {
                            setLocale('zh-CN');
                            navigate(0);
                          },
                        },
                        {
                          key: 'en-US',
                          label: 'English',
                          onClick: () => {
                            setLocale('en-US');
                            navigate(0);
                          },
                        },
                      ],
                    }}
                  >
                    <IoLanguage size={18} />
                  </Dropdown>
                </div>,
                isFullScreen ? (
                  <FullscreenExitOutlined
                    key={'fullScreen'}
                    size={20}
                    onClick={handleFullScreen}
                  />
                ) : (
                  <FullscreenOutlined
                    key={'fullScreen'}
                    size={20}
                    onClick={handleFullScreen}
                  />
                ),
              ];
            }}
            headerTitleRender={(logo, title, _) => {
              const defaultDom = (
                <a>
                  {logo}
                  {title}
                </a>
              );
              if (typeof window === 'undefined') return defaultDom;
              if (document.body.clientWidth < 1400) {
                return defaultDom;
              }
              if (_.isMobile) return defaultDom;
              return defaultDom;
            }}
            menuFooterRender={(props) => {
              if (props?.collapsed) return undefined;
              return <></>;
            }}
            menuItemRender={(item, dom) => (
              <div
                onClick={() => {
                  navigate(item.path || '/welcome');
                }}
              >
                {dom}
              </div>
            )}
            // 自定义面包屑跳转行为，确保使用hash模式
            itemRender={(route, params, routes) => {
              const last = routes.indexOf(route) === routes.length - 1;
              // 如果是最后一个面包屑项，不添加链接
              if (last) {
                return <span>{route.title}</span>;
              }
              // 自定义链接点击事件，使用navigate函数而不是a标签默认行为
              return (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    // 使用navigate函数进行hash模式跳转
                    navigate(route.path);
                  }}
                >
                  {route.title}
                </a>
              );
            }}
            {...settingConfig}
          >
            <PageContainer>
              <Outlet />
            </PageContainer>
            {settingConfig?.isShowSettingDrawer ? (
              <SettingDrawer
                getContainer={(e) => {
                  if (typeof window === 'undefined') return e;
                  return document.getElementById('main-layout');
                }}
                enableDarkTheme
                disableUrlParams={true}
                settings={settingConfig}
                colorList={colorList}
                onSettingChange={(changeSetting) => {
                  setSettingConfig(changeSetting);
                }}
              />
            ) : null}
            <DefaultFooter {...footerConfig} />
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
}

export default Main;
