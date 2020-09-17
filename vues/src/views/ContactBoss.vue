<template>
	<div class='contact-boss' :style="{backgroundColor:this.$store.state.color}">
		<h1>联系我们</h1>
		<h3>老板电话：15898776766</h3>
		<h3>老板微信：15898776766</h3>
		<h4>如遇到推广、佣金等问题，请联系我们。</h4>
	</div>
</template>

<script>
	export default {
		name: 'ContactBoss',
		components: {
			// HelloWorld
		},
		data(){
			return {
				
			}
		},
		created() {
			
		}
	}
</script>

<style scoped lang="less">
	.contact-boss{
		padding:40px 20px 20px 20px;
		width:100vw;
		height: 100vh;
		background-color: #1476fe;
		display: flex;
		flex-direction: column;
		// align-items: center;
		// justify-content: center;
		font-size: 13px;
		color: #fff;
	}
	// .contact-boss {
	// 	background: linear-gradient(135deg, #f66, #f90, #3c9, #09f, #66f) left center/400% 400%;
	// 	animation: move 10s infinite;
	// }
	@keyframes move {
		0%,
		100% {
			background-position-x: left;
		}
		50% {
			background-position-x: right;
		}
	}
	h1{
		margin-bottom: 20px;
	}
	h4{
		margin-top:20px;
	}

</style>

