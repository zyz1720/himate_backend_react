import instance from '@/utils/request/axios_instance';

/* 获取布局配置 */
export const getLayoutConfig = () => instance.get('config/layout');

/* 获取路由配置 */
export const getRoutesConfig = () => instance.get('config/routes');
