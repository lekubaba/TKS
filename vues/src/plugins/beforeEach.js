function beforeEachGlobal(toPath,fromPath,nextStep){
	/* 页面title */
	if (toPath.meta.title) {
		document.title = toPath.meta.title
	}
	// /* 判断该路由是否需要登录权限 */
	if (toPath.matched.some(record => record.meta.requiresAuth)) {
		let isLogin = window.localStorage.getItem('isLogin');
		if (toPath.name !== 'Login' && !isLogin) {
			let fullPath = toPath.fullPath;
			if(fullPath==='/usersetup'){
				window.localStorage.setItem('fullPath','/');
				nextStep({path: '/login'});
				return;
			}
			// 退出登陆时，避免重载页面时,Stroage的，fullPath设置成usersetup;
			window.localStorage.setItem('fullPath',fullPath);
			nextStep({path: '/login'});
		} else {
			nextStep()
		}
	} else {
		nextStep() // 确保一定要调用 nextStep()
	}
}

export default beforeEachGlobal;