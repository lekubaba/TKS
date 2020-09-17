<template>
	<div class='see-sales'>
		<div class='sales-total' :style="{backgroundColor:color}">
			<div class='sales-title'>销售额 (元)</div>
			<div class='sales-sum'>0.00</div>
		</div>
		<div class='see-s-navs'>
			<router-link :to="{name:'OwnLevelSales',query:{level:'zero'}}" class='see-s-nav' active-class="active" exact>自推业绩</router-link>
			<router-link :to="{name:'OneLevelSales',query:{level:'one'}}" class='see-s-nav' active-class="active" exact>一级业绩</router-link>
			<router-link :to="{name:'TwoLevelSales',query:{level:'two'}}" class='see-s-nav' active-class="active" exact>二级业绩</router-link>
			<router-link :to="{name:'TotalLevelSales',query:{level:'allin'}}" class='see-s-nav' active-class="active" exact v-if='userInfo.isVIP'>全部业绩</router-link>
		</div>
		<router-view v-bind:sales='salesProfile'/>
		
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name: 'SeeSales',
		components: {
			// HelloWorld
		},
		data(){
			return {
				
				salesProfile:''
				
			}
		},
		created() {
			console.log(this.$route.params)
		},
		watch: {
			$route (newRoute) {
				let newUserId = newRoute.params.userId
				let newQuery = newRoute.query.level
				if(newQuery==='zero'){
					this.salesProfile = [1,2,3]
				}else if(newQuery==='one'){
					this.salesProfile = [1,2]
				}else if(newQuery==='two'){
					this.salesProfile = [1,2,3]
				}else if(newQuery==='allin'){
					this.salesProfile = [1,2,3,4,5]
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
		height: 206px;
		background-color: #fff;
		border-radius: 20px;
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
		margin-top:10px;
		width:80vw;
		height: 45px;
		display: flex;
		justify-content: space-between;
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
