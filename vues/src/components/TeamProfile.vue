<template>
	<div class="team">
		<div class='profile'>
			<div class='profile-item' v-for = 'item in team' v-bind:key='item'>
				<img class='profile-item-avatar' src="http://qiniu.tongkeapp.com/appletouchicon.png">
				<div class='profile-item-content'>
					<div class='profile-item-text'>
						<div class='profile-item-info'>杨思 15888888888   8月23日</div>
						<div class='profile-item-wraper'>
							<div class='profile-item-left'>
								<div class='profile-item-state' :style="{color:color}">总业绩：1324333</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex';
export default {
	name: 'TeamProfile',
	components: {
		// HelloWorld
	},
	props:['team'],
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
			color:state=>state.color,
		})
	}
	
}
</script>
<style scoped lang="less">
	.team{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		padding-bottom: 100px;
	}
	.profile-item{
		width:100vw;
		height: 60px;
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


