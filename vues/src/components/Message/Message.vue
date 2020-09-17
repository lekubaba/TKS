<template>
	<transition name="fade">
		<div class="message" :class="type" v-show="show">
			<i class="icon"></i>
			<span class="text">{{text}}</span>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
export default {
	name: 'Message',
	props: {
		type: {
			type: String,
			default: 'info',
			validator: val => ['info', 'success', 'warning', 'error'].includes(val)
		},
		text: {
			type: String,
			default: ''
		},
		show: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style scoped lang="less">
	.fade-enter-active,.fade-leave-active {
		transition: opacity .3s
	}
    
	.fade-enter, .fade-leave-to{
		opacity:0; 
	}
	.message{
		position:fixed;
		top:40vh;
		left:50%;
		transform:translateX(-50%);
		min-width: 20px;
		height: 60px;
		padding:0 30px 0 30px;
		z-index:1000;
		background-color: rgba(222,222,222,.8);
		border-radius: 10px;
		color:#333;
		font-size: 16px;
		font-weight: 900;
		display: flex;
		align-items: center;
		justify-content: center;
		&.info{
			color:#333;
		}
		     
		&.success{
			color:#1476fe;
		}
		
		&.error{
			color:#fe2e5c;
		}
		  
		&.warning{
			color:#ff654d;
		}
		      
		
		
	}
</style>