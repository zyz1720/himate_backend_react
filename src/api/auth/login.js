import instance from '@/utils/request/axios_instance';

/* 密码登录 */
export const userLogin = (data) => instance.post('login/password', data);

/* 验证码登录 */
export const loginByCode = (data) => instance.post('login/code', data);
