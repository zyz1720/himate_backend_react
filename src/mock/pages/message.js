// 模拟消息数据
const MessageList = [
  {
    "id": "140000201009018285",
    "client_msg_id": "作元状音次光七。",
    "session_id": "具具导。",
    "sender_id": 786,
    "sender_ip": "场引只。",
    "content": "向志议元展从值南先制影二员连统增越说影任划面气导世具区积么局极运王成之史心支月里包究圆亲每通动。",
    "msg_type": "image",
    "msg_status": "read",
    "create_time": "2009-01-30 00:05:18",
    "update_time": "2010-11-03 13:20:34",
    "create_by": 466,
    "update_by": 593,
    "delete_time": "2010-01-10 07:31:43",
    "msg_secret": "关导日。"
  },
  {
    "id": "450000198504177409",
    "client_msg_id": "引三江前已。",
    "session_id": "根子支千。",
    "sender_id": 320,
    "sender_ip": "争六路给。",
    "content": "外口说米次元法华火农并得界支例共常圆院放业政山好争将老专所准名适马合。",
    "msg_type": "image",
    "msg_status": "unread",
    "create_time": "2006-05-13 09:37:58",
    "update_time": "1999-07-15 09:17:05",
    "create_by": 800,
    "update_by": 331,
    "delete_time": "2016-01-01 02:59:05",
    "msg_secret": "斯家北年许圆府。"
  },
  {
    "id": "310000198511261747",
    "client_msg_id": "来法展第格京任步。",
    "session_id": "支相西油解管。",
    "sender_id": 849,
    "sender_ip": "马干花例又查部深。",
    "content": "响全际八住广图系立算影持各将五府之结府打反学备。",
    "msg_type": "video",
    "msg_status": "unread",
    "create_time": "2007-08-25 09:27:47",
    "update_time": "2000-10-04 02:15:46",
    "create_by": 868,
    "update_by": 105,
    "delete_time": "2011-01-15 22:26:13",
    "msg_secret": "究示老且热别。"
  },
  {
    "id": "230000200102245391",
    "client_msg_id": "月员社战任持也。",
    "session_id": "什式带据。",
    "sender_id": 743,
    "sender_ip": "青机较究。",
    "content": "设文平一江布县花将然民行强革油真家后数名响说受现声构高领规工带象中。",
    "msg_type": "video",
    "msg_status": "read",
    "create_time": "1982-07-26 15:50:39",
    "update_time": "1971-01-13 16:47:47",
    "create_by": 244,
    "update_by": 98,
    "delete_time": "1975-08-11 07:59:12",
    "msg_secret": "于等感量过强的。"
  },
  {
    "id": "31000019901002932X",
    "client_msg_id": "九存何提称次育。",
    "session_id": "收天论确。",
    "sender_id": 976,
    "sender_ip": "专准叫素委金。",
    "content": "且带目至好消角八己以节江员程金件于持特解任它确而江断转热件必没外门共温说期个点。",
    "msg_type": "video",
    "msg_status": "unread",
    "create_time": "2021-11-03 03:55:28",
    "update_time": "1973-09-20 14:40:25",
    "create_by": 57,
    "update_by": 889,
    "delete_time": "1979-10-03 08:45:04",
    "msg_secret": "往部百越作装山。"
  },
  {
    "id": "820000201106032451",
    "client_msg_id": "重持象受常。",
    "session_id": "已团口法基称着。",
    "sender_id": 372,
    "sender_ip": "许高且先后新即常。",
    "content": "律条声王术电没深深目能小收白身达论九下子回起该京原先然北山式入价。",
    "msg_type": "video",
    "msg_status": "unread",
    "create_time": "1994-05-29 19:06:08",
    "update_time": "1987-01-04 10:54:10",
    "create_by": 174,
    "update_by": 394,
    "delete_time": "2005-06-15 07:47:27",
    "msg_secret": "王重及龙传关线。"
  },
  {
    "id": "630000200408053653",
    "client_msg_id": "生物取前形。",
    "session_id": "处元长究指广它团。",
    "sender_id": 724,
    "sender_ip": "地直带面空信。",
    "content": "重例说非层商定进划理步即做问劳东东价起研并六起变非素线周快们须论严度车象对面青权识增机处国。",
    "msg_type": "video",
    "msg_status": "unread",
    "create_time": "1989-01-11 22:26:07",
    "update_time": "1972-05-09 11:24:33",
    "create_by": 494,
    "update_by": 747,
    "delete_time": "2012-12-04 05:06:14",
    "msg_secret": "府命个机非音事。"
  },
  {
    "id": "320000202207050372",
    "client_msg_id": "节深世命。",
    "session_id": "山八或车。",
    "sender_id": 641,
    "sender_ip": "此省按委照。",
    "content": "候其品数对马她空最无铁年那素值接响思或则该劳号。",
    "msg_type": "image",
    "msg_status": "read",
    "create_time": "1991-01-25 12:47:10",
    "update_time": "1986-07-31 14:39:15",
    "create_by": 540,
    "update_by": 264,
    "delete_time": "2002-02-25 20:59:59",
    "msg_secret": "基技即红美强加步。"
  },
  {
    "id": "450000199702167126",
    "client_msg_id": "工验科市历。",
    "session_id": "进党过列交万口。",
    "sender_id": 650,
    "sender_ip": "计家军运样。",
    "content": "也接才必其决七百办七争主定她会眼决该多车提无越名要出认听已给部号所好除参市选七入农儿政保里始。",
    "msg_type": "text",
    "msg_status": "read",
    "create_time": "2010-04-16 01:17:14",
    "update_time": "2018-12-01 02:16:54",
    "create_by": 552,
    "update_by": 107,
    "delete_time": "2025-10-01 06:47:55",
    "msg_secret": "地音用列气精。"
  },
  {
    "id": "640000201407235769",
    "client_msg_id": "第支身证叫。",
    "session_id": "识风备求习。",
    "sender_id": 743,
    "sender_ip": "传布音间。",
    "content": "计气报制三教被再对成比任向维对海因么而了状力极交细制议际名放位比列响时青极平包程政干听越之西况。",
    "msg_type": "video",
    "msg_status": "unread",
    "create_time": "1987-10-14 03:34:30",
    "update_time": "2025-11-08 02:31:41",
    "create_by": 611,
    "update_by": 929,
    "delete_time": "2007-04-30 04:48:06",
    "msg_secret": "必没为很感家今。"
  },
  {
    "id": "810000200505085116",
    "client_msg_id": "平量什者研再。",
    "session_id": "事消技受。",
    "sender_id": 326,
    "sender_ip": "品细厂界报变加阶。",
    "content": "正改再放目图及元系外打线包金切才分今族火速系回定合治本天应去提查义她认当度几持领社论不除才候。",
    "msg_type": "other",
    "msg_status": "read",
    "create_time": "1987-02-12 10:22:06",
    "update_time": "2017-09-30 01:13:57",
    "create_by": 533,
    "update_by": 65,
    "delete_time": "2005-10-29 17:35:15",
    "msg_secret": "在及计义易时局。"
  },
  {
    "id": "14000020031120552X",
    "client_msg_id": "改日强生身比。",
    "session_id": "习上铁上。",
    "sender_id": 565,
    "sender_ip": "风周果进。",
    "content": "高道二将五次音王名准特报张与月被准志见养完步联也深动本员度结劳和需反快总标按南。",
    "msg_type": "image",
    "msg_status": "read",
    "create_time": "1986-01-15 02:20:58",
    "update_time": "2019-01-16 19:44:05",
    "create_by": 491,
    "update_by": 405,
    "delete_time": "2009-06-15 08:14:07",
    "msg_secret": "入现完。"
  },
  {
    "id": "540000199609181742",
    "client_msg_id": "小布史。",
    "session_id": "身体满华土。",
    "sender_id": 878,
    "sender_ip": "道有都区亲无。",
    "content": "常斯头意量系军对知气年长加千们许区维当究现证身开。",
    "msg_type": "text",
    "msg_status": "unread",
    "create_time": "2013-04-12 19:56:34",
    "update_time": "2003-02-23 23:52:13",
    "create_by": 368,
    "update_by": 99,
    "delete_time": "1990-06-26 10:20:04",
    "msg_secret": "下究指统存。"
  },
  {
    "id": "220000197804119174",
    "client_msg_id": "各研路白。",
    "session_id": "放子经层是。",
    "sender_id": 733,
    "sender_ip": "加容地头安。",
    "content": "习量明明各地铁除除种院太上分反外却最容流示例县入道律将响压次反引两手农见加三江儿院出通联商。",
    "msg_type": "text",
    "msg_status": "unread",
    "create_time": "1996-11-19 19:41:20",
    "update_time": "1999-12-05 14:37:24",
    "create_by": 554,
    "update_by": 982,
    "delete_time": "1978-09-10 05:08:17",
    "msg_secret": "接二们车相需个相。"
  },
  {
    "id": "620000199409216541",
    "client_msg_id": "市众老四白机电精。",
    "session_id": "使公场热管。",
    "sender_id": 715,
    "sender_ip": "象快面。",
    "content": "商通要反至清严把代精效叫理许公提七最争海则可片听劳别连带公火日看西建用家可快性无。",
    "msg_type": "image",
    "msg_status": "unread",
    "create_time": "1971-08-05 14:57:15",
    "update_time": "1978-12-04 11:40:56",
    "create_by": 780,
    "update_by": 343,
    "delete_time": "1983-02-16 15:50:42",
    "msg_secret": "系花生想素格低。"
  },
  {
    "id": "420000197911065017",
    "client_msg_id": "效间院除金科北。",
    "session_id": "示导众积话大共大。",
    "sender_id": 195,
    "sender_ip": "他派小儿由证王。",
    "content": "别很信参状领求东及置运长别先交八路速取听装太据委电低话构术酸领象花石道。",
    "msg_type": "audio",
    "msg_status": "read",
    "create_time": "1982-06-24 09:27:33",
    "update_time": "1970-06-06 22:00:32",
    "create_by": 112,
    "update_by": 74,
    "delete_time": "2023-06-16 06:26:17",
    "msg_secret": "研百办走间。"
  },
  {
    "id": "340000201308132456",
    "client_msg_id": "完自就。",
    "session_id": "严三七持率质别须。",
    "sender_id": 313,
    "sender_ip": "管该给体家可。",
    "content": "广在年价空过深位装当具龙表治而米前圆约易部条究劳外林积子更提至认自角持术存那条基有离省连团性制。",
    "msg_type": "audio",
    "msg_status": "read",
    "create_time": "1971-01-08 17:47:53",
    "update_time": "2019-06-27 03:05:34",
    "create_by": 62,
    "update_by": 785,
    "delete_time": "1994-03-27 00:39:41",
    "msg_secret": "能调声五治济利门。"
  },
  {
    "id": "440000202012295844",
    "client_msg_id": "铁专看其。",
    "session_id": "照今热将。",
    "sender_id": 99,
    "sender_ip": "本加低他信金必。",
    "content": "她易效层自劳工个老路部业相与面个道第在带同人活展半一太色劳却干关格位写认已她府。",
    "msg_type": "audio",
    "msg_status": "unread",
    "create_time": "1986-01-22 13:38:29",
    "update_time": "2010-12-18 23:03:06",
    "create_by": 490,
    "update_by": 149,
    "delete_time": "1977-07-09 14:17:05",
    "msg_secret": "科和压快。"
  }
];

// 生成唯一ID
function generateId() {
  return Date.now().toString();
}

export default [
  // 获取消息列表
  {
    url: '/message',
    method: 'get',
    response: (config) => {
      // 模拟分页和搜索
      const { current = 1, pageSize = 10, client_msg_id, session_id, sender_id, sender_ip, msg_type, msg_status } = config.query;

      let filteredList = MessageList;

      // 根据关键词搜索
      
      if (client_msg_id) {
        filteredList = MessageList.filter(
          (item) =>
          {
            if(typeof item.client_msg_id === 'string') {
              return item.client_msg_id.includes(client_msg_id);
            }
            return item.client_msg_id == client_msg_id;
          }
        );
      }
      
      if (session_id) {
        filteredList = MessageList.filter(
          (item) =>
          {
            if(typeof item.session_id === 'string') {
              return item.session_id.includes(session_id);
            }
            return item.session_id == session_id;
          }
        );
      }
      
      if (sender_id) {
        filteredList = MessageList.filter(
          (item) =>
          {
            if(typeof item.sender_id === 'string') {
              return item.sender_id.includes(sender_id);
            }
            return item.sender_id == sender_id;
          }
        );
      }
      
      if (sender_ip) {
        filteredList = MessageList.filter(
          (item) =>
          {
            if(typeof item.sender_ip === 'string') {
              return item.sender_ip.includes(sender_ip);
            }
            return item.sender_ip == sender_ip;
          }
        );
      }
      
      if (msg_type) {
        filteredList = MessageList.filter(
          (item) =>
          {
            if(typeof item.msg_type === 'string') {
              return item.msg_type.includes(msg_type);
            }
            return item.msg_type == msg_type;
          }
        );
      }
      
      if (msg_status) {
        filteredList = MessageList.filter(
          (item) =>
          {
            if(typeof item.msg_status === 'string') {
              return item.msg_status.includes(msg_status);
            }
            return item.msg_status == msg_status;
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

  // 获取消息详情
  {
    url: '/message/:id',
    method: 'get',
    response: (config) => {
      const { id } = config.query;
      const item = MessageList.find((item) => item.id === id);

      if (item) {
        return {
          code: 0,
          data: item,
        };
      } else {
        return {
          code: 1,
          message: '消息不存在',
        };
      }
    },
  },

  // 新增消息
  {
    url: '/message',
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

      MessageList.unshift(newItem); // 添加到列表开头

      return {
        code: 0,
        data: newItem,
        message: '新增消息成功',
      };
    },
  },

  // 更新消息
  {
    url: '/message/:id',
    method: 'put',
    response: (config) => {
      const { id } = config.query;
      const data = config.body;
      const index = MessageList.findIndex((item) => item.id === id);

      if (index !== -1) {
        MessageList[index] = {
          ...MessageList[index],
          ...data,
           update_time: new Date().toISOString(),
        };

        return {
          code: 0,
          data: MessageList[index],
          message: '更新消息成功',
        };
      } else {
        return {
          code: 1,
          message: '消息不存在',
        };
      }
    },
  },

  // 删除消息
  {
    url: '/message/:id',
    method: 'delete',
    response: (config) => {
      const { id } = config.query;
      const index = MessageList.findIndex((item) => item.id === id);

      if (index !== -1) {
        const deletedItem = MessageList.splice(index, 1)[0];

        return {
          code: 0,
          data: deletedItem,
          message: '删除消息成功',
        };
      } else {
        return {
          code: 1,
          message: '消息不存在',
        };
      }
    },
  },
];