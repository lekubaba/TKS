<template>
	<div class='commission-rate'>
		<div class='container'>
			<div class='container-a'>
				<div class='c-title' v-on:click="show1 = !show1">
					<span>极简的地推模式</span>
					<span style='color:#FE2E5C;font-size: 16px;'>推荐</span>
				</div>
				<transition name="fade">
					<div v-if="show1">
						<div class='remind'>
							拿钱全新的地推模式，让地推收益稳稳妥妥，极简的方式，像铺支付码一样将有钱花二维码发给千家万店，一次付出，长久收益。
						</div>
						<div class='remind'>
							根据最新数据统计，自身每派出一张码，每月能给您带来12.72元（不包括直推收益和下级裂变收益），每天能发至少20张，加上下级裂变收益（不包括直推收益），每月收益稳定增加一万。
						</div>
					</div>
				</transition>
			</div>
		</div>
		<div class='container1'>
			<div class='container-a'>
				<div class='c-title' v-on:click="show2 = !show2">
					<span>超高的裂变收益</span>
					<span style='color:#FE2E5C;font-size: 16px;'>推荐</span>
				</div>
				<transition name="fade">
					<div v-if="show2">
						<div class='remind'>
							招人一起发立牌，将有钱花二维码发给千家万店，收益也超高，按10人，人均发300张，每一张平均能给您每月持续带来3.82元的收益，每月收益是：10*300*3.82=11460元；
						</div>
					</div>
				</transition>
			</div>
		</div>
		<div class='container1'>
			<div class='container-a'>
				<div class='c-title' v-on:click="show3 = !show3">
					<span>线下直推最稳当</span>
					<span style='color:#FE2E5C;font-size: 16px;'>推荐</span>
				</div>
				<transition name="fade">
					<div v-if="show3">
						<div class='remind'>
							我们地推面向线下门店等各种场景，这些个体商户、门店、企业主，自身资金需求率挺高，根据目前数据统计，直推月放款额在35万-150万区间，轻松实现月入过万。
						</div>
						<div class='remind' style='color:#FF9603;'>
							注意：线上只能作为辅助方式，非常不稳定，很难确保能挣到钱，线下派发的越多，收益明显增加，心理特别踏实。
						</div>
					</div>
				</transition>
			</div>
		</div>
		<div class='buttonx' @click='toContactBoss' style='margin-top: 50px;'>联系客服进群</div>
	</div>
</template>

<script>

	export default {
		name: 'EarnMoneyRoad',
		components: {
			// HelloWorld
		},
		data(){
			return {
				mask:false,
				level:null,
				show1:false,
				show2:false,
				show3:false,
				rate1:0,
				rate2:0,
				rate3:0,
				ratea:'城市代理直推比例',
				rateb:'代理直推上级分佣比例',
				ratec:'代理直推上上级分佣比例',
				
			}
		},
	
		created() {
		
		},
		methods:{
			toContactBoss(){
				//产品ID
				let _id = window.localStorage['productsId'];
				this.$router.push({name:'ContactBoss',query:{id:_id}});
			}
		},
		computed:{
		
		},

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
		padding-bottom: 160px;
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
	.container1{
		margin-top:20px;
		width:92vw;
		height: auto;
		padding:20px 25px 20px 25px;
		background-color: #fff;
		border-radius: 10px;
		display: flex;
	}
	.container-a{
		width:100%;
	}
	.c-title{
		font-size:24px;
		color:#333;
		font-weight: 900;
		display: flex;
		justify-content: space-between;
	}
	
	.remind{
		width: 100%;
		padding:5px 0px 0 0px;
		margin-top:5px;
		font-size: 12px;
		color:#666;
	}
	.content{
		margin-top:100px;
		padding:40px 0 30px 0;
		position: relative;
		top:0px;
		width:85vw;
		height: auto;
		background-color: #fff;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.contentx{
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.inputx{
		margin-top:10px;
		width:65%;
		height: 45px;
		background-color: #F2F5FA;
		border:none;
		margin-bottom: 10px;
		font-size: 18px;
		color:#333;
		padding-left: 10px;
		border-bottom-left-radius: 5px;
		border-top-left-radius: 5px;
	}
	.confirmx{
		width:35%;
		height: 45px;
		background-color: #1475FE;
		font-size: 16px;
		color:#fff;
		border:none;
		border-bottom-right-radius: 5px;
		border-top-right-radius: 5px;
	}
	
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .2s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
	
	.buttonx{
		margin-top:20px;
		width:80%;
		height: 45px;
		background-color: #1475FE;
		color:#fff;
		border-radius: 5px;
		font-size: 18px;
		text-align: center;
		line-height: 45px;
	}
	
</style>
