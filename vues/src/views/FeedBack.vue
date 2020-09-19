<template>
	<div id='feedback'>
		<div class='feedback-wraper'>
			<div class='customer-info'>
				<img class='info-avatar' src="http://qiniu.tongkeapp.com/customerDefaultAvatar_01.png">
				<span class='span1'>{{customerInfo.customerName}}</span>
				<span class='span2' :style="{color:color}">{{customerInfo.customerPhoneNumber}}</span>
			</div>
			<h1 >告诉代理当前进度</h1>
			<div class='iscontact'>
				<div class='problem' :style="{color:color}">是否已联系了客户？</div>
				<div class='confirm' @click='isContactCustomer' data-contacted='contacted' :style="{backgroundColor:color}">已联系</div>
			</div>
			<div class='iscontact'>
				<div class='problem' :style="{color:color}">客户是否已签约？</div>
				<div class='confirm' @click='isSignUp' data-signed='signed' :style="{backgroundColor:color}">已签约</div>
			</div>
			<div class='iscontact'>
				<div class='problem' :style="{color:color}">订单金额为多少？</div>
				<div class='confirm' @click='enterTheAmount' :style="{backgroundColor:color}">输入订单金额</div>
			</div>
			<div class='iscontact'>
				<div class='problem' :style="{color:color}">给代理发佣金</div>
				<div class='confirm' @click='Commission' :style="{backgroundColor:color}">获取账户</div>
			</div>
			<div class='iscontact'>
				<div class='problem' :style="{color:color}">佣金是否已发放？</div>
				<div class='confirm' @click='isCommission' data-issued='issued' :style="{backgroundColor:color}">佣金已发放</div>
			</div>
		</div>
		<transition name='fade'>
			<div class='mask' v-if='mask.mask1'>
				<div class='mask-contenta'>
					<div class='mask-titlea' :style="{color:color}">{{stateTitle}}</div>
					<div class='mask-titleb'>提交以后代理将在进度里看到你的反馈</div>
					<div class='mask-button'>
						<div class='mask-confirm' @click='isConfirm' :data-state='state' :style="{color:color}">确认</div>
						<div class='mask-cancel' @click='isCancel' :style="{backgroundColor:color}">取消</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name='fade'>
			<div class='mask' v-if='mask.mask2'>
				<div class='mask-contenta'>
					<div class='mask2-title' :style="{color:color}">请输入金额(元)</div>
					<input class='mask-inputa' type="number" placeholder="输入签约金额" ref='money' onkeyup="this.value=this.value.replace(/[, ]/g,'')" :style="{borderColor:color}">
					<div class='mask-button'>
						<div class='mask-confirm' @click='isConfirmtwo' :style="{color:color}">确认</div>
						<div class='mask-cancel' @click='isCanceltwo' :style="{backgroundColor:color}">取消</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name='fade'>
			<div class='mask' v-if='mask.mask3'>
				<div class='mask-contentb'>
					<div class='wxnumber' :style="{color:color}">收款微信号</div>
					<div class='row'>
						<div class='column1'></div>
						<div class='column2'>姓名</div>
						<div class='column3'>收款微信号</div>
					</div>
					<div class='row'>
						<div class='column1'>推荐人</div>
						<div class='column2'>{{account.agentName}}</div>
						<div class='column3'>{{account.agentAccount}}</div>
					</div>
					<div class='row'>
						<div class='column1'>上级</div>
						<div class='column2'>{{account.superName}}</div>
						<div class='column3'>{{account.superAccount}}</div>
					</div>
					<div class='row'>
						<div class='column1'>上上级</div>
						<div class='column2'>{{account.bigSuperName}}</div>
						<div class='column3'>{{account.bigSuperAccount}}</div>
					</div>
					<div class='mask-button'>
						<div style="margin-top:20px;" class='mask-cancel' @click='closeMask3' :style="{backgroundColor:color}">关闭</div>
					</div>
				</div>
			</div>
		</transition>
		
	</div>
</template>

<script>
import {mapState} from 'vuex';
export default {
	name: 'FeedBack',
	components: {
		// HelloWorld
	},
	data(){
		return {
			customerInfo:{
				customerName:'杨女士',
				customerPhoneNumber:'15915889988'
			},
			mask:{
				mask1:false,
				mask2:false,
				mask3:false,
			},
			stateTitle:'',
			state:'',
			colorfulBackground:{
				backgroundColor:'#1476FE'
			},
			// 每一个客户，数据库都会保存状态对应的颜色
			colorfulButtons:{
					contactButtonColor:'#1476Fe',
					signButtonColor:'#1476Fe',
					moneyButtonColor:'#1476Fe',
					commissionButtonColor:'#1476Fe',
			},
			colorfulFont:{
				color: '#1476FE'
			},
			account:{
				agentName:'杨腾',
				agentAccount:'15811111111',
				superName:'杨三毛',
				superAccount:'15914132568',
				bigSuperName:'杨冯',
				bigSuperAccount:'13567998802'
			}
		}
	},
	computed:{
		...mapState({
			color:state=>state.color,
		})
	},
	methods:{
		isContactCustomer(){
			this.stateTitle = '确定联系过客户了吗';
			this.state = 'contacted';
			this.mask.mask1 = true;
		},
		isSignUp(){
			this.stateTitle = '确定已经签约了吗';
			this.state = 'signed';
			this.mask.mask1 = true;
		},
		enterTheAmount(){
			this.mask.mask2 = true;
		},
		Commission(){
			this.mask.mask3 = true;
		},
		isCommission(){
			this.stateTitle = '佣金确定发放了吗';
			this.state = 'issued';
			this.mask.mask1 = true;
		},
		isCancel(){
			this.mask.mask1 = false;
		},
		//保存状态
		isConfirm(event){
			let that = this;
			let state = event.currentTarget.dataset.state;
			this.axios.post('/api/saveFeedback',{agentPhoneNumber:'15914132569',customerPhoneNumber:'13233332222',state:state})
				.then(function(val){
					console.log(val.data);
					that.$message.success('反馈成功');
				})
			this.mask.mask1 = false;
		},
		isCanceltwo(){
			this.mask.mask2 = false;
		},
		//保存签约金额
		isConfirmtwo(){
			let that = this;
			let money = this.$refs.money.value;
			money===''?this.$message.info('请输入数字'):this.$Utils.checkMoney(money)?this.saveMoney(money):this.$message.info('输入数字');
			console.log(money);
			this.mask.mask2 = false;
		},
		saveMoney(money){
			let that = this;
			this.axios.post('/api/saveMoney',{agentPhoneNumber:'15914132569',customerPhoneNumber:'13233332222',money:money})
				.then(function(val){
					console.log(val.data);
					that.$message.success('反馈成功');
				})
		},
		closeMask3(){
			this.mask.mask3 = false;
		}
	},
	created() {
		let customerPhoneNumber = this.$route.query.customerPhoneNumber;
		console.log(customerPhoneNumber);
	}
}
</script>

<style lang="less" scoped>
	#feedback{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.feedback-wraper{
		width:90vw;
	}
	#feedback h1{
		padding:20px 0 5px 0;
		font-weight: 900;
		color:#333;
	}
	.customer-info{
		margin-top:30px;
		width:100%;
		height: 140;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.info-avatar{
		width:100px;
		height: 100px;
		border-radius: 50px;
		border:2px solid #666;
	}
	.customer-info span{
		font-weight: 700;
	}
	.span1{
		margin-top: 10px;
		font-size: 18px;
		color: #999;
	}
	.span2{
		color:#1476fe;
	}
	
	.iscontact{
		width:100%;
		height: 70px;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #ddd;
		align-items: center;
	}
	.problem{
		font-size: 14px;
		font-weight: 900;
		color: #1476fe;
	}
	.confirm{
		width:120px;
		height: 30px;
		background-color: #1476fe;
		// background-color: #999;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: bold;
		color: #FFFFFF;
		border-radius:20px;
	}
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
	
	.mask-contentb{
		position: relative;
		top:0px;
		width:100vw;
		height: 320px;
		background-color: rgb(247,247,247);
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
	}

	.row{
		width:90%;
		height: 40px;
		// border:1px solid #999;
		display: flex;
	}
	.column1{
		width:20%;
		height: 100%;
		border:.5px solid #ccc;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		font-weight: 900;
		color: #999;
	}
	.column2{
		width:25%;
		height: 100%;
		border:.5px solid #ccc;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		font-weight: bolder;
		color: #999;
	}
	.column3{
		width:55%;
		height: 100%;
		border:.5px solid #ccc;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		font-weight: bolder;
		color: #999;
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
		color: #fff;
		background-color: #1476FE;
		
		
	}
	.mask-confirm{
		color: #1476FE;
		background-color: #eee;
	}
	.mask2-title{
		font-size: 24px;
		font-weight: 900;
		margin:15px 0 15px 0;
		color: #1476fe;
	}
	.mask-inputa{
		width:50%;
		height: 55px;
		border:1px solid #1476fe;
		border-radius: 10px;
		// background-color: #efefef;
		text-align: center;
		font-size: 17px;
		color: #1476fe;
		caret-color:#1476fe;
		font-weight: 900;
	}
	.wxnumber{
		font-size: 24px;
		font-weight: 900;
		margin: 20px 0 20px 0;
		color: #1476fe;
	}
	.closemask3{
		margin-top:10px;
		// background-image: linear-gradient(135deg, rgba(244, 213, 131, 1), rgba(191, 152, 57, 1.0));
		font-size: 18px;
		font-weight: 900;
		text-align: center;
		line-height: 60px;
		color: #fff;
		width:100%;
		height: 60px;
	}
	

</style>