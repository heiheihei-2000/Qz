import Vue from 'vue'
import VueRouter from 'vue-router'
import wenjian from "@/views/wenjian";

import ue from "@/components/ue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(VueRouter)
Vue.use(Antd);
const routes = [
  {
  path:'/'
  },
  {
    path: '/allFile',
    component:wenjian,
  },
  {
    path: '/ue',
    component: ue
  }


]

const router = new VueRouter({
  routes,
  mode: 'history',//history去掉#，hash是有#的

})

export default router