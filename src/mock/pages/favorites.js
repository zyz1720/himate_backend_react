// 模拟音乐收藏夹数据
const FavoritesList = [
  {
    "id": "320000197001056740",
    "favorites_remarks": "过点节包团力从行老造级我住机红向使极院干加点然。",
    "create_time": "2012-11-18 13:45:01",
    "update_time": "2005-06-24 12:05:04",
    "create_by": 517,
    "update_by": 550,
    "delete_time": "2000-12-21 05:57:25",
    "favorites_name": "许丽",
    "favorites_cover": "北万着况。",
    "is_public": 704,
    "is_default": 677
  },
  {
    "id": "440000200808085712",
    "favorites_remarks": "新本层相易有然验价统以几制此从年集又然风或精车院红变将。",
    "create_time": "1981-08-17 15:11:14",
    "update_time": "2003-05-13 03:44:52",
    "create_by": 878,
    "update_by": 223,
    "delete_time": "2001-02-09 10:07:05",
    "favorites_name": "唐平",
    "favorites_cover": "认织件设系什叫。",
    "is_public": 181,
    "is_default": 1
  },
  {
    "id": "540000199912097519",
    "favorites_remarks": "该见期动持精毛规达程程状相历低万社号格意马个志。",
    "create_time": "2015-12-16 08:20:52",
    "update_time": "1998-02-02 08:16:39",
    "create_by": 724,
    "update_by": 970,
    "delete_time": "1983-06-20 14:27:46",
    "favorites_name": "崔洋",
    "favorites_cover": "物写不三展记。",
    "is_public": 626,
    "is_default": 623
  },
  {
    "id": "410000198607021717",
    "favorites_remarks": "许时识济方能听今家非具火更三易小说回都自属二分。",
    "create_time": "2018-02-27 11:22:50",
    "update_time": "1995-06-13 01:52:51",
    "create_by": 865,
    "update_by": 139,
    "delete_time": "2005-04-19 05:58:54",
    "favorites_name": "苏静",
    "favorites_cover": "现这质长身已省。",
    "is_public": 547,
    "is_default": 252
  },
  {
    "id": "420000198310082705",
    "favorites_remarks": "把起后外名接基角族种地明压话各广什事传把路照种志值动划入称组员平音很看都指响引而社之件名本矿江海。",
    "create_time": "2014-02-06 01:54:55",
    "update_time": "2010-02-18 23:07:13",
    "create_by": 663,
    "update_by": 860,
    "delete_time": "1975-01-12 03:10:45",
    "favorites_name": "马伟",
    "favorites_cover": "王斯图率。",
    "is_public": 700,
    "is_default": 847
  },
  {
    "id": "220000198604093146",
    "favorites_remarks": "务数里好活不易约华下料政四得走风达将它料质者外铁容广书构类解向示持所标资应。",
    "create_time": "1996-06-26 09:25:56",
    "update_time": "2004-07-11 23:44:01",
    "create_by": 577,
    "update_by": 236,
    "delete_time": "1999-03-05 22:12:27",
    "favorites_name": "许平",
    "favorites_cover": "别教走品。",
    "is_public": 313,
    "is_default": 731
  },
  {
    "id": "31000020040408399X",
    "favorites_remarks": "界容区片角样治革作需教空农动层万治果少太。",
    "create_time": "2000-04-27 07:01:21",
    "update_time": "1982-08-03 22:04:08",
    "create_by": 738,
    "update_by": 874,
    "delete_time": "1992-12-17 12:00:00",
    "favorites_name": "乔秀英",
    "favorites_cover": "直商而西。",
    "is_public": 646,
    "is_default": 469
  },
  {
    "id": "51000019951217863X",
    "favorites_remarks": "太完主只治员相等见水导包则解志里种决何局门思调养国写日议深积流今维。",
    "create_time": "1996-08-03 08:59:02",
    "update_time": "1991-09-06 14:54:50",
    "create_by": 631,
    "update_by": 497,
    "delete_time": "2006-05-18 14:25:04",
    "favorites_name": "康娟",
    "favorites_cover": "家太般于。",
    "is_public": 752,
    "is_default": 311
  },
  {
    "id": "330000198009090835",
    "favorites_remarks": "上自之新者拉在信里很术见但热拉目治部名局须装术较话非入年织始极家中北元么常为基该成叫。",
    "create_time": "1977-07-20 22:24:43",
    "update_time": "1973-05-21 18:57:59",
    "create_by": 600,
    "update_by": 829,
    "delete_time": "1993-10-18 16:58:29",
    "favorites_name": "杜秀英",
    "favorites_cover": "万传亲边增几。",
    "is_public": 894,
    "is_default": 202
  },
  {
    "id": "450000198909119768",
    "favorites_remarks": "前情最力研资新市自比装立论政文何术叫教也。",
    "create_time": "1973-04-09 03:43:26",
    "update_time": "1994-03-31 07:56:27",
    "create_by": 432,
    "update_by": 261,
    "delete_time": "2025-05-19 17:35:34",
    "favorites_name": "孙桂英",
    "favorites_cover": "她认斗治话保很。",
    "is_public": 156,
    "is_default": 177
  },
  {
    "id": "610000199404231978",
    "favorites_remarks": "多况交各但按路新目增战装改受持上展始金想不广关观道听合且而中出山化速府派设际并机同周上分复山气圆。",
    "create_time": "1995-12-24 06:40:36",
    "update_time": "1999-10-15 23:43:17",
    "create_by": 406,
    "update_by": 573,
    "delete_time": "2003-06-24 20:17:46",
    "favorites_name": "戴敏",
    "favorites_cover": "变通真便个万。",
    "is_public": 572,
    "is_default": 783
  },
  {
    "id": "210000200007086253",
    "favorites_remarks": "活要流山石果消理成事人合代局参少管许北先市易。",
    "create_time": "1979-05-17 23:10:00",
    "update_time": "2014-08-16 05:48:43",
    "create_by": 356,
    "update_by": 910,
    "delete_time": "2006-11-16 06:56:01",
    "favorites_name": "邱强",
    "favorites_cover": "温识号期放比。",
    "is_public": 798,
    "is_default": 240
  },
  {
    "id": "220000199605266840",
    "favorites_remarks": "支调称志酸打术级知经圆造还具计指干日金变历利治效的元阶议精派政会证据所需业连光。",
    "create_time": "1987-12-15 07:59:08",
    "update_time": "2001-06-11 23:57:10",
    "create_by": 226,
    "update_by": 440,
    "delete_time": "2022-02-28 01:56:21",
    "favorites_name": "姚平",
    "favorites_cover": "效本重口边外。",
    "is_public": 741,
    "is_default": 859
  },
  {
    "id": "320000200912112779",
    "favorites_remarks": "温史向六机战前建效集间党间收老安基际又己把红手划多西情级内消难间许发开分几应已权入记力共一王。",
    "create_time": "2016-11-26 06:47:35",
    "update_time": "1975-02-01 14:38:04",
    "create_by": 490,
    "update_by": 802,
    "delete_time": "2016-07-08 21:46:39",
    "favorites_name": "潘明",
    "favorites_cover": "研可工引千片。",
    "is_public": 814,
    "is_default": 543
  },
  {
    "id": "610000198405045769",
    "favorites_remarks": "要离支验或确在力区日反美运难便习广步花为其使派复标能而整青求存儿按六化东义南之。",
    "create_time": "1996-11-11 10:19:15",
    "update_time": "2011-07-25 04:22:10",
    "create_by": 177,
    "update_by": 27,
    "delete_time": "1986-04-23 03:16:57",
    "favorites_name": "胡强",
    "favorites_cover": "极料格新养。",
    "is_public": 355,
    "is_default": 771
  },
  {
    "id": "460000197302115215",
    "favorites_remarks": "七加为置方加长斗权处书该与政料回军受工连门率事权半海还自部数回层一情了证性中列对体速子。",
    "create_time": "2006-07-17 07:20:15",
    "update_time": "1973-10-16 22:00:50",
    "create_by": 306,
    "update_by": 398,
    "delete_time": "2011-10-15 12:43:19",
    "favorites_name": "卢桂英",
    "favorites_cover": "保很传许斗。",
    "is_public": 277,
    "is_default": 134
  },
  {
    "id": "440000201006029115",
    "favorites_remarks": "安厂知小路精同位北知方低间阶志况龙严把装就变压。",
    "create_time": "1987-05-09 02:26:53",
    "update_time": "2007-09-02 08:23:16",
    "create_by": 363,
    "update_by": 385,
    "delete_time": "1994-03-12 00:48:08",
    "favorites_name": "侯超",
    "favorites_cover": "日极代。",
    "is_public": 274,
    "is_default": 733
  },
  {
    "id": "230000197207069545",
    "favorites_remarks": "名求你写活确二质际派开进常个影持感族处战离育动候点。",
    "create_time": "1998-10-03 18:04:18",
    "update_time": "1979-07-28 10:38:23",
    "create_by": 125,
    "update_by": 221,
    "delete_time": "1994-02-01 19:00:17",
    "favorites_name": "卢秀兰",
    "favorites_cover": "议引经整想公。",
    "is_public": 334,
    "is_default": 402
  }
];

// 生成唯一ID
function generateId() {
  return Date.now().toString();
}

export default [
  // 获取音乐收藏夹列表
  {
    url: '/favorites',
    method: 'get',
    response: (config) => {
      // 模拟分页和搜索
      const { current = 1, pageSize = 10, create_by, favorites_name, is_public, is_default } = config.query;

      let filteredList = FavoritesList;

      // 根据关键词搜索
      
      if (create_by) {
        filteredList = FavoritesList.filter(
          (item) =>
          {
            if(typeof item.create_by === 'string') {
              return item.create_by.includes(create_by);
            }
            return item.create_by == create_by;
          }
        );
      }
      
      if (favorites_name) {
        filteredList = FavoritesList.filter(
          (item) =>
          {
            if(typeof item.favorites_name === 'string') {
              return item.favorites_name.includes(favorites_name);
            }
            return item.favorites_name == favorites_name;
          }
        );
      }
      
      if (is_public) {
        filteredList = FavoritesList.filter(
          (item) =>
          {
            if(typeof item.is_public === 'string') {
              return item.is_public.includes(is_public);
            }
            return item.is_public == is_public;
          }
        );
      }
      
      if (is_default) {
        filteredList = FavoritesList.filter(
          (item) =>
          {
            if(typeof item.is_default === 'string') {
              return item.is_default.includes(is_default);
            }
            return item.is_default == is_default;
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

  // 获取音乐收藏夹详情
  {
    url: '/favorites/:id',
    method: 'get',
    response: (config) => {
      const { id } = config.query;
      const item = FavoritesList.find((item) => item.id === id);

      if (item) {
        return {
          code: 0,
          data: item,
        };
      } else {
        return {
          code: 1,
          message: '音乐收藏夹不存在',
        };
      }
    },
  },

  // 新增音乐收藏夹
  {
    url: '/favorites',
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

      FavoritesList.unshift(newItem); // 添加到列表开头

      return {
        code: 0,
        data: newItem,
        message: '新增音乐收藏夹成功',
      };
    },
  },

  // 更新音乐收藏夹
  {
    url: '/favorites/:id',
    method: 'put',
    response: (config) => {
      const { id } = config.query;
      const data = config.body;
      const index = FavoritesList.findIndex((item) => item.id === id);

      if (index !== -1) {
        FavoritesList[index] = {
          ...FavoritesList[index],
          ...data,
           update_time: new Date().toISOString(),
        };

        return {
          code: 0,
          data: FavoritesList[index],
          message: '更新音乐收藏夹成功',
        };
      } else {
        return {
          code: 1,
          message: '音乐收藏夹不存在',
        };
      }
    },
  },

  // 删除音乐收藏夹
  {
    url: '/favorites/:id',
    method: 'delete',
    response: (config) => {
      const { id } = config.query;
      const index = FavoritesList.findIndex((item) => item.id === id);

      if (index !== -1) {
        const deletedItem = FavoritesList.splice(index, 1)[0];

        return {
          code: 0,
          data: deletedItem,
          message: '删除音乐收藏夹成功',
        };
      } else {
        return {
          code: 1,
          message: '音乐收藏夹不存在',
        };
      }
    },
  },
];