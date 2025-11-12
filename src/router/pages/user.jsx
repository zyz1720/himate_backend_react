
import { BiSolidUser } from 'react-icons/bi';
import React from 'react';
import i18n from 'i18next';
  export default [
  {
    path: '/user',
    key: 'user',
    name: i18n.t('user.menu_name'),
    element: React.createElement(
      React.lazy(() => import('@/pages/user/User')),
    ),
    icon: <BiSolidUser />,
  }
];