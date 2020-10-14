/**
 * 账号相关操作模块
 * */
import store from '@/store'
import router from '@/router'
import {
	login,
	register,
	getUserInfo
} from '@/api'

let userModel = {
	/**
	 * 检测是否登录
	 * @returns {Promise<void>}
	 */
	async checkLoginState() {
		let userData = store.state.user;
		return !!userData.access_token
	},
	/**
	 * 登录
	 * @param options
	 * @param type
	 * @returns {Promise<void>}
	 */
	async doLogin(data) {
		return new Promise((resolve, reject) => {
			login(data).then(res => {
				store.commit('UPDATE_ACCESS_TOKEN', res.body.access_token)
				store.commit('UPDATE_USER_INFO', res.body.userInfo)
				resolve(res.body)
			})
				.catch(err => {
					reject(err)
				})
		})
	},
	/**
	 * 注册
	 * @param options
	 * @param type
	 * @returns {Promise<void>}
	 */
	async doRegister(data) {
		return new Promise((resolve, reject) => {
			register(data).then(res => {
				store.commit('UPDATE_ACCESS_TOKEN', res.body.access_token)
				store.commit('UPDATE_USER_INFO', res.body.userInfo)
				resolve(res.body)
			})
				.catch(err => {
					reject(err)
				})
		})
	},
	/**
	 * 获取用户信息
	 * @returns {Promise<void>}
	 * @private
	 */
	getUserInfo() {
		return new Promise((resolve, reject) => {
			getUserInfo().then(res => {
				store.commit('UPDATE_USER_INFO', res.body);
				resolve(res.body)
			}).catch(err => {
				reject(err)
			})
		})
	},
	/**
	 * 退出
	 * @returns {Promise<void>}
	 */
	async doLogout() {
		// 清除store user token
		store.commit('UPDATE_ACCESS_TOKEN', '');
		userModel.goLogin()
	},
	/**
	 * 跳转登录
	 * @returns {Promise<void>}
	 */
	async goLogin() {
		router.push({name: 'Login'})
	}
}

export default userModel
