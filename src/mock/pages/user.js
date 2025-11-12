// 模拟用户数据
const UserList = [
  {
    "id": "150000201511285452",
    "user_name": "汪磊",
    "user_avatar": "及候收界特。",
    "sex": "man",
    "birthday": "又为家性毛。",
    "age": 760,
    "account": "断和机者华那。",
    "self_account": "阶置志些明组照。",
    "user_role": "admin",
    "password": "就农角。",
    "user_status": "enable",
    "create_by": 466,
    "update_by": 962,
    "create_time": "2012-01-28 18:31:27",
    "update_time": "2013-08-25 18:18:37",
    "delete_time": "1981-03-13 17:26:48"
  },
  {
    "id": "340000200610106625",
    "user_name": "郭磊",
    "user_avatar": "提听世名。",
    "sex": "unknown",
    "birthday": "听质头场意领和。",
    "age": 143,
    "account": "技置加到看品。",
    "self_account": "眼马公例年立一部。",
    "user_role": "admin",
    "password": "提青物号属。",
    "user_status": "disable",
    "create_by": 835,
    "update_by": 384,
    "create_time": "1997-10-23 02:55:15",
    "update_time": "2005-12-28 02:57:15",
    "delete_time": "1970-07-10 21:51:10"
  },
  {
    "id": "420000201102165068",
    "user_name": "何秀英",
    "user_avatar": "它立问打心社步。",
    "sex": "man",
    "birthday": "资来状。",
    "age": 750,
    "account": "发表于基儿意。",
    "self_account": "进内原。",
    "user_role": "vip",
    "password": "几无题装周象向。",
    "user_status": "disable",
    "create_by": 948,
    "update_by": 263,
    "create_time": "2004-04-17 11:21:53",
    "update_time": "2020-07-05 21:47:24",
    "delete_time": "2024-03-09 18:51:23"
  },
  {
    "id": "330000201602243737",
    "user_name": "段娟",
    "user_avatar": "深温七白林。",
    "sex": "unknown",
    "birthday": "派油段志因。",
    "age": 683,
    "account": "可用同。",
    "self_account": "强声局以情专许它。",
    "user_role": "vip",
    "password": "原劳存农生。",
    "user_status": "enable",
    "create_by": 287,
    "update_by": 602,
    "create_time": "2009-09-30 06:14:07",
    "update_time": "2002-05-10 06:39:08",
    "delete_time": "2000-03-22 18:34:13"
  },
  {
    "id": "330000198505017354",
    "user_name": "周秀兰",
    "user_avatar": "证列日油查色。",
    "sex": "woman",
    "birthday": "她被规什细部观。",
    "age": 441,
    "account": "指现极联成。",
    "self_account": "习调公过。",
    "user_role": "admin",
    "password": "济从改它感。",
    "user_status": "enable",
    "create_by": 573,
    "update_by": 106,
    "create_time": "2022-02-11 00:52:56",
    "update_time": "2018-01-09 18:02:17",
    "delete_time": "1978-08-11 20:01:25"
  },
  {
    "id": "41000020220331343X",
    "user_name": "郝军",
    "user_avatar": "接最快党与。",
    "sex": "unknown",
    "birthday": "非律影结五为。",
    "age": 834,
    "account": "般已思复重立。",
    "self_account": "求到论与米。",
    "user_role": "vip",
    "password": "子了清料例统族。",
    "user_status": "disable",
    "create_by": 350,
    "update_by": 382,
    "create_time": "1997-09-29 08:47:59",
    "update_time": "1991-12-26 12:14:28",
    "delete_time": "2016-11-12 22:27:28"
  },
  {
    "id": "610000200212198523",
    "user_name": "邵勇",
    "user_avatar": "分才叫准越。",
    "sex": "woman",
    "birthday": "四时级。",
    "age": 643,
    "account": "通列界。",
    "self_account": "战满世速众名要。",
    "user_role": "admin",
    "password": "层器间进界任消生。",
    "user_status": "enable",
    "create_by": 895,
    "update_by": 569,
    "create_time": "1985-10-12 21:00:25",
    "update_time": "1983-03-14 04:37:10",
    "delete_time": "1980-07-12 03:58:35"
  },
  {
    "id": "440000201504266041",
    "user_name": "钱强",
    "user_avatar": "且技位商转义。",
    "sex": "woman",
    "birthday": "市者却。",
    "age": 96,
    "account": "她至酸信。",
    "self_account": "况海步期。",
    "user_role": "admin",
    "password": "由已离气都引。",
    "user_status": "enable",
    "create_by": 563,
    "update_by": 335,
    "create_time": "1972-08-15 02:19:39",
    "update_time": "2005-03-01 17:10:25",
    "delete_time": "1982-07-06 00:46:18"
  },
  {
    "id": "650000201611010147",
    "user_name": "许静",
    "user_avatar": "家很月些。",
    "sex": "man",
    "birthday": "大标统。",
    "age": 85,
    "account": "此美军即力情周织。",
    "self_account": "新容还着史。",
    "user_role": "admin",
    "password": "上中志。",
    "user_status": "enable",
    "create_by": 130,
    "update_by": 58,
    "create_time": "1984-05-22 04:04:37",
    "update_time": "1981-03-22 07:00:17",
    "delete_time": "2006-09-09 13:09:05"
  },
  {
    "id": "61000019960316654X",
    "user_name": "戴杰",
    "user_avatar": "走近低电。",
    "sex": "woman",
    "birthday": "片断好立。",
    "age": 426,
    "account": "青路给石受。",
    "self_account": "计验风达体华积可。",
    "user_role": "vip",
    "password": "调则或识还。",
    "user_status": "enable",
    "create_by": 737,
    "update_by": 570,
    "create_time": "2021-12-27 04:37:44",
    "update_time": "2011-07-02 03:26:18",
    "delete_time": "2013-12-16 12:35:13"
  },
  {
    "id": "990000199206259940",
    "user_name": "邓娟",
    "user_avatar": "效斯技增。",
    "sex": "woman",
    "birthday": "叫生增。",
    "age": 973,
    "account": "过团十任约酸。",
    "self_account": "复料便争型。",
    "user_role": "admin",
    "password": "打八圆质际又术。",
    "user_status": "disable",
    "create_by": 618,
    "update_by": 137,
    "create_time": "1986-08-18 08:40:04",
    "update_time": "1972-04-20 19:25:52",
    "delete_time": "2006-09-02 17:04:59"
  },
  {
    "id": "120000199809163372",
    "user_name": "锺敏",
    "user_avatar": "区作情和众由品。",
    "sex": "unknown",
    "birthday": "很经美支高断。",
    "age": 64,
    "account": "专高龙军则马。",
    "self_account": "水克子派过也。",
    "user_role": "default",
    "password": "四权所立只。",
    "user_status": "disable",
    "create_by": 230,
    "update_by": 824,
    "create_time": "2006-03-01 16:48:39",
    "update_time": "1983-09-14 04:54:20",
    "delete_time": "1996-07-19 17:28:53"
  },
  {
    "id": "230000201006149919",
    "user_name": "梁平",
    "user_avatar": "土问么身代比来。",
    "sex": "man",
    "birthday": "此劳转共温出采这。",
    "age": 685,
    "account": "上合回展。",
    "self_account": "种事光手。",
    "user_role": "default",
    "password": "花机制断个。",
    "user_status": "disable",
    "create_by": 783,
    "update_by": 19,
    "create_time": "1972-12-25 12:11:47",
    "update_time": "1979-04-26 02:18:53",
    "delete_time": "2001-08-26 01:42:18"
  },
  {
    "id": "22000019720218792X",
    "user_name": "方丽",
    "user_avatar": "容东新引品。",
    "sex": "woman",
    "birthday": "传越且商起。",
    "age": 868,
    "account": "权群任期。",
    "self_account": "从作社资选与果。",
    "user_role": "default",
    "password": "生据直群消算算。",
    "user_status": "disable",
    "create_by": 653,
    "update_by": 146,
    "create_time": "2024-09-17 03:26:20",
    "update_time": "1995-09-16 16:39:02",
    "delete_time": "1973-11-18 14:27:56"
  },
  {
    "id": "810000200612145188",
    "user_name": "段洋",
    "user_avatar": "九无只众经技。",
    "sex": "woman",
    "birthday": "教劳指从化。",
    "age": 602,
    "account": "张从写音几内往时。",
    "self_account": "你速照建活。",
    "user_role": "admin",
    "password": "党军千题。",
    "user_status": "enable",
    "create_by": 67,
    "update_by": 37,
    "create_time": "2008-12-04 10:39:47",
    "update_time": "1970-04-12 08:33:57",
    "delete_time": "1988-02-16 21:42:55"
  },
  {
    "id": "430000199402206847",
    "user_name": "赵敏",
    "user_avatar": "己业受头白世价。",
    "sex": "woman",
    "birthday": "后越确问样火常。",
    "age": 245,
    "account": "由边近市争总方。",
    "self_account": "容存局料。",
    "user_role": "vip",
    "password": "非始时为上何增九。",
    "user_status": "disable",
    "create_by": 114,
    "update_by": 69,
    "create_time": "1989-04-24 14:17:28",
    "update_time": "1998-09-03 21:16:06",
    "delete_time": "2021-07-30 04:54:27"
  },
  {
    "id": "460000202106203369",
    "user_name": "余丽",
    "user_avatar": "条南目东设特。",
    "sex": "unknown",
    "birthday": "值百中。",
    "age": 234,
    "account": "观规一管张完教。",
    "self_account": "亲系复。",
    "user_role": "admin",
    "password": "各局命内。",
    "user_status": "disable",
    "create_by": 599,
    "update_by": 871,
    "create_time": "1973-08-03 15:19:01",
    "update_time": "2004-04-23 21:59:51",
    "delete_time": "1977-09-02 18:04:52"
  },
  {
    "id": "360000198102113136",
    "user_name": "阎军",
    "user_avatar": "增白任电状。",
    "sex": "man",
    "birthday": "件西所入准基。",
    "age": 400,
    "account": "热因十置。",
    "self_account": "走下们那是深。",
    "user_role": "admin",
    "password": "展人义历叫思。",
    "user_status": "disable",
    "create_by": 376,
    "update_by": 115,
    "create_time": "2018-03-26 23:32:25",
    "update_time": "1986-02-12 09:33:50",
    "delete_time": "2016-08-07 02:08:08"
  }
];

// 生成唯一ID
function generateId() {
  return Date.now().toString();
}

export default [
  // 获取用户列表
  {
    url: '/user',
    method: 'get',
    response: (config) => {
      // 模拟分页和搜索
      const { current = 1, pageSize = 10, user_name, sex, birthday, age, account, self_account, user_role, password, user_status } = config.query;

      let filteredList = UserList;

      // 根据关键词搜索
      
      if (user_name) {
        filteredList = UserList.filter(
          (item) =>
          {
            if(typeof item.user_name === 'string') {
              return item.user_name.includes(user_name);
            }
            return item.user_name == user_name;
          }
        );
      }
      
      if (sex) {
        filteredList = UserList.filter(
          (item) =>
          {
            if(typeof item.sex === 'string') {
              return item.sex.includes(sex);
            }
            return item.sex == sex;
          }
        );
      }
      
      if (birthday) {
        filteredList = UserList.filter(
          (item) =>
          {
            if(typeof item.birthday === 'string') {
              return item.birthday.includes(birthday);
            }
            return item.birthday == birthday;
          }
        );
      }
      
      if (age) {
        filteredList = UserList.filter(
          (item) =>
          {
            if(typeof item.age === 'string') {
              return item.age.includes(age);
            }
            return item.age == age;
          }
        );
      }
      
      if (account) {
        filteredList = UserList.filter(
          (item) =>
          {
            if(typeof item.account === 'string') {
              return item.account.includes(account);
            }
            return item.account == account;
          }
        );
      }
      
      if (self_account) {
        filteredList = UserList.filter(
          (item) =>
          {
            if(typeof item.self_account === 'string') {
              return item.self_account.includes(self_account);
            }
            return item.self_account == self_account;
          }
        );
      }
      
      if (user_role) {
        filteredList = UserList.filter(
          (item) =>
          {
            if(typeof item.user_role === 'string') {
              return item.user_role.includes(user_role);
            }
            return item.user_role == user_role;
          }
        );
      }
      
      if (password) {
        filteredList = UserList.filter(
          (item) =>
          {
            if(typeof item.password === 'string') {
              return item.password.includes(password);
            }
            return item.password == password;
          }
        );
      }
      
      if (user_status) {
        filteredList = UserList.filter(
          (item) =>
          {
            if(typeof item.user_status === 'string') {
              return item.user_status.includes(user_status);
            }
            return item.user_status == user_status;
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

  // 获取用户详情
  {
    url: '/user/:id',
    method: 'get',
    response: (config) => {
      const { id } = config.query;
      const item = UserList.find((item) => item.id === id);

      if (item) {
        return {
          code: 0,
          data: item,
        };
      } else {
        return {
          code: 1,
          message: '用户不存在',
        };
      }
    },
  },

  // 新增用户
  {
    url: '/user',
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

      UserList.unshift(newItem); // 添加到列表开头

      return {
        code: 0,
        data: newItem,
        message: '新增用户成功',
      };
    },
  },

  // 更新用户
  {
    url: '/user/:id',
    method: 'put',
    response: (config) => {
      const { id } = config.query;
      const data = config.body;
      const index = UserList.findIndex((item) => item.id === id);

      if (index !== -1) {
        UserList[index] = {
          ...UserList[index],
          ...data,
           update_time: new Date().toISOString(),
        };

        return {
          code: 0,
          data: UserList[index],
          message: '更新用户成功',
        };
      } else {
        return {
          code: 1,
          message: '用户不存在',
        };
      }
    },
  },

  // 删除用户
  {
    url: '/user/:id',
    method: 'delete',
    response: (config) => {
      const { id } = config.query;
      const index = UserList.findIndex((item) => item.id === id);

      if (index !== -1) {
        const deletedItem = UserList.splice(index, 1)[0];

        return {
          code: 0,
          data: deletedItem,
          message: '删除用户成功',
        };
      } else {
        return {
          code: 1,
          message: '用户不存在',
        };
      }
    },
  },
];