import Vue from 'vue'
import Router from 'vue-router'
const Home = resolve => require(['../components/Home'], resolve)
const Recommend = resolve => require(['../components/home/Recommend'], resolve)
const Rank = resolve => require(['../components/home/Rank'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'recommend',
          name: 'recommend',
          component: Recommend
        },
        {
          path: 'rank',
          name: 'rank',
          component: Rank
        }
      ]
    },

    {
      path: '/',
      redirect: "/home/recommend"
    },
    {
      path: '*',
      redirect: "/home/recommend"
    }
  ]
})
