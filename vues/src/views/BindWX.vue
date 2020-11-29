<template>
	<div class='bind-wx'>
		<div class='wx-wrapera'>
			<span>姓名</span><input type="text" class='wx-input wx-username' name='agentName' placeholder="请填写姓名" ref='agentName' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
		</div>
		<div class='wx-wraperb'>
			<span>微信</span><input type="text" class='wx-input wx-number' name='agentWechat' :placeholder="agentWechat?agentWechat:placeholder" ref='wechat' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
		</div>
		<div class='remind'>此微信用于收款，沟通，获得/提供辅导帮助，请填写正确账号</div>
		<div class='wx-submit' @click='saveWechat' :style="{backgroundColor:this.$store.state.color}">保存</div>
	</div>
</template>

<script>
	export default {
		name: 'BindWX',
		components: {
			// HelloWorld
		},
		data(){
			return {
				agentWechat:'',
				placeholder:'请填写微信绑定的手机号'
			}
		},
		created() {
			this.$loading.show()
			this.getData();
		},
		methods:{
			getData(){
				let agentID = window.localStorage['agentID'];
				let that = this;
				this.axios.post('/api/getwechat',{agentID:agentID})
					.then(function(res){
						if(res.data.code===500){
							that.$loading.hide()
							that.$message.info('系统故障');
							return;
						}
						
						if(res.data.agentWechat){
							that.$loading.hide()
							that.agentWechat = '已绑定:'+res.data.agentWechat;
							return;
						}
						that.$loading.hide()
						return;
					})
			},
			saveWechat(){
				let that = this;
				let agentName = this.$refs.agentName.value; /* 获取输入值*/
				let wechat = this.$refs.wechat.value;/* 获取输入值 */
				let isAgentName = this.$Utils.checkCName(agentName);/* 检测中文名合法 */
				let isWechat = this.$Utils.checkTel(wechat);/* 检测微信手机号是否合法 */
				let agentID = window.localStorage['agentID']; //当前代理的OPENID
				
				if(!agentName|| !wechat){
					this.$message.info('内容不能为空');
					return;
				}
				if(!isAgentName || !isWechat){
					this.$message.info('格式错误');
					return;
				}
				
				if(isAgentName && isWechat){
					let weixin = {agentID:agentID,agentName:agentName,agentWechat:wechat};
					this.axios.post('/api/saveWechat',weixin)
						.then(function(res){
							if(res.data.code===500){
								that.$message.info('系统故障');
								return;
							}
							
							if(res.data.code===200){
								that.$refs.agentName.value = '';
								that.$message.success('微信修改成功');
							}
							
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
	width:80vw;
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
.remind{
	width: 100vw;
	padding:5px 20px 0 20px;
	margin-top:5px;
	font-size: 12px;
	color:#666;
}
</style>
