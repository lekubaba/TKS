<template>
	<div id='login'>
		<img class='logo' src="http://qiniu.tongkeapp.com/nq_logo_circl.png">
		<img class='mission' src="http://qiniu.tongkeapp.com/tkMission_01.png">
		<div class='login-button' @click='Login'>微信登陆</div>
		<div class='message-login' @click='MessageLogin'>手机验证码登陆</div>
	</div>
</template>

<script>
import qs from 'qs';

export default {
	name: 'Login',
	components: {
		// HelloWorld
	},
	created() {
		this.WecahtAuthLogin();
	},
	methods:{
		Login(){
			let redirect_url = this.$baseURL+'/#/login';
			let APPID = this.$APPID;
			redirect_url = this.$Utils.encodeURL(redirect_url);
			window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+APPID+'&redirect_uri='+redirect_url+'&response_type=code&scope=snsapi_userinfo&state=lekubaba#wechat_redirect';
		},
		WecahtAuthLogin(){
			let that = this;
			let redirect_uri = window.location.href;
			let parsedUrl = qs.parse(redirect_uri.split('?')[1]);
			let code = parsedUrl.code;
			if(!code){
				return;
			}else{
				that.axios.post('/api/code',{code:code})
					.then(function(res){
						if(res.data.code===500){
							return that.$message.info('系统出错了');
						}
						// 测试的时候,得到code过了5分钟，过期
						if(res.data.code===900){
							return window.location.href = that.$baseURL+'/#/login';
						}
						if(res.data.code===200){
							// 将服务端响应的数据存储到Storage,并记录登陆状态；
							window.localStorage.setItem('agentAvatarImg',res.data.agentAvatarImg);
							window.localStorage.setItem('agentNickname',res.data.agentNickname);
							window.localStorage.setItem('isPromotion',res.data.isPromotion);
							window.localStorage.setItem('isAddLevel',res.data.isAddLevel);
							window.localStorage.setItem('isVIP',res.data.isVIP);
							window.localStorage.setItem('color',res.data.color);
							window.localStorage.setItem('agentID',res.data.agentID);
							window.localStorage.setItem('productsId',res.data.productsId);
							window.localStorage.setItem('isLogin',true);
							let fullPath = window.localStorage['fullPath'];
							if(!fullPath){
								return	window.location.href = that.$baseURL;
							}
							window.location.href = that.$baseURL+'/#'+fullPath;
							window.localStorage.removeItem('fullPath');
						}
						
						
					})
			}
		},
		MessageLogin(){
			this.$router.push({name:'MessageLogin'});
		}
	},
}
</script>

<style lang="less" scoped>
	#login{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#login .logo{
		width:160px;
		height: auto;
		margin-top:100px;
		border-radius: 15px;
	}
	.mission{
		margin-top:10px;
		width:35vw;
	}
	.login-title{
		font-size: 20px;
		font-weight: bold;
		margin-top:10px;
		color: #444;
	}
	.login-button{
		margin-top:30vh;
		width:70vw;
		height: 52px;
		background-color: #1476FE;
		border-radius: 10px;
		color: #fff;
		font-weight: bold;
		font-size: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.message-login{
		position: fixed;
		bottom:20px;
		font-size: 12px;
		color:#1476FE;
		text-decoration: underline;
	}
</style>
