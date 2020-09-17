<template>
	<div class="data">
		<div class='total'>
			<div class='total-all'>
				<span class='gray'>今日获客</span>
				<span class='colorful' :style="{color:color}">{{customerStatistics.todayCustomer}}</span>
			</div>
			<div class='total-all'>
				<span class='gray'>获客总数</span>
				<span class='colorful' :style="{color:color}">{{customerStatistics.totalCustomer}}</span>
			</div>
		</div>
		<div class='profile'>
			<div class='profile-item' v-for = 'item in customerList' v-bind:key='item.id'>
				<img class='profile-item-avatar' src="http://qiniu.tongkeapp.com/customerDefaultAvatar_01.png">
				<div class='profile-item-content'>
					<div class='profile-item-text'>
						<div class='profile-item-info'>{{item.remindText}}</div>
						<div class='profile-item-wraper'>
							<div class='profile-item-left'>
								<div class='profile-item-time'>{{item.customerDesensitizationNumber}}</div>
								<div class='profile-item-state' :style="{color:color}">{{item.presentState}}</div>
							</div>
							<div class='button-vip' :data-customer-phone-number='item.customerPhoneNumber'>
								<div class='profile-item-button' @click='progressing' :style="{backgroundColor:color}">进度</div>
								<div class='profile-item-button-1' @click='feedback' v-if='userInfo.isVIP' :style="{backgroundColor:color}">反馈</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex';
export default {
	name: 'Data',
	components: {
		// Loading
	},
	data(){
		return {
			customerStatistics:{
				todayCustomer:'12',
				totalCustomer:'29'
			},
			customerList:[
				{
					id:0,
					customerName:'杨女士',
					beCustomerTime:'8-22 12:22',
					customerPhoneNumber:'15955667788',
					customerDesensitizationNumber:'159****7788',
					presentState:'客户已经签约',
					remindText:'杨女士，8月22日 12:23，报名参加了活动'
				}
			]
		}
	},
	computed:{
		...mapState({
			userInfo:state=>state.userInfo,
			color:state=>state.color,
		}),
	},
	created() {
		this.$loading.show()
		this.fetchData();
		console.log(this.color)
	},
	methods:{
		fetchData(){
			let that = this;
			let agentPhoneNumber=this.userInfo.agentPhoneNumber;
			this.axios.post('/api/userData',{agentPhoneNumber:agentPhoneNumber})
				.then(function(response){
					that.$loading.hide();
					console.log(response.data);
					
				})
		},
		feedback(event){
			let customerPhoneNumber = event.currentTarget.parentNode.dataset.customerPhoneNumber;
			this.$router.push({name:'FeedBack',query:{customerPhoneNumber:customerPhoneNumber}});
		},
		progressing(event){
			let customerPhoneNumber = event.currentTarget.parentNode.dataset.customerPhoneNumber;
			this.$router.push({name:'Profile',query:{customerPhoneNumber:customerPhoneNumber}});
		},

	},
	
}
</script>
<style scoped lang="less">
	.data{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		padding-bottom: 100px;
	}
	.total{
		width:100%;
		height: 70px;
		box-shadow: 0 0 8px 0 rgba(0,0,0,0.10), 0 0 10px 0 rgba(0,0,0,0.1), 0px 1px 1px 2px rgba(222,222,222,0.10);
		// background-color: #1476fe;
		display: flex;
		flex-direction: row;
		margin-bottom: 20px;
		
	}
	.total-all{
		width:50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-weight:700;
	}
	.gray{
		color: #808080;
	}
	.profile{
	
	}

	.profile-item{
		width:100vw;
		height: 70px;
		display: flex;
		padding:5px 20px 0 20px;
	}
	.profile-item-avatar{
		width:32px;
		height:32px;
		border-radius: 21px;
		
	}
	.profile-item-content{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width:calc(100vw - 82px);
		padding:0px 0 5px 6px;
		border-bottom: .5px dashed #ccc;
	
	}
	.profile-item-text{
		width:calc(100vw - 82px);
	}
	.profile-item-wraper{
		
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.button-vip{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.profile-item-button,.profile-item-button-1{
		margin-top: 5px;
		width:50px;
		height: 20px;
		text-align: center;
		line-height: 20px;
		font-size: 12px;
		font-weight: bold;
		border-radius: 15px;
		color: #fff;
	}
	.profile-item-button-1{
		margin-left: 20px;
	}
	
	.profile-item-info{
		font-size: 12px;
		color: #999;
		font-weight: 700;
	}
	.profile-item-time{
		font-size: 12px;
		color: #999;
	}
	.profile-item-state{
		font-size: 12px;
		color: #1476fe;
	}
	
</style>
