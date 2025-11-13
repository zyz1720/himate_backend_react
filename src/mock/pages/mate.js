// 模拟好友数据
const MateList = [
  {
    "id": "510000201711203519",
    "mate_id": "角着比织他又。",
    "user_id": 886,
    "user_remarks": "政群科给还设相。",
    "friend_id": 125,
    "friend_remarks": "品入委求。",
    "mate_status": "waiting",
    "create_time": "2009-04-30 06:32:26",
    "update_time": "1983-08-03 18:54:45",
    "create_by": 665,
    "update_by": 153,
    "delete_time": "1981-10-25 09:11:14",
    "validate_msg": "几等合里长价活又。"
  },
  {
    "id": "640000202306174447",
    "mate_id": "克质电今将放际具。",
    "user_id": 387,
    "user_remarks": "技号必以又角。",
    "friend_id": 31,
    "friend_remarks": "林指成。",
    "mate_status": "waiting",
    "create_time": "1999-06-08 08:24:27",
    "update_time": "1976-11-12 21:37:44",
    "create_by": 48,
    "update_by": 560,
    "delete_time": "2012-02-07 02:37:44",
    "validate_msg": "下领划生期土连响。"
  },
  {
    "id": "340000197305274492",
    "mate_id": "治性内基群。",
    "user_id": 789,
    "user_remarks": "单才己么时部。",
    "friend_id": 414,
    "friend_remarks": "酸但育不。",
    "mate_status": "waiting",
    "create_time": "1997-08-03 00:32:55",
    "update_time": "1984-01-29 01:06:38",
    "create_by": 502,
    "update_by": 262,
    "delete_time": "1989-04-22 00:29:27",
    "validate_msg": "与但表好京做。"
  },
  {
    "id": "410000199004274533",
    "mate_id": "队可去。",
    "user_id": 30,
    "user_remarks": "定党共世理生布。",
    "friend_id": 199,
    "friend_remarks": "除常北。",
    "mate_status": "agreed",
    "create_time": "1993-06-11 02:55:39",
    "update_time": "1970-11-01 01:05:11",
    "create_by": 928,
    "update_by": 259,
    "delete_time": "1980-08-26 01:29:07",
    "validate_msg": "东多维构府候。"
  },
  {
    "id": "460000201311133406",
    "mate_id": "可车改年线半主为。",
    "user_id": 388,
    "user_remarks": "想路没斗保。",
    "friend_id": 74,
    "friend_remarks": "速程要话。",
    "mate_status": "waiting",
    "create_time": "2003-03-16 15:50:21",
    "update_time": "2007-08-29 18:30:06",
    "create_by": 589,
    "update_by": 816,
    "delete_time": "1979-12-01 23:23:06",
    "validate_msg": "斗件调号口。"
  },
  {
    "id": "340000199412260351",
    "mate_id": "看列形华观第国。",
    "user_id": 159,
    "user_remarks": "调算况引最。",
    "friend_id": 62,
    "friend_remarks": "农却离总取。",
    "mate_status": "agreed",
    "create_time": "1998-05-19 14:25:12",
    "update_time": "1992-03-12 02:31:54",
    "create_by": 873,
    "update_by": 886,
    "delete_time": "2004-05-04 01:51:28",
    "validate_msg": "本目号立利。"
  },
  {
    "id": "440000200705152636",
    "mate_id": "支共开先家题选员。",
    "user_id": 211,
    "user_remarks": "细量器象。",
    "friend_id": 849,
    "friend_remarks": "代容元包条斗么。",
    "mate_status": "waiting",
    "create_time": "1978-10-06 13:39:43",
    "update_time": "1994-06-12 00:17:53",
    "create_by": 903,
    "update_by": 625,
    "delete_time": "1972-08-24 12:30:14",
    "validate_msg": "需表因则。"
  },
  {
    "id": "440000199703127642",
    "mate_id": "到选广白根养织个。",
    "user_id": 459,
    "user_remarks": "听思议报持问人铁。",
    "friend_id": 846,
    "friend_remarks": "前很样今。",
    "mate_status": "agreed",
    "create_time": "1975-05-31 05:00:29",
    "update_time": "1973-08-12 07:35:59",
    "create_by": 485,
    "update_by": 157,
    "delete_time": "2023-11-04 07:34:30",
    "validate_msg": "习据深毛海。"
  },
  {
    "id": "810000200709189654",
    "mate_id": "最织之下验。",
    "user_id": 182,
    "user_remarks": "权受报十思百次。",
    "friend_id": 509,
    "friend_remarks": "专养阶精却。",
    "mate_status": "refused",
    "create_time": "2003-11-12 05:50:37",
    "update_time": "2007-06-08 15:55:26",
    "create_by": 167,
    "update_by": 701,
    "delete_time": "1999-01-22 21:46:09",
    "validate_msg": "片历平支质。"
  },
  {
    "id": "820000200106247781",
    "mate_id": "片历支体车统或设。",
    "user_id": 685,
    "user_remarks": "知设面月事上。",
    "friend_id": 363,
    "friend_remarks": "传史高候上总酸。",
    "mate_status": "waiting",
    "create_time": "2010-07-24 21:04:08",
    "update_time": "2016-04-16 08:42:39",
    "create_by": 820,
    "update_by": 356,
    "delete_time": "1974-09-07 18:30:07",
    "validate_msg": "规般做圆作时。"
  },
  {
    "id": "650000201111103267",
    "mate_id": "有公加政。",
    "user_id": 142,
    "user_remarks": "规增位。",
    "friend_id": 486,
    "friend_remarks": "标政进你。",
    "mate_status": "waiting",
    "create_time": "2007-06-28 21:51:38",
    "update_time": "1997-09-28 22:35:20",
    "create_by": 387,
    "update_by": 232,
    "delete_time": "1985-02-02 18:17:13",
    "validate_msg": "运花米商专更金。"
  },
  {
    "id": "460000198501091839",
    "mate_id": "导走解始都织。",
    "user_id": 542,
    "user_remarks": "术工义指除深作。",
    "friend_id": 432,
    "friend_remarks": "石专使根品属。",
    "mate_status": "waiting",
    "create_time": "1990-07-31 03:50:08",
    "update_time": "1997-04-07 03:23:09",
    "create_by": 740,
    "update_by": 370,
    "delete_time": "1997-03-25 22:57:32",
    "validate_msg": "声交往志查花新。"
  },
  {
    "id": "370000199502191850",
    "mate_id": "至种者月石变带选。",
    "user_id": 550,
    "user_remarks": "意过型认置却府。",
    "friend_id": 452,
    "friend_remarks": "存报区整育对。",
    "mate_status": "waiting",
    "create_time": "2015-05-10 18:46:35",
    "update_time": "1976-09-09 17:10:58",
    "create_by": 442,
    "update_by": 541,
    "delete_time": "1996-05-24 08:17:55",
    "validate_msg": "常号务地。"
  },
  {
    "id": "350000200807195651",
    "mate_id": "林什机要价。",
    "user_id": 639,
    "user_remarks": "群研应我值海却。",
    "friend_id": 382,
    "friend_remarks": "何院而八新化。",
    "mate_status": "refused",
    "create_time": "1984-07-12 00:25:56",
    "update_time": "2002-08-28 14:16:06",
    "create_by": 558,
    "update_by": 315,
    "delete_time": "1981-04-23 01:35:51",
    "validate_msg": "电力划题发点风往。"
  },
  {
    "id": "41000020070524894X",
    "mate_id": "地变度研价油并京。",
    "user_id": 145,
    "user_remarks": "华光的细众合。",
    "friend_id": 646,
    "friend_remarks": "器至市正对。",
    "mate_status": "waiting",
    "create_time": "2020-02-20 14:18:25",
    "update_time": "2021-05-22 18:04:44",
    "create_by": 633,
    "update_by": 590,
    "delete_time": "1977-08-09 09:30:52",
    "validate_msg": "出证方般拉东。"
  },
  {
    "id": "230000202507035930",
    "mate_id": "员米放子点具东。",
    "user_id": 260,
    "user_remarks": "千需去。",
    "friend_id": 9,
    "friend_remarks": "由指四得东团府点。",
    "mate_status": "waiting",
    "create_time": "1970-02-23 16:41:32",
    "update_time": "1997-09-04 23:42:33",
    "create_by": 918,
    "update_by": 392,
    "delete_time": "2003-02-22 14:57:45",
    "validate_msg": "六二传素员。"
  },
  {
    "id": "340000202411071262",
    "mate_id": "与每面内。",
    "user_id": 708,
    "user_remarks": "包正话布约求。",
    "friend_id": 132,
    "friend_remarks": "力改照切观。",
    "mate_status": "waiting",
    "create_time": "1980-02-22 11:47:59",
    "update_time": "2013-01-29 03:29:44",
    "create_by": 596,
    "update_by": 419,
    "delete_time": "2013-04-30 21:34:08",
    "validate_msg": "十少百级。"
  },
  {
    "id": "370000198012285278",
    "mate_id": "原反满。",
    "user_id": 190,
    "user_remarks": "人拉众放适。",
    "friend_id": 835,
    "friend_remarks": "率圆改对般前。",
    "mate_status": "agreed",
    "create_time": "1987-02-21 04:06:46",
    "update_time": "2019-10-18 09:41:25",
    "create_by": 537,
    "update_by": 30,
    "delete_time": "1998-04-05 11:17:48",
    "validate_msg": "自者比并调复是。"
  }
];

// 生成唯一ID
function generateId() {
  return Date.now().toString();
}

export default [
  // 获取好友列表
  {
    url: '/mate',
    method: 'get',
    response: (config) => {
      // 模拟分页和搜索
      const { current = 1, pageSize = 10, mate_id, user_id, friend_id, mate_status } = config.query;

      let filteredList = MateList;

      // 根据关键词搜索
      
      if (mate_id) {
        filteredList = MateList.filter(
          (item) =>
          {
            if(typeof item.mate_id === 'string') {
              return item.mate_id.includes(mate_id);
            }
            return item.mate_id == mate_id;
          }
        );
      }
      
      if (user_id) {
        filteredList = MateList.filter(
          (item) =>
          {
            if(typeof item.user_id === 'string') {
              return item.user_id.includes(user_id);
            }
            return item.user_id == user_id;
          }
        );
      }
      
      if (friend_id) {
        filteredList = MateList.filter(
          (item) =>
          {
            if(typeof item.friend_id === 'string') {
              return item.friend_id.includes(friend_id);
            }
            return item.friend_id == friend_id;
          }
        );
      }
      
      if (mate_status) {
        filteredList = MateList.filter(
          (item) =>
          {
            if(typeof item.mate_status === 'string') {
              return item.mate_status.includes(mate_status);
            }
            return item.mate_status == mate_status;
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

  // 获取好友详情
  {
    url: '/mate/:id',
    method: 'get',
    response: (config) => {
      const { id } = config.query;
      const item = MateList.find((item) => item.id === id);

      if (item) {
        return {
          code: 0,
          data: item,
        };
      } else {
        return {
          code: 1,
          message: '好友不存在',
        };
      }
    },
  },

  // 新增好友
  {
    url: '/mate',
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

      MateList.unshift(newItem); // 添加到列表开头

      return {
        code: 0,
        data: newItem,
        message: '新增好友成功',
      };
    },
  },

  // 更新好友
  {
    url: '/mate/:id',
    method: 'put',
    response: (config) => {
      const { id } = config.query;
      const data = config.body;
      const index = MateList.findIndex((item) => item.id === id);

      if (index !== -1) {
        MateList[index] = {
          ...MateList[index],
          ...data,
           update_time: new Date().toISOString(),
        };

        return {
          code: 0,
          data: MateList[index],
          message: '更新好友成功',
        };
      } else {
        return {
          code: 1,
          message: '好友不存在',
        };
      }
    },
  },

  // 删除好友
  {
    url: '/mate/:id',
    method: 'delete',
    response: (config) => {
      const { id } = config.query;
      const index = MateList.findIndex((item) => item.id === id);

      if (index !== -1) {
        const deletedItem = MateList.splice(index, 1)[0];

        return {
          code: 0,
          data: deletedItem,
          message: '删除好友成功',
        };
      } else {
        return {
          code: 1,
          message: '好友不存在',
        };
      }
    },
  },
];