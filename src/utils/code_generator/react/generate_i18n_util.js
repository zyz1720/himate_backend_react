/**
 * 生成i18n文件内容
 * @param {object} tableInfo - 表信息对象，包含表名、表注释和字段信息
 * @returns {string} - 包含i18n文件内容的字符串
 */
export function generateI18nFile(tableInfo) {
  const { tableName, tableComment, menuName, fields } = tableInfo;

  const i18nContent = {};
  i18nContent.table_name = tableComment || tableName;
  i18nContent.menu_name = menuName || tableName;

  fields.forEach((field) => {
    i18nContent[field.name] = field.comment || field.name;
  });

  return JSON.stringify(i18nContent, null, 2);
}
