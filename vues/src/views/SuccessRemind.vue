<template>
	<div id='success'>
		<div class='success-wraper'>
			<img class='righticon' src="http://qiniu.tongkeapp.com/righticon_02.png">
			<h2 class='tit'>已提交成功</h2>
		</div>
		<p class='para'>...</p>
		<div class='modify' @click='toInformationPage' v-if='state?true:false'>去修改</div>
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
			state:'',
		}
	},
	created() {
		this.getData();
	},
	methods:{
		getData(){
			this.state = this.$route.query.kind;
		},
		toInformationPage(){
			this.$router.replace({name:this.state});
		}
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
	.modify{
		width:85vw;
		height: 50px;
		background-color:#1476FE;
		margin-top:100px;
		font-size: 16px;
		font-weight: 900;
		text-align: center;
		line-height: 50px;
		color:#fff;
		border-radius: 10px;
	}
	
	
</style>
