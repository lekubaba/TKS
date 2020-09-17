<template>
	<div id="app">
		<div id="nav">
			<router-link to="/promotion" class='tabbar-item-text' active-class="active" exact>首页</router-link>
			<router-link to="/userdata" class='tabbar-item-text line' active-class="active" exact>客户数据</router-link>
			<router-link to="/usercenter" class='tabbar-item-text' active-class="active" exact>我的</router-link>
		</div>
		<router-view/>
	</div>
</template>
<script>
	export default {
		name: 'Home',
		data () {
			return {
			}
		},
		watch: {
			$route(to,from){
				console.log(to.path)
			}
		},
		created () {

		}

	}	
</script>

<style lang="less">
	#nav{
		position:fixed;
		left: 0;
		bottom: 0px;
		right: 0;
		width:100vw;
		height: 80px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding:10px 0 0 0;
		background-color: #fff;
		box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
		
	}
	.line{
		border-left: 1px solid #e4e4e4;
		border-right: 1px solid #e4e4e4;
	}
	.tabbar-item-text{
		height: 32px;
		width:33.33333vw;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		color: #4f4f4f;
	}

	.active{
		position: relative;//给当前元素添加相对定位,也就是after的父级
		font-weight: 900;
		color: #1476FE;
		&:after {
			content: " ";
			width: 30px;
			height: 0.12rem;
			background: #1476FE;
			position: absolute;
			bottom: -0.1rem;
			left: 50%;
			transform: translateX(-50%);//居中处理
		}
	}
</style>
