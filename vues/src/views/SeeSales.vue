<template>
	<div class='see-sales'>
		<div class='sales-total' :style="{backgroundColor:color}">
			<div class='sales-title'>团队销售额 (元)</div>
			<div class='sales-sum'>{{sales?sales:'0.00'}}</div>
		</div>
		<div class='see-s-navs'>
			<router-link :to="{name:'OwnLevelSales',query:{level:'zero'}}" replace class='see-s-nav' active-class="active" exact>自推客户</router-link>
			<router-link :to="{name:'OneLevelSales',query:{level:'one'}}" replace class='see-s-nav' active-class="active" exact>一级客户</router-link>
			<router-link :to="{name:'TwoLevelSales',query:{level:'two'}}" replace class='see-s-nav' active-class="active" exact v-if='isAddLevel'>二级客户</router-link>
			<router-link :to="{name:'TotalLevelSales',query:{level:'allin'}}" replace class='see-s-nav' active-class="active" exact v-if='userInfo.isVIP||isManager'>全部客户</router-link>
		</div>
		<router-view v-bind:sales='salesProfile'/>
		<Loading v-bind:show='isLoading' v-bind:show2='isLoading2'/>
		
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import Loading from '../components/Loading.vue'
	export default {
		name: 'SeeSales',
		components: {
			Loading
		},
		data(){
			return {
				salesProfile:[],
				sales:'',
				isManager:'',
				isLoading:false,
				isLoading2:true,
				level:'',
				
			}
		},
		created() {
			this.$loading.show();
			this.getData();
		},
		computed:{
			...mapState({
				userInfo:state=>state.userInfo,
				color:state=>state.color,
				isAddLevel:state=>state.isAddLevel,
			})
		},
		methods:{
			getData(){
				let that = this;
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				this.axios.post('/api/seesales',{agentID:agentID,productsId:productsId})
				.then(function(res){
					if(res.data.code==500){
						that.$message.info('系统故障了');
						return;
					}
					that.sales = res.data.sales;
					that.isManager = res.data.isManager;
					that.$loading.hide();
					
				})
			},
			scroll() {
				let that = this;
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				
				window.onscroll = () => {
					// 距离底部200px时加载一次
					
					// 变量scrollTop为当前页面的滚动条纵坐标位置
					let scrollTop =
					  document.documentElement.scrollTop || document.body.scrollTop;
					// 变量 windowHeight 是可视区的高度
					let windowHeight =
					  document.documentElement.clientHeight || document.body.clientHeight;
					// 变量 scrollHeight 是滚动条的总高度
					let scrollHeight =
					  document.documentElement.scrollHeight || document.body.scrollHeight;
					// 距离底部100px时加载一次
					let bottomOfWindow =  scrollHeight -(scrollTop + windowHeight)<=100;
					if (bottomOfWindow&&that.isLoading == false) {
						if(!that.level){
							return;
						}
						that.isLoading = true;
						let count = that.salesProfile.length;
						let level = that.level;
						that.axios.post('/api/seesalesplus',{agentID:agentID,productsId:productsId,num:count,level:level})
						.then(function(res){
							if(res.data.code===500){
								that.$message.info('系统故障了');
								return;
							}
							if(res.data._order.length===0){
								that.isLoading2 = false;
								return;
							}
							that.salesProfile = that.salesProfile.concat(res.data._order)
							that.isLoading = false;
							
						})
						
					}
				}
			},
		},
		watch: {
			$route (newRoute) {
				let that = this;
				let newUserId = newRoute.params.userId
				let newQuery = newRoute.query.level
				this.level = newQuery;
				that.isLoading = false;
				that.isLoading2 = true;
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				let data = {
					level:newQuery,
					agentID:agentID,
					productsId:productsId
				}
				this.axios.post('/api/seesaleslevel',data)
				.then(function(res){
					if(res.data.code==500){
						that.$message.info('系统故障了');
						return;
					}
					
					that.salesProfile = res.data._order;
					
				})
				
			}
		},
		mounted() {
			this.scroll()
		}
		
		
	}
</script>

<style scoped lang="less">
	.see-sales{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
		
	}
	.sales-total{
		margin-top:20px;
		width:92vw;
		height: 156px;
		background-color: #fff;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		// background-image: linear-gradient(135deg,#f5336e 0%,#ff7639 100%);
		background-color: #1476fe;
		padding:20px 0 0 20px;
	}
	.sales-title{
		font-size: 14px;
		color: #fff;
	}
	.sales-sum{
		font-size: 50px;
		font-weight: 900;
		color: #fff;
	}
	.see-s-navs{
		width:92vw;
		height: 45px;
		display: flex;
		justify-content: space-between;
		background-color: rgb(247,247,247);
	}
	.see-s-nav{
		width:25%;
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
