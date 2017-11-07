import Vue from 'vue'
import Router from 'vue-router'
const Home = resolve => require(['../components/Home.vue'], resolve)
const Recommend = resolve => require(['../components/home/Recommend.vue'], resolve)
const Rank = resolve => require(['../components/home/Rank.vue'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home/:id',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'recommend',
          component: Recommend
        },
        {
          path: 'rank',
          component: Rank
        }
      ]
    },

    {
      path: '/',
      redirect: "/home/recommend"
    }
  ]
})
