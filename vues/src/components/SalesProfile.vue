<template>
	<div class="sales">
		<div class='profile'>
			<div class='profile-item' v-for = 'item in sales'>
				<img class='profile-item-avatar' src="http://qiniu.tongkeapp.com/appletouchicon.png">
				<div class='profile-item-content'>
					<div class='profile-item-text'>
						<div class='profile-item-info'>杨思 158****3233 8月23日</div>
						<div class='profile-item-wraper'>
							<div class='profile-item-left'>
								<div class='profile-item-time'>推荐人：杨小小 13222332233</div>
								<div class='profile-item-state' :style="{color:color}">金额：1324333</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

export default {
	name: 'SalesProfile',
	components: {
		// HelloWorld
	},
	props:['sales'],
	data(){
		return {
			salesProfile:'',
			color:this.$store.state.color,
		}
	},
	created() {
	},
	methods:{
	},

	
}
</script>
<style scoped lang="less">
	.sales{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		padding-bottom: 100px;
	}
	.total{
		width:100%;
		height: 70px;
		box-shadow: 0 0 8px 0 rgba(0,0,0,0.10), 0 0 10px 0 rgba(0,0,0,0.1), 0px 1px 1px 2px rgba(222,222,222,0.10);
		// background-color: #1476fe;
		display: flex;
		flex-direction: row;
		margin-bottom: 20px;
		
	}
	.total-all{
		width:50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-weight:700;
	}
	.gray{
		color: #808080;
	}
	.profile{
	
	}

	.profile-item{
		width:100vw;
		height: 70px;
		display: flex;
		padding:5px 20px 0 20px;
	}
	.profile-item-avatar{
		width:32px;
		height:32px;
		border-radius: 21px;
		
	}
	.profile-item-content{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width:calc(100vw - 82px);
		padding:0px 0 5px 6px;
		border-bottom: .5px dashed #ccc;
	
	}
	.profile-item-text{
		width:calc(100vw - 82px);
	}
	.profile-item-wraper{
		
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.button-vip{
		display: flex;
		width:120px;
		justify-content: space-between;
	}
	
	.profile-item-info{
		font-size: 12px;
		color: #999;
		font-weight: 700;
	}
	.profile-item-time{
		font-size: 12px;
		color: #999;
	}
	.profile-item-state{
		font-size: 12px;
		color: #1476fe;
	}
	
</style>

