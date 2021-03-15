<template>
	<div id='feedback'>
		<div class='feedback-wraper'>
			<div class='customer-info'>
				<img class='info-avatar' :src="customerInfo.customerAvatarImg?customerInfo.customerAvatarImg:imgAvatar">
				<div class='info-c'>
					<div class='span1'>{{customerInfo.customerName}}</div>
					<div class='span2' :style="{color:color}">{{customerInfo.customerPhoneNumber}}</div>
					<div class='span3'>{{customerInfo.orderTime}}</div>
				</div>
				
			</div>
			<h1 >告诉代理当前进度</h1>
			<div class='iscontact' v-if="mode=='tra'">
				<div class='problem' :style="{color:color}">是否已联系了客户？</div>
				<div class='confirm' @click='isContactCustomer' data-contacted='contacted' :style="{backgroundColor:color}" v-if='!customerInfo.contacted'>已联系</div>
			</div>
			<div class='iscontact' v-if="mode=='tra'">
				<div class='problem' :style="{color:color}">客户是否已签约？</div>
				<div class='confirm' @click='isSignUp' data-signed='signed' :style="{backgroundColor:color}" v-if='!customerInfo.signed'>已签约</div>
			</div>
			<div class='iscontact'>
				<div class='problem' :style="{color:color}">出额多少？<span class='spanx'>{{customerInfo.eDu}}</span></div>
				<div class='confirm' @click='enterEDu' :style="{backgroundColor:color}">输入初始额度</div>
			</div>
			<div class='iscontact'>
				<div class='problem' :style="{color:color}">借款多少？<span class='spanx'>{{customerInfo.orderMoney}}</span></div>
				<div class='confirm' @click='enterTheAmount' :style="{backgroundColor:color}">输入借款金额</div>
			</div>
			<div class='iscontact'>
				<div class='problem' :style="{color:color}">给代理发佣金</div>
				<div class='confirm' @click='Commission' :style="{backgroundColor:color}">获取账户</div>
			</div>
			<div class='iscontact'>
				<div class='problem' :style="{color:color}">佣金是否已发放？</div>
				<div class='confirm' @click='isCommission' data-issued='issued' :style="{backgroundColor:color}" v-if='!customerInfo.issued'>佣金已发放</div>
			</div>
		</div>
		<transition name='fade'>
			<div class='mask' v-if='mask.mask1'>
				<div class='mask-contenta'>
					<div class='mask-titlea' :style="{color:color}">{{stateTitle}}</div>
					<div class='mask-titleb'>提交以后代理将在进度里看到你的反馈</div>
					<div class='mask-button'>
						<div class='mask-cancel' @click='isCancel' :style="{color:color}">取消</div>
						<div class='mask-confirm' @click='isConfirm' :data-state='state' :style="{backgroundColor:color}">确认</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name='fade'>
			<div class='mask' v-if='mask.mask0'>
				<div class='mask-contenta'>
					<div class='mask2-title' :style="{color:color}">输入初始额度</div>
					<input class='mask-inputa' type="number" placeholder="输入初始额度" ref='edu' onkeyup="this.value=this.value.replace(/[, ]/g,'')" :style="{borderColor:color}">
					<div class='mask-button'>
						<div class='mask-cancel' @click='isCancelzero' :style="{color:color}">取消</div>
						<div class='mask-confirm' @click='isConfirmzero' :style="{backgroundColor:color}">确认</div>
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
						<div class='mask-cancel' @click='isCanceltwo' :style="{color:color}">取消</div>
						<div class='mask-confirm' @click='isConfirmtwo' :style="{backgroundColor:color}">确认</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name='fade'>
			<div class='mask' v-if='mask.mask3'>
				<div class='mask-contentb'>
					<div class='wxnumber' :style="{color:color}">收款支付宝</div>
					<div class='row'>
						<div class='column1 come-where'>
							<div class='come-t'>直推分类</div>
							<div class='come-c'>{{managerLevel===100?'暂无职位':managerLevel===0?'城市代理':managerLevel===1?'城市经理':managerLevel===2?'城市总监':'城市独家'}}</div>
						</div>
						<div class='column2'>
							<div class='come-t'>姓名</div>
							<div class='come-c'>昵称</div>
						</div>
						<div class='column3'>
							<div class='come-t'>收款支付宝</div>
							<div class='come-c'>微信</div>
						</div>
					</div>
					<div class='row'>
						<div class='column1'>推荐人</div>
						<div class='column2'>
							<div class='come-x'>{{account.agentID.agentName?account.agentID.agentName:'未设置'}}</div>
							<div class='come-y'>{{account.agentID.agentNickname?account.agentID.agentNickname:'未设置'}}</div>
							
						</div>
						<div class='column3'>
							<div class='come-x'>{{account.agentID.agentAlipay?account.agentID.agentAlipay:'未设置'}}</div>
							<div class='come-y'>{{account.agentID.agentWechat?account.agentID.agentWechat:'未设置'}}</div>
						</div>
					</div>
					<div class='row'>
						<div class='column1'>上级</div>
						<div class='column2'>
							<div class='come-x'>{{account.superLevel?account.superLevel.agentName:'无'}}</div>
							<div class='come-y'>{{account.superLevel?account.superLevel.agentNickname:'无'}}</div>
						</div>
						<div class='column3'>
							<div class='come-x'>{{account.superLevel?account.superLevel.agentAlipay:'无'}}</div>
							<div class='come-y'>{{account.superLevel?account.superLevel.agentWechat:'无'}}</div>
						</div>
					</div>
					<div class='row'>
						<div class='column1'>上上级</div>
						<div class='column2'>
							<div class='come-x'>{{account.bigSuperLevel?account.bigSuperLevel.agentName:'无'}}</div>
							<div class='come-y'>{{account.bigSuperLevel?account.bigSuperLevel.agentNickname:'无'}}</div>
						</div>
						<div class='column3'>
							<div class='come-x'>{{account.bigSuperLevel?account.bigSuperLevel.agentAlipay:'无'}}</div>
							<div class='come-y'>{{account.bigSuperLevel?account.bigSuperLevel.agentWechat:'无'}}</div>
						</div>
					</div>
					<div class='mask-button'>
						<div style="margin-top:20px;" class='mask-cancel' @click='closeMask3' :style="{color:color}">关闭</div>
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
			mode:null,
			orderID:null,
			customerInfo:{
				code:'',
				customerAvatarImg:'',
				customerName:'',
				customerPhoneNumber:'',
				contacted:'',
				signed:'',
				issued:'',
				orderTime:'',
				orderMoney:'',
				eDu:'',
			},
			imgAvatar:'http://qiniu.tongkeapp.com/customerDefaultAvatar_01.png',
			mask:{
				mask0:false,
				mask1:false,
				mask2:false,
				mask3:false,
			},
			stateTitle:'',
			state:'',
			account:{},
			managerLevel:0,
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
		})
	},
	created() {
		this.$loading.show();
		this.orderID = this.$route.query.orderID;
		this.mode = this.$route.query.mode;
		this.getData();
	},
	methods:{
		getData(){
			let that = this;
			let data = {
				orderID:that.orderID,
			}
			
			this.axios.post('/api/feedback',data)
				.then(function(val){
					that.$loading.hide();
					if(val.data.code===500){
						that.$message.info('系统异常');
						return;
					}
					that.customerInfo = val.data;
					that.managerLevel = val.data.managerLevel;
					return;
				})
		},
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
		enterEDu(){
			this.mask.mask0 = true;
		},
		enterTheAmount(){
			this.mask.mask2 = true;
		},
		Commission(){
			let orderID = this.$route.query.orderID;
			let that = this;
			this.axios.post('/api/getAccount',{orderID:orderID})
				.then(function(res){
					that.account = res.data;
				})
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
			let orderID = this.$route.query.orderID;
			let state = event.currentTarget.dataset.state;
			this.axios.post('/api/saveFeedback',{orderID:orderID,state:state})
				.then(function(val){
					if(val.data.code===500){
						that.$message.info('系统故障了');
						return;
					}
					if(state==='contacted'){
						that.customerInfo.contacted = true;
						that.$message.success('反馈成功');
						return;
					}else if(state==='signed'){
						that.customerInfo.signed = true;
						that.$message.success('反馈成功');
						return;
					}else if(state==='issued'){
						that.customerInfo.issued = true;
						that.$message.success('反馈成功');
						return;
					}
					
				})
			this.mask.mask1 = false;
		},
		isCancelzero(){
			this.mask.mask0 = false;
		},
		//保存初始额度
		isConfirmzero(){
			
			let that = this;
			let orderID = this.$route.query.orderID;
			let edu = this.$refs.edu.value;
			if(edu===''){
				this.$message.info('请输入额度');
				return;
			}
			
			if(!this.$Utils.checkMoney(edu)){
				this.$message.info('格式错误');
				return;
			}
			this.axios.post('/api/saveedu',{orderID:orderID,edu:edu})
				.then(function(val){
					if(val.data.code===500){
						that.$message.info('稍后再试');
						return;
					}
					that.$message.success('反馈成功');
					window.localStorage.setItem('eDu',edu);
				})
			this.mask.mask0 = false;
			return;
		},
		isCanceltwo(){
			this.mask.mask2 = false;
		},
		//保存借款金额
		isConfirmtwo(){
			
			let that = this;
			let orderID = this.$route.query.orderID;
			let money = this.$refs.money.value;
			if(money===''){
				this.$message.info('请输入金额');
				return;
			}
			
			if(!this.$Utils.checkMoney(money)){
				this.$message.info('格式错误');
				return;
			}
			this.axios.post('/api/saveMoney',{orderID:orderID,money:money})
				.then(function(val){
					if(val.data.code===500){
						that.$message.info('稍后再试');
						return;
					}
					if(val.data.code===200){
						
						that.$message.success('反馈成功');
						window.localStorage.setItem('orderMoney',money);
						return;
					}
					if(val.data.code===100){
						
						that.$message.error('反馈过了');
						return;
					}
				})
			this.mask.mask2 = false;
			return;
		},
		closeMask3(){
			this.mask.mask3 = false;
		}
	},
	
}
</script>

<style lang="less" scoped>
	#feedback{
		width:100vw;
		min-height: 100vh;
		background-color: #F2F5FA;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 80px;
	}
	.feedback-wraper{
		margin-top:30px;
		width:90vw;
		background-color: #fff;
		padding:20px;
		border-radius: 15px;
		box-shadow: 0 5px 6px 0 rgba(15,60,181,.3);
	}
	#feedback h1{
		padding:20px 0 5px 0;
		font-weight: 900;
		color:#333;
	}
	.customer-info{
		width:100%;
		height: 100px;
		display: flex;
		flex-direction: row;
		align-items: center;
		// justify-content: space-between;
	}
	.info-avatar{
		width:70px;
		height: 70px;
		border-radius: 50px;
		// border:3px solid #fff;
	}
	.info-c{
		padding-left: 10px;
	}
	.customer-info span{
		font-weight: 700;
	}
	.span1{
		font-size: 20px;
		color: #333;
		font-weight: 900;
	}
	.span2{
		color:#1476fe;
		font-weight: 900;
	}
	.span3{
		font-size: 12px;
		color:#666;
	}
	
	.iscontact{
		width:100%;
		height: 70px;
		display: flex;
		justify-content: space-between;
		border-top:1px solid rgba(218,224,234,.5);
		align-items: center;
	}
	.problem{
		font-size: 14px;
		font-weight: 900;
		color: #1476fe;
	}
	.spanx{
		color:#FF654D;
		margin-left: 10px;
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
		height: 420px;
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
		height: 60px;
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
		flex-direction: column;
		font-size: 13px;
		font-weight: 900;
		color: #999;
	}
	.come-t{
		width:100%;
		font-size: 14px;
		color:#1476FE;
		height: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		
		
	}
	.come-c{
		width:100%;
		font-size:14px;
		color:#11b764;
		height: 50%;
		border-top: .5px solid #666;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.column2{
		width:25%;
		height: 100%;
		border:.5px solid #ccc;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		font-weight: bolder;
		color: #999;
	}
	.come-x{
		width:100%;
		font-size: 14px;
		color:#1476FE;
		height: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		
	}
	.come-y{
		width:100%;
		font-size: 14px;
		color:#999;
		height: 50%;
		border-top: .5px solid #666;
		display: flex;
		align-items: center;
		justify-content: center;
		
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
		
		color: #1476FE;
		background-color: #eee;
		
		
	}
	.mask-confirm{
		color: #fff;
		background-color: #1476FE;
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