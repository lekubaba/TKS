<template>
	<div id='register-agent'>
		<div class='register-h'>
			<div class='register-title1'>此招商由：</div>
			<div class='register-title2' :style="{color:color}">湖南乘法表科技有限公司发布</div>
			<div class='register-title3'>推广产品：<span class='register-title4' :style="{color:color}">中南华夏贷</span></div>
			<div class='registe-countdown'>
				<div class='register-agree' :style="{backgroundColor:color}">√</div>
				<div class='register-agree-title'>限时招商</div>
				<CountDown class='register-agree-title' :style="{color:color}" v-bind:endTime='getAgentEndTime' />
			</div>
			<div class='regulation' :style="{color:color}">注册代理并登陆可查看佣金政策</div>
		</div>
		<div class='register-c'>
			<input class='register-input' type="text" placeholder="代理人姓名" ref='agentName' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
			<input class='register-input' type="number" placeholder="代理人手机号" ref='agentPhoneNumber' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
			<div class='register-wraper'>
				<input type="number" class='register-input-check' name='verificationCode' placeholder="验证码" ref='verificationCode' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
				<div class='get-check-number' :style="{backgroundColor:color}" @click='countDownSixty'>{{content}}</div>	
			</div>
		</div>
		<div class='register-f'>
			<div class='register-confirm' @click='isConfirm' :style="{backgroundColor:color}">注册并登陆</div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';
import CountDown from '../components/CountDown.vue';
export default {
	name: 'RegisterAgent',
	components: {
		CountDown
	},
	data(){
		return {
			content: '获取验证码',
			totalTime: 60,
			canClick: true //添加canClick
		}
	},
	computed:{
		...mapState({
			color:state=>state.color,
			getAgentEndTime:state=>state.getAgentEndTime,
		})
	},
	created() {
	},
	methods:{
		isConfirm(){
			
			let agentName = this.$refs.agentName.value;
			let agentPhoneNumber = this.$refs.agentPhoneNumber.value;
			let verificationCode = this.$refs.verificationCode.value;
			if(!agentName||!agentPhoneNumber||!verificationCode){
				this.$message.info('内容为空');
				return;
			}
			if(!this.$Utils.checkCName(agentName)||!this.$Utils.checkTel(agentPhoneNumber)||!this.$Utils.checkVC(verificationCode)){
				this.$message.info('输入错误');
				return;
			}
			
			// doSomething ...检查获取的验证码是否正确；
			
			
			
			
			
		},
		countDownSixty () {
			
			let agentPhoneNumber = this.$refs.agentPhoneNumber.value;
			if(agentPhoneNumber===''){
				this.$message.info('手机号为空');
				return;
			}
			if(!this.$Utils.checkTel(agentPhoneNumber)){
				this.$message.info('手机号错误');
				return;
			}
			
			if (!this.canClick) return  //改动的是这两行代码
			this.canClick = false
			this.content = this.totalTime + 's'
			let clock = window.setInterval(() => {
				this.totalTime--
				this.content = this.totalTime + 's'
				if (this.totalTime < 0) {
					window.clearInterval(clock)
					this.content = '获取验证码'
					this.totalTime = 60;
					this.canClick = true  //这里重新开启
				}
			},1000)
		}
	},
}
</script>

<style lang="less" scoped>
	#register-agent{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(247,247,247);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	// header
	
	.register-h{
		margin-top:20px;
		padding:0 30px 0 30px;
		width:100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.register-title1{
		margin-top: 5px;
		font-size: 18px;
		font-weight: 900;
		color: #999;
		
	}
	.register-title2{
		margin-top: 5px;
		font-size: 18px;
		font-weight: 900;
		color: #1476Fe;
		
	}
	.register-title3{
		margin-top: 5px;
		margin-bottom: 10px;
		font-size: 18px;
		font-weight: 900;
		color: #999;
		
	}
	.register-title4{
		font-size: 18px;
		font-weight: 900;
		color: #1476FE;
		
	}
	
	.registe-countdown{
		display: flex;
		align-items: center;
		padding-bottom: 5px;
		border-bottom: .5px solid #aaa;
	
	}
	.register-agree{
		margin-left: 2px;
		width:12px;
		height: 12px;
		border-radius: 2px;
		background-color: #1476fe;;
		text-align: center;
		line-height: 12px;
		font-size: 7px;
		color: #fff;
		font-weight: 900;
	}
	.register-agree-title{
		color:#999;
		font-size: 12px;
		margin:0 5px 0 3px;
	}
	
	.regulation{
		margin-top:5px;
		font-size: 12px;
		color:#1476fe;
	}
	
	// content 部分
	
	.register-c{
		padding:0 30px 0 30px;
		width:100%;
		height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.register-input{
		width:100%;
		height: 55px;
		border:none;
		background-color: rgb(247,247,247);
		font-size: 16px;
		color: #333;
		caret-color:#1476fe;
		border-bottom: 0.5px solid #ccc;
		font-weight: 900;
	}
	
	.register-wraper{
		// margin-top:20px;
		width:100%;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.5px solid #ccc;
		
	}
	
	.register-input-check{
		width:60vw;
		height: 55px;
		border:none;
		background-color: rgb(247,247,247);
		font-size: 16px;
		color: #555;
		caret-color:#1476fe;
		font-weight: 900;
	}
	.get-check-number{
		width:30vw;
		height: 30px;
		color: #fff;
		background-color: #1476fe;
		text-align: center;
		line-height: 30px;
		font-size: 14px;
		border-radius: 5px;
		font-weight: 900;
	}
	.register-button{
		margin-top:20px;
		width:100%;
		display: flex;
		flex-direction: column;
	}
	
	// footer部分
	
	.register-f{
		width:100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.register-confirm{
		margin-top:30px;
		width:calc(100% - 60px);
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 18px;
		font-weight: 900;
		cursor: pointer;
		background-color: #1476fe;
		border-radius: 5px;
	}
</style>
