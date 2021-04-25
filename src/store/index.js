import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import qs from 'qs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    parent: '',
    userId:'',
    account:'',
    find:[],
    sessionID:''
  },
  mutations: {
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
