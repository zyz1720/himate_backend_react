import {
  AiFillHome,
  AiFillExclamationCircle,
  AiFillTool,
  AiFillCode,
  AiFillBook,
  AiOutlineTable,
} from 'react-icons/ai';
import { BiSolidGroup, BiSolidUser } from 'react-icons/bi';
import i18n from 'i18next';
import React from 'react';

/* 路由配置
  - path: string, 路由路径
  - name: string, 路由名称
  - key: string, 路由key，用于唯一标识路由
  - icon: ReactNode, 路由图标
  - element: ReactNode, 路由元素
  - redirect: string, 路由重定向路径
  - routes: RouteConfig[], 子路由
  - hideInMenu: boolean, 是否在菜单中隐藏该路由
*/
export default [
  {
    path: '/welcome',
    key: 'welcome',
    name: i18n.t('routes.welcome'),
    icon: <AiFillHome />,
    element: React.createElement(
      React.lazy(() => import('@/pages/common/Welcome')),
    ),
  },
  {
    path: '/notfound',
    key: 'notfound',
    name: i18n.t('common.notfound'),
    icon: <AiFillExclamationCircle />,
    hideInMenu: true,
    element: React.createElement(
      React.lazy(() => import('@/pages/common/NotFound')),
    ),
  },
  {
    path: '/ability',
    key: 'ability',
    name: i18n.t('routes.ability'),
    icon: <AiFillTool />,
    redirect: '/ability/code_generator',
    routes: [
      {
        path: '/ability/code_generator',
        key: 'code_generator',
        name: i18n.t('routes.code_generator'),
        element: React.createElement(
          React.lazy(() => import('@/pages/ability/CodeGenerator')),
        ),
        icon: <AiFillCode />,
      },
      {
        path: '/ability/json_editor',
        key: 'json_editor',
        name: i18n.t('routes.json_editor'),
        element: React.createElement(
          React.lazy(() => import('@/pages/ability/JsonEditor')),
        ),
        icon: <AiFillCode />,
      },
      {
        path: '/ability/icon_selector',
        key: 'icon_selector',
        name: i18n.t('routes.icon_selector'),
        element: React.createElement(
          React.lazy(() => import('@/pages/ability/IconSelector')),
        ),
        icon: <AiFillCode />,
      },
    ],
  },
  {
    path: '/user',
    key: 'user',
    name: i18n.t('user.menu_name'),
    element: React.createElement(React.lazy(() => import('@/pages/user/User'))),
    icon: <BiSolidUser />,
  },
];
