<template>
	<div class='account'>
		<div class='container'>
			<div class='container-a'>
				<div class='c-title'>
					产品名称 :
				</div>
				<div class='c-titlea'>
					{{productsName}}
				</div>
			</div>
			<div class='container-a'>
				<div class='c-title'>
					发布作者 :
				</div>
				<div class='c-titlea'>
					{{companyName}}
				</div>
			</div>
			<div class='container-a'>
				<div class='c-title'>
					主负责人 :
				</div>
				<div class='c-titlea'>
					{{agentNickname}}
				</div>
			</div>
			<div class='container-a'>
				<div class='c-title'>
					联系方式 :
				</div>
				<div class='c-titlea'>
					{{bossPhoneNumber}}
				</div>
			</div>
			<div class='container-a'>
				<div class='c-title'>
					发布时间 :
				</div>
				<div class='c-titlea'>
					{{time}}
				</div>
			</div>
			<div class='set-main' @click='setMainPromotion' v-if='currentProductsId!==productsId'>设为主推</div>
		</div>
		<transition name='fade'>
			<div class='mask' v-if='mask.mask1'>
				<div class='mask-contenta'>
					<div class='mask-titlea' :style="{color:color}">确认切换</div>
					<div class='mask-titleb'>确认以后需要重新登陆</div>
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
	import {mapState} from 'vuex';
	export default {
		name: 'SetMainPromotiom',
		components: {
			// HelloWorld
		},
		data(){
			return {
				mask:{
					mask1:false,
				},
				currentProductsId:'',
				productsId:'',
				productsName:'',
				companyName:'',
				agentNickname:'',
				bossPhoneNumber:'',
				time:'',
			}
		},
		created() {
			this.$loading.show();
			this.productsId =  this.$route.params.productsId;
			this.currentProductsId = window.localStorage['productsId'];
			this.getData();
		},
		methods:{
			getData(){
				let that = this;
				let productsId = this.$route.params.productsId;
				this.axios.post('/api/getProductsInfos',{productsId:productsId})
				.then(function(res){
					if(res.data.code===500){
						that.$loading.hide();
						that.$message.info('出错了');
						return;
					}
					that.productsName = res.data.productsName;
					that.companyName = res.data.companyName;
					that.agentNickname = res.data.agentNickname;
					that.bossPhoneNumber = res.data.bossPhoneNumber;
					that.time = res.data.time;
					that.$loading.hide();
					
				})
			},
			setMainPromotion(event){
				let currentProductsId = window.localStorage['productsId'];
				if(this.productsId == currentProductsId){
					this.$message.info('不要重复设置');
					return;
				}
				this.mask.mask1 = true;
			},
			isCancel(){
				this.mask.mask1 = false;
			},
			isConfirm(event){
				let that = this;
				let agentID = window.localStorage['agentID'];
				let productsId = this.productsId;
				this.axios.post('/api/setmainpromotionproducts',{agentID:agentID,productsId:productsId})
				.then(function(resp){
					that.mask.mask1 = false;
					if(resp.data.code===500){
						that.$message.info('系统出错了');
						return;
					}
					that.$message.info('切换成功');
					
					window.localStorage.clear();
					that.$router.push({name:'Login'});
				})
			}
		},
		computed:{
			...mapState({
				userInfo:state=>state.userInfo,
				color:state=>state.color,
			})
		},
	}
</script>

<style scoped lang="less">
.account{
	width:100vw;
	height: 100vh;
	background-color: #F2F5FA;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: url('http://qiniu.tongkeapp.com/bg_5.png') no-repeat;
	background-size:100%;
	
}
.container{
	margin-top:40px;
	width:92vw;
	min-height:auto;
	padding:20px 25px 20px 25px;
	background-color: #fff;
	border-radius: 10px;
	
}
.container-a{
	width:100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	// justify-content: center;
}

.c-title{
	margin-top: 10px;
	font-size:16px;
	color:#666;
	font-weight: 900;
}
.c-titlea{
	margin:10px 0 0 10px;
	font-size:16px;
	color:#1475FE;
	font-weight: 900;
}

.set-main{
	margin-top:50px;
	width:100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	color:#fff;
	background-color: #1475FE;
	border-radius: 10px;
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
	font-size: 16px;
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
