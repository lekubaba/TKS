<template>
	<div class='paifa'>
		<div class='has-bind'>
			<div class='menu'>
				<div class='menu-in'></div>
			</div>
			<div class='container-y'>
				<div class='ticket'>
					总绑 ：{{activityNumber}} ，总邀 ：{{inviteNum}}
				</div>
				<div class='content-y' @scroll.passive="getScroll($event)" ref='content'>
					<div class='profile-item' v-for='item in bindList'>
						<div class='head-info'>
							<div class='head-infoa'>
								<img class='profile-item-avatar' :src="item.agentID.agentAvatarImg">
								<div class='head-n'>
									<div class='span-t1'>{{item.agentID.agentNickname}}</div>
									<div class='span-t1'>{{item.work}}</div>
								</div>
							</div>
							<div class='profile-item-text'>
									<div class='profile-item-state'>绑数 : {{item.bindNumber}} , 邀请 : {{item.inviteNum}}</div>
									<div class='profile-item-state'>业绩 : {{item.sales}} , 团队 : {{item.agentNum}}</div>
								<div class='profile-item-info'>
									<div class='time-info'>{{item.time}}</div>
								</div>
							</div>
						</div>
					</div>
					<Loading v-bind:show='isLoading' v-bind:show2='isLoading2'/>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import Loading from '../components/Loading.vue';
	export default {
		name: 'PaiFa',
		components: {
			Loading
		},
		data(){
			return {
				activityNumber:0,
				inviteNum:0,
				mask:false,
				bindList:null,
				isLoading:false,
				isLoading2:true,
			}
		},
		
		methods:{
			getData(){
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				let that = this;
				this.axios.post('/api/getPaiFaNumber',{agentID:agentID,productsId:productsId})
				.then(function(res){
					that.$loading.hide();
					if(res.data.code===500){
						that.$message.info('请求异常');
						return;
					}
					that.activityNumber = res.data.activityNumber;
					that.inviteNum = res.data.inviteNum;
					that.bindList = res.data.children;
					
					
				})
				
				
			},
			toCancel(){
				this.mask = false;
			},
			toOpen(){
				this.mask = true;
			},
			getScroll(event){
				let that = this;
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				let scrollBottom = event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight;
				
				if (scrollBottom<=50&&that.isLoading == false) {
					that.isLoading = true;
					let count = that.bindList.length;
					that.axios.post('/api/getPaiFaNumbers',{agentID:agentID,productsId:productsId,num:count})
					.then(function(res){
						if(res.data.code===500){
							that.$message.info('系统故障了');
							that.isLoading = false;
							return;
						}
						if(res.data.children.length===0){
							that.isLoading2 = false;
							return;
						}
						that.bindList = that.bindList.concat(res.data.children);
						that.isLoading = false;
						
					})
				}
			}
		},
		created() {
			this.$loading.show();
			this.getData();
		},
	}
</script>

<style scoped lang="less">
	
	.paifa{
		position: fixed;
		left: 0px;
		top:0px;
		padding:0px 30px 0px 30px;
		width:100vw;
		min-height: 100vh;
		background-color: #F2F5FA;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: linear-gradient(135deg,#FF3200 0%,#FF7301 100%);
	}
	.total{
		margin-bottom: 10px;
		width:100%;
		font-size: 30px;
		font-weight: 900;
		color:#fff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.has-bind{
		position: relative;
		top:0px;
		margin-top:20px;
		width:100%;
		min-height:300px;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.menu{
		
		width:100%;
		height: 35px;
		background-image: linear-gradient(180deg,#FEDCC2 0%,#FF3200 100%);
		border-radius: 30px;
		padding:8px;
		box-shadow: 0px 4px 0px 0px rgba(0,0,0,.1);
		
	}
	.menu-in{
		width:100%;
		height: 100%;
		background-color: #AE2F09;
		border-radius: 30px;
		border-top: 1px solid #FF3200;
		border-bottom:1px solid #FEDCC2;
		
	}
	.container-y{
		width:calc(100% - 35px);
		height:70px;
		position: absolute;
		top:8px;
		box-shadow: 0px 4px 3px 2px rgba(0,0,0,.1);
	}
	.ticket{
		font-family: DXMfont-Bold;
		z-index: 1000;
		width: 100%;
		height:50px;
		background-color: #FDEFE4;
		box-shadow: 0 17px 10px -8px #CBAB9B inset;
		display: flex;
		align-items: center;
		justify-content: center;
		color:#555;
		font-weight: 900;
		font-size: 18px;
		border-bottom: 1px dashed #CE9F83;
		
	}
	.content-y{
		padding:10px 15px 20px 15px;
		width:100%;
		height: calc(100vh - 200px);
		background-color: #fff;
		overflow-y: auto;
		overflow-x: hidden;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	
	/* list部分 */
	
	.profile-item{
		position: relative;
		top:0px;
		margin:10px 0 10px 0 ;
		width:100%;
		height: auto;
		display: flex;
		flex-direction: column;
		padding:10px 0px 0 0;
		background-color: #fff;
		border-top:1px solid rgba(218,224,234,.5);
	}
	.profile-item:first-child{
		border-top: none;
	}
	.head-info{
		width:100%;
		height: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.head-infoa{
		width:auto;
		height: 62px;
		display: flex;
		align-items: center;
	}
	.profile-item-avatar{
		width:42px;
		height:42px;
		border-radius: 36px;
		box-shadow: 0 0 6px 0 rgba(0,0,0,.2);
		
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
	
	.profile-item-state{
		display: flex;
		flex-direction: row-reverse;
		font-size: 12px;
		width:100%;
		font-weight: 900;
		color:#555;
	}
	.profile-item-info{
		display: flex;
		flex-direction: row-reverse;
		font-size: 12px;
		color: #999;
		// font-weight: 700;
	}
	.span-t1{
		margin-left: 10px;
		font-size: 12px;
		font-weight: 900;
		color:#555;
	}
	
	.need-read{
		position: absolute;
		bottom: 20px;
		font-size: 14px;
		color:#fff;
		text-decoration: underline;
		
	}

</style>
