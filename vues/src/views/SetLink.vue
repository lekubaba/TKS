<template>
	<div class='link'>
		<div class='top'>
			你需要准备在第三方拿到的推广链接，并将链接在这里复制粘贴并保存。
		</div>
		<div class='add-link-top'>
			<textarea maxlength="300" class='link-input' ref='link' :placeholder="productsLink?productsLink:'复制粘贴第三方申请链接或购买链接'" onkeyup="this.value=this.value.replace(/[, ]/g,'')"></textarea>
		</div>
		<div class='link-sure' @click='saveLink' :style="{backgroundColor:this.$store.state.color}">保存</div>
	</div>
</template>

<script>
	export default {
		name: 'SetLink',
		components: {
			
		},
		data(){
			return {
				productsLink:'',
				
			}
		},
		beforeRouteEnter (to, from, next) {
		  if(window.localStorage['isVIP']=="true"){
			  next();
			  return;
		  }
		  next({name:"Promotion"});
		},
		methods:{
			getData(){
				let that = this;
				let agentID = window.localStorage['agentID'];
				this.axios.post('/api/getlink',{agentID:agentID})
				.then(function(res){
					if(res.data.code===500){
						that.$loading.hide();
						that.$message.info('系统出错了');
						return;
					}
					if(res.data.productsLink=='http://qiniu.tongkeapp.com/default_20201010_01.png'){
						that.$loading.hide();
						return;
					}
					that.productsLink = '已绑定链接：'+res.data.productsLink;
					that.$loading.hide();
				})
			},
			saveLink(){
				let that = this;
				let url = this.$refs.link.value;
				let agentID = window.localStorage['agentID'];
				let isURL = this.$Utils.checkURL(url);
				if(!url){
					this.$message.info('不能为空');
					return;
				}
				if(!isURL){
					this.$message.info('格式不正确');
					return;
				}
				let linkData = {
					productsLink:url,
					agentID:agentID,
				}
				this.axios.post('/api/savelink',linkData)
				.then(function(res){
					if(res.data.code===500){
						that.$message.info('系统出错了');
						return;
					}
					that.$router.replace({name:'SuccessRemind'})
					
				})
				
				
				
			},
		},
		created() {
			this.$loading.show();
			this.getData();
		},
		mounted(){
	
		}
	}
</script>

<style scoped lang="less">
	.link{
		padding:10px 0 0 0;
		width:100vw;
		height: 100vh;
		background-color: #F2F5FA;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
		color: #999;
	}
	.top{
		width:85vw;
		height: 90px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		color:#999;
		font-size: 12px;
	}
	.add-link-top{
		width:85vw;
		height: 165px;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 16px;
		box-shadow: 0 1px 6px 0px rgba(100,100,100,.3);
	}
	.link-input{
		padding:5px 10px 10px 10px;
		width:85vw;
		height: 165px;
		border:none;
		border-radius: 5px;
		font-size: 18px;
		color: #666;
	}
	.link-sure{
		margin-top:20px;
		width:85vw;
		height: 50px;
		text-align: center;
		line-height: 50px;
		background-color: #1476FE;
		color: #fff;
		font-size: 16px;
		border-radius: 5px;
	}

	
</style>
