<template>
	<div class="sales">
		<div class='profile'>
			<div class='profile-item' v-for = 'item in sales'>
				<div class='head-info'>
					<img class='profile-item-avatar' :src="item.customerID.customerAvatarImg">
					<div class='profile-item-info'>
						<div class='info-name'>
							<span class='name-a'>{{item.customerName}}</span>
							<span class='name-b'>{{item.customerDesensitizationNumber}}</span>
						</div>
					</div>
				</div>
				<div class='profile-item-content'>
					<div class='profile-item-text'>
						<div class='profile-item-wraper'>
							<div class='profile-item-left'>
								<div class='profile-item-state'>
									<div class='sup'>出额：{{item.eDu?item.eDu:'暂无额度'}}</div>
									<div class='sup'>借款金额：{{item.orderMoney?item.orderMoney:'暂无'}}</div>
								</div>
								<div class='profile-item-time'>
									<div class='sub'>推荐人：{{item.agentID.agentNickname}}</div>
									<div class='sub'>微信：{{item.agentID.agentWechat?item.agentID.agentWechat:"没设置微信"}}</div>
								</div>
								<div class='t-time'>推荐时间：{{item.orderTime}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

export default {
	name: 'SalesProfile',
	components: {
		// HelloWorld
	},
	props:['sales'],
	data(){
		return {
			color:this.$store.state.color,
			isLoan:true,
			eDu:30000,
		}
	},
	created() {
	},
	methods:{
	},

	
}
</script>
<style scoped lang="less">
	.sales{
		width:100vw;
		height: auto;
		background-color: rgb(237,237,237);
		padding-bottom: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.profile{
		width:92vw;
		background-color: rgb(247,247,247);
		padding-bottom: 20px;
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
		
	}

	.profile-item{
		width:100%;
		height: auto;
		display: flex;
		flex-direction: column;
		padding:5px 10px 0 10px;
		align-items: center;
		justify-content: center;
	}
	.head-info{
		width:100%;
		height: 70px;
		display: flex;
		align-items: center;
	}
	.profile-item-avatar{
		width:52px;
		height:52px;
		border-radius: 31px;
		border:3px solid #fff;
		
	}
	.profile-item-content{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width:100%;
		height: 80px;
		padding:0px 0 5px 6px;
		background-color: rgb(239,242,243);
		border-bottom:.5px dashed #999;
	
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
		width:120px;
		justify-content: space-between;
	}
	
	.profile-item-info{
		width:calc(100% - 52px - 6vw);
		font-size: 12px;
		color: #999;
		font-weight: 700;
		display: flex;
		justify-content: space-between;
	}
	.info-name{
		margin-left: 5px;
		width:auto;
		height: 52px;
		display: flex;
		flex-direction: column;
	}
	.name-a{
		font-size: 16px;
		font-weight: 900;
		color:#555;
	}
	.name-b{
		font-size: 14px;
		color:#777;
	}
	.profile-item-state{
		margin-top: 10px;
		display: flex;
		width:85vw;
	}
	.profile-item-time{
		margin-top:1px;
		display: flex;
		font-size: 12px;
		color: #999;
	}
	.sup{
		width:50%;
		font-size: 16px;
		font-weight: 900;
		color: #555;
		
	}
	.sub{
		width:50%;
		font-size: 12px;
		font-weight: 900;
		color: #999;
	}
	.t-time{
		margin-top: 2px;
		font-size: 10px;
		color: #999;
	}
	
</style>

