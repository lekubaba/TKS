<template>
	<div id='success'>
		<div class='container'>
			<div class='container-a'>
				<div class='c-title'>
					提交<span style='color:#11b764'>已成功</span>
				</div>
				<div class='remind'>
					可以前往首页浏览查看效果。
				</div>
			</div>
			<div class='container-b'  @click='toInformationPage' v-if='state?true:false'>
				
				<div class='arrow-right'></div>
				<span style='color:#11B764'>去修改</span>
			</div>
			
		</div>
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
	background-color: #F2F5FA;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.container{
	margin-top:40px;
	width:92vw;
	height: 150px;
	padding:20px 25px 20px 25px;
	background-color: #fff;
	border-radius: 10px;
	display: flex;
}
.container-a{
	width:80%;
}

.container1{
	margin-top:20px;
	width:92vw;
	height: 150px;
	padding:20px 25px 20px 25px;
	background-color: #fff;
	border-radius: 10px;
	display: flex;
}
.c-title{
	font-size:26px;
	color:#333;
	font-weight: 900;
}
.arrow-right {
	width: 0;
	height: 0;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	border-bottom: 10px solid #333;
	font-size: 0;
	line-height: 0;
	transform: rotate(90deg);
}
.container-b{
	width:30%;
	height: 100%;
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
}

.remind{
	width: 100%;
	padding:5px 0px 0 0px;
	margin-top:5px;
	font-size: 12px;
	color:#666;
}
	
	
</style>
