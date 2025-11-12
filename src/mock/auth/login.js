import mockJS from 'mockjs';

export default [
  // 用户登录接口
  {
    url: '/login/password',
    method: 'post',
    response: ({ body }) => {
      console.log(' login', body);
      return {
        code: 0,
        data: mockJS.mock({
          access_token: '@string(32)',
          token_type: 'Bearer',
        }),
      };
    },
  },
  // 验证码登录接口
  {
    url: '/login/code',
    method: 'post',
    response: ({ body }) => {
      console.log(' login', body);
      return {
        code: 0,
        data: mockJS.mock({
          access_token: '@string(32)',
          token_type: 'Bearer',
        }),
      };
    },
  },
];
