
import { AiFillContacts } from 'react-icons/ai';
import React from 'react';
import i18n from 'i18next';
  export default [
  {
    path: '/group_member',
    key: 'group_member',
    name: i18n.t('group_member.menu_name'),
    element: React.createElement(
      React.lazy(() => import('@/pages/group_member/GroupMember')),
    ),
    icon: <AiFillContacts />,
  }
];