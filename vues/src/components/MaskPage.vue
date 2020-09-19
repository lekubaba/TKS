<template>
	<transition name='fade'>
		<div class='mask' v-if='isMask.isMask'>
			<div class='mask-contenta'>
				<div class='mask-titlea' :style="{color:color}">{{isTitle.superText}}</div>
				<div class='mask-titleb'>{{isTitle.subText}}</div>
				<div class='mask-button'>
					<div class='mask-confirm' @click='isConfirm' :style="{color:color}">确认</div>
					<div class='mask-cancel' @click='isCancel' :style="{backgroundColor:color}">取消</div>
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
			isTitle:Object,
			color:String,
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
		flex-direction: row;
		// border:1px solid red;
		align-items: center;
		justify-content: center;
	}
	.mask-cancel,.mask-confirm{
		width:30%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 16px;
		font-weight: 900;
		cursor: pointer;
		border-radius: 5px;
		margin:0 10px 0 10px;
	}
	.mask-cancel{
		color: #fff;
		background-color: #1476FE;
		
		
	}
	.mask-confirm{
		color: #1476FE;
		background-color: #eee;
	}
</style>
