<template>
	<div class='choise-mode'>
		<div class='navs'>
			<router-link :to="{path:'/choisemode/tra'}" replace class='nav1' active-class="active" exact>传统模式</router-link>
			<router-link :to="{name:'LinkMode',params:{mode:'link'}}" replace class='nav2' active-class="active" exact>外链模式</router-link>
		</div>
		<router-view v-bind:mode='mode'/>
	</div>
</template>

<script>
	export default {
		name: 'ChoiseMode',
		components: {
			// HelloWorld
		},
		data(){
			return {
				mode:'',
			}
		},
		methods:{
			
		},
		beforeRouteEnter (to, from, next) {
		  if(window.localStorage['isVIP']=="true"){
			  next();
			  return;
		  }
		  next({name:"Promotion"});
		},
	
	}
</script>

<style scoped lang="less">
	.choise-mode{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.navs{
		width:100vw;
		height: 80px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		
	}
	.nav1,.nav2{
		width:28%;
		height: 40px;
		background-color: #999;
		text-align: center;
		line-height: 40px;
		color:#fff;
	}
	.nav1{
		border-bottom-left-radius: 30px;
		border-top-left-radius: 30px;
	}
	
	.nav2{
		border-bottom-right-radius: 30px;
		border-top-right-radius: 30px;
	}
	
	.active{
		position: relative;//给当前元素添加相对定位,也就是after的父级
		font-weight: 700;
		background-color: #1476FE;
		&:after {
			content: "";
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