import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**  各个模块 */


export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import('@/pages/Home')
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('@/pages/Login')
		}
	]
})
