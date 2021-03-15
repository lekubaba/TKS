
<template>
	<div class='promotion-poster'>
		<div class='add-remind'>每月上传次数限：3次</div>
		<div class='add-poster' :style="{backgroundColor:this.$store.state.color}">
			<div class='poster-plus'>+
				<input id="imgLocal" class="input-loc-img" name="imgLocal" ref="imgLocal" type='file' accept="image/*" @change="upFile()">
			</div>	
			<div class='poster-title'>上传推广正文海报</div>
			<div class='poster-subtitle'>尺寸：宽度680像素(不超过15张图)</div>
		</div>
		<div class='add-reminda'>请一张一张按顺序上传</div>
		<div class='add-remind'>将作为推广海报供客户了解产品相关</div>
		<div class='add-remindx' :style="{backgroundColor:this.$store.state.color}">
			注意事项：将设计的单张海报切片成多张图上传将提升用户访问页面的速度，请把控好图片的大小，过大的图片用户可能打不开页面。
		</div>
		<div class='add-title'>示例：</div>
		<div class='add-example'>
			<img class='poster-item' v-for='item in promotionPoster' :src="item">
		</div>
		<div class='complete'>
			<div class='complete-t' @click='changePrepromotionPoster'>上传完成并提交使用</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'PromotionPoster',
		components: {
			// HelloWorld
		},
		data(){
			return {
				uploadToken: '',
				promotionPoster:[],
				state:false,
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
			this.$loading.show();
			this.getData();
		},
		methods:{
			getData(){
				let that = this;
				let agentID = window.localStorage['agentID'];
				that.axios.post('/api/uploadTokenPPoster',{agentID:agentID})
				.then(function(res){
					that.$loading.hide();
					that.uploadToken = res.data.uploadToken;
					that.promotionPoster = res.data.poster;
				})
			},
			upFile(){
				if(this.promotionPoster.length===10){
					this.$message.info('限10张');
					return;
				}
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
						if(that.state==false){
							that.promotionPoster = [url];
							that.state = true;
							that.axios.post('/api/savepromotionposter',{agentID:agentID,url:url}).then(function(res1){
								if(res1.data.code===500){
									that.$message.info('系统出错了');
									return;
								}
								that.$message.info('上传成功');
							})
						}else{
							that.promotionPoster.push(url);
							that.axios.post('/api/savepromotionposter',{agentID:agentID,url:url}).then(function(res1){
								if(res1.data.code===500){
									that.$message.info('系统出错了');
									return;
								}
								that.$message.info('上传成功');
							})
						}
					}else{
						that.$message.info('上传失败');
					}
				})
			},
			changePrepromotionPoster(){
				let that = this;
				let agentID = window.localStorage['agentID'];
				this.axios.post('/api/changeprepromotionposter',{agentID:agentID}).then(function(res){
					if(res.data.code===500){
						that.$message.info('系统出错了');
						return;
					}
					if(res.data.code===300){
						that.$message.info('请上传内容');
						return;
					}
					that.$router.replace({name:'SuccessRemind'});
				})
			}
		},
	}
</script>

<style scoped lang="less">
	.promotion-poster{
		padding-top: 20px;
		width:100vw;
		min-height: 100vh;
		background-color: #F2F5FA;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.add-remind{
		margin-top:5px;
		margin-bottom:10px;
		font-size: 10px;
		color: #999;
	}
	.add-reminda{
		margin-top:5px;
		font-size: 10px;
		color: #FE2E5C;
	}
	.add-remindx{
		padding:20px;
		width:340px;
		height: 90px;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #1476FE;
		box-shadow: 0 1px 6px 0px rgba(100,100,100,.3);
		font-size: 12px;
		color: #fff;
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
	.add-poster,.add-example{
		width:340px;
		min-height: 150px;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 1px 6px 0px rgba(100,100,100,.3);
	}
	.add-poster{
		background-color: #1476FE;
	}
	.add-example{
		margin-bottom: 100px;
	}
	.poster-plus{
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
	.poster-title{
		margin-top:10px;
		font-size: 16px;
		font-weight: 900;
		color: #fff;
	}
	.poster-subtitle{
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
	.complete{
		position: fixed;
		bottom: 0px;
		width:100vw;
		height: 70px;
		color: #fff;
		background-color: rgb(245,245,245);
		display: flex;
		align-items: center;
		justify-content: center;
		
		
	}
	.complete-t{
		width:90vw;
		height: 50px;
		color: #fff;
		background-image: linear-gradient(135deg, rgba(244, 213, 131, 1), rgba(191, 152, 57, 1.0));
		text-align: center;
		line-height: 50px;
		border-radius: 5px;
		font-weight: 900;
		font-size: 16px;
		
	}
</style>

