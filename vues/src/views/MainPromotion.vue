<template>
	<div class='promotion-item'>
		<div class='add-remindx'>
			设置须知：如需推广某个产品，生成二维码，查看对应产品推广的代理详情和业绩详情，需要将这个产品设置为主推，可以理解为“切换账号”。
		</div>
		<div class='wraper-items'>
			<div class='wraper-item' v-for='item in promotionList'>
				<div class='container-c'>
					<div class='container'>
						<div class='wraper-item-title1'>{{item.mainPromotionProducts.productsName}}</div>
						<div class='wraper-item-titleone' v-if="currentProductsId===item.mainPromotionProducts._id">当前主推</div>
					</div>
					<div class='item-t'>
						加入时间：{{item.time}}
					</div>
				</div>
				<div class='wraper-item-title2' :style="{backgroundColor:color}" :data-productsname="item.mainPromotionProducts.productsName" :data-productsid="item.mainPromotionProducts._id" @click='setMainPromotion'>设为主推</div>
			</div>
		</div>
		<div style='height: 100px;'></div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name: 'MainPromotion',
		components: {
			// HelloWorld
		},
		data(){
			return {
				promotionList:[],
				mask:{
					mask1:false,
				},
				productsName:'',
				productsId:'',
				currentProductsId:window.localStorage['productsId'],
			}
		},
		created() {
			this.$loading.show();
			this.getData();
		},
		methods:{
			getData(){
				let that = this;
				let agentID = window.localStorage['agentID'];
				this.axios.post('/api/getpromotionlist',{agentID:agentID})
				.then(function(resp){
					if(resp.data.code===500){
						that.$loading.hide();
						that.$message.info('系统出错了');
						return;
					}
					that.$loading.hide();
					that.promotionList = resp.data.promotionList;
				})
			},
			setMainPromotion(event){
				let productsId = event.currentTarget.dataset.productsid;
				this.productsId = productsId;
				this.$router.push({name:'SetMainPromotion',params:{productsId:productsId}});
			},
		},
		computed:{
			...mapState({
				userInfo:state=>state.userInfo,
				color:state=>state.color,
			})
		},
		
	}
</script>

<style scoped lang="less">
	.promotion-item{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction:column;
		align-items: center;
		background: url('http://qiniu.tongkeapp.com/bg_5.png') no-repeat;
		background-size:100%;
	}
	.add-remindx{
		margin-top:30px;
		padding:20px;
		width:85vw;
		height: 90px;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 1px 3px 0px rgba(100,100,100,.5);
		font-size: 12px;
		color: #333;
	}
	.edit-wraper{
		margin-top:20px;
		width:90vw;
		height: auto;
		background-image: linear-gradient(135deg,#fff 0%,#ededed 100%);
		border-radius: 10px;
		box-shadow: 0 1px 11px 0px rgba(0,0,0,.1);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.wraper-items{
		padding:10px 0 10px 0;
		width:100%;
		height:auto;
		display: flex;
		flex-direction:  column;
		align-items: center;
		justify-content: space-between;
		
	}
	.wraper-item{
		margin-top:12px;
		width:85vw;
		height: 72px;
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 1px 5px 0px rgba(0,0,0,.1);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.container{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.item-t{
		margin-left: 20px;
		font-size: 10px;
		color: #999;
	}
	.wraper-item-title1{
		margin-left: 20px;
		font-size: 16px;
		font-weight: 900;
		color: #666;
	}
	.wraper-item-titleone{
		margin-left: 10px;
		font-size: 16px;
		font-weight: 900;
		color: #1476FE;
	}
	.wraper-item-title2{
		width:27vw;
		height: 30px;
		background-color: #1475FE;
		margin-right: 20px;
		font-size: 14px;
		font-weight: 900;
		color: #fff;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
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
	.mask-contenta{
		position: relative;
		bottom: 0px;
		transition: bottom 3s;
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
		font-weight: 900;
		color: #1476fe;
	}
	.mask-titleb{
		margin-top:5px;
		font-size: 16px;
		font-weight: bolder;
		color: #999;
	}
	.mask-button{
		position: absolute;
		bottom: 0px;
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
		
		color: #1476FE;
		background-color: #eee;
		
		
	}
	.mask-confirm{
		color: #fff;
		background-color: #1476FE;
	}
</style>
