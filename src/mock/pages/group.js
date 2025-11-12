// 模拟群组数据
const GroupList = [
  {
    "id": "450000199804048478",
    "group_id": "局化把。",
    "creator_uid": 195,
    "group_name": "黎涛",
    "group_avatar": "如毛深素。",
    "group_introduce": "存此存格此片做张县标角究话北广求民入教算商见时太布对已水技红正我种且们器连该中山。",
    "group_status": "forbidden",
    "create_by": 725,
    "update_by": 98,
    "create_time": "2005-06-16 22:33:15",
    "update_time": "2015-05-03 18:42:33",
    "delete_time": "1996-11-03 12:11:01"
  },
  {
    "id": "810000198509238052",
    "group_id": "水构状进运。",
    "creator_uid": 434,
    "group_name": "蒋静",
    "group_avatar": "农革用员西发油带。",
    "group_introduce": "又社对此代史风约连走型结较或就相经心红机。",
    "group_status": "normal",
    "create_by": 699,
    "update_by": 91,
    "create_time": "1992-03-24 18:06:44",
    "update_time": "1994-06-18 15:18:39",
    "delete_time": "1973-09-09 16:00:52"
  },
  {
    "id": "530000201512164338",
    "group_id": "接果布员。",
    "creator_uid": 909,
    "group_name": "薛静",
    "group_avatar": "相商生色数导资。",
    "group_introduce": "共选员领半天局劳争证斗其观在科达不电物电始员开门文争周。",
    "group_status": "normal",
    "create_by": 361,
    "update_by": 358,
    "create_time": "2013-11-11 14:53:54",
    "update_time": "1980-01-03 02:31:43",
    "delete_time": "1975-11-02 13:34:09"
  },
  {
    "id": "130000200909139211",
    "group_id": "王点片据酸般不。",
    "creator_uid": 487,
    "group_name": "乔明",
    "group_avatar": "况强观过王。",
    "group_introduce": "生员向大保共近记龙回门社运温议转构参持该白交与作太情特共导较向教机时流多影与革上。",
    "group_status": "forbidden",
    "create_by": 429,
    "update_by": 664,
    "create_time": "2005-08-15 02:30:30",
    "update_time": "2005-01-29 03:29:23",
    "delete_time": "1971-02-24 00:40:07"
  },
  {
    "id": "330000198407119648",
    "group_id": "响容治组织。",
    "creator_uid": 110,
    "group_name": "贾杰",
    "group_avatar": "构位风器联。",
    "group_introduce": "低南更利持知包路族别研五么律老色消专片使备报书第指技备和风确农写。",
    "group_status": "normal",
    "create_by": 78,
    "update_by": 706,
    "create_time": "2013-09-08 22:57:55",
    "update_time": "1992-02-21 18:14:44",
    "delete_time": "1983-01-25 14:49:09"
  },
  {
    "id": "530000199110257689",
    "group_id": "东江并如热。",
    "creator_uid": 870,
    "group_name": "杜秀兰",
    "group_avatar": "特大队按工太调。",
    "group_introduce": "都万管已张所三率西于日将性圆思却很报属书自保现个元切资于拉下选照联包亲自复层响文极表值。",
    "group_status": "forbidden",
    "create_by": 168,
    "update_by": 689,
    "create_time": "1982-10-15 11:17:37",
    "update_time": "2020-11-10 07:55:09",
    "delete_time": "1978-05-29 16:19:05"
  },
  {
    "id": "820000197011131984",
    "group_id": "放件也受但。",
    "creator_uid": 822,
    "group_name": "冯敏",
    "group_avatar": "加整高在时。",
    "group_introduce": "接儿片听论派或圆领约体气现及断其候当但情织片且划话问构委研消府究识难外和决铁。",
    "group_status": "normal",
    "create_by": 603,
    "update_by": 323,
    "create_time": "2023-06-10 17:37:57",
    "update_time": "1975-08-17 02:59:48",
    "delete_time": "2013-03-31 09:46:29"
  },
  {
    "id": "370000201106181845",
    "group_id": "酸进九解明长以。",
    "creator_uid": 14,
    "group_name": "任刚",
    "group_avatar": "解专利去。",
    "group_introduce": "证格断众容展观指红参整取前值两走气委长代联道意改值花如象将党面入处布受县会果资叫研。",
    "group_status": "normal",
    "create_by": 666,
    "update_by": 186,
    "create_time": "2000-09-20 15:44:59",
    "update_time": "2001-07-19 04:30:19",
    "delete_time": "1992-05-11 09:43:48"
  },
  {
    "id": "500000199009297859",
    "group_id": "成列起直南当王。",
    "creator_uid": 880,
    "group_name": "陆艳",
    "group_avatar": "众程例动究导。",
    "group_introduce": "角记细线问石件事内机安个就具内住易外化北级处学参它石保进听。",
    "group_status": "forbidden",
    "create_by": 577,
    "update_by": 289,
    "create_time": "1971-03-13 11:32:10",
    "update_time": "1982-05-30 05:57:39",
    "delete_time": "1972-01-05 16:45:35"
  },
  {
    "id": "500000200302065833",
    "group_id": "据来制团。",
    "creator_uid": 212,
    "group_name": "顾芳",
    "group_avatar": "热片但严。",
    "group_introduce": "几打片品转料书权发没须儿领军里单至传风儿单别制须收华火可议现听感般却手九分专院元通内性派别结级消。",
    "group_status": "normal",
    "create_by": 735,
    "update_by": 335,
    "create_time": "1997-02-15 11:43:29",
    "update_time": "1975-01-18 07:34:49",
    "delete_time": "2003-10-31 16:55:50"
  },
  {
    "id": "990000201507173921",
    "group_id": "基成采思非交军。",
    "creator_uid": 314,
    "group_name": "康杰",
    "group_avatar": "明易二员种准。",
    "group_introduce": "流认收也己处收光开干无造前标段花非圆导建众算规事很回参什军些才反。",
    "group_status": "forbidden",
    "create_by": 343,
    "update_by": 143,
    "create_time": "2017-10-23 14:56:01",
    "update_time": "2010-09-13 07:29:31",
    "delete_time": "1997-12-15 22:51:52"
  },
  {
    "id": "810000199109158912",
    "group_id": "打整中次联。",
    "creator_uid": 770,
    "group_name": "邵静",
    "group_avatar": "做律式党事济改回。",
    "group_introduce": "她局的真过日儿给何音路济联身线头成运心期家白理生入结便反圆复越没油往收清无复海。",
    "group_status": "normal",
    "create_by": 448,
    "update_by": 552,
    "create_time": "1986-05-05 20:06:13",
    "update_time": "2002-04-14 02:45:11",
    "delete_time": "1979-07-22 05:23:15"
  },
  {
    "id": "140000200210157610",
    "group_id": "飞民济五压热上因。",
    "creator_uid": 561,
    "group_name": "乔明",
    "group_avatar": "难建程真。",
    "group_introduce": "界身风增养看反采就精不八族立议领时效后主生好八马声教确近度后按周离万速议对好料传对价准。",
    "group_status": "normal",
    "create_by": 557,
    "update_by": 825,
    "create_time": "1981-06-16 17:58:07",
    "update_time": "2023-04-27 06:54:48",
    "delete_time": "1971-01-05 06:07:41"
  },
  {
    "id": "460000199706207457",
    "group_id": "状收九产。",
    "creator_uid": 968,
    "group_name": "文强",
    "group_avatar": "候比织。",
    "group_introduce": "有走上非但取知半较志间身比速阶何效南想相看及办值须新是面元类眼应长却要整好市目无层生别队当原平建石务。",
    "group_status": "forbidden",
    "create_by": 12,
    "update_by": 553,
    "create_time": "2001-07-01 06:20:18",
    "update_time": "1977-03-24 01:59:09",
    "delete_time": "2009-12-02 03:54:34"
  },
  {
    "id": "630000197108036929",
    "group_id": "条研具应准海际。",
    "creator_uid": 302,
    "group_name": "曹霞",
    "group_avatar": "电革知该土适至。",
    "group_introduce": "空经天办结科非十行难识产更广厂数属石规况它本员量进专团统还三。",
    "group_status": "normal",
    "create_by": 198,
    "update_by": 420,
    "create_time": "2022-09-07 04:49:54",
    "update_time": "2006-03-08 09:28:21",
    "delete_time": "1979-12-27 15:55:30"
  },
  {
    "id": "440000201804306615",
    "group_id": "再正真物。",
    "creator_uid": 175,
    "group_name": "雷刚",
    "group_avatar": "办取展指边省民查。",
    "group_introduce": "类素眼亲从号速题办一质同是历平子布矿习还形求需养明一高。",
    "group_status": "forbidden",
    "create_by": 365,
    "update_by": 697,
    "create_time": "1977-11-07 17:52:54",
    "update_time": "1992-09-09 06:14:01",
    "delete_time": "2024-12-22 10:29:33"
  },
  {
    "id": "330000198209166670",
    "group_id": "斗国带。",
    "creator_uid": 24,
    "group_name": "孔涛",
    "group_avatar": "程段民基管少。",
    "group_introduce": "起技老那己约至并思条才着家局文段具基指特者各土。",
    "group_status": "normal",
    "create_by": 735,
    "update_by": 354,
    "create_time": "2003-11-22 11:28:09",
    "update_time": "1994-09-24 04:53:45",
    "delete_time": "1980-02-21 04:32:47"
  },
  {
    "id": "220000199406063426",
    "group_id": "车现温王合易。",
    "creator_uid": 211,
    "group_name": "卢敏",
    "group_avatar": "厂飞知回认地。",
    "group_introduce": "线程被划特党便到响严前提新压声气光划第计受军张而业研改毛题家任受点开对派己平。",
    "group_status": "forbidden",
    "create_by": 117,
    "update_by": 59,
    "create_time": "1992-11-07 09:43:36",
    "update_time": "1986-02-13 18:18:05",
    "delete_time": "1999-10-07 14:24:58"
  }
];

// 生成唯一ID
function generateId() {
  return Date.now().toString();
}

export default [
  // 获取群组列表
  {
    url: '/group',
    method: 'get',
    response: (config) => {
      // 模拟分页和搜索
      const { current = 1, pageSize = 10, group_id, creator_uid, group_name, group_status } = config.query;

      let filteredList = GroupList;

      // 根据关键词搜索
      
      if (group_id) {
        filteredList = GroupList.filter(
          (item) =>
          {
            if(typeof item.group_id === 'string') {
              return item.group_id.includes(group_id);
            }
            return item.group_id == group_id;
          }
        );
      }
      
      if (creator_uid) {
        filteredList = GroupList.filter(
          (item) =>
          {
            if(typeof item.creator_uid === 'string') {
              return item.creator_uid.includes(creator_uid);
            }
            return item.creator_uid == creator_uid;
          }
        );
      }
      
      if (group_name) {
        filteredList = GroupList.filter(
          (item) =>
          {
            if(typeof item.group_name === 'string') {
              return item.group_name.includes(group_name);
            }
            return item.group_name == group_name;
          }
        );
      }
      
      if (group_status) {
        filteredList = GroupList.filter(
          (item) =>
          {
            if(typeof item.group_status === 'string') {
              return item.group_status.includes(group_status);
            }
            return item.group_status == group_status;
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

  // 获取群组详情
  {
    url: '/group/:id',
    method: 'get',
    response: (config) => {
      const { id } = config.query;
      const item = GroupList.find((item) => item.id === id);

      if (item) {
        return {
          code: 0,
          data: item,
        };
      } else {
        return {
          code: 1,
          message: '群组不存在',
        };
      }
    },
  },

  // 新增群组
  {
    url: '/group',
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

      GroupList.unshift(newItem); // 添加到列表开头

      return {
        code: 0,
        data: newItem,
        message: '新增群组成功',
      };
    },
  },

  // 更新群组
  {
    url: '/group/:id',
    method: 'put',
    response: (config) => {
      const { id } = config.query;
      const data = config.body;
      const index = GroupList.findIndex((item) => item.id === id);

      if (index !== -1) {
        GroupList[index] = {
          ...GroupList[index],
          ...data,
           update_time: new Date().toISOString(),
        };

        return {
          code: 0,
          data: GroupList[index],
          message: '更新群组成功',
        };
      } else {
        return {
          code: 1,
          message: '群组不存在',
        };
      }
    },
  },

  // 删除群组
  {
    url: '/group/:id',
    method: 'delete',
    response: (config) => {
      const { id } = config.query;
      const index = GroupList.findIndex((item) => item.id === id);

      if (index !== -1) {
        const deletedItem = GroupList.splice(index, 1)[0];

        return {
          code: 0,
          data: deletedItem,
          message: '删除群组成功',
        };
      } else {
        return {
          code: 1,
          message: '群组不存在',
        };
      }
    },
  },
];