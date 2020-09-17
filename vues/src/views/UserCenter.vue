<template>
	<div class="center">
		<div class='center-userinfo'>
			<img :src="userInfo.agentAvatarImg" alt="头像">
			<div class='userinfo-name'>{{userInfo.agentName}}</div>
			<div class='total-data'>
				<div class='total-half total-line' @click='SeeSales'>
					<div class='total-half-half total-sales' :style="{color:color}">4987000</div>
					<div class='total-half-half total-sales-title'>销售总额</div>
				</div>
				<div class='total-half total-linea' @click='SeeTeam'>
					<div class='total-half-half total-sales' :style="{color:color}">1897</div>
					<div class='total-half-half total-sales-title'>团队人数</div>
				</div>
			</div>
		</div>
		<div class='center-menu'>
			<div class='set-row set-promotion' v-if='userInfo.isVIP' @click='VipEdit'>
				<div>推广配置</div>
				<div class='arrow'>〉</div>
			</div>
			<div class='set-row binding-wechat' @click='BindWX'>
				<div>绑定收款微信号</div>
				<div class='arrow'>〉</div>
			</div>
			<div class='set-row set-up' @click='UserSetup'>
				<div>设置</div>
				<div class='arrow'>〉</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	
import {mapState} from 'vuex';
	
export default {
	name: 'Center',
	components: {
		// HelloWorld
	},
	data(){
		return {
			
		}
	},
	methods:{
		SeeSales(){
			this.$router.push({name:'SeeSales',params:{userId:this.userInfo.agentPhoneNumber}});
		},
		SeeTeam(){
			this.$router.push({name:'SeeTeam',params:{userId:this.userInfo.agentPhoneNumber}});
		},
		BindWX(){
			this.$router.push({name:'BindWX'});
		},
		UserSetup(){
			this.$router.push({name:'UserSetup'});
		},
		VipEdit(){
			this.$router.push({name:'VipEdit'});
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
	.center{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.center-userinfo{
		position: relative;
		width:100vw;
		height: 260px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 8px 0 rgba(0,0,0,0.10), 0 0 10px 0 rgba(0,0,0,0.1), 0px 1px 1px 2px rgba(222,222,222,0.10);
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	.center-userinfo img{
		margin-top:10px;
		width:80px;
		height: 80px;
		border-radius: 40px;
	}
	.userinfo-name {
		margin-top:10px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		font-weight: 900;
		color: #999;
	}
	.total-data{
		margin-top:20px;
		width:80vw;
		height: 70px;
		display: flex;;
	}
	.total-half{
		width:50%;
		height: 100%;

	}
	.total-line{
		border-right: 1px solid #fff;
		background:linear-gradient(to bottom,#eee,#fff);
	}
	.total-linea{
		border-left: 1px solid #fff;
		background:linear-gradient(to top,#eee,#fff);
	}
	.total-half-half{
		width:100%;
		height: 50%;
		text-align: center;
		line-height: 35px;
	}
	.total-sales{
		font-size: 22px;
		font-weight: 900;
		color: #1476fe;
	}
	.total-sales-title{
		font-size: 16px;
		font-weight: 900;
		color: #999;
	}
	.center-menu{
		width:100vw;
		height: auto;
		margin-top:30px;
		padding: 0 20px 0 30px;
		background-color: #fff;
		// border-radius: 10px;
		box-shadow: 0 0 8px 0 rgba(0,0,0,0.10), 0 0 0px 0 rgba(0,0,0,0.1), 0px 1px 1px 2px rgba(222,222,222,0.10);
	}
	.set-row{
		width:calc(100vw - 50px);
		height: 65px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		font-weight: 900;
		color: #666;
		background-color: #fff;
	}
	.binding-wechat,.set-up{
		border-top: 1px solid #eee;
	}
	.arrow{
		color: #666;
		font-weight: 900;
		font-size: 16px;
	}
</style>