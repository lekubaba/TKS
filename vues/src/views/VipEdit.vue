<template>
	<div class='vip-edit'>
			<div class='wraper-items'>
				<div class='wraper-item item-line' @click='toRealNameAuthentication' >
					<div class='wraper-item-title'>完善信息</div>
					<div class='arrow-right'></div>
				</div>
				<div class='wraper-item item-line' @click='toPromotionQrcodeBackground'>
					<div class='wraper-item-title'>推广码背景图</div>
					<div class='arrow-right'></div>
				</div>
				<div class='wraper-item item-line' @click='toAgentQrcodeBackground'>
					<div class='wraper-item-title'>招商码背景图</div>
					<div class='arrow-right'></div>
				</div>
				<div class='wraper-item item-line' @click='toPromotionPoster'>
					<div class='wraper-item-title'>推广正文</div>
					<div class='arrow-right'></div>
				</div>
				<div class='wraper-item item-line' @click='toAgentPoster'>
					<div class='wraper-item-title'>招商正文</div>
					<div class='arrow-right'></div>
				</div>
				<div class='wraper-item item-line' @click='toCommissionRegular'>
					<div class='wraper-item-title'>佣金与规则</div>
					<div class='arrow-right'></div>
				</div>
				<div class='wraper-item item-line' @click='toCommissionRate'>
					<div class='wraper-item-title'>配置佣金比例</div>
					<div class='arrow-right'></div>
				</div>
				<div class='wraper-item item-line' @click='toSetLink' v-if="pro.mode==='link'">
					<div class='wraper-item-title'>配置链接</div>
					<div class='arrow-right'></div>
				</div>
				<div class='wraper-item item-line' @click='toTheme'>
					<div class='wraper-item-title'>配置颜色</div>
					<div class='arrow-right'></div>
				</div>
				<div class='wraper-item item-line' @click='toOpenThirdLevel'>
					<div class='wraper-item-title'>开通三级</div>
					<div class='arrow-right'></div>
				</div>
				<div class='wraper-item' @click='toSetManager'>
					<div class='wraper-item-title'>管理员配置</div>
					<div class='arrow-right'></div>
				</div>
				<div class='wraper-item' @click='toOtherTool'>
					<div class='wraper-item-title'>常用工具</div>
					<div class='arrow-right'></div>
				</div>
				<div class='wraper-item' @click='toUnionPay' v-if="pro.mode==='line'">
					<div class='wraper-item-title'>支付配置</div>
					<div class='arrow-right'></div>
				</div>
			</div>
		<div style='height: 100px;'></div>
	</div>
</template>

<script>
	export default {
		name: 'VipEdit',
		components: {
			// HelloWorld
		},
		data(){
			return {
				pro:'',
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
			this.$loading.show()
			this.getData();
		},
		methods:{
			getData(){
				let that = this;
				let agentID = window.localStorage['agentID'];
				this.axios.post('/api/getmode',{agentID:agentID})
				.then(function(res){
					if(res.data.code===500){
						that.$loading.hide()
						that.$message.info('系统出错了');
						return;
					}
					that.$loading.hide();
					
					that.pro = res.data.pro
				})
			},
			toRealNameAuthentication(){
				if(this.pro.isAuth){
					this.$router.push({name:'SuccessRemind',query:{kind:'RealNameAuthentication'}})
					return;
				}
				this.$router.push({name:'RealNameAuthentication'})
			},
			toPromotionQrcodeBackground(){
				if(this.pro.isPromotionQr){
					this.$router.push({name:'SuccessRemind',query:{kind:'PromotionQrcodeBackground'}})
					return;
				}
				this.$router.push({name:'PromotionQrcodeBackground'})
			},
			toAgentQrcodeBackground(){
				if(this.pro.isAgentQr){
					this.$router.push({name:'SuccessRemind',query:{kind:'AgentQrcodeBackground'}})
					return;
				}
				this.$router.push({name:'AgentQrcodeBackground'})
			},
			toPromotionPoster(){
				if(this.pro.isPromotionTxt){
					this.$router.push({name:'SuccessRemind',query:{kind:'PromotionPoster'}})
					return;
				}
				this.$router.push({name:'PromotionPoster'})
			},
			toAgentPoster(){
				if(this.pro.isAgentTxt){
					this.$router.push({name:'SuccessRemind',query:{kind:'AgentPoster'}})
					return;
				}
				this.$router.push({name:'AgentPoster'})
			},
			toCommissionRegular(){
				if(this.pro.isRegular){
					this.$router.push({name:'SuccessRemind',query:{kind:'CommissionRegular'}})
					return;
				}
				this.$router.push({name:'CommissionRegular'})
			},
			toCommissionRate(){
				this.$router.push({name:'CommissionRate'})
			},
			toSetLink(){
				if(this.pro.isLink){
					this.$router.push({name:'SuccessRemind',query:{kind:'SetLink'}})
					return;
				}
				this.$router.push({name:'SetLink'})
			},
			toUnionPay(){
				this.$router.push({name:'UnionPay'})
			},
			toOpenThirdLevel(){
				this.$router.push({name:'OpenThirdLevel'})
			},
			toTheme(){
				if(this.pro.isColor){
					this.$router.push({name:'SuccessRemind',query:{kind:'Theme'}})
					return;
				}
				this.$router.push({name:'Theme'})
			},
			toSetManager(){
				this.$router.push({name:'SetManager'});
			},
			toOtherTool(){
				this.$router.push({name:'OtherTool'});
			}
		},
		
	}
</script>

<style scoped lang="less">
.vip-edit{
	width:100vw;
	min-height: 100vh;
	background-color: #F2F5FA;
	display: flex;
	flex-direction:column;
	align-items: center;
}
.edit-text{
	margin-top:50px;
	text-align: center;
}
.edit-sup-title{
	font-size: 12px;
	color:#fff;
}
.edit-sub-title{
	font-size: 12px;
	color: #eee;
}
.wraper-items{
	padding:10px 0 10px 0;
	width:92%;
	height:auto;
	display: flex;
	flex-direction:  row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	
}
.wraper-item{
	margin-top:10px;
	width:48%;
	height: 60px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	background-color: #fff;
	border-radius: 10px;
}
.wraper-item-img{
	width:40px;
	height: 40px;
	border-radius: 30px;
	margin-bottom: 10px;
	text-align: center;
	line-height: 40px;
	font-size: 18px;
	font-weight: 900;
	color: #fff;
}
.wraper-item-title{
	margin-left: 20px;
	font-size: 14px;
	font-weight: 900;
	color: #666;
}
.arrow-right {
	margin-right: 20px;
	width: 0;
	height: 0;
	border-left: 8px solid transparent;
	border-right: 8px solid transparent;
	border-bottom: 8px solid #1476FE;
	font-size: 0;
	line-height: 0;
	transform: rotate(90deg);
}
</style>
