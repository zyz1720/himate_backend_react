import instance from '@/utils/request/axios_instance';

/* 获取音乐扩展列表 */
export const getMusicExtraList = (params) => instance.get('music-extra', { params: params });

/* 获取音乐扩展详情 */
export const getMusicExtraDetail = (id) => instance.get(`music-extra/${id}`);

/* 新增音乐扩展 */
export const addMusicExtra = (data) => instance.post('music-extra', data);

/* 更新音乐扩展 */
export const updateMusicExtra = (id, data) => instance.put(`music-extra/${id}`, data);

/* 删除音乐扩展 */
export const deleteMusicExtra = (id) => instance.delete(`music-extra/${id}`);