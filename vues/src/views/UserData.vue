<template>
	<div class="data">
		<div class='total'>
			<div class='total-all'>
				<span class='gray'>今日申请数</span>
				<span class='colorful' :style="{color:color}">{{dayCount?dayCount:'0'}}</span>
			</div>
			<div class='total-all'>
				<span class='gray'>申请总数</span>
				<span class='colorful' :style="{color:color}">{{count?count:'0'}}</span>
			</div>
		</div>
		<div class='profile'>
			<div class='profile-item' v-for = 'item in customerList'>
				<img class='profile-item-avatar' :src="item.customerID.customerAvatarImg">
				<div class='profile-item-content'>
					<div class='profile-item-text'>
						<div class='profile-item-info'>{{item.customerName}} {{item.orderTime}}</div>
						<div class='profile-item-wraper'>
							<div class='profile-item-left'>
								<div class='profile-item-time'>{{item.customerDesensitizationNumber}}</div>
								<div class='profile-item-state' :style="{color:color}">金额：{{item.orderMoney?item.orderMoney:'暂无'}}</div>
							</div>
							<div class='button-vip' :data-id='item._id' :data-mode='item.mode'>
								<div class='profile-item-button' @click='progressing' :style="{backgroundColor:color}" v-if="item.mode=='tra'" >进度</div>
								<div class='profile-item-button-1' @click='feedback' v-if='userInfo.isVIP' :style="{backgroundColor:color}" >反馈</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Loading v-bind:show='isLoading' v-bind:show2='isLoading2'/>
	</div>
</template>
<script>
import {mapState} from 'vuex';
import Loading from '../components/Loading.vue'
export default {
	name: 'Data',
	components: {
		Loading
	},
	data(){
		return {

			dayCount:'',
			count:'',
			customerList:[],
			isLoading:false,
			isLoading2:true,
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
	},
	methods:{
		fetchData(){
			let that = this;
			let openID=this.userInfo.openID;
			this.axios.post('/api/userData',{openID:openID})
				.then(function(response){
					that.$loading.hide();
					if(response.data.code===500){
						that.$message.info('系统故障了');
						return;
					}
					that.customerList = response.data.orders;
					that.dayCount = response.data.dayCount;
					that.count = response.data.count;
					
				})
		},
		feedback(event){
			let orderID = event.currentTarget.parentNode.dataset.id;
			let mode = event.currentTarget.parentNode.dataset.mode;
			this.$router.push({name:'FeedBack',query:{orderID:orderID,mode:mode}});
		},
		progressing(event){
			let orderID = event.currentTarget.parentNode.dataset.id;
			let mode = event.currentTarget.parentNode.dataset.mode;
			this.$router.push({name:'Profile',query:{orderID:orderID,mode:mode}});
		},
		scroll() {
			let that = this;
			let openID = window.localStorage['openID'];
			window.onscroll = () => {
				// 距离底部100px时加载一次
				let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 100
				if (bottomOfWindow&&that.isLoading == false) {
					that.isLoading = true;
					let count = that.customerList.length;
					that.axios.post('/api/userDatas',{openID:openID,num:count})
					.then(function(res){
						if(res.data.code===500){
							that.$message.info('系统故障了');
							return;
						}
						if(res.data.orders.length===0){
							that.isLoading2 = false;
							return;
						}
						that.customerList = that.customerList.concat(res.data.orders)
						that.isLoading = false;
						
					})
				}
			}
		}

	},
	mounted() {
		this.scroll()
	}

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
		height: 65px;
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
