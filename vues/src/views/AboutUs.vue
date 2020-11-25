<template>
	<div id='about-us'>
		<img src="http://qiniu.tongkeapp.com/nq_logo_nobackground.png">
		<div class='copyright'>湖南乘法表科技有限公司 版权所有</div>
	</div>
</template>

<script>

export default {
	name: 'AboutUs',
	components: {
		// HelloWorld
	},
	created() {
		
	}
}
</script>

<style lang="less" scoped>
	#about-us{
		width:100vw;
		min-height: 100vh;
		background-color: #1476FE;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#about-us img{
		width:30vw;
		height: auto;
		margin-top:25vh;
	}
	.login-title{
		font-size: 20px;
		font-weight: bold;
		margin-top:10px;
		color: #fff;
	}
	.copyright{
		position: absolute;
		bottom: 100px;
		color: #fff;
		font-size: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
