<template>
	<div class="data">
		<div class='see-s-navs'>
			<router-link to="/audit" replace class='see-s-nav' active-class="active" exact>未发放</router-link>
			<router-link to="/audit/1" replace class='see-s-nav' active-class="active" exact>已发放</router-link>
		</div>
		<router-view v-bind:datas='cashList' v-bind:isVIP='userInfo.isVIP'/>
		<Loading v-bind:show='isLoading' v-bind:show2='isLoading2'/>
	</div>
</template>
<script>
import {mapState} from 'vuex';
import Loading from '../components/Loading.vue';
export default {
	name: 'Audit',
	components: {
		Loading
	},
	data(){
		return {
			cashList:null,
			isLoading:false,
			isLoading2:true,
		}
	},
	computed:{
		...mapState({
			userInfo:state=>state.userInfo,
			color:state=>state.color,
		}),
	},
	beforeRouteEnter (to, from, next) {
		if(window.localStorage['isVIP']=="true"){
			next();
			return;
		}
		next({name:"Promotion"});
	},
	created() {
		if(this.$route.fullPath==='/audit'){
			window.localStorage.setItem('pathCode','100');
		};
		this.$loading.show()
		this.fetchData();
	},
	methods:{
		fetchData(){
			let that = this;
			let agentID=window.localStorage['agentID'];
			let productsId = window.localStorage['productsId'];
			let pathCode = window.localStorage['pathCode']?window.localStorage['pathCode']:100;
			pathCode = Number(pathCode);
			this.axios.post('/api/getCashProfile',{agentID:agentID,productsId:productsId,pathCode:pathCode})
				.then(function(response){
					that.$loading.hide();
					if(response.data.code===500){
						that.$message.info('系统故障了');
						window.localStorage.clear();
						return;
					}
					that.cashList = response.data.cashs;
					
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
					let count = that.cashList.length;
				
					let pathCode = window.localStorage['pathCode']?window.localStorage['pathCode']:100;
					pathCode = Number(pathCode);
					that.axios.post('/api/getCashProfiles',{agentID:agentID,productsId:productsId,num:count,pathCode:pathCode})
					.then(function(res){
						if(res.data.code===500){
							that.$message.info('系统故障了');
							that.isLoading = false;
							return;
						}
						if(res.data.cashs.length===0){
							that.isLoading2 = false;
							return;
						}
						that.cashList = that.cashList.concat(res.data.cashs)
						that.isLoading = false;
						
					})
				}
			}
		}

	},
	mounted() {
		// window.addEventListener("scroll",this.scroll(),true);
		this.scroll();
	},
	watch:{
		$route (newRoute) {
			let that = this;
			let pathCode = newRoute.meta.code;
			window.localStorage.setItem('pathCode',pathCode);
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
		width:100vw;
		min-height: 100vh;
		background-color: #F2F5FA;
		padding-bottom: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.see-s-navs{
		margin-top:20px;
		width:62vw;
		height:55px;
		display: flex;
		justify-content: space-between;
		white-space: nowrap;
		-webkit-overflow-scrolling: touch;
		overflow-x: auto;
		overflow-y: hidden;
		padding: 0 0.1rem;
		margin-bottom: -.2rem;
		overflow: -moz-scrollbars-none;
		overflow: -moz-scrollbars-none;

	}
	
	.see-s-navs::-webkit-scrollbar{
	    display: none;
	}
	
	.see-s-nav{
		margin-left: 20px;
		width:25%;
		height: 45px;
		text-align: center;
		line-height: 45px;
		font-size: 16px;
		color: #555;
		// font-weight: 700;
		
	}
	.total-all{
		width:50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-weight:700;
	}
	.gray{
		color: #fff;
		font-size: 16px;
	}
	.colorful1{
		color:#fff;
		font-size: 22px;
	}
	
	
</style>
