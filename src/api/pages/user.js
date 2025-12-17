import instance from '@/utils/request/axios_instance';

/* 获取用户列表 */
export const getUserList = (params) => instance.get('user', { params: params });

/* 获取用户详情 */
export const getUserDetail = (id) => instance.get(`user/${id}`);

/* 新增用户 */
export const addUser = (data) => instance.post('user', data);

/* 更新用户 */
export const updateUser = (id, data) => instance.put(`user/${id}`, data);

/* 删除用户 */
export const deleteUser = (id) => instance.delete(`user/${id}`);