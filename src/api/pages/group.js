import instance from '@/utils/request/axios_instance';

/* 获取群组列表 */
export const getGroupList = (params) => instance.get('group', { params: params });

/* 获取群组详情 */
export const getGroupDetail = (id) => instance.get(`group/${id}`);

/* 新增群组 */
export const addGroup = (data) => instance.post('group', data);

/* 更新群组 */
export const updateGroup = (id, data) => instance.put(`group/${id}`, data);

/* 删除群组 */
export const deleteGroup = (id) => instance.delete(`group/${id}`);