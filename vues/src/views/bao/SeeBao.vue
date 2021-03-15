<template>
	<div class="bao">
		<div class='explain'>
			<div class='texts'>注意：黑盒仅通过积分兑换获取，订（发）立牌、邀新客、招代理可获得高额积分。</div>
			<div class='baoh'>
				<div class='baoa' style='color:#CD0508;'>宝贝</div>
				<div class='baob'>概率</div>
				<div class='baos'>说明</div>
			</div>
			<div class='baoi'>
				<div class='baoa'>手机宝箱</div>
				<div class='baob'>1.2%</div>
				<div class='baoc'>抽0-5折iphone 12、小米11随机一款（需金牛钥匙开启宝箱）</div>
			</div>
			<div class='baoi'>
				<div class='baoa'>旅游宝箱</div>
				<div class='baob'>3%</div>
				<div class='baoc'>抽0-5折张家界豪华游套餐（折扣以携程价为参考）</div>
			</div>
			<div class='baoi'>
				<div class='baoa'>翻倍宝箱</div>
				<div class='baob'>1.5%</div>
				<div class='baoc'>当月1号至中奖时的直推佣金翻倍发放</div>
			</div>
			<div class='baoi'>
				<div class='baoa'>红包宝箱</div>
				<div class='baob'>8%</div>
				<div class='baoc'>1元、5元、10元、50元、200元红包随机一个</div>
			</div>
			<div class='baoi'>
				<div class='baoa'>积分宝箱</div>
				<div class='baob'>86%</div>
				<div class='baoc'>100、500、1000、5000、20000积分随机一个</div>
			</div>
			<div class='baoi'>
				<div class='baoa'>金牛钥匙</div>
				<div class='baob'>0.3%</div>
				<div class='baoc'>开启特殊宝箱的钥匙</div>
			</div>
			<div class='baof'>
				所有宝贝均只有60天有效期，请在有效期内领取或使用，活动最终解释权归拿钱所有
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'SeeBao',
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
			
		
			
		}

	}	
</script>

<style lang="less">
	.bao{
		width:100vw;
		min-height: 100vh;
		background-color: #000;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding:20px 0 30px 0;
	}
	.explain{
		width:95%;
		height: auto;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		margin-top:20px;
		z-index: 2;
		border-radius:20px;
		border-top: 1px solid #f7a273;
		box-shadow:0 2px 1px 0 #963004, 0 4px 1px -1px #852A03, 0 6px 1px -2px #812802, 0 8px 1px -3px #963004, 0 20px 5px -5px rgba(0, 0, 0, 0.05);
		z-index:0;
		padding:20px;
	}
	.texts{
		font-size: 14px;
		border:1px solid #eee;
		padding:20px;
		font-weight: 900;
	}
	.explain p{
		margin-top:15px;
		font-size: 16px;
		font-weight: 900;
		color:#555;
	}
	.explain span{
		color:#CD0508;
	}
	
	.baoh{
		display: flex;
		border:1px solid #efefef;
		height: 40px;
	}
	.baoi{
		display: flex;
		border:1px solid #efefef;
		height: 60px;
	}
	
	.baoa,.baob{
		display: flex;
		align-items: center;
		justify-content: center;
		width:20%;
		font-size: 14px;
		color:#333;
		font-weight: 900;
	}
	.baob{
		border-left: 1px solid #efefef;
		border-right: 1px solid #efefef;
		color:#CD0508;
		width:15%;
	}
	.baoc{
		width:60%;
		display: flex;
		align-items: center;
		// justify-content: center;
		font-size: 14px;
		color:#666;
		font-weight: 900;
		padding-left: 10px;
	}
	.baos{
		width:60%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color:#CD0508;
		font-weight: 900;
	}
	.baof{
		padding:20px;
		font-size: 14px;
		color:#333;
		font-weight: 900;
		display: flex;
		align-items: center;
		justify-content: center;
		border:1px solid #efefef;
		height: auto;
		
		
	}
</style>
