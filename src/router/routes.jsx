import {
  AiFillHome,
  AiFillExclamationCircle,
  AiFillTool,
  AiFillCode,
  AiFillAndroid,
  AiFillContacts,
  AiFillEye,
  AiFillFolderOpen,
} from 'react-icons/ai';
import { BiSolidUser, BiSolidGroup, BiSolidChat } from 'react-icons/bi';
import { HiUserGroup } from 'react-icons/hi2';
import {
  BsMusicNoteList,
  BsFileEarmarkMusicFill,
  BsFileEarmarkMusic,
} from 'react-icons/bs';

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
  {
    path: '/app_package',
    key: 'app_package',
    name: i18n.t('app_package.menu_name'),
    element: React.createElement(
      React.lazy(() => import('@/pages/app_package/AppPackage')),
    ),
    icon: <AiFillAndroid />,
  },
  {
    path: '/mate',
    key: 'mate',
    name: i18n.t('mate.menu_name'),
    element: React.createElement(React.lazy(() => import('@/pages/mate/Mate'))),
    icon: <BiSolidGroup />,
  },
  {
    path: '/groups',
    key: 'groups',
    name: i18n.t('group.menu_name'),
    icon: <HiUserGroup />,
    redirect: '/groups/group',
    routes: [
      {
        path: '/groups/group',
        key: 'group',
        name: i18n.t('group.menu_name'),
        element: React.createElement(
          React.lazy(() => import('@/pages/group/Group')),
        ),
        icon: <HiUserGroup />,
      },
      {
        path: '/groups/group_member',
        key: 'group_member',
        name: i18n.t('group_member.menu_name'),
        element: React.createElement(
          React.lazy(() => import('@/pages/group/GroupMember')),
        ),
        icon: <AiFillContacts />,
      },
    ],
  },
  {
    path: '/messages',
    key: 'messages',
    name: i18n.t('message.menu_name'),
    icon: <BiSolidChat />,
    redirect: '/messages/session',
    routes: [
      {
        path: '/messages/session',
        key: 'session',
        name: i18n.t('session.menu_name'),
        element: React.createElement(
          React.lazy(() => import('@/pages/messages/Session')),
        ),
        icon: <BiSolidChat />,
      },
      {
        path: '/messages/message',
        key: 'message',
        name: i18n.t('message.menu_name'),
        element: React.createElement(
          React.lazy(() => import('@/pages/messages/Message')),
        ),
        icon: <BiSolidChat />,
      },
      {
        path: '/messages/message_read_records',
        key: 'message_read_records',
        name: i18n.t('message_read_records.menu_name'),
        element: React.createElement(
          React.lazy(() => import('@/pages/messages/MessageReadRecords')),
        ),
        icon: <AiFillEye />,
      },
    ],
  },
  {
    path: '/file',
    key: 'file',
    name: i18n.t('file.menu_name'),
    element: React.createElement(React.lazy(() => import('@/pages/file/File'))),
    icon: <AiFillFolderOpen />,
  },
  {
    path: '/songs',
    key: 'songs',
    name: i18n.t('music.menu_name'),
    icon: <BsFileEarmarkMusicFill />,
    redirect: '/songs/music',
    routes: [
      {
        path: '/songs/music',
        key: 'music',
        name: i18n.t('music.menu_name'),
        element: React.createElement(
          React.lazy(() => import('@/pages/music/Music')),
        ),
        icon: <BsFileEarmarkMusicFill />,
      },
      {
        path: '/songs/music_extra',
        key: 'music_extra',
        name: i18n.t('music_extra.menu_name'),
        element: React.createElement(
          React.lazy(() => import('@/pages/music/MusicExtra')),
        ),
        icon: <BsFileEarmarkMusic />,
      },
      {
        path: '/songs/favorites',
        key: 'favorites',
        name: i18n.t('favorites.menu_name'),
        element: React.createElement(
          React.lazy(() => import('@/pages/music/Favorites')),
        ),
        icon: <BsMusicNoteList />,
      },
    ],
  },
];
