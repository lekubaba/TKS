<template>
	<div class='user-protocol'>
		<p class='protocol-a'>更新并生效于：2020年11月1日</p>

		<p class='protocol-b'>统客为湖南乘法表科技为平台推出的分销平台，致力于帮助销售员提供线上分销工具，提高获客效率，「让天下没有难做的销售」，以下是统客分销用户的使用权益和规则：</p>
		
		<p class='protocol-b'>一、分销系统的开通</p>
		<ol class='protocol-c'>
			<li>需在统客公众号申请。</li>
			<li>统客工作人员审核通过以后生效。</li>
		</ol>
		<p class='protocol-b'>二、统客分销用户的权益</p>
		<ol class='protocol-c'>
			<li>具有不限区域分销获客的权限。</li>
			<li>实时获取客户数据的权限。</li>
		</ol>
		
		<p class='protocol-b'>三、统客分销系统的使用</p>
		<ol class='protocol-c'>
			<li>统客提供无门槛、无入驻费用的分销服务。</li>
			<li>首次开通有效期为12个月，自开通之日起生效。</li>
		</ol>

		
		<p class='protocol-b'>四、声明</p>
		
		<p class='protocol-b'>若通过不正当手段获得统客服务，或不正当的使用统客分销，平台有权利关闭服务并追究法律责任。</p>
		
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

