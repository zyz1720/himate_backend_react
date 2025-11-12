import { Parser } from 'node-sql-parser';
import {
  numberTypes,
  charTypes,
  textTypes,
  fileTypes,
  timeTypes,
  codeTypes,
  autoTimeTypes,
} from '@/constants/code_generator';

/**
 * SQL表解析器 - 优化版本，支持更多SQL格式和复杂字段定义
 * @param {string} sql - 原始SQL语句字符串
 * @returns {object} - 包含表名、注释和字段信息的对象
 */
export function parseSQLTable(sql) {
  try {
    // 输入验证
    if (!sql || typeof sql !== 'string' || sql.trim() === '') {
      throw new Error('SQL content cannot be empty');
    }

    const parser = new Parser();
    const ast = parser.astify(sql);

    const createTableNode = extractTableInfo(ast);

    if (!createTableNode) {
      throw new Error('No valid CREATE TABLE statement found');
    }
    return createTableNode;
  } catch (error) {
    // 包装错误信息，使提示更友好
    const friendlyError = error.message;
    throw new Error(friendlyError);
  }
}

/**
 * 提取表信息
 * @param {object} ast - 解析后的AST
 * @returns {object} - 包含表名、注释和字段信息的对象
 */
function extractTableInfo(ast) {
  if (!ast || !Array.isArray(ast))
    throw new Error(
      'No valid AST resolved, please check input or delete comments and try again',
    );
  console.log(ast);

  // 如果是数组，返回第一个符合条件的节点
  for (const node of ast) {
    if (
      node?.type === 'create' &&
      node?.table?.length > 0 &&
      node?.create_definitions?.length > 0 &&
      node?.table_options?.length > 0
    ) {
      const tableName = node.table[0]?.table || '';
      const tableComment = (
        node.table_options.find((option) => option.keyword === 'comment')
          ?.value ||
        node.table[0]?.table ||
        ''
      ).replace(/^['"](.*)['"]$/, '$1');
      const fields = extractFieldInfo(node?.create_definitions);
      return {
        tableInfo: {
          tableName: tableName,
          tableComment: tableComment,
          menuName: tableComment,
          menuIcon: '',
          menuIconPath: '',
        },
        fields: fields,
      };
    }
  }

  return {};
}

/**
 * 提取字段信息
 * @param {object[]} columns - 列定义对象数组
 * @returns {object[]} - 格式化后的字段信息数组
 */
function extractFieldInfo(columns) {
  const fields = [];
  let primaryKey = 'id';
  const indexList = [];
  const uniqueList = [];

  // 遍历列定义，提取字段信息和约束
  columns.forEach((column) => {
    if (column?.resource === 'column' && column?.column) {
      // 使用默认值和可选链操作符简化字段创建
      const field = {
        name: column?.column?.column || '',
        comment: column?.comment?.value?.value || '',
        type: (column?.definition?.dataType || '').toLowerCase(),
        length: column?.definition?.length || null,
        suffix: column?.definition?.suffix || [],
        nullable: column?.nullable?.value || 'null',
        default: column?.default_val?.value?.value,
        isPrimaryKey: false,
        isIndex: false,
        isUnique: false,
        valueType: 'text',
        proFormType: 'ProFormText',
        renderType: 'text',
        formRegExp: null,
        colWidth: 120,
        autoTimeType: '',
        hideInTable: false,
        hideInForm: false,
        hideInDetail: false,
        hideInSearch: false,
        isRequired: false,
        isCopyable: false,
        isEditable: false,
        isDisable: false,
        isEllipsis: false,
        isFilterable: false,
        isSortable: false,
        valueEnum: {},
      };

      // 使用映射表简化类型判断和设置
      const typeMap = [
        {
          types: charTypes,
          valueType: 'text',
          proFormType: 'ProFormText',
          isSortable: false,
        },
        {
          types: numberTypes,
          valueType: 'digit',
          proFormType: 'ProFormDigit',
          isSortable: true,
        },
        {
          types: textTypes,
          valueType: 'textarea',
          proFormType: 'ProFormTextArea',
          isSortable: false,
        },
        {
          types: fileTypes,
          valueType: 'image',
          proFormType: 'ProFormUploadDragger',
          isSortable: false,
        },
        {
          types: timeTypes,
          valueType: 'dateTime',
          proFormType: 'ProFormDateTimePicker',
          isSortable: true,
        },
        {
          types: codeTypes,
          valueType: 'jsonCode',
          proFormType: 'ProFormTextArea',
          isSortable: false,
        },
      ];

      // 设置字段类型
      const matchedType = typeMap.find((map) =>
        map.types.some((type) => field.type.includes(type)),
      );
      if (matchedType) {
        field.valueType = matchedType.valueType;
        field.proFormType = matchedType.proFormType;
        field.isSortable = matchedType.isSortable;
      }

      // 判断是否为自动时间类型
      const autoTimeType = autoTimeTypes.find((type) =>
        field.name.startsWith(type),
      );
      if (autoTimeType) {
        field.autoTimeType = autoTimeType;
        field.hideInForm = true;
        field.hideInSearch = true;
      }

      // 处理枚举类型
      if (field.type === 'enum') {
        field.valueType = 'select';
        field.proFormType = 'ProFormSelect';
        field.isFilterable = true;
        (column.definition?.expr?.value || []).forEach((option) => {
          field.valueEnum[option.value] = {
            text: option.value,
            status: 'Default',
          };
        });
      }

      // 处理是否必填
      field.isRequired = field.nullable === 'not null';

      // 处理是否可复制
      field.isCopyable = field.valueType === 'text';

      // 处理是否自动缩略
      field.isEllipsis = field.valueType === 'textarea';

      fields.push(field);
    }

    // 提取约束信息
    if (column?.resource === 'constraint') {
      if (column?.constraint_type === 'primary key') {
        primaryKey = column?.definition[0]?.column;
      }
      if (column?.constraint_type === 'unique key') {
        uniqueList.push(column?.definition[0]?.column);
      }
    }

    // 提取索引信息
    if (column?.resource === 'index') {
      indexList.push(column?.definition[0]?.column);
    }
  });

  // 处理字段属性
  fields.forEach((field) => {
    // 设置主键属性
    if (field.name === primaryKey) {
      Object.assign(field, {
        isPrimaryKey: true,
        hideInTable: true,
        hideInForm: true,
        hideInDetail: true,
        hideInSearch: true,
      });
    }
    // 设置索引和唯一属性
    field.isIndex = indexList.includes(field.name);
    field.isUnique = uniqueList.includes(field.name);
  });

  return fields;
}
