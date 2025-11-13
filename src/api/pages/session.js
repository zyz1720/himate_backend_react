import instance from '@/utils/request/axios_instance';

/* 获取会话列表 */
export const getSessionList = (params) => instance.get('session', { params: params });

/* 获取会话详情 */
export const getSessionDetail = (id) => instance.get(`session/${id}`);

/* 新增会话 */
export const addSession = (data) => instance.post('session', data);

/* 更新会话 */
export const updateSession = (id, data) => instance.put(`session/${id}`, data);

/* 删除会话 */
export const deleteSession = (id) => instance.delete(`session/${id}`);