import { searchMusic, searchMusicUrl, searchMusicLyric } from "../../api/api"

const state = {
    searchMusicList: [],
    currentMusicUrl: "void",
    currentMusiclyric: []
}

const getters = {
    searchMusicList: (state) => state.searchMusicList,
    currentMusicUrl: (state) => state.searchMusicUrl,
    currentMusiclyric: (state) => state.searchMusiclyric,
}

const mutations = {
    musicList (state, data) {
        state.searchMusicList = data.result.songs;
    },

    musicUrl (state, data) {
        state.currentMusicUrl = data.data[0].url;
    },

    musicLyric (state, data) {
        state.currentMusiclyric = data.lrc.lyric.split('\n');
    }
}

const actions = {
    searchMusic ({ commit }, msg) {
        searchMusic(msg)
        .then(data => {
            if (data.code) {
                commit("musicList", data);
            }
        })
    },

    currentMusicUrl ({ commit }, id) {
        searchMusicUrl(id)
        .then(data => {
            if (data.code) {
                commit("musicUrl", data);
            }
        })
    },

    currentMusicLyric ({ commit }, id) {
        searchMusicLyric(id)
        .then(data => {
            if (data.code) {
                commit("musicLyric", data);
            }
        })
    }

    // play ({commit}, id) {
    //     Promise
    //     .all([searchMusicUrl(id), searchMusicLyric(id)])
    //     .then(result => {
    //         commit("musicUrl", result[0]);
    //         commit("musicLyric", result[1]);
    //     })
    // }
}

export default {
    state,
    getters,
    mutations,
    actions
}