<template>
	<div class='more-promotion'>
		<div class='more-item' @click='toPromotionProfile' data-url='hello.vue'>
			<img src="http://qiniu.tongkeapp.com/poster_06.png">
		</div>
		<div class='more-item' @click='toGetCustomerPage' data-url='hello.vue'>
			<img src="http://qiniu.tongkeapp.com/poster_04.png">
		</div>
		<div class='more-item' @click='toSetHomePage' data-url='hello.vue'>
			<img src="http://qiniu.tongkeapp.com/poster_02.png">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'MorePromotion',
		data () {
			return {
				yjx:'yjx is lekubaba',
			}
		},
		methods:{
			toPromotionProfile(event){
				console.log(event.currentTarget.dataset.url);
				this.$router.push({name:'GetAgentPage'});
			},
			toGetCustomerPage(){
				this.$router.push({name:'GetCustomerPage'});
			},
			toSetHomePage(){
				this.$router.push({name:'SetHomePage'});
			},
		},
		watch: {

		},
		created () {

		}

	}
</script>

<style scoped lang="less">
	.more-promotion{
		width:100vw;
		height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
	}
	.more-item{
		position: relative;
		top:0px;
		margin-top:20px;
		width:340px;
		height: 150px;
		border-radius: 5px;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 1px 6px 0px rgba(100,100,100,.3);
		
	}
	.more-item img{
		width:100%;
		height: auto;
	}

</style>

