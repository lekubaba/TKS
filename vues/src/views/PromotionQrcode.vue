<template>
	<div class='promotion-qrcode'>
		<div id='qrcode-wraper' ref='box'>
			<img id='http-url' :src='src' @load = 'imgload = true'>
			<div id='http-qr'>
				<vue-qr :text="customerUrl" :size="90" :margin='px10'></vue-qr>
			</div>
		</div>
		<div class='save-qrcode'>长按保存二维码或分享给朋友</div>
		<div class='save-qrcode'>如二维码不显示，尝试刷新即可</div>
	</div>
</template>

<script>
	
import VueQr from 'vue-qr';
import html2canvas from 'html2canvas';
 

export default {
	name: 'PromotionQrcode',
	components: {
		VueQr
	},
	data(){
		return {
			qrmcodeSrc:'',
			src:'',
			src2:'http://qiniu.tongkeapp.com/tkicon.png',
			customerUrl:this.$baseURL+'/api/getcustomerpage/'+localStorage['agentID']+'/'+this.$route.query.id,
			imgUrl:'',
			imgload:false,
			px10:10,
		}
	},
	created() {
		this.$loading.show();
		this.getData();
	},
	mounted() {
		
	},

	methods:{
		getData(){
			let that = this;
			let agentID = window.localStorage['agentID'];
			this.axios.post('/api/getpromotionqrcode',{agentID:agentID})
			.then(function(res){
				if(res.data.code===500){
					that.$loading.hide();
					that.$message.info('系统故障了');
					return;
				}
				if(res.data.code===200){
					that.$loading.hide();
					that.src = res.data.promotionQrcodeBackground;
					return;
				}
			})
		},
		draw(){
			var d = document.getElementById('qrcode-wraper');
			if(this.qrmcodeSrc) return;
			var that = this;
			new html2canvas(d,{
				backgroundColor: "transparent",
				allowTaint: true,
				useCORS: true 
			}).then(canvas => {
			    // canvas为转换后的Canvas对象
			    let oImg = new Image(340);
			    oImg.src = canvas.toDataURL();  // 导出图片
				d.innerHTML = "";
			    d.appendChild(oImg);  // 将生成的图片添加到body
				
			});
		},
	},
	watch:{
		imgload(){
			this.draw();
		}
	},
	
}
</script>

<style scoped lang="less">
	.promotion-qrcode{
		width:100vw;
		height: 100vh;
		background-color: rgb(237,237,237);
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
	}
	#qrcode-wraper{
		margin:50px 0 20px 0;
		position: relative;
		top:0px;
		width:340px;
		height:auto ;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	#http-url{
		width:340px;
		height: auto;
	}
	#http-qr{
		position: absolute;
		bottom: 15px;
		right: 20px;
	}
	.save-qrcode{
		margin-top:10px;
		font-size: 12px;
		color: #999;
	}

</style>

