
import { AiFillEye } from 'react-icons/ai';
import React from 'react';
import i18n from 'i18next';
  export default [
  {
    path: '/message_read_records',
    key: 'message_read_records',
    name: i18n.t('message_read_records.menu_name'),
    element: React.createElement(
      React.lazy(() => import('@/pages/messages/MessageReadRecords')),
    ),
    icon: <AiFillEye />,
  }
];