
import { AiFillProfile } from 'react-icons/ai';
import React from 'react';
import i18n from 'i18next';
  export default [
  {
    path: '/session',
    key: 'session',
    name: i18n.t('session.menu_name'),
    element: React.createElement(
      React.lazy(() => import('@/pages/messages/Session')),
    ),
    icon: <AiFillProfile />,
  }
];