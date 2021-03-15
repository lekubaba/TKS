<template>
	<div class='theme'>
		<div class='top'>
			企业或产品都有自己的色调，比如支付宝：蓝色、微信：绿色，在这里提交属于你的色调，打造你体系的专属主题。
		</div>
		<div class='add-theme-top'>
			<input class='theme-input' type="text" placeholder="输入16进制颜色代码值" ref='color' v-model="themeColor.backgroundColor" onkeyup="this.value=this.value.replace(/[, ]/g,'')">
			<div class='theme-sure' @click='saveColor' :style="{backgroundColor:this.$store.state.color}">保存</div>
		</div>
		<div class='add-theme' :style='themeColor'>主题颜色：{{themeColor.backgroundColor}}</div>
		<div class='add-title'>十六进制颜色代码示例：<span>(#号是必须的)</span></div>
		<div class='theme-example'>
			<div class='example-a'>十六进制颜色代码为：#1476FE</div>
			<div class='example-b'></div>
			<div class='example-c'></div>
		</div>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
		name: 'Theme',
		components: {
			
		},
		data(){
			return {
				themeColor:{
					backgroundColor:''
				}
				
			}
		},
		beforeRouteEnter (to, from, next) {
		  if(window.localStorage['isVIP']=="true"){
			  next();
			  return;
		  }
		  next({name:"Promotion"});
		},
		methods:{
			...mapMutations([
				'setColor',
			]),
			saveColor(){
				this.$refs.color.value ===''?this.$message.info('输入颜色代码'):this.$Utils.checkColor(this.$refs.color.value)?this.saveColorToDatabase(this.$refs.color.value):this.$message.info('格式错误');
			},
			saveColorToDatabase(color){
				let that = this;
				let agentID = window.localStorage['agentID'];
				this.axios.post('/api/saveColorToDatabase',{agentID:agentID,color:color})
				.then(function(res){
					if(res.data.code===500){
						that.$message.success('系统出错了');
						return;
					}
					window.localStorage.setItem('color',color);
					that.setColor(color);
					that.$router.replace({name:'SuccessRemind'})
					
				})
			}
		},
		created() {
			
		},
		mounted(){
	
		}
	}
</script>

<style scoped lang="less">
	.theme{
		padding:10px 0 0 0;
		width:100vw;
		height: 100vh;
		background-color: #F2F5FA;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
		color: #999;
	}
	.top{
		width:85vw;
		height: 90px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		color:#999;
		font-size: 12px;
	}
	.theme-input{
		padding-left: 20px;;
		width:60vw;
		height: 50px;
		border:none;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		font-size: 18px;
		color: #666;
	}
	.theme-sure{
		width:25vw;
		height: 50px;
		text-align: center;
		line-height: 50px;
		background-color: #1476FE;
		color: #fff;
		font-size: 14px;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	.add-theme-top{
		width:85vw;
		height: 45px;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 16px;
		box-shadow: 0 1px 6px 0px rgba(100,100,100,.3);
	}
	.add-theme{
		margin-top:20px;
		width:85vw;
		height: 120px;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-weight: 900;
		font-size: 16px;
		box-shadow: 0 1px 6px 0px rgba(100,100,100,.3);
	}
	.add-theme{
		background-color: #1476FE;
	}

	
	.add-title{
		width:85vw;
		height: 30px;
		margin-top:30px;
		margin-bottom: 5px;
		font-size: 14px;
		font-weight: 900;
		color: #666;
	}
	.add-title span{
		color:#1476FE;
	}
	.theme-example{
		position: relative;
		top:0px;
		width:85vw;
		height: 80px;

		
	}
	.theme-margin-a{
		margin-top:40px;
	}
	.example-a,.example-b,.example-c{
		position: absolute;
		width:85vw;
		height: 80px;
		background-color: #1476fe;
		border-radius: 10px;
		font-size: 14px;
		font-weight:900;
	}
	.example-a{
		top:20px;
		color: #fff;
		text-align: center;
		line-height: 80px;
		z-index: 1000;
		
	}
	.example-b{
		top:10px;
		opacity:.2;
		
	}
	.example-c{
		top:0px;
		left:0px;
		opacity:.2;
		
	}
	
</style>
