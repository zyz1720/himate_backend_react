import { toFirstUpperCase } from '@/utils/common/string_util';

/**
 * 生成API文件内容
 * @param {object} tableInfo - 表信息对象，包含表名和字段信息
 * @returns {string} - 包含API文件内容的字符串
 */
export function generateApiFile(tableInfo) {
  const { tableName, tableComment } = tableInfo;

  const camelCaseName = toFirstUpperCase(tableName);
  const endpoint = tableName.replace(/_/g, '-');

  const apiContent = `import instance from '@/utils/request/axios_instance';

/* 获取${tableComment || tableName}列表 */
export const get${camelCaseName}List = (params) => instance.get('${endpoint}', { params: params });

/* 获取${tableComment || tableName}详情 */
export const get${camelCaseName}Detail = (id) => instance.get(\`${endpoint}/\${id}\`);

/* 新增${tableComment || tableName} */
export const add${camelCaseName} = (data) => instance.post('${endpoint}', data);

/* 更新${tableComment || tableName} */
export const update${camelCaseName} = (id, data) => instance.put(\`${endpoint}/\${id}\`, data);

/* 删除${tableComment || tableName} */
export const delete${camelCaseName} = (id) => instance.delete(\`${endpoint}/\${id}\`);`;

  return apiContent;
}
