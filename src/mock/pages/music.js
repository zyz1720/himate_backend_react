// 模拟音乐数据
const MusicList = [
  {
    "id": "650000199805014680",
    "sample_rate": 445,
    "bitrate": 657,
    "duration": 46,
    "artists": "层车行动。",
    "create_time": "2000-07-09 11:47:34",
    "update_time": "1979-06-25 21:50:21",
    "music_extra_id": 839,
    "create_by": 469,
    "update_by": 452,
    "delete_time": "2009-09-16 09:31:55",
    "file_id": "统毛被以调能放。",
    "title": "陆娜",
    "artist": "参能每好千她越。",
    "album": "一那难。"
  },
  {
    "id": "120000199712313960",
    "sample_rate": 242,
    "bitrate": 753,
    "duration": 961,
    "artists": "内资科领。",
    "create_time": "2009-05-25 16:12:04",
    "update_time": "2014-04-03 03:28:58",
    "music_extra_id": 73,
    "create_by": 896,
    "update_by": 692,
    "delete_time": "2018-01-16 19:00:41",
    "file_id": "年感气矿级律主。",
    "title": "谢霞",
    "artist": "组般增始。",
    "album": "每如明重压越。"
  },
  {
    "id": "230000201803229188",
    "sample_rate": 358,
    "bitrate": 187,
    "duration": 159,
    "artists": "还能已由命。",
    "create_time": "1991-10-17 03:16:33",
    "update_time": "1976-08-08 16:26:42",
    "music_extra_id": 816,
    "create_by": 315,
    "update_by": 492,
    "delete_time": "2015-10-16 10:03:48",
    "file_id": "出入速切音对。",
    "title": "郭超",
    "artist": "国关资拉斗。",
    "album": "次都想身。"
  },
  {
    "id": "320000202208245219",
    "sample_rate": 362,
    "bitrate": 950,
    "duration": 695,
    "artists": "始传号管。",
    "create_time": "1975-10-19 10:47:55",
    "update_time": "1992-10-04 22:35:13",
    "music_extra_id": 173,
    "create_by": 146,
    "update_by": 633,
    "delete_time": "1986-07-14 21:38:33",
    "file_id": "数科火任直动。",
    "title": "侯静",
    "artist": "置当是重非市。",
    "album": "选众规九石农。"
  },
  {
    "id": "450000200701202773",
    "sample_rate": 670,
    "bitrate": 605,
    "duration": 367,
    "artists": "府处型金效需政。",
    "create_time": "1971-06-25 09:35:04",
    "update_time": "2003-02-22 19:38:50",
    "music_extra_id": 289,
    "create_by": 873,
    "update_by": 422,
    "delete_time": "1995-07-26 11:11:48",
    "file_id": "列现争报打。",
    "title": "薛明",
    "artist": "白据儿低在们电派。",
    "album": "重离各回会点内放。"
  },
  {
    "id": "210000202408043747",
    "sample_rate": 489,
    "bitrate": 669,
    "duration": 756,
    "artists": "要或或价。",
    "create_time": "2019-07-18 15:08:19",
    "update_time": "2010-09-02 05:22:33",
    "music_extra_id": 293,
    "create_by": 589,
    "update_by": 360,
    "delete_time": "1990-03-26 06:38:35",
    "file_id": "置则之能。",
    "title": "余超",
    "artist": "华间队各干。",
    "album": "价容提己却。"
  },
  {
    "id": "810000199104207375",
    "sample_rate": 344,
    "bitrate": 203,
    "duration": 350,
    "artists": "取设九称名道入发。",
    "create_time": "1976-10-13 22:52:42",
    "update_time": "1978-07-26 22:04:26",
    "music_extra_id": 651,
    "create_by": 491,
    "update_by": 551,
    "delete_time": "2013-06-30 00:53:26",
    "file_id": "连计有理。",
    "title": "赵勇",
    "artist": "状风当清深。",
    "album": "身做制圆要发。"
  },
  {
    "id": "810000198201264641",
    "sample_rate": 213,
    "bitrate": 91,
    "duration": 43,
    "artists": "百调为越。",
    "create_time": "1986-03-03 12:20:49",
    "update_time": "2021-06-04 13:06:32",
    "music_extra_id": 671,
    "create_by": 860,
    "update_by": 521,
    "delete_time": "2007-07-31 06:06:34",
    "file_id": "阶提头反毛东。",
    "title": "吕磊",
    "artist": "当往活。",
    "album": "传矿克半使。"
  },
  {
    "id": "120000199104225393",
    "sample_rate": 304,
    "bitrate": 651,
    "duration": 389,
    "artists": "交放报。",
    "create_time": "2023-09-19 09:26:36",
    "update_time": "1980-12-27 12:13:29",
    "music_extra_id": 796,
    "create_by": 691,
    "update_by": 675,
    "delete_time": "1971-12-11 08:11:19",
    "file_id": "导处此件加。",
    "title": "韩霞",
    "artist": "装科江类达立江。",
    "album": "都效国开基包利。"
  },
  {
    "id": "210000198212240344",
    "sample_rate": 132,
    "bitrate": 822,
    "duration": 774,
    "artists": "海发多精越油形。",
    "create_time": "1994-08-22 04:25:32",
    "update_time": "1997-11-07 18:50:54",
    "music_extra_id": 171,
    "create_by": 720,
    "update_by": 206,
    "delete_time": "2004-03-27 16:25:48",
    "file_id": "空问社京更表。",
    "title": "彭强",
    "artist": "青边农适。",
    "album": "交子外委构。"
  },
  {
    "id": "510000199008268572",
    "sample_rate": 833,
    "bitrate": 413,
    "duration": 39,
    "artists": "风断再可。",
    "create_time": "2019-08-26 22:07:05",
    "update_time": "1982-12-31 21:03:16",
    "music_extra_id": 41,
    "create_by": 476,
    "update_by": 513,
    "delete_time": "1998-06-07 14:06:47",
    "file_id": "难约即保。",
    "title": "白艳",
    "artist": "经列备但影系难。",
    "album": "火通或表线明思。"
  },
  {
    "id": "650000200310204189",
    "sample_rate": 998,
    "bitrate": 56,
    "duration": 768,
    "artists": "众叫济商采府。",
    "create_time": "1972-08-07 22:16:24",
    "update_time": "1986-04-23 02:44:15",
    "music_extra_id": 226,
    "create_by": 515,
    "update_by": 955,
    "delete_time": "2000-01-23 08:23:52",
    "file_id": "全式根较号我先。",
    "title": "郝涛",
    "artist": "即复亲持育。",
    "album": "话史便。"
  },
  {
    "id": "220000201212089054",
    "sample_rate": 516,
    "bitrate": 959,
    "duration": 207,
    "artists": "识看子年点。",
    "create_time": "1982-01-29 14:41:33",
    "update_time": "2011-07-18 04:12:05",
    "music_extra_id": 932,
    "create_by": 871,
    "update_by": 188,
    "delete_time": "1986-09-01 20:36:42",
    "file_id": "统育器程那任五代。",
    "title": "潘丽",
    "artist": "包专改打传。",
    "album": "次共前清其九除。"
  },
  {
    "id": "820000200801097893",
    "sample_rate": 73,
    "bitrate": 392,
    "duration": 159,
    "artists": "共规界得。",
    "create_time": "2007-02-12 17:31:32",
    "update_time": "2005-12-10 09:46:34",
    "music_extra_id": 821,
    "create_by": 43,
    "update_by": 326,
    "delete_time": "1971-06-24 12:29:58",
    "file_id": "由命维切。",
    "title": "段洋",
    "artist": "务完更听。",
    "album": "记集定即民。"
  },
  {
    "id": "610000197201263831",
    "sample_rate": 509,
    "bitrate": 325,
    "duration": 473,
    "artists": "又二目维料南局。",
    "create_time": "2006-12-18 23:53:02",
    "update_time": "1987-01-27 10:16:03",
    "music_extra_id": 473,
    "create_by": 217,
    "update_by": 100,
    "delete_time": "2003-11-15 11:13:23",
    "file_id": "如即石器属。",
    "title": "卢艳",
    "artist": "办学府。",
    "album": "己带社好使。"
  },
  {
    "id": "440000201104108861",
    "sample_rate": 534,
    "bitrate": 501,
    "duration": 561,
    "artists": "与设具历持总平。",
    "create_time": "2014-06-19 02:48:56",
    "update_time": "1977-09-27 11:06:55",
    "music_extra_id": 241,
    "create_by": 631,
    "update_by": 112,
    "delete_time": "2017-01-20 19:28:22",
    "file_id": "即总同。",
    "title": "武霞",
    "artist": "率实名。",
    "album": "近这现行各须革准。"
  },
  {
    "id": "120000199103095558",
    "sample_rate": 969,
    "bitrate": 824,
    "duration": 60,
    "artists": "有产族他组等。",
    "create_time": "2008-06-17 10:52:01",
    "update_time": "1971-04-30 17:32:03",
    "music_extra_id": 28,
    "create_by": 109,
    "update_by": 417,
    "delete_time": "2004-06-10 02:53:09",
    "file_id": "住认这众基目基。",
    "title": "赖超",
    "artist": "土京处民样重查状。",
    "album": "较龙约命信响。"
  },
  {
    "id": "810000198612033645",
    "sample_rate": 787,
    "bitrate": 261,
    "duration": 62,
    "artists": "期持易。",
    "create_time": "2019-05-06 13:13:15",
    "update_time": "1991-10-05 00:58:09",
    "music_extra_id": 700,
    "create_by": 113,
    "update_by": 967,
    "delete_time": "1997-11-14 17:15:27",
    "file_id": "好劳东度马。",
    "title": "段秀兰",
    "artist": "太反思。",
    "album": "住名动进接带。"
  }
];

// 生成唯一ID
function generateId() {
  return Date.now().toString();
}

export default [
  // 获取音乐列表
  {
    url: '/music',
    method: 'get',
    response: (config) => {
      // 模拟分页和搜索
      const { current = 1, pageSize = 10, sample_rate, bitrate, duration, artists, file_id, title, artist, album } = config.query;

      let filteredList = MusicList;

      // 根据关键词搜索
      
      if (sample_rate) {
        filteredList = MusicList.filter(
          (item) =>
          {
            if(typeof item.sample_rate === 'string') {
              return item.sample_rate.includes(sample_rate);
            }
            return item.sample_rate == sample_rate;
          }
        );
      }
      
      if (bitrate) {
        filteredList = MusicList.filter(
          (item) =>
          {
            if(typeof item.bitrate === 'string') {
              return item.bitrate.includes(bitrate);
            }
            return item.bitrate == bitrate;
          }
        );
      }
      
      if (duration) {
        filteredList = MusicList.filter(
          (item) =>
          {
            if(typeof item.duration === 'string') {
              return item.duration.includes(duration);
            }
            return item.duration == duration;
          }
        );
      }
      
      if (artists) {
        filteredList = MusicList.filter(
          (item) =>
          {
            if(typeof item.artists === 'string') {
              return item.artists.includes(artists);
            }
            return item.artists == artists;
          }
        );
      }
      
      if (file_id) {
        filteredList = MusicList.filter(
          (item) =>
          {
            if(typeof item.file_id === 'string') {
              return item.file_id.includes(file_id);
            }
            return item.file_id == file_id;
          }
        );
      }
      
      if (title) {
        filteredList = MusicList.filter(
          (item) =>
          {
            if(typeof item.title === 'string') {
              return item.title.includes(title);
            }
            return item.title == title;
          }
        );
      }
      
      if (artist) {
        filteredList = MusicList.filter(
          (item) =>
          {
            if(typeof item.artist === 'string') {
              return item.artist.includes(artist);
            }
            return item.artist == artist;
          }
        );
      }
      
      if (album) {
        filteredList = MusicList.filter(
          (item) =>
          {
            if(typeof item.album === 'string') {
              return item.album.includes(album);
            }
            return item.album == album;
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

  // 获取音乐详情
  {
    url: '/music/:id',
    method: 'get',
    response: (config) => {
      const { id } = config.query;
      const item = MusicList.find((item) => item.id === id);

      if (item) {
        return {
          code: 0,
          data: item,
        };
      } else {
        return {
          code: 1,
          message: '音乐不存在',
        };
      }
    },
  },

  // 新增音乐
  {
    url: '/music',
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

      MusicList.unshift(newItem); // 添加到列表开头

      return {
        code: 0,
        data: newItem,
        message: '新增音乐成功',
      };
    },
  },

  // 更新音乐
  {
    url: '/music/:id',
    method: 'put',
    response: (config) => {
      const { id } = config.query;
      const data = config.body;
      const index = MusicList.findIndex((item) => item.id === id);

      if (index !== -1) {
        MusicList[index] = {
          ...MusicList[index],
          ...data,
           update_time: new Date().toISOString(),
        };

        return {
          code: 0,
          data: MusicList[index],
          message: '更新音乐成功',
        };
      } else {
        return {
          code: 1,
          message: '音乐不存在',
        };
      }
    },
  },

  // 删除音乐
  {
    url: '/music/:id',
    method: 'delete',
    response: (config) => {
      const { id } = config.query;
      const index = MusicList.findIndex((item) => item.id === id);

      if (index !== -1) {
        const deletedItem = MusicList.splice(index, 1)[0];

        return {
          code: 0,
          data: deletedItem,
          message: '删除音乐成功',
        };
      } else {
        return {
          code: 1,
          message: '音乐不存在',
        };
      }
    },
  },
];