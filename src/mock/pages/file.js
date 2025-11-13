// 模拟文件数据
const FileList = [
  {
    "id": "150000200409037781",
    "file_type": "document",
    "use_type": "music",
    "file_hash": "毛清划济全。",
    "create_time": "1977-09-28 12:23:29",
    "create_by": 223,
    "update_by": 16,
    "update_time": "1979-11-07 17:20:01",
    "delete_time": "1977-08-29 01:10:48",
    "file_key": "是平加据老美。",
    "file_size": 807
  },
  {
    "id": "450000201212312511",
    "file_type": "image",
    "use_type": "group",
    "file_hash": "着经金。",
    "create_time": "1998-12-04 04:23:20",
    "create_by": 308,
    "update_by": 917,
    "update_time": "1981-01-10 02:04:02",
    "delete_time": "1991-08-10 11:05:37",
    "file_key": "准前数极热约。",
    "file_size": 908
  },
  {
    "id": "990000201811103100",
    "file_type": "audio",
    "use_type": "system",
    "file_hash": "团复商原机引。",
    "create_time": "2021-04-08 11:22:07",
    "create_by": 358,
    "update_by": 913,
    "update_time": "1989-02-25 07:40:47",
    "delete_time": "2018-12-19 03:30:34",
    "file_key": "况算如约美例维气。",
    "file_size": 233
  },
  {
    "id": "210000201512065693",
    "file_type": "document",
    "use_type": "upload",
    "file_hash": "教南实难步。",
    "create_time": "1984-03-01 05:21:10",
    "create_by": 149,
    "update_by": 109,
    "update_time": "1981-02-21 10:58:00",
    "delete_time": "2011-11-03 21:45:22",
    "file_key": "处复将。",
    "file_size": 532
  },
  {
    "id": "530000201407148686",
    "file_type": "audio",
    "use_type": "chat",
    "file_hash": "度度非色。",
    "create_time": "1975-07-06 21:37:27",
    "create_by": 234,
    "update_by": 970,
    "update_time": "2006-02-01 10:58:21",
    "delete_time": "1981-04-24 09:46:08",
    "file_key": "增被则流百。",
    "file_size": 431
  },
  {
    "id": "340000198012291082",
    "file_type": "document",
    "use_type": "system",
    "file_hash": "光始公重复越。",
    "create_time": "1985-03-25 01:47:28",
    "create_by": 444,
    "update_by": 190,
    "update_time": "2000-05-31 00:59:38",
    "delete_time": "2000-02-06 22:40:30",
    "file_key": "山取记识再目。",
    "file_size": 615
  },
  {
    "id": "820000200501091641",
    "file_type": "other",
    "use_type": "upload",
    "file_hash": "代约要张美因大时。",
    "create_time": "1984-06-28 05:30:46",
    "create_by": 283,
    "update_by": 404,
    "update_time": "1974-08-07 22:28:49",
    "delete_time": "1981-10-18 23:43:07",
    "file_key": "最物给造色人志规。",
    "file_size": 653
  },
  {
    "id": "520000201911235920",
    "file_type": "audio",
    "use_type": "group",
    "file_hash": "热青众更。",
    "create_time": "1971-04-10 22:25:31",
    "create_by": 87,
    "update_by": 910,
    "update_time": "2022-12-12 05:48:30",
    "delete_time": "2014-03-05 10:04:19",
    "file_key": "转我少部。",
    "file_size": 269
  },
  {
    "id": "220000199509214178",
    "file_type": "image",
    "use_type": "system",
    "file_hash": "织成铁引八专。",
    "create_time": "1993-09-14 18:34:53",
    "create_by": 215,
    "update_by": 487,
    "update_time": "2012-08-11 04:07:44",
    "delete_time": "2008-08-10 12:28:41",
    "file_key": "自时题。",
    "file_size": 520
  },
  {
    "id": "460000199005124413",
    "file_type": "image",
    "use_type": "upload",
    "file_hash": "才自农题代全。",
    "create_time": "1991-12-30 21:46:56",
    "create_by": 112,
    "update_by": 557,
    "update_time": "2005-05-26 02:19:00",
    "delete_time": "1990-02-06 11:05:48",
    "file_key": "信正厂如速切世。",
    "file_size": 985
  },
  {
    "id": "650000198910305629",
    "file_type": "audio",
    "use_type": "unknown",
    "file_hash": "派面效权。",
    "create_time": "1973-11-06 16:36:03",
    "create_by": 130,
    "update_by": 512,
    "update_time": "2006-12-04 19:59:22",
    "delete_time": "2004-02-19 10:24:30",
    "file_key": "属天战命。",
    "file_size": 391
  },
  {
    "id": "640000200108023067",
    "file_type": "video",
    "use_type": "upload",
    "file_hash": "与员列各。",
    "create_time": "2000-11-07 22:42:54",
    "create_by": 886,
    "update_by": 54,
    "update_time": "2009-12-11 14:05:48",
    "delete_time": "2018-03-08 17:11:21",
    "file_key": "称象生八。",
    "file_size": 254
  },
  {
    "id": "360000199006237037",
    "file_type": "other",
    "use_type": "music",
    "file_hash": "和化定布劳。",
    "create_time": "2007-06-23 08:34:35",
    "create_by": 355,
    "update_by": 973,
    "update_time": "2005-10-28 06:41:54",
    "delete_time": "1991-08-10 22:16:27",
    "file_key": "在象式。",
    "file_size": 455
  },
  {
    "id": "130000199909291330",
    "file_type": "other",
    "use_type": "unknown",
    "file_hash": "日强及次。",
    "create_time": "1999-08-03 00:51:04",
    "create_by": 898,
    "update_by": 317,
    "update_time": "2011-10-04 17:23:51",
    "delete_time": "2021-02-02 09:01:59",
    "file_key": "性层部般参意。",
    "file_size": 182
  },
  {
    "id": "320000202211232160",
    "file_type": "video",
    "use_type": "music",
    "file_hash": "件准会专。",
    "create_time": "1995-02-13 00:50:09",
    "create_by": 183,
    "update_by": 984,
    "update_time": "1974-02-16 08:20:54",
    "delete_time": "1993-04-04 11:34:05",
    "file_key": "则样风个红般你确。",
    "file_size": 909
  },
  {
    "id": "22000020111216378X",
    "file_type": "other",
    "use_type": "upload",
    "file_hash": "情极高调处。",
    "create_time": "2015-12-07 11:44:33",
    "create_by": 313,
    "update_by": 842,
    "update_time": "2021-03-08 04:46:51",
    "delete_time": "2005-01-13 06:28:07",
    "file_key": "得起较。",
    "file_size": 311
  },
  {
    "id": "130000201501166835",
    "file_type": "video",
    "use_type": "group",
    "file_hash": "他流济阶。",
    "create_time": "2016-09-23 21:55:27",
    "create_by": 111,
    "update_by": 226,
    "update_time": "1985-12-14 14:23:49",
    "delete_time": "1971-03-25 07:30:58",
    "file_key": "查千争用半。",
    "file_size": 998
  },
  {
    "id": "12000019830413503X",
    "file_type": "audio",
    "use_type": "chat",
    "file_hash": "认处世积划劳会装。",
    "create_time": "1977-03-19 20:38:52",
    "create_by": 297,
    "update_by": 897,
    "update_time": "1984-02-15 01:58:29",
    "delete_time": "1972-04-18 10:22:41",
    "file_key": "不门许记难。",
    "file_size": 178
  }
];

// 生成唯一ID
function generateId() {
  return Date.now().toString();
}

export default [
  // 获取文件列表
  {
    url: '/file',
    method: 'get',
    response: (config) => {
      // 模拟分页和搜索
      const { current = 1, pageSize = 10, file_type, use_type, file_key } = config.query;

      let filteredList = FileList;

      // 根据关键词搜索
      
      if (file_type) {
        filteredList = FileList.filter(
          (item) =>
          {
            if(typeof item.file_type === 'string') {
              return item.file_type.includes(file_type);
            }
            return item.file_type == file_type;
          }
        );
      }
      
      if (use_type) {
        filteredList = FileList.filter(
          (item) =>
          {
            if(typeof item.use_type === 'string') {
              return item.use_type.includes(use_type);
            }
            return item.use_type == use_type;
          }
        );
      }
      
      if (file_key) {
        filteredList = FileList.filter(
          (item) =>
          {
            if(typeof item.file_key === 'string') {
              return item.file_key.includes(file_key);
            }
            return item.file_key == file_key;
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

  // 获取文件详情
  {
    url: '/file/:id',
    method: 'get',
    response: (config) => {
      const { id } = config.query;
      const item = FileList.find((item) => item.id === id);

      if (item) {
        return {
          code: 0,
          data: item,
        };
      } else {
        return {
          code: 1,
          message: '文件不存在',
        };
      }
    },
  },

  // 新增文件
  {
    url: '/file',
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

      FileList.unshift(newItem); // 添加到列表开头

      return {
        code: 0,
        data: newItem,
        message: '新增文件成功',
      };
    },
  },

  // 更新文件
  {
    url: '/file/:id',
    method: 'put',
    response: (config) => {
      const { id } = config.query;
      const data = config.body;
      const index = FileList.findIndex((item) => item.id === id);

      if (index !== -1) {
        FileList[index] = {
          ...FileList[index],
          ...data,
           update_time: new Date().toISOString(),
        };

        return {
          code: 0,
          data: FileList[index],
          message: '更新文件成功',
        };
      } else {
        return {
          code: 1,
          message: '文件不存在',
        };
      }
    },
  },

  // 删除文件
  {
    url: '/file/:id',
    method: 'delete',
    response: (config) => {
      const { id } = config.query;
      const index = FileList.findIndex((item) => item.id === id);

      if (index !== -1) {
        const deletedItem = FileList.splice(index, 1)[0];

        return {
          code: 0,
          data: deletedItem,
          message: '删除文件成功',
        };
      } else {
        return {
          code: 1,
          message: '文件不存在',
        };
      }
    },
  },
];