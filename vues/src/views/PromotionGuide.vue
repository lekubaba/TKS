<template>
	<div class='promotion-guide'>
		<div class='guide-wraper'>
			<img class='guide-item' v-for='item in regularPoster' :src="item">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'PromotionGuide',
		components: {
			// HelloWorld
		},
		created() {
			this.$loading.show();
			this.fetchData();
		},
		data(){
			return {
				regularPoster:'',
				productsID:'',
				
			}
		},
		methods:{
			fetchData(){
				let that = this;
				let productsID = this.$route.query.id;
				let proData = {
					productsID:productsID,
				}
				this.axios.post('/api/regularposter',proData)
					.then(function(res){
						if(res.data.code===500){
							that.$message.info('系统出错了');
							return;
						}
						that.$loading.hide();
						that.regularPoster = res.data.regularPoster;
						
					})
			},
		},
	}
</script>

<style scoped lang="less">
	.promotion-guide{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 13px;
	}
	
	.guide-wraper{
		width:100vw;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.guide-wraper img{
		width:100%;
	}

</style>

