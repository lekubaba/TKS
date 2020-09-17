<template>
	<div class='see-team'>
		<div class='team-total' :style="{backgroundColor:color}">
			<div class='team-title'>团队人数</div>
			<div class='team-sum'>0</div>
		</div>
		<div class='see-t-navs'>
			<router-link :to="{name:'OneLevelTeam',query:{level:'one'}}" class='see-t-nav' active-class="active" exact>一级团队</router-link>
			<router-link :to="{name:'TwoLevelTeam',query:{level:'two'}}" class='see-t-nav' active-class="active" exact>二级团队</router-link>
			<router-link :to="{name:'TotalLevelTeam',query:{level:'allin'}}" class='see-t-nav' active-class="active" exact v-if='userInfo.isVIP'>全部</router-link>
		</div>
		<router-view v-bind:team='teamProfile'/>
		
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name: 'SeeTeam',
		components: {
			// HelloWorld
		},
		data(){
			return {
				teamProfile:''
			}
		},
		created() {
			
		},
		watch:{
			$route (newRoute) {
				let newUserId = newRoute.params.userId
				let newQuery = newRoute.query.level
				if(newQuery==='zero'){
					this.teamProfile = [1]
				}else if(newQuery==='one'){
					this.teamProfile = [1,2]
				}else if(newQuery==='two'){
					this.teamProfile = [1,2,3]
				}else if(newQuery==='allin'){
					this.teamProfile = [1,2,3,4,5]
				}
			}
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
	.see-team{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
	}
	.team-total{
		margin-top:20px;
		width:92vw;
		height: 206px;
		background-color: #fff;
		border-radius: 20px;
		// background-image: linear-gradient(135deg,#39485c 0%,#333 100%);
		padding:20px 0 0 20px;
	}
	.team-total {
		// background: linear-gradient(135deg, #1ff0ef, #1476fe, #3c9, #09f, #66f) left center/400% 400%;
		background-color: #1476fe;
		animation: move 10s infinite;
	}
	@keyframes move {
		0%,
		100% {
			background-position-x: left;
		}
		50% {
			background-position-x: right;
		}
	}
	.team-title{
		font-size: 14px;
		color: #fff;
	}
	.team-sum{
		font-size: 50px;
		font-weight: 900;
		color: #fff;
	}
	.see-t-navs{
		margin-top:10px;
		width:80vw;
		height: 45px;
		display: flex;
	}
	.see-t-nav{
		width:33.33333%;
		height: 45px;
		text-align: center;
		line-height: 45px;
		font-size: 13px;
		color: #666;
		
	}
	.active{
		position: relative;//给当前元素添加相对定位,也就是after的父级
		font-weight: 700;
		&:after {
			content: " ";
			width: 30px;
			height: 0.12rem;
			background: #1476fe;
			position: absolute;
			bottom: 0.5rem;
			left: 50%;
			transform: translateX(-50%);//居中处理
		}
	}
</style>

