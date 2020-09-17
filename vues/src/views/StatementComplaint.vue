<template>
	<div id='statement-complaint'>
		<div class='statement'>
			<p>申明:</p>
			<p>统客是一家为销售员提供二级分销软件的平台，平台上所有的推广活动均为第三方入驻平台发布的活动.</p>

			<p class='margin'>投诉:</p>
			<p>如果在推广过程中，遇到佣金纠纷问题，您可以联系统客官方，我们将维护您的权益。</p>
		</div>
	</div>
</template>

<script>

export default {
	name: 'StatementComplaint',
	components: {
		// HelloWorld
	},
	created() {
		
	}
}
</script>

<style lang="less" scoped>
	#statement-complaint{
		width:100vw;
		min-height: 100vh;
		background-color: #1476FE;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding:30px;
	}
	.statement p{
		color:#fff;
		font-size: 14px;
	}
	.margin{
		margin-top:20px;
	}
</style>
