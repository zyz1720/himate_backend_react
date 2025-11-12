import { toFirstUpperCase } from '@/utils/common/string_util';
import { getTsType } from '@/utils/code_generator/common/generate_code_util';
import { isEmptyObject } from '@/utils/common/object_util';
import {
  numberTypes,
  timeTypes,
  autoTimeTypes,
} from '@/constants/code_generator';

/**
 * 生成Gin框架的request结构体
 * @param {object} tableInfo - 表信息对象，包含表名、表注释和字段信息
 * @param {string} packageName - 包名，用于导入模型包
 * @returns {string} - 包含request文件内容的字符串
 */
export function generateGinRequest(tableInfo, packageName) {
  const { tableName, tableComment, fields } = tableInfo;
  const modelName = toFirstUpperCase(tableName);

  let addFieldsDefinition = '';
  let updateFieldsDefinition = '';
  let toModelFieldsDefinition = '';

  fields.forEach((field) => {
    const {
      name,
      type,
      comment,
      length,
      valueEnum,
      isPrimaryKey,
      autoTimeType,
      isRequired,
      hideInForm,
    } = field;
    const enumName = toFirstUpperCase(name) + 'Type';
    let goType = 'string';
    let bindingTag = '';
    let updateBindingTag = ''; // 处理指针类型
    let pointerTag = '';

    if (isPrimaryKey || hideInForm) return;

    // 处理字段类型
    if (numberTypes.includes(type)) {
      goType = 'int64';
    }
    if (timeTypes.includes(type)) {
      goType = 'time.Time';
    }
    if (type.includes('bool')) {
      goType = 'bool';
    }
    if (type === 'enum' && !isEmptyObject(valueEnum)) {
      goType = `model.${enumName}`;
    }

    // 处理绑定标签
    const bindingAttributes = [];
    isRequired && !autoTimeTypes.includes(autoTimeType) && !isPrimaryKey
      ? bindingAttributes.push('required')
      : null;
    !isRequired && !autoTimeTypes.includes(autoTimeType) && !isPrimaryKey
      ? bindingAttributes.push('omitempty')
      : null;
    // getTsType(type) === 'Date' && !autoTimeTypes.includes(autoTimeType)
    //   ? bindingAttributes.push('datetime')
    //   : null;
    getTsType(type) === 'string' && name.includes('email')
      ? bindingAttributes.push('email')
      : null;
    length && getTsType(type) === 'string'
      ? bindingAttributes.push(`max=${length}`)
      : null;

    // 处理枚举类型的绑定标签
    if (type === 'enum' && !isEmptyObject(valueEnum)) {
      bindingAttributes.push(`oneof=${Object.keys(valueEnum).join(' ')}`);
    }

    // 处理更新字段的绑定标签
    const updateBindingAttributes = [...bindingAttributes];
    const hasRequired = updateBindingAttributes.includes('required');
    const hasOmitempty = updateBindingAttributes.includes('omitempty');

    if (hasRequired) {
      const requiredIndex = updateBindingAttributes.indexOf('required');
      updateBindingAttributes[requiredIndex] = 'omitempty';
    } else if (!hasOmitempty) {
      updateBindingAttributes.push('omitempty');
    }

    if (hasOmitempty || (!hasRequired && !hasOmitempty)) {
      pointerTag = '*';
    }

    bindingTag =
      bindingAttributes.length > 0
        ? `binding:"${bindingAttributes.join(',')}"`
        : '';
    updateBindingTag =
      updateBindingAttributes.length > 0
        ? `binding:"${updateBindingAttributes.join(',')}"`
        : '';

    addFieldsDefinition += `    ${toFirstUpperCase(
      name,
    )} ${pointerTag}${goType} \`json:"${name}" ${bindingTag} \` // ${
      comment || name
    }\n`;

    updateFieldsDefinition += `    ${toFirstUpperCase(
      name,
    )} *${goType} \`json:"${name}" ${updateBindingTag} \` // ${
      comment || name
    }\n`;

    toModelFieldsDefinition += `${toFirstUpperCase(
      name,
    )}: req.${toFirstUpperCase(name)},
`;
  });

  let queryFieldsDefinition = '';
  fields.forEach((field) => {
    const {
      name,
      type,
      comment,
      length,
      valueEnum,
      autoTimeType,
      hideInSearch,
    } = field;
    const enumName = toFirstUpperCase(name) + 'Type';
    let goType = 'string';
    let bindingTag = '';
    if (hideInSearch) return;

    // 处理字段类型
    if (numberTypes.includes(type)) {
      goType = 'int64';
    }
    if (timeTypes.includes(type)) {
      goType = 'time.Time';
    }
    if (type.includes('bool')) {
      goType = 'bool';
    }
    if (type === 'enum' && !isEmptyObject(valueEnum)) {
      goType = `model.${enumName}`;
    }

    // 处理绑定标签
    const bindingAttributes = [];
    getTsType(type) === 'Date' && !autoTimeTypes.includes(autoTimeType)
      ? bindingAttributes.push('datetime')
      : null;
    getTsType(type) === 'string' && name.includes('email')
      ? bindingAttributes.push('email')
      : null;
    length && getTsType(type) === 'string'
      ? bindingAttributes.push(`max=${length}`)
      : null;

    // 处理枚举类型的绑定标签
    if (type === 'enum' && !isEmptyObject(valueEnum)) {
      bindingAttributes.push(`oneof=${Object.keys(valueEnum).join(' ')}`);
    }

    bindingTag =
      bindingAttributes.length > 0 ? `${bindingAttributes.join(',')}` : '';

    queryFieldsDefinition += `    ${toFirstUpperCase(
      name,
    )} *${goType} \`form:"${name}" binding:"omitempty${
      bindingTag.length ? ',' : ''
    }${bindingTag}"\` // ${comment || name}\n`;
  });

  return `package request

import (
	"${packageName}/internal/model" // 请替换为实际的包路径
  "time"
)

// ${modelName}CreateRequest 用于创建${tableComment || tableName}的请求结构体
type ${modelName}CreateRequest struct {
${addFieldsDefinition}
}

// ${modelName}UpdateRequest 用于更新${tableComment || tableName}的请求结构体
type ${modelName}UpdateRequest struct {
${updateFieldsDefinition}
}

// ${modelName}QueryRequest 用于查询${tableComment || tableName}的请求结构体
type ${modelName}QueryRequest struct {
    Current        int                    \`form:"current" binding:"required" default:"1"\`
    PageSize    int                    \`form:"pageSize" binding:"required" default:"10"\`
${queryFieldsDefinition}
}

// ToModel 将请求结构体转换为模型结构体
func (req *${modelName}CreateRequest) ToModel() *model.${modelName} {
	return &model.${modelName}{
		${toModelFieldsDefinition}
	}
}
`;
}
