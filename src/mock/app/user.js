import mockJS from 'mockjs';

export default [
  // 获取验证码
  {
    url: '/app/user/info',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: mockJS.mock({
          id: '@id',
          user_name: '@name',
          user_avatar: '/logo.png',
        }),
      };
    },
  },
];
