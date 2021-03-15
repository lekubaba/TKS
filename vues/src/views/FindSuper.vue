<template>
	<div class='find'>
		<div class='put'>
			<input class='search' type="number" placeholder="输入代理手机号" @input="toSearch" ref='tel' onkeyup="this.value=this.value.replace(/[, ]/g,'')" @change="onChange">
		</div>
		<Loading v-bind:show='isLoading' v-bind:show2='isLoading2'/>
		<div class='items'>
			<div class='profile'>
				<div class='profile-item' v-for = '(item,index) in userList'>
					<div class='head-info'>
						<div class='head-infoa'>
							<img class='profile-item-avatar' :src="item.agentID.agentAvatarImg">
							<div class='head-n'>
								<div class='span-t'>{{item.agentID.agentNickname}}</div> 
								<div class='span-t1'>{{item.agentID.agentWechat}}</div>
								<div class='profile-item-time'>{{item.agentID.agentCity}},{{item.managerLevel===100?'暂无职位':item.managerLevel===0?'城市代理':item.managerLevel===1?'城市经理':item.managerLevel===2?'城市总监':'城市独家'}}</div>
							</div>
						</div>
						<div class='profile-item-text'>
								<div class='profile-item-state'>层级 : {{item.level}}</div>
								<div  class='profile-item-state'>业绩 : {{item.sales}}</div>
							<div class='profile-item-info'>
								<div class='time-info'>{{item.time}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Loading from '../components/Loading.vue';
	export default {
		name: 'FindSuper',
		components: {
			Loading
		},
		data(){
			return {
				isLoading:false,
				isLoading2:true,
				userList:[],
				
			}
		},
		beforeRouteEnter (to, from, next) {
		  if(window.localStorage['isVIP']=="true"){
			  next();
			  return;
		  }
		  next({name:"Promotion"});
		},
		methods:{
			toSearch(){
				let that = this;
				let tel = this.$refs.tel.value;
				let productsId = window.localStorage['productsId'];
				let isTel = this.$Utils.checkTel(tel);
				if(!isTel){
					this.isLoading = true;
				}else{
					this.axios.post('/api/findSuperFunction',{tel:tel,productsId:productsId})
					.then(function(res){
						if(res.data.code===500){
							that.$message.info('系统异常');
							return;
						}
						if(res.data.code===100){
							that.isLoading = false;
							that.$message.info('无此用户');
							return;
						}
						
						that.userList = res.data.userList;
						
					})
				}
				
			},
			onChange(){
				this.isLoading = false;
			}
		},
		created() {
			
		},
		mounted(){
	
		}
	}
</script>

<style scoped lang="less">
	.find{
		padding:20px 0 0 0;
		width:100vw;
		min-height: 100vh;
		background-color: #F2F5FA;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
		color: #999;
	}
	.put{
		width:90vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 30px;
		box-shadow: 0 5px 6px 0 rgba(15,60,181,.3);
		
	}
	.search{
		height: 38px;
		width:100%;
		border:none;
		border-radius: 30px;
		text-align: center;
		line-height: 38px;
		font-size: 17px;
		color: #666;
		font-weight: 900;
	}
	
	.items{
		margin-top: 30px;
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
