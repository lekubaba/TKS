<template>
	<div class='account'>
		<div class='container' @click="toBindWX">
			<div class='container-a'>
				<div class='c-title'>
					绑定本人<span style='color:#11b764'>微信号</span>
				</div>
				<div class='remind'>
					微信账号便于您与上下级沟通联系，获得/提供辅导帮助，请填写正确账号。
				</div>
			</div>
			<div class='container-b'>
				<div class='arrow-right'></div>
			</div>
			
		</div>
		<div class='container1' @click='toBindAlipay'>
			<div class='container-a'>
				<div class='c-title'>
					提现到<span style='color:#1475FE'>支付宝</span>
				</div>
				<div class='remind'>
					此支付宝为您提现的收款账户，为确保收款正常，请务必绑定您本人支付宝手机号。
				</div>
			</div>
			<div class='container-b'>
				<div class='arrow-right'></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Account',
		components: {
			// HelloWorld
		},
		data(){
			return {

			}
		},
		created() {
			
		},
		methods:{
			toBindWX(){
				this.$router.push({name:'BindWX'});
			},
			toBindAlipay(){
				this.$router.push({name:'BindAlipay'});
			}
		
		}
	}
</script>

<style scoped lang="less">
.account{
	width:100vw;
	height: 100vh;
	background-color: #F2F5FA;
	display: flex;
	flex-direction: column;
	align-items: center;
	
}
.container{
	margin-top:40px;
	width:92vw;
	height: 150px;
	padding:20px 25px 20px 25px;
	background-color: #fff;
	border-radius: 10px;
	display: flex;
}
.container-a{
	width:80%;
}

.container1{
	margin-top:20px;
	width:92vw;
	height: 150px;
	padding:20px 25px 20px 25px;
	background-color: #fff;
	border-radius: 10px;
	display: flex;
}
.c-title{
	font-size:26px;
	color:#333;
	font-weight: 900;
}

.container-b{
	width:20%;
	height: 100%;
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
}
.arrow-right {
	width: 0;
	height: 0;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	border-bottom: 10px solid #333;
	font-size: 0;
	line-height: 0;
	transform: rotate(90deg);
}


.remind{
	width: 100%;
	padding:5px 0px 0 0px;
	margin-top:5px;
	font-size: 12px;
	color:#666;
}
</style>
