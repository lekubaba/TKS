?≥<template>
	<div id='message-login'>
		<div class='containerx'>
			<div class='container-a'>
				<div id='message2' style='height: 20px;'></div>
				<input class='register-input' type="number" placeholder="请填写手机号" ref='agentPhoneNumber' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
				<div class='rna-wraperb'>
					<input type="number" class='rna-input-check' ref='verificationCode' placeholder="验证码" oninput="this.value=this.value.length>4?this.value.substr(0,4):this.value;">
					<button class='get-check-number' :style="{backgroundColor:this.$store.state.color}" @click='countDownSixty'>{{content}}</button>
				</div>
				<button id='dataset' class='register-confirm' @click='toLoginByMessage' :style="{backgroundColor:this.$store.state.color}">
					登陆
				</button>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'MessageLogin',
	components: {
		// HelloWorld
	},
	created() {
		
	},
	data(){
		return {
			content: '获取验证码',
			totalTime: 60,
			canClick: true, //添加canClick
			agentPhoneNumber:'',
			alicode:''
		}
	},
	methods:{
		countDownSixty () {
			let that = this;
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
			},1000);
			this.axios.post('/api/alicode',{tel:agentPhoneNumber})
			.then(function(res){
				if(res.data.code===500){
					that.$message.info('系统出错了');
					return;
				}
				that.agentPhoneNumber = agentPhoneNumber;
				that.alicode = res.data.alicode;
				that.$message.info('发送成功');
			})
		},
		toLoginByMessage(){
			let that = this;
			let ref = this.$refs;
			let verificationCode = ref.verificationCode.value;
			let agentPhoneNumber = ref.agentPhoneNumber.value;
			let isAgentPhoneNumber = this.$Utils.checkTel(agentPhoneNumber);
			let isVerificationCode = this.$Utils.checkVC(verificationCode);/* 四位验证码 */
			if(!agentPhoneNumber){
				this.$message.info('请输入内容');
				return;
			}
			if(!isAgentPhoneNumber||this.agentPhoneNumber!==agentPhoneNumber){
				this.$message.info('手机号有误');
				return;
			}
			if(!verificationCode){
				this.$message.info('请输入验证码');
				return;
			}
			if(!isVerificationCode){
				this.$message.info('验证码错误');
				return;
			}
			if(Number(verificationCode)!==this.alicode){
				this.$message.info('验证码错误');
				return;
			}
			
			this.axios.post('/api/toMessageLogin/login',{tel:agentPhoneNumber})
			.then(function(res){
				if(res.data.code===500){
					that.$message.success('登陆异常');
					return;
				}
				if(res.data.code===101){
					that.$message.info('没这个用户');
					return;
				}
				
				// 将服务端响应的数据存储到Storage,并记录登陆状态；
				window.localStorage.setItem('agentAvatarImg',res.data.agentAvatarImg);
				window.localStorage.setItem('agentNickname',res.data.agentNickname);
				window.localStorage.setItem('isPromotion',res.data.isPromotion);
				window.localStorage.setItem('isAddLevel',res.data.isAddLevel);
				window.localStorage.setItem('isVIP',res.data.isVIP);
				window.localStorage.setItem('color',res.data.color);
				window.localStorage.setItem('agentID',res.data.agentID);
				window.localStorage.setItem('productsId',res.data.productsId);
				window.localStorage.setItem('isLogin',true);
				window.location.href = that.$baseURL;
				
			})
			
			
		}
	},
}
</script>

<style lang="less" scoped>
	#message-login{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.containerx{
		position: relative;
		margin-top:20px;
		width:92vw;
		height: auto;
		padding:20px 25px 20px 25px;
		background-color: #fff;
		border-radius: 10px;
		display: flex;
		justify-content: space-between;
		box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
	}
	.container-a{
		width:80%;
	}
	#message2{
		position: absolute;
		top:10px;
		font-size: 10px;
		color:#FE2e5c;
	}
	.register-input{
		width:100%;
		height: 40px;
		border:none;
		background-color: #F2F5FA;
		font-size: 18px;
		color: #333;
		caret-color:#1476fe;
		margin-top:10px;
		border-radius: 5px;
		padding-left: 10px;
		border:none;
	}
	.rna-wraperb{
		margin-top: 10px;
		width:100%;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 5px;
		
	}
	.rna-input-check{
		width:35vw;
		height: 40px;
		border:none;
		background-color: #F2F5FA;
		font-size: 18px;
		color: #333;
		caret-color:#1476fe;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		padding-left: 10px;
		border:none;
	}
	.get-check-number{
		width:55vw;
		height: 40px;
		color: #fff;
		background-color: #1475FE;
		text-align: center;
		line-height: 30px;
		font-size: 12px;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		/* font-weight: 900; */
		border:none;
		
	}
	.register-confirm{
		margin-top:20px;
		width:100%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		color:#fff;
		background-color: #1475FE;
		border-radius: 5px;
		border:none;
	}
</style>
