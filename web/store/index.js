import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from 'element-ui'
// 各个模块
import user from './modules/user'

/**
 * 全局状态管理
 */
const state = {
	sortType: 'default', // [default, createTime, updateTime, name]
	docShowType: 'thumbnail',
	isFolderTop: true
};
const actions = {
	/**
	 * 显示提示 msg.type 类型  msg.data 消息内容
	 * @param commit
	 * @param msg
	 */
	showMassage(store, msg) {
		if(typeof msg === 'string'){
			msg = {type: 'info', message: msg}
		}
		Message({
			type: msg.type || 'info',
			message: msg.message || msg.msg || msg.data
		})
	}
};
const mutations = {
	UPDATE_SORT_TYPE(state, type){
		state.sortType = type
		window.localStorage.setItem('SORT_TYPE', state.sortType)
	},
	UPDATE_DOC_SHOW_TYPE(state, type){
		state.docShowType = type
		window.localStorage.setItem('DOC_SHOW_TYPE', type)
	},
	UPDATE_IS_FOLDER_TOP(state, b){
		state.isFolderTop = !!b
		window.localStorage.setItem('UPDATE_IS_FOLDER_TOP', state.isFolderTop)
	}
};
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
