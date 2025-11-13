import instance from '@/utils/request/axios_instance';

/* 获取消息列表 */
export const getMessageList = (params) => instance.get('message', { params: params });

/* 获取消息详情 */
export const getMessageDetail = (id) => instance.get(`message/${id}`);

/* 新增消息 */
export const addMessage = (data) => instance.post('message', data);

/* 更新消息 */
export const updateMessage = (id, data) => instance.put(`message/${id}`, data);

/* 删除消息 */
export const deleteMessage = (id) => instance.delete(`message/${id}`);