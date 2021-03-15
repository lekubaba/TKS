<template>
	<div class='bonus-profile'>
		<div class='bonus'>
			<div>城市总监和城市独家需要经过专业的培训，如果您还不会计算自己的管理奖金和规则，请联系客服接受培训，如果您想升级为城市总监或独家，请联系客服申请提升！</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name: 'BonusProfile',
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
			
		},
		computed:{
			...mapState({
				userInfo:state=>state.userInfo,
				color:state=>state.color,
			})
		}
	}
</script>

<style scoped lang="less">
	
	.bonus-profile{
		width:100vw;
		min-height: 100vh;
		background-color: #F2F5FA;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 100px;
	}
	
	.bonus{
		margin-top:20px;
		width:90%;
		padding:30px 20px 30px 20px;
		background-color: #fff;
		border-radius: 10px;
	}

</style>

