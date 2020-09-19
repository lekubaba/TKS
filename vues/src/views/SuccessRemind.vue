<template>
	<div id='success'>
		<div class='success-wraper'>
			<img class='righticon' src="http://qiniu.tongkeapp.com/righticon_02.png">
			<h2 class='tit'>{{this.$route.query.supTitle}}</h2>
		</div>
		<p class='para'>{{this.$route.query.subTitle}}</p>
		<p class='para'>...</p>
	</div>
</template>

<script>

export default {
	name: 'SuccessRemind',
	components: {
		// HelloWorld
	},
	data(){
		return {
			title:{
				supTitle:'',
				subTitle:'',
			}
		}
	},
	created() {
		
	}
}
</script>

<style lang="less" scoped>
	#success{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.success-wraper{
		margin-top:100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.righticon{
		width:140px;
		height: 140px;
	}
	
	.tit{
		margin-top:10px;
		color:#42B983;
	}
	.para{
		margin-top:5px;
		font-size: 16px;
		color:#64b587;
	}
	
	
</style>
