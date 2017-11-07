import { request } from "../../api/api"
import * as types from '../mutations_type'

const state = {
  honePageState: "recommend",
  homeData: {
    focus: [],
    hotdiss: [],
    shoubomv: [],
    toplist: []
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
  }
}

const actions = {
  getHomeData({ commit }) {
    request(commit, types.GET_HOME_DATA, "first_page_data");
  },
  changeHomePage({ commit }, id) {
    commit(types.HOME_PAGE_STATE, id);
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
