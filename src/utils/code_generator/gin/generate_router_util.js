import { toFirstUpperCase } from '@/utils/common/string_util';

/**
 * 生成Gin框架的controller
 * @param {object} tableInfo - 表信息对象，包含表名、表注释和字段信息
 * @returns {string} - 包含router文件内容的字符串
 */
export function generateGinRouter(tableInfo, packageName) {
  const { tableName, tableComment } = tableInfo;
  const modelName = toFirstUpperCase(tableName);
  const endpoint = tableName.replace(/_/g, '-');

  return `package router

import (
	_ "${packageName}/docs"
	"${packageName}/internal/middleware"
	"${packageName}/internal/controller"
	"${packageName}/internal/repository"
	"${packageName}/internal/service"
	"${packageName}/pkg/database"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func Setup${modelName}Router() *gin.Engine {
	router := gin.Default()

	// 依赖注入
	${modelName}Repo := repository.New${modelName}Repository(database.GetDB())
	${modelName}Service := service.New${modelName}Service(${modelName}Repo)
	${modelName}Controller := controller.New${modelName}Controller(${modelName}Service)
	
	// swagger文档
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

		${tableName} := router.Group("/${endpoint}", middleware.RoleAuth(model.UserRoleTypeAdmin))
		{
			// ${tableComment || tableName}相关路由
			${tableName}.GET("", ${modelName}Controller.Get${modelName}List)
			${tableName}.GET("/:id", ${modelName}Controller.Get${modelName})
			${tableName}.POST("", ${modelName}Controller.Create${modelName})
			${tableName}.PUT("/:id", ${modelName}Controller.Update${modelName})
			${tableName}.DELETE("/:id", ${modelName}Controller.Delete${modelName})
			${tableName}.PUT("/:id/restore", ${modelName}Controller.Restore${modelName})
			${tableName}.DELETE("/:id/force", ${modelName}Controller.ForceDelete${modelName})
		}

	return router
	
}`;
}
