<template>
	<div class='bind-alipay'>
		<div class='container'>
			<div class='c-title'>
				提现到<span style='color:#1476FE;font-size: 26px;'>支付宝</span>
			</div>
			<div class='remind'>
				此支付宝为您提现的收款账户，为确保收款正常，请务必填写您本人支付宝绑定的手机号。
			</div>
			<div class='wx-wrapera'>
				<input type="text" class='wx-input wx-username' name='agentName' :placeholder="agentName!=='未设置'?agentName:placeholder1" ref='agentName' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
			</div>
			<div class='wx-wraperb'>
				<input type="text" class='wx-input wx-number' name='agentAlipay' :placeholder="agentAlipay!=='已绑定:未绑定'?agentAlipay:placeholder" ref='alipay' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
			</div>
			<div class='remind'>请填写支付宝绑定的手机号，确保能正常收款。</div>
			<div class='wx-submit' @click='saveWechat' :style="{backgroundColor:this.$store.state.color}">保存</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BindAlipay',
		components: {
			// HelloWorld
		},
		data(){
			return {
				agentAlipay:'',
				agentName:'',
				placeholder1:'请填写本人姓名',
				placeholder:'请填写支付宝绑定的手机号'
			}
		},
		created() {
			this.$loading.show()
			this.getData();
		},
		methods:{
			getData(){
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				let that = this;
				this.axios.post('/api/getalipay',{agentID:agentID,productsId:productsId})
					.then(function(res){
						if(res.data.code===500){
							that.$loading.hide()
							that.$message.info('系统故障');
							return;
						}
						
						if(res.data.agentAlipay){
							that.$loading.hide()
							that.agentName = res.data.agentName; 
							that.agentAlipay = '已绑定:'+res.data.agentAlipay;
							return;
						}
						that.$loading.hide()
						return;
					})
			},
			saveWechat(){
				let that = this;
				let agentName = this.$refs.agentName.value; /* 获取输入值*/
				let alipay = this.$refs.alipay.value;/* 获取输入值 */
				let isAgentName = this.$Utils.checkCName(agentName);/* 检测中文名合法 */
				let isalipay = this.$Utils.checkTel(alipay);/* 检测微信手机号是否合法 */
				let agentID = window.localStorage['agentID']; //当前代理的OPENID
				let productsId = window.localStorage['productsId'];
				
				if(!agentName|| !alipay){
					this.$message.info('请输入内容');
					return;
				}
				if(!isAgentName || !isalipay){
					this.$message.info('格式错误');
					return;
				}
				
				if(isAgentName && isalipay){
					let datas = {agentID:agentID,productsId:productsId,agentName:agentName,agentAlipay:alipay};
					this.axios.post('/api/savealipay',datas)
						.then(function(res){
							if(res.data.code===500){
								that.$message.info('系统故障');
								return;
							}
							
							if(res.data.code===200){
								that.$refs.agentName.value = '';
								that.$refs.alipay.value = '';
								that.agentName = agentName;
								that.agentAlipay = '已绑定:'+alipay;
								that.$message.success('绑定成功');
							}
							
						})
				}
				
			}
		}
	}
</script>

<style scoped lang="less">
.bind-alipay{
	width:100vw;
	height: 100vh;
	background-color: rgb(237,237,237);
	display: flex;
	flex-direction: column;
	align-items: center;
	// justify-content: center;
	background: url('http://qiniu.tongkeapp.com/bg_5.png') no-repeat;
	background-size:100%;
	
}
.container{
	margin-top:40px;
	width:92vw;
	min-height: 500px;
	padding:30px 25px 30px 25px;
	background-color: #fff;
	border-radius: 10px;
}
.c-title{
	
	font-size:26px;
	color:#333;
	font-weight: 900;
}
.wx-wrapera,.wx-wraperb{
	width:100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #ccc;
}
.wx-wrapera{
	margin-top:20px;
}
.wx-wraperb{
	margin-top:10px;
}
.bind-wx span{
	font-size: 16px;
	font-weight: 900;
	color: #666;
}
.wx-input{
	width:100%;
	height: 50px;
	border:none;
	background-color: #fff;
	font-size: 16px;
	color: #333;
	border-bottom: .03125rem solid #dae0ea;
}
.wx-submit{
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
.remind{
	width: 100%;
	padding:5px 0px 0 0px;
	margin-top:5px;
	font-size: 12px;
	color:#666;
}
</style>
