<template>
	<div class="promotion">
		<div class='poster-wraper'>
			<img class='poster-item' v-for='item in agentPoster' v-bind:key='item.id' :src="item.posterUrl">
		</div>
		<div class='button-wraper'>
			<div class='buy-tks' v-if='showBuyTab.buyTk'>
				<div class='buy-tk-protocol'>
					<div class='buy-agree' :style="{backgroundColor:color}">√</div>
					<div class='buy-agree-title'>我已阅读并同意</div>
					<div class='buy-agree-protocol' @click='toUserProtocol' :style="{color:color}">《统客使用协议》</div>
				</div>
				<div class='buy-tk-pay' :style="{backgroundColor:color}">
					<span class='buy-underline'>¥6999</span>
					<span class='buy-money-renminbi'>¥</span>
					<span class='buy-money'>1299.0</span>
					<span class='buy-content'>开启裂变</span>
				</div>
			</div>
			<div class='tk-vips' v-if='!showBuyTab.buyTk'>
				<div class='buy-tk-protocol'>
					<div class='buy-agree' :style="{backgroundColor:color}">√</div>
					<div class='buy-agree-title'>新手必读</div>
					<div class='buy-agree-protocol' @click='toPromotionGuide' :style="{color:color}">《推广入门指南》</div>
				</div>
				<div class='tk-vips-items' data-url='lekubaba' :style="{backgroundColor:color}">
					<div class='tk-vip-item' @click='toPromotionQrcode'>推广码</div>
					<div class='tk-vip-item' @click='toAgentQrcode'>招商码</div>
					<div class='tk-vip-item' @click='toContactBoss'>老板</div>
					<div class='tk-vip-item' @click='toMorePromotion'>更多</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';
export default {
	name: 'Promotion',
	components: {
		// VueQr
	},
	data(){
		return {
			agentPoster:[
				{id:0,posterUrl:'http://qiniu.tongkeapp.com/agent_poster_04.png'},
				{id:1,posterUrl:'http://qiniu.tongkeapp.com/agent_poster_04.png'},
				{id:2,posterUrl:'http://qiniu.tongkeapp.com/agent_poster_04.png'},
				{id:3,posterUrl:'http://qiniu.tongkeapp.com/agent_poster_04.png'},
				{id:4,posterUrl:'http://qiniu.tongkeapp.com/agent_poster_04.png'},
				{id:5,posterUrl:'http://qiniu.tongkeapp.com/agent_poster_04.png'},
				{id:6,posterUrl:'http://qiniu.tongkeapp.com/agent_poster_04.png'},
				{id:7,posterUrl:'http://qiniu.tongkeapp.com/agent_poster_04.png'},
			],
			showBuyTab:{
				buyTk:false
			},
			
		}
	},
	mounted() {
		
	},
	
	methods:{
		fetchData(){
			let that = this;
			this.axios.post('/api/promotion',{test:true})
				.then(function(res){
					console.log(res.data);
					that.$message.success('Promotion');
				})
		},
		toUserProtocol(){
			this.$router.push({name:'UserProtocol'});
		},
		toPromotionGuide(){
			this.$router.push({name:'PromotionGuide'});
		},
		toPromotionQrcode(e){
			// console.log(e.target.parentNode.dataset.url);
			this.$router.push({name:'PromotionQrcode'});
		},
		toAgentQrcode(){
			this.$router.push({name:'AgentQrcode'});
		},
		toContactBoss(){
			this.$router.push({name:'ContactBoss'});
		},
		toMorePromotion(){
			this.$router.push({name:'MorePromotion'});
		},

	},
	created() {
		this.fetchData();
	},
	computed:{
		...mapState({
			color:state=>state.color,
		})
	}
}
</script>

<style scoped lang="less">
	.promotion{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
	}
	.poster-wraper{
		width:100vw;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.poster-item{
		width:100%;
		height: auto;
	}
	.button-wraper{
		position: fixed;
		bottom: 80px;
		width:100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 -3px 4px 0 rgba(0,0,0,.1);
	}
	.buy-tks{
		width:100vw;
		height: 90px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.buy-tk-pay{
		width:95vw;
		height: 48px;
		// background-image: linear-gradient(135deg, rgba(244, 213, 131, 1), rgba(191, 152, 57, 1.0));
		// background-color: #1476fe;
		// background-image: linear-gradient(45deg,#1ff0ef 0%,#fe2e5c 100%);
		text-align: center;
		line-height: 48px;
		font-size: 20px;
		font-weight: 900;
		color: #fff;
		border-radius: 5px;
	}
	.buy-money-renminbi{
		font-size: 14px;
	}
	.buy-money{
		font-size: 24px;
		margin-right: 10px;
	}
	.buy-content{
		font-size: 18px;
	}
	.buy-underline{
		color:#eee;
		text-decoration:line-through;
		margin-right: 10px;
	}
	.buy-tk-protocol{
		width:95vw;
		height: 32px;
		// background-color: rgb(245,245,245);
		padding:0 20px 0 2px;
		display: flex;
		align-items: center;
		// justify-content: center;

	}
	.buy-agree{
		margin-right: 5px;
		width:12px;
		height: 12px;
		border-radius: 2px;
		// background-color: #1ff0ef;
		// background-image: linear-gradient(45deg,#1ff0ef 0%,#fe2e5c 100%);
		text-align: center;
		line-height: 12px;
		font-size: 8px;
		color: #fff;
		font-weight: 900;
		
	}

	.buy-agree-title{
		color:#999;
		font-size: 12px;
	}
	.buy-agree-protocol{
		font-size: 12px;
		color:#1476fe;
	}
	.tk-vips{
		width:100vw;
		height: 90px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.tk-vips-items{
		width:95vw;
		height: 48px;
		// background-image: linear-gradient(135deg, rgba(244, 213, 131, 1), rgba(191, 152, 57, 1.0));
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.tk-vip-item{
		width:20vw;
		height: 48px;
		text-align: center;
		line-height: 48px;
		// color: #967533;
		color: #fff;
		font-size: 14px;
		font-weight: 900;
		
	}
</style>
