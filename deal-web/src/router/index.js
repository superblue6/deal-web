import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/Index";
import AddGoods from "../view/Goods/AddGoods";
import GoodsDetail from "../view/Goods/GoodsDetail";
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
      name: 'AddGoods',
      component: AddGoods
    },
    {
      path: '/goodsDetail',
      name: 'GoodsDetail',
      component: GoodsDetail
    }
  ]
})
