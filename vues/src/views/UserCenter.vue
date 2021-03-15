<template>
	<div class="center">
		<div class='center-userinfo'>
			<div class='hellorow'>
				<div class='userinfo-name'>
					<span class='nickname-a'>{{userInfo.agentName}}</span> 
					<span class='grade'>{{managerLevel===100?'暂无职位':managerLevel===0?'城市代理':managerLevel===1?'城市经理':managerLevel===2?'城市总监':'城市独家'}}</span>
				</div>
				<img :src="userInfo.agentAvatarImg" alt="头像">
			</div>
			
			<div class='total-data'>
				<div class='total-half total-line' @click='SeeSales'>
					<div class='total-half-half total-sales' :style="{color:color}">{{sales?sales:'0'}}</div>
					<div class='total-half-half total-sales-title'>销售总额</div>
				</div>
				<div class='total-half total-linea' @click='SeeTeam'>
					<div class='total-half-half total-sales' :style="{color:color}">{{agents?agents:'0'}}</div>
					<div class='total-half-half total-sales-title'>团队人数</div>
				</div>
				<div class='total-half total-line' @click='toPaiFa' v-if='managerLevel===0||managerLevel===1||managerLevel===2||managerLevel===3'>
					<div class='total-half-half total-sales' :style="{color:color}">{{activityNumber}}</div>
					<div class='total-half-half total-sales-title'>地推详情</div>
				</div>

			</div>
		</div>
		<div class='center-menu'>
			<div class='set-row set-promotion' v-if='isBusiness' @click='VipEdit'>
				<div>推广配置</div>
				<div class='arrow'>〉</div>
			</div>
			<div class='set-row binding-wechat' v-if='managerLevel===2||managerLevel===3' @click='toSetCityJinLi'>
				<div>添加城市经理</div>
				<div class='arrow'>〉</div>
			</div>
			<div class='set-row binding-wechat' @click='toAccount' v-if='managerLevel===0||managerLevel===1||managerLevel===2||managerLevel===3'>
				<div>收款账户</div>
				<div class='arrow'>〉</div>
			</div>
			<div class='set-row binding-wechat' @click='ChangePromotion'>
				<div>切换推广</div>
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
	name: 'UserCenter',
	components: {
		// HelloWorld
	},
	data(){
		return {
			agents:'',
			sales:'',
			isBusiness:false,
			managerLevel:0,
			isVIP:false,
			isManager:false,
			activityNumber:0,
		}
	},
	created(){
		this.$loading.show();
		this.getData();
	},
	methods:{
		getData(){
			let agentID = window.localStorage['agentID'];
			let productsId = window.localStorage['productsId'];
			let that = this;
			this.axios.post('/api/usercenter',{agentID:agentID,productsId:productsId})
			.then(function(res){
				if(res.data.code==500){
					that.$loading.hide();
					that.$message.info('系统故障');
					window.localStorage.clear();
				}else{
					that.agents = res.data.agents;
					that.sales = res.data.sales;
					that.isBusiness = res.data.isBusiness;
					that.isVIP = res.data.isVIP;
					that.isManager = res.data.isManager;
					that.managerLevel = res.data.managerLevel;
					that.activityNumber = res.data.activityNumber;
					that.$loading.hide();
					return;
				}
			})
		},
		SeeSales(){
			this.$router.push({name:'SeeSales',params:{userId:this.userInfo.agentID}});
		},
		SeeTeam(){
			this.$router.push({name:'SeeTeam',params:{userId:this.userInfo.agentID}});
		},
		toPaiFa(){
			this.$router.push({name:'PaiFa',params:{activityNumber:this.activityNumber}});
		},
		toAccount(){
			this.$router.push({name:'Account'});
		},
		ChangePromotion(){
			this.$router.push({name:'MainPromotion'});
		},
		UserSetup(){
			this.$router.push({name:'UserSetup'});
		},
		toSetCityJinLi(){
			this.$router.push({name:'SetCityJinLi'});
		},
		VipEdit(){
			let that = this;
			let agentID = window.localStorage['agentID'];
			this.axios.post('/api/isbuildproducts',{agentID:agentID})
			.then(function(res){
				if(res.data.code===500){
					that.$message.info('系统出错了');
					return;
				}
				if(res.data.code===400){
					that.$router.push({ path:'/choisemode/tra' });
					return;
				}
				if(res.data.code===200){
					that.$router.push({name:'VipEdit'});
					return;
				}
			})
		},
	},
	computed:{
		...mapState({
			userInfo:state=>state.userInfo,
			color:state=>state.color,
		})
	},
	

}
</script>

<style scoped lang="less">
	.center{
		width:100vw;
		min-height: 100vh;
		background-color: #F2F5FA;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 100px;
		background: url('http://qiniu.tongkeapp.com/bg_5.png') no-repeat;
		background-size:100%;
	}
	
	.center-userinfo{
		position: relative;
		width:100vw;
		height: 250px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.hellorow{
		display: flex;
		width:90%;
		height: 120px;
		align-items: center;
		justify-content: space-between;
		
	}
	.center-userinfo img{
		width:80px;
		height: 80px;
		border-radius: 40px;
		margin-right: 20px;
		border:5px solid #fff;
	}
	.userinfo-name {
		margin-top:10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-weight: 900;
		color: #999;
		padding:0 20px 0 10px;
	}
	.nickname-a{
		font-size: 24px;
		font-weight: 900;
		color:rgb(88,102,103)
	}
	
	.grade{
		text-align: center;
		color:#1476FE;
		font-size: 10px;
	}
	.total-data{
		margin-top:20px;
		width:92vw;
		height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
	}
	.total-half{
		width:50%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}
	.total-half-half{
		width:100%;
		height: 30%;
		display: flex;
		align-items: center;
		justify-content: center;
		
	}
	.total-sales{
		font-size: 22px;
		font-weight: 900;
		color: #1476fe;
	}
	.total-sales-title{
		font-size: 18px;
		font-weight: 900;
		color: #666;
	}
	.center-menu{
		width:100vw;
		height: auto;
		margin-top:20px;
		padding: 0 20px 0 30px;
		// border-radius: 10px;
	}
	.set-row{
		width:calc(100vw - 50px);
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		font-weight: 900;
		color: #666;
	}
	.arrow{
		color: #666;
		font-weight: 900;
		font-size: 16px;
	}
</style>