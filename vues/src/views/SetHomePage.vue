<template>
	<div class="set-home-page">
		<div class='poster-wraper'>
			<img class='poster-item' v-for='item in agentPoster' v-bind:key='item.id' :src="item.posterUrl">
		</div>
		<div class='button-wraper'>
			<div class='tk-vips'>
				<div class='buy-tk-protocol'>
					<div class='buy-agree' :style="{backgroundColor:this.$store.state.color}">√</div>
					<div class='buy-agree-title'>新手必读</div>
					<div class='buy-agree-protocol' @click='toPromotionGuide' :style="{color:this.$store.state.color}">《推广入门指南》</div>
				</div>
				<div class='tk-vips-items' :style="{backgroundColor:this.$store.state.color}">
					<div class='tk-vip-item' @click='toPromotionQrcode'>推广码</div>
					<div class='tk-vip-item' @click='toAgentQrcode'>招商码</div>
					<div class='tk-vip-item' @click='toContactBoss'>老板</div>
					<div class='tk-vip-item' @click='toSetHome'>设为主推</div>
				</div>
			</div>
		</div>
		<transition name='fade'>
			<div class='mask' v-if='mask1'>
				<div class='mask-contenta'>
					<div class='mask-titlea' :style="{color:this.$store.state.color}">确定设为主推？</div>
					<div class='mask-titleb'>首页将被替换，业绩、团队页也将被切换</div>
					<div class='mask-button'>
						<div class='mask-confirm' @click='isConfirm' :style="{color:this.$store.state.color}">确认</div>
						<div class='mask-cancel' @click='isCancel' :style="{backgroundColor:this.$store.state.color}">取消</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	
export default {
	name: 'SetHomePage',
	components: {
		// VueQr
	},
	data(){
		return {
			agentPoster:[
				{id:0,posterUrl:'http://qiniu.tongkeapp.com/poster_01.png'},
				{id:1,posterUrl:'http://qiniu.tongkeapp.com/poster_02.png'},
				{id:2,posterUrl:'http://qiniu.tongkeapp.com/poster_03.png'},
				{id:3,posterUrl:'http://qiniu.tongkeapp.com/poster_04.png'},
				{id:4,posterUrl:'http://qiniu.tongkeapp.com/poster_05.png'},
				{id:5,posterUrl:'http://qiniu.tongkeapp.com/poster_06.png'},
				{id:6,posterUrl:'http://qiniu.tongkeapp.com/poster_07.png'},
				{id:7,posterUrl:'http://qiniu.tongkeapp.com/poster_08.jpg'},
			],
			mask1:false
			
		}
	},
	mounted() {
		// this.draw();
		console.log(this.$refs.box);
	},
	
	methods:{

		toPromotionGuide(){
			this.$router.push({name:'PromotionGuide'});
		},
		toPromotionQrcode(){
			this.$router.push({name:'PromotionQrcode'});
		},
		toAgentQrcode(){
			this.$router.push({name:'AgentQrcode'});
		},
		toContactBoss(){
			this.$router.push({name:'ContactBoss'});
		},
		toSetHome(){
			this.mask1= true;
		},
		isCancel(){
			this.mask1 = false;
		},
		isConfirm(){
			this.mask1 = false;
		},

	},
	created() {
		
	}
}
</script>

<style scoped lang="less">
	.set-home-page{
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
		bottom: 0px;
		width:100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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
	.buy-tk-protocol{
		margin-top:-15px;
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
		background-color: #1476fe;;
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
		height: 105px;
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
		background-color: #1476fe;
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
		color: #fff;
		font-size: 14px;
		font-weight: 900;
		
	}
	.mask{
		position: fixed;
		bottom:0px;
		width:100vw;
		height: calc(100vh + 250px);
		background-color: rgba(0,0,0,.7);
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		// justify-content:center;
	}
	.mask-contenta{
		position: relative;
		top:0px;
		width:100vw;
		height: 250px;
		background-color: rgb(247,247,247);
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.mask-titlea{
		margin-top:40px;
		font-size: 24px;
		font-weight: bolder;
		color: #1476fe;
	}
	.mask-titleb{
		margin-top:5px;
		font-size: 13px;
		font-weight: bolder;
		color: #999;
	}
	.mask-button{
		margin-top:20px;
		width:100%;
		height: 120px;
		display: flex;
		flex-direction: row;
		// border:1px solid red;
		align-items: center;
		justify-content: center;
	}
	.mask-cancel,.mask-confirm{
		width:30%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 16px;
		font-weight: 900;
		cursor: pointer;
		border-radius: 5px;
		margin:0 10px 0 10px;
	}
	.mask-cancel{
		color: #fff;
		background-color: #1476FE;
		
		
	}
	.mask-confirm{
		color: #1476FE;
		background-color: #eee;
	}
	
	.fade-enter-active, .fade-leave-active {
		transition: opacity .3s,bottom .3s;
		// transition: opacity .3s;
	}
	.fade-enter{
		bottom:-250px;
		opacity: 0;
	}
	.fade-enter-to{
		bottom:0px;
	}
	.fade-leave{
		bottom: 0px;
	}
	.fade-leave-to {
		bottom:-250px;
		opacity: 0;
	}
</style>
