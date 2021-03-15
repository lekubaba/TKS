<template>
	<div class="data">
		<div class='total' :style='{backgroundColor:color}'>
			<div class='t1'>总金额</div>
			<div class='t2'>{{total}}</div>
			<div class='t3'>上个月需要发放的总管理奖金</div>
		</div>
		<div class="audit">
			<div class='profile'>
				<div class='production' v-if='bonusList.length===0'>
					<div class='remindx'>每月可生成一次上个月的管理奖金，一个月只能生成一次，生成以后，总监和独家将会看到管理收益，并在24小时后可提现。</div>
					<div class='remind'>您还没有生成上个月的管理佣金。</div>
					<div class='production-bonus' :style='{backgroundColor:color}' @click='toProductionBonus'>生成上月管理佣金</div>
				</div>
				<div class='profile-item' v-for = 'item in bonusList'>
					<div class='head-info'>
						<div class='head-infoa'>
							<img class='profile-item-avatar' :src="item.agentID.agentAvatarImg">
							<div class='head-n'>
								<div class='span-t'>{{item.agentID.agentName}}</div> 
								<div class='span-t1'>{{item.agentID.agentNickname}}</div>
								<div class='profile-item-time'>{{item.agentID.agentPhoneNumber}}</div>
							</div>
						</div>
						<div class='profile-item-text'>
								<div class='profile-item-state'>管理佣金 : {{item.howMuch}}</div>
								<div class='profile-item-state'>提现状态 : {{item.isOut?'已提现':'未提现'}}</div>
							<div class='profile-item-info'>
								<div class='time-info'>{{item.inTime}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Loading v-bind:show='isLoading' v-bind:show2='isLoading2'/>
		<transition name='fade'>
			<div class='mask' v-if='mask1'>
				<div class='mask-contenta'>
					<div class='mask-titlea' :style="{color:color}">确定生成？</div>
					<div class='mask-titleb'>一个月计算一次管理佣金</div>
					<div class='mask-button'>
						<div class='mask-cancel' @click='isCancel' :style="{color:color}">取消</div>
						<div class='mask-confirm' @click='isConfirm' :style="{backgroundColor:color}">确认</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import {mapState} from 'vuex';
import Loading from '../components/Loading.vue';
export default {
	name: 'ManagerBonus',
	components: {
		Loading
	},
	data(){
		return {
			isLoading:false,
			isLoading2:true,
			bonusList:[],
			total:0,
			mask0:false,
			mask1:false,
		}
	},
	beforeRouteEnter (to, from, next) {
		if(window.localStorage['isVIP']=="true"){
			next();
			return;
		}
		next({name:"Promotion"});
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
			let agentID=window.localStorage['agentID'];
			let productsId = window.localStorage['productsId'];
			this.axios.post('/api/getManagerCommissionProfile',{agentID:agentID,productsId:productsId})
				.then(function(response){
					that.$loading.hide();
					if(response.data.code===500){
						that.$message.info('系统故障了');
						window.localStorage.clear();
						return;
					}
					that.bonusList = response.data.bonus;
					that.total = (response.data.total).toFixed(2);
					
				})
		},

		scroll() {
			let that = this;
			let agentID = window.localStorage['agentID'];
			let productsId = window.localStorage['productsId'];
			window.onscroll = () => {
				// 变量scrollTop为当前页面的滚动条纵坐标位置
				let scrollTop =
				  document.documentElement.scrollTop || document.body.scrollTop;
				// 变量 windowHeight 是可视区的高度
				let windowHeight =
				  document.documentElement.clientHeight || document.body.clientHeight;
				// 变量 scrollHeight 是滚动条的总高度
				let scrollHeight =
				  document.documentElement.scrollHeight || document.body.scrollHeight;
				// 距离底部100px时加载一次
				let bottomOfWindow =  scrollHeight -(scrollTop + windowHeight)<=100;
				if (bottomOfWindow&&that.isLoading == false) {
					that.isLoading = true;
					let count = that.bonusList.length;
				
					that.axios.post('/api/getManagerCommissionProfile_plus',{agentID:agentID,productsId:productsId,num:count})
					.then(function(res){
						if(res.data.code===500){
							that.$message.info('系统故障了');
							that.isLoading = false;
							return;
						}
						if(res.data.bonus.length===0){
							that.isLoading2 = false;
							return;
						}
						that.bonusList = that.bonusList.concat(res.data.bonus)
						that.isLoading = false;
						
					})
				}
			}
		},
		toProductionBonus(){
			this.mask1 = true;
		},
		isCancel(){
			this.mask1 = false;
		},
		isConfirm(){
			let that = this;
			let isLive = window.localStorage['isLive'];
			if(isLive){
				that.$message.info('生成过了');
				return;
			}
			let agentID = window.localStorage['agentID'];
			let productsId = window.localStorage['productsId'];
			window.localStorage.setItem('isLive',true);
			that.axios.post('/api/batchComputingBonus',{agentID:agentID,productsId:productsId})
			.then(function(res){
				
				if(res.data.code===500){
					that.mask1 = false;
					window.localStorage.removeItem('isLive');
					that.$message.info('系统异常');
					return;
				}
				
				if(res.data.code===100){
					that.mask1 = false;
					window.localStorage.removeItem('isLive');
					that.$message.info('生成过了');
					return;
				}
				
				if(res.data.code===101){
					that.mask1 = false;
					window.localStorage.removeItem('isLive');
					that.$message.info('无管理员');
					return;
				}
				
				that.fetchData();
				that.mask1 = false;
				window.localStorage.removeItem('isLive');
				that.$message.success('生成成功');
				
			})
			
			
		}

	},
	mounted() {
		this.scroll();
		
	},
	watch:{
		
	},

}
</script>
<style scoped lang="less">
	.data{
		width:100vw;
		min-height: 100vh;
		background-color: #F2F5FA;
		padding-bottom: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.total{
		margin-top:20px;
		width:90vw;
		height: 150px;
		background-color: #1476FE;
		border-radius: 15px;
		padding:30px 20px 30px 20px;
		box-shadow: 0 5px 6px 0 rgba(15,60,181,.3);
	}
	.t1{
		color:#fff;
		font-size: 16px;
	}
	.t2{
		font-family: DXMfont-Bold;
		color:#fff;
		font-size: 28px;
		font-weight: 900;
	}
	.t3{
		color:#fff;
		font-size: 12px;
	}
.audit{
		margin-top:20px;
		width:100vw;
		min-height:auto;
		// background-color: #F2F5FA;
		padding-bottom: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		
	}
	.profile{
		width:90%;
		height: auto;
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
		padding:0 10px 0 10px;
		box-shadow: 0 5px 6px 0 rgba(15,60,181,.3);
		
	}
	.remindx{
		margin:20px 0 10px 0px;
		width:100%;
		height: auto;
		padding:15px 20px 15px 20px;
		background-color: #F2F5FA;
		font-size: 14px;
		color:#555;
		text-align: justify;
	}
	.production{
		width:100%;
		height: 300px;
		margin-bottom: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
	}
	.remind{
		color:#555;
		font-size: 12px;
		padding:30px;
	}
	
	.production-bonus{
		height: 50px;
		width:80%;
		background-color: #FF654D;
		color:#fff;
		text-align: center;
		line-height: 50px;
		border-radius: 40px;
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
	
	/* mask */
	.mask{
		position: fixed;
		bottom:0px;
		width:100vw;
		height: calc(100vh + 250px);
		background-color: rgba(0,0,0,.7);
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		// justify-content:center;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .3s,bottom .3s;
		// transition: opacity .3s;
	}
	.fade-enter{
		bottom:-250px;
		opacity: 0;
	}
	.fade-enter-to{
		bottom:0px;
	}
	.fade-leave{
		bottom: 0px;
	}
	.fade-leave-to {
		bottom:-250px;
		opacity: 0;
	}
	
	.mask-contenta{
		position: relative;
		bottom: 0px;
		transition: bottom 3s;
		width:100vw;
		height: 250px;
		background-color: rgb(247,247,247);
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.mask-titlea{
		margin-top:40px;
		font-size: 24px;
		font-weight: 900;
		color: #1476fe;
	}
	.mask-titleb{
		margin-top:5px;
		font-size: 13px;
		font-weight: bolder;
		color: #999;
	}
	.mask-button{
		position: absolute;
		bottom: 0px;
		width:100%;
		height: 120px;
		display: flex;
		flex-direction: row;
		// border:1px solid red;
		align-items: center;
		justify-content: center;
	}
	.mask-cancel,.mask-confirm{
		width:30%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 16px;
		font-weight: 900;
		cursor: pointer;
		border-radius: 5px;
		margin:0 10px 0 10px;
	}
	.mask-cancel{
		
		color: #1476FE;
		background-color: #eee;
		
		
	}
	.mask-confirm{
		color: #fff;
		background-color: #1476FE;
	}
	
</style>
