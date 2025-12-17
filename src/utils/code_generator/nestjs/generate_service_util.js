import { toFirstUpperCase, toCamelCase } from '@/utils/common/string_util';
import { getTsType } from '@/utils/code_generator/common/generate_code_util';

/**
 * 生成NestJS框架的service文件
 * @param {object} tableInfo - 表信息对象，包含表名、表注释和字段信息
 * @returns {string} - 包含service文件内容的字符串
 */
export function generateNestjsService(tableInfo) {
  const { tableName, tableComment, fields } = tableInfo;
  const camelCaseName = toFirstUpperCase(tableName);
  const endpoint = tableName.replace(/_/g, '-');
  const lowercaseName = toCamelCase(tableName);

  // 筛选出在搜索中显示的字段
  const searchFields = fields.filter((field) => !field.hideInSearch);
  const searchFieldNamesStr = searchFields
    .map((field) => field.name)
    .join(', ');

  let conditionStr = '';
  searchFields.forEach((field) => {
    const { name: fieldName, type: fieldType } = field;
    if (
      getTsType(fieldType) === 'number' ||
      fieldType === 'enum' ||
      fieldType === 'bool'
    ) {
      conditionStr += `if (${fieldName}) {
      qb.andWhere('${fieldName} = :${fieldName}', {
        ${fieldName}: ${fieldName}
      });
      }
      `;
    } else {
      conditionStr += `if (${fieldName}) {
      qb.andWhere('${fieldName} LIKE :${fieldName}', {
        ${fieldName}: '%' + ${fieldName} + '%'
      });
      }
      `;
    }
  });

  // 筛选出创建时间字段
  const createTimeField = fields.find(
    (field) => !field.autoTimeType === 'create',
  );
  const timeOrderByStr = createTimeField?.name
    ? `qb.orderBy('${createTimeField.name}', 'DESC');`
    : '';

  const entityClass = `${camelCaseName}Entity`;

  return `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${entityClass} } from './entity/${endpoint}.entity';
import { Add${camelCaseName}Dto } from './dto/add-${endpoint}.dto';
import { Update${camelCaseName}Dto } from './dto/update-${endpoint}.dto';
import { FindAll${camelCaseName}Dto } from './dto/find-all-${endpoint}.dto';
import { PageResponse, Response } from 'src/common/response/api-response';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ${camelCaseName}Service {
  constructor(
    @InjectRepository(${entityClass})
    private readonly ${lowercaseName}Repository: Repository<${entityClass}>,
    private readonly i18n: I18nService,
  ) {}

  /* 添加一个${tableComment || tableName} */
  async add${camelCaseName}(data: Add${camelCaseName}Dto) {
    const entityData = this.${lowercaseName}Repository.create(data);
    const insertRes = await this.${lowercaseName}Repository.insert(entityData);
    if (insertRes.identifiers.length) {
      return Response.ok(
        this.i18n.t('message.CREATE_SUCCESS'),
        entityData,
      );
    } else {
      return Response.fail(this.i18n.t('message.CREATE_FAILED'));
    }
  }

  /* 查询所有${tableComment || tableName} */
  async findAll${camelCaseName}(query: FindAll${camelCaseName}Dto) {
    const { current = 1, pageSize = 10, ${searchFieldNamesStr}} = query || {};
    const qb = this.${lowercaseName}Repository.createQueryBuilder('${tableName}');
    ${conditionStr}
    ${timeOrderByStr}

    qb.limit(pageSize);
    qb.offset(pageSize * (current - 1));
    const [data, count] = await qb.getManyAndCount();
    return PageResponse.list(data, count);
  }

  /* 查询指定${tableComment || tableName} */
  async findOne${camelCaseName}(id: number) {
    const result = await this.${lowercaseName}Repository.findOne({
      where: { id },
    });
    if (result) {
      return Response.ok(this.i18n.t('message.GET_SUCCESS'), result);
    } else {
      return Response.fail(this.i18n.t('message.DATA_NOEXIST'));
    }
  }

  /* 修改${tableComment || tableName}信息 */
  async update${camelCaseName}(id: number, data: Update${camelCaseName}Dto) {
    const result = await this.${lowercaseName}Repository.update(id, data);
    if (result.affected) {
      return Response.ok(
        this.i18n.t('message.UPDATE_SUCCESS'),
        result.generatedMaps[0],
      );
    } else {
      return Response.fail(this.i18n.t('message.UPDATE_FAILED'));
    }
  }

  /* 软删除${tableComment || tableName} */
  async softDelete${camelCaseName}(id: number) {
    const result = await this.${lowercaseName}Repository.softDelete(id);
    if (result.affected) {
      return Response.ok(this.i18n.t('message.DELETE_SUCCESS'));
    } else {
      return Response.fail(this.i18n.t('message.DELETE_FAILED'));
    }
  }

  /* 恢复${tableComment || tableName} */
  async restore${camelCaseName}(id: number) {
    const result = await this.${lowercaseName}Repository.restore(id);
    if (result.affected) {
      return Response.ok(this.i18n.t('message.RESTORE_SUCCESS'));
    } else {
      return Response.fail(this.i18n.t('message.RESTORE_FAILED'));
    }
  }
  
  /* 真删除${tableComment || tableName} */
  async delete${camelCaseName}(id: number) {
    const result = await this.${lowercaseName}Repository.delete(id);
    if (result.affected) {
      return Response.ok(this.i18n.t('message.DELETE_SUCCESS'));
    } else {
      return Response.fail(this.i18n.t('message.DELETE_FAILED'));
    }
  }
}`;
}
