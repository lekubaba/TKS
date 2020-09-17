<template>
	<div class='union-pay'>
		<div class='open-top'>
			<p>支付功能主要适用于单品分销时用户线上支付的情况，如果你只是用统客来分销获客的传统销售，那么你不需要开通此功能，
			并且你开通了支付，意味着传统获客的方式将被替换。</p>
		</div>
		<div class='add-pay' :style="{backgroundColor:this.$store.state.color}">
			<div class='pay-plus'>+</div>
			<div class='pay-title'>开通</div>
			<div class='pay-subtitle'>此功能不可逆，请三思</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'UnionPay',
		components: {
			// HelloWorld
		},
		created() {
			
		}
	}
</script>

<style scoped lang="less">
	.union-pay{
		padding:0 30px 0 30px;
		width:100vw;
		height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.open-top{
		width:340px;
		height: 120px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color:#999;
		font-size: 12px;
	}
	.add-pay{
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
	.add-pay{
		background-color: #1476FE;
	}
	.pay-plus{
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
	.pay-title{
		margin-top:10px;
		font-size: 16px;
		font-weight: 900;
		color: #fff;
	}
	.pay-subtitle{
		font-size: 12px;
		color: #eee;
	}
</style>
