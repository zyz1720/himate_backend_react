import { toFirstUpperCase } from '@/utils/common/string_util';

/**
 * 生成Gin框架的service接口和实现
 * @param {object} tableInfo - 表信息对象，包含表名、表注释和字段信息
 * @param {string} packageName - 包名，用于导入模型包
 * @returns {string} - 包含service文件内容的字符串
 */
export function generateGinService(tableInfo, packageName) {
  const { tableName } = tableInfo;
  const modelName = toFirstUpperCase(tableName);
  const serviceName = modelName + 'Service';
  const serviceImplName = tableName + 'Service';
  
  return `package service

import (
	"${packageName}/internal/model" // 请替换为实际的包路径
	"${packageName}/internal/repository" // 请替换为实际的包路径
	"${packageName}/internal/request" // 请替换为实际的包路径
)

// ${serviceName} 定义${tableName}服务接口
// ${serviceName} defines the interface for ${tableName} business operations
type ${serviceName} interface {
	// Create${modelName} 创建新${tableName}
	Create${modelName}(entity *model.${modelName}) (*model.${modelName}, error)
	
	// Get${modelName}ByID 根据ID获取${tableName}
	Get${modelName}ByID(id uint) (*model.${modelName}, error)
	
	// GetAll${modelName} 获取所有${tableName}列表
	GetAll${modelName}(params *request.${modelName}QueryRequest) ([]*model.${modelName}, int64, error)
	
	// Update${modelName} 更新${tableName}信息
	Update${modelName}(id uint, entity *request.${modelName}UpdateRequest) error
	
	// Delete${modelName} 软删除${tableName}
	Delete${modelName}(id uint) error

	// Restore${modelName} 恢复${tableName}
	Restore${modelName}(id uint) error
	
	// ForceDelete${modelName} 真删除${tableName}
	ForceDelete${modelName}(id uint) error
}

type ${serviceImplName} struct {
	repository repository.${modelName}Repository
}

func New${serviceName}(repo repository.${modelName}Repository) ${serviceName} {
	return &${serviceImplName}{repository: repo}
}

func (s *${serviceImplName}) Create${modelName}(entity *model.${modelName}) (*model.${modelName}, error) {
	// 可以在这里添加业务校验逻辑
	return s.repository.Create(entity)
}

func (s *${serviceImplName}) Get${modelName}ByID(id uint) (*model.${modelName}, error) {
	return s.repository.FindByID(id)
}

func (s *${serviceImplName}) GetAll${modelName}(params *request.${modelName}QueryRequest) ([]*model.${modelName}, int64, error) {
	return s.repository.FindAll(params)
}

func (s *${serviceImplName}) Update${modelName}(id uint, entity *request.${modelName}UpdateRequest) error {
	// 可以在这里添加业务校验逻辑
	return s.repository.Update(id, entity)
}

func (s *${serviceImplName}) Delete${modelName}(id uint) error {
	// 可以在这里添加业务校验逻辑
	return s.repository.Delete(id)
}

func (s *${serviceImplName}) Restore${modelName}(id uint) error {
	// 可以在这里添加业务校验逻辑
	return s.repository.Restore(id)
}

func (s *${serviceImplName}) ForceDelete${modelName}(id uint) error {
	// 可以在这里添加业务校验逻辑
	return s.repository.ForceDelete(id)
}
`;
}