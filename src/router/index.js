import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SearchList from '@/components/SearchList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search',
      name: 'SearchList',
      component: SearchList
    }
  ]
})
