<template>
	<div class='up-level' :style="{backgroundColor:color}">
		<div class='header' :style="{backgroundColor:color1}">
			<span>等级提升之路</span>
		</div>
		<div style='height: 70px;'></div>
		<div class='up-itemt'>城市总监和城市经理默认有效期为15天，每招募一名代理可以增加一天的职位有效期。</div>
		<div class='up-itema'>
			<div class='item'>
				<div class='item-numa'>22%</div>
				<div class='item-numb'>完成</div>
			</div>
			<div class='item'></div>
			<div class='item'>
				<div class='item-numb'>{{managerLevel===100?'暂无职位':managerLevel===0?'城市代理':managerLevel===1?'城市经理':managerLevel===2?'城市总监':'城市独家'}}</div>
				<div class='item-numb'>当前等级</div>
			</div>
		</div>
		<div class='up-items'>
			<div class='item'></div>
			<div class='item1' :class="{actived: managerLevel>=0}" @click='toRmind' data-level='0'>
				<div>城市</div>
				<div>代理</div>
			</div>
			<div class='item'></div>
		</div>
		<div class='is-lock'>
			<div>系统默认等级</div>
			<div>100%完成</div>
			<div class='circlex'></div>
			<div class='circlex'></div>
			<div class='circlex'></div>
			
		</div>
		<div class='up-items'>
			<div class='item'></div>
			<div class='item1' :class="{actived: managerLevel>=1}" @click='toRmind' data-level='1'>
				<div>城市</div>
				<div>经理</div>
			</div>
			<div class='item'>
				<div class='fast-road'  @click='toContactBoss'>直通车</div>
			</div>
		</div>
		<div class='is-lock'>
			<div>招代理20人或发立牌50个</div>
			<div v-if='managerLevel>=1'>已解锁</div>
			<div v-if='managerLevel<1'>未解锁</div>
			
			<div class='circlex'></div>
			<div class='circlex'></div>
			<div class='circlex'></div>
			
		</div>
		<div class='up-items'>
			<div class='item'></div>
			<div class='item1' :class="{actived: managerLevel>=2}" @click='toRmind' data-level='2'>
				<div>城市</div>
				<div>总监</div>
			</div>
			<div class='item'>
				<div class='fast-road'  @click='toContactBoss'>直通车</div>
			</div>
		</div>
		<div class='is-lock'>
			<div>订立牌2000个</div>
			<div v-if='managerLevel<2'>未解锁</div>
			<div v-if='managerLevel>=2'>已解锁</div>
			<div class='circlex'></div>
			<div class='circlex'></div>
			<div class='circlex'></div>
			
		</div>
		<div class='up-items'>
			<div class='item'></div>
			<div class='item1' :class="{actived: managerLevel===3}" @click='toRmind' data-level='3'>
				<div>城市</div>
				<div>独家</div>
			</div>
			<div class='item'>
				<div class='fast-road'  @click='toContactBoss'>直通车</div>
			</div>
		</div>
		<div class='is-lock'>
			<div>订立牌30000个</div>
			<div v-if='managerLevel<3'>未解锁</div>
			<div v-if='managerLevel>=3'>已解锁</div>
		</div>
		<div style='color:#fff'>每到达一个等级点亮一盏灯</div>
		<div style='color:#fff'>点亮财富之路</div>
		<div class='up-items'>
			<div class='item'></div>
			<div class='item'></div>
			<div class='item'></div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name: 'UpLevelPage',
		components: {
			// HelloWorld
		},
		data(){
			return {
				color1:this.$store.state.color,
				managerLevel:null,
			}
		},
		created() {
			this.$loading.show();
			this.getData();
		},
		methods:{
			getData(){
				let agentID = window.localStorage['agentID'];
				let productsId = window.localStorage['productsId'];
				let that = this;
				this.axios.post('/api/getSelfCommissionRate',{agentID:agentID,productsId:productsId})
				.then(function(res){
					if(res.data.code==500){
						that.$loading.hide();
						that.$message.info('系统故障');
						window.localStorage.clear();
					}else{
						that.managerLevel = res.data.managerLevel;
						that.$loading.hide();
					}
				})
			},
			toRmind(event){
				let level = event.currentTarget.dataset.level;
				level = Number(level);
				if(this.managerLevel>=level){
					this.$message.info('已达成');
				}else{
					this.$message.info('暂无权限');
				}
			},
			toContactBoss(e){
				//产品ID
				let _id = window.localStorage['productsId'];
				this.$router.push({name:'ContactBoss',query:{id:_id}});
			},
			
		},
		computed:{
			...mapState({
				userInfo:state=>state.userInfo,
				color:state=>state.color,
			})
		},
		mounted() {
			
		}
	
	}
</script>

<style scoped lang="less">
	.up-level{
		width:100vw;
		min-height: 100vh;
		background-color: #F2F5FA;
		display: flex;
		flex-direction: column;
		align-items: center;

	}
	.header{
		position: fixed;
		top:0px;
		height: 60px;
		width: 100vw;
		background-color: #1475FE;
		display: flex;
		flex-direction: column;
		// align-items: center;
		justify-content: center;
		padding-left: 20px;
		color:#fff;
		font-size: 26px;
		font-weight: 900;
		box-shadow: 0 5px 6px 0 rgba(0,0,0,.1);
	}
	.smallsize{
		font-size: 12px;
	}
	.up-itema{
		width:70vw;
		height: 110px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.up-itemt{
		padding: 10px 10px 10px 10px;
		margin-top:10px;
		width:70vw;
		height: auto;
		display: flex;
		align-items: center;
		font-size: 12px;
		color:#fff;
		border:1px solid #fefefe;
	}
	.item-numa{
		font-size: 20px;
		color:#fff;
	}
	.item-numb{
		font-size: 14px;
		color:#fff;
	}
	.fast-road{
		font-size: 10px;
		width:70px;
		height: 25px;
		text-align: center;
		line-height: 25px;
		background-color: #fff;
		color:#FF654D;
		border-radius: 30px;
	}
	.is-lock{
		width:100%;
		height: 130px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color:#fff;
		font-size: 16px;
	}
	.circlex{
		margin-top: 10px;
		width:6px;
		height: 6px;
		border-radius: 5px;
		background-color: #fff;
	}
	.up-items{
		width:92vw;
		height: 100px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.item{
		width:32%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color:#fff;
	}
	.item1{
		width:100px;
		height: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 90px;
		background-color:rgba(255,255,255,.1);
		color:#fff;
		font-weight: 900;
		
	}
	.actived{
		position:relative;
		width:100px;
		height:100px;
		// margin:40px auto;
		// line-height:40px;
		border:1px solid #2b92d4;
		border-radius:90px;
		color:#fff;
		font-size:20px;
		text-align:center;
		cursor:pointer;
		box-shadow:0 1px 2px rgba(0,0,0,.3);
		overflow:hidden;
		background-image:-webkit-gradient(linear,left top,left bottom,from(#6cc3fe),to(#21a1d0));
		-webkit-animation-timing-function:ease-in-out;
		-webkit-animation-name:breathe;
		-webkit-animation-duration:2700ms;
		-webkit-animation-iteration-count:infinite;
		-webkit-animation-direction:alternate;
	}
	@-webkit-keyframes breathe {
		0% {
		opacity:.2;
		box-shadow:0 1px 2px rgba(255,255,255,0.1);
	}
	100% {
		opacity:1;
		border:1px solid rgba(59,235,235,1);
		box-shadow:0 1px 30px rgba(59,255,255,1);
	}
	}
	
	/* 特殊样式 */
</style>