export default [
  {
    url: '/upload/file',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: {
          key: '/2025/08/20/logo.png',
          original_file_name: 'logo.png',
        },
      };
    },
  },
];
