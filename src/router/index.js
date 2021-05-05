import Vue from 'vue'
import VueRouter from 'vue-router'
import wenjian from "@/views/wenjian";
import ue from "@/components/ue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import shouye from "@/components/shouye";
import uemain from "@/components/uemain";
import wike from "@/components/wike";
import kaodian from "@/components/kaodian";
import kaodian2 from "@/components/kaodian2";
import fenlei from "@/components/fenlei";
import ToDoList from "@/components/ToDoList";
import Home from "@/components/Home"
import shequ from "@/components/shequ"
import loading from "@/components/loading"
Vue.use(VueRouter)
Vue.use(Antd);
const routes = [
  {
  path:'/',
  redirect:'/loading'
  },
  {
    path: '/allFile',
    component:wenjian,
  },
  {
    path: '/ue',
    component: ue
  },
  {
    path:'/shouye',
    component:shouye

  },
  {
    path:'/uemain',
    component:uemain

  },
  {
    path: '/wiki',
    component: wike
  },
  {
    path: '/kaodian',
    component: kaodian
  },
  {
    path: '/kaodian2',
    component: kaodian2
  },
  {
    path: '/fenlei',
    component:fenlei
  },
  {
    path: '/todolist',
    component: ToDoList
  },

  {
    path:'/Home',
    component:Home
  },
  {
    path: '/shequ',
    component:shequ
  },
  {
    path: '/loading',
    component: loading
  }



]

const router = new VueRouter({
  routes,
  mode: 'history',//history去掉#，hash是有#的
  // base:'D:\\Code\\Qz\\dist'
}
)

export default router
