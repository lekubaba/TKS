<template>
	<div class="audit">
		<div class='profile'>
			<div class='profile-item' v-for = 'item in datas'>
				<div class='head-info'>
					<div class='head-infoa'>
						<img class='profile-item-avatar' :src="item.agentID.agentAvatarImg">
						<div class='head-n'>
							<div class='span-t'>{{item.agentID.agentName}}</div> 
							<div class='span-t1'>{{item.agentID.agentNickname}}</div>
							<div class='profile-item-time'>{{item.agentID.agentAlipay}}</div>
						</div>
					</div>
					<div class='profile-item-text'>
							<div class='profile-item-state'>提现金额 : {{item.howMuch}}</div>
							<div class='profile-item-state'>发放状态 : {{item.isFa?'佣金已发放':'佣金未发放'}}</div>
						<div class='profile-item-info'>
							<div class='time-info'>{{item.time}}</div>
						</div>
					</div>
				</div>
				<div class='profile-item-content' :data-id='item._id' :data-isfa = 'item.isFa?1:0' :data-agentname='item.agentID.agentName' :data-alipay='item.agentID.agentAlipay'>
					<div class='profile-item-button-1' @click='feedback' v-if='isVIP'></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

export default {
	name: 'DataProfile',
	components: {
		// HelloWorld
	},
	props:['datas','isVIP'],
	data(){
		return {
			color:this.$store.state.color,
		}
	},
	created() {
	},
	beforeRouteEnter (to, from, next) {
	  if(window.localStorage['isVIP']=="true"){
		  next();
		  return;
	  }
	  next({name:"Promotion"});
	},
	methods:{
		feedback(event){
			let cashID = event.currentTarget.parentNode.dataset.id;
			let isFa = event.currentTarget.parentNode.dataset.isfa;
			let agentName = event.currentTarget.parentNode.dataset.agentname;
			let agentAlipay = event.currentTarget.parentNode.dataset.alipay;
			this.$router.push({name:'CashRecord',query:{cashID:cashID,isFa:isFa,agentName:agentName,agentAlipay:agentAlipay}});
		},
	},
	mounted() {

	}

	
}
</script>
<style scoped lang="less">
	.audit{
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
	
	.profile-item{
		position: relative;
		top:0px;
		margin:10px 0 10px 0 ;
		width:100%;
		height: auto;
		display: flex;
		flex-direction: column;
		padding:10px 10px 0 0;
		background-color: #fff;
		border-top:1px solid rgba(218,224,234,.5);
	}
	.profile-item:first-child{
		border-top: none;
	}
	.head-info{
		width:100%;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.head-infoa{
		width:100%;
		height: 62px;
		display: flex;
		align-items: center;
	}
	.profile-item-avatar{
		width:62px;
		height:62px;
		border-radius: 36px;
		border:3px solid #fff;
		box-shadow: 0 0 6px 0 rgba(0,0,0,.2);
		
	}
	.profile-item-content{
		position: absolute;
		top:10px;
		width:96%;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	
	}
	.profile-item-text{
		width:100%;
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

