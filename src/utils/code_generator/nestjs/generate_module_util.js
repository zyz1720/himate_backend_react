import { toFirstUpperCase } from '@/utils/common/string_util';

/**
 * 生成NestJS框架的module文件
 * @param {object} tableInfo - 表信息对象，包含表名和字段信息
 * @returns {string} - 包含module文件内容的字符串
 */
export function generateNestjsModule(tableInfo) {
  const { tableName } = tableInfo;
  const camelCaseName = toFirstUpperCase(tableName);
  const endpoint = tableName.replace(/_/g, '-');

  return `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${camelCaseName}Controller } from './${endpoint}.controller';
import { ${camelCaseName}Service } from './${endpoint}.service';
import { ${camelCaseName}Entity } from './entity/${endpoint}.entity';

@Module({
  imports: [TypeOrmModule.forFeature([${camelCaseName}Entity])],
  controllers: [${camelCaseName}Controller],
  providers: [${camelCaseName}Service],
  exports: [${camelCaseName}Service],
})
export class ${camelCaseName}Module {}
`;
}
