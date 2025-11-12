import { toFirstUpperCase, toCamelCase } from '@/utils/common/string_util';
import { getTsType } from '@/utils/code_generator/common/generate_code_util';
import { isEmptyObject } from '@/utils/common/object_util';

/**
 * 生成NestJS框架的DTO文件
 * @param {object} tableInfo - 表信息对象，包含表名、表注释和字段信息
 * @param {string} type - DTO类型 (add, update, findOne, findAll)
 * @returns {string} - 包含DTO文件内容的字符串
 */
export function generateNestjsDto(tableInfo, type) {
  const { tableName, fields } = tableInfo;
  const camelCaseName = toFirstUpperCase(tableName);
  const endpoint = tableName.replace(/_/g, '-');

  const dtoNames = {
    add: `Add${camelCaseName}Dto`,
    update: `Update${camelCaseName}Dto`,
    findAll: `FindAll${camelCaseName}Dto`,
  };

  const dtoName = dtoNames[type];
  let dtoContent = '';

  if (type === 'add') {
    let validations = '';
    const enumList = [];

    fields.forEach((field) => {
      const {
        name: fieldName,
        comment: fieldComment,
        isRequired: fieldRequired,
        isPrimaryKey: fieldIsPrimaryKey,
        type: fieldType,
        default: fieldDefaultValue,
        hideInForm: fieldHideInForm,
        length: fieldLength,
        valueEnum,
      } = field;
      if (fieldIsPrimaryKey || fieldHideInForm) return; // 排除主键和隐藏在表单中的字段

      // 获取枚举值
      const enumName = toCamelCase(fieldName) + 'Enum';
      if (!isEmptyObject(valueEnum) && fieldType === 'enum') {
        !enumList.includes(enumName) && enumList.push(enumName);
      }

      // 根据是否必填添加不同的验证装饰器
      const validation = fieldRequired ? '@IsNotEmpty()' : '@IsOptional()';

      // 是否为时间类型
      const dateValidation =
        getTsType(fieldType) === 'Date' ? '\n  @IsDateString()' : '';

      // 是否为邮箱类型
      const emailValidation =
        getTsType(fieldType) === 'string' && fieldName.includes('email')
          ? '\n  @IsEmail()'
          : '';

      // 是否为枚举类型
      const enumValidation =
        fieldType === 'enum'
          ? `\n  @IsEnum(${toCamelCase(fieldName)}Enum)`
          : '';

      // 是否检查字节长度
      const byteLengthValidation =
        getTsType(fieldType) === 'string' && fieldLength
          ? `\n  @IsByteLength(0, ${fieldLength})`
          : '';

      // 是否有默认值
      const defaultValue = fieldDefaultValue
        ? `default: ${
            getTsType(fieldType) === 'string'
              ? `'${fieldDefaultValue}'`
              : fieldDefaultValue
          },`
        : '';

      // 添加字段装饰器和定义
      validations += `  @ApiProperty({ description: '${
        fieldComment || fieldName
      }', required: ${fieldRequired}, ${defaultValue} })
  ${validation}${enumValidation}${dateValidation}${emailValidation}${byteLengthValidation}
  readonly ${fieldName}${fieldRequired ? '' : '?'}: ${getTsType(fieldType)};

`;
    });

    // 导入枚举类
    const enumImports = enumList.length
      ? `import { ${enumList.join(', ')} } from '../entity/${endpoint}.entity'`
      : '';

    // 添加DTO
    dtoContent = `import { ApiProperty } from '@nestjs/swagger';
import { 
  IsNotEmpty, 
  IsOptional, 
  IsDateString, 
  IsEmail, 
  IsByteLength, 
  IsEnum 
} from 'class-validator';
${enumImports}

export class ${dtoName} {
${validations}
}`;
  }

  if (type === 'update') {
    let validations = '';
    const enumList = [];

    fields.forEach((field) => {
      const {
        name: fieldName,
        comment: fieldComment,
        isRequired: fieldRequired,
        isPrimaryKey: fieldIsPrimaryKey,
        type: fieldType,
        default: fieldDefaultValue,
        hideInForm: fieldHideInForm,
        length: fieldLength,
        valueEnum,
      } = field;
      if (fieldIsPrimaryKey || fieldHideInForm) return; // 排除主键和隐藏在表单中的字段

      // 获取枚举值
      const enumName = toCamelCase(fieldName) + 'Enum';
      if (!isEmptyObject(valueEnum) && fieldType === 'enum') {
        !enumList.includes(enumName) && enumList.push(enumName);
      }

      // 根据是否必填添加不同的验证装饰器
      const validation = '@IsOptional()';

      // 是否为时间类型
      const dateValidation =
        getTsType(fieldType) === 'Date' ? '\n  @IsDateString()' : '';

      // 是否为邮箱类型
      const emailValidation =
        getTsType(fieldType) === 'string' && fieldName.includes('email')
          ? '\n  @IsEmail()'
          : '';

      // 是否为枚举类型
      const enumValidation =
        fieldType === 'enum'
          ? `\n  @IsEnum(${toCamelCase(fieldName)}Enum)`
          : '';

      // 是否检查字节长度
      const byteLengthValidation =
        getTsType(fieldType) === 'string' && fieldLength
          ? `\n  @IsByteLength(0, ${fieldLength})`
          : '';

      // 是否有默认值
      const defaultValue = fieldDefaultValue
        ? `default: ${
            getTsType(fieldType) === 'string'
              ? `'${fieldDefaultValue}'`
              : fieldDefaultValue
          },`
        : '';

      // 添加字段装饰器和定义
      validations += `  @ApiProperty({ description: '${
        fieldComment || fieldName
      }', required: ${fieldRequired}, ${defaultValue} })
  ${validation}${enumValidation}${dateValidation}${emailValidation}${byteLengthValidation}
  readonly ${fieldName}?: ${getTsType(fieldType)};

`;
    });

    // 导入枚举类
    const enumImports = enumList.length
      ? `import { ${enumList.join(', ')} } from '../entity/${endpoint}.entity'`
      : '';

    // 添加DTO
    dtoContent = `import { ApiProperty } from '@nestjs/swagger';
import { 
  IsNotEmpty, 
  IsOptional, 
  IsDateString, 
  IsEmail, 
  IsByteLength, 
  IsEnum 
} from 'class-validator';
${enumImports}

export class ${dtoName} {
${validations}
}`;
  }

  if (type === 'findAll') {
    let validations = '';
    const enumList = [];

    fields.forEach((field) => {
      const {
        name: fieldName,
        comment: fieldComment,
        type: fieldType,
        hideInSearch: fieldHideInSearch,
      } = field;
      if (fieldHideInSearch) return; // 排除隐藏在搜索中的字段

      // 添加字段装饰器和定义
      validations += `  @ApiPropertyOptional({ description: '${
        fieldComment || fieldName
      }' })
  @IsOptional()
  readonly ${fieldName}?: ${getTsType(fieldType)};

`;
    });

    // 导入枚举类
    const enumImports = enumList.length
      ? `import { ${enumList.join(', ')} } from '../dto/${endpoint}.entity.ts`
      : '';

    // 添加DTO
    dtoContent = `import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { FindAllDto } from 'src/common/dto/common.dto';
${enumImports}

export class ${dtoName} extends PartialType(FindAllDto) {
${validations}
}`;
  }

  return dtoContent;
}
