<template>
	<div class='commission-counter'>
		<div class='top-title'>五种收益计算</div>
		<div class='container'>
			<div class='container-a'>
				<div class='c-title'>
					<div class='five-methods'>
						<div class='circlex' @click="toCounter"  data-one='1'>1</div>
						<div class='circlex' @click="toCounter" data-one='2'>2</div>
						<div class='circlex' @click="toCounter" data-one='3'>3</div>
						<div class='circlex' @click="toCounter" data-one='4'>4</div>
						<div class='circlex' @click="toCounter" data-one='5'>5</div>
					</div>
				</div>
				<transition name="fade">
					<div v-if="show1">
						<div class='remindx'>{{title}}</div>
						<div class='remind'>{{remind}}</div>
						<div class='contentx'>
							<input class='inputx' v-model.number="nums" :placeholder="placeholder" type="number" ref='extension' max="200000000" onkeyup="this.value=this.value.replace(/[, ]/g,'')">
						</div>
						<div class='remind' v-if='dataOne===1'> 您当前的直推比例是：<span style='color:#FF654D'>{{currentRate*100}}%</span>。当您直推放款: <span style='color:#FF654D'>{{nums}}</span> 元，您将获得 {{nums}} * {{currentRate*100}}% = <span style='color:#FF654D'>{{numS}}</span> 元的收益；</div>
						<div class='remind' v-if='dataOne===2'> 当您的下级等级是：城市代理，他直推放款: <span style='color:#FF654D'>{{nums}}</span> 元，您将获得 {{nums}} * {{agentExtensionSuper*100}}% = <span style='color:#FF654D'>{{numA}}</span> 元的收益；</div>
						<div class='remind' v-if='dataOne===2'> 当您的下级等级是：城市经理，他直推放款: <span style='color:#FF654D'>{{nums}}</span> 元，您将获得 {{nums}} * {{managerExtensionSuper*100}}% = <span style='color:#FF654D'>{{numB}}</span> 元的收益；</div>
						<div class='remind' v-if='dataOne===3'> 当您的下下级等级是：城市代理，他直推放款: <span style='color:#FF654D'>{{nums}}</span> 元，您将获得 {{nums}} * 0.225% = <span style='color:#FF654D'>{{numC}}</span> 元的收益；</div>
						<div class='remind' v-if='dataOne===3'> 当您的下下级等级是：城市经理，他直推放款: <span style='color:#FF654D'>{{nums}}</span> 元，您将获得 {{nums}} * {{managerExtensionBigSuper*100}}% = <span style='color:#FF654D'>{{numD}}</span> 元的收益；</div>
						<div class='remind' v-if='dataOne===4'> 当您地推发立牌数: <span style='color:#FF654D'>{{nums}}</span> 张(平均每天20张)，您将在往后的每个月获得收益 {{nums}} * 12.72 = <span style='color:#FF654D'>{{numE}}</span> 元，（此收益为当前派发2万立牌的平均值，数据会不断更新，确保越来越精准）；</div>
						<div class='remind' v-if='dataOne===5'> 如果您招募了城市经理: <span style='color:#FF654D'>{{nums}}</span> 人，按照每人发100张来算，您将在往后的每个月获得收益 {{nums}}*100 * 3.82 = <span style='color:#FF654D'>{{numF}}</span> 元，（此收益为当前派发2万立牌的平均值，数据会不断更新，确保越来越精准）；</div>
					</div>
				</transition>
			</div>
		</div>

	
	</div>
</template>

<script>

	export default {
		name: 'CommissionCounter',
		components: {
			// HelloWorld
		},
		data(){
			return {
				colorful:'#1476FE',
				level:null,
				show1:false,
				nums:0,
				title:null,
				remind:null,
				placeholder:null,
				dataOne:null,
				managerLevel:0,
				currentRate:0,
				agentExtension:0,
				agentExtensionSuper:0,
				agentExtensionBigSuper:0,
				managerExtension:0,
				managerExtensionSuper:0,
				managerExtensionBigSuper:0,
			}
		},
	
		created() {
			this.$loading.show();
			this.getData();
		},
		methods:{
			getData(){
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				let that = this;
				this.axios.post('/api/getSelfCommissionRate',{agentID:agentID,productsId:productsId})
				.then(function(res){
					if(res.data.code==500){
						that.$loading.hide();
						that.$message.info('系统故障');
						window.localStorage.clear();
					}else{
						if(res.data.managerLevel === 0){
							that.currentRate = res.data.agentExtension;
						}else{
							that.currentRate = res.data.managerExtension;
						}
						that.agentExtensionSuper = res.data.agentExtensionSuper;
						that.agentExtensionBigSuper = res.data.agentExtensionBigSuper;
						that.managerExtensionSuper = res.data.managerExtensionSuper;
						that.managerExtensionBigSuper = res.data.managerExtensionBigSuper;
						that.$loading.hide();
						return;
					}
				})
			},
			toCounter(event){
				
				event.currentTarget.style.backgroundColor = '#ff654d';
				this.colorful = '#1476FE';
				this.show1 = this.show1===false?!this.show1:this.show1;
				let dataOne = event.currentTarget.dataset.one;
				if(dataOne==='1'){
					this.nums = 100000;
					this.dataOne = 1;
					this.title = '自身直推收益计算';
					this.remind = '您可以随意输入放款额度数值，我来帮您计算您的收益，让您对佣金政策了解更精进。';
					this.placeholder = '输入您自己的放款额数值';
					return;
				}
				
				if(dataOne==='2'){
					this.nums = 100000;
					this.dataOne = 2;
					this.title = '下级直推收益计算';
					this.remind = '您可以随意输入下级放款额度数值，我来帮您计算您的收益，让您对佣金政策了解更精进。';
					this.placeholder = '输入您下级的放款额数值';
					return;
				}
				if(dataOne==='3'){
					this.nums = 100000;
					this.dataOne = 3;
					this.title = '下下级直推收益计算';
					this.remind = '您可以随意输入下下级放款额度数值，我来帮您计算您的收益，让您对佣金政策了解更精进。';
					this.placeholder = '输入您下下级的放款额数值';
					return;
				}
				if(dataOne==='4'){
					this.nums = 1000;
					this.dataOne = 4;
					this.title = '地推发立牌收益计算';
					this.remind = '您可以输入发立牌数量，我来帮您计算您的收益，让您对地推收益有更直观的感受';
					this.placeholder = '输入地推发立牌数量';
					return;
				}
				if(dataOne==='5'){
					this.nums = 25;
					this.dataOne = 5;
					this.title = '招募城市经理收益计算';
					this.remind = '您可以输入招募城市经理的数量，按照每人发100张立牌计算，来计算裂变收益';
					this.placeholder = '输入招募城市经理数量';
					return;
				}
				
				
			},
				
		},
		computed:{
			numS(){
				// 自身直推
				return this.$NumberMul(this.nums,this.currentRate);
			},
			numA(){
				// 下级是城市代理，自身收益
				return this.$NumberMul(this.nums,this.agentExtensionSuper);
			},
			numB(){
				// 下级是城市经理，自身收益
				return this.$NumberMul(this.nums,this.managerExtensionSuper);
			},
			numC(){
				// 下下级是城市代理，自身收益
				return this.$NumberMul(this.nums,this.agentExtensionBigSuper);
			},
			numD(){
				// 下下级是城市经理，自身收益
				return this.$NumberMul(this.nums,this.managerExtensionBigSuper);
			},
			numE(){
				// 自身发牌收益
				return this.$NumberMul(this.nums,12.72);
			},
			numF(){
				// 团队发牌收益
				return this.$NumberMul(Number(this.nums)*100,3.82);
			},
		},
		watch:{
			'nums':function (newVal,oldVal) {
				
				// 解决数字键盘可以输入多个小数点问题
				if(newVal==='' && oldVal.toString().indexOf('.')>0){
					this.nums = Number(oldVal);
					return ;
				}
				
				// 保留7位小数
				if(newVal){
					newVal = newVal.toString();
					var pointIndex =  newVal.indexOf('.');
					if(pointIndex>0 && (newVal.length - pointIndex)>1){
						this.nums = Number(oldVal);
						return ;
					}
				}
				// 最大值
				if(newVal>1000000000){
					this.nums = Number(oldVal);
					return ;
				}
			}
		}

	}
</script>

<style scoped lang="less">
	.commission-counter{
		width:100vw;
		min-height: 100vh;
		background-color: #F2F5FA;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
		padding-bottom: 40px;
	}
	.top-title{
		width:100%;
		height: 50px;
		font-size:24px;
		color:#333;
		font-weight: 900;
		padding:20px;
		
	}
	
	.container{
		margin-top:15px;
		width:92vw;
		height: auto;
		padding:10px 20px 20px 20px;
		background-color: #fff;
		border-radius: 10px;
		display: flex;
	}
	.container1{
		margin-top:20px;
		width:92vw;
		height: auto;
		padding:20px 25px 20px 25px;
		background-color: #fff;
		border-radius: 10px;
		display: flex;
	}
	.container-a{
		width:100%;
	}
	.c-title{
		width:100%;
		height: 90px;
		font-size:24px;
		color:#333;
		font-weight: 900;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		
	}
	.five-methods{
		width:100%;
		height: 70px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
	}
	.circlex{
		width:54px;
		height:54px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #1476FE;
		border-radius: 30px;
		color:#fff;
	}
	.active{
		background-color: #1476FE;
	}
	.remindx{
		font-size: 20px;
		font-weight: 900;
		color: #333;
	}
	
	.remind{
		width: 100%;
		padding:5px 0px 0 0px;
		margin-top:5px;
		font-size: 12px;
		color:#666;
	}
	.content{
		margin-top:100px;
		padding:40px 0 30px 0;
		position: relative;
		top:0px;
		width:85vw;
		height: auto;
		background-color: #fff;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.contentx{
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.inputx{
		margin-top:10px;
		width:100%;
		height: 48px;
		background-color: #F2F5FA;
		border:none;
		margin-bottom: 10px;
		font-size: 18px;
		color:#333;
		padding-left: 10px;
		border-radius: 5px;
	}
	
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .2s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
	
</style>
