import instance from '@/utils/request/axios_instance';

/* 获取App管理列表 */
export const getAppPackageList = (params) => instance.get('app-package', { params: params });

/* 获取App管理详情 */
export const getAppPackageDetail = (id) => instance.get(`app-package/${id}`);

/* 新增App管理 */
export const addAppPackage = (data) => instance.post('app-package', data);

/* 更新App管理 */
export const updateAppPackage = (id, data) => instance.put(`app-package/${id}`, data);

/* 删除App管理 */
export const deleteAppPackage = (id) => instance.delete(`app-package/${id}`);