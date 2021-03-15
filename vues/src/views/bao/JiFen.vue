<template>
	<div class="app">
		<div class='itema activea' @click='toAgentQrcode'>
			<p class='titlex'>招代理得积分</p>
			<p style='font-size: 14px;'>每新增一位代理得1000积分</p>
		</div>
		<div class='itema activeb' @click='toPromotionQrcode'>
			<p class='titlex'>出额得积分</p>
			<p style='font-size: 14px;'>每新增一个出额得5000积分</p>
		</div>
		<div class='itema actived' @click='toContactBoss'>
			<p class='titlex'>订立牌得积分</p>
			<p style='font-size: 14px;'>20倍立牌数积分返还</p>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'JiFen',
		data () {
			return {
			}
		},
		beforeRouteEnter (to, from, next) {
		  if(window.localStorage['isPromotion']=="true"){
			  next();
			  return;
		  }
		  next({name:"Promotion"});
		},
		methods:{
			
			toAgentQrcode(){
				//产品ID
				let _id = window.localStorage['productsId'];
				this.$router.push({name:'AgentQrcode',query:{id:_id}});
			},
			toPromotionQrcode(e){
				//产品ID
				let _id = window.localStorage['productsId'];
				this.$router.push({name:'PromotionQrcode',query:{id:_id}});
			},
			toContactBoss(e){
				//产品ID
				this.$router.push({name:'ContactBoss'});
			},
			
		}

	}	
</script>

<style lang="less">
	.app{
		width:100vw;
		height: 100vh;
		background-color: #000;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding:20px 0 30px 0;
	}
	.itema{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top:20px;
		width:90%;
		height: 100px;
		z-index: 2;
		border-radius:20px;
		box-shadow: 0 5px 30px rgba(0, 63, 255, .5);
		z-index:0;
		color:#fff;
	}
	.titlex{
		font-size: 22px;
		font-weight: 900;
	}
	.activea{
		background-image: linear-gradient(105deg, #66CCFC, #53E054);
	}
	.activeb{
		background-image: linear-gradient(105deg, #2D4777,#243F51);
	}
	.activec{
		background-image: linear-gradient(105deg, #4287FE, #8A49FC);
	}
	.actived{
		background-image: linear-gradient(135deg, rgba(244, 213, 131, 1), rgba(191, 152, 57, 1.0));
	}
</style>
