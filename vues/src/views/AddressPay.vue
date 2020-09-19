<template>
	<div class='address-pay'>
		
		<div class='address-h'>
			<div class='h-wrapper'>
				<img class='h-avatar' src="http://qiniu.tongkeapp.com/lekubaba.jpeg" alt="img">
				<div class='h-name-star'>
					<span class='h-name'>由好友 杨锦旋 为您推荐！</span>
					<div class='h-star'>
						<span>&#9733;</span>
						<span>&#9733;</span>
						<span>&#9733;</span>
						<span>&#9733;</span>
						<span>&#9733;</span>
					</div>
				</div>
			</div>
		</div>
		<div class='address-c'>
			<div class='c-wrapper'>
				<div class='c-wraperb'>
					<span>联系人</span>
					<input type="text" class='c-input' name='customerName' placeholder="请填收货人姓名" ref='customerName' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
				</div>
				<div class='c-wraperb'>
					<span>手机号</span>
					<input type="number" class='c-input' name='customerPhoneNumber' placeholder="收货人手机号" ref='customerPhoneNumber' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
				</div>
				<div class='c-wraperb'>
					<span>验证码</span>
					<div class='c-check'>
						<input type="number" class='c-input-check' name='verificationCode' placeholder="请填写验证码" ref='verificationCode' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
						<div class='get-check-number' :style="{backgroundColor:this.$store.state.color}" @click='countDownSixty'>{{content}}</div>	
					</div>
				</div>
				<div class='c-wraperb' @click='showMaskCity'>
					<span>所在地区</span>
					<div class='province-city-area'>
						<span>{{provinceCityArea}}</span>
						<div class='to-city'>〉</div>
					</div>
				</div>
				<div class='c-wraperc'>
					<textarea maxlength="30" class='c-textarea' name='customerAddress' placeholder="详细地址 : 如道路,门牌号,小区,楼栋号,单元室等" ref='customerAddress' onkeyup="this.value=this.value.replace(/[, ]/g,'')">
					</textarea>
				</div>
				
			</div>
		</div>
		<!-- footer部分 -->
		<div class='address-f'>
			<div class='f-wrapper'>
				<div class='f-content'>
					<img class='f-products-img' src="http://qiniu.tongkeapp.com/products_01.png" alt="商品">
					<div class='f-products-text'>
						<div class='f-products-title'>越南进口玉芒一整箱20斤...</div>
						<div class='f-products-money'>
							<span class='f-span'>原价：</span>
							<span class='original-price'>¥199</span>
							<span class='f-span'>，活动价：</span>
							<span class='activity-price'>¥99</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class='c-submit' @click= 'toConfirmBuy' :style="{backgroundColor:this.$store.state.color}">确认并支付</div>
		<transition name='fade'>
			<div class='mask-city' v-if='isShow'>
				<div class='wrapper-c'>
					<div class='please'>请选择</div>
					<div class='close-city' @click='closeCity'>×</div>
					<div class='city-wrapper'>
						<v-distpicker
							address-header='address-header'
							type='mobile'
							@selected="onSelected">
						</v-distpicker>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import VDistpicker from 'v-distpicker'
	export default {
		name: 'AddressPay',
		components: {
			VDistpicker
		},
		data(){
			return {
				content: '获取验证码',
				totalTime: 60,
				canClick: true ,//添加canClick
				isShow:false,
				provinceCityArea:'',
			}
		},
		created() {
			
		},
		methods:{
			showMaskCity(){
				this.isShow = true;
			},
			closeCity(){
				this.isShow = false;
			},
			toConfirmBuy(){
				let that = this;
				let ref = this.$refs;
				
				let customerName = ref.customerName.value;
				let customerPhoneNumber = ref.customerPhoneNumber.value;
				let verificationCode = ref.verificationCode.value;
				let customerCity = this.provinceCityArea;
				let customerAddress = ref.customerAddress.value;
				
				let isCustomerName = this.$Utils.checkCName(customerName);
				let isCustomerPhoneNumber = this.$Utils.checkTel(customerPhoneNumber);
				let isVerificationCode = this.$Utils.checkVC(verificationCode);/* 四位验证码 */
				let isCustomerCity = this.$Utils.removeSpace(customerCity);
				let isCustomerAddress = customerAddress.length>=8;
				
				if(!customerName || !customerPhoneNumber || !verificationCode || !customerCity || !customerAddress){
					this.$message.info('请输入内容');
					return;
				}
				if(!verificationCode){
					this.$message.info('请输入验证码');
					return;
				}
				if(!isVerificationCode){
					this.$message.info('验证码错误');
					return;
				}
				
				if(verificationCode){
					console.log('验证验证码');/* 如果错误，提醒验证码错误，如果正确，下一步 */
				}
				
				if(!isCustomerName||!isCustomerPhoneNumber||!isVerificationCode||isCustomerAddress){
					this.$message.info('格式错误');
					return;
				}
				
				if(isCustomerName&&isCustomerPhoneNumber&&isVerificationCode&&isCustomerCity&&isCustomerAddress){
					let saveImformations = {
						agentPhoneNumber:this.userInfo.agentPhoneNumber,
						customerName:customerName,
						customerPhoneNumber:customerPhoneNumber,
						customerCity:customerCity,
						customerAddress:customerAddress,
					}
					
					this.axios.post('/api/saveAddress',{...saveImformations})
						.then(function(res){
							console.log(res.data);
							that.$message.success('保存成功');
							that.$router.replace({name:'SuccessRemind',query:{supTitle:'支付成功',subTitle:'商家将在2个工作日内发货'}});
						})
				}
				
				
			},
			countDownSixty () {
				let customerPhoneNumber = this.$refs.customerPhoneNumber.value;
				if(customerPhoneNumber===''){
					this.$message.info('手机号为空');
					return;
				}
				if(!this.$Utils.checkTel(customerPhoneNumber)){
					this.$message.info('手机号错误');
					return;
				}
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
			},
			onSelected(data) {
				this.provinceCityArea = data.province.value+data.city.value+data.area.value;
				this.isShow = false;
			}
		},
		computed:{
			...mapState({
				userInfo:state=>state.userInfo,
			})
		}
	}
</script>

<style scoped lang='less'>
	
	.address-pay{
		width:100vw;
		height: 100vh;
		background-color: rgb(247,247,247);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	/* header 部分 */
	.address-h{
		margin-top:20px;
		width:100vw;
		height: 70px;
		display: flex;
		align-items: center;
		justify-content: center;
		
	}
	.h-wrapper{
		padding:0 20px 0 20px;
		width:95vw;
		height: 70px;
		display: flex;
		align-items: center;
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 2px 6px 0px rgba(0,0,0,.1);
	}
	.h-avatar{
		width:40px;
		height: 40px;
		border-radius: 30px;
		border:1px solid #1476FE;
	}
	.h-name-star{
		display: flex;
		flex-direction: column;
	}
	.h-name{
		margin-left: 10px;
		font-size: 15px;
		color:#1476FE;
		font-weight: 900;
	}
	
	.h-star{
		margin-top:-4px;
		margin-left: 7px;
	}
	.h-star span{
		font-size: 10px;
		margin-left: 2px;
		color:#FF9603;
	}
	
	/* content部分 */
	
	.address-c {
		width:100vw;
		margin-top:20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.c-wrapper{
		
		width:95vw;
		min-height: 200px;
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 2px 6px 0px rgba(0,0,0,.1);
	}
	.c-wraperb{
		margin-top:10px;
		width:95vw;
		height: 45px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 20px 0 20px;
		border-bottom: .5px solid #ccc;
	}

	.c-wraperb span{
		display: inline-block;
		font-size: 15px;
		font-weight: 900;
		color: #666;
	}

	.c-input{
		width:80%;
		height: 30px;
		margin-left:10px;
		border:none;
		background-color: #fff;
		font-size: 15px;
		color: #555;
		font-weight: 900;
	}
	
	.c-check{
		width:80%;
		height: 30px;
		margin-left:10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.c-input-check{
		
		width:40vw;
		height: 30px;
		border:none;
		background-color: #fff;
		font-size: 15px;
		color: #555;
		font-weight: 900;
	}
	.get-check-number{
		padding:0 30px 0 30px;
		height: 30px;
		color: #fff;
		background-color: #1476fe;
		text-align: center;
		line-height: 30px;
		font-size: 12px;
		border-radius: 20px;
	}
	
	.province-city-area{
		display: flex;
		width:80%;
		height: 30px;
		background-color: #fff;
		font-size: 15px;
		color: #555;
		font-weight: 900;
		align-items: center;
		justify-content: space-between;
	}
	.to-city{
		font-size: 16px;
		font-weight: 900;
		color:#666;
	}
	
	.c-wraperc{
		padding:0 20px 0 20px;
		margin-top:20px;
	}

	.c-textarea{
		width:100%;
		height: 60px;
		border:none;
		background-color: #fff;
		font-size: 15px;
		color: #555;
		font-weight: 900;
	}
	
	/* footer部分 */

	.address-f{
		width:100vw;
		margin-top:15px;
		height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.f-wrapper{
		border-radius: 10px;
		width:95vw;
		height: 120px;
		background-color: #fff;
		box-shadow: 0 2px 6px 0px rgba(0,0,0,.1);
		padding:15px;
	}
	
	.f-content{
		width:100%;
		height: 100%;
		background-color: rgba(253,242,235,1);
		border-radius: 10px;
		padding:5px 10px 5px 10px;
		display: flex;
		align-items: center;
	}
	
	.f-products-img{
		margin:3px 10px 0 5px;
		width:70px;
		height: 70px;
	}
	.f-products-text{
		height: 65px;
	}
	
	.f-products-title{
		font-size: 18px;
		font-weight: 900;
		color:#1476FE;
	}
	.f-products-money{
	
	}
	
	.f-span{
		display: inline-block;
		margin-top:5px;
		font-size: 14px;
		color:#888;
		font-weight: 900;
	}
	.original-price{
		text-decoration: line-through;
		font-size: 18px;
		font-weight: 900;
		color:#1476FE;
	}
	.activity-price{
		font-size: 18px;
		font-weight: 900;
		color:#FE2e5c;
	}
	
	
	/* 支付按钮部分 */
	.c-submit{
		margin-top:50px;
		width:80vw;
		height: 50px;
		text-align: center;
		line-height: 50px;
		color: #fff;
		font-size: 20px;
		background-color: #1476fe;
		border-radius: 10px;
	}
	
	
	/* mask部分 */
	
	.mask-city{
		position: fixed;
		bottom:0px;
		width:100vw;
		height: calc(100vh + 80vh);
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
		bottom:-80vh;
		opacity: 0;
	}
	.fade-enter-to{
		bottom:0px;
	}
	.fade-leave{
		bottom: 0px;
	}
	.fade-leave-to {
		bottom:-80vh;
		opacity: 0;
	}

	
	.wrapper-c{
		position: relative;
		bottom: 0px;
		transition: bottom 3s;
		width:100vw;
		height: 80vh;
		background-color: #fff;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		
		
	}
	.please{
		width:100vw;
		height:50px;
		text-align: center;
		line-height: 50px;
		font-size: 16px;
		color:#999;
	}
	.close-city{
		width:45px;
		height: 40px;
		font-size: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		color:#999;
		position: absolute;
		right: 5px;
		top:0px;
	}
	.city-wrapper{
		overflow:scroll;
		width:100vw;
		height: 65vh;
		background-color: #fff;
		padding:0 30px 30px 30px;
		/deep/ .distpicker-address-wrapper{
			
			color:#999;
			.address-header ul li.active {
				border-bottom: 3px solid #fff;
				color: #1476FE;
			}
			.active:after {
			    content: " ";
			    width: 30px;
			    height: 0.12rem;
			    background: #1476FE;
			    position: absolute;
			    bottom: -0.1rem;
			    left: 50%;
			    transform: translateX(-50%);
			}
			.address-container{
				.active:after {
				    content: " ";
				    width: 0px;
				    height: 0.12rem;
				    background: #1476FE;
				    position: absolute;
				    bottom: -0.1rem;
				    left: 50%;
				    transform: translateX(-50%);
				}
			}
			.address-container ul li.active {
				
				margin-top:10px;
				color: #333;
			}
		}
	}
	
	 .address-header ul li.active{
		border:none;
	}

</style>
