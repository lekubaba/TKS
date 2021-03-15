<template>
	<div class='open'>
		<div class='broadcast'>
			<ul id="con1" ref="con1" :class="{anim:animate==true}">
				<li v-for='item in items'>恭喜 <span>{{item.tels}}</span> 从黑盒夺得 <span>{{item.baoName}}</span></li>
			</ul>
		</div>
		<img  class="lo-main baobox" :class="[sharkFlag ?'my-shark' :'']" id="myShark" :src="imgx" alt="">
		<div class='remain'>**剩余<span> {{heNum}} </span>个黑盒**</div>
		<div class='titles' @click='toOpen' >开黑盒</div>
		
		<div class='titles' @click='toJiLu'>拆宝箱</div>
		
		<transition name='fade'>
			<div class='mask' v-if='mask'>
				<div class='imgx' @click='toConfirm'>
					<img class='imagex' src="http://qiniu.tongkeapp.com/getbx1.png" alt="">
					<div class='texta'>{{baoName}}</div>
				</div>
			</div>
		</transition>
		<audio id="audio1" src="http://qiniu.tongkeapp.com/dou1.mp3"  hidden></audio>
		<audio id="audio2" src="http://qiniu.tongkeapp.com/dong2.mp3"  hidden></audio>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name: 'OpenBao',
		components: {
			// HelloWorld
		},
		data(){
			return {
				show:true,
				mask:false,
				sharkFlag:false,
				imgx:'http://qiniu.tongkeapp.com/boxclosex.png',
				isClick:false,
				animate:false,
				items:null,
				heNum:0,
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
				this.axios.post('/api/kaihe',proData)
				.then(function(res){
					if(res.data.code===500){
						that.$loading.hide();
						that.$message.info('系统出错了');
						window.localStorage.clear();
						return;
					}
					that.heNum = res.data.heNum;
					that.$loading.hide();
				})
			},
			async toOpen(e){
				let that = this;
				if(this.heNum===0){
					this.$message.error('黑盒不够了');
					return;
				}
				//防止并发点击
				if(this.isClick){
					return;
				}
				
				/* 去服务器获取所得宝贝 */
				await this.getBao();

				
				document.getElementById('audio1').play();
				this.isClick=true;
				this.sharkFlag = true;
				let sharkDiv = document.getElementById("myShark");
				sharkDiv.addEventListener("animationend", this.stopShark);
				// sharkDiv.addEventListener("webkitAnimationEnd", this.stopShark);
				setTimeout(()=>{
					this.imgx = 'http://qiniu.tongkeapp.com/boxopeny.png';
				},800)
				setTimeout(()=>{
					document.getElementById('audio2').play();
					let boo = document.getElementById('audio2').paused;
					setTimeout(()=>{
						that.mask = true;
					},1100)
				},1200)
				
			},
			toConfirm(){
				this.imgx = 'http://qiniu.tongkeapp.com/boxclosex.png';
				this.mask = false;
				this.isClick=false;
			},
			stopShark(){
				this.sharkFlag = false;
			},
			toJiLu(){
				this.$router.push({name:'JiLu'});
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
			},
			async getBao(){
				let that = this;
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				let proData = {
					agentID:agentID,
					productsId,productsId,
				}
				await this.axios.post('/api/getbao',proData)
				.then(function(res){
					if(res.data.code===500){
						that.$message.error('系统异常');
						return;
					}
					if(res.data.code===100){
						that.$message.error('黑盒不够了');
						return;
					}
					
					that.heNum = res.data.heNum;
					that.baoName = res.data.boxName;
					var item = {tels:res.data.agentWechat,baoName:res.data.boxName};
					that.items.push(item); 
					
					
					
				})
			},
		},
	
	}
</script>

<style scoped lang="less">
	.open{
		width:100vw;
		min-height: 100vh;
		background-color: #000;
		display: flex;
		flex-direction: column;
		align-items: center;

	}
	.broadcast{
		overflow: hidden;
		margin-top:60px;
		width:auto;
		height: 30px;
		padding:0 20px 0 20px;
		text-align: center;
		line-height: 30px;
		color:#eee;
		font-size: 14px;
		// background-color: rgba(0,0,0,.2);
		background: linear-gradient(to right,rgba(225,225,225,0) 0%,rgba(225,225,225,0) 10%,
					rgba(225,225,225,0.1) 20%,rgba(225,225,225,0.2) 30%,rgba(225,225,225,0.3) 40%,
					rgba(225,225,225,0.4) 50%,rgba(225,225,225,0.3) 60%,rgba(225,225,225,0.2) 70%,rgba(225,225,225,0.1) 80%,
					rgba(225,225,225,0) 90%,rgba(225,225,225,0) 100%)
	}
	.baobox{
		margin-top: 20px;
		width:50%;
		height: auto;
		margin-bottom: 40px;
	}
	.remain{
		color:#999;
		font-size: 14px;
	}
	.remain span{
		color:#CD0508;
		
	}
	
	.buttons{
		width:80%;
	}
	.titles{
		margin-top: 30px;
		width:50%;
		height: 40px;
		border-radius: 50px;
		background:#000;
		box-shadow: 0 5px 10px rgba(0, 63, 255, .5);
		text-align: center;
		line-height: 40px;
		color:#CD0508;
	}
	
	.titles:hover{
		background-color: #080808;
	}
	
	.don-enter-active, .don-leave-active {
		transition: all .5s ease;
	}
	.don-enter,.don-leave-to{
		opacity: 0;
	}
	
	/* mask部分 */
	.mask{
		position: fixed;
		bottom:0px;
		width:100vw;
		height: 100vh;
		background-color: rgba(0,0,0,.8);
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		z-index: 1000;
	}
	.fade-enter-active, .fade-leave-active {
		transition: all .8s ease;
	}
	.fade-enter,.fade-leave-to{
		opacity: 0;
	}
	.imgx{
		width:100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.imagex{
		width:100%;
	}
	.texta{
		position: absolute;
		margin-top: -70px;
		font-weight: 900;
		color:#CD0508;
		font-size: 25px;
		margin-left:-5px;
	}
	
	.my-shark{
	  animation:login-shake 1.1s 1 ease-in;
	}
	@keyframes login-shake {
	  0% {transform: scale(1);}
	  10%, 20% {transform: scale(0.7) rotate(-10deg);}
	  30%, 50%, 70%, 90% {transform: scale(1.1) rotate(10deg);}
	  40%, 60%, 80% {transform: scale(1.1) rotate(-10deg);}
	  100% {transform: scale(1) rotate(0);}
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