import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import qs from 'qs';
import VueElementLoading from 'vue-element-loading';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    parent: '',
    userId:'',
    account:'',
    find:[],
    sessionID:'',
    count: 0, //应用初始化的数据
    vueElementLoading: false,
    imgLoading: false // 用于控制图片加载动画
  },
  mutations: {
    updateCount(state, num) {
      state.count = num
    },
    updateLoading(state, num) {
      state.vueElementLoading = num
    },
    updateImgLoading(state, num) {
      state.imgLoading = num
    },
    setUserId(state,u_id){
      state.userId = u_id
      console.log(u_id)
    },
    setAccount(state,account){
      state.account = account
      console.log(account);
    }

  },
  actions: {
  },
  modules: {
  }
})
