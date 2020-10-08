/**
 * 账号相关操作模块
 * */
import store from '@/store'
import router from '@/router'
import config from '@/config'
import { getUserInfo } from '@/api'

let userModel = {
	/**
	 * 检测是否登录
	 * @returns {Promise<void>}
	 */
	checkLoginState(){
		
	},
	/**
	 * 登录
	 * @param options
	 * @param type 
	 * @returns {Promise<void>}
	 */
	async doLogin() {
		// todo 登录
	},
	/**
	 * 注册
	 * @param options
	 * @param type 
	 * @returns {Promise<void>}
	 */
	async doRegister() {
		// todo 注册
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
			router.push({name: 'Login'})
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
	_loginFailed(extraMessage){
		
	}
}

export default userModel
