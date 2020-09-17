
<template>
	<div class='agent-poster'>
		<div class='add-remind'>本月剩余上传次数：5次</div>
		<div class='add-poster' :style="{backgroundColor:this.$store.state.color}">
			<div class='poster-plus'>+</div>
			<div class='poster-title'>上传招商正文海报</div>
			<div class='poster-subtitle'>尺寸：宽度680像素，高度不限</div>
		</div>
		<div class='add-remind'>将作为招商海报供代理了解推广事项</div>
		<div class='add-remindx' :style="{backgroundColor:this.$store.state.color}">
			注意事项：将设计的单张海报切片成多张图上传将提升用户访问页面的速度，请把控好图片的大小，过大的图片用户可能打不开页面。
		</div>
		<div class='add-title'>示例：</div>
		<div class='add-example'>
			<img class='poster-item' v-for='item in agentPoster' v-bind:key='item.id' :src="item.posterUrl">
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
				agentPoster:[
					{id:0,posterUrl:'http://qiniu.tongkeapp.com/agent_poster_04.png'},
					{id:1,posterUrl:'http://qiniu.tongkeapp.com/agent_poster_04.png'},
					{id:2,posterUrl:'http://qiniu.tongkeapp.com/agent_poster_04.png'},
					{id:3,posterUrl:'http://qiniu.tongkeapp.com/agent_poster_04.png'},
					{id:4,posterUrl:'http://qiniu.tongkeapp.com/agent_poster_04.png'},
					{id:5,posterUrl:'http://qiniu.tongkeapp.com/agent_poster_04.png'},
					{id:6,posterUrl:'http://qiniu.tongkeapp.com/agent_poster_04.png'},
					{id:7,posterUrl:'http://qiniu.tongkeapp.com/agent_poster_04.png'},
				],
			}
		},
		created() {
			
		}
	}
</script>

<style scoped lang="less">
	.agent-poster{
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
		margin-bottom: 10px;
		font-size: 10px;
		color: #999;
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
</style>


