import { toFirstUpperCase } from '@/utils/common/string_util';
import { isEmptyObject } from '@/utils/common/object_util';
import {
  numberTypes,
  timeTypes,
  autoTimeTypes,
} from '@/constants/code_generator';

/**
 * 生成Gin框架的model文件
 * @param {object} tableInfo - 表信息对象，包含表名、表注释和字段信息
 * @returns {string} - 包含model文件内容的字符串
 */
export function generateGinModel(tableInfo) {
  const { tableName, tableComment, fields } = tableInfo;
  const modelName = toFirstUpperCase(tableName);

  // 生成字段定义
  let enumListStr = '';
  let fieldsDefinition = '';
  fields.forEach((field) => {
    const {
      name,
      type,
      comment,
      length,
      nullable,
      isIndex,
      isUnique,
      valueEnum,
      isPrimaryKey,
      autoTimeType,
      default: defaultValue,
    } = field;
    let goType = 'string';
    let gormTag = '';
    let swaggerTag = '';

    const enumName = toFirstUpperCase(name) + 'Type';
    const nullableStr = defaultValue ? 'not null' : nullable;

    // 处理指针类型
    const pointerTag =
      nullableStr === 'null' &&
      !isPrimaryKey &&
      !autoTimeTypes.includes(autoTimeType)
        ? '*'
        : '';

    // 构建gorm标签
    const gormAttributes = [];

    // 处理主键
    if (isPrimaryKey) {
      gormAttributes.push('primaryKey');
      gormAttributes.push('autoIncrement');
    }

    // 处理字段类型
    if (numberTypes.includes(type)) {
      goType = 'int64';
    } else if (timeTypes.includes(type)) {
      goType = 'time.Time';
    } else if (type.includes('bool')) {
      goType = 'bool';
    }

    // 处理字段长度
    if (length && type === 'varchar') {
      gormAttributes.push(`type:varchar(${length})`);
    } else if (type === 'enum' && !isEmptyObject(valueEnum)) {
      goType = enumName;
      gormAttributes.push(
        `type:enum(${Object.keys(valueEnum)
          .map((key) => `'${key}'`)
          .join(',')})`,
      );
      const enumValues = Object.keys(valueEnum).map(
        (key) => `${enumName + toFirstUpperCase(key)} ${enumName} = "${key}"`,
      );
      enumListStr += `type ${enumName} string\nconst (\n  ${enumValues.join(
        '\n',
      )}\n)\n`;
    } else if (!isPrimaryKey && !autoTimeTypes.includes(autoTimeType)) {
      gormAttributes.push(`type:${type}`);
    }

    // 处理可空
    if (nullableStr === 'not null' && !isPrimaryKey) {
      gormAttributes.push('not null');
    }

    // 处理默认值
    if (defaultValue) {
      const formattedDefault =
        typeof defaultValue === 'string' && isNaN(Number(defaultValue))
          ? `'${defaultValue}'`
          : defaultValue;
      gormAttributes.push(`default:${formattedDefault}`);
    }

    // 处理索引和唯一性
    else if (isIndex) gormAttributes.push('index');
    if (isUnique) gormAttributes.push('unique');

    // 处理自动时间类型
    if (autoTimeTypes.includes(autoTimeType)) {
      if (autoTimeType === 'create' || autoTimeType === 'update') {
        gormAttributes.push(
          `auto${
            autoTimeType.charAt(0).toUpperCase() + autoTimeType.slice(1)
          }Time`,
        );
      }
      if (autoTimeType === 'delete') {
        goType = 'gorm.DeletedAt';
        gormAttributes.push('index');
        swaggerTag = 'swaggerignore:"true"';
      }
    }
    gormAttributes.push(`comment:${comment}`);
    // 构建完整的gorm标签
    gormTag =
      gormAttributes.length > 0 ? `gorm:"${gormAttributes.join(';')}"` : '';

    fieldsDefinition += ` ${toFirstUpperCase(
      name,
    )} ${pointerTag}${goType} \`json:"${name}" ${gormTag} ${swaggerTag}\` // ${
      comment || name
    }\n`;
  });

  return `package model

import (
	"time"
	"gorm.io/gorm"
)

// 枚举类型定义
${enumListStr}

// ${modelName} ${tableComment || tableName}
type ${modelName} struct {
${fieldsDefinition}}

// TableName 指定表名
func (${modelName}) TableName() string {
	return "${tableName}"
}
`;
}
