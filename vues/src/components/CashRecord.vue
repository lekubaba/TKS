<template>
	<div class='top'>
		<div class='alipay'>
			<div>
				<span>{{agentName}}</span>
				<span style='margin-left: 10px;'>{{agentAlipay}}</span>
			</div>
			<div class='copy-wx'>
				<span class="wechat-a" type="primary" text="复制" size="small"
				v-clipboard:copy="agentAlipay"
				v-clipboard:success="onCopy"
				v-clipboard:error="onError" >复制</span>
			</div>
		</div>
		<div class="income"  @scroll.passive="getScroll($event)" ref='content'>
			<div class='in-item' v-for='item in list'>
				<div class='sup'>
					<span class='sup-a'>{{item.types}}</span>
					<span class='sup-b'>+{{item.howMuch}}</span>
				</div>
				<div class='sub'>
					<span class='sub-a'>{{item.inTime}}</span>
					<span class='sub-b'>来源：{{item.types==='黑盒红包'?'红包宝箱':item.orderID?item.orderID.agentID.agentNickname:'管理奖金'}}</span>
				</div>
			</div>
			<Loading v-bind:show='isLoading' v-bind:show2='isLoading2'/>
		</div>
		<button class='confirmxx' @click='toConfirm' v-if="isFa==='0'">结算完毕</button>
		<transition name='fade'>
			<div class='mask' v-if='mask'>
				<div class='mask-contenta'>
					<div class='mask-titlea' :style="{color:this.$store.state.color}">确定结算了？</div>
					<div class='mask-titleb'>每一笔结算完毕的都确认一下，自己清清楚楚</div>
					<div class='mask-button'>
						<div class='mask-cancel' @click='isCancel' :style="{color:this.$store.state.color}">取消</div>
						<div class='mask-confirm' @click='isConfirm' :style="{backgroundColor:this.$store.state.color}">确认</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import Loading from '../components/Loading.vue';
export default {
	name: 'CashRecord',
	components: {
		Loading
	},
	props:['incomes'],
	data(){
		return {
			mask:false,
			isLoading:false,
			isLoading2:true,
			list:[],
			cashID:null,
			isFa:null,
			agentName:null,
			agentAlipay:null,
		}
	},
	beforeRouteEnter (to, from, next) {
	  if(window.localStorage['isVIP']=="true"){
		  next();
		  return;
	  }
	  next({name:"Promotion"});
	},
	created() {
		this.cashID = this.$route.query.cashID;
		this.isFa = this.$route.query.isFa;
		this.agentName = this.$route.query.agentName;
		this.agentAlipay = this.$route.query.agentAlipay;
		this.$loading.show();
		this.getData();
	},
	
	methods:{
		getData(){
			let that = this;
			let cashID = this.cashID;
			that.axios.post('/api/getIncomeByCashID',{cashID:cashID})
			.then(function(res){
				if(res.data.code===500){
					that.$loading.hide();
					that.$message.info('出错了');
					return;
				}
				
				that.list = res.data.data;
				that.$loading.hide();
				
			})
		},
		getScroll(event){
			let that = this;
			let cashID = this.cashID;
			let scrollBottom = event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight;
			
			if (scrollBottom<=50&&that.isLoading == false) {
				that.isLoading = true;
				let count = that.list.length;
				that.axios.post('/api/getIncomeByCashIDs',{cashID:cashID,num:count})
				.then(function(res){
					if(res.data.code===500){
						that.$message.info('系统故障了');
						that.isLoading = false;
						return;
					}
					if(res.data.data.length===0){
						that.isLoading2 = false;
						return;
					}
					that.list = that.list.concat(res.data.data);
					that.isLoading = false;
					
				})
			}
		},
		toConfirm(){
			this.mask = true;
		},
		isCancel(){
			this.mask = false;
		},
		isConfirm(){
			let that = this;
			let cashID = this.cashID;
			this.axios.post('/api/saveSettlementRecord',{cashID:cashID})
			.then(function(res){
				if(res.data.code===500){
					that.$message.info('系统故障了');
					return;
				}
				that.mask = false;
				that.isFa = '1';
				that.$message.info('处理完毕');
				
			})
			
		},
		onCopy(){
			this.$message.info('复制成功');
		},
		onError(){
			this.$message.error('复制失败');
		},
		
	},

	
}
</script>
<style scoped lang="less">
	.top{
		width:100vw;
		height: 100vh;
		background-color: #F2F5FA;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
	}
	.alipay{
		margin-top:25px;
		width:90%;
		height: 60px;
		background-color: #fff;
		padding:20px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 18px;
		font-weight: 900;
		border-radius: 10px;
		box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
		color:#1476FE;
	}
	.wechat-a{
		color:#11B764;
	}
	.income{
		margin-top:10px;
		width:90vw;
		height: calc(100vh - 200px);
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
		overflow-y: auto;
		overflow-x: hidden;
		border-radius: 10px;
		box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
	}
	.in-item{
		width:90%;
		height: auto;
		padding:20px 0 20px 0;
		border-top: 1px solid rgba(218,224,234,.5);
	}
	.in-item:first-child {
		border: none;
	}
	
	.sup{
		display: flex;
		justify-content: space-between;
	}
	
	.sup-a{
		font-size: 16px;
		font-weight: 900;
		color:#101010;
	}
	.sup-b{
		font-family: DXMfont-Bold;
		font-size: 18px;
		color:#FF654D;
	}
	.sub{
	}
	.sub-a{
		font-family: DXMfont-Regular;
		font-size: 14px;
		color:#666;
	}
	.sub-b{
		padding-left: 15px;
		font-family: DXMfont-Regular;
		font-size: 14px;
		color:#666;
	}
	
	.confirmxx{
		margin-top:30px ;
		width:60%;
		height: 50px;
		background-color: #1475FE;
		font-size: 16px;
		color:#fff;
		border-radius: 30px;
		border:none;
		box-shadow: 0 10px 6px 0 rgba(0,0,0,.1);
		
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

