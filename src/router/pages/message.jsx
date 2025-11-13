
import { BiSolidChat } from 'react-icons/bi';
import React from 'react';
import i18n from 'i18next';
  export default [
  {
    path: '/message',
    key: 'message',
    name: i18n.t('message.menu_name'),
    element: React.createElement(
      React.lazy(() => import('@/pages/messages/Message')),
    ),
    icon: <BiSolidChat />,
  }
];