// 模拟群成员数据
const GroupMemberList = [
  {
    "id": "640000202111144459",
    "group_id": "标件得市阶意运。",
    "user_id": 347,
    "member_remarks": "作数期文。",
    "member_role": "admin",
    "member_status": "normal",
    "create_time": "2011-06-13 17:14:09",
    "update_time": "2000-08-08 13:23:11",
    "create_by": 672,
    "update_by": 982,
    "delete_time": "1991-12-03 21:09:18"
  },
  {
    "id": "12000019950208475X",
    "group_id": "石接联美。",
    "user_id": 85,
    "member_remarks": "光料半技。",
    "member_role": "owner",
    "member_status": "normal",
    "create_time": "1990-06-08 05:48:02",
    "update_time": "2013-04-06 09:40:19",
    "create_by": 850,
    "update_by": 733,
    "delete_time": "2013-01-06 19:58:32"
  },
  {
    "id": "710000202112275379",
    "group_id": "取在组这电。",
    "user_id": 17,
    "member_remarks": "参给一。",
    "member_role": "owner",
    "member_status": "forbidden",
    "create_time": "1998-12-17 08:02:32",
    "update_time": "1972-04-19 14:17:25",
    "create_by": 489,
    "update_by": 555,
    "delete_time": "2017-10-18 11:45:19"
  },
  {
    "id": "610000200902267872",
    "group_id": "你性上使即度次。",
    "user_id": 169,
    "member_remarks": "成进非具身资存。",
    "member_role": "owner",
    "member_status": "normal",
    "create_time": "1971-05-18 09:43:58",
    "update_time": "2017-08-12 16:53:40",
    "create_by": 705,
    "update_by": 646,
    "delete_time": "1987-11-24 09:06:29"
  },
  {
    "id": "34000019980922261X",
    "group_id": "府厂实产采。",
    "user_id": 668,
    "member_remarks": "支装史容论十代也。",
    "member_role": "member",
    "member_status": "normal",
    "create_time": "2017-11-24 16:56:06",
    "update_time": "1970-05-29 00:44:08",
    "create_by": 149,
    "update_by": 39,
    "delete_time": "2022-06-20 14:13:51"
  },
  {
    "id": "610000198405087248",
    "group_id": "值众增。",
    "user_id": 236,
    "member_remarks": "公引石干力听同。",
    "member_role": "owner",
    "member_status": "forbidden",
    "create_time": "1970-02-16 12:46:36",
    "update_time": "2005-12-25 01:03:20",
    "create_by": 736,
    "update_by": 257,
    "delete_time": "1977-04-19 02:42:11"
  },
  {
    "id": "140000200111251820",
    "group_id": "开话名己决动史克。",
    "user_id": 163,
    "member_remarks": "持几立是果装选成。",
    "member_role": "owner",
    "member_status": "forbidden",
    "create_time": "1972-08-18 12:04:53",
    "update_time": "1990-05-26 19:00:17",
    "create_by": 930,
    "update_by": 336,
    "delete_time": "2014-06-22 15:19:39"
  },
  {
    "id": "460000202503304753",
    "group_id": "本家何点。",
    "user_id": 155,
    "member_remarks": "火已状基市。",
    "member_role": "member",
    "member_status": "forbidden",
    "create_time": "1998-06-12 06:18:54",
    "update_time": "2023-11-02 00:42:20",
    "create_by": 698,
    "update_by": 371,
    "delete_time": "1982-10-28 12:10:53"
  },
  {
    "id": "460000201402206316",
    "group_id": "民研图军把。",
    "user_id": 161,
    "member_remarks": "是示米。",
    "member_role": "member",
    "member_status": "forbidden",
    "create_time": "2010-11-12 23:19:31",
    "update_time": "1974-04-04 09:23:43",
    "create_by": 93,
    "update_by": 829,
    "delete_time": "1981-11-17 17:11:17"
  },
  {
    "id": "610000200008273426",
    "group_id": "见类问证度路许。",
    "user_id": 222,
    "member_remarks": "题然半约别增正。",
    "member_role": "admin",
    "member_status": "normal",
    "create_time": "1982-05-21 16:57:55",
    "update_time": "1985-03-01 10:54:47",
    "create_by": 16,
    "update_by": 485,
    "delete_time": "2002-08-24 03:01:22"
  },
  {
    "id": "630000201806071210",
    "group_id": "们一主质油三。",
    "user_id": 215,
    "member_remarks": "其活向百何研集参。",
    "member_role": "owner",
    "member_status": "normal",
    "create_time": "2015-06-14 08:04:44",
    "update_time": "1989-03-07 00:55:22",
    "create_by": 568,
    "update_by": 765,
    "delete_time": "1970-05-14 14:56:43"
  },
  {
    "id": "320000200610051683",
    "group_id": "定知县族最。",
    "user_id": 64,
    "member_remarks": "族开王。",
    "member_role": "owner",
    "member_status": "normal",
    "create_time": "2012-05-04 16:48:04",
    "update_time": "1983-08-15 11:18:31",
    "create_by": 486,
    "update_by": 516,
    "delete_time": "1994-01-05 04:15:50"
  },
  {
    "id": "500000200905014058",
    "group_id": "维整现只历真。",
    "user_id": 73,
    "member_remarks": "格历节道真。",
    "member_role": "owner",
    "member_status": "normal",
    "create_time": "2001-12-18 01:19:37",
    "update_time": "1992-01-12 08:01:02",
    "create_by": 474,
    "update_by": 609,
    "delete_time": "2020-11-21 16:23:32"
  },
  {
    "id": "140000202501114863",
    "group_id": "际道些强原具据。",
    "user_id": 314,
    "member_remarks": "入力到维强。",
    "member_role": "member",
    "member_status": "forbidden",
    "create_time": "2019-02-23 02:13:19",
    "update_time": "2010-06-02 12:15:16",
    "create_by": 836,
    "update_by": 203,
    "delete_time": "2011-07-22 03:14:20"
  },
  {
    "id": "150000201706160043",
    "group_id": "风段快教度克。",
    "user_id": 767,
    "member_remarks": "权离说引收律。",
    "member_role": "owner",
    "member_status": "normal",
    "create_time": "2022-03-03 19:40:22",
    "update_time": "1971-06-21 07:12:56",
    "create_by": 657,
    "update_by": 123,
    "delete_time": "1988-10-24 17:44:52"
  },
  {
    "id": "120000197211175249",
    "group_id": "治山众离数第。",
    "user_id": 658,
    "member_remarks": "当从但较据。",
    "member_role": "owner",
    "member_status": "normal",
    "create_time": "2015-02-14 15:14:05",
    "update_time": "2015-12-31 06:11:27",
    "create_by": 753,
    "update_by": 697,
    "delete_time": "2025-02-19 06:27:16"
  },
  {
    "id": "430000199604308112",
    "group_id": "斗历多义实越其。",
    "user_id": 774,
    "member_remarks": "开严养。",
    "member_role": "owner",
    "member_status": "normal",
    "create_time": "1975-12-21 23:47:33",
    "update_time": "1981-12-22 15:24:16",
    "create_by": 694,
    "update_by": 625,
    "delete_time": "1997-01-29 09:04:24"
  },
  {
    "id": "520000198003245328",
    "group_id": "场上县月。",
    "user_id": 873,
    "member_remarks": "适消酸织。",
    "member_role": "owner",
    "member_status": "normal",
    "create_time": "1980-03-24 01:18:50",
    "update_time": "2023-01-17 13:42:14",
    "create_by": 660,
    "update_by": 806,
    "delete_time": "1976-01-29 18:53:54"
  }
];

// 生成唯一ID
function generateId() {
  return Date.now().toString();
}

export default [
  // 获取群成员列表
  {
    url: '/group-member',
    method: 'get',
    response: (config) => {
      // 模拟分页和搜索
      const { current = 1, pageSize = 10, group_id, user_id, member_remarks, member_role, member_status } = config.query;

      let filteredList = GroupMemberList;

      // 根据关键词搜索
      
      if (group_id) {
        filteredList = GroupMemberList.filter(
          (item) =>
          {
            if(typeof item.group_id === 'string') {
              return item.group_id.includes(group_id);
            }
            return item.group_id == group_id;
          }
        );
      }
      
      if (user_id) {
        filteredList = GroupMemberList.filter(
          (item) =>
          {
            if(typeof item.user_id === 'string') {
              return item.user_id.includes(user_id);
            }
            return item.user_id == user_id;
          }
        );
      }
      
      if (member_remarks) {
        filteredList = GroupMemberList.filter(
          (item) =>
          {
            if(typeof item.member_remarks === 'string') {
              return item.member_remarks.includes(member_remarks);
            }
            return item.member_remarks == member_remarks;
          }
        );
      }
      
      if (member_role) {
        filteredList = GroupMemberList.filter(
          (item) =>
          {
            if(typeof item.member_role === 'string') {
              return item.member_role.includes(member_role);
            }
            return item.member_role == member_role;
          }
        );
      }
      
      if (member_status) {
        filteredList = GroupMemberList.filter(
          (item) =>
          {
            if(typeof item.member_status === 'string') {
              return item.member_status.includes(member_status);
            }
            return item.member_status == member_status;
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

  // 获取群成员详情
  {
    url: '/group-member/:id',
    method: 'get',
    response: (config) => {
      const { id } = config.query;
      const item = GroupMemberList.find((item) => item.id === id);

      if (item) {
        return {
          code: 0,
          data: item,
        };
      } else {
        return {
          code: 1,
          message: '群成员不存在',
        };
      }
    },
  },

  // 新增群成员
  {
    url: '/group-member',
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

      GroupMemberList.unshift(newItem); // 添加到列表开头

      return {
        code: 0,
        data: newItem,
        message: '新增群成员成功',
      };
    },
  },

  // 更新群成员
  {
    url: '/group-member/:id',
    method: 'put',
    response: (config) => {
      const { id } = config.query;
      const data = config.body;
      const index = GroupMemberList.findIndex((item) => item.id === id);

      if (index !== -1) {
        GroupMemberList[index] = {
          ...GroupMemberList[index],
          ...data,
           update_time: new Date().toISOString(),
        };

        return {
          code: 0,
          data: GroupMemberList[index],
          message: '更新群成员成功',
        };
      } else {
        return {
          code: 1,
          message: '群成员不存在',
        };
      }
    },
  },

  // 删除群成员
  {
    url: '/group-member/:id',
    method: 'delete',
    response: (config) => {
      const { id } = config.query;
      const index = GroupMemberList.findIndex((item) => item.id === id);

      if (index !== -1) {
        const deletedItem = GroupMemberList.splice(index, 1)[0];

        return {
          code: 0,
          data: deletedItem,
          message: '删除群成员成功',
        };
      } else {
        return {
          code: 1,
          message: '群成员不存在',
        };
      }
    },
  },
];