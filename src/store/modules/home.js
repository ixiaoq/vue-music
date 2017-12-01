import { request } from "../../api/api"
import * as types from '../mutations_type'

const state = {
  honePageState: "rank",
  homeData: {
    focus: [],
    hotdiss: [],
    shoubomv: [],
    topList: []
  },
  topListData: [],
  rankData: {
    title:'',
		updateTime: 0,
		picAlbum: '',
		color: 0,
		songList: []
  }
}

const getters = {
  // getHomeData: (state) => state.homeData
}

const mutations = {
  [types.HOME_PAGE_STATE](state, id) {
    state.honePageState = id;
  },
  [types.GET_HOME_DATA](state, data) {
    state.homeData.focus = data.data.focus;
    state.homeData.hotdiss = data.data.hotdiss;
    state.homeData.shoubomv = data.data.shoubomv;
    state.homeData.toplist = data.data.toplist;
  },
  [types.GET_TOP_LIST](state, data) {
    state.topListData = data.data.topList;
  },
  [types.GET_RANK_DATA](state, data) {
    state.rankData.title = data.topinfo.ListName
		state.rankData.color = data.color
    state.rankData.updateTime = data.update_time
    state.rankData.picAlbum = data.topinfo.pic_album
    state.rankData.songList = data.songlist
  }
}

const actions = {
  getHomeData ({ commit }) {
    request(commit, types.GET_HOME_DATA, "first_page_data");
  },
  changeHomePage ({ commit }, id) {
    commit(types.HOME_PAGE_STATE, id);
  },
  getTopList ({ commit }) {
    request(commit, types.GET_TOP_LIST, "rank_list");
  },
  getRankSong ({ commit }, id) {
    request(commit, types.GET_RANK_DATA, "rank_songs", id);
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
