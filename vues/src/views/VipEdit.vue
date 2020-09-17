<template>
	<div class='vip-edit' :style="{backgroundColor:this.$store.state.color}">
		<div class='edit-text'>
			<div class='edit-sup-title'>推广内容配置</div>
			<div class='edit-sub-title'>用于推广和招纳代理</div>
		</div>
		<div class='edit-wraper'>
			<div class='wraper-items'>
				<div class='wraper-item' @click='toRealNameAuthentication' >
					<div class='wraper-item-img' :style="{backgroundColor:this.$store.state.color}">实</div>
					<div class='wraper-item-title'>实名认证</div>
				</div>
				<div class='wraper-item item-a' @click='toPromotionCover'>
					<div class='wraper-item-img' :style="{backgroundColor:this.$store.state.color}">封</div>
					<div class='wraper-item-title'>推广封面图</div>
				</div>
				<div class='wraper-item' @click='toPromotionQrcodeBackground'>
					<div class='wraper-item-img' :style="{backgroundColor:this.$store.state.color}">码</div>
					<div class='wraper-item-title'>推广码背景图</div>
				</div>
			</div>
			<div class='wraper-items items-a'>
				<div class='wraper-item' @click='toAgentQrcodeBackground'>
					<div class='wraper-item-img' :style="{backgroundColor:this.$store.state.color}">背</div>
					<div class='wraper-item-title'>招商码背景图</div>
				</div>
				<div class='wraper-item item-b' @click='toPromotionPoster'>
					<div class='wraper-item-img' :style="{backgroundColor:this.$store.state.color}">推</div>
					<div class='wraper-item-title'>推广正文</div>
				</div>
				<div class='wraper-item' @click='toAgentPoster'>
					<div class='wraper-item-img' :style="{backgroundColor:this.$store.state.color}">招</div>
					<div class='wraper-item-title'>招商正文</div>
				</div>
			</div>
		</div>
		<div class='edit-text'>
			<div class='edit-sup-title'>其他重要配置</div>
			<div class='edit-sub-title'>个性化功能</div>
		</div>
		<div class='edit-wraper-two'>
			<div class='wraper-items-two'>
				<div class='wraper-item' @click='toTheme'>
					<div class='wraper-item-img' :style="{backgroundColor:this.$store.state.color}">主</div>
					<div class='wraper-item-title'>配置颜色</div>
				</div>
				<div class='wraper-item' @click='toOpenThirdLevel'>
					<div class='wraper-item-img' :style="{backgroundColor:this.$store.state.color}">三</div>
					<div class='wraper-item-title'>开通三级</div>
				</div>
				<div class='wraper-item' @click='toUnionPay'>
					<div class='wraper-item-img' :style="{backgroundColor:this.$store.state.color}">付</div>
					<div class='wraper-item-title'>支付配置</div>
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
		methods:{
			toRealNameAuthentication(){
				this.$router.push({name:'RealNameAuthentication'})
			},
			toPromotionCover(){
				this.$router.push({name:'PromotionCover'})
			},
			toPromotionQrcodeBackground(){
				this.$router.push({name:'PromotionQrcodeBackground'})
			},
			toAgentQrcodeBackground(){
				this.$router.push({name:'AgentQrcodeBackground'})
			},
			toPromotionPoster(){
				this.$router.push({name:'PromotionPoster'})
			},
			toAgentPoster(){
				this.$router.push({name:'AgentPoster'})
			},
			toUnionPay(){
				this.$router.push({name:'UnionPay'})
			},
			toOpenThirdLevel(){
				this.$router.push({name:'OpenThirdLevel'})
			},
			toTheme(){
				this.$router.push({name:'Theme'})
			}
		},
		created() {
			
		}
	}
</script>

<style scoped lang="less">
	.vip-edit{
		width:100vw;
		min-height: 100vh;
		background-color: #1476FE;
		display: flex;
		flex-direction:column;
		align-items: center;
		// justify-content: center;
	}
	.edit-text{
		margin-top:50px;
		text-align: center;
	}
	.edit-sup-title{
		font-size: 12px;
		// font-weight: 900;
		color:#fff;
	}
	.edit-sub-title{
		font-size: 12px;
		color: #eee;
	}
	.edit-wraper{
		padding:0 10px 0 10px;
		margin-top:20px;
		width:90vw;
		height: 210px;
		background-image: linear-gradient(135deg,#fff 0%,#ededed 100%);
		border-radius: 20px;
		box-shadow: 0 1px 11px 0px rgba(0,0,0,.1);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.wraper-items{
		width:100%;
		height: 44%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		
	}
	.items-a{
		// border-top:1px solid rgba(57,72,92,.1); 
	}
	.wraper-item{
		width:30%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.wraper-item-img{
		width:40px;
		height: 40px;
		background-color: #1476fe;
		border-radius: 30px;
		margin-bottom: 10px;
		text-align: center;
		line-height: 40px;
		font-size: 18px;
		font-weight: 900;
		color: #fff;
	}
	.wraper-item-title{
		font-size: 13px;
		font-weight: 900;
		color: #777;
	}
	.item-a,.item-b{
		// border-left: 1px solid rgba(57,72,92,.1);
		// border-right: 1px solid rgba(57,72,92,.1);
	}
	.edit-wraper-two{
		padding:0 10px 0 10px;
		margin-top:20px;
		width:90vw;
		height: 120px;
		background-image: linear-gradient(135deg,#fff 0%,#ededed 100%);
		border-radius: 20px;
		box-shadow: 0 1px 11px 0px rgba(0,0,0,.1);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.wraper-items-two{
		width:100%;
		height:70%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
</style>
