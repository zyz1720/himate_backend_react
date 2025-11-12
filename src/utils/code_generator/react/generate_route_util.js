import { toFirstUpperCase } from '@/utils/common/string_util';

/**
 * 生成路由信息文件内容
 * @param {object} tableInfo - 表信息对象，包含表名和字段信息
 * @returns {string} - 包含路由信息的文件内容
 */
export function generateRouteFile(tableInfo) {
  const { tableName, menuIcon, menuIconPath } = tableInfo;
  const defaultMenuIcon = 'AiFillCode';
  const defaultMenuIconPath = 'react-icons/ai';

  const routeContent = `
import { ${menuIcon || defaultMenuIcon} } from '${
    menuIconPath || defaultMenuIconPath
  }';
import React from 'react';
import i18n from 'i18next';
  export default [
  {
    path: '/${tableName}',
    key: '${tableName}',
    name: i18n.t('${tableName}.menu_name'),
    element: React.createElement(
      React.lazy(() => import('@/pages/${tableName}/${toFirstUpperCase(
    tableName,
  )}')),
    ),
    icon: <${menuIcon || defaultMenuIcon} />,
  }
];`;

  return routeContent;
}
