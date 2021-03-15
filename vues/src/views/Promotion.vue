<template>
	<div class="promotion">
		<div class='poster-wraper' v-if="productsID=='5f6c5caca687a1236af74620'">
			<img class='poster-item' v-for='item in agentPoster' :src="item">
		</div>
		<div class='poster-wraper' v-if="productsID!=='5f6c5caca687a1236af74620'">
			<div class='hellorow' @click='toUpLevelPage'>
				<div class='info-wraper'>
					<img class='hellorow-img' :src="userInfo.agentAvatarImg" alt="头像">
					<div class='userinfo-name'>
						<span class='nickname-a'>{{userInfo.agentName}}</span>
						<div class='level-name'>
							<img class='level-img' src="http://qiniu.tongkeapp.com/level.png" alt="level">
							<span class='grade'>{{managerLevel===100?'暂无职位':managerLevel===0?'城市代理':managerLevel===1?'城市经理':managerLevel===2?'城市总监':'城市独家'}}</span>
							<CountDown v-bind:endTime='endTime' v-if='managerLevel>0'></CountDown>
						</div>
					</div>
				</div>
				<div class='arrow'>〉</div>
			</div>
			<div class='set-goal' :style="{backgroundColor:color}" @click='toMoneyProfile'>
				<div class='goala'>
					<div class='goal-sup'>
						<div class='goal-titlea'>累计收入（元）</div>
						<div class='goal-titleb'>提现次日到账</div>
					</div>
					<div class='goal-num'><vns :start="start" :end="total" :times="times" :speed="speed"/></div>
				</div>
				<div class='get-money' :style="{color:color}">详情</div>
			</div>
			<div class='about ra' @click='toManagerCommission'>
				<div class='about-container'>
					<div class='about-content'>
						<span class='max-t' style='color:#fff;'>我的管理奖金</span>
						<span class='smax-t' style='color:#fff;'>管理奖金，实时查看</span>
						<span class='small-t' style='color:#fff;'>市场总监、市场独家专属。</span>
					</div>
					<div class='container-b' style='background-color:#fff;'>
						<div class='arrow1'>去查看</div>
					</div>
				</div>
			</div>
			<div class='about-a' @click='toEarnMethods'>
				<div class='about-container'>
					<div class='about-content'>
						<span class='max-t'>搞懂赚钱门路</span>
						<span class='smax-t'>先从月赚一万开始</span>
						<span class='small-t'>三种方式助您每月收入增加一万元。</span>
					</div>
					<div class='container-b'>
						<div class='arrow1'>三条路</div>
					</div>
				</div>
			</div>
			<div class='about-a' @click='toCommissionCounter'>
				<div class='about-container'>
					<div class='about-content'>
						<span class='max-t'>佣金计算工具</span>
						<span class='smax-t'>佣金不懂直接计算</span>
						<span class='small-t'>挣多少钱干多少事，都可以算出来。</span>
					</div>
					<div class='container-b'>
						<div class='arrow1'>算一算</div>
					</div>
				</div>
			</div>
			<div class='about-a' @click='toUpLevelPage'>
				<div class='about-container'>
					<div class='about-content'>
						<span class='max-t'>等级提升之路</span>
						<span class='smax-t'>等级提升轻轻松松</span>
						<span class='small-t'>提升等级，助您个人收益迅速翻倍。</span>
					</div>
					<div class='container-b'>
						<div class='arrow1'>去提升</div>
					</div>
				</div>
			</div>
			
			<div style='height: 300px;'></div>
		</div>
		<div class='button-wraper'>
			<div class='buy-tks' v-if="productsID=='5f6c5caca687a1236af74620'">
				<div class='buy-tk-protocol'>
					<div class='buy-agree' :style="{backgroundColor:color}">√</div>
					<div class='buy-agree-title'>我已阅读并同意</div>
					<div class='buy-agree-protocol' @click='toUserProtocol' :style="{color:color}">《拿钱使用协议》</div>
				</div>
				<div class='buy-tk-pay' :style="{backgroundColor:color}" @click='JoinNaqian'>
					<span class='buy-content'>我有产品，我要入驻</span>
				</div>
			</div>
			<div class='tk-vips' v-if="productsID!='5f6c5caca687a1236af74620'">
				<div class='buy-tk-protocol'>
					<div class='buy-agree' :style="{backgroundColor:color}">√</div>
					<div class='buy-agree-title'>新手必读</div>
					<div class='buy-agree-protocol' @click='toPromotionGuide' :style="{color:color}" :data-id='productsID'>《佣金政策与规则》</div>
				</div>
				<div class='tk-vips-items' data-url='lekubaba' :style="{backgroundColor:color}" :data-id='productsID'>
					<div class='tk-vip-item' @click='toPromotionQrcode'>推广码</div>
					<div class='tk-vip-item' @click='toAgentQrcode'>招商码</div>
					<div class='tk-vip-item' @click='toContactBoss'>我的客服</div>
					<!-- <div class='tk-vip-item' @click='toMorePromotion'>更多</div> -->
				</div>
			</div>
		</div>
		<!-- <div class='maska' v-if='showa'>
			<div class='activityc'>
				<div class='circlea'>
					<div class='titlea'>地推通过率翻三倍</div>
					<div class='titlea'>日息万一返场活动</div>
					<div class='titlea' style='margin-bottom:5px;'>业绩显示结算说明</div>
					<div class='cona'>
						<span>活动时间：2月26日-3月5日；</span>
						<span>活动产品：有钱花满易贷；</span>
						<span>用户权益：抽中日息万一的用户将享受日息万一的权益；</span>
						<span>活动奖励：由于万一日息活动力度特别大，因此针对参与活动的推广业绩，佣金减半；</span>
						<span style='color:red;'>特别注意：佣金减半将通过显示借款金额减半的方式来呈现，结算佣金比例不变；</span>
					</div>
					<div class='konws' @click='Ikonws'>我知道了</div>
				</div>
			</div>
		</div> -->
		<!-- <div class='maska'>
			<img class='hong' src="http://qiniu.tongkeapp.com/hong.png" alt="">
		</div> -->
	</div>
</template>

<script>
import vns from 'vue-number-scroll';
import {mapState,mapMutations} from 'vuex';
import CountDown from '../components/CountDown.vue';
export default {
	name: 'Promotion',
	components: {
		vns,
		CountDown
	},
	data(){
		return {
			start:0,
			countx:7,
			times:50,
			speed:20,
			agentPoster:'',
			productsID:'',
			managerLevel:'',
			total:0,
			endTime:'',
			showa:window.localStorage['showa']?false:true,
			
		}
	},
	mounted() {
		
	},
	
	methods:{
		fetchData(){
			let that = this;
			let isPromotion = window.localStorage['isPromotion']==='true'?true:false;
			let agentID = window.localStorage['agentID'];
			let productsId = window.localStorage['productsId'];
			let proData = {
				isPromotion:isPromotion,
				agentID:agentID,
				productsId,productsId,
			}
			this.axios.post('/api/promotion',proData)
				.then(function(res){
					if(res.data.code===500){
						that.$loading.hide();
						that.$message.info('系统出错了');
						window.localStorage.clear();
						return;
					}
					if(res.data.code===100){
						that.$loading.hide();
						that.$message.info('系统出错了');
						window.localStorage.clear();
						return;
					}
					
					let payload = {
						isVIP :res.data.isVIP,
						isPromotion:res.data.isPromotion,
						color:res.data.mainPromotionProducts.color,
						isAddLevel:res.data.mainPromotionProducts.isAddLevel,
					}
					//如果代理还未参与推广，首页则展示拿钱介绍海报;
					if(!isPromotion){
						that.$loading.hide()
						that.agentPoster = res.data.mainPromotionProducts.promotionPoster;
						that.productsID = res.data.mainPromotionProducts._id;
						window.localStorage.setItem('isVIP',res.data.isVIP);
						window.localStorage.setItem('isPromotion',res.data.isPromotion);
						window.localStorage.setItem('color',res.data.mainPromotionProducts.color);
						window.localStorage.setItem('isAddLevel',res.data.mainPromotionProducts.isAddLevel);
						that.updater(payload)
						return;
					}else{
						
						that.agentPoster = res.data.mainPromotionProducts.agentPoster;
						that.managerLevel = res.data.subAPI.managerLevel;
						that.endTime = that.$Utils.formatDateTime(res.data.subAPI.countDown);
						let total = res.data.total;
						if(total!==0){
							that.total = parseFloat(total.toFixed(2));
						}else{
							that.total = total
						}
						
						that.productsID = res.data.mainPromotionProducts._id;
						window.localStorage.setItem('isVIP',res.data.isVIP);
						window.localStorage.setItem('isPromotion',res.data.isPromotion);
						window.localStorage.setItem('color',res.data.mainPromotionProducts.color);
						window.localStorage.setItem('isAddLevel',res.data.mainPromotionProducts.isAddLevel);
						that.updater(payload)
						that.$loading.hide();
					}
				})
		},
		toUserCenter(){
			this.$router.push({name:'UserCenter'});
		},
		toMoneyProfile(){
			this.$router.push({path:'moneyprofilepage'});
		},
		toEarnMethods(){
			this.$router.push({name:'EarnMoneyRoad'});
		},
		toCommissionCounter(){
			this.$router.push({name:'CommissionCounter'});
		},
		toUpLevelPage(){
			this.$router.push({name:'UpLevelPage'});
		},
		toManagerCommission(){
			this.$router.push({name:'ManagerCommission'});
		},
		JoinNaqian(){
			this.$router.push({name:'Join'});
		},
		toUserProtocol(){
			this.$router.push({name:'UserProtocol'});
		},
		toPromotionGuide(e){
			//产品ID
			let _id = e.target.dataset.id;
			this.$router.push({name:'PromotionGuide',query:{id:_id}});
		},
		toPromotionQrcode(e){
			//产品ID
			let _id = e.target.parentNode.dataset.id;
			this.$router.push({name:'PromotionQrcode',query:{id:_id}});
		},
		toAgentQrcode(e){
			//产品ID
			let _id = e.target.parentNode.dataset.id;
			this.$router.push({name:'AgentQrcode',query:{id:_id}});
		},
		toContactBoss(e){
			//产品ID
			this.$router.push({name:'ContactBoss'});
		},
		toMorePromotion(e){
			this.$router.push({name:'MorePromotion'});
		},
		Ikonws(){
			window.localStorage.setItem('showa',true);
			this.showa = false;
		},
		...mapMutations([
			'updater',
			'setVIP',
		]),

	},
	created() {
		this.$loading.show()
		this.fetchData();
	},
	computed:{
		...mapState({
			userInfo:state=>state.userInfo,
			color:state=>state.color,
			isPromotion:state=>state.isPromotion,
		})
	}
}
</script>

<style scoped lang="less">
	.promotion{
		width:100vw;
		min-height: 100vh;
		background-color: #F2F5FA;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.hellorow{
		display: flex;
		width:90%;
		height: 100px;
		align-items: center;
		justify-content: space-between;
		// border:1px solid red;
		
	}
	.info-wraper{
		display: flex;
		width:90%;
		height: 80px;
		align-items: center;
		// justify-content: space-between;
	}
	.hellorow-img{
		width:52px;
		height: 52px;
		border-radius: 40px;
		margin-right: 10px;
		border:2px solid #fff;
		box-shadow: 0 2px 6px 0 rgba(0,0,0,.2);
	}
	.userinfo-name {
		display: flex;
		flex-direction: column;
		// align-items: center;
		// justify-content: center;
		font-weight: 900;
		color: #999;
	}
	
	.nickname-a{
		// margin-top:-5px;
		font-size: 22px;
		font-weight: 900;
		color:#555;
	}
	.level-name{
		display: flex;
		align-items: center;
		// justify-content: space-between;
	}
	.level-img{
		margin-left: -2px;
		width:16px;
		height: 16px;
		border-radius: 20px;
	}
	.grade{
		// text-align: center;
		color:#FF654D;
		font-size: 10px;
	}
	.grade-r{
		margin-left: 5px;
		color:#1476FE;
		font-size: 10px;
	}
	.arrow{
		margin-right: -5px;
		color: #666;
		font-weight: 900;
		font-size: 16px;
	}
	
	/* 设置目标 */
	.set-goal{
		position: relative;
		top:0px;
		padding-top: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width:90vw;
		height: 150px;
		background-color: #0F3CB5;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		// box-shadow: 0 5px 6px 0 rgba(15,60,181,.3);
		
	}
	.goala{
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.goal-sup{
		display: flex;
		flex-direction: column;
		width:100%;
		height: auto;
		justify-content: center;
		// align-items: center;
		padding-left: 25px;
		
	}
	.goal-titlea{
		margin-top:10px;
		font-size: 20px;
		color:#fff;
		font-weight: 900;
	}
	
	.goal-titleb{
		font-size: 12px;
		color:#fff;
		font-weight: 900;
	}
	
	.goal-num{
		font-family: DXMfont-Bold;
		width:100%;
		height: auto;
		font-size: 40px;
		color:#fff;
		font-weight: 900;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 25px;
	}
	.get-money{
		width:80px;
		height: 26px;
		font-size: 14px;
		background-color: #fff;
		border-radius: 20px;
		text-align: center;
		line-height: 26px;
		color:#1475FE;
		margin-right: 20px;
	}
	
	
	/* about */

	.about{
		width:90%;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
		// border-radius:10px;
		box-shadow: 0 5px 6px 0 rgba(15,60,181,.3);
		
	}
	.about-a{
		margin-top:20px;
		width:90%;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
		// border-radius:10px;
		
	}
	.ra{
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	
	.about-container{
		padding-left: 20px;
		width:100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.about-content{
		display: flex;
		flex-direction: column;
		// align-items: center;
		// justify-content: center;
	
	}
	
	.max-t{
		color:#000;
		font-size: 20px;
		font-weight: 900;
	}
	.smax-t{
		color:#666;
		font-size: 14px;
		// font-weight: 900;
	}
	
	.small-t{
		color:#666;
		font-size: 14px;
		// font-weight: 900;
	}
	
	.container-b{
		margin-right: 20px;
		width:100px;
		height: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: rgba(247,106,71,.1);
		border-radius: 20px;
	}
	.arrow {
		width:16px;
		height: 16px;
		color:#999;
		font-weight: 900;
	}
	.arrow1{
		color:#FF654D;
		font-size: 14px;
	}
	
	
	/*  */
	
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
		bottom: 80px;
		width:100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 -3px 4px 0 rgba(0,0,0,.1);
	}
	.buy-tks{
		width:100vw;
		height: 90px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.buy-tk-pay{
		width:95vw;
		height: 48px;
		text-align: center;
		line-height: 48px;
		font-size: 20px;
		font-weight: 900;
		color: #fff;
		border-radius: 5px;
	}
	.buy-money-renminbi{
		font-size: 14px;
	}
	.buy-money{
		font-size: 24px;
		margin-right: 10px;
	}
	.buy-content{
		font-size: 18px;
	}
	.buy-underline{
		color:#eee;
		text-decoration:line-through;
		margin-right: 10px;
	}
	.buy-tk-protocol{
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
		// background-color: #1ff0ef;
		// background-image: linear-gradient(45deg,#1ff0ef 0%,#fe2e5c 100%);
		text-align: center;
		line-height: 12px;
		font-size: 8px;
		color: #fff;
		font-weight: 900;
		
	}

	.buy-agree-title{
		color:#999;
		font-size: 12px;
	}
	.buy-agree-protocol{
		font-size: 12px;
		color:#1476fe;
		text-decoration: underline;
	}
	.tk-vips{
		width:100vw;
		height: 90px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.tk-vips-items{
		width:95vw;
		height: 48px;
		// background-image: linear-gradient(135deg, rgba(244, 213, 131, 1), rgba(191, 152, 57, 1.0));
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.about {
		background: linear-gradient(135deg, #FA5050,#FF654D, #FF9372,#FA5050,#FA5050,) left center/400% 400%;
		// background-color: #1476fe;
		animation: move 10s infinite;
	}
	
	@keyframes move {
		0%,
		100% {
			background-position-x: left;
		}
		50% {
			background-position-x: right;
		}
	}
	
	.tk-vip-item{
		width:33%;
		height: 48px;
		text-align: center;
		line-height: 48px;
		// color: #967533;
		color: #fff;
		font-size: 17px;
		font-weight: 900;
		
	}
.maska{
	width:100vw;
	height: 100vh;
	position: fixed;
	top:0px;
	background-color: rgba(0,0,0,.6);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10000;
	
}
.activityc{
	width:81vw;
	height: auto;
	// background-color: #0B175B;
	background-image: linear-gradient(45deg,#0B175B 0%,#303A87 100%);
	z-index: 4000;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color:#E5BC96;
	box-shadow: 0 2px 6px 0 rgba(0,0,0,.4);
	padding:10px;
}

.hong{
	width:100%;
}
.circlea{
	width:77vw;
	height: auto;
	border:1px solid #E5BC96;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding:20px 10px 20px 10px;
}
.titlea{
	// margin-top:20px;
	width:100%;
	text-align: center;
	font-size: 20px;
	font-weight: 900;
}
.cona{
	width:100%;
	padding:5px;
	display: flex;
	flex-direction: column;
	font-size: 14px;
}
.cona span{
	margin-top:6px;
}

.konws{
	width:80%;
	height: 45px;
	background-image: linear-gradient(45deg,#E9B484 0%,#E7BE9A 100%);
	margin-top:30px;
	color:#0B175B;
	font-size: 25px;
	text-align: center;
	line-height: 45px;
	// font-weight: 900;
	border-radius: 10px;
}
</style>
