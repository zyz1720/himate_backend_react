// 模拟群组数据
const GroupList = [
  {
    "id": "650000197608261739",
    "group_id": "何风劳最。",
    "group_name": "姚超",
    "create_time": "1989-10-05 08:27:57",
    "update_time": "1983-06-05 14:51:44",
    "create_by": 404,
    "update_by": 403,
    "delete_time": "2019-09-05 22:51:27",
    "group_avatar": "研三改感角。",
    "group_introduce": "感目类民参不天除多形难万到安而农们半全史叫入些叫可计气满之位前需圆构安政入科山。"
  },
  {
    "id": "330000200108105385",
    "group_id": "本力劳该维报如。",
    "group_name": "田霞",
    "create_time": "1976-07-10 09:21:35",
    "update_time": "2006-11-23 23:51:05",
    "create_by": 358,
    "update_by": 217,
    "delete_time": "2014-05-29 01:04:02",
    "group_avatar": "话局里风适。",
    "group_introduce": "传干非儿四究几期算文道声江局起因也细走叫场由矿确情求红音运。"
  },
  {
    "id": "610000199209094883",
    "group_id": "车省儿你万器。",
    "group_name": "邹娜",
    "create_time": "1985-03-22 21:10:54",
    "update_time": "1976-08-31 22:53:18",
    "create_by": 856,
    "update_by": 517,
    "delete_time": "1997-06-11 19:40:56",
    "group_avatar": "七多强深产。",
    "group_introduce": "研快步能身前月现月强整公工切细复自力整九还际由把县示火手团反及处组共。"
  },
  {
    "id": "620000202011184484",
    "group_id": "体写老转志。",
    "group_name": "戴洋",
    "create_time": "1985-12-08 05:12:36",
    "update_time": "2007-03-27 18:24:09",
    "create_by": 261,
    "update_by": 217,
    "delete_time": "2016-05-13 16:14:30",
    "group_avatar": "各新响进几选。",
    "group_introduce": "向例区持火族么光己争眼公导整资发些分越有入低习达儿数使克九资公细广农。"
  },
  {
    "id": "650000197405094133",
    "group_id": "标何问农任。",
    "group_name": "史明",
    "create_time": "1998-03-12 16:57:01",
    "update_time": "1993-06-13 07:33:07",
    "create_by": 2,
    "update_by": 120,
    "delete_time": "2003-10-19 11:53:17",
    "group_avatar": "方联西几进。",
    "group_introduce": "般华持技王接得建已五收即外着每铁照后关式装象果道团严国。"
  },
  {
    "id": "140000199109077768",
    "group_id": "有步外究厂资将人。",
    "group_name": "黄刚",
    "create_time": "1999-08-19 02:40:39",
    "update_time": "1998-05-05 16:02:54",
    "create_by": 449,
    "update_by": 6,
    "delete_time": "1987-11-17 17:17:39",
    "group_avatar": "阶界适。",
    "group_introduce": "此制知这四及红把能下形马要交热增备积完机少至交圆至月再以走机石文七体采定。"
  },
  {
    "id": "330000199111154262",
    "group_id": "带每状过各。",
    "group_name": "潘伟",
    "create_time": "2001-01-31 20:22:37",
    "update_time": "1973-09-27 09:59:18",
    "create_by": 551,
    "update_by": 165,
    "delete_time": "2017-10-15 12:47:14",
    "group_avatar": "京效开千适。",
    "group_introduce": "组传产步直先叫保们也满持省段十但近集状整性备一角采却多它断自率车半叫三保公都文干重众理地利门军处法。"
  },
  {
    "id": "230000200601028105",
    "group_id": "联从府段族半程。",
    "group_name": "史艳",
    "create_time": "2014-06-16 19:59:16",
    "update_time": "1988-01-03 07:08:51",
    "create_by": 634,
    "update_by": 53,
    "delete_time": "1980-08-17 06:41:17",
    "group_avatar": "时接方过此个。",
    "group_introduce": "深革证打新音因众从号进斗厂准和质又工极法参识率飞各转向然认严资连低都。"
  },
  {
    "id": "630000202303177368",
    "group_id": "所物历子对划。",
    "group_name": "蒋静",
    "create_time": "2004-09-08 07:28:54",
    "update_time": "2012-01-16 13:36:28",
    "create_by": 814,
    "update_by": 50,
    "delete_time": "1983-05-18 12:21:21",
    "group_avatar": "红现立回应。",
    "group_introduce": "原会务认要此热题话证水后根时员即必称选改到等思自六段法本开铁精着快现。"
  },
  {
    "id": "640000197512233424",
    "group_id": "用说改。",
    "group_name": "周艳",
    "create_time": "2021-02-22 15:21:32",
    "update_time": "2022-07-01 15:26:28",
    "create_by": 506,
    "update_by": 541,
    "delete_time": "2019-04-23 01:14:08",
    "group_avatar": "转包两国。",
    "group_introduce": "气对特七用见劳海速名类平数长务就须七区进须选议命算化件交放空开。"
  },
  {
    "id": "430000197805176217",
    "group_id": "求门公各自四表。",
    "group_name": "范敏",
    "create_time": "1971-05-27 20:33:50",
    "update_time": "1987-09-08 20:21:37",
    "create_by": 270,
    "update_by": 36,
    "delete_time": "1984-02-04 14:09:07",
    "group_avatar": "精外真按打化。",
    "group_introduce": "事此院术处龙花在多入须非收什设除规土组么亲不万通比学也中所已才值原听北题容如为因去参光家马天向装。"
  },
  {
    "id": "310000199007225696",
    "group_id": "学联集列战王强心。",
    "group_name": "徐秀英",
    "create_time": "2025-03-01 20:07:19",
    "update_time": "1999-03-26 07:05:57",
    "create_by": 999,
    "update_by": 941,
    "delete_time": "1989-10-07 10:54:41",
    "group_avatar": "手第存她红它农。",
    "group_introduce": "再该证又华身选会应具办现方按十边发称从学识。"
  },
  {
    "id": "150000198404218161",
    "group_id": "拉运活规个。",
    "group_name": "冯芳",
    "create_time": "1988-10-05 06:13:15",
    "update_time": "2010-01-21 10:50:28",
    "create_by": 774,
    "update_by": 367,
    "delete_time": "1996-12-05 15:55:42",
    "group_avatar": "则每话族半亲代然。",
    "group_introduce": "可际行感条三县花才管北传经济使复院规管志住什中百当克工提调却老儿方五者。"
  },
  {
    "id": "430000199011241776",
    "group_id": "次切现记运于。",
    "group_name": "方磊",
    "create_time": "2018-08-08 11:52:18",
    "update_time": "1982-11-29 09:40:12",
    "create_by": 561,
    "update_by": 466,
    "delete_time": "1993-01-19 04:54:58",
    "group_avatar": "记正日世层它。",
    "group_introduce": "持型党本加定方安次非将适气近公土美布共算清查。"
  },
  {
    "id": "430000200404244578",
    "group_id": "果直了走带。",
    "group_name": "潘敏",
    "create_time": "2014-07-13 20:49:00",
    "update_time": "1980-07-11 14:37:22",
    "create_by": 945,
    "update_by": 528,
    "delete_time": "2001-02-19 09:38:08",
    "group_avatar": "龙华之变只这。",
    "group_introduce": "起那县区件斗已并重党据回农化意或石也积无值议导设相专。"
  },
  {
    "id": "820000200603314009",
    "group_id": "比事器电。",
    "group_name": "侯强",
    "create_time": "2021-12-21 20:24:40",
    "update_time": "2022-05-08 20:00:05",
    "create_by": 624,
    "update_by": 446,
    "delete_time": "2011-01-04 01:13:38",
    "group_avatar": "到查日么离。",
    "group_introduce": "别斯复今农织取子九做切步你再传断工便热准儿更话心。"
  },
  {
    "id": "36000019981125661X",
    "group_id": "手场眼工个列照。",
    "group_name": "乔杰",
    "create_time": "2005-02-27 23:55:35",
    "update_time": "1985-08-10 02:24:04",
    "create_by": 79,
    "update_by": 270,
    "delete_time": "2018-01-07 11:13:27",
    "group_avatar": "今水内。",
    "group_introduce": "办构石今矿高来质济象北会阶便车手边转议声例劳算再作心包角百目五南本。"
  },
  {
    "id": "15000019880408430X",
    "group_id": "权定教活快往。",
    "group_name": "傅勇",
    "create_time": "2011-06-29 13:54:53",
    "update_time": "1973-12-08 08:11:49",
    "create_by": 839,
    "update_by": 468,
    "delete_time": "2009-12-19 23:42:43",
    "group_avatar": "认热科身美。",
    "group_introduce": "办美们人算没支任代山总近工经所前数铁革取或而如复其斗。"
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
      const { current = 1, pageSize = 10, group_id, group_name, group_avatar } = config.query;

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
      
      if (group_avatar) {
        filteredList = GroupList.filter(
          (item) =>
          {
            if(typeof item.group_avatar === 'string') {
              return item.group_avatar.includes(group_avatar);
            }
            return item.group_avatar == group_avatar;
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