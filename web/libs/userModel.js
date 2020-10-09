/**
 * 账号相关操作模块
 * */
import store from '@/store'
import router from '@/router'
import config from '@/config'
import {
	login,
	register,
	getUserInfo
} from '@/api'
import {getLocalStorage} from '@/common/js/mUtils'

let userModel = {
	/**
	 * 检测是否登录
	 * @returns {Promise<void>}
	 */
	checkLoginState() {
		let userData = { };
		// 如果工程配置loginType是local的话则刷新页面从本地取登陆信息，保持登陆状态
		if (process.env.NODE_ENV === 'development' || config.loginType === 'local') {
			userData = getLocalStorage('user') || {};
		} else {
			userData = store.state.user;
		}
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
	 * 用token登录
	 * @param data 用户access_token
	 * @returns {Promise<void>}
	 * @private
	 */
	doLoginByToken(data) {

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
				console.log(store.state.user.userInfo)
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
		logout().then(() => {
			userModel.goLogin()
		})
	},
	/**
	 * 跳转登录
	 * @returns {Promise<void>}
	 */
	async goLogin() {
		router.push({name: 'Login'})
	},
	/**
	 *
	 * @private
	 */
	_loginFailed(extraMessage) {

	}
}

export default userModel
