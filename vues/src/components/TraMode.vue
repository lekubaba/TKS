<template>
	<div class="mode">
		<div class='mode-wrapper'>
			<div class='mode-text'>传统模式：如果您现在是通过电销、陌拜、扫楼、发传单等传统方式获客，并且获取到客户信息以后需要联系客户到实体店体验、洽谈后才能线下签约合同等。
			我们将这种方式称为传统模式。
			</div>
			<div class='mode-text'>
				如果您恰好是用传统方式来销售产品的，我们建议您选择【拿钱传统模式】来分销您的产品。
			</div>
			<div class='mode-text'>
				选择好模式以后，您的获客方式会发生质的变化，您可以将同行、客户、物业、快递站点、宝妈等各种想兼职的群体都发展成为代理，
				毫不客气的讲，获客效率会数倍甚至数十倍的增长，您只需专注于消化客户和服务代理即可。
			</div>
		</div>
		
		<div class='button' @click="showMask">选择传统模式并下一步</div>
		<transition name='fade'>
			<div class='mask' v-if='mask'>
				<div class='mask-contenta'>
					<div class='mask-titlea' :style="{color:color}">确认选择传统模式吗</div>
					<div class='mask-titleb'>模式暂不可修改，请谨慎选择</div>
					<div class='mask-button'>
						<div class='mask-cancel' @click='isCancel' :style="{color:color}">取消</div>
						<div class='mask-confirm' @click='isConfirm' :style="{backgroundColor:color}">确认</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>

export default {
	name: 'TraMode',
	components: {
		// HelloWorld
	},
	props:['mode'],
	data(){
		return {
			mask:false,
			color:this.$store.state.color,
		}
	},
	created() {
	},
	methods:{
		showMask(){
			this.mask = true;
		},
		isCancel(){
			this.mask = false;
		},
		isConfirm(){
			let that = this;
			let agentID = window.localStorage['agentID'];
			this.axios.post('/api/buildproductsmode',{agentID:agentID,mode:'tra'})
			.then(function(res){
				if(res.data.code===500){
					that.$message.info('系统出错了');
					return;
				}
				if(res.data.code===200){
					that.$router.replace({name:'VipEdit'});
					return;
				}
			})
		}
		
	},

	
}
</script>
<style scoped lang="less">
	.mode{
		width:100vw;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.mode-wrapper{
		width:100%;
		height: auto;
		padding:20px 30px 20px 30px;
	}
	.mode-text{
		font-size: 12px;
		color:#999;
		margin-bottom: 20px;
	}
	
	.button{
		position: absolute;
		bottom: 50px;
		width:85vw;
		height: 50px;
		background-color: #1475FE;
		border-radius: 5px;
		text-align: center;
		line-height: 50px;
		font-size: 16px;
		color: #fff;
	}
	.mask{
		position: fixed;
		bottom:0px;
		width:100vw;
		height: calc(100vh + 250px);
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
		bottom:-250px;
		opacity: 0;
	}
	.fade-enter-to{
		bottom:0px;
	}
	.fade-leave{
		bottom: 0px;
	}
	.fade-leave-to {
		bottom:-250px;
		opacity: 0;
	}
	
	.mask-contenta{
		position: relative;
		bottom: 0px;
		transition: bottom 3s;
		width:100vw;
		height: 250px;
		background-color: rgb(247,247,247);
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.mask-titlea{
		margin-top:40px;
		font-size: 24px;
		font-weight: 900;
		color: #1476fe;
	}
	.mask-titleb{
		margin-top:5px;
		font-size: 13px;
		font-weight: bolder;
		color: #999;
	}
	.mask-button{
		position: absolute;
		bottom: 0px;
		width:100%;
		height: 120px;
		display: flex;
		flex-direction: row;
		// border:1px solid red;
		align-items: center;
		justify-content: center;
	}
	.mask-cancel,.mask-confirm{
		width:30%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 16px;
		font-weight: 900;
		cursor: pointer;
		border-radius: 5px;
		margin:0 10px 0 10px;
	}
	.mask-cancel{
		
		color: #1476FE;
		background-color: #eee;
		
		
	}
	.mask-confirm{
		color: #fff;
		background-color: #1476FE;
	}
	
</style>

