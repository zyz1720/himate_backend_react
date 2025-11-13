
import { BiSolidGroup } from 'react-icons/bi';
import React from 'react';
import i18n from 'i18next';
  export default [
  {
    path: '/mate',
    key: 'mate',
    name: i18n.t('mate.menu_name'),
    element: React.createElement(
      React.lazy(() => import('@/pages/mate/Mate')),
    ),
    icon: <BiSolidGroup />,
  }
];