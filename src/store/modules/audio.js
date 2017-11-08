import {  } from "../../api/api"
import * as types from '../mutations_type'

const state = {
    // 播放器状态
    isPlay: false,
    // 
    playId: 0,
    //
    currentTime: 0,
    // 当前音乐播放列表
    currentPlayMusicList: [
        {
            songId:'108756031',
            songName:'童话镇',
            singerName:'陈一发儿',
            songUrl:'http://ws.stream.qqmusic.qq.com/108756031.m4a?fromtag=46',
            picUrl:'http://y.gtimg.cn/music/photo_new/T002R300x300M000'+'0044cHmg45iock'+'.jpg?max_age=2592000',
        }
    ]
}

const getters = {
    
}

const mutations = {
    [types.IS_PLAYING] (state) {
        state.isPlay = !state.isPlay;
    },
    [types.AUDIO_CURRENT_TIME] (state, newTime) {
        state.currentTime = newTime;
        var time = (newTime / 1000).toFixed(0);
        console.log(time);
    }
}

const actions = {
    changePlay ({ commit }) {
        commit(types.IS_PLAYING);
    },
    getCurrentTime ({ commit }, newTime) {
        commit(types.AUDIO_CURRENT_TIME, newTime);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}