<template>
	<div class="sales">
		<div class='profile'>
			<div class='remindx' v-if='isRemind'>{{remind}}</div>
			<div class='profile-item' v-for = '(item,index) in datas'>
				<div class='tras'>{{item.agentID._id==agentID?'直推':item.agentID.subAPI.work?item.agentID.subAPI.work:'下级'}}</div>
				<div class='head-info'>
					<div class='head-infoa'>
						<div class='profile-item-remind' v-if='!item.line'>空码</div>
						<img class='profile-item-avatar' :src="item.customerID.customerAvatarImg">
						<div class='head-n'>
							<div class='span-t'>{{item.customerName}}</div> 
							<div class='span-t1'>{{item.customerID.customerNickname?item.customerID.customerNickname:''}}</div>
							<div class='profile-item-time'>{{item.customerDesensitizationNumber}}</div>
						</div>
					</div>
					<div class='profile-item-text'>
							<div class='profile-item-state'>{{item.eDu==='暂未出额'?'暂未出额':item.eDu=='0'?'未获得额度':'出额 : '+item.eDu}}</div>
							<div v-if='isLoan' class='profile-item-state'>{{item.orderMoney?'借款 : '+item.orderMoney:'暂未借款'}}</div>
						<div class='profile-item-info'>
							<div class='time-info'>{{item.successTime?item.successTime:item.orderTime}}  </div>
						</div>
					</div>
				</div>
				<div class='profile-item-head' @dblclick='toZero' v-if='isVIP' :data-id='item._id' :data-index='index'></div>
				<div class='profile-item-content' :data-id='item._id' :data-mode='item.mode' :data-index='index'>
					<div class='profile-item-button' @click='progressing' v-if='!isVIP'></div>
					<div class='profile-item-button-1' @click='feedback' v-if='isVIP'></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
export default {
	name: 'DataProfile',
	components: {
		// HelloWorld
	},
	props:['datas','isVIP','remind','isRemind'],
	data(){
		return {
			color:this.$store.state.color,
			isLoan:true,
			agentID:window.localStorage['agentID'],
		}
	},
	created() {
		
	},
	methods:{
		feedback(event){
			
			let orderID = event.currentTarget.parentNode.dataset.id;
			let mode = event.currentTarget.parentNode.dataset.mode;
			let index = event.currentTarget.parentNode.dataset.index;
			window.localStorage.setItem('index',index);
			this.$router.push({name:'FeedBack',query:{orderID:orderID,mode:mode}});
		},
		progressing(event){
			let orderID = event.currentTarget.parentNode.dataset.id;
			let mode = event.currentTarget.parentNode.dataset.mode;
			this.$router.push({name:'Profile',query:{orderID:orderID,mode:mode}});
		},
		toZero(){
			let orderID = event.currentTarget.dataset.id;
			let index = event.currentTarget.dataset.index;
			let that = this;
			this.axios.post('/api/saveedu',{orderID:orderID,edu:0})
				.then(function(val){
					if(val.data.code===500){
						that.$message.info('稍后再试');
						return;
					}
					that.$message.success('反馈成功');
					Vue.set(that.datas[index],'eDu','0');
				})
		}
		
	},
	mounted() {

	},

	
}
</script>
<style scoped lang="less">
	.sales{
		width:100vw;
		min-height:auto;
		// background-color: #F2F5FA;
		padding-bottom: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.profile{
		width:92%;
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
		padding:0 10px 0 10px;
		
	}
	.remindx{
		margin:10px 0 10px 0px;
		width:100%;
		height: auto;
		padding:20px 20px 20px 20px;
		background-color: #F2F5FA;
		font-size: 14px;
		color:#555;
		text-align: justify;
	}
	
	.profile-item{
		position: relative;
		top:0px;
		margin:10px 0 10px 0 ;
		width:100%;
		height: auto;
		display: flex;
		flex-direction: column;
		padding:10px 10px 5px 0;
		background-color: #fff;
		border-bottom:1px solid rgba(218,224,234,.5);
	}
	.tras{
		padding:0 10px 0 10px;
		position: absolute;
		top:0px;
		right: 0px;
		text-align: center;
		font-size: 8px;
		background-color: rgba(250,80,90,.5);
		color:#fff;
		border-bottom-left-radius: 5px;
		border-top-right-radius: 5px;
		
	}
	.profile-item:last-child{
		border:none;
	}
	.head-info{
		width:100%;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.head-infoa{
		position: relative;
		top:0px;
		width:auto;
		height: 62px;
		display: flex;
		align-items: center;
	}
	.profile-item-remind{
		position: absolute;
		left: 30px;
		bottom: 2px;
		width:38px;
		height:22px;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		background-color: #FA5050;
		color:#fff;
		font-size: 12px;
		text-align: center;
		line-height: 22px;
		
	}
	.profile-item-avatar{
		width:62px;
		height:62px;
		border-radius: 36px;
		border:3px solid #fff;
		box-shadow: 0 0 6px 0 rgba(0,0,0,.2);
		
	}
	.profile-item-head{
		position: absolute;
		top:10px;
		left: 0px;
		width:30%;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.profile-item-content{
		position: absolute;
		top:10px;
		right: 0px;
		width:70%;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 2000;
	}
	.profile-item-text{
		width:auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.profile-item-left{
		margin: 10px 5px 0 5px;
		display: flex;
	}
	
	.button-vip{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.profile-item-button,.profile-item-button-1{
		width:100%;
		height: 100%;
	}
	.profile-item-button-1{
	}
	
	.profile-item-info{
		display: flex;
		flex-direction: column;
		flex-direction: row-reverse;
		font-size: 12px;
		color: #999;
		// font-weight: 700;
	}
	.span-t{
		margin-left: 10px;
		color:#555;
		font-size: 16px;
		font-weight: 900;
	}
	.span-t1{
		margin-left: 10px;
		font-size: 12px;
		font-weight: 900;
		color:#999;
	}
	.profile-item-time{
		margin-left: 10px;
		width:100%;
		font-size: 12px;
		color: #999;
		font-weight: 900;
	}
	.profile-item-state{
		display: flex;
		flex-direction: row-reverse;
		font-size: 14px;
		width:100%;
		font-weight: 900;
		color:#555;
	}
	
</style>

