export default [
  // 获取验证码
  {
    url: '/email/code',
    method: 'get',
    response: ({ query }) => {
      console.log(' verifyCode', query);
      return {
        code: 0,
        message: '验证码发送成功',
      };
    },
  },
];
