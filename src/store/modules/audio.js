import {  } from "../../api/api"
import * as types from '../mutations_type'

const state = {
    DOM: {},
    // 播放器播放状态
    isPlay: false,
    // 当前播放索引
    playId: 0,
    // 当前播放时间
    currentTime: {
        currentT: 0,
        totalT: 0
    },
    // 当前音乐播放列表
    playMusicList: [
        {
            songId:'108756031',
            songName:'童话镇',
            singerName:'陈一发儿',
            songUrl:'http://ws.stream.qqmusic.qq.com/108756031.m4a?fromtag=46',
            picUrl:'http://y.gtimg.cn/music/photo_new/T002R300x300M000'+'0044cHmg45iock'+'.jpg?max_age=2592000',
        }
    ],
    // 全局播放器显示状态
    isGlobalAudio: 1,
    // 歌曲列表页面显示状态
    audioListPageState: 0,
    // 播放页面显示状态
    audioPlayPageState: 0,
    // 播放器播放模式
    audioPlayMode: 0,   // 0顺序播放   1随机播放    2单曲循环
    // 初始化禁止播放
    isAudioPlay: 0,   // 0禁止自动播放   1开启自动播放

}

const getters = { }

const mutations = {
    [types.ADD_DOM] (state, data) {
        state.DOM[data.name] = data.dom;
    },
    [types.IS_PLAYING] (state, bool) {
        if (bool) return state.isPlay = bool;
        state.isPlay = !state.isPlay;
    },
    [types.AUDIO_CURRENT_TIME] (state, newTime) {
        state.currentTime = newTime;
    },
    [types.PLAY_SINGLE] (state, data) {
        state.playMusicList = [data];
    },
    [types.PLAY_ALL_SONG] (state, data) {
        state.playMusicList = data;
		state.playId = 0;
    },
    [types.NEXT_SONG] (state, index) {
        var id = state.playId;
        var length = state.playMusicList.length;
        // 0顺序播放   1随机播放    2单曲循环
        
        switch (state.audioPlayMode) {
          case 0:
            id = id >= length ? 0 : ++id;
            break;
          case 1:
            id = Math.round(Math.random() * (length - 0 + 1) + 0);
            break;
          case 2:
            id = id;
            break;
          default: 
            console.log("无效模式");
            break;
        }
        console.log(id);
        state.playId = id;
    },
    [types.AUDIO_SONGS_LIST_STATE] (state) {
        state.audioListPageState = !state.audioListPageState;
    },
    [types.AUDIO_PLAY_MODE] (state, num) {
        state.audioPlayMode = num;
    },
    [types.AUDIO_PLAY_PAGE_STATE] (state) {
        // 播放页面 和 列表页面 切换
        if (!state.audioPlayPageState) {
            state.audioPlayPageState = !state.audioPlayPageState;
            state.isGlobalAudio = 0;
            return;
        }
        state.isGlobalAudio = 1;
        state.audioPlayPageState = !state.audioPlayPageState;
    },
    [types.GLOBAL_AUDIO_STATE] (state) {
        state.audioPlayPageState = !state.audioPlayPageState;
        state.isGlobalAudio = !state.isGlobalAudio;
    },
    // 初始化
    [types.AUDIO_AUTO_PLAY] (state) {
        state.isAudioPlay = 1;
    }
}

const actions = {
    addDom ({ commit }, data) {
        commit(types.ADD_DOM, data);
    },
    changePlayState ({ commit }, state) {
        commit(types.IS_PLAYING, state);
    },
    playSingle ({ commit }, song) {
        commit(types.PLAY_SINGLE, song);
    },
    playAllSong ({ commit }, songs) {
        commit(types.PLAY_ALL_SONG, songs);
    },
    nextSong ({ commit }, index) {
        commit(types.NEXT_SONG, index);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}