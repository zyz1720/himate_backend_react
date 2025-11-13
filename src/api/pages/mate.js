import instance from '@/utils/request/axios_instance';

/* 获取好友列表 */
export const getMateList = (params) => instance.get('mate', { params: params });

/* 获取好友详情 */
export const getMateDetail = (id) => instance.get(`mate/${id}`);

/* 新增好友 */
export const addMate = (data) => instance.post('mate', data);

/* 更新好友 */
export const updateMate = (id, data) => instance.put(`mate/${id}`, data);

/* 删除好友 */
export const deleteMate = (id) => instance.delete(`mate/${id}`);