/**
  * 根据菜单配置过滤路由，确保只保留用户有权限访问的路由
  * @param {Array} routes 路由列表
  * @param {Array} routesConfig 菜单配置
  * @returns {Array} 过滤后的路由列表
 */

export function filterRoutes(routes, routesConfig) {
  try {
    return routes
      .filter((route) => {
        // 检查当前路由路径是否在菜单列表中
        const isInMenu = routesConfig.includes(route.path);

        // 如果有子路由，递归过滤子路由
        if (route.routes && route.routes.length > 0) {
          const filteredChildren = filterRoutes(route.routes, routesConfig);

          // 如果当前路由不在菜单中，但有在菜单中的子路由，则保留当前路由
          if (filteredChildren.length > 0) {
            route.routes = filteredChildren;
            return true;
          }
        }
        return isInMenu;
      })
      .map((route) => {
        // 深拷贝路由对象，避免修改原对象
        const filteredRoute = { ...route };
        // 确保子路由也是过滤后的版本
        if (route.routes && route.routes.length > 0) {
          filteredRoute.routes = [...route.routes];
        }
        return filteredRoute;
      });
  } catch (error) {
    console.log(error);
    return [];
  }
}

/**
 * 检查用户是否有权限访问某个路径
 * @param {String} pathname 路径
 * @param {Array} routesConfig 菜单配置
 * @returns {Boolean} 是否有权限访问
 */
export function hasRouteAccess(pathname, routesConfig) {
  try {
    // 如果路径列表为空，默认没有权限
    if (!routesConfig || routesConfig.length === 0) {
      return false;
    }

    // 检查精确匹配
    if (routesConfig.includes(pathname)) {
      return true;
    }

    // 检查路径前缀匹配（支持嵌套路由）
    // 例如：如果用户有权限访问 '/example/code_generator'，那么也应该能访问 '/example'
    return routesConfig.some(
      (routePath) => routePath.startsWith(pathname) && routePath !== '/',
    );
  } catch (error) {
    console.log(error);
    return false;
  }
}
