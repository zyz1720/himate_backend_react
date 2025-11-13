import instance from '@/utils/request/axios_instance';

/* 获取音乐收藏夹列表 */
export const getFavoritesList = (params) => instance.get('favorites', { params: params });

/* 获取音乐收藏夹详情 */
export const getFavoritesDetail = (id) => instance.get(`favorites/${id}`);

/* 新增音乐收藏夹 */
export const addFavorites = (data) => instance.post('favorites', data);

/* 更新音乐收藏夹 */
export const updateFavorites = (id, data) => instance.put(`favorites/${id}`, data);

/* 删除音乐收藏夹 */
export const deleteFavorites = (id) => instance.delete(`favorites/${id}`);