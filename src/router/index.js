import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import MusicList from '@/components/MusicList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'MusicList',
      component: MusicList
    }
  ]
})
