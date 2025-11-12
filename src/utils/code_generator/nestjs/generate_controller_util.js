import { toFirstUpperCase, toCamelCase } from '@/utils/common/string_util';

/**
 * 生成NestJS框架的controller文件
 * @param {object} tableInfo - 表信息对象，包含表名、表注释和字段信息
 * @returns {string} - 包含controller文件内容的字符串
 */
export function generateNestjsController(tableInfo) {
  const { tableName, tableComment } = tableInfo;
  const camelCaseName = toFirstUpperCase(tableName);
  const lowercaseName = toCamelCase(tableName);
  const endpoint = tableName.replace(/_/g, '-');

  return `import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiOkRes,
  ApiOkMsgRes,
  ApiOkPageRes,
} from 'src/common/response/api-response.decorator';
import { Roles } from 'src/core/auth/decorators/roles.decorator';
import { Role } from 'src/common/constants/database-enum.const';
import { ${camelCaseName}Service } from './${endpoint}.service';
import { Add${camelCaseName}Dto } from './dto/add-${endpoint}.dto';
import { Update${camelCaseName}Dto } from './dto/update-${endpoint}.dto';
import { FindAll${camelCaseName}Dto } from './dto/find-all-${endpoint}.dto';
import { ${camelCaseName}Entity } from './entity/${endpoint}.entity';

@ApiTags('${tableComment || tableName}管理')
@ApiBearerAuth()
@Roles(Role.Admin)
@Controller('${endpoint}')
export class ${camelCaseName}Controller {
  constructor(private readonly ${lowercaseName}Service: ${camelCaseName}Service) {}

  @ApiOperation({ summary: '添加${tableComment || tableName}' })
  @ApiOkRes(${camelCaseName}Entity)
  @Post()
  create(@Body() data: Add${camelCaseName}Dto) {
    return this.${lowercaseName}Service.add${camelCaseName}(data);
  }

  @ApiOperation({ summary: '${tableComment || tableName}列表' })
  @ApiOkPageRes(${camelCaseName}Entity)
  @Get()
  findAll(@Query() query: FindAll${camelCaseName}Dto) {
    return this.${lowercaseName}Service.findAll${camelCaseName}(query);
  }

  @ApiOperation({ summary: '获取${tableComment || tableName}详情' })
  @ApiOkRes(${camelCaseName}Entity)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.${lowercaseName}Service.findOne${camelCaseName}(parseInt(id));
  }

  @ApiOperation({ summary: '修改${tableComment || tableName}信息' })
  @ApiOkRes(${camelCaseName}Entity)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Update${camelCaseName}Dto) {
    return this.${lowercaseName}Service.update${camelCaseName}(parseInt(id), data);
  }

  @ApiOperation({ summary: '软删除${tableComment || tableName}' })
  @ApiOkMsgRes()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.${lowercaseName}Service.softDelete${camelCaseName}(parseInt(id));
  }

  @ApiOperation({ summary: '恢复${tableComment || tableName}' })
  @ApiOkMsgRes()
  @Put(':id/restore')
  restore(@Param('id') id: string) {
    return this.${lowercaseName}Service.restore${camelCaseName}(parseInt(id));
  }
  
  @ApiOperation({ summary: '真删除${tableComment || tableName}' })
  @ApiOkMsgRes()
  @Delete(':id/force')
  forceRemove(@Param('id') id: string) {
    return this.${lowercaseName}Service.delete${camelCaseName}(parseInt(id));
  }

}`;
}
