<template>
	<transition name='fade'>
		<div class='mask' v-if='isMask.isMask'>
			<div class='mask-contenta'>
				<div class='mask-titlea'>{{isTitle.superText}}</div>
				<div class='mask-titleb'>{{isTitle.subText}}</div>
				<div class='mask-button'>
					<div class='mask-confirm' @click='isConfirm'>确认</div>
					<div class='mask-cancel' @click='isCancel'>取消</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'MaskPage',
		props:{
			isMask:Object,
			isTitle:Object
		},
		data(){
			return {
				
			}
		},
		methods:{
			isCancel(){
				this.$emit('update:isMask', {isMask:false,isSubmit:false});
			},
			isConfirm(){
				this.$emit('update:isMask', {isMask:false,isSubmit:true});
			}
		}
	}
</script>

<style scoped lang="less">
	.mask{
		position: fixed;
		bottom:0px;
		width:100vw;
		height: calc(100vh + 250px);
		background-color: rgba(0,0,0,.7);
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		// justify-content:center;
	}
	.mask-contenta{
		position: relative;
		top:0px;
		width:100vw;
		height: 250px;
		background-color: rgb(247,247,247);
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .3s,bottom .3s;
		// transition: opacity .3s;
	}
	.fade-enter{
		bottom:-250px;
		opacity: 0;
	}
	.fade-enter-to{
		bottom:0px;
	}
	.fade-leave{
		bottom: 0px;
	}
	.fade-leave-to {
		bottom:-250px;
		opacity: 0;
	}
	.mask-titlea{
		margin-top:40px;
		font-size: 24px;
		font-weight: bolder;
		color:#1476fe;
	}
	.mask-titleb{
		margin-top:5px;
		font-size: 13px;
		font-weight: bolder;
		color: #999;
	}
	.mask-button{
		position: absolute;
		bottom: 0px;
		width:100%;
		height: 120px;
		display: flex;
		flex-direction: column;
	}
	.mask-cancel,.mask-confirm{
		width:100%;
		height: 55px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 18px;
		font-weight: 900;
		cursor: pointer;
		border-top:.5px solid #aaa;
	}
	.mask-cancel{
		color: #1476fe;
		// background-image: linear-gradient(135deg, rgba(244, 213, 131, 1), rgba(191, 152, 57, 1.0));
	}
	.mask-confirm{
		color: #999;
	}
</style>
