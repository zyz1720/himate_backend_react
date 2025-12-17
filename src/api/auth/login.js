import instance from '@/utils/request/axios_instance';

/* 密码登录 */
export const userLogin = (data) => instance.post('login/password', data);

/* 刷新token */
export const refreshToken = (data) => instance.post('login/refresh', data);

/* 验证码登录 */
export const loginByCode = (data) => instance.post('login/code', data);
