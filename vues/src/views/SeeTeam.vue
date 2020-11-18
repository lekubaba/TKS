<template>
	<div class='see-team'>
		<div class='team-total' :style="{backgroundColor:color}">
			<div class='team-title'>团队人数</div>
			<div class='team-sum'>{{team?team:'0'}}</div>
		</div>
		<div class='see-t-navs'>
			<router-link :to="{name:'OneLevelTeam',query:{level:'one'}}" replace class='see-t-nav' active-class="active" exact>一级团队</router-link>
			<router-link :to="{name:'TwoLevelTeam',query:{level:'two'}}" replace class='see-t-nav' active-class="active" exact v-if='isAddLevel'>二级团队</router-link>
			<router-link :to="{name:'TotalLevelTeam',query:{level:'allin'}}" replace class='see-t-nav' active-class="active" exact v-if='userInfo.isVIP'>全部</router-link>
		</div>
		<router-view v-bind:team='teamProfile'/>
		<Loading v-bind:show='isLoading' v-bind:show2='isLoading2'/>
		
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import Loading from '../components/Loading.vue';
	export default {
		name: 'SeeTeam',
		components: {
			Loading
		},
		data(){
			return {
				teamProfile:[],
				team:'',
				isLoading:false,
				isLoading2:true,
				level:'',
			}
		},
		created() {
			this.$loading.show();
			this.getData();
		},
		methods:{
			getData(){
				let that = this;
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				this.axios.post('/api/seeteam',{agentID:agentID,productsId:productsId})
				.then(function(res){
					if(res.data.code==500){
						that.$loading.hide();
						that.$message.info('系统故障了');
						return;
					}
					that.team = res.data.team;
					that.$loading.hide();
					
				})
			},
			scroll() {
				let that = this;
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				
				
				window.onscroll = () => {
					// 距离底部200px时加载一次
					
					let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 100
					if (bottomOfWindow&&that.isLoading == false) {
						if(!that.level){
							return;
						}
						that.isLoading = true;
						let count = that.teamProfile.length;
						let level = that.level;
						that.axios.post('/api/seeteamplus',{agentID:agentID,productsId:productsId,num:count,level:level})
						.then(function(res){
							if(res.data.code===500){
								that.$message.info('系统故障了');
								return;
							}
							if(res.data._agents.length===0){
								that.isLoading2 = false;
								return;
							}
							that.teamProfile = that.teamProfile.concat(res.data._agents)
							that.isLoading = false;
							
						})
						
					}
				}
			},
		},
		watch:{
			$route (newRoute) {
				let that = this;
				let newUserId = newRoute.params.userId
				let newQuery = newRoute.query.level;
				this.level = newQuery;
				that.isLoading = false;
				that.isLoading2 = true;
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				let data = {
					level:newQuery,
					agentID:agentID,
					productsId:productsId,
				}
				this.axios.post('/api/seeteamlevel',data)
				.then(function(res){
					if(res.data.code==500){
						that.$message.info('系统故障了');
						return;
					}
					
					that.teamProfile = res.data._agents;
					
				})
			}
		},
		computed:{
			...mapState({
				userInfo:state=>state.userInfo,
				color:state=>state.color,
				isAddLevel:state=>state.isAddLevel,
			})
		},
		mounted() {
			this.scroll()
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

