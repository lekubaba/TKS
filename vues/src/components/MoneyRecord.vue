<template>
	<div class="record" @scroll.passive="getScroll($event)" ref='content'>
		<div class='in-item' v-for='item in list'>
			<div class='sup'>
				<span class='sup-a'>{{item.types}}</span>
				<span class='sup-b'>+{{item.howMuch}}</span>
			</div>
			<div class='sub'>
				<span class='sub-a'>{{item.outTime}}</span>
				<span class='sub-b'>来自：{{item.types==='黑盒红包'?'红包宝箱':item.orderID?item.orderID.agentID.agentNickname:'管理奖金'}}</span>
			</div>
		</div>
		<Loading v-bind:show='isLoading' v-bind:show2='isLoading2'/>
	</div>
</template>
<script>
import Loading from '../components/Loading.vue';
export default {
	name: 'MoneyRecord',
	components: {
		Loading
	},
	props:['records'],
	data(){
		return {
			isLoading:false,
			isLoading2:true,
			list:[]
		}
	},
	created() {
		this.$loading.show();
		this.getData();
	},
	methods:{
		getData(){
			let that = this;
			let agentID = window.localStorage['agentID'];
			let productsId = window.localStorage['productsId'];
			that.axios.post('/api/getWithdrawalRecord',{agentID:agentID,productsId:productsId})
			.then(function(res){
				if(res.data.code===500){
					that.$loading.hide();
					that.$message.info('出错了');
					return;
				}
				
				that.list = res.data.data;
				that.$loading.hide();
				
			})
		},
		getScroll(event){
			let that = this;
			let agentID = window.localStorage['agentID'];
			let productsId = window.localStorage['productsId'];
			let scrollBottom = event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight;
			
			if (scrollBottom<=50&&that.isLoading == false) {
				that.isLoading = true;
				let count = that.list.length;
				that.axios.post('/api/getWithdrawalRecords',{agentID:agentID,productsId:productsId,num:count})
				.then(function(res){
					if(res.data.code===500){
						that.$message.info('系统故障了');
						that.isLoading = false;
						return;
					}
					if(res.data.data.length===0){
						that.isLoading2 = false;
						return;
					}
					that.list = that.list.concat(res.data.data);
					that.isLoading = false;
					
				})
			}
		}
	},

	
}
</script>
<style scoped lang="less">
	.record{
		margin-top:5px;
		width:100%;
		height: calc(100vh - 180px);
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
		overflow-y: auto;
		overflow-x: hidden;
	}
.in-item{
		width:90%;
		height: auto;
		padding:20px 0 20px 0;
		border-top: 1px solid rgba(218,224,234,.5);
	}
	.in-item:first-child {
		border: none;
	}
	
	.sup{
		display: flex;
		justify-content: space-between;
	}
	
	.sup-a{
		font-size: 16px;
		font-weight: 900;
		color:#101010;
	}
	.sup-b{
		font-family: DXMfont-Bold;
		font-size: 18px;
		color:#666;
	}
	.sub{
	}
	.sub-a{
		font-family: DXMfont-Regular;
		font-size: 14px;
		color:#666;
	}
	.sub-b{
		padding-left: 15px;
		font-family: DXMfont-Regular;
		font-size: 14px;
		color:#666;
	}
	

	
</style>

