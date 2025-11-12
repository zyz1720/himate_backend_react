import instance from '@/utils/request/axios_instance';

/* 应用代码 */
export const applyCode = (data) => instance.post('dev/apply_code', data);