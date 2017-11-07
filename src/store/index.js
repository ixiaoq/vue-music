import Vue from "vue"
import Vuex from "vuex"
import search from "./modules/search"
import home from "./modules/home"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        search,
        home
    }
})