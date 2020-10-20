import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**  各个模块 */


export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			redirect: {name: 'DashBoardWork'},
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
					component: () => import('@/pages/dash-board-components/work'),
					meta: {

					}
				},
				{
					path: 'collection',
					name: 'DashBoardCollection',
					component: () => import('@/pages/dash-board-components/my-collection'),
					meta: {

					}
				},
				{
					path: 'document',
					name: 'DashBoardDocument',
					component: () => import('@/pages/dash-board-components/my-document'),
					meta: {

					}
				},
				{
					path: 'cooperation',
					name: 'DashBoardCooperation',
					component: () => import('@/pages/dash-board-components/my-cooperation'),
					meta: {

					}
				},
				{
					path: 'template',
					name: 'DashBoardTemplate',
					component: () => import('@/pages/dash-board-components/my-template'),
					meta: {

					}
				},
				{
					path: 'history',
					name: 'DashBoardVisitHistory',
					component: () => import('@/pages/dash-board-components/visit-history'),
					meta: {

					}
				},
				{
					path: 'recycle-bin',
					name: 'DashBoardRecycleBin',
					component: () => import('@/pages/dash-board-components/recycle-bin'),
					meta: {

					}
				},
				{
					path: 'group',
					name: 'DashBoardGroup',
					component: () => import('@/pages/dash-board-components/user-group'),
					meta: {

					}
				}
			]
		},
		{
			path: '/edit',
			name: 'Edit',
			component: () => import('@/pages/editor/index'),
			meta: {

			}
		},
		{
			path: '/docs',
			name: 'DocsView',
			component: () => import('@/pages/docs-view/index'),
			meta: {
				noNeedLogin: true,
			}
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('@/pages/Login'),
			meta: {
				noNeedLogin: true,
				noHeader: true
			}
		},
		{
			path: '/*',
			component: () => import('@/pages/404'),
			meta: {
				trust: true,
				noNeedLogin: true
			}
		}
	]
})
