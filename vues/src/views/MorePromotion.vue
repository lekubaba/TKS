<template>
	<div class='more-promotion' :style="{backgroundColor:color}">
		一个微信账号限推广一款产品
		<p>推广其他产品，需要切换微信</p>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name: 'MorePromotion',
		data () {
			return {
				covers:null,
			}
		},
		computed:{
			...mapState({
				color:state=>state.color,
			})
		}
		

	}
</script>

<style scoped lang="less">
	.more-promotion{
		width:100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding:30px;
		color:#fff;
		font-size: 20px;
	}

</style>

