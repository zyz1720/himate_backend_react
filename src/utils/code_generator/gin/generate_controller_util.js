import { toFirstUpperCase } from '@/utils/common/string_util';

/**
 * 生成Gin框架的controller
 * @param {object} tableInfo - 表信息对象，包含表名、表注释和字段信息
 * @param {string} packageName - 包名，用于导入模型和服务包
 * @returns {string} - 包含controller文件内容的字符串
 */
export function generateGinController(tableInfo, packageName) {
  const { tableName, tableComment } = tableInfo;
  const modelName = toFirstUpperCase(tableName);
  const controllerName = modelName + 'Controller';

  return `package controller

import (
	"net/http"
	"strconv"
	"${packageName}/internal/service" // 请替换为实际的包路径
	"${packageName}/internal/request" // 请替换为实际的包路径
	"${packageName}/pkg/response" // 请替换为实际的包路径
	
	"github.com/gin-gonic/gin"
)

type ${controllerName} struct {
	service service.${modelName}Service
}

func New${controllerName}(s service.${modelName}Service) *${controllerName} {
	return &${controllerName}{service: s}
}

// Get${modelName} 根据ID获取${tableComment || tableName}
// @Summary 根据ID获取${tableComment || tableName}
// @Description 根据ID获取${tableComment || tableName}信息
// @Tags ${tableComment || tableName}
// @Accept json
// @Produce json
// @Param id path string true "${tableName}ID"
// @Success 200 {object} response.Response{data=model.${modelName}}
// @Security BearerAuth
// @Router /${tableName}/{id} [get]
func (c *${controllerName}) Get${modelName}(ctx *gin.Context) {
	id, err := strconv.ParseUint(ctx.Param("id"), 10, 64)
	if err != nil {
		response.BadRequest(ctx, err.Error())
		return
	}
	
	entity, err := c.service.Get${modelName}ByID(uint(id))
	if err != nil {
		response.Error(ctx, err.Error())
		return
	}
	
	response.SuccessWithMessage(ctx, "获取成功", entity)
}

// Get${modelName}List 获取${tableComment || tableName}列表
// @Summary 获取${tableComment || tableName}列表
// @Description 获取${tableComment || tableName}列表
// @Tags ${tableComment || tableName}
// @Accept json
// @Produce json
// @Param params query request.${modelName}QueryRequest true "${
    tableComment || tableName
  }查询参数"
// @Success 200 {object} response.Response{data=response.PageResponse{total=int64,list=[]model.${modelName}}}
// @Security BearerAuth
// @Router /${tableName} [get]
func (c *${controllerName}) Get${modelName}List(ctx *gin.Context) {
	var query request.${modelName}QueryRequest
	// 绑定查询参数
	if err := ctx.ShouldBindQuery(&query); err != nil {
		response.BadRequest(ctx, err.Error())
		return
	}
	
	entities, total, err := c.service.GetAll${modelName}(&query)
	if err != nil {
		response.Error(ctx, err.Error())
		return
	}
	
	response.PageSuccess(ctx, total, entities)
}

// Create${modelName} 创建${tableComment || tableName}
// @Summary 创建新${tableComment || tableName}
// @Description 创建新${tableComment || tableName}记录
// @Tags ${tableComment || tableName}
// @Accept json
// @Produce json
// @Param entity body request.${modelName}CreateRequest true "${
    tableComment || tableName
  }信息"
// @Success 200 {object} response.Response{data=model.${modelName}}
// @Security BearerAuth
// @Router /${tableName} [post]
func (c *${controllerName}) Create${modelName}(ctx *gin.Context) {
	var entity request.${modelName}CreateRequest
	if err := ctx.ShouldBindJSON(&entity); err != nil {
		response.BadRequest(ctx, err.Error())
		return
	}
	
	result, createErr := c.service.Create${modelName}(entity.ToModel())
	if createErr != nil {
		response.Error(ctx, createErr.Error())
		return
	}
	
	response.SuccessWithMessage(ctx, "创建成功", result)
}

// Update${modelName} 更新${tableComment || tableName}
// @Summary 更新${tableComment || tableName}
// @Description 更新${tableComment || tableName}信息
// @Tags ${tableComment || tableName}
// @Accept json
// @Produce json
// @Param id path string true "${tableName}ID"
// @Param entity body request.${modelName}UpdateRequest true "${
    tableComment || tableName
  }信息"
// @Success 200 {object} response.Response{data=model.${modelName}}
// @Security BearerAuth
// @Router /${tableName}/{id} [put]
func (c *${controllerName}) Update${modelName}(ctx *gin.Context) {
	id, err := strconv.ParseUint(ctx.Param("id"), 10, 64)
	if err != nil {
		response.BadRequest(ctx, err.Error())
		return
	}
	
	var entity request.${modelName}UpdateRequest
	if err := ctx.ShouldBindJSON(&entity); err != nil {
		response.BadRequest(ctx, err.Error())
		return
	}
	
	if err := c.service.Update${modelName}(uint(id), &entity); err != nil {
		response.Error(ctx, err.Error())
		return
	}

	result, getErr := c.service.Get${modelName}ByID(uint(id))
	if getErr != nil {
		response.Error(ctx, getErr.Error())
		return
	}
	
	response.SuccessWithMessage(ctx, "更新成功", result)
}

// Delete${modelName} 删除${tableComment || tableName}
// @Summary 删除${tableComment || tableName}
// @Description 删除${tableComment || tableName}
// @Tags ${tableComment || tableName}
// @Accept json
// @Produce json
// @Param id path string true "${tableName}ID"
// @Success 200 {object} response.Response{data=nil}
// @Security BearerAuth
// @Router /${tableName}/{id} [delete]
func (c *${controllerName}) Delete${modelName}(ctx *gin.Context) {
	id, err := strconv.ParseUint(ctx.Param("id"), 10, 64)
	if err != nil {
		response.BadRequest(ctx, err.Error())
		return
	}
	
	if err := c.service.Delete${modelName}(uint(id)); err != nil {
		response.Error(ctx, err.Error())
		return
	}
	
	response.SuccessWithMessage(ctx, "删除成功", nil)
}

// Restore${modelName} 恢复${tableComment || tableName}
// @Summary 恢复${tableComment || tableName}
// @Description 恢复${tableComment || tableName}
// @Tags ${tableComment || tableName}
// @Accept json
// @Produce json
// @Param id path string true "${tableName}ID"
// @Success 200 {object} response.Response{data=nil}
// @Security BearerAuth
// @Router /${tableName}/{id}/restore [put]
func (c *${controllerName}) Restore${modelName}(ctx *gin.Context) {
	id, err := strconv.ParseUint(ctx.Param("id"), 10, 64)
	if err != nil {
		response.BadRequest(ctx, err.Error())
		return
	}
		
	if err := c.service.Restore${modelName}(uint(id)); err != nil {
		response.Error(ctx, err.Error())
		return
	}

	response.SuccessWithMessage(ctx, "恢复成功", nil)
}

// ForceDelete${modelName} 真删除${tableComment || tableName}
// @Summary 真删除${tableComment || tableName}
// @Description 真删除${tableComment || tableName}
// @Tags ${tableComment || tableName}
// @Accept json
// @Produce json
// @Param id path string true "${tableName}ID"
// @Success 200 {object} response.Response{data=nil}
// @Security BearerAuth
// @Router /${tableName}/{id}/force [delete]
func (c *${controllerName}) ForceDelete${modelName}(ctx *gin.Context) {
	id, err := strconv.ParseUint(ctx.Param("id"), 10, 64)
	if err != nil {
		response.BadRequest(ctx, err.Error())
		return
	}
		
	if err := c.service.ForceDelete${modelName}(uint(id)); err != nil {
		response.Error(ctx, err.Error())
		return
	}
	
	response.SuccessWithMessage(ctx, "删除成功", nil)
}`;
}
