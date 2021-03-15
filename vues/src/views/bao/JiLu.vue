<template>
	<div class="jilu">
		<div class='itemx' v-for="(item,index) in boxs" :style='{opacity:item.isOpen==1&&(item.num==10006||item.num==10004)?0.7:1}'>
			<div class='headericon'>
				<div class='icon'>
					<img class='boxicon' src="http://qiniu.tongkeapp.com/bxicon.png" alt="">
				</div>
				<div class='text'>
					<span class='titles'>{{item.baoName==='待'?item.boxName:item.baoName}}</span>
					<span style='font-size: 12px;'>{{item.boxPro}}</span>
					<span style='font-size: 12px;' v-if='item.num===10001'>需金牛钥匙才能打开宝箱</span>
					<span style='font-size: 12px;' v-if='item.num===10002'>折扣以携程价为参考</span>
				</div>
			</div>
			<div class='openy' @click='toChai' v-if='item.isOpen!==1' :data-id='item._id' :data-num='item.num'>
				<div class='openx' :data-index='index'>{{(item.num===10003||item.num===10005)?'用':'拆'}}</div>
			</div>
		</div>
		<Loading v-bind:show='isLoading' v-bind:show2='isLoading2'/>
		<div class='kong' v-if='mask1'></div>
		<transition name='box'>
			<div class='imask' v-if='mask'>
				<div class='tent' @click='toShou'>
					<img class='tent-img' src="http://qiniu.tongkeapp.com/hei1.png" alt="">
					<div class='texth'>{{baoName}}</div>
				</div>
			</div>
		</transition>
		<audio id="audio1" src="http://qiniu.tongkeapp.com/dou1.mp3"  hidden></audio>
		<audio id="audio2" src="http://qiniu.tongkeapp.com/dong2.mp3"  hidden></audio>
	</div>
</template>
<script>
	import Vue from 'vue';
	import Loading from '../../components/Loading.vue';
	export default {
		name: 'JiLu',
		components: {
			Loading
		},
		data () {
			return {
				mask:false,
				mask1:false,
				shake:false,
				boxs:null,
				isLoading:false,
				isLoading2:true,
				baoName:null,
			}
		},
		beforeRouteEnter (to, from, next) {
		  if(window.localStorage['isPromotion']=="true"){
			  next();
			  return;
		  }
		  next({name:"Promotion"});
		},
		created() {
			this.$loading.show();
			this.fetchData();
		},
		mounted() {
			this.scroll()
		},
		methods:{
			fetchData(){
				let that = this;
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				let proData = {
					agentID:agentID,
					productsId,productsId,
				}
				this.axios.post('/api/kaibaojilu',proData)
				.then(function(res){
					if(res.data.code===500){
						that.$loading.hide();
						that.$message.info('系统出错了');
						window.localStorage.clear();
						return;
					}
					that.boxs = res.data.box;
					that.$loading.hide();
				})
			},
			async toChai(e){
				//产品ID
				//防止并发点击
				if(this.shake){
					return;
				}
				let index = Number(e.target.dataset.index);
				let id = e.target.parentNode.dataset.id;
				/* 去服务器获取所得宝贝 */
				let x = await this.getBao(id);
				console.log(x);
				document.getElementById('audio1').play();
				let parent = e.target.parentNode.parentNode;
				this.shake=true;
				parent.className = 'itemx shark';
				setTimeout(()=>{
					document.getElementById('audio2').play();
					setTimeout(()=>{
						this.mask1= true;
						this.mask= true;
						Vue.set(this.boxs[index],'baoName',this.baoName);
						Vue.set(this.boxs[index],'isOpen',1);
						parent.addEventListener("animationend", this.stopShark(parent));
					},1000)
					
				},1200)
				
			},
			stopShark(p){
				p.className = 'itemx';
			},
			toShou(){
				this.mask1= false;
				this.mask= false;
				this.shake=false;
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
						let count = that.boxs.length;
						that.axios.post('/api/kaibaojiluplus',{agentID:agentID,productsId:productsId,num:count})
						.then(function(res){
							if(res.data.code===500){
								that.$message.info('系统故障了');
								return;
							}
							if(res.data.box.length===0){
								that.isLoading2 = false;
								return;
							}
							that.boxs = that.boxs.concat(res.data.box)
							that.isLoading = false;
							
						})
						
					}
				}
			},
			async getBao(id){
				let that = this;
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				let proData = {
					agentID:agentID,
					productsId,productsId,
					id:id,
				}
				await this.axios.post('/api/getbaobei',proData)
				.then(function(res){
					if(res.data.code===500){
						that.$message.error('系统异常');
						return;
					}
					
					that.baoName = res.data.baoName;
					return;
					
				})
			},
			
		}

	}	
</script>

<style lang="less">
	.jilu{
		width:100vw;
		min-height: 120vh;
		background-color: #000;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding:20px 0 30px 0;
	}
	.headericon{
		display: flex;
		flex-direction: row;
	}
	.itemx{
		position: relative;
		top:0px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-top:20px;
		width:90%;
		height: 100px;
		z-index: 2;
		border-radius:10px;
		box-shadow: 0 5px 30px rgba(0, 63, 255, .5);
		z-index:0;
		color:#fff;
		padding:0 30px 0 20px;
		background-image: linear-gradient(105deg, #2D4777,#243F51);
	}
	.icon{
	}
	.text{
		display: flex;
		flex-direction: column;
		padding-left: 10px;
		
	}
	.boxicon{
		width:65px;
		height: auto;
	}
	.titles{
		font-size: 18px;
		font-weight: 900;
	}
	.openy{
		width:60px;
		height: 60px;
		border-radius: 50px;
		background-color: rgba(255,255,255,.1);
		box-shadow: 0 5px 30px rgba(0, 63, 255, .5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.openx{
		width:50px;
		height: 50px;
		border-radius: 50px;
		background-image: linear-gradient(135deg, rgba(244, 213, 131, 1), rgba(191, 152, 57, 1.0));
		text-align: center;
		line-height: 50px;
		font-size: 20px;
		font-weight: 900;
		color:#666;
		
	}
	.shark{
		animation:login-shake 0.8s 1 ease-in;
	}
	@keyframes login-shake {
	  0% {transform: scale(1);}
	  10%, 20% {transform: scale(0.7) rotate(-10deg);}
	  30%, 50%, 70%, 90% {transform: scale(1.1) rotate(10deg);}
	  40%, 60%, 80% {transform: scale(1.1) rotate(-10deg);}
	  100% {transform: scale(1) rotate(0);}
	}
	.imask,.kong{
		position: fixed;
		bottom:0px;
		width:100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}
	.kong{
		background-color: rgba(0,0,0,.7);
		z-index: 100;
	}
	
	.box-enter-active, .box-leave-active {
		transition: all .3s ease;
	}
	.box-enter,.box-leave-to{
		width:0px;
		opacity: 0;
	}
	
	.tent{
		position: relative;
		top:0px;
		width:90%;
		height:auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.tent-img{
		width:100%;
	}
	.texth{
		position: absolute;
		margin-top:-30px;
		font-weight: 900;
		font-size: 30px;
		color:rgba(244, 213, 131, 1)
	}
</style>
