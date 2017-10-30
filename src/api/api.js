import axios from "axios"

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
    var url = "https://api.imjad.cn/cloudmusic/";
    var data = {
        type: "search",
        s: msg
    };
    return proxy(url, data)
}

// 根据歌曲id， 获取歌曲url
export function searchMusicUrl(id) {
    var url = "https://api.imjad.cn/cloudmusic/";
    var data = {
        type: "song",
        id: id
    };
    return proxy(url, data)
}

// 获取歌词
export function searchMusicLyric(id) {
    var url = "https://api.imjad.cn/cloudmusic/";
    var data = {
        type: "lyric",
        id: id
    };
    return proxy(url, data)
}

