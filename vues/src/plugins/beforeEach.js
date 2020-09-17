function beforeEachGlobal(toPath,fromPath,nextStep){

	/* 页面title */
	if (toPath.meta.title) {
		document.title = toPath.meta.title
	}
	// /* 判断该路由是否需要登录权限 */
	if (toPath.matched.some(record => record.meta.requiresAuth)) {
		if (toPath.name !== 'Login' && false) {
			nextStep({
				path: '/login'
			})
		} else {
			nextStep()
		}
	} else {
		nextStep() // 确保一定要调用 nextStep()
	}

}

export default beforeEachGlobal;