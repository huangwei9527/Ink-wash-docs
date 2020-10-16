import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission.js'
import httpServer from '@/service/httpServer' // axios拦截器配置
import * as mUtils from '@/common/js/mUtils'
import config from '@/config'
import filters from './filters/index'
import * as API from '@/api/index'
import {Message, MessageBox, Loading } from 'element-ui'

import '@/common/styles/element-variables.scss'
import '@/common/styles/index.scss' // 自定义 css

/**
 * 引入公共方法mUtils
 */
Vue.prototype.$mUtils = mUtils;
Vue.prototype.$axios = httpServer;
Vue.prototype.$api = API;
Vue.prototype.$API = API;

/**
 * 公共配置信息
 */
Vue.prototype.$config = config

// 注册全局过滤器
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

// 全局注册mixins

Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox
Vue.use(Loading, {background: 'rgba(0, 0, 0, 0.2)'});

String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}

Vue.config.productionTip = false

store.commit('UPDATE_USER_FROM_LOCAL')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
