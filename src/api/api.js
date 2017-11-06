
import axios from "axios"
import * as proxyJsonp from "./jsonp"

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


// https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&jsonpCallback=_jsonpbgruq7k8xqt
// 头
// https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg?format=jsonp&tpl=v12&page=other&rnd=0&g_tk=1509627514911&loginUin=0&hostUin=0&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq&needNewCode=0&jsonpCallback=_jsonpelj5v08vtwq
// 排行榜
// https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?format=jsonp&g_tk=5381&uin=0&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1509627514913&jsonpCallback=_jsonp14v3zs0gjjihttps://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?format=jsonp&g_tk=5381&uin=0&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1509627514913&jsonpCallback=_jsonp14v3zs0gjji

// jsonp 请求

// 排行榜
export function getMusicRank() {
    let url = "https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg";
    let data = {
        format: 'jsonp',
        g_tk: 5381,
        uin: 0,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: new Date().getTime()
    };
    return proxyJsonp(url, data)
}

// export default {
//     rank_songs: {
//       url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
//       params: (id) => {
//         return {
//           g_tk: 5381,
//           uin: 0,
//           format: 'json',
//           inCharset: 'utf-8',
//           outCharset: 'utf-8',
//           notice: 0,
//           platform: 'h5',
//           needNewCode: 1,
//           tpl: 3,
//           page: 'detail',
//           type: 'top',
//           topid: id,
//           _: new Date().getTime()
//         }
//       },
//       jsonp: 'jsonpCallback'
//     },
//     rank_list: {
//       url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
//       params: () => {
//         return {
//           format: 'jsonp',
//           g_tk: 5381,
//           uin: 0,
//           inCharset: 'utf-8',
//           outCharset: 'utf-8',
//           notice: 0,
//           platform: 'h5',
//           needNewCode: 1,
//           _: new Date().getTime()
//         }
//       },
//       jsonp: 'jsonpCallback'
//     },
//     album: {
//       url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg',
//       params: (id) => {
//         return {
//           albummid: id,
//           g_tk: 5381,
//           loginUin: 0,
//           hostUin: 0,
//           format: 'jsonp',
//           inCharset: 'utf8',
//           outCharset: 'utf-8',
//           notice: 0,
//           platform: 'yqq',
//           needNewCode: 0
//         }
//       },
//       jsonp: 'jsonpCallback'
//     },
//     singer_info: {
//       url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',
//       params: (id) => {
//         return {
//           order: 'listen',
//           begin: 0,
//           num: 8,
//           singermid: id,
//           g_tk: 5381,
//           uin: 0,
//           format: 'jsonp',
//           inCharset: 'utf-8',
//           outCharset: 'utf-8',
//           notice: 0,
//           platform: 'h5page',
//           needNewCode: 1,
//           from: 'h5',
//           _: new Date().getTime()
//         }
//       },
//       jsonp: 'jsonpCallback'
//     },
//     search: {
//       url: 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',
//       params: (key) => {
//         return {
//           is_xml: 0,
//           format: 'jsonp',
//           key: key,
//           g_tk: 5381,
//           loginUin: 0,
//           hostUin: 0,
//           inCharset: 'utf8',
//           outCharset: 'utf-8',
//           notice: 0,
//           platform: 'yqq',
//           needNewCode: 0
//         }
//       },
//       jsonp: 'jsonpCallback'
//     },
//     hotkey: {
//       url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
//       params: () => {
//         return {
//           g_tk: 5381,
//           loginUin: 0,
//           hostUin: 0,
//           format: 'jsonp',
//           inCharset: 'utf8',
//           outCharset: 'utf-8',
//           notice: 0,
//           platform: 'yqq',
//           needNewCode: 0
//         }
//       },
//       jsonp: 'jsonpCallback'
//     },
//     home_page_data: {
//       url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
//       params: () => {
//         return {
//           g_tk: 5381,
//           uin: 0,
//           format: 'jsonp',
//           inCharset: 'utf-8',
//           outCharset: 'utf-8',
//           notice: 0,
//           platform: 'h5',
//           needNewCode: 1,
//           _: new Date().getTime()
//         }
//       },
//       jsonp: 'jsonpCallback'
//     },
//     lyric: {
//       url: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg',
//       params: (id) => {
//         return {
//           nobase64:1,
//           musicid:id,
//           songtype:0
//         }
//       },
//       jsonp:'callback'
//     },
//     cd:{
//       url:'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
//       params:(id)=>{
//         return {
//           g_tk:5381,
//           uin:0,
//           format:'jsonp',
//           inCharset:'utf-8',
//           outCharset:'utf-8',
//           notice:0,
//           platform:'h5',
//           needNewCode:1,
//           new_format:1,
//           pic:500,
//           disstid:id,
//           type:1,
//           json:1,
//           utf8:1,
//           onlysong:0,
//           nosign:1,
//           _:new Date().getTime()
//         }
//       },
//       jsonp: 'jsonpCallback'
//     },
//     first_page_data:{
//       url:"https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg",
//       params(){
//         return{
//           format:'jsonp',
//           tpl:'v12',
//           page:'other',
//           rnd:0,
//           g_tk:new Date().getTime(),
//           loginUin:0,
//           hostUin:0,
//           inCharset:'utf8',
//           outCharset:'GB2312',
//           notice:0,
//           platform:'yqq',
//           needNewCode:0
//         }
//       },
//       jsonp: 'jsonpCallback'
//     }
//   }
  

