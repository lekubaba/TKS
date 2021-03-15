<template>
	<div class="team">
		<div class='profile'>
			<div class='profile-item' v-for = 'item in team'>
				<div class='head-info'>
					<img class='profile-item-avatar' :src="item.agentID.agentAvatarImg">
					<div class='profile-item-circle' v-if='userInfo.isVIP' @dblclick='toManagementThing'></div>
					<div class='profile-item-info'>
						<div class='info-name'>
							<span class='name-a'>{{item.agentID.agentNickname}}</span>
							<span class='name-b'>{{item.agentID.agentWechat?item.agentID.agentWechat.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'):wechat}}</span>
							<span class='name-b' :style='{color:color}'>{{item.managerLevel===100?'暂无职位':item.managerLevel===0?'城市代理':item.managerLevel===1?'城市经理':item.managerLevel===2?'城市总监':'城市独家'}}</span>
						</div>
						<div class='copy-wx' v-if='item.bindNumber===0'>
							<span class="wechat-a" type="primary" text="复制" size="small"
							v-clipboard:copy="item.agentID.agentWechat?item.agentID.agentWechat:wechat"
							v-clipboard:success="onCopy"
							v-clipboard:error="onError" >复制</span>
						</div>
					</div>
				</div>
				<div class='body-info'>
					<div class='body-infoa'>
						<div class='profile-item-state'>团队人数：{{item.agentNum}}</div>
						<div class='profile-item-state'>个人业绩：{{item.sales}}</div>
					</div>
					<div class='body-infoa'>
						<div class='profile-item-timea'>发码数：{{item.activityNumber}}</div>
						<div class='profile-item-timea'>绑码数：{{item.bindNumber}}</div>
						<div class='profile-item-timea'>邀请数：{{item.inviteNum}}</div>
					</div>
					<div class='body-infob'>
						<div class='profile-item-time'>加入时间：{{item.time}}</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex';
export default {
	name: 'TeamProfile',
	components: {
		// HelloWorld
	},
	props:['team'],
	data(){
		return {
			wechat:'暂未设置微信',
			
		}
	},
	created() {
		
	},
	methods:{
		onCopy(){
			this.$message.info('复制成功');
		},
		onError(){
			this.$message.error('复制失败');
		},
		toManagementThing(){
			this.$message.info('开发中');
		},
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
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-weixin:before {
	  content: "\e6b9";
	}
	.team{
		width:100vw;
		height: auto;
		background-color: rgb(237,237,237);
		padding-bottom: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.profile{
		width:92vw;
		height: auto;
		background-color: rgb(247,247,247);
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.profile-item{
		margin: 10px;
		width:100%;
		height: auto;
		display: flex;
		flex-direction: column;
		padding:5px 10px 0 10px;
		
		

	}
	.head-info{
		position: relative;
		left: 0px;
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
	.profile-item-circle{
		position: absolute;
		left: 0px;
		width:52px;
		height:52px;
	}

	.button-vip{
		display: flex;
		width:120px;
		justify-content: space-between;
	}
	
	.profile-item-info{
		width:calc(100% - 52px);
		font-size: 12px;
		color: #999;
		font-weight: 700;
		display: flex;
		align-items: center;
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
		color:#333;
	}
	.name-b{
		font-size: 12px;
		color:#666;
	}
	.copy-wx{
		margin-right: 10px;
		color:#999;
	}
	.body-info{
		width:100%;
		height: 100px;
		background-color: rgb(239,242,243);
		padding:10px 0 0 10px
	}
	.body-infoa{
		width:100%;
		height: 26px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.body-infob{
		width:100%;
		height: 20px;
		display: flex;
		align-items: center;
	}
	.profile-item-timea{
		width:33.3333%;
		font-size: 14px;
		font-weight: 900;
		color: #666;
	}
	.profile-item-time{
		font-size: 12px;
		color: #666;
	}
	.profile-item-state{
		width:50%;
		font-size: 15px;
		font-weight: 900;
		color: #555;
	}
	
</style>


