<template>
	<div class='open-third'>
		<div class='open-top'>
			<p>系统默认为二级分销，如果想让代理多享受一个层级的返佣，这里可以帮助你实现。</p>
			<p>多一级确实更能激发代理的积极性，但也意味着需要发放更多的佣金。</p>
		</div>
		<div class='add-open' @click='confirmationBox' :style="{backgroundColor:this.$store.state.color}">
			<div class='open-plus'>+</div>
			<div class='open-title'>开通</div>
			<div class='open-subtitle'>此功能不可逆，请三思</div>
		</div>
		<MaskPage v-bind:is-mask.sync='isMask' v-bind:is-title='isTitle' v-bind:color='this.$store.state.color'></MaskPage>
	</div>
</template>

<script>
	import MaskPage from '../components/MaskPage.vue'
	export default {
		name: 'OpenThirdLevel',
		components: {
			MaskPage,
		},
		data(){
			return {
				isMask:{
					isMask:false,
					isSubmit:false,
				},
				isTitle:{
					superText:'确定开通三级分销吗？',
					subText:'此功能开通不可返回'
				},
				openState:'opening'
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
				this.axios.post('/api/islevel',{agentID:agentID})
				.then(function(res){
					if(res.data.code===500){
						that.$message.success('系统出错了');
						return;
					}
					if(res.data.code===200){
						that.$loading.hide();
						return;
					}
					that.$loading.hide();
					that.$router.replace({name:'SuccessRemind'})
				})
			},
			confirmationBox(event){
				this.isMask.isMask = true;
			},
			openThirdLevel(){
				let that = this;
				let agentID = window.localStorage['agentID'];
				this.axios.post('/api/openThirdLevel',{agentID:agentID})
				.then(function(res){
					if(res.data.code===500){
						that.$message.success('系统出错了');
						return;
					}
					that.$router.replace({name:'SuccessRemind'})
					
				})
			}
			
		},
		watch:{
			isMask(){
				let submit = this.isMask.isSubmit;
				if(submit !== 'null' && submit !=='undefined' && submit ===true){
					this.openThirdLevel();
				}else{
					return;
				}
				
			}
		}
	}
</script>

<style scoped lang="less">
	.open-third{
		padding:0 30px 0 30px;
		width:100vw;
		height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.open-top{
		width:85vw;
		height: 120px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color:#999;
		font-size: 12px;
	}
	.add-open{
		width:85vw;
		height: 150px;
		border-radius: 5px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 1px 6px 0px rgba(100,100,100,.3);
	}
	.add-open{
		background-color: #1476FE;
	}
	.open-plus{
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
	.open-title{
		margin-top:10px;
		font-size: 16px;
		font-weight: 900;
		color: #fff;
	}
	.open-subtitle{
		font-size: 12px;
		color: #eee;
	}
</style>
