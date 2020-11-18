<template>
	<div class='agent-qrcode-background'>
		<div class='add-remind'>每月上传次数限：3次</div>
		<div class='add-background' :style="{backgroundColor:this.$store.state.color}">
			<div class='background-plus'>+
				<input id="imgLocal" class="input-loc-img" name="imgLocal" ref="imgLocal" type='file' accept="image/*" @change="upFile()">
			</div>
			<div class='background-title'>上传招商码背景图</div>
			<div class='background-subtitle'>尺寸：680像素*1088像素</div>
		</div>
		<div class='add-remind'>将作为招商二维码背景图</div>
		<div class='add-title'>示例：</div>
		<div class='add-example'>
			<img :src="exampleSrc">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'AgentQrcodeBackground',
		components: {
			// HelloWorld
		},
		data(){
			return {
				uploadToken: '',
				exampleSrc:''
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
				that.axios.post('/api/uploadTokenAgent',{agentID:agentID})
				.then(function(res){
					that.$loading.hide();
					that.uploadToken = res.data.uploadToken;
					that.exampleSrc = res.data.agentQr;
				})
			},
			upFile(){
				let that = this;
				let agentID = window.localStorage['agentID'];
				var data = new FormData();
				data.append('token', this.uploadToken);
				data.append('file', this.$refs.imgLocal.files[0]);
				this.axios({
					method: 'POST',
					url: 'http://up-z2.qiniup.com',
					data: data,
					onUploadProgress: function (progressEvent) {
						let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
						that.$message.info(complete);
					},
				}).then((res) => {
					if (res.status === 200) {
						let url = 'http://images.tongkeapp.com/'+res.data.key;
						that.exampleSrc = url;
						that.axios.post('/api/saveagentqrcode',{agentID:agentID,url:url})
						.then(function(res1){
							if(res1.data.code===500){
								that.$message.info('系统出错了');
								return;
							}
							that.$router.replace({name:'SuccessRemind'});
						})
					}else{
						that.$message.info('上传失败');
					}
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.agent-qrcode-background{
		padding-top: 20px;
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.add-remind{
		margin-top:10px;
		margin-bottom:10px;
		font-size: 10px;
		color: #999;
	}
	.add-title{
		width:340px;
		height: 30px;
		margin-top:30px;
		margin-bottom: 5px;
		font-size: 16px;
		font-weight: 900;
		color: #666;
	}
	.add-background,.add-example{
		width:340px;
		min-height: 150px;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 1px 6px 0px rgba(100,100,100,.3);
	}
	.add-background{
		background-color: #1476FE;
	}
	.add-example{
		margin-bottom: 100px;
	}
	.background-plus{
		position: relative;
		top:0px;
		margin-top:20px;
		width:40px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26px;
		color: #333;
		font-weight: 900;
		background-color: #fff;
		border-left: 2px solid #1ff0ef;
		border-right: 2px solid #fe2e5c;
		border-radius: 5px;
		padding-bottom: 5px;
	}
	.background-title{
		margin-top:10px;
		font-size: 16px;
		font-weight: 900;
		color: #fff;
	}
	.background-subtitle{
		font-size: 12px;
		color: #eee;
	}
	.add-example img{
		width:100%;
	}
	.input-loc-img{
		position: absolute; 
		top: 0px; 
		left: 0px; 
		display: block; 
		width: 100%; 
		height: 100%; 
		border-radius: 50%; 
		opacity: 0; 
		cursor: pointer;
	}
</style>

