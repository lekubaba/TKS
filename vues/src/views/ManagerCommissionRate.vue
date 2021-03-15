<template>
	<div class='commission-rate'>
		<div class='container'>
			<div class='container-a'>
				<div class='c-title' v-on:click="show1 = !show1">
					<span>经理直推佣金设置</span>
					<span style='color:#FE2E5C;font-size: 16px;'>{{rate1}}</span>
				</div>
				<transition name="fade">
					<div v-if="show1">
						<div class='remind'>
							城市经理直推的首笔借款金额比例，请填写纯小数，比如2.5个点就填写0.025，不要填2.5%。
						</div>
						<div class='contentx'>
							<input class='inputx' v-model.number="ratea" placeholder="经理直推比例" type="number" ref='extension' min="0" max="1.00" step="0.01" oninput="value=value.replace(/[^\d.]/g,'')" onkeyup="this.value=this.value.replace(/[, ]/g,'')">
							<button class='confirmx' @click='toSaveExtension'>确认分配</button>
						</div>
						<div class='remind' v-if="ratea!=='城市经理直推比例'"> 您填写了：<span style='color:#FF654D'>{{ratea}}</span> , 如果城市经理直推放款10万。他自己能获得的佣金是：<span style='color:#FF654D'>{{rateA}}</span>  元。</div>
					</div>
				</transition>
			</div>
		</div>
		<div class='container1'>
			<div class='container-a'>
				<div class='c-title' v-on:click="show2 = !show2">
					<span style='color:#1476FE'>经理上级佣金设置</span>
					<span style='color:#FE2E5C;font-size: 16px;'>{{rate2}}</span>
				</div>
				<transition name="fade">
					<div v-if="show2">
						<div class='remind'>
							城市经理直推的首笔借款金额比例，请填写纯小数，比如0.2个点就填写0.002，不要填0.2%。
						</div>
						<div class='contentx'>
							<input class='inputx' v-model.number="rateb" placeholder="上级分佣比例" type="number" ref='extensionSuper' min="0" max="1.00" step="0.01" oninput="value=value.replace(/[^\d.]/g,'')" onkeyup="this.value=this.value.replace(/[, ]/g,'')">
							<button class='confirmx' @click='toSaveSuperExtension'>确认分配</button>
						</div>
						<div class='remind' v-if="rateb!=='经理直推上级分佣比例'"> 您填写了：<span style='color:#FF654D'>{{rateb}}</span> , 如果城市经理直推放款10万。他上级能获得的佣金是：<span style='color:#FF654D'>{{rateB}}</span>  元。</div>
					</div>
				</transition>
			</div>
		</div>
		<div class='container1'>
			<div class='container-a'>
				<div class='c-title' v-on:click="show3 = !show3">
					<span style='color:#11b764'>上上级佣金设置</span>
					<span style='color:#FE2E5C;font-size: 16px;'>{{rate3}}</span>
				</div>
				<transition name="fade">
					<div v-if="show3">
						<div class='remind'>
							城市经理直推的首笔借款金额比例，请填写纯小数，比如0.1个点就填写0.001，不要填0.1%。
						</div>
						<div class='contentx'>
							<input class='inputx' v-model.number="ratec" placeholder="上上级分佣比例" type="number" ref='extensionBigSuper' min="0" max="1.00" step="0.01" oninput="value=value.replace(/[^\d.]/g,'')" onkeyup="this.value=this.value.replace(/[, ]/g,'')">
							<button class='confirmx' @click='toSaveBigSuperExtension'>确认分配</button>
						</div>
						<div class='remind' v-if="ratec!=='经理直推上上级分佣比例'"> 您填写了：<span style='color:#FF654D'>{{ratec}}</span> , 如果城市经理直推放款10万。他上上级能获得的佣金是：<span style='color:#FF654D'>{{rateC}}</span>  元。</div>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'ManagerCommissionRate',
		components: {
			// HelloWorld
		},
		data(){
			return {
				mask:false,
				level:null,
				show1:false,
				show2:false,
				show3:false,
				rate1:0,
				rate2:0,
				rate3:0,
				ratea:'城市经理直推比例',
				rateb:'经理直推上级分佣比例',
				ratec:'经理直推上上级分佣比例',
				
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
			this.$loading.show();
			this.getData();
		},
		methods:{
			getData(){
				let that = this;
				let productsId = window.localStorage['productsId'];
				this.axios.post('/api/toGetManagerExtension',{productsId:productsId})
				.then(function(res){
					if(res.data.code===500||res.data.code===100){
						that.$loading.hide();
						that.$message.info('系统出错了');
						return;
					}
					that.rate1 = res.data.managerExtension;
					that.rate2 = res.data.managerExtensionSuper;
					that.rate3 = res.data.managerExtensionBigSuper;
					that.$loading.hide();
					
				})
			},
			toSaveExtension(){
				let that = this;
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				let extension = this.$refs.extension.value;
				let isExtension = this.$Utils.checkDouble(extension);
				if(!extension){
					this.$message.info('请输入比例');
					return;
				}
				if(!isExtension){
					this.$message.info('请输入小数');
					return;
				}
				
				this.axios.post('/api/toSaveExtension_leader',{agentID:agentID,productsId:productsId,extension:extension})
				.then(function(ret){
					if(ret.data.code===500){
						that.$message.info('系统出错了');
						return;
					}
					if(ret.data.code===100){
						that.$message.info('系统出错了');
						return;
					}
					that.rate1 = extension;
					that.ratea = '城市经理直推比例';
					that.show1 = false;
					that.$message.info('配置成功');
					
				})
				
			},
			toSaveSuperExtension(){
				let that = this;
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				let extension = this.$refs.extensionSuper.value;
				let isExtension = this.$Utils.checkDouble(extension);
				if(!extension){
					this.$message.info('请输入比例');
					return;
				}
				if(!isExtension){
					this.$message.info('请输入小数');
					return;
				}
				
				this.axios.post('/api/toSaveSuperExtension_leader',{agentID:agentID,productsId:productsId,extension:extension})
				.then(function(ret){
					if(ret.data.code===500){
						that.$message.info('系统出错了');
						return;
					}
					if(ret.data.code===100){
						that.$message.info('系统出错了');
						return;
					}
					that.rate2 = extension;
					that.rateb = '经理直推上级分佣比例';
					that.show2 = false;
					that.$message.info('配置成功');
					
				})
			},
			toSaveBigSuperExtension(){
				let that = this;
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				let extension = this.$refs.extensionBigSuper.value;
				let isExtension = this.$Utils.checkDouble(extension);
				if(!extension){
					this.$message.info('请输入比例');
					return;
				}
				if(!isExtension){
					this.$message.info('请输入小数');
					return;
				}
				
				this.axios.post('/api/toSaveBigSuperExtension_leader',{agentID:agentID,productsId:productsId,extension:extension})
				.then(function(ret){
					if(ret.data.code===500){
						that.$message.info('系统出错了');
						return;
					}
					if(ret.data.code===100){
						that.$message.info('系统出错了');
						return;
					}
					that.rate3 = extension;
					that.ratec = '经理直推上上级分佣比例';
					that.show3 = false;
					that.$message.info('配置成功');
					
				})
			},
		},
		computed:{
			rateA(){
				return this.$NumberMul(this.ratea,100000);
			},
			rateB(){
				return this.$NumberMul(this.rateb,100000);
			},
			rateC(){
				return this.$NumberMul(this.ratec,100000);
				
			}
		},
		watch:{
			'ratea':function (newVal,oldVal) {
				
				// 解决数字键盘可以输入多个小数点问题
				if(newVal==='' && oldVal.toString().indexOf('.')>0){
					this.ratea = Number(oldVal);
					return ;
				}
				// 保留7位小数
				if(newVal){
					newVal = newVal.toString();
					var pointIndex =  newVal.indexOf('.');
					if(pointIndex>0 && (newVal.length - pointIndex)>7){
						this.ratea = Number(oldVal);
						return ;
					}
				}
				// 最大值
				if(newVal>1){
					this.ratea = Number(oldVal);
					return ;
				}
			}
		}

	}
</script>

<style scoped lang="less">
	.commission-rate{
		width:100vw;
		min-height: 100vh;
		background-color: #F2F5FA;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
		padding-bottom: 40px;
	}
	
	.container{
		margin-top:40px;
		width:92vw;
		height: auto;
		padding:20px 25px 20px 25px;
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
		font-size:24px;
		color:#333;
		font-weight: 900;
		display: flex;
		justify-content: space-between;
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
		width:65%;
		height: 45px;
		background-color: #F2F5FA;
		border:none;
		margin-bottom: 10px;
		font-size: 18px;
		color:#333;
		padding-left: 10px;
		border-bottom-left-radius: 5px;
		border-top-left-radius: 5px;
	}
	.confirmx{
		width:35%;
		height: 45px;
		background-color: #1475FE;
		font-size: 16px;
		color:#fff;
		border:none;
		border-bottom-right-radius: 5px;
		border-top-right-radius: 5px;
	}
	
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .2s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
	
</style>
