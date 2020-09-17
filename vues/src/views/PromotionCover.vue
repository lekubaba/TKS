<template>
	<div class='promotion-cover'>
		<div class='add-remind'>本月剩余上传次数：5次</div>
		<div class='add-cover' :style="{backgroundColor:this.$store.state.color}">
			<div class='cover-plus'>+</div>
			<div class='cover-title'>上传封面</div>
			<div class='cover-subtitle'>尺寸：680像素*300像素</div>
		</div>
		<div class='add-remind'>封面图将在菜单'更多'中作为入口图</div>
		<div class='add-title'>示例：</div>
		<div class='add-example'>
			<img src="http://qiniu.tongkeapp.com/promotion_cover_04.png">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'PromotionCover',
		components: {
			// HelloWorld
		},
		created() {
			
		}
	}
</script>

<style scoped lang="less">
	.promotion-cover{
		padding-top: 20px;
		width:100vw;
		height: 100vh;
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
	.add-cover,.add-example{
		width:340px;
		height: 150px;
		border-radius: 5px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 1px 6px 0px rgba(100,100,100,.3);
	}
	.add-cover{
		background-color: #1476FE;
	}
	.add-example{
		
	}
	.cover-plus{
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
	.cover-title{
		margin-top:10px;
		font-size: 16px;
		font-weight: 900;
		color: #fff;
	}
	.cover-subtitle{
		font-size: 12px;
		color: #eee;
	}
	.add-example img{
		width:100%;
	}
</style>
