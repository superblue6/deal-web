import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/Index";
import AddGoods from "../view/Goods/AddGoods";
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/addGoods',
      name: AddGoods,
      component: AddGoods
    }
  ]
})
