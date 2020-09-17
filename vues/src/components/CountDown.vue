<template>
	<div class='count-down'>
		{{timeRes}}
	</div>
</template>

<script>
	export default {
		name: 'CountDown',
		props:['endTime'],
		data(){
			return {
				timeRes:'',
			}
		},
		created(){
			this.countTime();
		},
		methods:{
			countTime(){
				//获取当前时间
				var date = new Date();
				var now = date.getTime();
				//设置截止时间
				var dataStr = this.endTime;
				var format = dataStr.replace(/-/g, '/');
				var end = Date.parse(new Date(format));
				//时间差
				var leftTime = end - now;
				//定义变量 d,h,m,s保存倒计时的时间
				if (leftTime >= 0) {
					var d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
					var d1 = d.toString().length ===1?'0'+d:d;
					var h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
					var h1 = h.toString().length ===1?'0'+h:h;
					var m = Math.floor((leftTime / 1000 / 60) % 60);
					var m1 = m.toString().length ===1?'0'+m:m;
					var s = Math.floor((leftTime / 1000) % 60);
					var s1 = s.toString().length ===1?'0'+s:s;
					this.timeRes = d1+':'+h1+':'+m1+':'+s1;
				}else{
					this.timeRes = '已结束';
				}
				//递归每秒调用countTime方法，显示动态时间效果
				setTimeout(this.countTime, 1000)
			},
		},
		watch:{
			endTime(newData,oldData){
				return newData;
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>
