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
				},
				{
					path: 'collection',
					name: 'DashBoardCollection',
					component: () => import('@/pages/dash-board-components/my-collection')
				},
				{
					path: 'document',
					name: 'DashBoardDocument',
					component: () => import('@/pages/dash-board-components/my-document')
				},
				{
					path: 'cooperation',
					name: 'DashBoardCooperation',
					component: () => import('@/pages/dash-board-components/my-cooperation')
				},
				{
					path: 'history',
					name: 'DashBoardVisitHistory',
					component: () => import('@/pages/dash-board-components/visit-history')
				},
				{
					path: 'recycle-bin',
					name: 'DashBoardRecycleBin',
					component: () => import('@/pages/dash-board-components/recycle-bin')
				},
				{
					path: 'group',
					name: 'DashBoardGroup',
					component: () => import('@/pages/dash-board-components/user-group')
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
			component: () => import('@/pages/docs-view/index')
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
