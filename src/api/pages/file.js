import instance from '@/utils/request/axios_instance';

/* 获取文件列表 */
export const getFileList = (params) => instance.get('file', { params: params });

/* 获取文件详情 */
export const getFileDetail = (id) => instance.get(`file/${id}`);

/* 新增文件 */
export const addFile = (data) => instance.post('file', data);

/* 更新文件 */
export const updateFile = (id, data) => instance.put(`file/${id}`, data);

/* 删除文件 */
export const deleteFile = (id) => instance.delete(`file/${id}`);