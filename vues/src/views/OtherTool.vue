<template>
	<div class='tool'>
		<div class='container' @click='toAudit'>
			<div class='container-a'>
				<div class='c-title'>
					佣金审核与<span style='color:#11b764'>发放</span>
				</div>
				<div class='remind'>
					查看名下所有人的提现情况，笔笔记录，对钱的走向了如指掌，让天下没有难发的佣金。
				</div>
			</div>
			<div class='container-b'>
				<div class='arrow-right'></div>
			</div>
		</div>
		<div class='container1' @click='toCounterManagerBonus'>
			<div class='container-a'>
				<div class='c-title'>
					管理<span style='color:#11b764'>佣金</span>
				</div>
				<div class='remind'>
					只有在您生成了管理佣金以后，总监和独家才能看到记录和提现。
				</div>
			</div>
			<div class='container-b'>
				<div class='arrow-right'></div>
			</div>
		</div>
		<div class='container1' @click='toFindSuper'>
			<div class='container-a'>
				<div class='c-title'>
					查<span style='color:#11b764'>上级</span>
				</div>
				<div class='remind'>
					查上级功能，为了更好的梳理层级关系，让天下没有难梳理的层级。
				</div>
			</div>
			<div class='container-b'>
				<div class='arrow-right'></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'OtherTool',
		components: {
			// HelloWorld
		},
		data(){
			return {

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
			
		},
		methods:{
			toAudit(){
				this.$router.push({path:'audit'});
			},
			toCounterManagerBonus(){
				this.$router.push({path:'managerbonus'});
			},
			toFindSuper(){
				this.$router.push({path:'findsuper'});
			}
		}
	}
</script>

<style scoped lang="less">
.tool{
	width:100vw;
	height: 100vh;
	background-color: #F2F5FA;
	display: flex;
	flex-direction: column;
	align-items: center;
	
}
.container{
	margin-top:40px;
	width:92vw;
	height: 150px;
	padding:20px 25px 20px 25px;
	background-color: #fff;
	border-radius: 10px;
	display: flex;
	box-shadow: 0 5px 6px 0 rgba(15,60,181,.3);
}
.container-a{
	width:80%;
}

.container1{
	margin-top:20px;
	width:92vw;
	height: 150px;
	padding:20px 25px 20px 25px;
	background-color: #fff;
	border-radius: 10px;
	display: flex;
	box-shadow: 0 5px 6px 0 rgba(15,60,181,.3);
}
.c-title{
	font-size:26px;
	color:#333;
	font-weight: 900;
}

.container-b{
	width:20%;
	height: 100%;
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
}
.arrow-right {
	width: 0;
	height: 0;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	border-bottom: 10px solid #333;
	font-size: 0;
	line-height: 0;
	transform: rotate(90deg);
}


.remind{
	width: 100%;
	padding:5px 0px 0 0px;
	margin-top:5px;
	font-size: 12px;
	color:#666;
}
</style>
