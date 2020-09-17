<template>
	<div class='bind-wx'>
		<div class='wx-wrapera'>
			<span>收款姓名</span><input type="text" class='wx-input wx-username' name='agentName' placeholder="请填写收款人姓名" ref='agentName' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
		</div>
		<div class='wx-wraperb'>
			<span>收款微信</span><input type="text" class='wx-input wx-number' name='agentWechat' placeholder="填写微信绑定的手机号" ref='wechat' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
		</div>
		<div class='wx-submit' @click='saveWechat' :style="{backgroundColor:this.$store.state.color}">保存</div>
	</div>
</template>

<script>
	export default {
		name: 'BindWX',
		components: {
			// HelloWorld
		},
		created() {
			
		},
		methods:{
			saveWechat(){
				let that = this;
				let agentName = this.$refs.agentName.value; /* 获取输入值*/
				let wechat = this.$refs.wechat.value;/* 获取输入值 */
				let isAgentName = this.$Utils.checkCName(agentName);/* 检测中文名合法 */
				let isWechat = this.$Utils.checkTel(wechat);/* 检测微信手机号是否合法 */
				
				if(!agentName|| !wechat){
					this.$message.info('内容不能为空');
					return;
				}
				if(!isAgentName || !isWechat){
					this.$message.info('格式错误');
					return;
				}
				
				if(isAgentName && isWechat){
					let weixin = {agentPhoneNumber:'15914132569',agentName:agentName,agentWechat:wechat};
					this.axios.post('/api/saveWechat',weixin)
						.then(function(res){
							console.log(res.data);
							that.$message.success('微信保存成功');
						})
				}
				
			}
		}
	}
</script>

<style scoped lang="less">
	.bind-wx{
		width:100vw;
		height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
	}
	.wx-wrapera,.wx-wraperb{
		width:100vw;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 0 0 20px;
		border-bottom: 1px solid #ccc;
	}
	.wx-wrapera{
		margin-top:30px;
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
		width:70vw;
		height: 30px;
		margin-left:10px;
		border:none;
		background-color: #ededed;
		font-size: 15px;
		color: #555;
		font-weight: 900;
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
</style>
