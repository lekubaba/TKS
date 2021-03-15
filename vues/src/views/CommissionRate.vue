<template>
	<div class='commission-rate'>
		<div class='container' @click='toSetAgentCommission'>
			<div class='container-a'>
				<div class='c-title'>
					城市代理<span style='color:#11b764'>佣金分配</span>
				</div>
				<div class='remind'>
					用来配置城市代理直接推广的客户佣金怎么分配，包括<span style='color:#11b764'>代理</span>直推比例、上级、上上级分成比例。
				</div>
			</div>
			<div class='container-b'>
				<div class='arrow-right'></div>
			</div>
		</div>
		<div class='container1' @click='toSetManagerCommission'>
			<div class='container-a'>
				<div class='c-title'>
					城市经理<span style='color:#1475FE'>佣金分配</span>
				</div>
				<div class='remind'>
					用来配置城市经理直接推广的客户佣金怎么分配，包括<span style='color:#1475FE'>经理</span>直推比例、上级、上上级分成比例。
				</div>
			</div>
			<div class='container-b'>
				<div class='arrow-right'></div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'CommissionRate',
		components: {
			// HelloWorld
		},
		data(){
			return {

			}
		},
		beforeRouteEnter (to, from, next) {
		  if(window.localStorage['isVIP']=="true"){
			  next();
			  return;
		  }
		  next({name:"Promotion"});
		},
		created() {
			
		},
		methods:{
			toSetAgentCommission(){
				this.$router.push({name:'AgentCommissionRate'})
			},
			toSetManagerCommission(){
				this.$router.push({name:'ManagerCommissionRate'})
			},
		},
		computed:{
			
		}
	}
</script>

<style scoped lang="less">
	.commission-rate{
		width:100vw;
		min-height: 100vh;
		background-color: #F2F5FA;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
	}
	
	.container{
		margin-top:40px;
		width:92vw;
		height: auto;
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
		height: auto;
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
		width:20%;
		height: auto;
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
