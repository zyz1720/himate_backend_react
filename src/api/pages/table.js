import instance from '@/utils/request/axios_instance';

/* 获取公告列表 */
export const getNewslist = (params) => instance.get('news', { params: params });

/* 获取公告详情 */
export const getNewsDetail = (id) => instance.get(`news/${id}`);

/* 新增公告 */
export const addNews = (data) => instance.post('news', data);

/* 更新公告 */
export const updateNews = (id, data) => instance.put(`news/${id}`, data);

/* 删除公告 */
export const deleteNews = (id) => instance.delete(`news/${id}`);
