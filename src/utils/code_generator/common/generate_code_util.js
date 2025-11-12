import { generateMockFile } from '../react/generate_mock_util';
import { generateApiFile } from '../react/generate_api_util';
import { generateTableComponent } from '../react/generate_table_util';
import { generateI18nFile } from '../react/generate_i18n_util';
import { generateRouteFile } from '../react/generate_route_util';
import { generateGinController } from '../gin/generate_controller_util';
import { generateGinModel } from '../gin/generate_model_util';
import { generateGinRepository } from '../gin/generate_repository_util';
import { generateGinService } from '../gin/generate_service_util';
import { generateGinRouter } from '../gin/generate_router_util';
import { generateNestjsModule } from '../nestjs/generate_module_util';
import { generateNestjsEntity } from '../nestjs/generate_entity_util';
import { generateNestjsDto } from '../nestjs/generate_dto_util';
import { generateNestjsService } from '../nestjs/generate_service_util';
import { generateNestjsController } from '../nestjs/generate_controller_util';
import { generateGinRequest } from '../gin/generate_request_util';
import { toFirstUpperCase } from '@/utils/common/string_util';
import { numberTypes, timeTypes } from '@/constants/code_generator';

/**
 * 生成代码
 * @param {object} tableInfo - 表信息对象，包含表名、表注释和字段信息
 * @param {string} packageName - 包名，用于导入模型包
 * @returns {object} 包含所有生成代码的对象
 */
export function generateCode(tableInfo, packageName) {
  const { tableName } = tableInfo;
  const tableNameUpperCase = toFirstUpperCase(tableName);
  const endpoint = tableName.replace(/_/g, '-');

  // 生成所有代码并保存到状态中
  return {
    react: {
      mock: {
        code: generateMockFile(tableInfo),
        fileName: `${tableName}.js`,
        applyPath: `src/mock/pages/${tableName}.js`,
        zipPath: `react/mock/${tableName}.js`,
      },
      api: {
        code: generateApiFile(tableInfo),
        fileName: `${tableName}.js`,
        applyPath: `src/api/pages/${tableName}.js`,
        zipPath: `react/api/${tableName}.js`,
      },
      route: {
        code: generateRouteFile(tableInfo),
        fileName: `${tableName}.jsx`,
        applyPath: `src/router/pages/${tableName}.jsx`,
        zipPath: `react/router/${tableName}.jsx`,
      },
      tableComponent: {
        code: generateTableComponent(tableInfo),
        fileName: `${tableNameUpperCase}.jsx`,
        applyPath: `src/pages/${tableName}/${tableNameUpperCase}.jsx`,
        zipPath: `react/pages/${tableNameUpperCase}.jsx`,
      },
      i18n: {
        code: generateI18nFile(tableInfo),
        fileName: `${tableName}.json`,
        applyPath: `src/i18n/langs/zh-CN/pages/${tableName}.json`,
        zipPath: `react/i18n/${tableName}.json`,
      },
    },
    gin: {
      model: {
        code: generateGinModel(tableInfo),
        fileName: `${tableName}.go`,
        applyPath: `internal/model/${tableName}.go`,
        zipPath: `gin/model/${tableName}.go`,
      },
      request: {
        code: generateGinRequest(tableInfo, packageName),
        fileName: `${tableName}_request.go`,
        applyPath: `internal/request/${tableName}_request.go`,
        zipPath: `gin/request/${tableName}_request.go`,
      },
      repository: {
        code: generateGinRepository(tableInfo, packageName),
        fileName: `${tableName}_repository.go`,
        applyPath: `internal/repository/${tableName}_repository.go`,
        zipPath: `gin/repository/${tableName}_repository.go`,
      },
      service: {
        code: generateGinService(tableInfo, packageName),
        fileName: `${tableName}_service.go`,
        applyPath: `internal/service/${tableName}_service.go`,
        zipPath: `gin/service/${tableName}_service.go`,
      },
      controller: {
        code: generateGinController(tableInfo, packageName),
        fileName: `${tableName}_controller.go`,
        applyPath: `internal/controller/${tableName}_controller.go`,
        zipPath: `gin/controller/${tableName}_controller.go`,
      },
      router: {
        code: generateGinRouter(tableInfo, packageName),
        fileName: `${tableName}_router.go`,
        applyPath: `internal/router/${tableName}_router.go`,
        zipPath: `gin/router/${tableName}_router.go`,
      },
    },
    nestjs: {
      module: {
        code: generateNestjsModule(tableInfo),
        fileName: `${endpoint}.module.ts`,
        applyPath: `src/modules/${endpoint}/${endpoint}.module.ts`,
        zipPath: `nestjs/module/${endpoint}.module.ts`,
      },
      entity: {
        code: generateNestjsEntity(tableInfo),
        fileName: `${endpoint}.entity.ts`,
        applyPath: `src/modules/${endpoint}/entity/${endpoint}.entity.ts`,
        zipPath: `nestjs/entity/${endpoint}.entity.ts`,
      },
      dto: {
        add: {
          code: generateNestjsDto(tableInfo, 'add'),
          fileName: `add-${endpoint}.dto.ts`,
          applyPath: `src/modules/${endpoint}/dto/add-${endpoint}.dto.ts`,
          zipPath: `nestjs/dto/add-${endpoint}.dto.ts`,
        },
        update: {
          code: generateNestjsDto(tableInfo, 'update'),
          fileName: `update-${endpoint}.dto.ts`,
          applyPath: `src/modules/${endpoint}/dto/update-${endpoint}.dto.ts`,
          zipPath: `nestjs/dto/update-${endpoint}.dto.ts`,
        },
        findAll: {
          code: generateNestjsDto(tableInfo, 'findAll'),
          fileName: `find-all-${endpoint}.dto.ts`,
          applyPath: `src/modules/${endpoint}/dto/find-all-${endpoint}.dto.ts`,
          zipPath: `nestjs/dto/find-all-${endpoint}.dto.ts`,
        },
      },
      service: {
        code: generateNestjsService(tableInfo),
        fileName: `${endpoint}.service.ts`,
        applyPath: `src/modules/${endpoint}/${endpoint}.service.ts`,
        zipPath: `nestjs/service/${endpoint}.service.ts`,
      },
      controller: {
        code: generateNestjsController(tableInfo),
        fileName: `${endpoint}.controller.ts`,
        applyPath: `src/modules/${endpoint}/${endpoint}.controller.ts`,
        zipPath: `nestjs/controller/${endpoint}.controller.ts`,
      },
    },
  };
}

export function getTsType(type) {
  const typeMap = [
    { types: numberTypes, tsType: 'number' },
    { types: timeTypes, tsType: 'Date' },
    { types: ['bool'], tsType: 'boolean' },
  ];
  const tsType = typeMap.find((item) => item.types.includes(type))?.tsType || 'string';
  return tsType;
}