import instance from '@/utils/request/axios_instance';

/* 获取消息读取记录列表 */
export const getMessageReadRecordsList = (params) => instance.get('message-read-records', { params: params });

/* 获取消息读取记录详情 */
export const getMessageReadRecordsDetail = (id) => instance.get(`message-read-records/${id}`);

/* 新增消息读取记录 */
export const addMessageReadRecords = (data) => instance.post('message-read-records', data);

/* 更新消息读取记录 */
export const updateMessageReadRecords = (id, data) => instance.put(`message-read-records/${id}`, data);

/* 删除消息读取记录 */
export const deleteMessageReadRecords = (id) => instance.delete(`message-read-records/${id}`);