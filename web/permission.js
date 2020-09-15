/**
 *  路由权限相关管理
 * */
import router from '@/router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式

router.beforeEach((to, from, next) => {
	NProgress.start()
	//TODO 黄维 根据加载的资源，更新路由meta属性中的title属性，所有的页面title使用route.meta.title
	next()
})

router.afterEach(() => {
	NProgress.done() // 结束Progress
})

