/**
 *  路由权限相关管理
 * */
import router from '@/router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import userModel from '@/libs/userModel'

router.beforeEach((to, from, next) => {
	NProgress.start()
	//TODO 黄维 根据加载的资源，更新路由meta属性中的title属性，所有的页面title使用route.meta.title
	next()
})

async function loginStatusInterceptors(to) {
	// 判断是否登录，如果没有登录先行登录
	const isLogined = userModel.checkLoginState();
	let loginStatus = true;
	if (!isLogined && !to.meta.noNeedLogin) {
		try {
			await userModel.doLogin(to.query)
		}catch (e) {
			loginStatus = false;
		}
	}
	return loginStatus
}

router.afterEach(() => {
	NProgress.done() // 结束Progress
})

