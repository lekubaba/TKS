<template>
	<div class='vip-edit'>
		<div class='edit-wraper'>
			<div class='wraper-items'>
				<div class='wraper-item item-line' @click='toRealNameAuthentication' >
					<div class='wraper-item-title'>| 完善信息</div>
					<div class='wraper-item-img' :style="{color:this.$store.state.color}">〉</div>
				</div>
				<div class='wraper-item item-line' @click='toPromotionQrcodeBackground'>
					<div class='wraper-item-title'>| 推广码背景图</div>
					<div class='wraper-item-img' :style="{color:this.$store.state.color}">〉</div>
				</div>
				<div class='wraper-item item-line' @click='toAgentQrcodeBackground'>
					<div class='wraper-item-title'>| 招商码背景图</div>
					<div class='wraper-item-img' :style="{color:this.$store.state.color}">〉</div>
				</div>
				<div class='wraper-item item-line' @click='toPromotionPoster'>
					<div class='wraper-item-title'>| 推广正文</div>
					<div class='wraper-item-img' :style="{color:this.$store.state.color}">〉</div>
				</div>
				<div class='wraper-item item-line' @click='toAgentPoster'>
					<div class='wraper-item-title'>| 招商正文</div>
					<div class='wraper-item-img' :style="{color:this.$store.state.color}">〉</div>
				</div>
				<div class='wraper-item item-line' @click='toCommissionRegular'>
					<div class='wraper-item-title'>| 佣金与规则</div>
					<div class='wraper-item-img' :style="{color:this.$store.state.color}">〉</div>
				</div>
				<div class='wraper-item item-line' @click='toSetLink' v-if="pro.mode==='link'">
					<div class='wraper-item-title'>| 配置链接</div>
					<div class='wraper-item-img' :style="{color:this.$store.state.color}">〉</div>
				</div>
				<div class='wraper-item item-line' @click='toTheme'>
					<div class='wraper-item-title'>| 配置颜色</div>
					<div class='wraper-item-img' :style="{color:this.$store.state.color}">〉</div>
				</div>
				<div class='wraper-item' @click='toOpenThirdLevel'>
					<div class='wraper-item-title'>| 开通三级</div>
					<div class='wraper-item-img' :style="{color:this.$store.state.color}">〉</div>
				</div>
				<div class='wraper-item' @click='toUnionPay' v-if="pro.mode==='line'">
					<div class='wraper-item-title'>| 支付配置</div>
					<div class='wraper-item-img' :style="{color:this.$store.state.color}">〉</div>
				</div>
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
			}
		},
		
	}
</script>

<style scoped lang="less">
	.vip-edit{
		width:100vw;
		min-height: 110vh;
		background-color: rgb(237,237,237);
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
	.edit-wraper{
		margin-top:20px;
		width:90vw;
		height: auto;
		background-image: linear-gradient(135deg,#fff 0%,#ededed 100%);
		border-radius: 10px;
		box-shadow: 0 1px 11px 0px rgba(0,0,0,.1);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.wraper-items{
		padding:10px 0 10px 0;
		width:100%;
		height:auto;
		display: flex;
		flex-direction:  column;
		align-items: center;
		justify-content: space-between;
		
	}
	.items-a{
		// border-top:1px solid rgba(57,72,92,.1); 
	}
	.wraper-item{
		width:100%;
		height: 60px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.item-line{
		border-bottom: .5px solid #ccc;
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
		font-size: 13px;
		font-weight: 900;
		color: #777;
	}
</style>
