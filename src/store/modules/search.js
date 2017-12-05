import {
  request
} from "../../api/api"
import * as types from '../mutations_type'

const state = {
  searchList: {
    song: {},
    album: {},
    mv: {}
  },
}

const getters = {}

const mutations = {
  [types.GET_SEARCH] (state, data) {
    state.searchList = data.data;
  }
}

const actions = {
  getSearch({ commit }, key) {
    request(commit, types.GET_SEARCH, "search", key);
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
