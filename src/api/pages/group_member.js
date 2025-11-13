import instance from '@/utils/request/axios_instance';

/* 获取群成员列表 */
export const getGroupMemberList = (params) => instance.get('group-member', { params: params });

/* 获取群成员详情 */
export const getGroupMemberDetail = (id) => instance.get(`group-member/${id}`);

/* 新增群成员 */
export const addGroupMember = (data) => instance.post('group-member', data);

/* 更新群成员 */
export const updateGroupMember = (id, data) => instance.put(`group-member/${id}`, data);

/* 删除群成员 */
export const deleteGroupMember = (id) => instance.delete(`group-member/${id}`);