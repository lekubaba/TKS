<template>
	<div class="get-agent-page">
		<div class='poster-wraper'>
			<img class='poster-item' v-for='item in agentPoster' v-bind:key='item.id' :src="item.posterUrl">
		</div>
		<div class='button-wraper'>
			<div class='tk-vips'>
				<div class='buy-tk-protocol'>
					<div class='buy-agree' :style="{backgroundColor:this.$store.state.color}">√</div>
					<div class='buy-agree-title'>限时限名额招募</div>
					<!-- <div class='buy-agree-title' :style="{color:this.$store.state.color}">11:34:23</div> -->
					<CountDown class='buy-agree-title' :style="{color:this.$store.state.color}" v-bind:endTime='getAgentEndTime' />
				</div>
				<div class='tk-vips-items' :style="{backgroundColor:this.$store.state.color}" @click='freeAgent'>
					<div class='tk-vip-item'>限时免费代理</div>
				</div>
			</div>
		</div>
		<transition name='fade'>
			<div class='mask' v-if='mask.mask'>
				<div class='mask-contenta'>
					<div class='mask-title'>成为代理 取百万佣金</div>
					<div class='agent-protocol'>
						<div class='buy-agree' :style="{backgroundColor:this.$store.state.color}">√</div>
						<div class='buy-agree-title'>限时招商</div>
						<!-- <div class='buy-agree-title' :style="{color:this.$store.state.color}">隐私政策</div> -->
						<CountDown class='buy-agree-title' :style="{color:this.$store.state.color}" v-bind:endTime='getAgentEndTime' />
					</div>
					<input class='mask-inputa' type="text" placeholder="输入姓名" ref='agentName' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
					<input class='mask-inputa' type="number" placeholder="中国大陆手机号" ref='agentPhoneNumber' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
					<div class='rna-wraperb'>
						<input type="number" class='rna-input-check' name='verificationCode' placeholder="验证码" ref='verificationCode' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
						<div class='get-check-number' :style="{backgroundColor:this.$store.state.color}" @click='countDownSixty'>{{content}}</div>	
					</div>
					<div class='mask-button'>
						<div class='mask-confirm' @click='isConfirm' :style="{backgroundColor:this.$store.state.color}">确认代理</div>
						<div class='mask-cancel' >
							<span @click='isCancel'>取消</span>
						</div>
					</div>
				</div>
			</div>
		</transition>
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
			mask:{
				mask:false
			},
			content: '获取验证码',
			totalTime: 60,
			canClick: true //添加canClick
			
		}
	},
	mounted() {

	},
	
	methods:{
		freeAgent(){
			this.mask.mask = true;
		},
		isConfirm(){
			// this.mask.mask = false;
		},
		isCancel(){
			this.mask.mask = false;
		},
		countDownSixty () {
			if (!this.canClick) return  //改动的是这两行代码
			this.canClick = false
			this.content = this.totalTime + 's'
			let clock = window.setInterval(() => {
				this.totalTime--
				this.content = this.totalTime + 's'
				if (this.totalTime < 0) {
					window.clearInterval(clock)
					this.content = '获取验证码'
					this.totalTime = 60;
					this.canClick = true  //这里重新开启
				}
			},1000)
		}
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
	.agent-protocol{
		width:95vw;
		height: 20px;
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	
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
	.tk-vips-items{
		width:95vw;
		height: 48px;
		// background-image: linear-gradient(135deg,#ff7639 0%,#f5336e 100%);
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
	
	.mask{
		position: fixed;
		bottom:0px;
		width:100vw;
		height: calc(100vh + 100vh);
		background-color: rgba(0,0,0,.7);
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		// justify-content:center;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .3s,bottom .3s;
		// transition: opacity .3s;
	}
	.fade-enter{
		bottom:-100vh;
		opacity: 0;
	}
	.fade-enter-to{
		bottom:0px;
	}
	.fade-leave{
		bottom: 0px;
	}
	.fade-leave-to {
		bottom:-100vh;
		opacity: 0;
	}
	
	.mask-contenta{
		position: relative;
		bottom: 0px;
		transition: bottom 3s;
		width:100vw;
		height: 100vh;
		background-color: rgb(247,247,247);
		// border-top-left-radius: 10px;
		// border-top-right-radius: 10px;
		display: flex;
		flex-direction: column;
		// align-items: center;
		padding:30px;
	}
	
	.mask-title{
		font-size: 22px;
		font-weight: 900;
		margin:15px 0 0px 0;
		color: #333;
	}
	.mask-subtitle{
		font-size: 14px;
		color: #999;
	}
	.mask-inputa{
		width:100%;
		height: 55px;
		border:none;
		background-color: rgb(247,247,247);
		font-size: 15px;
		color: #333;
		caret-color:#1476fe;
		border-bottom: 0.5px solid #ccc;
	}
	.mask-button{
		margin-top:20px;
		width:100%;
		display: flex;
		flex-direction: column;
	}
	.mask-confirm{
		margin-top:30px;
		width:100%;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 18px;
		font-weight: 900;
		cursor: pointer;
		background-color: #1476fe;
		border-radius: 5px;
	}
	.mask-cancel{
		margin-top:20px;
		color: #aaa;
		text-align: right;
	}
	
	.rna-wraperb{
		// margin-top:20px;
		width:100%;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.5px solid #ccc;
		
	}
	.rna-input-check{
		width:60vw;
		height: 55px;
		border:none;
		background-color: rgb(247,247,247);
		font-size: 15px;
		color: #555;
		caret-color:#1476fe;
	}
	.get-check-number{
		width:30vw;
		height: 30px;
		color: #fff;
		background-color: #1476fe;
		text-align: center;
		line-height: 30px;
		font-size: 14px;
		border-radius: 2px;
		font-weight: 900;
	}

</style>
