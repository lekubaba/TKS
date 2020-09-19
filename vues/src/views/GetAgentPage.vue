<template>
	<div class="get-agent-page">
		<div class='poster-wraper'>
			<img class='poster-item' v-for='item in agentPoster' v-bind:key='item.id' :src="item.posterUrl">
		</div>
		<div class='button-wraper'>
			<div class='tk-vips'>
				<div class='buy-tk-protocol'>
					<div class='buy-agree' :style="{backgroundColor:color}">√</div>
					<div class='buy-agree-title'>限时限名额招募</div>
					<CountDown class='buy-agree-title' :style="{color:color}" v-bind:endTime='getAgentEndTime' />
				</div>
				<div class='tk-vips-items' :style="{backgroundColor:color}" @click='toRegisterAgent'>
					限时免费代理
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';	
import CountDown from '../components/CountDown.vue';
export default {
	name: 'GetAgentPage',
	components: {
		CountDown
	},
	data(){
		return {
			agentPoster:[
				{id:0,posterUrl:'http://qiniu.tongkeapp.com/poster_01.png'},
				{id:1,posterUrl:'http://qiniu.tongkeapp.com/poster_02.png'},
				{id:2,posterUrl:'http://qiniu.tongkeapp.com/poster_03.png'},
				{id:3,posterUrl:'http://qiniu.tongkeapp.com/poster_04.png'},
				{id:4,posterUrl:'http://qiniu.tongkeapp.com/poster_05.png'},
				{id:5,posterUrl:'http://qiniu.tongkeapp.com/poster_06.png'},
				{id:6,posterUrl:'http://qiniu.tongkeapp.com/poster_07.png'},
				{id:7,posterUrl:'http://qiniu.tongkeapp.com/poster_08.jpg'},
			],
		}
	},
	mounted() {

	},
	
	methods:{
		toRegisterAgent(){
			this.$router.push({name:"RegisterAgent"});
		},

	},
	created() {
		
	},
	computed:{
		...mapState({
			color:state=>state.color,
			getAgentEndTime:state=>state.getAgentEndTime,
		})
	},
}
</script>

<style scoped lang="less">
	.get-agent-page{
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
	}
	.poster-wraper{
		width:100vw;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.poster-item{
		width:100%;
		height: auto;
	}
	.button-wraper{
		position: fixed;
		bottom: 0px;
		width:100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
	}
	
	.tk-vips{
		margin-top:-15px;
		width:100vw;
		height: 105px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
	}
	.buy-tk-protocol{
		margin-top:-20px;
		width:95vw;
		height: 32px;
		// background-color: rgb(245,245,245);
		padding:0 20px 0 2px;
		display: flex;
		align-items: center;
		// justify-content: center;
	
	}
	.buy-agree{
		margin-right: 5px;
		width:12px;
		height: 12px;
		border-radius: 2px;
		background-color: #1476fe;;
		text-align: center;
		line-height: 12px;
		font-size: 7px;
		color: #fff;
		font-weight: 900;
	}
	.buy-agree-title{
		color:#999;
		font-size: 12px;
		margin-right: 10px;
	}


	.tk-vips-items{
		width:95vw;
		height: 48px;
		background-color: #1476fe;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		font-weight: bold;
		color: #fff;
	}
	

</style>
