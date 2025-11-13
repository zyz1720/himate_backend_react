
import { HiUserGroup } from 'react-icons/hi2';
import React from 'react';
import i18n from 'i18next';
  export default [
  {
    path: '/group',
    key: 'group',
    name: i18n.t('group.menu_name'),
    element: React.createElement(
      React.lazy(() => import('@/pages/group/Group')),
    ),
    icon: <HiUserGroup />,
  }
];