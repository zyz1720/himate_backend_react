import { toFirstUpperCase } from '@/utils/common/string_util';
import { isEmptyObject } from '@/utils/common/object_util';
import { getTsType } from '@/utils/code_generator/common/generate_code_util';
import { autoTimeTypes } from '@/constants/code_generator';

/**
 * 生成NestJS框架的entity文件
 * @param {object} tableInfo - 表信息对象，包含表名、表注释和字段信息
 * @returns {string} - 包含entity文件内容的字符串
 */
export function generateNestjsEntity(tableInfo) {
  const { tableName, fields } = tableInfo;
  const camelCaseName = toFirstUpperCase(tableName);

  // 生成字段定义
  let fieldsDefinition = '';
  const enumList = [];

  fields.forEach((field) => {
    const {
      name,
      type,
      comment,
      length,
      isIndex,
      isUnique,
      valueEnum,
      isPrimaryKey,
      autoTimeType,
      nullable,
      default: defaultValue,
    } = field;
    const isNullable = defaultValue ? false : nullable === 'null';

    // 获取枚举值
    const enumName = toFirstUpperCase(name) + 'Enum';
    if (!isEmptyObject(valueEnum)) {
      enumList.push({
        name: enumName,
        value: valueEnum,
      });
    }

    // 处理索引
    let index =
      isIndex || autoTimeType === 'delete'
        ? `\n    @Index('idx_${tableName}_${name}')`
        : '';
    let unique = isUnique
      ? `\n    @Index('idx_${tableName}_${name}_unique', { unique: true })`
      : '';

    // 处理字段长度
    const columnLength =
      length && type === 'varchar' ? `length: ${length},` : '';

    // 处理枚举
    const enumValues = type === 'enum' ? `enum: ${enumName},` : '';

    // 处理默认值
    const columnDefault = defaultValue ? `default: '${defaultValue}',` : '';

    // 处理空值
    const nullableStr = isNullable ? 'nullable: true,' : '';

    // 处理type
    const typeStr = type === 'varchar' ? '' : `type: '${type}',`;

    // 处理字段定义
    let decorator = `@Column({${typeStr} comment: '${
      comment || name
    }', ${columnLength} ${enumValues} ${columnDefault} ${nullableStr}})`;

    // 处理主键
    if (isPrimaryKey) {
      decorator = `@PrimaryGeneratedColumn({ comment: '${
        comment || '主键'
      }' })`;
    }

    // 处理自动时间类型
    if (autoTimeTypes.includes(autoTimeType)) {
      decorator = `@${
        autoTimeType.charAt(0).toUpperCase() + autoTimeType.slice(1)
      }DateColumn({ type: '${type}', comment: '${
        comment || autoTimeType + ' time'
      }' })`;
    }

    fieldsDefinition += `
    @ApiProperty({ description: '${comment || name}' })${index}${unique}
    ${decorator}
    ${name}: ${type === 'enum' ? enumName : getTsType(type)};
    `;
  });

  return `import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

// 枚举定义
${enumList
  .map(
    (item) =>
      `export enum ${item.name} { ${Object.keys(item.value)
        .map((key) => `${key} = '${key}',`)
        .join(' ')} }`,
  )
  .join('\n')}

@Entity('${tableName}')
export class ${camelCaseName}Entity {
${fieldsDefinition}}`;
}
