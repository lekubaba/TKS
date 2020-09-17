<template>
	<div id='profile-a'>
		<div class='profile-head'>
			<div class='head-left'>
				<img class='profile-head-img' :src="customerInfo.customerAvatarImg">
				<div class='profile-head-title'>
					<span class='title-username'>{{customerInfo.customerName}} {{customerInfo.customerDesensitizationNumber}}</span>
					<span class='title-tel'>{{customerInfo.beCustomerTime}}</span>
				</div>
			</div>
			<div class='profile-head-production' :style="{color:color}">{{customerInfo.selectedProducts}}</div>
		</div>
		<div class='profile-list'>
			<ul class="layui-timeline">
				<li class="layui-timeline-item" v-for='item in customerProgressing' v-bind:key ='item.id'>
					<i class="layui-icon layui-timeline-axis circle"></i>
					<div class="layui-timeline-content layui-text">
						<h3 class="layui-timeline-title">{{item.time}}</h3>
						<p>{{item.customerProgress}}</p>
					</div>
				</li>
				<li class="layui-timeline-item">
					<i class="layui-icon layui-timeline-axis circle"></i>
					<div class="layui-timeline-content layui-text">
						<div class="layui-timeline-title">...</div>
					</div>
				</li>
			</ul>
		</div>
		<div class='profile-note'>
			<span>客户跟进笔记</span>
			<div class='waiting'>
				此功能正在开发...
			</div>
		</div>
		<div class='profile-contact' :style="{backgroundColor:color}">
			<h3>客服电话：{{customerInfo.bossPhoneNumber}}</h3>
			<h3>客服微信：{{customerInfo.bossWechat}}</h3>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';
export default {
	name: 'Profile',
	components: {
		// HelloWorld
	},
	data(){
		return {
			customerInfo:{
				customerName:'杨女士',
				customerPhoneNumber:'15955667788',
				customerDesensitizationNumber:'159****7788',
				customerAvatarImg:'http://qiniu.tongkeapp.com/customerDefaultAvatar_01.png',
				beCustomerTime:'8-22 12:22',
				selectedProducts:'飞贷',
				bossPhoneNumber:'15914132599',
				bossWechat:'vipFace',
				customerProgress:[
					{id:0,time:'8月13日',customerProgress:'客户没有参加活动'},
					{id:1,time:'8月15日',customerProgress:'客户参加了活动'},
					{id:2,time:'8月18日',customerProgress:'销售正在跟进客户...'},
					{id:3,time:'8月22日',customerProgress:'客户签约成功...'},
					{id:4,time:'8月23日',customerProgress:'订单金额：58000'},
					{id:5,time:'8月25日',customerProgress:'佣金已经发放'},
				]
			}
		}
	},
	computed:{
		...mapState({
			color:state=>state.color,
		}),
		
		customerProgressing(){
			return this.customerInfo.customerProgress.reverse();
		},
		
	},
	created() {
		this.$loading.show();
		this.fetchData();
		
	},
	methods:{
		fetchData(){
			let that = this;
			let customerPhoneNumber = that.$route.query.customerPhoneNumber;
			that.axios.post('/api/progressProfile',{customerPhoneNumber:customerPhoneNumber})
				.then(function(response){
					that.$loading.hide();
					console.log(response.data);
				})
		}
	},
	mounted(){
		
	}
}
</script>

<style lang='less' scoped>
	#profile-a{
		width:100vw;
		min-height: 100vh;
		background-color: #ededed;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.profile-head{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width:100vw;
		padding:20px;
	}
	.head-left{
		display: flex;
	}
	.profile-head-img{
		width:42px;
		height: 42px;
		border-radius: 32px;
	}
	.profile-head-title{
		margin-left: 10px;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.title-username{
		font-size: 12px;
		font-weight: 900;
		color: #999;
	}
	.title-tel{
		font-size: 12px;
		color: #999;
	}
	.profile-head-production{
		font-size: 16px;
		font-weight: bold;
		color: #1476fe;
		margin-right: 20px;
	}
	.profile-list{
		width:100vw;
		padding:20px 0 0 48px;
		display: flex;
		flex-direction: column;
	}
	ul,li {
		/*做时间轴的线*/
		margin: 0;
		padding: 0;
	}

	.layui-timeline {
		padding-top:0px
	}

	.layui-timeline-item {
		position: relative;
		padding-bottom: 20px;
		margin-top:-12px;
	}

	li {
		list-style: none;
	}

	.layui-timeline-item:first-child::before {
		display: block;
	}

	.layui-timeline-item:last-child::before {
		content: '';
		position: absolute;
		left: 5px;
		top: 0;
		z-index: 0;
		width: 0;
		
	}

	.layui-timeline-item::before {
		content: '';
		position: absolute;
		/* left: 5px; */
		top: 0;
		z-index: 0;
		width: 1px;
		height: 100%;
	}

	.layui-timeline-item::before,hr {
		background-color: #1476FE;
	}
	.layui-text p{
		color: #999;
	}

	.layui-timeline-axis {
		position: absolute;
		left: -5px;
		top: 0;
		z-index: 10;
		width: 20px;
		height: 20px;
		line-height: 20px;
		background-color: #ededed;
		color: #5FB878;
		border-radius: 50%;
		text-align: center;
		cursor: pointer;
	}

	.layui-icon {
		font-family: layui-icon !important;
		font-size: 16px;
		font-style: normal;
	}

	.layui-timeline-content {
		padding-left: 25px;
	}

	.layui-text {
		line-height: 22px;
		font-size: 14px;
		color: #666;
		top:-10px;
	}

	.layui-timeline-title {
		position: relative;
		margin-bottom: 10px;
		color:#999;
	}

	.circle {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		border: 1px solid #1476FE;
	}
	.profile-note{
		padding-left:28px;
		width:100vw;
	}
	.profile-note span{
		font-weight: bold;
		color: #333;
	}
	.waiting{
		color: #999;
		padding:5px 10px 10px 20px;
		font-size: 12px;
	}
	.profile-contact{
		position: fixed;
		bottom: 0px;
		width:100vw;
		height: 40px;
		display: flex;
		justify-content: center;
		/* background-color: #1476fe; */
		/* background-image: linear-gradient(135deg, rgba(244, 213, 131, 1), rgba(191, 152, 57, 1.0)); */
	}
	.contact-button{
		width:140px;
		height: 36px;
		background-color: #eb445a;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-weight: bold;
		font-size: 12px;
		border-radius: 20px;
		cursor: pointer;
	}
	.profile-contact h3{
		color:#fff;
		font-size: 12px;
		padding:11px;
	}
	
</style>
