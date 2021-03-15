<template>
	<div class='manager'>
		<div class='top'>
			<p>添加城市经理，并将城市经理组织起来，一起线下派发贴牌；</p>
		</div>
		<div class='add-manager-top'>
			<textarea maxlength="30" class='manager-input' ref='userid' placeholder="复制粘贴24位申请人ID，ID获取流程：申请人前往后台,在我的-设置-ID获取." onkeyup="this.value=this.value.replace(/[, ]/g,'')"></textarea>
		</div>
		<div class='manager-sure' @click='saveManager' :style="{backgroundColor:color}">确认添加</div>
		<transition name='fade'>
			<div class='mask' v-if='mask'>
				<div class='mask-contenta'>
					<div class='mask-titlea' :style="{color:color}">{{stateTitle}}</div>
					<div class='mask-titlea-1' :style="{color:color}">添加为城市经理？</div>
					<div class='mask-titleb'>设置以后暂不可撤销，请谨慎</div>
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
	import {mapState,mapMutations} from 'vuex';
	export default {
		name: 'SetCityJinLi',
		components: {
			
		},
		data(){
			return {
				mask:false,
				stateTitle:'',
			}
		},
		
		methods:{
			getData(){
				let that = this;
				let agentID=window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				let val = {
					agentID:agentID,
					productsId:productsId,
				}
				this.axios.post('/api/getlevels',val)
				.then(function(res){
					if(res.data.code===500){
						that.$loading.hide();
						that.$message.info('系统出错了');
						window.localStorage.clear();
						return;
					}
					if(res.data.code===101){
						that.$loading.hide();
						that.$loading.hide();
						that.$message.info('系统出错了');
						window.localStorage.clear();
						return;
					}
					if(res.data.code===201){
						that.$loading.hide();
						return;
					}
					that.$loading.hide();
					that.$router.replace({name:'Promotion'});
					
				})
			},
			saveManager(){
				let userid = this.$refs.userid.value;
				let isUserid = this.$Utils.checkObjectID(userid);
				if(!userid){
					this.$message.info('不能为空');
					return;
				}
				if(!isUserid){
					this.$message.info('格式不正确');
					return;
				}
				this.stateTitle = userid;
				this.mask = true;
			},
			isCancel(){
				this.mask = false;
				this.$refs.userid.value = '';
			},
			isConfirm(){
				let that = this;
				let userid = this.$refs.userid.value;
				let productsId = window.localStorage['productsId'];
				let idData = {
					userid:userid,
					productsId:productsId,
				}

				this.axios.post('/api/savecityjinli',idData)
				.then(function(res){
					if(res.data.code===500){
						that.mask = false;
						that.$message.info('系统出错了');
						return;
					}
					if(res.data.code===100){
						that.mask = false;
						that.$refs.userid.value = '';
						that.$message.info('无此ID');
						return;
					}
					if(res.data.code===101){
						that.mask = false;
						that.$refs.userid.value = '';
						that.$message.info('不能降级');
						return;
					}
					if(res.data.code===102){
						that.mask = false;
						that.$refs.userid.value = '';
						that.$message.info('不能降级');
						return;
					}
					if(res.data.code===103){
						that.mask = false;
						that.$refs.userid.value = '';
						that.$message.info('添加过了');
						return;
					}
					if(res.data.code===200){
						that.mask = false;
						that.$refs.userid.value = '';
						that.$message.info('添加成功');
						return;
					}
					
					
				})
			}
		},
		created() {
			this.$loading.show();
			this.getData();
		},
		computed:{
			...mapState({
				userInfo:state=>state.userInfo,
				color:state=>state.color,
				isPromotion:state=>state.isPromotion,
			})
		},
		mounted(){
	
		}
	}
</script>

<style scoped lang="less">
	.manager{
		padding:10px 0 0 0;
		width:100vw;
		min-height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
		color: #999;
		background: url('http://qiniu.tongkeapp.com/bg_5.png') no-repeat;
		background-size:100%;
	}
	.top{
		width:85vw;
		height: 110px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		color:#999;
		font-size: 12px;
	}
	.add-manager-top{
		width:85vw;
		height: 115px;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 16px;
		box-shadow: 0 1px 6px 0px rgba(100,100,100,.3);
	}
	.manager-input{
		padding:5px 10px 10px 10px;
		width:85vw;
		height: 115px;
		border:none;
		border-radius: 5px;
		font-size: 18px;
		color: #666;
	}
	.manager-sure{
		margin-top:20px;
		width:85vw;
		height: 50px;
		text-align: center;
		line-height: 50px;
		background-color: #1476FE;
		color: #fff;
		font-size: 16px;
		border-radius: 5px;
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
	.mask-titlea-1{
		margin-top:0px;
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
