<template>
	<div class='user-protocol'>
		<p class='protocol-a'>更新并生效于：2020年11月1日</p>

		<p class='protocol-b'>统客为平台推出的分销平台，致力于帮助销售员提供线上分销工具，提高获客效率，以下是购买了统客服务用户（简称VIP用户）的使用权益和规则：</p>
		
		<p class='protocol-b'>一、统客VIP用户的权益</p>
		<ol class='protocol-c'>
			<li>具有不限区域分销获客的权限。</li>
			<li>实时获取客户数据的权限。</li>
		</ol>
		
		<p class='protocol-b'>二、统客VIP服务的使用</p>
		<ol class='protocol-c'>
			<li>统客VIP服务为不兑现、不退款产品。</li>
			<li>统客VIP服务有效期12个月，自购买之日起生效。</li>
		</ol>

		
		<p class='protocol-b'>三、声明</p>
		
		<p class='protocol-b'>请从官方渠道购买，若通过不正当手段获得统客服务，平台有权利关闭服务。</p>
		
	</div>
</template>

<script>
	export default {
		name: 'UserProtocol',
		components: {
			// HelloWorld
		},
		created() {
			
		}
	}
</script>

<style scoped lang="less">
	.user-protocol{
		padding:20px;
		width:100vw;
		height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		// align-items: center;
		// justify-content: center;
		font-size: 13px;
	}
	.protocol-a{
		margin-bottom: 30px;
	}
	
	.protocol-b{
		margin-bottom: 20px;
	}
	
	.protocol-c{
		margin-left: 18px;
		margin-bottom: 20px;
	}

</style>

