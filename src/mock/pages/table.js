// 模拟公告数据
const newsList = [
  {
    id: '1',
    title: '系统升级公告',
    content:
      '尊敬的用户，我们将于2024年6月1日凌晨2:00-4:00进行系统升级维护，期间系统可能暂时无法访问，请您合理安排工作时间。',
    created_at: '2024-05-28T09:00:00',
    updated_at: '2024-05-28T09:00:00',
  },
  {
    id: '2',
    title: '新功能上线通知',
    content:
      '我们很高兴地宣布，数据可视化功能已正式上线！您可以在数据分析页面体验全新的图表展示和数据导出功能。',
    created_at: '2024-05-25T14:30:00',
    updated_at: '2024-05-26T10:15:00',
  },
  {
    id: '3',
    title: '安全提示',
    content:
      '为保障您的账号安全，请定期修改密码并启用双因素认证。近期发现有不法分子尝试通过钓鱼链接获取用户信息，请您提高警惕。',
    created_at: '2024-05-20T11:20:00',
    updated_at: '2024-05-20T11:20:00',
  },
  {
    id: '4',
    title: '系统故障公告',
    content: '尊敬的用户，系统出现故障，请您耐心等待，我们将在第一时间修复。',
    created_at: '2024-05-15T10:00:00',
    updated_at: '2024-05-15T10:00:00',
  },
  {
    id: '5',
    title: '系统维护公告',
    content:
      '尊敬的用户，系统将于2024年5月1日-2024年5月31日进行维护，维护期间系统可能暂时无法访问，请您合理安排工作时间。',
    created_at: '2024-05-01T09:00:00',
    updated_at: '2024-05-01T09:00:00',
  },
  {
    id: '6',
    title: '系统升级公告',
    content:
      '尊敬的用户，我们将于2024年4月1日-2024年4月30日进行系统升级维护，期间系统可能暂时无法访问，请您合理安排工作时间。',
    created_at: '2024-04-20T09:00:00',
    updated_at: '2024-04-20T09:00:00',
  },
  {
    id: '7',
    title: '系统维护公告',
    content:
      '尊敬的用户，系统将于2024年3月1日-2024年3月31日进行维护，维护期间系统可能暂时无法访问，请您合理安排工作时间。',
    created_at: '2024-03-01T09:00:00',
    updated_at: '2024-03-01T09:00:00',
  },
  {
    id: '8',
    title: '系统升级公告',
    content:
      '尊敬的用户，我们将于2024年2月1日-2024年2月28日进行系统升级维护，期间系统可能暂时无法访问，请您合理安排工作时间。',
    created_at: '2024-02-15T09:00:00',
    updated_at: '2024-02-15T09:00:00',
  },
  {
    id: '9',
    title: '系统维护公告',
    content:
      '尊敬的用户，系统将于2024年1月1日-2024年1月31日进行维护，维护期间系统可能暂时无法访问，请您合理安排工作时间。',
    created_at: '2024-01-01T09:00:00',
    updated_at: '2024-01-01T09:00:00',
  },
  {
    id: '10',
    title: '系统升级公告',
    content:
      '尊敬的用户，我们将于2023年12月1日-2023年12月31日进行系统升级维护，期间系统可能暂时无法访问，请您合理安排工作时间。',
    created_at: '2023-12-01T09:00:00',
    updated_at: '2023-12-01T09:00:00',
  },
  {
    id: '11',
    title: '系统维护公告',
    content:
      '尊敬的用户，系统将于2023年11月1日-2023年11月30日进行维护，维护期间系统可能暂时无法访问，请您合理安排工作时间。',
    created_at: '2023-11-01T09:00:00',
    updated_at: '2023-11-01T09:00:00',
  },
  {
    id: '12',
    title: '系统升级公告',
    content:
      '尊敬的用户，我们将于2023年10月1日-2023年10月31日进行系统升级维护，期间系统可能暂时无法访问，请您合理安排工作时间。',
    created_at: '2023-10-01T09:00:00',
    updated_at: '2023-10-01T09:00:00',
  },
  {
    id: '13',
    title: '系统维护公告',
    content:
      '尊敬的用户，系统将于2023年9月1日-2023年9月30日进行维护，维护期间系统可能暂时无法访问，请您合理安排工作时间。',
    created_at: '2023-09-01T09:00:00',
    updated_at: '2023-09-01T09:00:00',
  },
  {
    id: '14',
    title: '系统升级公告',
    content:
      '尊敬的用户，我们将于2023年8月1日-2023年8月31日进行系统升级维护，期间系统可能暂时无法访问，请您合理安排工作时间。',
    created_at: '2023-08-01T09:00:00',
    updated_at: '2023-08-01T09:00:00',
  },
  {
    id: '15',
    title: '系统维护公告',
    content:
      '尊敬的用户，系统将于2023年7月1日-2023年7月31日进行维护，维护期间系统可能暂时无法访问，请您合理安排工作时间。',
    created_at: '2023-07-01T09:00:00',
    updated_at: '2023-07-01T09:00:00',
  },
  {
    id: '16',
    title: '系统升级公告',
    content:
      '尊敬的用户，我们将于2023年6月1日-2023年6月30日进行系统升级维护，期间系统可能暂时无法访问，请您合理安排工作时间。',
    created_at: '2023-06-01T09:00:00',
    updated_at: '2023-06-01T09:00:00',
  },
];

// 生成唯一ID
function generateId() {
  return Date.now().toString();
}

export default [
  // 获取公告列表
  {
    url: '/news',
    method: 'get',
    response: (config) => {
      // 模拟分页和搜索
      const { current = 1, pageSize = 10, keyword = '' } = config.query;

      let filteredList = newsList;

      // 根据关键词搜索
      if (keyword) {
        filteredList = newsList.filter(
          (item) =>
            item.title.includes(keyword) || item.content.includes(keyword),
        );
      }

      // 分页处理
      const start = (current - 1) * pageSize;
      const end = start + Number(pageSize);
      const paginatedList = filteredList.slice(start, end);

      return {
        code: 0,
        data: {
          list: paginatedList,
          total: filteredList.length,
          current: Number(current),
          pageSize: Number(pageSize),
        },
      };
    },
  },

  // 获取公告详情
  {
    url: '/news/:id',
    method: 'get',
    response: (config) => {
      const { id } = config.query;
      const news = newsList.find((item) => item.id === id);

      if (news) {
        return {
          code: 0,
          data: news,
        };
      } else {
        return {
          code: 1,
          message: '公告不存在',
        };
      }
    },
  },

  // 新增公告
  {
    url: '/news',
    method: 'post',
    response: (config) => {
      const data = config.body;
      const now = new Date().toISOString();

      const newNews = {
        id: generateId(),
        title: data.title || '',
        content: data.content || '',
        created_at: now,
        updated_at: now,
      };

      newsList.unshift(newNews); // 添加到列表开头

      return {
        code: 0,
        data: newNews,
        message: '新增成功',
      };
    },
  },

  // 更新公告
  {
    url: '/news/:id',
    method: 'put',
    response: (config) => {
      const { id } = config.query;
      const data = config.body;
      const index = newsList.findIndex((item) => item.id === id);

      if (index !== -1) {
        newsList[index] = {
          ...newsList[index],
          title: data.title || newsList[index].title,
          content: data.content || newsList[index].content,
          updated_at: new Date().toISOString(),
        };

        return {
          code: 0,
          data: newsList[index],
          message: '更新成功',
        };
      } else {
        return {
          code: 1,
          message: '公告不存在',
        };
      }
    },
  },

  // 删除公告
  {
    url: '/news/:id',
    method: 'delete',
    response: (config) => {
      const { id } = config.query;
      const index = newsList.findIndex((item) => item.id === id);

      if (index !== -1) {
        const deletedNews = newsList.splice(index, 1)[0];

        return {
          code: 0,
          data: deletedNews,
          message: '删除成功',
        };
      } else {
        return {
          code: 1,
          message: '公告不存在',
        };
      }
    },
  },
];
