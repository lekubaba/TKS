<template>
	<div class='loading' v-if="show">
		<div class="spinner" v-if='show2'>
			<div class="rect1 rect"></div>
			<div class="rect2 rect"></div>
			<div class="rect3 rect"></div>
			<div class="rect4 rect"></div>
			<div class="rect5 rect"></div>
		</div>
		<div class='text' v-if='!show2'>没有更多了</div>
	</div>
</template>

<script>
	export default {
		name: 'Loading',
		props:{
			
			show: {
				type: Boolean,
			},
			show2:{
				type:Boolean,
			}
		},
		data(){
			return {
				
			}
		},
		
	}
</script>

<style scoped lang="less">
	.loading{
		width:100%;
		height: 35px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.spinner {
		width: 40px;
		height: 14px;
		text-align: center;
		font-size: 5px;
	}

	.spinner .rect{
		margin-left: 3px;
		background-color: #1476FE;
		height: 100%;
		width: 3px;
		display: inline-block;
		-webkit-animation: stretchdelay 1.2s infinite ease-in-out;
		animation: stretchdelay 1.2s infinite ease-in-out;
		border-top-right-radius: 3px;
		border-top-left-radius: 3px;
		border-bottom-right-radius: 3px;
		border-bottom-left-radius: 3px;
	}

	.spinner .rect2 {
		-webkit-animation-delay: -1.1s;
		animation-delay: -1.1s;
	}
	 
	.spinner .rect3 {
		-webkit-animation-delay: -1.0s;
		animation-delay: -1.0s;
	}
	 
	.spinner .rect4 {
		-webkit-animation-delay: -0.9s;
		animation-delay: -0.9s;
	}
	 
	.spinner .rect5 {
		-webkit-animation-delay: -0.8s;
		animation-delay: -0.8s;
	}
	 
	@-webkit-keyframes stretchdelay {
		0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
		20% { -webkit-transform: scaleY(1.0) }
	}
	 
	@keyframes stretchdelay {
		0%, 40%, 100% {
			transform: scaleY(0.4);
			-webkit-transform: scaleY(0.4);
		}  20% {
			transform: scaleY(1.0);
			-webkit-transform: scaleY(1.0);
		}
	}
	.text{
		font-size: 12px;
		color: #999;
	}
</style>
