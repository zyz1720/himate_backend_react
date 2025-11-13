import instance from '@/utils/request/axios_instance';

/* 获取音乐列表 */
export const getMusicList = (params) => instance.get('music', { params: params });

/* 获取音乐详情 */
export const getMusicDetail = (id) => instance.get(`music/${id}`);

/* 新增音乐 */
export const addMusic = (data) => instance.post('music', data);

/* 更新音乐 */
export const updateMusic = (id, data) => instance.put(`music/${id}`, data);

/* 删除音乐 */
export const deleteMusic = (id) => instance.delete(`music/${id}`);