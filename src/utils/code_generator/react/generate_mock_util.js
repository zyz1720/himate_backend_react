import { toFirstUpperCase } from '@/utils/common/string_util';
import { isEmptyObject } from '@/utils/common/object_util';
import { autoTimeTypes } from '@/constants/code_generator';
import mockJS from 'mockjs';
/**
 * 生成Mock数据
 * @param {object} tableInfo - 表信息对象，包含表名和字段信息
 * @param {number} count - 生成的Mock数据数量，默认值为10
 * @returns {array} - 包含Mock数据的数组
 */
export function generateMockData(tableInfo, count = 18) {
  const { fields } = tableInfo;
  const mockData = [];

  for (let i = 1; i <= count; i++) {
    const row = {};

    fields.forEach((field) => {
      if (field.name === 'id') {
        // 使用mockjs生成唯一ID
        row[field.name] = mockJS.mock('@id()');
      } else if (field.name.includes('name') || field.name.includes('title')) {
        // 名称类字段使用中文名称
        row[field.name] = mockJS.mock('@cname()');
      } else if (field.name.includes('email')) {
        // 邮箱字段使用mockjs生成
        row[field.name] = mockJS.mock('@email()');
      } else if (field.name.includes('phone')) {
        // 手机号字段使用mockjs生成
        row[field.name] = mockJS.mock('@integer(13000000000, 19999999999)');
      } else if (field.type.includes('int')) {
        // 整数类型字段
        row[field.name] = mockJS.mock('@integer(0, 1000)');
      } else if (
        field.type.includes('float') ||
        field.type.includes('double') ||
        field.type.includes('decimal')
      ) {
        // 浮点数类型字段
        row[field.name] = mockJS.mock('@float(0, 1000, 2, 4)');
      } else if (field.valueType === 'dateTime') {
        // 日期时间类型字段
        row[field.name] = mockJS.mock('@datetime()');
      } else if (field.type.includes('boolean')) {
        // 布尔类型字段
        row[field.name] = mockJS.mock('@boolean()');
      } else if (!isEmptyObject(field.valueEnum)) {
        // 枚举类型字段使用枚举值
        row[field.name] = mockJS.mock(
          '@pick(' + Object.keys(field.valueEnum) + ')',
        );
      } else if (field.valueType === 'textarea') {
        // 枚举类型字段使用枚举值
        row[field.name] = mockJS.mock('@csentence(20, 50)');
      } else {
        // 其他字符串类型字段
        row[field.name] = mockJS.mock('@csentence(3, 8)');
      }
    });

    mockData.push(row);
  }

  return mockData;
}

/**
 * 生成Mock文件内容
 * @param {object} tableInfo - 表信息对象，包含表名和字段信息
 * @returns {string} - 包含Mock文件内容的字符串
 */
export function generateMockFile(tableInfo) {
  const { tableName, tableComment, fields } = tableInfo;
  const mockData = generateMockData(tableInfo);
  const camelCaseName = toFirstUpperCase(tableName);
  const endpoint = tableName.replace(/_/g, '-');

  // 筛选可搜索字段
  const searchFields = fields
    .filter((field) => !field.hideInSearch)
    .map((field) => field.name);
  const searchFieldsStr = searchFields.join(', ');

  // 筛选自动创建时间字段
  const autoCreateField = fields.find(
    (field) => field.autoTimeType === autoTimeTypes[0],
  )?.name;

  // 筛选自动更新时间字段
  const autoUpdateField = fields.find(
    (field) => field.autoTimeType === autoTimeTypes[1],
  )?.name;

  const mockContent = `// 模拟${tableComment || tableName}数据
const ${camelCaseName}List = ${JSON.stringify(mockData, null, 2)};

// 生成唯一ID
function generateId() {
  return Date.now().toString();
}

export default [
  // 获取${tableComment || tableName}列表
  {
    url: '/${endpoint}',
    method: 'get',
    response: (config) => {
      // 模拟分页和搜索
      const { current = 1, pageSize = 10, ${searchFieldsStr} } = config.query;

      let filteredList = ${camelCaseName}List;

      // 根据关键词搜索
      ${searchFields
        .map(
          (field) => `
      if (${field}) {
        filteredList = ${camelCaseName}List.filter(
          (item) =>
          {
            if(typeof item.${field} === 'string') {
              return item.${field}.includes(${field});
            }
            return item.${field} == ${field};
          }
        );
      }
      `,
        )
        .join('')}

      // 分页处理
      const start = (current - 1) * pageSize;
      const end = start + Number(pageSize);
      const paginatedList = filteredList.slice(start, end);

      return {
        code: 0,
        data: {
          list: paginatedList,
          total: filteredList.length,
          current: Number(current),
          pageSize: Number(pageSize),
        },
      };
    },
  },

  // 获取${tableComment || tableName}详情
  {
    url: '/${endpoint}/:id',
    method: 'get',
    response: (config) => {
      const { id } = config.query;
      const item = ${camelCaseName}List.find((item) => item.id === id);

      if (item) {
        return {
          code: 0,
          data: item,
        };
      } else {
        return {
          code: 1,
          message: '${tableComment || tableName}不存在',
        };
      }
    },
  },

  // 新增${tableComment || tableName}
  {
    url: '/${endpoint}',
    method: 'post',
    response: (config) => {
      const data = config.body;
      const now = new Date().toISOString();

      const newItem = {
        id: generateId(),
        ...data,
        ${
          autoCreateField ? `${autoCreateField}: new Date().toISOString(),` : ''
        }
        ${
          autoUpdateField ? `${autoUpdateField}: new Date().toISOString(),` : ''
        }
      };

      ${camelCaseName}List.unshift(newItem); // 添加到列表开头

      return {
        code: 0,
        data: newItem,
        message: '新增${tableComment || tableName}成功',
      };
    },
  },

  // 更新${tableComment || tableName}
  {
    url: '/${endpoint}/:id',
    method: 'put',
    response: (config) => {
      const { id } = config.query;
      const data = config.body;
      const index = ${camelCaseName}List.findIndex((item) => item.id === id);

      if (index !== -1) {
        ${camelCaseName}List[index] = {
          ...${camelCaseName}List[index],
          ...data,
           ${
             autoUpdateField
               ? `${autoUpdateField}: new Date().toISOString(),`
               : ''
           }
        };

        return {
          code: 0,
          data: ${camelCaseName}List[index],
          message: '更新${tableComment || tableName}成功',
        };
      } else {
        return {
          code: 1,
          message: '${tableComment || tableName}不存在',
        };
      }
    },
  },

  // 删除${tableComment || tableName}
  {
    url: '/${endpoint}/:id',
    method: 'delete',
    response: (config) => {
      const { id } = config.query;
      const index = ${camelCaseName}List.findIndex((item) => item.id === id);

      if (index !== -1) {
        const deletedItem = ${camelCaseName}List.splice(index, 1)[0];

        return {
          code: 0,
          data: deletedItem,
          message: '删除${tableComment || tableName}成功',
        };
      } else {
        return {
          code: 1,
          message: '${tableComment || tableName}不存在',
        };
      }
    },
  },
];`;

  return mockContent;
}
