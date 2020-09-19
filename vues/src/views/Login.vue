<template>
	<div id='login'>
		<img class='logo' src="http://qiniu.tongkeapp.com/tkImgLogo.png">
		<div class='login-title'>统客</div>
		<img class='mission' src="http://qiniu.tongkeapp.com/tkMission_01.png">
		<div class='login-button'>微信登陆</div>
	</div>
</template>

<script>

export default {
	name: 'Login',
	components: {
		// HelloWorld
	},
	created() {
		
	}
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
		width:40vw;
	}
	.login-title{
		font-size: 20px;
		font-weight: bold;
		margin-top:10px;
		color: #444;
	}
	.login-button{
		margin-top:40vh;
		width:80vw;
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
</style>
