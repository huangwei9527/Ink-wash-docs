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
			path: '/dashboard',
			name: 'DashBoard',
			component: () => import('@/pages/dash-board'),
			redirect: {name: 'DashBoardWork'},
			children: [
				{
					path: 'work',
					name: 'DashBoardWork',
					component: () => import('@/pages/dash-board-components/work')
				}
			]
		},
		{
			path: '/edit',
			name: 'Edit',
			component: () => import('@/pages/editor/index')
		},
		{
			path: '/docs',
			name: 'DocsView',
			component: () => import('@/pages/docs-view/docs')
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('@/pages/Login'),
			meta: {
				noNeedLogin: true,
				noHeader: true
			}
		}
	]
})
