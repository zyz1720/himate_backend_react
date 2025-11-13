// 模拟消息读取记录数据
const MessageReadRecordsList = [
  {
    "id": "360000202302101673",
    "user_id": 16,
    "message_id": 707,
    "session_id": "下备水参压己都。",
    "create_time": "1987-06-20 17:57:58",
    "update_time": "1975-07-10 14:44:35",
    "create_by": 970,
    "update_by": 470,
    "delete_time": "2010-01-21 21:53:20"
  },
  {
    "id": "320000199402252215",
    "user_id": 163,
    "message_id": 172,
    "session_id": "基办千报属温示增。",
    "create_time": "2007-03-17 22:25:01",
    "update_time": "2003-03-19 00:31:30",
    "create_by": 787,
    "update_by": 495,
    "delete_time": "2015-08-02 20:11:46"
  },
  {
    "id": "990000198511120692",
    "user_id": 144,
    "message_id": 185,
    "session_id": "眼今没拉期传天。",
    "create_time": "2024-11-18 23:35:03",
    "update_time": "1984-10-15 10:43:30",
    "create_by": 545,
    "update_by": 355,
    "delete_time": "2001-12-05 03:01:45"
  },
  {
    "id": "530000200907116942",
    "user_id": 546,
    "message_id": 483,
    "session_id": "类及导题高调党。",
    "create_time": "1984-05-10 18:46:49",
    "update_time": "2017-08-27 07:20:23",
    "create_by": 88,
    "update_by": 392,
    "delete_time": "2007-06-26 21:51:07"
  },
  {
    "id": "210000202004010420",
    "user_id": 710,
    "message_id": 114,
    "session_id": "毛据还龙七选路。",
    "create_time": "1995-01-25 22:24:28",
    "update_time": "1992-06-02 16:09:20",
    "create_by": 838,
    "update_by": 325,
    "delete_time": "1986-11-26 10:40:23"
  },
  {
    "id": "15000019970818089X",
    "user_id": 824,
    "message_id": 674,
    "session_id": "求处干。",
    "create_time": "1976-12-12 15:02:27",
    "update_time": "1995-03-26 23:56:11",
    "create_by": 228,
    "update_by": 518,
    "delete_time": "2016-03-13 20:53:32"
  },
  {
    "id": "820000199405256674",
    "user_id": 955,
    "message_id": 178,
    "session_id": "也率办打始油斯。",
    "create_time": "2019-10-14 11:39:56",
    "update_time": "2002-11-09 14:45:28",
    "create_by": 753,
    "update_by": 657,
    "delete_time": "1980-08-03 16:02:51"
  },
  {
    "id": "540000201106065408",
    "user_id": 984,
    "message_id": 30,
    "session_id": "么保为形劳拉。",
    "create_time": "2006-08-03 08:05:01",
    "update_time": "1970-12-30 13:54:49",
    "create_by": 79,
    "update_by": 275,
    "delete_time": "1974-08-12 02:06:43"
  },
  {
    "id": "710000197508238933",
    "user_id": 373,
    "message_id": 226,
    "session_id": "文其眼产其系许。",
    "create_time": "2005-12-21 10:48:43",
    "update_time": "2020-01-30 21:10:53",
    "create_by": 626,
    "update_by": 961,
    "delete_time": "2009-07-31 00:20:12"
  },
  {
    "id": "610000201407203489",
    "user_id": 373,
    "message_id": 992,
    "session_id": "例还科选。",
    "create_time": "2008-09-28 05:04:38",
    "update_time": "1989-04-20 18:12:10",
    "create_by": 717,
    "update_by": 815,
    "delete_time": "2009-12-29 21:45:52"
  },
  {
    "id": "630000199105244238",
    "user_id": 902,
    "message_id": 152,
    "session_id": "任号参不众白数名。",
    "create_time": "2008-11-04 10:43:29",
    "update_time": "1991-01-24 21:27:09",
    "create_by": 681,
    "update_by": 525,
    "delete_time": "1973-05-03 16:24:22"
  },
  {
    "id": "430000201509015071",
    "user_id": 232,
    "message_id": 745,
    "session_id": "会美候动革能件。",
    "create_time": "2003-01-14 20:31:33",
    "update_time": "2021-07-02 01:36:05",
    "create_by": 244,
    "update_by": 581,
    "delete_time": "1992-02-19 21:16:09"
  },
  {
    "id": "230000198309307393",
    "user_id": 289,
    "message_id": 591,
    "session_id": "标一能间定料世着。",
    "create_time": "1994-05-07 15:41:05",
    "update_time": "1977-02-15 12:14:45",
    "create_by": 207,
    "update_by": 313,
    "delete_time": "2013-03-03 21:15:39"
  },
  {
    "id": "820000200606113763",
    "user_id": 747,
    "message_id": 30,
    "session_id": "间例海值国达外。",
    "create_time": "1996-02-29 22:33:05",
    "update_time": "2006-01-17 09:59:32",
    "create_by": 552,
    "update_by": 266,
    "delete_time": "2002-09-24 05:33:03"
  },
  {
    "id": "440000200008192886",
    "user_id": 482,
    "message_id": 546,
    "session_id": "毛治形以难切权。",
    "create_time": "1990-06-11 07:03:51",
    "update_time": "1981-06-01 20:31:53",
    "create_by": 109,
    "update_by": 294,
    "delete_time": "1993-04-09 14:27:59"
  },
  {
    "id": "450000199807106848",
    "user_id": 278,
    "message_id": 517,
    "session_id": "内形相新。",
    "create_time": "2001-03-20 02:08:57",
    "update_time": "2005-01-06 16:40:57",
    "create_by": 981,
    "update_by": 43,
    "delete_time": "2020-03-08 08:02:57"
  },
  {
    "id": "340000200404154239",
    "user_id": 942,
    "message_id": 479,
    "session_id": "团件候极手导。",
    "create_time": "2008-02-03 14:17:49",
    "update_time": "1977-07-18 03:10:01",
    "create_by": 329,
    "update_by": 715,
    "delete_time": "2011-06-18 08:26:06"
  },
  {
    "id": "99000019740803576X",
    "user_id": 4,
    "message_id": 302,
    "session_id": "也接状没阶路点。",
    "create_time": "2019-06-29 14:37:26",
    "update_time": "2010-02-19 08:18:17",
    "create_by": 526,
    "update_by": 391,
    "delete_time": "1983-12-08 07:38:19"
  }
];

// 生成唯一ID
function generateId() {
  return Date.now().toString();
}

export default [
  // 获取消息读取记录列表
  {
    url: '/message-read-records',
    method: 'get',
    response: (config) => {
      // 模拟分页和搜索
      const { current = 1, pageSize = 10, user_id, message_id, session_id } = config.query;

      let filteredList = MessageReadRecordsList;

      // 根据关键词搜索
      
      if (user_id) {
        filteredList = MessageReadRecordsList.filter(
          (item) =>
          {
            if(typeof item.user_id === 'string') {
              return item.user_id.includes(user_id);
            }
            return item.user_id == user_id;
          }
        );
      }
      
      if (message_id) {
        filteredList = MessageReadRecordsList.filter(
          (item) =>
          {
            if(typeof item.message_id === 'string') {
              return item.message_id.includes(message_id);
            }
            return item.message_id == message_id;
          }
        );
      }
      
      if (session_id) {
        filteredList = MessageReadRecordsList.filter(
          (item) =>
          {
            if(typeof item.session_id === 'string') {
              return item.session_id.includes(session_id);
            }
            return item.session_id == session_id;
          }
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

  // 获取消息读取记录详情
  {
    url: '/message-read-records/:id',
    method: 'get',
    response: (config) => {
      const { id } = config.query;
      const item = MessageReadRecordsList.find((item) => item.id === id);

      if (item) {
        return {
          code: 0,
          data: item,
        };
      } else {
        return {
          code: 1,
          message: '消息读取记录不存在',
        };
      }
    },
  },

  // 新增消息读取记录
  {
    url: '/message-read-records',
    method: 'post',
    response: (config) => {
      const data = config.body;
      const now = new Date().toISOString();

      const newItem = {
        id: generateId(),
        ...data,
        create_time: new Date().toISOString(),
        update_time: new Date().toISOString(),
      };

      MessageReadRecordsList.unshift(newItem); // 添加到列表开头

      return {
        code: 0,
        data: newItem,
        message: '新增消息读取记录成功',
      };
    },
  },

  // 更新消息读取记录
  {
    url: '/message-read-records/:id',
    method: 'put',
    response: (config) => {
      const { id } = config.query;
      const data = config.body;
      const index = MessageReadRecordsList.findIndex((item) => item.id === id);

      if (index !== -1) {
        MessageReadRecordsList[index] = {
          ...MessageReadRecordsList[index],
          ...data,
           update_time: new Date().toISOString(),
        };

        return {
          code: 0,
          data: MessageReadRecordsList[index],
          message: '更新消息读取记录成功',
        };
      } else {
        return {
          code: 1,
          message: '消息读取记录不存在',
        };
      }
    },
  },

  // 删除消息读取记录
  {
    url: '/message-read-records/:id',
    method: 'delete',
    response: (config) => {
      const { id } = config.query;
      const index = MessageReadRecordsList.findIndex((item) => item.id === id);

      if (index !== -1) {
        const deletedItem = MessageReadRecordsList.splice(index, 1)[0];

        return {
          code: 0,
          data: deletedItem,
          message: '删除消息读取记录成功',
        };
      } else {
        return {
          code: 1,
          message: '消息读取记录不存在',
        };
      }
    },
  },
];