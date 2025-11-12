import instance from '@/utils/request/axios_instance';

/* 获取验证码 */
export const getVerifyCode = (email) => instance.get('mail/code', { params: { email } });
