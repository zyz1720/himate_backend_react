
import { BsMusicNoteList } from 'react-icons/bs';
import React from 'react';
import i18n from 'i18next';
  export default [
  {
    path: '/favorites',
    key: 'favorites',
    name: i18n.t('favorites.menu_name'),
    element: React.createElement(
      React.lazy(() => import('@/pages/favorites/Favorites')),
    ),
    icon: <BsMusicNoteList />,
  }
];