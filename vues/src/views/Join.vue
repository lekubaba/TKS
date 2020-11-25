<template>
	<div class='join'>
		<div class='tips'>成为商户</div>
		<div class='join-tips'>成为商户条件：</div>
		<ol class='tips-ol'>
			<li>对拿钱模式有较深入的了解；</li>
			<li>在拿钱过往无违规记录；</li>
			<li>具备或已代理了较有优势的产品；</li>
			<li>具有一定的服务能力，能服务客户和代理；</li>
			<li>其他。</li>
		</ol>
		<div class='join-tips'>入驻流程：</div>
		<div class='tips-ol'>
			<div>详情加客服微信："naqianfuwu"  咨询。加微信请备注：“我要入驻”；</div>
		</div>
		<!-- <div class='to-join' @click='toJoin'>成为商户</div> -->
	</div>
</template>

<script>
	export default {
		name: 'Join',
		components: {
			// HelloWorld
		},
		data(){
			return {

			}
		},
		methods:{
		
		},
	
	}
</script>

<style scoped lang="less">
	.join{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top:10px;

	}
	.tips{
		margin-top:20px;
		padding:20px;
		width:85vw;
		height: 120px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color:#fff;
		font-size: 20px;
		font-weight: 900;
		background-color: #1476FE;
		border-radius: 5px;
		box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
	}
	.join-tips{
		margin:20px 0 10px 0;
		width:85vw;
		font-size: 20px;
		color:#333;
		font-weight: 900;
	}
	.tips-ol li{
		width:75vw;
		font-size: 14px;
		color:#666;
	}
	.tips-ol div{
		width:85vw;
		font-size: 14px;
		color:#666;
	}
	.to-join{
		margin-top:40px;
		width:80vw;
		height: 50px;
		background-color: #1476fe;
		text-align: center;
		line-height: 50px;
		font-size: 20px;
		// font-weight: 900;
		color: #fff;
		border-radius: 10px;
	}
</style>