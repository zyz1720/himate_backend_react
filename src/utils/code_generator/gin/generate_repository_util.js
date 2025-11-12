import { toFirstUpperCase } from '@/utils/common/string_util';
import { getTsType } from '@/utils/code_generator/common/generate_code_util';

/**
 * 生成Gin框架的repository接口和实现
 * @param {object} tableInfo - 表信息对象，包含表名、表注释和字段信息
 * @param {string} packageName - 包名，用于导入模型包
 * @returns {string} - 包含repository文件内容的字符串
 */
export function generateGinRepository(tableInfo, packageName) {
  const { tableName, tableComment, fields } = tableInfo;
  const modelName = toFirstUpperCase(tableName);
  const repoName = modelName + 'Repository';
  const repoImplName = tableName + 'Repository';

  const deletedFieldName =
    fields.find((field) => field.autoTimeType === 'delete')?.name ||
    'deleted_at';
  let createdAtFieldName =
    fields.find((field) => field.autoTimeType === 'create')?.name ||
    'created_at';
  const searchFields = fields.filter((field) => !field.hideInSearch);
  let conditionStr = '';
  searchFields.forEach((field) => {
    const { name: fieldName, type: fieldType } = field;
    if (getTsType(fieldType) === 'string') {
      conditionStr += `if params.${toFirstUpperCase(fieldName)} != nil {
			query = query.Where("${fieldName} LIKE ?", "%"+*params.${toFirstUpperCase(
        fieldName,
      )}+"%")
		}
      `;
    }
    if (getTsType(fieldType) === 'number' || fieldType === 'enum') {
      conditionStr += `if params.${toFirstUpperCase(fieldName)} != nil {
			query = query.Where("${fieldName} = ?", *params.${toFirstUpperCase(fieldName)})
		}
      `;
    }
  });

  return `package repository

import (
	"${packageName}/internal/model" // 请替换为实际的包路径
	"${packageName}/internal/request" // 请替换为实际的包路径
	"gorm.io/gorm"
)

// ${repoName} 定义${tableComment || tableName}仓库接口
type ${repoName} interface {
	// Create 创建新${tableComment || tableName}
	Create(entity *model.${modelName}) (*model.${modelName}, error)
	// FindByID 根据ID查找${tableComment || tableName}
	FindByID(id uint) (*model.${modelName}, error)
	// FindAll 获取所有${tableComment || tableName}列表
	FindAll(params *request.${modelName}QueryRequest) ([]*model.${modelName}, int64, error)
	// Update 更新${tableComment || tableName}信息
	Update(id uint, entity *request.${modelName}UpdateRequest) error
	// Delete 软删除${tableComment || tableName}
	Delete(id uint) error
	// Restore 恢复${tableComment || tableName}
	Restore(id uint) error
	// ForceDelete 真删除${tableComment || tableName}
	ForceDelete(id uint) error
}

type ${repoImplName} struct {
	db *gorm.DB
}

func New${repoName}(db *gorm.DB) ${repoName} {
	return &${repoImplName}{db: db}
}

func (r *${repoImplName}) Create(entity *model.${modelName}) (*model.${modelName}, error) {
	return entity, r.db.Create(entity).Error
}

func (r *${repoImplName}) FindByID(id uint) (*model.${modelName}, error) {
	var entity model.${modelName}
	err := r.db.First(&entity, id).Error
	return &entity, err
}

func (r *${repoImplName}) FindAll(params *request.${modelName}QueryRequest) ([]*model.${modelName}, int64, error) {
	var entities []*model.${modelName}
	var total int64

	query := r.db.Model(&model.${modelName}{})

	if params != nil {
		// 应用查询条件
		${conditionStr}
	}
	
	query.Count(&total)
	query.Order("${createdAtFieldName} desc")
	err := query.Offset((params.Current - 1) * params.PageSize).Limit(params.PageSize).Find(&entities).Error
	return entities, total, err
}

func (r *${repoImplName}) Update(id uint, entity *request.${modelName}UpdateRequest) error {
	return r.db.Model(&model.${modelName}{}).Where("id = ?", id).Updates(entity).Error
}

func (r *${repoImplName}) Delete(id uint) error {
	return r.db.Delete(&model.${modelName}{}, id).Error
}

func (r *${repoImplName}) Restore(id uint) error {
	return r.db.Unscoped().Model(&model.${modelName}{}).Where("id = ?", id).Update("${deletedFieldName}", nil).Error
}

func (r *${repoImplName}) ForceDelete(id uint) error {
	return r.db.Unscoped().Delete(&model.${modelName}{}, id).Error
}
`;
}
