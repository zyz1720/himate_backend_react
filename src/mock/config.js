export default [
  {
    url: '/config/layout',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          // setting_config: {
          //   isShowSettingDrawer: false,
          //   fixSiderbar: true,
          //   layout: 'mix',
          //   splitMenus: false,
          //   navTheme: 'light',
          //   contentWidth: 'Fluid',
          //   colorPrimary: '#1890ff',
          //   siderMenuType: 'sub',
          // },
          // header_config: {
          //   logo: '/logo.png',
          //   title: 'Mock Text title',
          //   subTitle: 'from mock Sub title',
          //   appList: [
          //     {
          //       icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
          //       title: 'Ant Design',
          //       desc: '杭州市较知名的 UI 设计语言',
          //       url: 'https://ant.design',
          //       target: '_blank',
          //     },
          //   ],
          // },
        },
      };
    },
  },

  {
    url: '/config/routes',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: null,
      };
    },
  },
];
