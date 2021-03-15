<template>
	<div class='interesting'>
		<div class='topmenu'>
			<div class='item1'>
				<span>黑盒夺宝</span>
				<span class='find' @click='toSeeBao'>黑盒概率</span>
			</div>
			<div class='item2'>
				<span class='span1'>{{fenNum}} 积分</span>
				<span class='span2' @click="toJifen">+</span>
			</div>
		</div>
		<div class='broadcast'>
			<ul id="con1" ref="con1" :class="{anim:animate==true}">
				<li v-for='item in items'>恭喜 <span>{{item.tels}}</span> 从黑盒夺得 <span>{{item.baoName}}</span></li>
			</ul>
		</div>
		<img class='baobox' src="http://qiniu.tongkeapp.com/boxclosex.png" alt="">
		<div class='navbar'>
			<div class='kqbars'>
				<div class='titles' @click="toDui">兑黑盒</div>
			</div>
			<div class='kqbars'>
				<div class='titles' @click="toOpenBao">开黑盒</div>
			</div>
		</div>
		<transition name='fade'>
			<div class='mask' v-if='mask'>
				<div class='mask-contenta'>
					<img @click='isCancel' class='closey' src="http://qiniu.tongkeapp.com/colsey.png" alt="">
					<div class='titlea'>我的积分</div>
					<div class='titleb'>{{fenNum}}</div>
					<div class='titlec'>可兑换黑盒数</div>
					<div class='titleb'>{{duiNum}}</div>
					<div class='kqbars' @click="isConfirm">
						<div class='titles'>确定兑换</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name: 'Interesting',
		components: {
			// HelloWorld
		},
		data(){
			return {
				fenNum:0,
				duiNum:0,
				mask:false,
				animate:false,
				items:null,
			}
		},
		beforeRouteEnter (to, from, next) {
		  if(window.localStorage['isPromotion']=="true"){
			  next();
			  return;
		  }
		  next({name:"Promotion"});
		},
		computed:{
			...mapState({
				userInfo:state=>state.userInfo,
				color:state=>state.color,
			})
		},
		created(){
			this.$loading.show();
			let tels1 = this.$Utils.tels();
			let tels2 = this.$Utils.tels();
			this.items = [{tels:tels1.s,baoName:tels1.bao},{tels:tels2.s,baoName:tels2.bao}];
		    setInterval(this.scroll,3000);
			this.fetchData();
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
				this.axios.post('/api/heihe',proData)
				.then(function(res){
					if(res.data.code===500){
						that.$loading.hide();
						that.$message.info('系统出错了');
						window.localStorage.clear();
						return;
					}
					that.fenNum = res.data.fenNum;
					that.$loading.hide();
				})
			},
			toSeeBao(){
				this.$router.push({name:'SeeBao'});
			},
			toOpenBao(){
				this.$router.push({name:'OpenBao'});
			},
			toJifen(){
				this.$router.push({name:'JiFen'});
			},
			toDui(){
				this.duiNum = Math.floor(this.fenNum/1000);
				this.mask = true;
			},
			isCancel(){
				this.mask = false;
			},
			isConfirm(){
				if(this.duiNum===0){
					this.mask = false;
					this.$message.error('积分不足');
					return;
				}
				let that = this;
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				let proData = {
					agentID:agentID,
					productsId,productsId,
				}
				this.axios.post('/api/duihuan',proData)
				.then(function(res){
					if(res.data.code===500){
						that.mask = false;
						that.$message.error('系统异常');
						return;
					}
					that.fenNum = res.data.fenNum;
					that.mask = false;
					that.$message.success('兑换成功');
					
				})
				
			},
			scroll(){
				let tels = this.$Utils.tels();
				let item = {tels:tels.s,baoName:tels.bao};
				this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
				setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
					this.items.push(item);  // 将数组的第一个元素添加到数组的
					this.items.shift();               //删除数组的第一个元素
					this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
				},500)
			}
		},
	
	}
</script>

<style scoped lang="less">
	.interesting{
		width:100vw;
		min-height: 100vh;
		background-color: #000;
		display: flex;
		flex-direction: column;
		align-items: center;

	}
	.topmenu{
		position: fixed;
		top:0px;
		width:100%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 20px;
		z-index: 10000;
		background-color: #000;
	}
	.item1{
		font-size: 14px;
		color: #999;
		font-weight: 900;
	}
	.item2{
		width:auto;
		height: 24px;
		padding:0 10px 0 10px;
		text-align: center;
		line-height: 22px;
		border-radius: 30px;
		color:#fff;
	}
	.find{
		color:#CD0508;
		padding-left: 10px;
	}
	.span1{
		font-size: 12px;
		font-weight: 900;
	}
	.span2{
		display: inline-block;
		width:20px;
		height: 20px;
		background-color: #CD0508;
		border-radius: 20px;
		text-align: center;
		line-height: 16px;
		color:#fff;
		margin:0 1px 0 10px;
	}
	.broadcast{
		overflow: hidden;
		margin-top:70px;
		width:auto;
		height: 30px;
		padding:0 20px 0 20px;
		text-align: center;
		line-height: 30px;
		color:#eee;
		font-size: 14px;
		// background-color: rgba(0,0,0,.2);
		 background: linear-gradient(to right,rgba(100,100,100,0) 0%,rgba(100,100,100,0) 10%,
			rgba(100,100,100,0.1) 20%,rgba(100,100,100,0.2) 30%,rgba(100,100,100,0.3) 40%,
			rgba(100,100,100,0.4) 50%,rgba(100,100,100,0.3) 60%,rgba(100,100,100,0.2) 70%,rgba(100,100,100,0.1) 80%,
			rgba(100,100,100,0) 90%,rgba(100,100,100,0) 100%)
	}
	.duihuan{
		margin-top: 50px;
		width:80%;
		height: auto;
	}
	.baobox{
		width:50%;
		height: auto;
	}
	.navbar{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width:100%;
		margin-bottom:130px;
	}
	.kqbars{
		position: relative;
		margin-top:20px;
		width:100%;
		display: flex;
		flex-direction:column;
		align-items: center;
		justify-content: center;
		
	}
	.buttons{
		width:80%;
	}
	.titles{
		margin-top:20px;
		width:50%;
		height: 40px;
		border-radius: 50px;
		background: #000;
		box-shadow: 0 5px 10px rgba(0, 63, 255, .5);
		text-align: center;
		line-height: 40px;
		color:#CD0508;
		
	}
	.titles:hover{
		background-color: #080808;
	}
	/* mask部分 */
	.mask{
		position: fixed;
		bottom:0px;
		width:100vw;
		height: calc(100vh + 250px);
		background-color: rgba(0,0,0,.8);
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
	}
	.fade-enter-active, .fade-leave-active {
		transition: all .3s ease;
	}
	.fade-enter,.fade-leave-to{
		bottom: -250px;
		opacity: 0;
	}
	
	.mask-contenta{
		position: relative;
		bottom:80px;
		width:100vw;
		height: auto;
		background-color: #000;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding:10px 0 50px 0px;
		// border-top:3px solid #CD0508;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		box-shadow: 0 15px 200px rgba(0, 63, 255, .5);
	}
	.closey{
		width:36px;
		height: auto;
		position: absolute;
		top:-70px;
		opacity: .6;
	}
	.mask-linea{
		position: absolute;
		top:-30px;
		width:130%;
		
	}
	.mask-cancel{
		position: relative;
		top:-20px;
		background-color: #CD0508;
		width:30%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #5E2202;
		font-size: 16px;
		font-weight: 900;
		cursor: pointer;
		border-radius: 20px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		margin:0 10px 0 10px;
	}
	.titlea{
		margin-top:40px;
		font-size: 20px;
		font-weight: 900;
		color:#fff;
	}
	.titleb{
		margin:0px 0 10px 0px;
		font-weight: 900;
		font-size: 34px;
		font-family: DXMfont-Bold;
		color:#CD0508;
		
	}
	.titlec{
		margin-top:10px;
		font-size: 20px;
		font-weight: 900;
		color:#fff;
	}
	
	/* 轮询部分 */
	
	.anim{
	    transition: all 0.5s;
	    margin-top: -30px;
	}
	#con1 li{
	    list-style: none;
	    line-height: 30px;
	    height: 30px;
		color:#CD0508;
	}
	#con1 span{
		color:yellow;
	}
	
</style>