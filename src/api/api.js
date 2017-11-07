import axios from "axios"
import { jsonp } from "./jsonp"

// jsonp 请求
function proxyJsonp(commit, type, url, data) {
	jsonp({
		url: url,
		data: data,
		success: data => {
			commit(type, data);
		}
	})
};

// home
export function request(commit, type, api) {
  let url = API[api].url;
	let data = API[api].params();
	data.jsonpCallback = API[api].jsonp;

  proxyJsonp(commit, type, url, data)
}

// API
const API = {
	first_page_data:{
    url:"https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg",
    params(){
      return{
        format:'jsonp',
        tpl:'v12',
        page:'other',
        rnd:0,
        g_tk:new Date().getTime(),
        loginUin:0,
        hostUin:0,
        inCharset:'utf8',
        outCharset:'GB2312',
        notice:0,
        platform:'yqq',
        needNewCode:0
      }
    },
    jsonp: 'RecomJsonCallback'
  },
  rank_list: {
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
    params: () => {
      return {
        format: 'jsonp',
        g_tk: 5381,
        uin: 0,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: new Date().getTime()
      }
    },
    jsonp: 'TopListJsonCallback'
  },
  rank_songs: {
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
    params: (id) => {
      return {
        g_tk: 5381,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top',
        topid: id,
        _: new Date().getTime()
      }
    },
    jsonp: 'RankSongCallback'
  },
  cd:{
    url:'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
    params:(id)=>{
      return {
        g_tk:5381,
        uin:0,
        format:'jsonp',
        inCharset:'utf-8',
        outCharset:'utf-8',
        notice:0,
        platform:'h5',
        needNewCode:1,
        new_format:1,
        pic:500,
        disstid:id,
        type:1,
        json:1,
        utf8:1,
        onlysong:0,
        nosign:1,
        _:new Date().getTime()
      }
    },
    jsonp: 'CdJsonCallback'
  },
  album: {
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg',
    params: (id) => {
      return {
        albummid: id,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      }
    },
    jsonp: 'AlbumJsonCallback'
  },
  hotkey: {
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
    params: () => {
      return {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      }
    },
    jsonp: 'HotkeyJsonCallback'
  },
  search: {
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',
    params: (key) => {
      return {
        is_xml: 0,
        format: 'jsonp',
        key: key,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      }
    },
    jsonp: 'SearchJsonCallback'
  },
  singer_info: {
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',
    params: (id) => {
      return {
        order: 'listen',
        begin: 0,
        num: 8,
        singermid: id,
        g_tk: 5381,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5page',
        needNewCode: 1,
        from: 'h5',
        _: new Date().getTime()
      }
    },
    jsonp: 'MusicJsonCallback'
  },
  home_page_data: {
    url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    params: () => {
      return {
        g_tk: 5381,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: new Date().getTime()
      }
    },
    jsonp: 'MusicJsonCallback'
  },
  lyric: {
    url: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg',
    params: (id) => {
      return {
        nobase64:1,
        musicid:id,
        songtype:0
      }
    },
    jsonp:'MusicJsonCallback'
  },
}




const proxy = (url, data) => {
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((err) => {
    console.log(err);
  });
}

// 搜索歌
export function searchMusic(msg) {
  let url = "https://api.imjad.cn/cloudmusic/";
  let data = {
    type: "search",
    s: msg
  };
  return proxy(url, data)
}

// 根据歌曲id， 获取歌曲url
export function searchMusicUrl(id) {
  let url = "https://api.imjad.cn/cloudmusic/";
  let data = {
    type: "song",
    id: id
  };
  return proxy(url, data)
}

// 获取歌词
export function searchMusicLyric(id) {
  let url = "https://api.imjad.cn/cloudmusic/";
  let data = {
    type: "lyric",
    id: id
  };
  return proxy(url, data)
}
