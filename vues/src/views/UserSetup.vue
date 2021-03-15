<template>
	<div class='user-set'>
		<div class='set-info set-line'><span class='set-span-a'>ID：<span style='color:#1476FE;'>{{this.$store.state.userInfo.agentID}}</span></span><span class='set-span-b'></span></div>
		<div class='set-info set-line' @click='toAboutUs'><span class='set-span-a'>关于拿钱</span><span class='set-span-b'>〉</span></div>
		<div class='set-info' @click='toStatementComplaint'><span class='set-span-a'>申明投诉</span><span class='set-span-b'>〉</span></div>
		<div class='login-out' @click='LoginOut'>退出登陆</div>
	</div>
</template>

<script>
	export default {
		name: 'UserSetup',
		components: {
			// HelloWorld
		},
		data(){
			return {
				isVip:true,
			}
		},
		methods:{
			toAboutUs(){
				this.$router.push({name:'AboutUs'});
			},
			toStatementComplaint(){
				this.$router.push({name:'StatementComplaint'});
			},
			LoginOut(){
				window.localStorage.clear();
				this.$router.push({name:'Login'});

			}
		},
	
	}
</script>

<style scoped lang="less">
	.user-set{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top:10px;
		background: url('http://qiniu.tongkeapp.com/bg_5.png') no-repeat;
		background-size:100%;

	}
	.set-top{
		margin-top:20px;
	}
	.set-info{
		padding:0 20px 0 20px;
		width:100%;
		height: 55px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		// background-color: #fff;
		
	}
	.set-line{
		border-bottom: .5px solid #ccc;
	}
	.set-span-a{
		font-size: 14px;
		font-weight: 900;
		color: #444;
	}
	.set-span-b{
		font-size: 15px;
		font-weight: 900;
		color: #555;
	}
	.login-out{
		margin-top:40px;
		width:80vw;
		height: 50px;
		// background-image: linear-gradient(135deg,#ff7639 0%,#f5336e 100%);
		background-color: #1476fe;
		text-align: center;
		line-height: 50px;
		font-size: 20px;
		// font-weight: 900;
		color: #fff;
		border-radius: 10px;
	}
</style>