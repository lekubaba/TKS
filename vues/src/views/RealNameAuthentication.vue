<template>
	<div class='authentication'>
		<div class='rna-wrapera'>
			<span>姓名</span><input type="text" class='rna-input' name='agentName' placeholder="请填写管理员真实姓名" ref='agentName' onkeyup="this.value=this.value.replace(/[, ]/g,'')"
>
		</div>
		<div class='rna-wraperb'>
			<span>身份证</span><input type="text" class='rna-input' name='idCard' placeholder="请填写管理员身份证号" ref='idCard' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
		</div>
		<div class='rna-wraperb'>
			<span>手机号</span><input type="text" class='rna-input' name='agentWechat' placeholder="管理员手机号(同微信号)" ref='agentWechat' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
		</div>
		<div class='rna-wraperb'>
			<span>验证码</span>
			<div class='rna-check'>
				<input type="number" class='rna-input-check' name='verificationCode' placeholder="请填写验证码" ref='verificationCode' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
				<div class='get-check-number' :style="{backgroundColor:this.$store.state.color}" @click='countDownSixty'>{{content}}</div>	
			</div>
		</div>
		<div class='rna-wraperb'>
			<span>公司名称</span><input type="text" class='rna-input' name='companyName' placeholder="请填写所在的公司名称" ref='companyName' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
		</div>
		<div class='rna-wraperb'>
			<span>产品名称</span><input type="text" class='rna-input' name='productsName' placeholder="请填写产品中文简称" ref='productsName' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
		</div>
		<div class='rna-submit' @click= 'saveImformation' :style="{backgroundColor:this.$store.state.color}">保存</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name: 'RealNameAuthentication',
		components: {
			// HelloWorld
		},
		data(){
			return {
				content: '获取验证码',
				totalTime: 60,
				canClick: true, //添加canClick
				agentWechat:'',
				alicode:''
			}
		},
		beforeRouteEnter (to, from, next) {
		  if(window.localStorage['isVIP']=="true"){
			  next();
			  return;
		  }
		  next({name:"Promotion"});
		},
		created() {
			
		},
		methods:{
			saveImformation(){
				let that = this;
				let ref = this.$refs;
				let agentName = ref.agentName.value;
				let idCard = ref.idCard.value;
				let agentWechat = ref.agentWechat.value;
				let verificationCode = ref.verificationCode.value;
				let companyName = ref.companyName.value;
				let productsName = ref.productsName.value;
				let agentID = window.localStorage['agentID'];
				
				let isAgentName = this.$Utils.checkCName(agentName);
				let isIdCard = this.$Utils.checkID(idCard);
				let isAgentWechat = this.$Utils.checkTel(agentWechat);
				let isVerificationCode = this.$Utils.checkVC(verificationCode);/* 四位验证码 */
				let isCompanyName = this.$Utils.checkCompanyName(companyName);
				let isProductsName = this.$Utils.checkCName(productsName);
				
				if(!agentName || !idCard || !agentWechat || !companyName || !productsName){
					this.$message.info('请输入内容');
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
				
				if(isAgentName&&isIdCard&&isAgentWechat&&isVerificationCode&&isCompanyName&&isProductsName){
					
					let saveImformations = {
						agentID:agentID,
						agentName:agentName,
						idCard:idCard,
						agentWechat:agentWechat,
						companyName:companyName,
						productsName:productsName,
					}
					
					this.axios.post('/api/saveVerificationImformation',saveImformations)
					.then(function(res){
						if(res.data.code===500){
							that.$message.info('系统出错了');
							return;
						}
						that.$router.replace({name:'SuccessRemind'})
					})
					
				}else{
					this.$message.info('格式错误');
					return;
				}
				
				
			},
			countDownSixty () {
				let that = this;
				let agentWechat = this.$refs.agentWechat.value;
				if(agentWechat===''){
					this.$message.info('手机号为空');
					return;
				}
				if(!this.$Utils.checkTel(agentWechat)){
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
				this.axios.post('/api/alicode',{tel:agentWechat})
				.then(function(res){
					if(res.data.code===500){
						that.$message.info('系统出错了');
						return;
					}
					that.agentWechat = agentWechat;
					that.alicode = res.data.alicode;
					that.$message.info('发送成功');
				})
			}
		},
		computed:{
			...mapState({
				userInfo:state=>state.userInfo,
			})
		}
	}
</script>

<style scoped lang="less">
	.authentication{
		width:100vw;
		height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
	}
	.rna-wrapera,.rna-wraperb{
		width:100vw;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 0 0 20px;
		border-bottom: .5px solid #ccc;
	}
	.rna-wrapera{
		margin-top:30px;
	}
	.rna-wraperb{
		margin-top:10px;
	}
	.authentication span{
		font-size: 16px;
		font-weight: 900;
		color: #666;
	}
	.rna-check{
		width:70vw;
		height: 30px;
		margin-left:10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.rna-input{
		width:70vw;
		height: 30px;
		margin-left:10px;
		border:none;
		background-color: #ededed;
		font-size: 15px;
		color: #555;
		font-weight: 900;
	}
	.rna-input-check{
		width:40vw;
		height: 30px;
		border:none;
		background-color: #ededed;
		font-size: 15px;
		color: #555;
		font-weight: 900;
	}
	.get-check-number{
		margin-right: 20px;
		width:35vw;
		height: 30px;
		color: #fff;
		background-color: #1476fe;
		text-align: center;
		line-height: 30px;
		font-size: 12px;
		border-radius: 20px;
	}
	.rna-submit{
		margin-top:50px;
		width:80vw;
		height: 50px;
		text-align: center;
		line-height: 50px;
		color: #fff;
		font-size: 20px;
		background-color: #1476fe;
		border-radius: 10px;
	}
</style>
