<template>
	<div class="data" ref='ok'>
		<div class='see-s-navs' v-if ='isPromotion'>
			<router-link to="/userdata" replace class='see-s-nav first-nav' active-class="activex" exact>全部
			{{count?count:0}}
			</router-link>
			<router-link to="/userdata/3" replace class='see-s-nav' active-class="activex" exact>暂未出额</router-link>
			<router-link to="/userdata/4" replace class='see-s-nav' active-class="activex" exact>已出额</router-link>
			<router-link to="/userdata/5" replace class='see-s-nav' active-class="activex" exact>已借款</router-link>
			<router-link to="/userdata/7" replace class='see-s-nav' active-class="activex" exact>其他</router-link>
			<div class='today' :style='{color:color}'>+ 
				<vns :start="start" :end="dayCount" :times="times" :speed="speed"/>
			</div>
		</div>

		<router-view v-bind:datas='customerList' v-bind:isVIP='userInfo.isVIP' v-bind:remind='remind' v-bind:isRemind='isRemind'/>
		<Loading v-bind:show='isLoading' v-bind:show2='isLoading2'/>
		
	</div>
</template>
<script>
import Vue from 'vue';
import {mapState} from 'vuex';
import Loading from '../components/Loading.vue';
import vns from 'vue-number-scroll';
export default {
	name: 'UserData',
	components: {
		Loading,
		vns
	},
	data(){
		return {
			start:0,
			countx:7,
			times:15,
			speed:100,
			dayCount:0,
			count:'',
			customerList:[],
			isLoading:false,
			isLoading2:true,
			isLoan:true,
			isFirstEnter:false, // 是否第一次进入，默认false
			edu:null,
			orderMoney:null,
			remind:'',
			isRemind:false,
			mask:false,
		}
	},
	computed:{
		...mapState({
			userInfo:state=>state.userInfo,
			color:state=>state.color,
			isPromotion:state=>state.isPromotion,
		}),
	},
	
	created() {
		//记录是否为第一次进入页面；
		this.isFirstEnter=true;
		if(this.$route.fullPath==='/userdata'){
			window.localStorage.setItem('pathCode','100');
		};
		
		
		
	},
	mounted() {
		// window.addEventListener("scroll",this.scroll(),true);
		this.scroll();
		
	},
	activated() {
		
		if(!this.$route.meta.isBack||this.isFirstEnter){
			// 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
			this.$loading.show();
			this.fetchData();
		}
		// 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
		this.$route.meta.isBack=false;
		this.isFirstEnter=false;
		//判断customerList是否为空；
		if(window.localStorage['index']){
			let index = Number(window.localStorage['index']);
			
			if(window.localStorage['eDu']){
				Vue.set(this.customerList[index],'eDu',window.localStorage['eDu']);
				window.localStorage.removeItem('eDu');
			}
			if(window.localStorage['orderMoney']){
				Vue.set(this.customerList[index],'orderMoney',window.localStorage['orderMoney']);
				window.localStorage.removeItem('orderMoney');
			}
			window.localStorage.removeItem('index');
		 
		}
	
	},
	beforeRouteEnter(to,from,next) {
		if(from.name=='FeedBack'){
			to.meta.isBack = true;
		}
		next();
	},
	methods:{
		fetchData(){
			let that = this;
			let agentID=window.localStorage['agentID'];
			let productsId = window.localStorage['productsId'];
			let pathCode = window.localStorage['pathCode']?window.localStorage['pathCode']:100;
			pathCode = Number(pathCode);
			this.axios.post('/api/userData',{agentID:agentID,productsId:productsId,pathCode:pathCode})
				.then(function(response){
					that.$loading.hide();
					if(response.data.code===500){
						that.$message.info('系统故障了');
						window.localStorage.clear();
						return;
					}
					if(pathCode===105){
						// 时间排序
						that.customerList = response.data.orders;
						that.dayCount = response.data.dayCount;
						that.count = response.data.count;
						return;
					}
					that.customerList = response.data.orders;
					that.dayCount = response.data.dayCount;
					that.count = response.data.count;
					
				})
		},

		scroll() {
			let that = this;
			let agentID = window.localStorage['agentID'];
			let productsId = window.localStorage['productsId'];

			window.onscroll = () => {
				
				// 变量scrollTop为当前页面的滚动条纵坐标位置
				let scrollTop =
				  document.documentElement.scrollTop || document.body.scrollTop;
				// 变量 windowHeight 是可视区的高度
				let windowHeight =
				  document.documentElement.clientHeight || document.body.clientHeight;
				// 变量 scrollHeight 是滚动条的总高度
				let scrollHeight =
				  document.documentElement.scrollHeight || document.body.scrollHeight;
				// 距离底部100px时加载一次
				let bottomOfWindow =  scrollHeight -(scrollTop + windowHeight)<=100;
				if (bottomOfWindow&&that.isLoading == false) {
					that.isLoading = true;
					let count = that.customerList.length;
					let pathCode = window.localStorage['pathCode'];
					pathCode = Number(pathCode);
					that.axios.post('/api/userDatas',{agentID:agentID,productsId:productsId,num:count,pathCode:pathCode})
					.then(function(res){
						if(res.data.code===500){
							that.$message.info('系统故障了');
							that.isLoading = false;
							return;
						}
						if(res.data.orders.length===0){
							that.isLoading2 = false;
							return;
						}
						that.customerList = that.customerList.concat(res.data.orders)
						that.isLoading = false;
						
					})
				}
			}
		},
		vShow(){
			this.mask = true;
		}

	},
	
	
	watch:{
		
		$route (newRoute,fromPath) {
		
			let that = this;
			let pathCode = newRoute.meta.code;
			if(pathCode==100){
				this.remind = '温馨提示：出额15天内如未借款，客户将失效，因此请在客户出额15天内提醒客户借款。';
				this.isRemind = true;
			}
			if(pathCode==103){
				this.remind = '暂未出额的客户还不一定绑定邀请关系，请扫码以后下载借款app并注册才算绑定邀请关系哦！';
				this.isRemind = true;
			}
			if(pathCode==104){
				this.remind = '已成功获得额度，提醒TA在受到邀请15天内完成借款，您将获得奖励。';
				this.isRemind = true;
			}
			if(pathCode==105){
				this.remind = '已成功借款，按借款金额*奖励比例发放，奖励提现次日到账。';
				this.isRemind = true;
			}
			if(pathCode==107){
				this.remind = '其他。';
				this.isRemind = true;
			}
			if(!pathCode||fromPath.name==='FeedBack'){
				return;
			}
			window.localStorage.setItem('pathCode',pathCode);
			that.isLoading = false;
			that.isLoading2 = true;
			that.fetchData();
			
		}
	},
	// destroyed() {
	// 	window.localStorage.removeItem('pathCode');
	// }

}
</script>
<style scoped lang="less">
	.data{
		position: relative;
		width:100vw;
		min-height: 100vh;
		background-color: #fff;
		padding-bottom: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: url('http://qiniu.tongkeapp.com/bg_5.png') no-repeat;
		background-size:100%;
	}
	.sobar{
		position: fixed;
		bottom: 100px;
		right: 20px;
		z-index: 2000;
		background-color: #fff;
		width:35px;
		height: 35px;
		border-radius: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 5px 6px 0 rgba(15,60,181,.3);
	}
	.sobar img {
		width:20px;
		height: auto;
	}

	.see-s-navs{
		position: relative;
		top:0px;
		margin-top:20px;
		width:85vw;
		height:45px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		// white-space: nowrap;
		// -webkit-overflow-scrolling: touch;
		// overflow-x: auto;
		// overflow-y: hidden;
		padding: 0 0.1rem;
		margin-bottom: -.2rem;
		// overflow: -moz-scrollbars-none;
		// overflow: -moz-scrollbars-none;

	}
	.today{
		font-family: DXMfont-Regular;
		position: absolute;
		top:22px;
		left: 5px;
		color:#1476fe;
		font-size: 10px;
	}
	
	
	.see-s-nav{
		padding-bottom: 5px;
		width:auto;
		height: 30px;
		text-align: center;
		font-size: 16px;
		color: #555;
		
	}
	.first-nav{
		margin-left: 0px;
	}
	
	.activex{
		position: relative;//给当前元素添加相对定位,也就是after的父级
		font-weight: 900;
	}
</style>
