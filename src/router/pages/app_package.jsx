
import { AiFillAndroid } from 'react-icons/ai';
import React from 'react';
import i18n from 'i18next';
  export default [
  {
    path: '/app_package',
    key: 'app_package',
    name: i18n.t('app_package.menu_name'),
    element: React.createElement(
      React.lazy(() => import('@/pages/app_package/AppPackage')),
    ),
    icon: <AiFillAndroid />,
  }
];