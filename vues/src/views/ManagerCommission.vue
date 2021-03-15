<template>
	<div id='top'>
		<div class='hello' v-if='managerLevel>1'>本月管理奖金</div>
		<div class='hello2' v-else-if='myCommission>=0'>
			<div class='remind'>如果您是<span style='color:#FF654D'>城市总监</span>或<span style='color:#FF654D'>城市独家</span>，还将享有以下的管理收益哦。</div>
			<div class='container-b' @click='toUpLevelPage'>
				<div class='arrow-right'></div>
				<div>去提升</div>
			</div>
		</div>
		<div class='top-wrapper'>
			<div class='commission' style='background-color:#FF654D;'>
				<div class='com-left'>
					<div class='com-title'>当前管理奖金(元)</div>
					<div class='com-num'>{{myCommission.toFixed(2)}}</div>
					<div class='cur-tt' style='color:#fff' v-if='managerLevel<=1'>独家或总监专享的收益</div>
					<div class='cur-tt' style='color:#fff' v-if='managerLevel>1'>管理奖金次月结算</div>
				</div>
				<div class='com-right' @click='toCommissionProfile'>如何计算？</div>
			</div>
			<div class='com-rate'>
				<div class='com-con'>
					<div class='cur-rate cur'>
						<div class='cur-t' v-if='managerLevel>1'>当前比例</div>
						<div class='cur-t' v-if='managerLevel<=1'>独家或总监专享</div>
						<div class='cur-num'>{{accMul(curRate,100)}}%</div>
					</div>
					<div class='cur-sales cur'>
						<div class='cur-t'>团队总业绩(元)</div>
						<div class='cur-num'>{{totalSalse}}</div>
					</div>
				</div>
				<div class='com-remind'>还差<span style='color:#FF654D'>{{lessMuch}}</span>按下一阶梯计算管理奖金</div>
			</div>
		</div>
		<div class='c-title'>佣金阶梯<span class='haha'>（城市独家或城市总监专享）</span></div>
		<div class='item-s'>
			<div class='item-remind'><span style='color:#FF654D'>城市总监</span>或<span style='color:#FF654D'>城市独家</span>专享的佣金比例根据当月总业绩按照下表确定得出。</div>
			<div class='item-head'>
				<div class='itemx'>月业绩（万元）</div>
				<div class='itemx'>佣金比例</div>
			</div>
			<div class='item-headx' v-for='(item,index) in salesLadder'>
				<div class='itemy' v-if='index!==(salesLadder.length - 1)'>x <= {{item.sales}}</div>
				<div class='itemy' v-if='index===(salesLadder.length - 1)'>{{item.sales}} < x</div>
				<div class='itemy'>{{accMul(item.rate,100)}}%</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'ManagerCommission',
	components: {
		// HelloWorld
	},
	data(){
		return {
			salesLadder:[],
			myCommission:0,
			curRate:0,
			totalSalse:0,
			lessMuch:0,
			managerLevel:0,
			
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
			this.axios.post('/api/counterManagerBonus',{agentID:agentID,productsId:productsId})
			.then(function(res){
				that.$loading.hide();
				if(res.data.code===500){
					that.$message.info('系统异常');
					return;
				}
				
				that.myCommission = res.data.myCommission;
				that.managerLevel = res.data.managerLevel;
				that.salesLadder = res.data.salesLadder;
				that.curRate = res.data.curRate;
				that.totalSalse = res.data.totalSalse;
				that.lessMuch = res.data.lessMuch;
				
			})
		},
		accMul(arg1,arg2) {
			
			var m=0,s1=arg1.toString(),s2=arg2.toString(); 
			try{m+=s1.split(".")[1].length}catch(e){};
			try{m+=s2.split(".")[1].length}catch(e){};
			return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
		},
		toCommissionProfile(){
			this.$router.push({name:'BonusProfile'});
		},
		toUpLevelPage(){
			this.$router.push({name:'UpLevelPage'});
		},
	},
	mounted() {
		
	}
}
</script>

<style lang="less" scoped>
#top{
	width:100vw;
	min-height: 100vh;
	background-color: #F2F5FA;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 100px;
}

.hello{
	margin:20px 0 10px 0px;
	width:90%;
	height: auto;
	font-size: 20px;
	font-weight: 900;
	color:#333;
	
	
}

.hello2{
	margin:20px 0 10px 0px;
	padding:20px;
	width:90%;
	height: auto;
	font-size: 14px;
	color:#333;
	background-color: rgba(255,100,76,.1);
	border-radius: 10px;
	display: flex;
	flex-direction: flex;
	align-items: center;
}
.remind{
	width: 70%;
}
.container-b{
	width:30%;
	height: 100%;
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
}
.arrow-right {
	width: 0;
	height: 0;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	border-bottom: 10px solid #333;
	font-size: 0;
	line-height: 0;
	transform: rotate(90deg);
}
.top-wrapper{
	width:90%;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 0 5px 6px 0 rgba(15,60,181,.2);
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
}

.commission{
	width:100%;
	height: 150px;
	background-color: #1476FE;
	padding:20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	
	
}
.com-left{
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.com-title{
	font-size: 16px;
	color:#fff;
	// font-weight: 900;
}

.com-num{
	font-family: DXMfont-Bold;
	font-weight: 900;
	font-size: 32px;
	color:#fff;
}
.cur-tt{
	font-size: 12px;
}

.com-right{
	font-size: 16px;
	color:#fff;
	text-decoration: underline;
}
.com-rate{
	padding:20px;
	width:100%;
	height: 160px;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	// align-items: center;
}
.com-con{
	width:100%;
	height:90px;
	background-color: #fff;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	// align-items: center;
}
.cur{
	height: 90px;
	width:50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	// justify-content: center;
}

.cur-t{
	font-size: 16px;
	color:#333;
}
.cur-num{
	font-family:DXMfont-Bold;
	font-size: 20px;
	font-weight: 900;
	color:#FF654D;
	
}
.com-remind{
	height: 40px;
	width:100%;
	text-align: center;
	line-height: 40px;
	border-radius: 20px;
	background-color: rgba(255,100,76,.1);
	font-size: 12px;
	color:#555;
}

/* rate */
.c-title{
	width:90%;
	margin:20px 0 10px 0px;
	font-size: 20px;
	font-weight: 900;
	color:#333;
}
.haha{
	font-size: 14px;
	font-weight: 500;
	color:#FF654D;
}

.item-s{
	padding:40px 20px 40px 20px;
	width:90%;
	height: auto;
	border-radius:10px;
	background-color: #fff;
}
.item-remind{
	width:100%;
	font-size: 16px;
	color:#333;
}

.item-head{
	margin-top:10px;
	height: 50px;
	width:100%;
	display: flex;
}
.itemx{
	height: 50px;
	width:50%;
	text-align: center;
	line-height:50px ;
	background-color:rgba(255,100,76,.15);
	font-size: 16px;
	font-weight: 900;
}

.item-headx{
	height: 50px;
	width:100%;
	display: flex;
}

.itemy{
	height: 50px;
	width:50%;
	text-align: center;
	line-height:50px ;
	background-color:rgba(255,100,76,.1);
	font-size: 14px;
}







	
</style>
