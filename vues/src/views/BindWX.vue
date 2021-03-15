<template>
	<div class='bind-wx'>
		<div class='container'>
			<div class='c-title'>
				请输入本人微信号
			</div>
			<div class='remind'>
				微信账号便于您与上下级沟通联系，获得/提供辅导帮助，请填写正确账号。
			</div>
			<div class='wx-wraperb'>
				<input type="text" class='wx-input wx-number' name='agentWechat' :placeholder="agentWechat?agentWechat:placeholder" ref='wechat' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
			</div>
			<div class='remind'>请填写微信绑定的手机号。</div>
			<div class='wx-submit' @click='saveWechat' :style="{backgroundColor:this.$store.state.color}">保存</div>
			
		</div>
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
				let productsId = window.localStorage['productsId'];
				let that = this;
				this.axios.post('/api/getwechat',{agentID:agentID,productsId:productsId})
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
				let wechat = this.$refs.wechat.value;/* 获取输入值 */
				let isWechat = this.$Utils.checkTel(wechat);/* 检测微信手机号是否合法 */
				let agentID = window.localStorage['agentID']; //
				let productsId = window.localStorage['productsId'];
				
				if(!wechat){
					this.$message.info('内容不能为空');
					return;
				}
				if(!isWechat){
					this.$message.info('格式错误');
					return;
				}
				
				if(isWechat){
					let weixin = {agentID:agentID,productsId:productsId,agentWechat:wechat};
					this.axios.post('/api/saveWechat',weixin)
						.then(function(res){
							if(res.data.code===500){
								that.$message.info('系统故障');
								return;
							}
							
							if(res.data.code===200){
								that.$refs.wechat.value = '';
								that.agentWechat = '已绑定:'+wechat;
								that.$message.success('微信绑定成功');
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
