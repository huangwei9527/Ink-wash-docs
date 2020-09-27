import Vue from 'vue'
import Vuex from 'vuex'

// 各个模块
import user from './modules/user'

/**
 * 全局状态管理
 */
const state = {
	token: '',
	userInfo: {}
};
const actions = {};
const mutations = {};
const getters = {};

Vue.use(Vuex);
export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules: {
		// 用户相关
		user
	}
});
