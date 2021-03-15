<template>
	<div id='money-profile'>
		<div class='header' :style='{backgroundColor:this.$store.state.color}'>
			<div class='headerx'>
				<div class='header-c'>
					<div class='header-c-t'>可提现收入（元）</div>
					<div class='header-c-num'>{{total.toFixed(2)}}</div>
				</div>
				<div class='header-b' @click='toWithdrawal'>提现</div>
			</div>
			<div class='header-c-remind'>{{totala}}元奖励审核中（奖励需24h审核后可提现）</div>
		</div>
		<div class='content'>
			<div class='content-nav'>
				<router-link to="/moneyprofilepage" replace class='tabbar-item-text' active-class="active" exact>收入明细</router-link>
				<router-link to="/moneyprofilepage/moneyRecord" replace class='tabbar-item-text' active-class="active" exact>提现记录</router-link>
			</div>
			<router-view/>
		</div>
		<div class='footer'></div>
		<div class='mask' v-if='show'>
			<div class='mask-content'>
				<div class='closex'>
					<span class='closexx' @click='toClose'>×</span>
				</div>
				<div class='mask-t'>确认收款支付宝信息</div>
				<div class='mask-info'>
					<div class='info-name'>{{agentName}}</div>
					<div class='info-alipay'>{{agentAlipay}}</div>
					<div class='info-remind'>
						<span>如果信息有误，</span>
						<span :style='{color:this.$store.state.color}' @click='toUpdateAlipay'>去这里修改</span>
					</div>
				</div>
				<div class='sub-title'>佣金将发放至绑定的支付宝账户</div>
				<button class='confirmx' @click='toConfirm'>确定</button>
			</div>
		</div>
		<div class='mask' v-if='show1'>
			<div class='mask-content'>
				<div class='mask-t'>提现成功</div>
				<div class='mask-info'>
					<div class='info-name'>佣金需要人工客服的审核，预计一个工作日以内到账</div>
				</div>
				<button class='confirmx' @click='toConfirmx'>确定</button>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'MoneyProfilePage',
	components: {
		// HelloWorld
	},
	data(){
		return {
			state:'',
			total:0,
			totala:0,
			show:false,
			show1:false,
			agentName:'',
			agentAlipay:'',
			
			
		}
	},
	created() {
		this.$loading.show();
		this.getData();
	},
	methods:{
		getData(){
			let that = this;
			let agentID = window.localStorage['agentID'];
			let productsId = window.localStorage['productsId'];
			that.axios.post('/api/getNotWithdrawalTotal',{agentID:agentID,productsId:productsId})
			.then(function(res){
				if(res.data.code===500){
					that.$loading.hide();
					that.$message.info('出错了');
					return;
				}
				that.total = res.data.total;
				that.totala = res.data.totala;
				that.$loading.hide();
				
			})
		},
		toWithdrawal(){
			if(this.total == 0){
				this.$message.info('没现可提');
				return;
			}
			let agentID = window.localStorage['agentID'];
			let productsId = window.localStorage['productsId'];
			let that = this;
			this.axios.post('/api/getalipay',{agentID:agentID,productsId:productsId})
				.then(function(res){
					if(res.data.code===500){
						that.$message.info('系统故障');
						return;
					}
				
					that.agentName = res.data.agentName; 
					that.agentAlipay = res.data.agentAlipay;
					that.show = true;
					return;
				
				
				})
			
		},
		toClose(){
			this.show = false;
		},
		toUpdateAlipay(){
			this.$router.push({name:'BindAlipay'});
		},
		toConfirm(){
			let that = this;
			let agentID = window.localStorage['agentID'];
			let productsId = window.localStorage['productsId'];
			if(this.agentName == '未设置'||this.agentAlipay == '未绑定'){
				this.$message.info('账户不对');
				return;
			}
			
			that.axios.post('/api/confirmWithdrawal',{agentID:agentID,productsId:productsId})
			.then(function(res){
				if(res.data.code===500){
					that.$message.info('出错了');
					return;
				}
				
				that.total = 0 ;
				that.show = false;
				that.show1 = true;
				that.$message.info('提现成功');
				return;
				
			})
			
			
		},
		toConfirmx(){
			this.show1 = false;
		}
	},
	mounted() {
		
	}
}
</script>

<style lang="less" scoped>
#money-profile{
	width:100vw;
	min-height: 100vh;
	background-color: #F2F5FA;
	display: flex;
	flex-direction: column;
	align-items: center;
}

/* header部分 */
.header{
	width:100vw;
	height: 160px;
	background-color: #1476FE;
	padding:25px 20px 25px 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 0 5px 6px 0 rgba(15,60,181,.3);
	
}
.headerx{
	width:100%;
	height: 110px;
	padding:0px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.header-c-t{
	color:#fff;
	font-size: 16px;
}

.header-c-num{
	font-family: DXMfont-Bold;
	color:#fff;
	font-size: 42px;
}

.header-c-remind{
	width: 100%;
	color:#fff;
	font-size: 13px;
}

.header-b{
	width:90px;
	height: 30px;
	border-radius: 20px;
	color:#1476FE;
	font-size: 14px;
	background-color: #fff;
	text-align: center;
	line-height: 30px;
	font-weight: 900;
}

/* content部分 */
.content{
	margin-top:20px;
	width:90vw;
	min-height: calc(100vh - 180px);
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 0px 16px 0 rgba(15,60,181,.1);
	
}
.content-nav{
	display: flex;
	width:100%;
	height: 60px;
	background-color: #fff;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	box-shadow: 0 1px 4px 0 rgba(15,60,181,.1);
}

.tabbar-item-text{
	height: 100%;
	width:50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	color: #4f4f4f;
	
}
.active{
	position: relative;//给当前元素添加相对定位,也就是after的父级
	font-weight: 900;
	color: #1476FE;
	&:after {
		content: " ";
		width: 30px;
		height: 0.22rem;
		background: #1476FE;
		position: absolute;
		bottom: -0.1rem;
		left: 50%;
		transform: translateX(-50%);//居中处理
	}
}

.mask{
	position: fixed;
	top:0px;
	z-index: 1000;
	width:100vw;
	height: 100vh;
	background-color:rgba(0,0,0,.5);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.mask-content{
	width:80%;
	height: auto;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding:15px 20px 35px 20px;
	border-radius: 10px;
}
.closex{
	width:100%;
	display: flex;
	flex-direction: row-reverse;
}

.closexx{
	display: inline-block;
	width:20px;
	height: 30px;
	text-align: center;
	line-height: 10px;
	padding:-5px 0px 10px 0px;
	font-size: 30px;
	color:#999;
}
.mask-t{
	font-size: 18px;
	color: #333;
}
.mask-info{
	margin-top: 20px;
	width:100%;
	height: auto;
	padding:20px 20px 10px 20px;
	background-color: #f8f8f8;
	border-radius: 5px;
}
.info-name,.info-alipay{
	font-size: 18px;
	font-weight: 900;
	color:#555;
}
.info-remind{
	margin:10px 0 10px 0px;
	font-size: 16px;
	color:#666;
	
}
.sub-title{
	margin-top:30px;
	font-size: 14px;
	color:#888;
	
}
.confirmx{
	margin-top:10px;
	width:100%;
	height: 42px;
	background-color: #FF654D;
	color:#fff;
	font-size: 18px;
	border:none;
	border-radius:5px;
}

	
</style>
