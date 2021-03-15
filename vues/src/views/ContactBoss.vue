<template>
	<div class='contact-boss' :style="{backgroundColor:color}">
		<h1>联系我们</h1>
		<h3>客服电话：{{bossPhoneNumber}}</h3>
		<h3>客服微信：{{bossWechat}}</h3>
		<h3>服务内容：邀请进地区群，咨询各种推广问题，订立牌，开通城市经理，城市总监，城市独家。</h3>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name: 'ContactBoss',
		components: {
			// HelloWorld
		},
		data(){
			return {
				bossPhoneNumber:null,
				bossWechat:null,
				
			}
		},
		created() {
			this.getBossInfo();
		},
		methods:{
			getBossInfo(){
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				let that = this;
				this.axios.post('/api/getBossInfo',{productsID:productsId,agentID:agentID})
					.then(function(res){
						that.bossPhoneNumber = res.data.bossPhoneNumber;
						that.bossWechat = res.data.bossWechat;
					})
					.catch(function(err){
						that.$message.info('系统出错了');
					})
			}
		},
		computed:{
			...mapState({
				userInfo:state=>state.userInfo,
				color:state=>state.color,
			})
		}
	}
</script>

<style scoped lang="less">
	.contact-boss{
		padding:40px 20px 20px 20px;
		width:100vw;
		height: 100vh;
		background-color: #1476fe;
		display: flex;
		flex-direction: column;
		// align-items: center;
		// justify-content: center;
		font-size: 13px;
		color: #fff;
	}
	// .contact-boss {
	// 	background: linear-gradient(135deg, #f66, #f90, #3c9, #09f, #66f) left center/400% 400%;
	// 	animation: move 10s infinite;
	// }
	@keyframes move {
		0%,
		100% {
			background-position-x: left;
		}
		50% {
			background-position-x: right;
		}
	}
	h1{
		margin-bottom: 20px;
	}
	h4{
		margin-top:20px;
	}

</style>

