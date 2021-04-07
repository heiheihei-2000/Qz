import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Button from 'ant-design-vue/lib/button';
import 'ant-design-vue/dist/antd.css';
import Treetable from 'vue-table-with-tree-grid'
import './utils/flexible'
Vue.config.productionTip = false
Vue.component('tree-table',Treetable)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
